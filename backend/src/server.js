import express from "express";
import cors from "cors";
import helmet from "helmet";
import pinoHttp from "pino-http";
import { clerkMiddleware } from "@clerk/express";
import http from "http";
import mongoose from "mongoose";

import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import messageRoutes from "./routes/message.route.js";
import videoRoutes from "./routes/video.route.js";

import { ENV } from "./config/env.js";
import { logger } from "./config/logger.js";
import { connectDB } from "./config/db.js";
import { arcjetMiddleware } from "./middleware/arcjet.middleware.js";
import { initializeSocket } from "./socket/socket.js";
import { startNotificationWorker } from "./worker/notification.worker.js";
import { cacheClient } from "./helpers/redis.js";

const app = express();
const server = http.createServer(app);

initializeSocket(server);

app.use(helmet());


const allowedOrigins = ENV.ALLOWED_ORIGINS
  ? ENV.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : [];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  }),
);


app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));


app.use(pinoHttp({ logger, autoLogging: { ignore: (req) => req.url === "/health" } }));


app.use(clerkMiddleware());
app.use(arcjetMiddleware);


app.get("/health", async (_req, res) => {
  const mongoOk = mongoose.connection.readyState === 1;
  const valkeyOk = cacheClient.status === "ready";
  const healthy = mongoOk && valkeyOk;
  res.status(healthy ? 200 : 503).json({
    status: healthy ? "ok" : "degraded",
    timestamp: new Date().toISOString(),
    services: {
      mongodb: mongoOk ? "up" : "down",
      valkey: valkeyOk ? "up" : "down",
    },
  });
});


app.get("/", (_req, res) => res.json({ message: "HamperApp API" }));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/videos", videoRoutes);


app.use((_req, res) => {
  res.status(404).json({ success: false, error: "Route not found", code: "NOT_FOUND" });
});


app.use((err, req, res, _next) => {
  const statusCode = err.isOperational ? err.statusCode : 500;
  const code = err.code || "INTERNAL_ERROR";

  logger.error(
    { err, path: req.path, method: req.method, statusCode },
    "Request error",
  );

  // Never expose internals of non-operational errors
  const message = err.isOperational ? err.message : "Internal server error";

  res.status(statusCode).json({ success: false, error: message, code });
});


const startServer = async () => {
  try {
    await connectDB();
    startNotificationWorker();

    if (ENV.NODE_ENV !== "production") {
      server.listen(ENV.PORT, () =>
        logger.info({ port: ENV.PORT }, "Server is up and running"),
      );
    }
  } catch (error) {
    logger.error({ err: error }, "Failed to start server");
    process.exit(1);
  }
};

startServer();


export default app;

