import e from "express";
import {
  logoutUser,
  userLogin,
  userProfile,
  userRegister,
} from "../../../controllers/userControllers/user.auth.controller.js";
import { refreshToken } from "../../../controllers/authControllers/generateToken.js";

const router = e.Router();

router.post("/register", userRegister); // working fine
router.post("/login", userLogin); // working fine
router.post("/profile", userProfile);
router.get("/logout", logoutUser);
router.get("/refresh-token", refreshToken);

export default router;
