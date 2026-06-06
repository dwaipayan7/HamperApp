import { Server } from "socket.io";

let io;

export const onlineUsers = new Map();

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  console.log("[Socket.IO] Server initialized");

  io.on("connection", (socket) => {
    console.log(
      `[Socket.IO] Client connected  | socketId: ${socket.id} | transport: ${socket.conn.transport.name} | address: ${socket.handshake.address}`,
    );

    socket.on("join", (userId) => {
      if (!userId) {
        console.warn(
          `[Socket.IO]  'join' event with empty userId from socketId: ${socket.id}`,
        );
        return;
      }

      console.log(
        `[Socket.IO] 👤 User joined  | userId: ${userId} | socketId: ${socket.id}`,
      );

      socket.join(userId.toString());

      const oldSocketId = onlineUsers.get(userId.toString());
      if (oldSocketId && oldSocketId !== socket.id) {
        console.log(
          `[Socket.IO] 🔄 Replacing stale socket for userId: ${userId}  | old: ${oldSocketId} → new: ${socket.id}`,
        );
      }

      onlineUsers.set(userId.toString(), socket.id);

      const onlineList = [...onlineUsers.keys()];
      console.log(
        `[Socket.IO] 🌐 Online users (${onlineList.length}):`,
        onlineList,
      );
      io.emit("online-users", onlineList);
    });

    socket.on("get-online-users", () => {
      socket.emit("online-users", [...onlineUsers.keys()]);
    });

    socket.on("typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("typing", {
          senderId,
        });
      }
    });

    socket.on("stop-typing", ({ senderId, receiverId }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        io.to(receiverSocketId).emit("stop-typing", {
          senderId,
        });
      }
    });

    socket.on("disconnect", (reason) => {
      let disconnectedUserId = null;

      for (const [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          disconnectedUserId = userId;
          onlineUsers.delete(userId);
          break;
        }
      }

      console.log(
        `[Socket.IO] ❌ Client disconnected  | socketId: ${socket.id} | userId: ${disconnectedUserId || "unknown"} | reason: ${reason}`,
      );

      const onlineList = [...onlineUsers.keys()];
      console.log(
        `[Socket.IO] 🌐 Online users (${onlineList.length}):`,
        onlineList,
      );
      io.emit("online-users", onlineList);
    });

    socket.on("error", (error) => {
      console.error(
        `[Socket.IO] 🔴 Socket error  | socketId: ${socket.id} | error:`,
        error.message,
      );
    });
  });

  return io;
};

export const getIO = () => io;
