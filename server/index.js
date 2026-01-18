import express from "express";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { notFound } from "./src/middlewares/notFound.middleware.js";
import { helloWorldMiddleware } from "./src/middlewares/router.middleware.js";
import apiRouter from "./src/apiRoutes/index.api.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";

const app = express();
connectDB();

app.get("/", helloWorldMiddleware);
app.use("/api", apiRouter);
app.use(errorMiddleware);
app.use(notFound);

app.listen(env.PORT, () => {
  console.log(
    `✅ Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`
  );
});
