import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getIO } from "../socket/socket.js";
import { sendPushNotification } from "../helpers/notification.helper.js";

class MessageService {
  static async sendMessage(clerkId, body) {
    const { receiverId, text } = body;

    if (!receiverId || !text) {
      throw new Error("receiverId and text are required");
    }

    const sender = await User.findOne({
      clerkId,
    });

    if (!sender) {
      throw new Error("Sender not found");
    }

    const receiver = await User.findById(receiverId);

    if (!receiver) {
      throw new Error("Receiver not found");
    }

    const message = await Message.create({
      sender: sender._id,
      receiver: receiver._id,
      text,
    });

    const populated = await Message.findById(message._id)
      .populate("sender", "firstName lastName username profilePicture")
      .populate("receiver", "firstName lastName username profilePicture");

    getIO().to(receiver._id.toString()).emit("new-message", populated);
    getIO().to(sender._id.toString()).emit("new-message", populated);

    if (receiver.fcmToken) {
      await sendPushNotification(
        receiver.fcmToken,
        `${sender.firstName} ${sender.lastName}`,
        text,
        {
          type: "chat",
          senderId: sender._id.toString(),
        },
      );
    }

    return populated;
  }

  static async getMessages(clerkId, receiverId) {
    const currentUser = await User.findOne({
      clerkId,
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const messages = await Message.find({
      $or: [
        {
          sender: currentUser._id,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: currentUser._id,
        },
      ],
    });
    const messages = await Message.find({
      $or: [
        {
          sender: currentUser._id,
          receiver: receiverId,
        },
        {
          sender: receiverId,
          receiver: currentUser._id,
        },
      ],
    })
      .populate("sender", "firstName lastName  profilePicture")
      .populate("receiver", "firstName lastName  profilePicture")
      .populate("reactions.user", "firstName lastName profilePicture")
      .populate({
        path: "replyTo",
        select: "text sender createdAt",
        populate: {
          path: "sender",
          select: "firstName lastName profilePicture",
        },
      })
      .sort({ createdAt: -1 });

    return messages.map((msg) => ({
      ...msg.toObject(),
      text: msg.text,
    }));
  }

  static getAllChatList() {}
}

export default MessageService;
