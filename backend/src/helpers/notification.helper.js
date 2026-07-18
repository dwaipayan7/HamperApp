// import admin from "../config/firebase.js";
import { getMessaging } from "firebase-admin/messaging";
import app from "../config/firebase.js";

const messaging = getMessaging(app);

export const sendPushNotification = async ({
  token,
  title,
  body,
  data = {},
}) => {
  if (!token) return;

  try {
    await messaging.send({
      token,

      notification: {
        title,
        body,
      },

      data,
    });
  } catch (err) {
    console.log(err);
  }
};
