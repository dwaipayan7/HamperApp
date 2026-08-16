import express from "express";
import {
  followUser,
  getCurrentUser,
  getUserProfile,
  syncUser,
  updateProfile,
  getFollowersByUsername,
  getFollowingByUsername,
  saveFCMToken,
} from "../controllers/user.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { validate, updateProfileSchema, saveFCMTokenSchema } from "../middleware/validate.middleware.js";

const router = express.Router();

// public route
router.get("/profile/:username", getUserProfile);
router.get("/following/:username", getFollowingByUsername);
router.get("/followers/:username", getFollowersByUsername);

// protected routes
router.post("/sync", protectRoute, syncUser);
router.get("/me", protectRoute, getCurrentUser);
router.put("/profile", protectRoute, validate(updateProfileSchema), updateProfile);
router.post("/follow/:targetUserId", protectRoute, followUser);
router.post("/save-fcm-token", protectRoute, validate(saveFCMTokenSchema), saveFCMToken);

export default router;

