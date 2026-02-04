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
