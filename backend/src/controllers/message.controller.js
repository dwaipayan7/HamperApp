import { getAuth } from "@clerk/express";
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import {
  encryptedMessage,
  decryptedMessage,
} from "../helpers/crypto.helper.js";
import Message from "../models/message.model.js";
import { getIO, onlineUsers } from "../socket/socket.js";

export const sendMessage = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const { receiverId, text } = req.body;

  if (!receiverId || !text) {
    return res.status(400).json({
      error:
        `Missing fields: ${!receiverId ? "receiverId" : ""} ${!text ? "text" : ""}`.trim(),
    });
  }

  const sender = await User.findOne({ clerkId: userId });
  if (!sender) return res.status(404).json({ error: "Sender not found" });

  const receiver = await User.findById(receiverId);
  if (!receiver) return res.status(404).json({ error: "Receiver not found" });

  // const encrypted = encryptedMessage(text);

  const message = await Message.create({
    sender: sender._id,
    receiver: receiver._id,
    // text: encrypted,
    text: text,
  });

  const populated = await Message.findById(message._id)
    .populate("sender", "firstName lastName username profilePicture")
    .populate("receiver", "firstName lastName username profilePicture");

  const payload = { ...populated.toObject(), text };

  getIO().to(receiver._id.toString()).emit("new-message", payload);
  getIO().to(sender._id.toString()).emit("new-message", payload);

  res.status(201).json({ message: populated });
});

export const getMessages = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const currentUser = await User.findOne({ clerkId: userId });
  if (!currentUser) return res.status(404).json({ error: "User not found" });

  const { receiverId } = req.params;

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

  const decrypted = messages.map((msg) => ({
    ...msg.toObject(),
    // text: decryptedMessage(msg.text),
    text: msg.text,
  }));

  res.status(200).json({ messages: decrypted });
});

export const getAllChatList = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const currentUser = await User.findOne({ clerkId: userId });
  if (!currentUser) return res.status(404).json({ error: "User not found" });

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
          // text: decryptedMessage(message.text),
          text: message.text,
          createdAt: message.createdAt,
          senderId: message.sender._id,
        },
      });
    }
  });

  const chatList = Array.from(chatMap.values());

  console.log("The List of chats are: ", chatList);

  res.status(200).json({ chatList });
});

//TODO Search User to Chat

export const searchChats = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const currentUser = await User.findOne({ clerkId: userId });

  const { name } = req.query;
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // const users = await User.find({
  //   $or: [
  //     {
  //       username: {
  //         $regex: escapedName,
  //         $options: "i",
  //       },
  //     },
  //     {
  //       firstName: {
  //         $regex: escapedName,
  //         $options: "i",
  //       },
  //     },
  //     {
  //       lastName: {
  //         $regex: escapedName,
  //         $options: "i",
  //       },
  //     },
  //   ],
  // }).select("firstName lastName username profilePicture");

  // const messages = await Message.find({
  //   $or: [{ sender: currentUser._id }, { receiver: currentUser._id }],
  // }).select("sender receiver")

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
      { firstName: { $regex: escapedName, $options: "i" } },
      { lastName: { $regex: escapedName, $options: "i" } },
      { username: { $regex: escapedName, $options: "i" } },
    ],
  }).select("firstName lastName username profilePicture");

  console.log("The users are: ", users);

  res.status(200).json({ users });
});

export const deleteConversation = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const currentUser = await User.findOne({ clerkId: userId });
  if (!currentUser) {
    return res.status(404).json({ error: "User not found" });
  }

  const { receiverId } = req.params;

  await Message.deleteMany({
    $or: [
      {
        sender: currentUser?._id,
        receiver: receiverId,
      },
      {
        receiver: currentUser?._id,
        sender: receiverId,
      },
    ],
  });

  res.status(200).json({
    status: true,
    message: "Conversation deleted successfully",
  });
});

export const reactToMessage = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const currentUser = await User.findOne({ clerkId: userId });

  const { messageId } = req.params;

  const { emoji } = req.body;

  const message = await Message.findById(messageId);

  if (!message) {
    return res.status(404).json({ error: "Message not found" });
  }

  // const existingReaction = message.reactions.find(
  //   (r) => r.user._id === currentUser._id,
  // );

  const existingReaction = message.reactions.find(
    (r) => r.user.toString() === currentUser._id.toString(),
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

  res.status(200).json(message);
});

export const replyToMessage = asyncHandler(async (req, res) => {
  const { userId } = getAuth(req);

  const currentUser = await User.findOne({ clerkId: userId });

  if (!currentUser) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  const { receiverId, text, replyTo } = req.body;

  if (!receiverId || !text || !replyTo) {
    return res.status(400).json({
      error: "receiverId, text and replyTo are required",
    });
  }

  const receiver = await User.findById(receiverId);

  // const message = await Message.create({
  //   sender:
  // })

  if (!receiver) {
    return res.status(404).json({ error: "Receiver not found" });
  }

  const originalMessage = await Message.findById(replyTo);

  if (!originalMessage) {
    return res.status(404).json({ error: "Original message not found" });
  }

  const message = await Message.create({
    sender: currentUser._id,
    receiver: receiver._id,
    text,
    replyTo: originalMessage._id,
  });

  const populatedMessage = await Message.findById(message._id)
    .populate("sender", "firstName lastName username profilePicture")
    .populate("receiver", "firstName lastName username profilePicture")
    .populate({
      path: "replyTo",
      select: "text sender createdAt",
      populate: {
        path: "sender",
        select: "firstName lastName username profilePicture",
      },
    });

  getIO().to(receiver._id.toString()).emit("new-message", populatedMessage);
  getIO().to(currentUser._id.toString()).emit("new-message", populatedMessage);

  res.status(201).json({
    message: populatedMessage,
  });
});
