import { getAuth } from "@clerk/express";
import asyncHandler from "express-async-handler";
import Video from "../models/video.model.js";
import User from "../models/user.model.js";
import cloudinary from "../config/cloudinary.js";

export const getVideoById = asyncHandler(async (req, res) => {
  const { username } = req.params;
  const { limit = 10, skip = 0 } = req.query;

  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const videos = await Video.find({
    user: user._id,
  })
    .populate("user", "firstName lastName username profilePicture")
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .skip(Number(skip));

  res.status(200).json({
    user: {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      profilePicture: user.profilePicture,
    },
    videos,
    total: await Video.countDocuments({
      user: user._id,
    }),
  });
});

export const getAllVideos = asyncHandler(async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;

  const videos = await Video.find()
    .populate("user", "firstName lastName username profilePicture")
    .sort({ createdAt: -1 })
    .limit(parseInt(limit))
    .skip(parseInt(skip));

  res.status(200).json(videos);
});

export const createVideo = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (!req.file) {
    return res.status(400).json({ message: "No video uploaded" });
  }

  const { title, caption } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  const result = cloudinary.uploader.upload(req.file.path, {
    resource_type: "video",
    folder: "videos",
    eager: [
      {
        streaming_profile: "hd",
        format: "m3u8",
      },
      {
        width: 300,
        height: 500,
        crop: "pad",
        format: "jpg",
      },
    ],
    eager_async: true,
  });

  const video = await Video.create({
    user: user._id,
    title,
    caption,
    videoUrl: (await result).secure_url,
    thumbnailUrl: result.eager?.[1]?.secure_url || (await result).secure_url,
    cloudinaryId: (await result).public_id,
  });

  const populateVideos = await Video.findById(video._id).populate(
    "user",
    "firstName lastName username profilePicture",
  );

  res.status(201).json({
    success: true,
    video: populateVideos,
  });
});

export const toggleLikeVideo = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const user = await User.findOne({ clerkId: userId });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const { videoId } = req.params;

  const video = await Video.findById(videoId);

  if (!videoId) {
    return res.status(404).json({ message: "Video not found" });
  }

  const alreadyLiked = video.likes.includes(user._id);

  if (alreadyLiked) {
    video.likes = video.likes.filter(
      (id) => id.toString() !== user._id.toString(),
    );
  } else {
    video.likes.push(user._id);
  }

  await video.save();

  res.status(200).json({
    success: true,
    liked: !alreadyLiked,
    likesCount: video.likes.length,
  });
});
