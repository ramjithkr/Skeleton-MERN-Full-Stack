import express from "express";
import userAuthRouter from "./userRouters/user.auth.routers.js";
import adminAuthRouter from "./adminRouters/admin.auth.routers.js";
import { authLimiter } from "../../middlewares/rateLimit.middleware.js";

const v1Router = express.Router();

v1Router.use("/user", authLimiter, userAuthRouter);
v1Router.use("/admin", adminAuthRouter);

export default v1Router;
