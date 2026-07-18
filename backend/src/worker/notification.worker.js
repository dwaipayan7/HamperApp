import { Worker } from "bullmq";
import { bullConnection } from "../helpers/redis.js";
import { sendPushNotification } from "../helpers/notification.helper.js";

export const startNotificationWorker = () => {
  const worker = new Worker(
    "notifications", // must match queue name in notification.queue.js
    async (job) => {
      const { token, title, body, data } = job.data;
      console.log(`[Worker] Processing job ${job.id} → "${title}"`);
      await sendPushNotification({ token, title, body, data });
    },
    { connection: bullConnection }
  );

  worker.on("completed", (job) => {
    console.log(`[Worker] ✅ Job ${job.id} completed`);
  });

  worker.on("failed", (job, err) => {
    console.error(
      `[Worker] ❌ Job ${job.id} failed (attempt ${job.attemptsMade}/${job.opts.attempts}): ${err.message}`
    );
  });

  console.log("[Worker] 🚀 Notification worker started");
  return worker;
};
