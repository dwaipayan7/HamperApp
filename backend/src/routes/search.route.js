import express from "express";

import {
  searchUsersController,
  searchPostsController,
  globalSearchController,
  getRecentSearchesController,
  clearSearchHistoryController,
} from "../controllers/search.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, globalSearchController);

router.get("/users", protectRoute, searchUsersController);

router.get("/posts", protectRoute, searchPostsController);

router.get("/recent", protectRoute, getRecentSearchesController);

router.delete("/recent", protectRoute, clearSearchHistoryController);

export default router;
