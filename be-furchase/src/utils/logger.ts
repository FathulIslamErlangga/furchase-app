import fs from "fs";
import path from "path";
import winston from "winston";
const logDirectory = path.join(__dirname, "../../logs");
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level.toLocaleUpperCase()}]: ${message}`;
  })
);

class Logger {
  private logger: winston.Logger;

  constructor(fileName: string) {
    this.logger = winston.createLogger({
      level: "info",
      format: logFormat,
      transports: [
        new winston.transports.File({
          filename: path.join(logDirectory, fileName),
          maxFiles: 5 * 1024 * 1024,
          maxsize: 3,
        }),
      ],
    });
  }

  info(message: string) {
    this.logger.info(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  error(message: string) {
    this.logger.error(message);
  }
}

export const authLogger = new Logger("auth.log");
