import express from "express";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { handleError } from "./src/middlewares/error.middleware.js";
import { notFound } from "./src/middlewares/notFound.middleware.js";
import { helloWorld } from "./src/middlewares/router.middleware.js";

const app = express();
connectDB();

app.get("/", helloWorld);
// app.use("/api",)
app.use(handleError);
app.use(notFound);

app.listen(env.PORT, () => {
  console.log(
    `✅ Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`
  );
});
