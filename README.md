# Skeleton-MERN-Full-Stack

{
  "name": "server",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
  "dependencies": {
    "bcrypt": "^6.0.0",
    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^17.2.3",
    "express": "^4.22.1",
    "express-mongo-sanitize": "^2.2.0",
    "express-rate-limit": "^8.2.1",
    "helmet": "^8.1.0",
    "jsonwebtoken": "^9.0.3",
    "mongoose": "^9.1.3",
    "morgan": "^1.10.1",
    "nodemon": "^3.1.11",
    "winston": "^3.19.0",
    "xss-clean": "^0.1.4"
  }
}


import app from "./app.js";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import logger from "./src/config/logger.js";

connectDB();

app.listen(env.PORT, () => {
  logger.info(
    `Server running on http://localhost:${env.PORT} (${env.NODE_ENV})`,
  );
});
import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./src/apiRoutes/index.api.js";
import notFound from "./src/middlewares/notFound.middleware.js";
import errorHandler from "./src/middlewares/error.middleware.js";
import morganMiddleware from "./src/middlewares/morgan.middleware.js";

const app = express();

/* ---------- Security & Core Middlewares ---------- */
app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());
app.use(mongoSanitize());
app.use(xss());

/* ---------- Logging ---------- */
app.use(morganMiddleware);

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server is running",
  });
});

app.use("/api", apiRouter);

/* ---------- Error Handlers ---------- */
app.use(notFound);
app.use(errorHandler);

export default app;
PORT = 4000

# NODE_ENV = Production
NODE_ENV=development

MONGO_URI=mongodb://localhost:27017/skeletondb


JWT_SECRET=supersecretjwtkey
JWT_EXPIRES=7d

ADMIN_JWT_SECRET =adminsupersecretjwtkey
ADMIN_JWT_EXPIRES =7d
import e from "express";
import {
  adminLogin,
  adminLogout,
  adminProfile,
  adminRegister,
} from "../../../controllers/adminControllers/admin.auth.controller.js";
import { authAdmin } from "../../../middlewares/auth.middleware.js";
import { adminRefreshToken } from "../../../controllers/authControllers/generateToken.js";

const router = e.Router();

router.post("/admin-register", adminRegister); // working fine
router.post("/admin-login", adminLogin); //working fine
router.post("/admin-profile", authAdmin, adminProfile); // working fine
router.get("/admin-logout", authAdmin, adminLogout);  // working fine
router.get("/admin-refresh-token", adminRefreshToken);  

export default router;


import e from "express";
import {
  logoutUser,
  userLogin,
  userProfile,
  userRegister,
} from "../../../controllers/userControllers/user.auth.controller.js";
import { userRefreshToken } from "../../../controllers/authControllers/generateToken.js";
import { authUser } from "../../../middlewares/auth.middleware.js";

const router = e.Router();

router.post("/user-register", userRegister); // working fine
router.post("/user-login", userLogin); // working fine
router.post("/user-profile", authUser, userProfile); //  workingfine
router.get("/user-logout", logoutUser); // working fine
router.get("/user-refresh-token", userRefreshToken); // working fine

export default router;
import express from "express";
import userAuthRouter from "./userRouters/user.auth.routers.js";
import adminAuthRouter from "./adminRouters/admin.auth.routers.js";
import { authLimiter } from "../../middlewares/rateLimit.middleware.js";

const v1Router = express.Router();

v1Router.use("/user", authLimiter, userAuthRouter);
v1Router.use("/admin", adminAuthRouter);

export default v1Router;
import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("✅ Database connected successfully");
  } catch (error) {
    console.error(" ❌Database connection error :", error);
  }
};

if (!env.MONGO_URI) {
  console.error("❌ MONGO_URI is missing in .env file");
  // process.exit(1);
}
import "dotenv/config";

export const env = {
  //APP
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // Database
  MONGO_URI: process.env.MONGO_URI 
};
import winston from "winston";
import path from "path";
import fs from "fs";

const logDir = path.join(process.cwd(), "src", "logs");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    }),
    new winston.transports.File({
      filename: path.join(logDir, "access.log"),
    }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(new winston.transports.Console());
}

export default logger;

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../../models/admin/admin.model.js";
import AppError from "../../utils/AppError.js";

export const adminRegister = async (req, res, next) => {
  try {
    const { adminname, email, password, confirmPassword } = req.body;

    if (!adminname || !email || !password || !confirmPassword) {
      return next(new AppError("All fields are required", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match", 400));
    }

    if (password.length < 8) {
      return next(new AppError("Password must be at least 8 characters", 400));
    }

    const existingAdmin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingAdmin) {
      return next(new AppError("Admin already exists", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name: adminname.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "admin",
    });

    res.status(201).json({
      status: "success",
      message: "Admin registered successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Register Error:", error);
    next(error);
  }
};

export const adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!admin) {
      return next(new AppError("Invalid email or password", 401));
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: process.env.ADMIN_JWT_EXPIRES || "7d" },
    );

    res.cookie("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: "success",
      message: "Admin logged in successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("Admin Login Error:", error);
    next(error);
  }
};

export const adminProfile = async (req, res, next) => {
  try {
    const adminId = req.admin._id;

    const admin = await Admin.findOne({ _id: adminId }).select("-password");

    if (!admin) {
      return next(new AppError("Admin not found", 404));
    }

    return res.status(200).json({
      status: "success",
      message: "Admin profile fetched successfully",

      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    (console.error("Admin profile Error:", error), next(error));
  }
};

export const adminLogout = async (req, res, next) => {
  res.cookie("adminToken", "", {
    httpOnly: true,
    expire: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Admin logged out successfully",
  });
};

import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";
import Admin from "../../models/admin/admin.model.js";

export const userRefreshToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError("No token found", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" },
    );

    res.cookie("token", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      status: "success",
      message: "Token refreshed successfully",
    });
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export const adminRefreshToken = async (req, res, next) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return next(new AppError("No admin token found", 401));
    }

    const decoded = jwt.verify(token, process.env.ADMIN_JWT_SECRET);

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return next(new AppError("Admin no longer exists", 401));
    }

    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.ADMIN_JWT_SECRET,
      { expiresIn: process.env.ADMIN_JWT_EXPIRES || "7d" },
    );

    res.cookie("adminToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      status: "success",
      message: "Admin token refreshed successfully",
    });
  } catch (error) {
    next(new AppError("Invalid or expired admin token", 401));
  }
};

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/user/user.model.js";
import AppError from "../../utils/AppError.js";

export const userRegister = async (req, res, next) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return next(new AppError("All fields are required", 400));
    }

    if (password !== confirmPassword) {
      return next(new AppError("Passwords do not match", 400));
    }

    if (password.length < 8) {
      return next(new AppError("Password must be at least 8 characters", 400));
    }

    const existingUser = await User.findOne({
      email: email.trim().toLowerCase(),
    });

    if (existingUser) {
      return next(new AppError("Email is already registered", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Register Error:", error);
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new AppError("Email and password are required", 400));
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase(),
    }).select("+password");

    if (!user) {
      return next(new AppError("Invalid email or password", 401));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return next(new AppError("Invalid email or password", 401));
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" },
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Login Error:", error);
    next(error);
  }
};

export const userProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const user = await User.findOne({ _id: userId }).select("-password");

    if (!user) {
      return next(new AppError("User not found", 400));
    }

    return res.status(200).json({
      status: "success",
      message: "User profile fetched successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("User Profile Error:", error);
    next(error);
  }
};

export const logoutUser = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};


import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/user/user.model.js";
import Admin from "../models/admin/admin.model.js";

export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError("Not authorized, token missing", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new AppError("User no longer exists", 401));
    }

    req.user = user;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

export const authAdmin = async (req, res, next) => {
  try {
    const adminToken = req.cookies?.adminToken;

    if (!adminToken) {
      return next(new AppError("Not authorized, token missing", 401));
    }

    const decoded = jwt.verify(adminToken, process.env.ADMIN_JWT_SECRET);

    const admin = await Admin.findById(decoded.id);

    if (!admin) {
      return next(new AppError("Admin no longer exists"), 401);
    }

    req.admin = admin;
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};

import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, {
    method: req.method,
    url: req.originalUrl,
    stack: err.stack,
  });

  res.status(err.statusCode || 500).json({
    status: "error",
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
};

export default errorHandler;

import morgan from "morgan";
import logger from "../config/logger.js";

const stream = {
  write: (message) => logger.info(message.trim()),
};

const morganMiddleware = morgan(
  ":method :url :status :response-time ms",
  { stream }
);

export default morganMiddleware;

const notFound = (req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: `Route not found - ${req.originalUrl}`,
  });
};
export default notFound;


import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Admin is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be less than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [50, "Name must be less than 50 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        "Please provide a valid email",
      ],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);
export default User;

declare module "xss-clean";

class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "7d",
  });
};

export default generateToken;
