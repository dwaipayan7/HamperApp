import { useEffect } from "react";
import { useCurrentUser } from "./useCurrentUser";
import { socket } from "@/sockets/socket";

// export const useSocket = () => {
//   const { currentUser } = useCurrentUser();

//   useEffect(() => {
//     if (!currentUser?.clerkId) return;

//     const emitJoin = () => {
//       socket.emit("join", currentUser.clerkId);
//     };

//     if (socket.connected) {
//       emitJoin();
//     } else {
//       socket.connect();
//       socket.once("connect", emitJoin);
//     }

//     socket.on("connect", emitJoin);

//     return () => {
//       socket.off("connect", emitJoin);
//     };
//   }, [currentUser?.clerkId]);
// };
export const useSocket = () => {
  const { currentUser } = useCurrentUser();

  useEffect(() => {
    if (!currentUser?._id) return;

    const emitJoin = () => socket.emit("join", currentUser._id);

    if (socket.connected) {
      emitJoin();
    } else {
      socket.connect();
      socket.once("connect", emitJoin);
    }

    socket.on("connect", emitJoin);

    return () => {
      socket.off("connect", emitJoin);
    };
  }, [currentUser?._id]);
};
