import { io } from "socket.io-client";
import { API_BASE_URL } from "@/utils/api";

const getSocketBaseUrl = (apiUrl: string | undefined): string => {
  if (!apiUrl) {
    console.warn(
      "[Socket] API_BASE_URL is undefined, falling back to localhost",
    );
    return "http://localhost:3000";
  }

  try {
    const url = new URL(apiUrl);
    return url.origin;
  } catch {
    const stripped = apiUrl.replace(/\/api\/?$/, "");
    return stripped || "http://localhost:3000";
  }
};

const SOCKET_BASE_URL = getSocketBaseUrl(API_BASE_URL);

console.log("[Socket] API_BASE_URL:", API_BASE_URL);
console.log("[Socket] Connecting to:", SOCKET_BASE_URL);

export const socket = io(SOCKET_BASE_URL, {
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});
