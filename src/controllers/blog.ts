import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

export const getAllBlogs = async (_: Request, res: Response) => {
  const blogs = await prisma.blog.findMany({
    where: { isDeleted: false },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(blogs);
};

export const createBlog = async (req: any, res: Response) => {
  const { title, synopsis, content, featuredImg, publicId } = req.body;
  const userId = req.userId;

  try {
    const blog = await prisma.blog.create({
      data: { title, synopsis, content, featuredImg, publicId, authorId: userId },
    });
    res.status(201).json(blog);
  } catch (err) {
    console.error("Failed to create blog:", err);
    res.status(400).json({ error: "Failed to create blog" });
  }
};

export const getBlogById = async (req: Request, res: Response) => {
  const { blogId } = req.params;
  const blog = await prisma.blog.findUnique({
    where: { id: blogId },
    include: { author: true },
  });

  if (!blog || blog.isDeleted) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json(blog);
};

export const updateBlog = async (req: any, res: Response) => {
  const { blogId } = req.params;
  const userId = req.userId;
  const { title, synopsis, content, featuredImg } = req.body;

  const blog = await prisma.blog.findUnique({ where: { id: blogId } });

  if (!blog || blog.authorId !== userId) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const updated = await prisma.blog.update({
    where: { id: blogId },
    data: { title, synopsis, content, featuredImg },
  });

  res.json(updated);
};

export const deleteBlog = async (req: any, res: Response) => {
  const { blogId } = req.params;
  const userId = req.userId;

  console.log("Authenticated userId from token:", userId);

  try {
    const blog = await prisma.blog.findUnique({ where: { id: blogId } });

    if (!blog) {
      console.log("Blog not found with ID:", blogId);
      return res.status(404).json({ error: "Blog not found" });
    }

    console.log("Blog authorId:", blog.authorId);

    if (blog.authorId !== userId) {
      console.log("Mismatch: userId does not match blog.authorId");
      return res.status(403).json({ error: "Forbidden: Not blog owner" });
    }

    if (blog.publicId) {
      const result = await cloudinary.uploader.destroy(blog.publicId);
      console.log("Cloudinary deletion result:", result);
    }

    await prisma.blog.update({
      where: { id: blogId },
      data: { isDeleted: true },
    });

    console.log("Blog soft-deleted successfully.");
    res.json({ message: "Blog and image deleted successfully" });
  } catch (err) {
    console.error("Failed to delete blog:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMyBlogs = async (req: any, res: Response) => {
  const userId = req.userId;
  try {
    const blogs = await prisma.blog.findMany({
      where: { authorId: userId, isDeleted: false },
      include: { author: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch your blogs" });
  }
};
