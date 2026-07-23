import pino from "pino";
import { ENV } from "./env.js";
import { createRequire } from "module";

// Resolve pino-pretty only when it's actually installed.
// In Docker (production), devDependencies are not installed so we fall back to
// raw JSON logging — which is what log aggregators (Datadog, Loki, etc.) expect.
const isPrettyAvailable = (() => {
  try {
    const require = createRequire(import.meta.url);
    require.resolve("pino-pretty");
    return true;
  } catch {
    return false;
  }
})();

const usePretty = ENV.NODE_ENV !== "production" && isPrettyAvailable;

export const logger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: usePretty
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

