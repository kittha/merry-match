import "dotenv/config";
import express from "express";
import { rateLimiter } from "./middlewares/rateLimiter.middleware.mjs";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import http from "http";
import logger from "./utils/logger.mjs";
import morgan from "morgan";
import errorHandler from "./middlewares/errorHandler.middleware.mjs";
import apiV1Routes from "./routes/api/v1/index.mjs";
import { loadSwaggerDocument } from "./utils/swagger.mjs";
import swaggerUi from "swagger-ui-express";
import { avatarUpload } from "./middlewares/multer.middleware.mjs";
import socket from "./utils/socket.mjs";

const app = express();

const PORT = process.env.PORT || 4000;

const limiterMax = process.env.RATE_LIMITER_MAX || 50;

const limiterWindow = process.env.RATE_LIMITER_WINDOW_MS || 60000;

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  optionsSuccessStatus: 200,
};

app.use(rateLimiter(limiterMax, limiterWindow));

// app.use(compression());

app.use(helmet());

app.use(
  morgan("combined", {
    stream: { write: (message) => logger.info(message.trim()) },
  })
);

app.use(cors(corsOptions));

app.use(express.json());

app.get("/status", (req, res) => {
  return res.status(200).json("Server API is working");
});

app.use("/api/v1", [avatarUpload], apiV1Routes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(loadSwaggerDocument()));

app.get("*", (req, res) => {
  return res.status(404).json("Not Found");
});

app.use(errorHandler);

const httpServer = http.createServer(app);
// connect soket io
socket(httpServer);

httpServer.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

process.on("SIGTERM", () => {
  server.close(() => {
    logger.info("Process terminated");
  });
});
