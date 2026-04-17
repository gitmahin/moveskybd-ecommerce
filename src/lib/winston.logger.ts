import { BaseConfig } from "@/config";
import { inspect } from "util";
import type { LoggerOptions as LoggerOptionsType, Logger } from "winston";
import { createLogger, format, transports, addColors } from "winston";
import { npm } from "winston/lib/winston/config";

/**
 * Represents additional metadata that can be attached to a log entry.
 */
export type LogMetadata = {
  [key: string]: any;
};

/**
 * Extended Winston Logger interface supporting custom levels and metadata.
 */
type CustomLoggerType = {
  /** Logs a message with a specific custom level and optional metadata. */
  log: (
    level: keyof typeof customLevels.levels,
    message: string,
    meta?: LogMetadata
  ) => CustomLoggerType;
  info: (message: string, meta?: LogMetadata) => CustomLoggerType;
  error: (message: string, meta?: LogMetadata) => CustomLoggerType;
  warn: (message: string, meta?: LogMetadata) => CustomLoggerType;
} & Logger;

const defaultLevels = npm.levels;
const defaultColors = npm.colors;
const customLevels = {
  levels: {
    ...defaultLevels,
    success: 0,
  },
  colors: {
    ...defaultColors,
    success: "green",
  },
};

/**
 * Available log levels for the custom logger.
 */
export type CustomLogLevels = keyof typeof customLevels.levels;
/**
 * Available log colors for the custom logger.
 */
export type CustomLogColors = keyof typeof customLevels.colors;

addColors(customLevels.colors);

/**
 * Custom format for console output, including timestamps, levels, and inspected metadata.
 */
const CustomLoggerFormat = format.printf(
  ({ level, message, timestamp, ...meta }) => {
    const metaData = Object.keys(meta).length
      ? ` | ${inspect(meta, { depth: null, colors: true })}`
      : "";
    return `${timestamp} | [${level}] : ${message}${metaData}`;
  }
);

/**
 * Configuration options for the Winston logger instance.
 */
const LoggerOptions: LoggerOptionsType = {
  level: "info",
  levels: customLevels.levels,
  silent: process.env.NODE_ENV !== "development",
  format: format.combine(
    format.timestamp({
      format:
        BaseConfig.NODE_ENV === "development"
          ? "HH:mm:ss"
          : "DD-MM-YYYY HH:mm:ss",
    }),
    format.json(),
    format.colorize(),
    CustomLoggerFormat
  ),
  transports: [new transports.Console()],
};

/**
 * Custom Winston logger instance with extended log levels and colorized output.
 *
 * Extends the default npm log levels with a `success` level and applies
 * custom colors for each level. Output format varies by environment:
 * - **Development** — `HH:mm:ss` timestamp
 * - **Production** — `DD-MM-YYYY HH:mm:ss` timestamp
 *
 * @example
 * logger.info("Server started", { port: 3000 });
 * logger.error("Something went wrong", { code: 500 });
 * logger.warn("Deprecation warning");
 * logger.log("success", "User created successfully");
 */
export const logger = createLogger(LoggerOptions) as CustomLoggerType;
