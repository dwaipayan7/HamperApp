import { ChatOpenRouter } from "@langchain/openrouter";
import { ENV } from "./env.js";

export const getOpenRouterModel = (options = {}) => {
  const apiKey = options.apiKey || ENV.OPENROUTER_API_KEY;
  const modelName =
    options.model ||
    ENV.OPENROUTER_MODEL ||
    "meta-llama/llama-3.3-70b-instruct:free";

  if (!apiKey) {
    const error = new Error(
      "OPENROUTER_API_KEY is not configured in backend/.env. Please provide a valid key.",
    );

    error.statusCode = 503;
    error.code = "AI_NOT_CONFIGURED";
    error.isOperational = true;

    throw error;
  }

  return new ChatOpenRouter({
    model: modelName,
    apiKey,
    temperature: options.temperature ?? 0.7,
    maxTokens: options.maxTokens ?? 1000,
  });
};
