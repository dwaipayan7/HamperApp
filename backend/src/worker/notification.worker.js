import { Worker } from "bullmq";
import { bullConnection } from "../helpers/redis.js";
import { sendPushNotification } from "../helpers/notification.helper.js";
import { logger } from "../config/logger.js";

export const startNotificationWorker = () => {
  const worker = new Worker(
    "notifications",
    async (job) => {
      const { token, title, body, data } = job.data;
      logger.info({ jobId: job.id, title }, "[Worker] Processing notification job");
      await sendPushNotification({ token, title, body, data });
    },
    { connection: bullConnection },
  );

  worker.on("completed", (job) => {
    logger.info({ jobId: job.id }, "[Worker] Notification job completed");
  });

  worker.on("failed", (job, err) => {
    logger.error(
      { jobId: job.id, attempt: job.attemptsMade, maxAttempts: job.opts.attempts, err },
      "[Worker] Notification job failed",
    );
  });

  logger.info("[Worker] Notification worker started");
  return worker;
};

