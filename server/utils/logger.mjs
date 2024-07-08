import winston from "winston";
import "winston-syslog";
import DailyRotateFile from "winston-daily-rotate-file";

const { combine, timestamp, printf, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} ${level}: ${stack || message}`;
});

const logLevel = `${process.env.LOG_LEVEL}` || "info";

const transports = [
  new winston.transports.Console(),
  new DailyRotateFile({
    filename: "logs/application-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
  }),
];

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "development") {
  transports.push(
    new winston.transports.Syslog({
      host: `${process.env.PAPERTRAIL_HOST}`,
      port: process.env.PAPERTRAIL_PORT,
      logFormat: logFormat,
    })
  );
}

// Always keep log in UTC+0.
// Don't change logging timestamp timezone!
// You can adjust tz offset later on in log viewer.
const logger = winston.createLogger({
  level: logLevel,
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    logFormat
  ),
  transports: transports,
  exceptionHandlers: [
    new winston.transports.File({ filename: "logs/exceptions.log" }),
  ],
  rejectionHandlers: [
    new winston.transports.File({ filename: "logs/rejections.log" }),
  ],
});

export default logger;
