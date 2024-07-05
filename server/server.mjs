import express from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import { rateLimiter } from "./middlewares/rateLimiter.middleware.mjs";
import logger from "./utils/logger.mjs";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.middleware.mjs";
import apiV1Routes from "./routes/api/v1/index.mjs";
import swaggerUi from "swagger-ui-express";
import { loadSwaggerDocument } from "./utils/swagger.mjs";

const app = express();

const PORT = process.env.PORT || 4000;

const limiterMax = process.env.RATE_LIMITER_MAX || 50;

const limiterWindow = process.env.RATE_LIMITER_WINDOW_MS || 60000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(rateLimiter(limiterMax, limiterWindow));

app.use(helmet());

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use(cors(corsOptions));

app.use(express.json());

app.get("/status", (req, res) => {
  return res.json("Server API is working");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(loadSwaggerDocument()));

app.use("/api/v1", apiV1Routes);

app.get("*", (req, res) => {
  return res.status(404).json("Not Found");
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    logger.info("Process terminated");
  });
});
