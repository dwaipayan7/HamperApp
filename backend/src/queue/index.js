import { notificationQueue } from "./notification.queue.js";


export const enqueueNotification = async ({ token, title, body, data = {}, delay = 0 }) => {
    if (!token) return;

    await notificationQueue.add("send-push", { token, title, body, data }, { delay });
};
