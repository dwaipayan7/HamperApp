import Message from "../models/message.model.js";
import User from "../models/user.model.js";

class MessageService {
  static async getAllChatList(clerkId) {
    const currentUser = await User.findOne({ clerkId });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const messages = await Message.find({
      $or: [{ sender: currentUser._id }, { receiver: currentUser._id }],
    })
      .populate("sender receiver", "firstName lastName profilePicture")
      .sort({ createdAt: -1 });

    const chatMap = new Map();

    messages.forEach((message) => {
      const isCurrentUserSender =
        message.sender._id.toString() === currentUser._id.toString();

      const otherUser = isCurrentUserSender ? message.receiver : message.sender;

      const otherUserId = otherUser._id.toString();

      if (!chatMap.has(otherUserId)) {
        chatMap.set(otherUserId, {
          user: otherUser,
          lastMessage: {
            text: message.text,
            createdAt: message.createdAt,
            senderId: message.sender._id,
          },
        });
      }
    });

    return Array.from(chatMap.values());
  }

  static async searchChats(clerkId, name) {
    const currentUser = await User.findOne({ clerkId });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const chatUserIds = await Message.aggregate([
      {
        $match: {
          $or: [{ sender: currentUser._id }, { receiver: currentUser._id }],
        },
      },
      {
        $project: {
          otherUser: {
            $cond: [
              { $eq: ["$sender", currentUser._id] },
              "$receiver",
              "$sender",
            ],
          },
        },
      },
      {
        $group: {
          _id: "$otherUser",
        },
      },
    ]);

    const users = await User.find({
      _id: {
        $in: chatUserIds.map((u) => u._id),
      },
      $or: [
        {
          firstName: {
            $regex: escapedName,
            $options: "i",
          },
        },
        {
          lastName: {
            $regex: escapedName,
            $options: "i",
          },
        },
        {
          username: {
            $regex: escapedName,
            $options: "i",
          },
        },
      ],
    }).select("firstName lastName username profilePicture");

    return users;
  }

  static async deleteConversation(clerkId, receiverId) {
    const currentUser = await User.findOne({ clerkId });

    if (!currentUser) {
      throw new Error("User not found");
    }

    await Message.deleteMany({
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

    return {
      status: true,
      message: "Conversation deleted successfully",
    };
  }

  static async reactToMessage(clerkId, messageId, emoji) {
    const currentUser = await User.findOne({ clerkId });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const message = await Message.findById(messageId);

    if (!message) {
      throw new Error("Message not found");
    }

    const existingReaction = message.reactions.find(
      (reaction) => reaction.user.toString() === currentUser._id.toString(),
    );

    if (existingReaction) {
      existingReaction.emoji = emoji;
    } else {
      message.reactions.push({
        user: currentUser._id,
        emoji,
      });
    }

    await message.save();

    return message;
  }
}

export default MessageService;
