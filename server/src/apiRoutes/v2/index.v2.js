import express from "express";
import { v2middleware } from "../../middlewares/router.middleware.js";

const v2Router = express.Router();

v2Router.use("/v2", v2middleware);

export default v2Router;
