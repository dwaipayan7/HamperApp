// import { io, Socket } from "socket.io-client";
// import React, { createContext, useContext, useEffect, useState, useCallback, useRef, useMemo } from "react";
// import { AppState, AppStateStatus, Platform } from "react-native";
// import { useDispatch, useSelector } from "react-redux";

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { throttle } from "lodash";
// import { API_BASE_URL } from "@/utils/api";
// const QUEUE_STORAGE_KEY = 'socket_offline_queue';

// export const SOCKET_API_BASE_URL = API_BASE_URL;

// interface SocketManagerState {
//   socket: Socket | null;
//   isConnected: boolean;
//   emitEvent: (event: string, data: any) => void;
//   connect: (userProfileId: string, workspaceId: string) => void;
//   disconnect: () => void;
//   joinChat: (chatId: string, userProfileId: string) => void;
//   leaveChat: (chatId: string, userProfileId: string) => void;
//   updateUserActivity: (isActive: boolean) => void;
//   ensureSocketConnection: (userProfileId: string, workspaceId: string) => Promise<boolean>;
//   markMessagesAsSeen: (chatId: string) => void;
// }

// export class SocketService {
//   private static instance: SocketService;
//   private socket: Socket | null = null;
//   private messageQueue: Array<{ event: string; data: any }> = [];
//   private isLoadingQueue = true;

//   private constructor() {
//     this.loadQueueFromStorage();
//   }

//   static getInstance(): SocketService {
//     if (!SocketService.instance) {
//       SocketService.instance = new SocketService();
//     }
//     return SocketService.instance;
//   }

//   private async loadQueueFromStorage() {
//     try {
//       const savedQueue = await AsyncStorage.getItem(QUEUE_STORAGE_KEY);
//       if (savedQueue) {
//         this.messageQueue = JSON.parse(savedQueue);
//       }
//     } catch (e) {
//       console.error("Failed to load socket queue", e);
//     } finally {
//       this.isLoadingQueue = false;
//     }
//   }

//   private async saveQueueToStorage() {
//     try {
//       await AsyncStorage.setItem(QUEUE_STORAGE_KEY, JSON.stringify(this.messageQueue));
//     } catch (e) {
//       console.error("Failed to save socket queue", e);
//     }
//   }

//   async emitWithRetry(event: string, data: any) {
//     if (this.socket?.connected) {
//       this.socket.emit(event, data);
//     } else {
//       this.messageQueue.push({ event, data });
//       await this.saveQueueToStorage();
//     }
//   }

//   private async flushQueue() {
//     if (this.isLoadingQueue) return;

//     while (this.messageQueue.length > 0) {
//       const item = this.messageQueue[0];
//       this.socket?.emit(item.event, item.data);

//       this.messageQueue.shift();
//       await this.saveQueueToStorage();
//     }
//   }

//   createSocketConnection(baseUrl: string, queryParams: Record<string, string> = {}): Socket {
//     if (this.socket && this.socket.connected) return this.socket;

//     this.socket = io(baseUrl, {
//       path: "/api/socket.io/",
//       withCredentials: true,
//       transports: ["websocket"],
//       autoConnect: false,
//       query: queryParams,
//       forceNew: false,
//       secure: true,
//       reconnection: true,
//       reconnectionAttempts: Infinity,
//       reconnectionDelay: 1000,
//       reconnectionDelayMax: 5000,
//       timeout: 20000,
//     });

//     this.socket.on("connect", () => {
//       this.flushQueue();
//     });

//     return this.socket;
//   }

//   getSocket(): Socket | null {
//     return this.socket;
//   }

//   connect(userProfileId: string, workspaceId?: string | null) {
//     const isAndroid = Platform.OS === 'android';
//     const baseUrl = SOCKET_API_BASE_URL.replace("/api", "");

//     if (isAndroid && this.socket && !this.socket.connected && !this.socket.active) {
//       // this.socket.removeAllListeners();
//       this.socket.disconnect();
//       this.socket = null;
//     }

//     if (!this.socket) {
//       this.createSocketConnection(baseUrl, {
//         userProfileId,
//         activeWorkspaceId: workspaceId ?? ""
//       });
//     }

//     this.socket!.auth = { userProfileId, workspaceId };
//     if (!this.socket!.connected) {
//       this.socket!.connect();
//     }
//   }

//   disconnect() {
//     if (this.socket?.connected) {
//       this.socket.disconnect();
//     }
//   }

//   joinChat(chatId: string, userProfileId: string) {
//     this.emitWithRetry("chat:join", { chatId, userProfileId });
//   }

//   leaveChat(chatId: string, userProfileId: string) {
//     this.socket?.emit("chat:leave", { chatId, userProfileId });
//   }

//   updateUserActivity(userProfileId: string, activeWorkspaceId: string, isActive: boolean) {
//     this.socket?.emit("user:activity", {
//       userProfileId,
//       isActive,
//       activeWorkspaceId,
//       timestamp: new Date().toISOString(),
//     });
//   }

//   markMessagesAsSeen(chatId: string) {
//     this.emitWithRetry("messages:markAsSeen", { chatId });
//   }

//   async ensureSocketConnection(userProfileId: string, workspaceId: string): Promise<boolean> {
//     if (this.socket?.connected) return true;

//     if (this.socket && !this.socket.connected) {
//       this.socket.disconnect();
//       // this.socket = null;
//     }

//     return new Promise((resolve) => {
//       const timeout = setTimeout(() => {
//         cleanup();
//         resolve(false);
//       }, 10000);

//       const onConnect = () => {
//         cleanup();
//         resolve(true);
//       };
//       const onError = () => {
//         cleanup();
//         resolve(false);
//       };

//       const cleanup = () => {
//         clearTimeout(timeout);
//         this.socket?.off("connect", onConnect);
//         this.socket?.off("connect_error", onError);
//       };

//       if (!this.socket) {
//         const baseUrl = SOCKET_API_BASE_URL?.replace("/api", "");
//         this.createSocketConnection(baseUrl!, { userProfileId, workspaceId });
//       }

//       this.socket!.auth = { userProfileId, workspaceId };
//       this.socket!.on("connect", onConnect);
//       this.socket!.on("connect_error", onError);
//       this.socket!.connect();
//     });
//   }
// }

// export const SocketContext = createContext<SocketManagerState | null>(null);
// export const useSocket = () => {
//   const context = useContext(SocketContext);
//   if (!context) {
//     throw new Error("useSocket must be used within a SocketProvider");
//   }
//   return context;
// };

// export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
//   const socketService = SocketService.getInstance();
//   const [socket, setSocket] = useState<Socket | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const appState = useRef(AppState.currentState);

//   const userProfileId = useSelector(selectUserProfileId);
//   const activeWorkspaceId = useSelector(selectActiveWorkspace);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (!socket) return;

//     const handleStatusUpdate = (users: any[]) => {
//       if (Array.isArray(users)) {
//         users.forEach((user) => {
//           const isActive = user.status === 'ONLINE' || user.status === 'AWAY';
//           dispatch(
//             updateUserActivityStatus({
//               userProfileId: user.userProfileId,
//               isActive: isActive,
//               activeWorkspaceId: user.activeWorkspaceId,
//               status: user.status,
//             })
//           );
//         });
//       }
//     };

//     socket.on('user:activity:update', handleStatusUpdate);

//     return () => {
//       socket.off('user:activity:update', handleStatusUpdate);
//     };
//   }, [socket, dispatch]);

//   const sendHeartbeat = useCallback(() => {
//     if (socket && socket.connected) {
//       socket.emit('user:heartbeat');
//     }
//   }, [socket]);

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (isConnected && socket) {
//       interval = setInterval(() => {
//         if (AppState.currentState === "active") {
//           sendHeartbeat();
//           if (userProfileId) {
//             socketService.updateUserActivity(userProfileId, activeWorkspaceId || "", true);
//           }
//         }
//       }, 25000);
//     }

//     return () => {
//       if (interval) {
//         clearInterval(interval);
//       }
//     };
//   }, [isConnected, socket, userProfileId, sendHeartbeat]);

//   useEffect(() => {
//     if (!socket || !isConnected) return;

//     const handleActivityList = (users: any) => {
//       // console.log('The user is ', users)
//       if (Array.isArray(users)) {
//         dispatch(setUserActivityList(users));
//       }
//     };

//     const handleDisconnect = () => {
//       socket.emit('user:manual-disconnect');
//     };

//     socket.on('user:activity:list', handleActivityList);

//     socket.emit('user:activity:request');

//     return () => {
//       socket.off('user:activity:list', handleActivityList);

//       if (socket.connected) {
//         handleDisconnect();
//       }
//     };
//   }, [socket, isConnected, dispatch,]);

//   useEffect(() => {
//     if (!userProfileId) return;

//     const baseUrl = SOCKET_API_BASE_URL.replace("/api", "");

//     const s = socketService.createSocketConnection(baseUrl, {
//       userProfileId: userProfileId ?? "",
//       activeWorkspaceId: activeWorkspaceId ?? "",
//     });

//     const onConnect = () => {
//       setIsConnected(true)
//       socketService.updateUserActivity(userProfileId, activeWorkspaceId || "", true);
//     };
//     const onDisconnect = () => setIsConnected(false);
//     s.on("connect", onConnect);
//     s.on("disconnect", onDisconnect);

//     setSocket(s);
//     setIsConnected(s.connected);

//     socketService.connect(userProfileId, activeWorkspaceId);

//     const freshSocket = socketService.getSocket();
//     if (freshSocket && freshSocket !== s) {
//       freshSocket.on("connect", onConnect);
//       freshSocket.on("disconnect", onDisconnect);
//       setSocket(freshSocket);
//       setIsConnected(freshSocket.connected);
//     }

//     const handleAppStateChange = (nextAppState: AppStateStatus) => {
//       if (nextAppState === "active" && userProfileId) {
//         if (Platform.OS === 'android') {
//           socketService.connect(userProfileId, activeWorkspaceId || "");
//           const recentSocket = socketService.getSocket();
//           if (recentSocket && recentSocket !== socketService.getSocket()) {
//             recentSocket.on("connect", onConnect);
//             recentSocket.on("disconnect", onDisconnect);
//             setSocket(recentSocket);
//           }
//         }
//         socketService.ensureSocketConnection(userProfileId, activeWorkspaceId || "");
//         sendHeartbeat();
//         socketService.updateUserActivity(userProfileId, activeWorkspaceId || "", true);
//       } else if (nextAppState === "background" || nextAppState === "inactive") {
//         if (userProfileId) {
//           socketService.updateUserActivity(userProfileId, activeWorkspaceId || "", false);
//         }
//       }
//       appState.current = nextAppState;
//     };

//     const subscription = AppState.addEventListener("change", handleAppStateChange);

//     return () => {
//       subscription.remove();
//       // sendHeartbeat.cancel();
//       s.off("connect", onConnect);
//       s.off("disconnect", onDisconnect);

//       const currentSocket = socketService.getSocket();
//       if (currentSocket && currentSocket !== s) {
//         currentSocket.off("connect", onConnect);
//         currentSocket.off("disconnect", onDisconnect);
//       }
//     };
//   }, [userProfileId]);

//   const value = useMemo(() => ({
//     socket,
//     isConnected,
//     emitEvent: (event: string, data: any) => socketService.emitWithRetry(event, data),
//     connect: (id: string, ws: string) => socketService.connect(id, ws),
//     disconnect: () => socketService.disconnect(),
//     joinChat: (chatId: string, id: string) => socketService.joinChat(chatId, id),
//     leaveChat: (chatId: string, id: string) => socketService.leaveChat(chatId, id),
//     updateUserActivity: (isActive: boolean) => {
//       if (userProfileId) {
//         socketService.updateUserActivity(userProfileId, activeWorkspaceId || "", isActive);
//       }
//     },
//     ensureSocketConnection: (id: string, ws: string) => socketService.ensureSocketConnection(id, ws),
//     markMessagesAsSeen: (chatId: string) => socketService.markMessagesAsSeen(chatId),
//   }), [socket, isConnected, userProfileId]);

//   return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
// };
