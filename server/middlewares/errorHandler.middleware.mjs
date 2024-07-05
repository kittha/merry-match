import logger from "../utils/logger.mjs";

const errorHandler = (err, req, res, next) => {
  logger.error(
    `Error occurred: ${err.status || 500} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
  res.status(err.status || 500).json({ message: err.message });
};

export default errorHandler;
