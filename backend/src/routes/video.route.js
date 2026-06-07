import express from "express";
import {
  createVideo,
  getAllVideos,
  getVideoById,
  toggleLikeVideo,
} from "../controllers/video.controller.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { upload } from "../middleware/upload.video.middleware.js";

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:username", getVideoById);

router.post("/", protectRoute, upload.single("file"), createVideo);
router.put("/:videoId/like", protectRoute, toggleLikeVideo);

export default router;
