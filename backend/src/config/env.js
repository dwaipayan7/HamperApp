import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  MONGO_URI: process.env.MONGO_URI,
  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  ARCJET_KEY: process.env.ARCJET_KEY,
  SECRET_KEY: process.env.SECRET_KEY,
  VALKEY_HOST: process.env.VALKEY_HOST,
  VALKEY_PORT: process.env.VALKEY_PORT,
  // Firebase service account JSON as a single-line string (never commit the .json file)
  FIREBASE_SERVICE_ACCOUNT_JSON: process.env.FIREBASE_SERVICE_ACCOUNT_JSON,
  // Comma-separated list of allowed CORS origins e.g. "https://app.hamper.com,https://admin.hamper.com"
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
};
