import { Server } from "socket.io";

let io;

export const onlineUsers = new Map();

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", (socket) => {
    console.log("Connected:", socket.id);

    // User comes online
    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);

      io.emit("online-users", [...onlineUsers.keys()]);
    });

    // Typing
    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", {
          senderId,
        });
      }
    });

    // Stop typing
    socket.on("stop-typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stop-typing", {
          senderId,
        });
      }
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }

      io.emit("online-users", [...onlineUsers.keys()]);
    });
  });

  return io;
};

export const getIO = () => io;
