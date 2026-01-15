import express from "express";
import v2Router from "./v2/index.v2.js";

const apiRouter = express.Router();

apiRouter.use("/v1");
apiRouter.use("/v2", v2Router);

export default apiRouter;
