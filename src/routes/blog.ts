import { Router } from "express";
import * as blogCtrl from "../controllers/blog";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/my", authenticateJWT, blogCtrl.getMyBlogs);

router.get("/", blogCtrl.getAllBlogs);
router.post("/", authenticateJWT, blogCtrl.createBlog);
router.get("/:blogId", blogCtrl.getBlogById);
router.patch("/:blogId", authenticateJWT, blogCtrl.updateBlog);
router.delete("/:blogId", authenticateJWT, blogCtrl.deleteBlog);

export default router;