import express from "express";
import {
  getPosts,
  getPostById,
  getPost,
  getUserPosts,
  createPost,
  likePost,
  deletePost,
  repostPost,
} from "../controllers/post.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import upload from "../middleware/upload.middleware.js";

const router = express.Router();

// ── Public routes ─────────────────────────────────────────────────────────────
router.get("/", getPosts);
router.get("/user/:username", getUserPosts);
router.get("/:postId/full", getPost);
router.get("/:postId", getPostById);

// ── Protected routes ──────────────────────────────────────────────────────────
router.post("/", protectRoute, upload.single("image"), createPost);
router.post("/:postId/like", protectRoute, likePost);
router.post("/:postId/repost", protectRoute, repostPost);
router.delete("/:postId", protectRoute, deletePost);

export default router;
