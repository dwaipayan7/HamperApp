import { ChatPromptTemplate } from "@langchain/core/prompts";
import { JsonOutputParser } from "@langchain/core/output_parsers";
import { getOpenRouterModel } from "../config/langchain.js";
import { logger } from "../config/logger.js";

const jsonParser = new JsonOutputParser();

export const enhancePost = async ({ content, tone = "engaging", model }) => {
  try {
    const llm = getOpenRouterModel({ model, temperature: 0.7 });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a social media ghostwriter and content editor for HamperApp, a modern social media platform.
Your task is to refine and rewrite user post drafts to be engaging, high-impact, and clear.
Each version should stay under 280 characters unless the original draft is substantially longer.
Preserve the user's original message, key facts, and intent.

Format output as a valid JSON object strictly matching this schema:
{{
  "suggestions": [
    {{
      "tone": "Name of tone (e.g. Punchy, Casual, Professional, Witty)",
      "text": "The enhanced post text"
    }}
  ]
}}
Do NOT include markdown code fences or conversational commentary outside the JSON.`,
      ],
      [
        "human",
        `Original Post:
"{content}"

Requested Primary Tone: {tone}

Please provide 3 distinct enhanced variations:
1. One closely matching the requested tone ({tone})
2. One short & punchy / high-engagement
3. One friendly / conversational`,
      ],
    ]);

    const chain = prompt.pipe(llm).pipe(jsonParser);
    const result = await chain.invoke({ content, tone });

    return result;
  } catch (error) {
    logger.error({ err: error, content, tone }, "AI enhancePost failed");
    throw error;
  }
};

export const generateHashtags = async ({ content, count = 6, model }) => {
  try {
    const llm = getOpenRouterModel({ model, temperature: 0.5 });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are an expert social media hashtag strategist.
Generate {count} relevant, trending, and clean hashtags for the given social media post.
Each hashtag MUST start with '#' and have no spaces or punctuation.

Format output as a valid JSON object strictly matching this schema:
{{
  "hashtags": ["#tag1", "#tag2", "#tag3"]
}}
Do NOT include markdown code fences or conversational commentary outside the JSON.`,
      ],
      [
        "human",
        `Post Content:
"{content}"

Generate {count} top relevant hashtags:`,
      ],
    ]);

    const chain = prompt.pipe(llm).pipe(jsonParser);
    const result = await chain.invoke({ content, count });

    return result;
  } catch (error) {
    logger.error({ err: error, content }, "AI generateHashtags failed");
    throw error;
  }
};

export const generateCaption = async ({ topic, tone = "engaging", model }) => {
  try {
    const llm = getOpenRouterModel({ model, temperature: 0.8 });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You are a creative social media copywriter.
Generate 3 captivating post options based on the user's idea/topic.
Each post should be ready to publish, well-crafted, under 280 characters, and include 2-3 inline or appended hashtags.

Format output as a valid JSON object strictly matching this schema:
{{
  "captions": [
    {{
      "text": "The full post text including hashtags",
      "hashtags": ["#tag1", "#tag2"]
    }}
  ]
}}
Do NOT include markdown code fences or conversational commentary outside the JSON.`,
      ],
      [
        "human",
        `Topic/Idea: "{topic}"
Preferred Tone: {tone}

Generate 3 creative post captions:`,
      ],
    ]);

    const chain = prompt.pipe(llm).pipe(jsonParser);
    const result = await chain.invoke({ topic, tone });

    return result;
  } catch (error) {
    logger.error({ err: error, topic, tone }, "AI generateCaption failed");
    throw error;
  }
};
