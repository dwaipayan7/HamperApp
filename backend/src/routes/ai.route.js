import express from "express";
import { composeAI } from "../controllers/ai.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/compose", protectRoute, composeAI);

export default router;
