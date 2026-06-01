import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import {
  getAllChatList,
  getMessages,
  sendMessage,
  searchChats,
  deleteConversation,
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/send-message", protectRoute, sendMessage);
router.get("/chats/:receiverId", protectRoute, getMessages);
router.get("/conversations", protectRoute, getAllChatList);
router.get("/search", protectRoute, searchChats);
router.delete("/conversation/:receiverId", protectRoute, deleteConversation);

export default router;
