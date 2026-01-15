
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Centralized environment configuration
export const env = {
  // App
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGO_URI: process.env.MONGO_URI,

  // Auth
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",

  // Client
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173"
};


// Optional: validate required env variables
if (!env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

if (!env.JWT_SECRET) {
  console.error("❌ JWT_SECRET is missing in .env");
  process.exit(1);
}



.env

PORT=5000
NODE_ENV=development

MONGO_URI=mongodb://127.0.0.1:27017/mern_app

JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173




How to use it anywhere
import { env } from "../config/env.js";

console.log(env.PORT);
console.log(env.NODE_ENV);