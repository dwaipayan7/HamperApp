import { Queue } from "bullmq";
import { bullConnection } from "../helpers/redis.js";

export const notificationQueue = new Queue("notifications", {
  connection: bullConnection,
  defaultJobOptions: {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000, // 2s → 4s → 8s between retries
    },
    removeOnComplete: 100, // keep last 100 completed jobs
    removeOnFail: 200,     // keep last 200 failed jobs for debugging
  },
});