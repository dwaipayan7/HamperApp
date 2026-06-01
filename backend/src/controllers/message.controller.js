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

  const sender = await User.findOne({ clerkId: userId });
  if (!sender) return res.status(404).json({ error: "Sender not found" });

  const { receiverId, text } = req.body;

  const receiver = await User.findById(receiverId); // getting the receiver --> clerk Id
  if (!receiver) return res.status(404).json({ error: "Receiver not found" });

  const encrypted = encryptedMessage(text);

  const message = await Message.create({
    sender: sender._id,
    receiver: receiver._id,
    text: encrypted,
  });

  const populatedMessages = await Message.findById(message._id)
    .populate("sender", "firstName lastName username profilePicture")
    .populate("receiver", "firstName lastName username profilePicture");

  const receiverSocketId = onlineUsers.get(receiver.clerkId);

  if (receiverSocketId) {
    getIO()
      .to(receiverSocketId)
      .emit("new-message", {
        ...populatedMessages.toObject(),
        text,
      });
  }

  res.status(201).json({ message: populatedMessages });
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
    .sort({ createdAt: -1 });

  const decrypted = messages.map((msg) => ({
    ...msg.toObject(),
    text: decryptedMessage(msg.text),
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
          text: decryptedMessage(message.text),
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
  const { name } = req.query;
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const users = await User.find({
    $or: [
      {
        username: {
          $regex: escapedName,
          $options: "i",
        },
      },
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
    ],
  }).select("firstName lastName username profilePicture");

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
