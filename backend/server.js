import express from "express";
import { ENV } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import userRoutes from "./src/routes/user.route.js";
import postRoutes from "./src/routes/post.route.js";
import commentRoutes from "./src/routes/comment.route.js";
import notificationRoutes from "./src/routes/notification.route.js";
import { arcjetMiddleware } from "./src/middleware/arcjet.middleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware({ apiKey: ENV.CLERK_SECRET_KEY }));
app.use(arcjetMiddleware);

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/notifications", notificationRoutes);

// connectDB();

app.use((err, req, res, next) => {
  console.error("Unhandled error", err);
  res.status(500).json({ error: err.message || "Internal server error" });
  //   next();
});

app.get("/", (req, res) => {
  res.send({ name: "This is Dwaipayan" });
});

// app.listen(ENV.PORT, () => {
//   console.log(`Server running on PORT 3000`);
// });

const startServer = async () => {
  try {
    await connectDB();

    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`Server running on PORT ${ENV.PORT}`);
      });
    }
  } catch (error) {
    console.log("Failed to start the server", error.message);
    process.exit(1);
  }
};

startServer();

//export for vercal
export default app;
