import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import User from "../models/user/user.model.js";

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

    req.user = user; // 🔥 attach user to request
    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", 401));
  }
};
