import asyncHandler from "express-async-handler";
import { getAuth } from "@clerk/express";
import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";
import NotificationService from "../services/notification.service.js";

export const getNotifications = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const notifications = await NotificationService.getNotifications(userId);

  if (!notifications) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ notifications });
});

export const getUnreadCount = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const count = await NotificationService.getUnreadCount(userId);

  if (count === undefined || count === null) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ count });
});

export const markAsRead = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { notificationId } = req.params;

  const notification = await NotificationService.markAsRead(
    userId,
    notificationId,
  );

  if (!notification) {
    return res.status(404).json({ error: "Notification not found" });
  }

  res.status(200).json({ message: "Notification marked as read" });
});

export const markAllAsRead = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const result = await NotificationService.markAllAsRead(userId);

  if (!result) {
    return res.status(404).json({ error: "User not found" });
  }

  res.status(200).json({ message: "All notifications marked as read" });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);
  const { notificationId } = req.params;

  const notification = await NotificationService.deleteNotification(
    userId,
    notificationId,
  );

  if (!notification)
    return res.status(404).json({ error: "Notification not found" });

  res.status(200).json({ message: "Notification deleted successfully" });
});
