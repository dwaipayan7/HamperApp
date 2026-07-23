import Redis from "ioredis";
import { ENV } from "../config/env.js";
import { logger } from "../config/logger.js";

export const bullConnection = new Redis({
  host: ENV.VALKEY_HOST || "localhost",
  port: Number(ENV.VALKEY_PORT) || 6379,
  maxRetriesPerRequest: null,
});

export const cacheClient = new Redis({
  host: ENV.VALKEY_HOST || "localhost",
  port: Number(ENV.VALKEY_PORT) || 6379,
});

bullConnection.on("connect", () => logger.info("[Valkey] BullMQ connection ready"));
cacheClient.on("connect", () => logger.info("[Valkey] Cache client ready"));
bullConnection.on("error", (err) => logger.error({ err }, "[Valkey] BullMQ error"));
cacheClient.on("error", (err) => logger.error({ err }, "[Valkey] Cache error"));

