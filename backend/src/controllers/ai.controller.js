import asyncHandler from "express-async-handler";
import {
  enhancePost,
  generateHashtags,
  generateCaption,
} from "../services/ai.service.js";
import { ok, fail } from "../helpers/response.js";

export const composeAI = asyncHandler(async (req, res) => {
  const {
    action,
    content,
    topic,
    tone = "engaging",
    count = 6,
    model,
  } = req.body;

  if (!action) {
    return fail(
      res,
      "Missing 'action' parameter. Expected 'enhance', 'hashtags', or 'caption'.",
      400,
      "INVALID_ACTION",
    );
  }

  try {
    switch (action) {
      case "enhance": {
        const textToEnhance = (content || topic || "").trim();
        if (!textToEnhance) {
          return fail(
            res,
            "Content cannot be empty for post enhancement",
            400,
            "EMPTY_CONTENT",
          );
        }
        const data = await enhancePost({
          content: textToEnhance,
          tone,
          model,
        });
        return ok(res, data);
      }

      case "hashtags": {
        const textForTags = (content || topic || "").trim();
        if (!textForTags) {
          return fail(
            res,
            "Content cannot be empty for hashtag generation",
            400,
            "EMPTY_CONTENT",
          );
        }
        const data = await generateHashtags({
          content: textForTags,
          count: Number(count) || 6,
          model,
        });
        return ok(res, data);
      }

      case "caption": {
        const idea = (topic || content || "").trim();
        if (!idea) {
          return fail(
            res,
            "Topic or idea cannot be empty for caption generation",
            400,
            "EMPTY_TOPIC",
          );
        }
        const data = await generateCaption({
          topic: idea,
          tone,
          model,
        });
        return ok(res, data);
      }

      default:
        return fail(
          res,
          `Unsupported action '${action}'. Valid options are 'enhance', 'hashtags', 'caption'.`,
          400,
          "INVALID_ACTION",
        );
    }
  } catch (error) {
    if (error.code === "AI_NOT_CONFIGURED" || error.statusCode === 503) {
      return fail(res, error.message, 503, "AI_NOT_CONFIGURED");
    }

    // Pass through other operational or unexpected errors
    const statusCode = error.statusCode || 500;
    const message = error.message || "Failed to generate AI response";
    return fail(res, message, statusCode, error.code || "AI_ERROR");
  }
});
