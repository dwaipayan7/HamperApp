// import Redis from "ioredis";
// import ENV from "../config/env.js";

// const connection = new Redis({
//   host: ENV,
//   port: Number(process.env.VALKEY_PORT),
// });

// export default connection;

import Redis from "ioredis";
import { ENV } from "../config/env.js";

// Shared connection for BullMQ
export const bullConnection = new Redis({
  host: ENV.VALKEY_HOST || "localhost",
  port: Number(ENV.VALKEY_PORT) || 6379,
  maxRetriesPerRequest: null,
});

// Separate connection for caching
export const cacheClient = new Redis({
  host: ENV.VALKEY_HOST || "localhost",
  port: Number(ENV.VALKEY_PORT) || 6379,
});

bullConnection.on("connect", () =>
  console.log("[Valkey] BullMQ connection ready"),
);
cacheClient.on("connect", () => console.log("[Valkey] Cache client ready"));
bullConnection.on("error", (err) =>
  console.error("[Valkey] BullMQ error:", err.message),
);
cacheClient.on("error", (err) =>
  console.error("[Valkey] Cache error:", err.message),
);
