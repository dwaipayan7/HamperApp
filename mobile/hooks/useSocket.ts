import { useEffect, useRef } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { socket } from "@/sockets/socket";
import { AppState, AppStateStatus } from "react-native";

export const useSocket = () => {
  const { currentUser } = useCurrentUser();
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);

  useEffect(() => {
    if (!currentUser?._id) return;

    const userId = currentUser._id;

    const emitJoin = () => {
      console.log("[Socket] Connected ✅  socketId:", socket.id);
      console.log("[Socket] Emitting 'join' for userId:", userId);
      socket.emit("join", userId);
    };

    const handleDisconnect = (reason: string) => {
      console.log("[Socket] Disconnected ❌  reason:", reason);
    };

    const handleConnectError = (error: Error) => {
      console.error("[Socket] Connection error 🔴:", error.message);
    };

    const handleReconnect = (attemptNumber: number) => {
      console.log("[Socket] Reconnected after", attemptNumber, "attempt(s)");
    };

    const handleReconnectAttempt = (attemptNumber: number) => {
      console.log("[Socket] Reconnect attempt #", attemptNumber);
    };

    const handleReconnectError = (error: Error) => {
      console.error("[Socket] Reconnect error:", error.message);
    };

    const handleReconnectFailed = () => {
      console.error("[Socket] Reconnection failed — all attempts exhausted");
    };

    if (socket.connected) {
      emitJoin();
    } else {
      console.log("[Socket] Initiating connection…");
      socket.connect();
    }

    socket.on("connect", emitJoin);
    socket.on("disconnect", handleDisconnect);
    socket.on("connect_error", handleConnectError);
    socket.io.on("reconnect", handleReconnect);
    socket.io.on("reconnect_attempt", handleReconnectAttempt);
    socket.io.on("reconnect_error", handleReconnectError);
    socket.io.on("reconnect_failed", handleReconnectFailed);

    const appStateSub = AppState.addEventListener("change", (nextState) => {
      if (
        appStateRef.current.match(/inactive|background/) &&
        nextState === "active"
      ) {
        console.log("[Socket] App foregrounded — ensuring connection");
        if (!socket.connected) {
          socket.connect();
        }
      }
      appStateRef.current = nextState;
    });

    return () => {
      console.log("[Socket] Cleaning up listeners for userId:", userId);
      socket.off("connect", emitJoin);
      socket.off("disconnect", handleDisconnect);
      socket.off("connect_error", handleConnectError);
      socket.io.off("reconnect", handleReconnect);
      socket.io.off("reconnect_attempt", handleReconnectAttempt);
      socket.io.off("reconnect_error", handleReconnectError);
      socket.io.off("reconnect_failed", handleReconnectFailed);
      appStateSub.remove();
    };
  }, [currentUser?._id]);
};
