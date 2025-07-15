import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const getUserBlogs = async (req: any, res: Response) => {
  const userId = req.userId;
  const blogs = await prisma.blog.findMany({
    where: { authorId: userId, isDeleted: false },
    orderBy: { createdAt: "desc" }
  });
  res.json(blogs);
};

export const updateUserInfo = async (req: any, res: Response) => {
  const userId = req.userId;
  const { firstName, lastName, username, email } = req.body;
  try {
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { firstName, lastName, username, email }
    });
    res.json({ message: "Updated", user: { ...updated, password: undefined } });
  } catch (err) {
    res.status(400).json({ error: "Update failed", details: err });
  }
};

export const updatePassword = async (req: any, res: Response) => {
  const userId = req.userId;
  const { currentPassword, newPassword } = req.body;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return res.status(404).json({ error: "User not found" });
  const valid = await bcrypt.compare(currentPassword, user.password);
  if (!valid) return res.status(400).json({ error: "Wrong current password" });
  const newHash = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: newHash } });
  res.json({ message: "Password updated" });
};