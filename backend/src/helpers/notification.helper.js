import admin from "../config/firebase.js";
import { logger } from "../config/logger.js";

export const sendPushNotification = async ({ token, title, body, data }) => {
  try {
    if (!token) {
      logger.debug("No FCM token provided, skipping push notification.");
      return;
    }

    const message = {
      notification: { title, body },
      token,
      ...(data && { data }),
    };

    const response = await admin.messaging().send(message);
    logger.info({ messageId: response }, "Push notification sent successfully");
    return response;
  } catch (error) {
    logger.error({ err: error }, "Failed to send push notification");
    throw error; // re-throw so BullMQ can retry the job
  }
};

