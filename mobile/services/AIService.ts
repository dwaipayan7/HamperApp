import { ApiUtility } from "@/utils/api";
import { useMutation } from "@tanstack/react-query";

const apiUtility = ApiUtility.getInstance();

export type AIAction = "enhance" | "hashtags" | "caption";

export interface AIComposePayload {
  action: AIAction;
  content?: string;
  topic?: string;
  tone?: string;
  count?: number;
  model?: string;
}

export interface EnhanceSuggestion {
  tone: string;
  text: string;
}

export interface CaptionSuggestion {
  text: string;
  hashtags: string[];
}

export interface AIComposeData {
  suggestions?: EnhanceSuggestion[];
  hashtags?: string[];
  captions?: CaptionSuggestion[];
}

export interface AIComposeResponse {
  success: boolean;
  data?: AIComposeData;
  error?: string;
  code?: string;
}

/**
 * Mutation hook for requesting AI post assistance via LangChain + OpenRouter.
 */
export const useAICompose = () => {
  return useMutation({
    mutationFn: async (payload: AIComposePayload): Promise<AIComposeData> => {
      const response = await apiUtility.post<AIComposeResponse>(
        "/ai/compose",
        payload,
      );

      if (!response?.success) {
        throw new Error(response?.error || "AI service request failed");
      }

      return response.data || {};
    },
  });
};
