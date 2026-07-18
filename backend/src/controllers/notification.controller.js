import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import NotificationService from "../services/notification.service.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  // const user = await User.findOne({ clerkId: userId });
  // if (!user) return res.status(404).json({ error: "User not found" });

  // const notifications = await Notification.find({ to: user._id })
  //   .sort({ createdAt: -1 })
  //   .populate("from", "username firstName lastName profilePicture")
  //   .populate("post", "content image")
  //   .populate("comment", "content");

  const notifications = await NotificationService.getNotifications(userId);

  if (!notifications) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  console.log("The Notifications are: ", notifications);

  res.status(200).json({ notifications });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { notificationId } = req.params;

  // const user = await User.findOne({ clerkId: userId });
  // if (!user) return res.status(404).json({ error: "User not found" });

  // const notification = await Notification.findOneAndDelete({
  //   _id: notificationId,
  //   to: user._id,
  // });

  const notification = NotificationService.deleteNotification(
    userId,
    notificationId,
  );

  if (!notification)
    return res.status(404).json({ error: "Notification not found" });

  res.status(200).json({ message: "Notification deleted successfully" });
});
