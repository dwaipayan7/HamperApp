import { cacheClient } from "./redis.js";

export const getCache = async (key) => {
  const data = await cacheClient.get(key);
  if (!data) return null;
  try {
    return JSON.parse(data);
  } catch {
    return data; // return as-is if not valid JSON
  }
};

export const setCache = async (key, value, ttlSeconds = 60) => {
  await cacheClient.setex(key, ttlSeconds, JSON.stringify(value));
};

export const deleteCache = async (...keys) => {
  if (keys.length > 0) await cacheClient.del(...keys);
};

