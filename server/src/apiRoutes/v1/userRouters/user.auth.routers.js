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
