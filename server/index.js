import express from "express";
import { env } from "./src/config/env.js";
import { connectDB } from "./src/config/db.js";
import { notFound } from "./src/middlewares/notFound.middleware.js";
import apiRouter from "./src/apiRoutes/index.api.js";
import { errorMiddleware } from "./src/middlewares/error.middleware.js";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

// import cros from "cros";

const app = express();
connectDB();

// app.use(
//   cros({
//     origin: ["http://localhost:5173", "https://myapp.com"],
//     Credential: true,
//   }),
// );

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from server", satus: "success" });
});

app.use(helmet());
app.use("/api", apiRouter);
app.use(errorMiddleware);
app.use(notFound);
app.use(mongoSanitize());
app.use(xss());

// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.listen(env.PORT, () => {
  console.log(
    `✅ Server is running on port ${env.PORT} in ${env.NODE_ENV} mode`,
  );
});
