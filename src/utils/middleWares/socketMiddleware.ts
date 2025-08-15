import type { Middleware } from "@reduxjs/toolkit";
import io from "socket.io-client";
import {
  socketConnected,
  socketDisconnected,
  socketError,
} from "../../store/slices/socketSlice";

const socketMiddleware: Middleware = (store) => {
  let socket: Socket;

  return (next) => (action) => {
    // Initialize socket connection when user logs in
    if (
      action.type === "auth/loginSuccess" ||
      action.type === "auth/checkAuthSuccess"
    ) {
      const { user } = action.payload;

      socket = io(process.env.REACT_APP_API_URL || "http://localhost:3000", {
        withCredentials: true,
      });

      socket.on("connect", () => {
        store.dispatch(socketConnected(socket));
        // Join user-specific room
        socket.emit("joinRoom", user._id);
      });

      socket.on("disconnect", () => {
        store.dispatch(socketDisconnected());
      });

      socket.on("connect_error", (err) => {
        store.dispatch(socketError(err.message));
      });
    }

    // Disconnect socket when user logs out
    if (action.type === "auth/logoutSuccess" && socket) {
      socket.disconnect();
    }

    return next(action);
  };
};

export default socketMiddleware;
