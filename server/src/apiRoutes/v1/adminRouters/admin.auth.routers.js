import e from "express";
import { adminRegister } from "../../../controllers/adminControllers/admin.auth.controller.js";

const router = e.Router();

router.post("/adminregester", adminRegister);
export default router;
