import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { clerkClient, getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ user });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOneAndUpdate({ clerkId: userId }, req.body, {
    new: true,
  });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ user });
});

export const syncUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      error: "Unauthorized",
    });
  }

  const existingUser = await User.findOne({
    clerkId: userId,
  });

  if (existingUser) {
    return res.status(200).json({
      user: existingUser,
      message: "User already exists",
    });
  }

  const clerkUser = await clerkClient.users.getUser(userId);

  const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
  const rawUsername =
    clerkUser.username ||
    email.split("@")[0] ||
    userId.replace(/^user_/, "") ||
    userId;
  const sanitizedUsername = rawUsername
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 30);

  let username = sanitizedUsername || userId;
  let usernameSuffix = 1;

  while (await User.findOne({ username })) {
    username = `${sanitizedUsername || userId}${usernameSuffix}`;
    usernameSuffix += 1;
  }

  const userData = {
    clerkId: userId,
    email,
    firstName: clerkUser.firstName || "",
    lastName: clerkUser.lastName || "",
    username,
    profilePicture: clerkUser.imageUrl || "",
  };

  const user = await User.create(userData);

  res.status(201).json({
    user,
    message: "User created successfully",
  });
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ user });
});

export const followUser = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const { targetUserId } = req.params;

  if (userId === targetUserId) {
    return res.status(400).json({
      error: "You cannot follow yourself",
    });
  }

  const currentUser = await User.findOne({
    clerkId: userId,
  });

  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const isFollowing = currentUser.following.includes(targetUserId);

  if (isFollowing) {
    await User.findByIdAndUpdate(currentUser._id, {
      $pull: { following: targetUserId },
    });

    await User.findByIdAndUpdate(targetUserId, {
      $pull: { followers: currentUser._id },
    });

    return res.status(200).json({
      message: "User unfollowed",
    });
  }

  await User.findByIdAndUpdate(currentUser._id, {
    $push: { following: targetUserId },
  });

  await User.findByIdAndUpdate(targetUserId, {
    $push: { followers: currentUser._id },
  });

  await Notification.create({
    from: currentUser._id,
    to: targetUserId,
    type: "follow",
  });

  res.status(200).json({
    message: "User followed",
  });
});
