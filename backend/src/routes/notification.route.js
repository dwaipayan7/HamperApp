import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", protectRoute, getNotifications);
router.get("/count", protectRoute, getUnreadCount);
router.post("/read-all", protectRoute, markAllAsRead);
router.post("/:notificationId/read", protectRoute, markAsRead);
router.delete("/:notificationId", protectRoute, deleteNotification);

export default router;
