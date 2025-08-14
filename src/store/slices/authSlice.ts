// store/slices/authSlice.ts
import { createSlice} from "@reduxjs/toolkit";
import type {  PayloadAction } from "@reduxjs/toolkit";
import { getToken, getRoleFromToken, clearToken } from "../../utils/auth/auth";

interface AuthState {
  token: string | null;
  role: string | null;
}

const initialState: AuthState = {
  token: getToken(),
  role: getRoleFromToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.role = getRoleFromToken();
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
      clearToken();
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
