// src/redux/socket/socketSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type{ PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

interface SocketState {
  socket: Socket | null;
  isConnected: boolean;
  error: string | null;
}

const initialState: SocketState = {
  socket: null,
  isConnected: false,
  error: null,
};

const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    socketConnected: (state, action: PayloadAction<Socket>) => {
      state.socket = action.payload;
      state.isConnected = true;
      state.error = null;
    },
    socketDisconnected: (state) => {
      state.isConnected = false;
      state.error = null;
    },
    socketError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export const { socketConnected, socketDisconnected, socketError } =
  socketSlice.actions;
export default socketSlice.reducer;
