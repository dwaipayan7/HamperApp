import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import {
  getAllPosts as fetchAllPosts,
  getPostById as fetchPostById,
  getPostWithComments as fetchPostWithComments,
  getUserPostsByUsername as fetchUserPosts,
  createPost as createPostService,
  likePost as likePostService,
  deletePost as deletePostService,
  repostPost as repostPostService,
} from "../services/post.service.js";

export const getPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const result = await fetchAllPosts(page, limit);
  res.status(200).json({ ...result });
});


export const getPostById = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await fetchPostById(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.status(200).json({ post });
});

export const getPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const post = await fetchPostWithComments(postId);
  if (!post) return res.status(404).json({ error: "Post not found" });
  res.status(200).json({ post });
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const posts = await fetchUserPosts(username);
  if (posts === null) return res.status(404).json({ error: "User not found" });
  res.status(200).json({ posts });
});

export const createPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { content } = req.body;
  const imageFile = req.file;

  if (!content && !imageFile) {
    return res
      .status(400)
      .json({ error: "Post must contain either text or image" });
  }

  const post = await createPostService(userId, content, imageFile);
  if (!post) return res.status(404).json({ error: "User not found" });

  res.status(201).json({ post });
});

export const likePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  const result = await likePostService(userId, postId);
  if (!result) return res.status(404).json({ error: "User or post not found" });

  res.status(200).json({
    message: result.isLiked
      ? "Post unliked successfully"
      : "Post liked successfully",
  });
});

export const deletePost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;

  const result = await deletePostService(userId, postId);

  if (result.error === "not_found")
    return res.status(404).json({ error: "User or post not found" });

  if (result.error === "forbidden")
    return res
      .status(403)
      .json({ error: "You can only delete your own posts" });

  res.status(200).json({ message: "Post deleted successfully" });
});

export const repostPost = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { postId } = req.params;
  const { content } = req.body;

  const result = await repostPostService(userId, postId, content);

  if (result.error === "user_not_found")
    return res.status(404).json({ error: "User not found" });

  if (result.error === "post_not_found")
    return res.status(404).json({ error: "Post not found" });

  if (result.error === "already_reposted")
    return res.status(400).json({ error: "Already Reposted" });

  res
    .status(201)
    .json({ message: "Post reposted successfully", post: result.repost });
});
