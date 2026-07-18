import Notification from "../models/notification.model.js";
import User from "../models/user.model.js";

class NotificationService {
  static getNotifications = async (clerkId) => {
    const user = await User.findOne({ clerkId });
    if (!user) return null;

    return Notification.find({ to: user._id })
      .sort({ createdAt: -1 })
      .populate("from", "username firstName lastName profilePicture")
      .populate("post", "content image")
      .populate("comment", "content");
  };

  static deleteNotification = async (clerkId, notificationId) => {
    const user = await User.findOne({ clerkId });
    if (!user) return null;

    return Notification.findOneAndDelete({ _id: notificationId, to: user._id });
  };
}

export default NotificationService;
