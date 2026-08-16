import asyncHandler from "express-async-handler";
import {
  searchUsers,
  searchPosts,
  globalSearch,
  getRecentSearches,
  deleteSearchHistory,
} from "../services/search.service.js";

// export const getPosts = asyncHandler(async (req, res) => {
//   const { page = 1, limit = 20 } = req.query;
//   const result = await fetchAllPosts(page, limit);
//   res.status(200).json({ ...result });
// });

export const searchUsersController = asyncHandler(async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const users = await searchUsers(q.trim());

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

export const searchPostsController = asyncHandler(async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const posts = await searchPosts(q.trim());

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
});

export const globalSearchController = async (req, res, next) => {
  try {
    const { q } = req.query;

    if (!q?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const result = await globalSearch(q.trim(), req.user?._id);

    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentSearchesController = asyncHandler(
  async (req, res, next) => {
    try {
      const searches = await getRecentSearches(req.user._id);

      return res.status(200).json({
        success: true,
        data: searches,
      });
    } catch (error) {
      next(error);
    }
  },
);

export const clearSearchHistoryController = asyncHandler(
  async (req, res, next) => {
    try {
      await deleteSearchHistory(req.user._id);

      return res.status(200).json({
        success: true,
        message: "Search history cleared",
      });
    } catch (error) {
      next(error);
    }
  },
);
