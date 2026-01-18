import e from "express";
import { userRegister } from "../../../controllers/userControllers/user.auth.controller.js";


const router = e.Router();

router.post("/register", userRegister);
// router.post('/login')
// router.post('/profile')
// router.get('/logout')

export default router;
