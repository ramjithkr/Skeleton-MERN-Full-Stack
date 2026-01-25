import bcrypt from "bcrypt";
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
