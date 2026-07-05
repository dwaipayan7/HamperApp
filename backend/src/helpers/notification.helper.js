import admin from "../config/firebase.js";

/**
 * Send a push notification using Firebase Cloud Messaging
 * @param {string} fcmToken - The target user's FCM token
 * @param {string} title - The notification title
 * @param {string} body - The notification body
 * @param {Object} data - Additional data payload
 */
export const sendPushNotification = async (fcmToken, title, body, data = {}) => {
  try {
    if (!fcmToken) {
      console.log("No FCM token provided, skipping push notification.");
      return;
    }

    const message = {
      notification: {
        title,
        body,
      },
      data,
      token: fcmToken,
    };

    const response = await admin.messaging().send(message);
    console.log("Successfully sent push notification:", response);
    return response;
  } catch (error) {
    console.error("Error sending push notification:", error);
  }
};
