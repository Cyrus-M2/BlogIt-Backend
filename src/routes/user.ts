import { Router } from "express";
import * as userCtrl from "../controllers/user";
import { authenticateJWT } from "../middleware/auth";

const router = Router();

router.get("/blogs", authenticateJWT, userCtrl.getUserBlogs);
router.patch("/", authenticateJWT, userCtrl.updateUserInfo);
router.patch("/password", authenticateJWT, userCtrl.updatePassword);

export default router;