// hooks/useChatSocket.ts
import { useEffect, useRef, useCallback, useState } from "react";
import { socket } from "@/sockets/socket";

interface ChatMessage {
  _id: string;
  text: string;
  createdAt: string;
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
  receiver: {
    _id: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
  };
}

interface UseChatSocketProps {
  currentUserId: string;
  receiverId: string;
  onNewMessage: (message: ChatMessage) => void;
}

export const useChatSocket = ({
  currentUserId,
  receiverId,
  onNewMessage,
}: UseChatSocketProps) => {
  const [isReceiverTyping, setIsReceiverTyping] = useState(false);

  const typingEmitTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typingClearTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleNewMessage = (message: ChatMessage) => {
      if (!message.sender?._id || !message.receiver?._id) return;

      const incomingSenderId = message.sender._id.toString();
      const incomingReceiverId = message.receiver._id.toString();

      const isThisConversation =
        (incomingSenderId === currentUserId &&
          incomingReceiverId === receiverId) ||
        (incomingSenderId === receiverId &&
          incomingReceiverId === currentUserId);

      if (isThisConversation) {
        onNewMessage(message);
      }
    };

    socket.on("new-message", handleNewMessage);
    return () => {
      socket.off("new-message", handleNewMessage);
    };
  }, [currentUserId, receiverId, onNewMessage]);

  useEffect(() => {
    const handleTyping = ({ senderId }: { senderId: string }) => {
      if (senderId.toString() !== receiverId.toString()) return;

      setIsReceiverTyping(true);

      if (typingClearTimer.current) clearTimeout(typingClearTimer.current);
      typingClearTimer.current = setTimeout(() => {
        setIsReceiverTyping(false);
      }, 3000);
    };

    const handleStopTyping = ({ senderId }: { senderId: string }) => {
      if (senderId.toString() !== receiverId.toString()) return;
      setIsReceiverTyping(false);
      if (typingClearTimer.current) clearTimeout(typingClearTimer.current);
    };

    socket.on("typing", handleTyping);
    socket.on("stop-typing", handleStopTyping);

    return () => {
      socket.off("typing", handleTyping);
      socket.off("stop-typing", handleStopTyping);
      if (typingClearTimer.current) clearTimeout(typingClearTimer.current);
    };
  }, [receiverId]);

  const onTyping = useCallback(() => {
    socket.emit("typing", { senderId: currentUserId, receiverId });

    if (typingEmitTimer.current) clearTimeout(typingEmitTimer.current);
    typingEmitTimer.current = setTimeout(() => {
      socket.emit("stop-typing", { senderId: currentUserId, receiverId });
    }, 1500);
  }, [currentUserId, receiverId]);

  const onStopTyping = useCallback(() => {
    if (typingEmitTimer.current) clearTimeout(typingEmitTimer.current);
    socket.emit("stop-typing", { senderId: currentUserId, receiverId });
  }, [currentUserId, receiverId]);

  useEffect(() => {
    return () => {
      if (typingEmitTimer.current) clearTimeout(typingEmitTimer.current);
      if (typingClearTimer.current) clearTimeout(typingClearTimer.current);
    };
  }, []);

  return { isReceiverTyping, onTyping, onStopTyping };
};
