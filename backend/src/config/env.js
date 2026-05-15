import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || 4000,
  NODE_ENV: process.env.NODE_ENV || "development",
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/twitter-clone",
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY || "",
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY || "",
  ARCJET_KEY: process.env.ARCJET_KEY || "",
  ARCJET_ENV: process.env.ARCJET_ENV || "production",

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};

if (!ENV.CLERK_SECRET_KEY) {
  throw new Error(
    "Missing CLERK_SECRET_KEY in backend environment. Configure CLERK_SECRET_KEY for Clerk auth.",
  );
}
