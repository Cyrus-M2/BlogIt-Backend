import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

if (
  !process.env.CLOUDINARY_CLOUD_NAME ||
  !process.env.CLOUDINARY_API_KEY ||
  !process.env.CLOUDINARY_API_SECRET
) {
  console.error("Missing Cloudinary environment variables");
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "blogit_uploads",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
    };
  },
});

const upload = multer({ storage });

const router = Router();

router.post("/", upload.single("image"), (req, res) => {
  try {
    console.log("File upload received:", req.file);

    if (!req.file || !req.file.path) {
      console.warn("No file uploaded or file.path missing");
      return res.status(400).json({ error: "Upload failed or no image provided" });
    }

    return res.status(200).json({
      imageUrl: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    console.error("Server error during image upload:", error);
    return res.status(500).json({ error: "Internal server error during image upload" });
  }
});

export default router;
