import jwt from "jsonwebtoken";
import AppError from "../../utils/AppError.js";

export const refreshToken = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return next(new AppError("No token found", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || "7d" }
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
