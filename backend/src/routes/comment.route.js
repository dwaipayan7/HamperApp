import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  createComment,
  getComments,
  deleteComment,
  likedComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

// public routes
router.get("/post/:postId", getComments);

// protected routes
router.post("/post/:postId", protectRoute, createComment);
router.post("/:commentId/like", protectRoute, likedComment);
router.delete("/:commentId", protectRoute, deleteComment);

export default router;
