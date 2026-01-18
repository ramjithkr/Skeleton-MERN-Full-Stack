import express from "express";
import v2Router from "./v2/index.v2.js";
import { apiMiddleware } from "../middlewares/router.middleware.js";
import v1Router from "./v1/index.v1.js";

const apiRouter = express.Router();

apiRouter.get("/", apiMiddleware);
apiRouter.use("/v1", v1Router);
apiRouter.use("/v2", v2Router);

export default apiRouter;
