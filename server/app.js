import express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import morgan from "morgan";

import apiRouter from "./src/apiRoutes/index.api.js";
import { notFound } from "./src/middlewares/notFound.middleware.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import logger from "./src/logger/winston.logger.js";

const app = express();

/* ---------- Middlewares ---------- */
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

/* ---------- Morgan → Winston ---------- */
app.use(
  morgan("combined", {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
  }),
);

/* ---------- Routes ---------- */
app.get("/", (req, res) => {
  res.status(200).json({ message: "Server is running", status: "success" });
});

app.use("/api", apiRouter);

/* ---------- Error Handlers ---------- */
app.use(notFound);
app.use(errorMiddleware);

export default app;
