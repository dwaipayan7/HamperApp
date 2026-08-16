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

  static getUnreadCount = async (clerkId) => {
    const user = await User.findOne({ clerkId });
    if (!user) return null;

    const count = await Notification.countDocuments({
      to: user._id,
      isRead: false,
    });
    return count;
  };

  static markAsRead = async (clerkId, notificationId) => {
    const user = await User.findOne({ clerkId });
    if (!user) return null;

    return Notification.findOneAndUpdate(
      { _id: notificationId, to: user._id },
      { isRead: true },
      { new: true },
    );
  };

  static markAllAsRead = async (clerkId) => {
    const user = await User.findOne({ clerkId });
    if (!user) return null;

    const result = await Notification.updateMany(
      { to: user._id, isRead: false },
      { isRead: true },
    );
    return result;
  };

  static deleteNotification = async (clerkId, notificationId) => {
    const user = await User.findOne({ clerkId });
    if (!user) return null;

    return Notification.findOneAndDelete({ _id: notificationId, to: user._id });
  };
}

export default NotificationService;
