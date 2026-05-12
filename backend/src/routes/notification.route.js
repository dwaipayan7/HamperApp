import { Router } from "express";
import asyncHandler from "express-async-handler";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  deleteNotification,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", protectRoute, getNotifications);
router.get("/:notificationId", protectRoute, deleteNotification);

export default router;
