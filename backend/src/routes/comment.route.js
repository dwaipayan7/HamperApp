import { Router } from "express";

import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";
import {
  createComment,
  deleteComment,
  getComments,
} from "../controllers/comment.controller.js";

const router = Router();

router.get("/post/:postId", getComments);

router.post("/post/:postId", protectRoute, createComment);
router.delete("/:commentId", protectRoute, deleteComment);

export default router;
