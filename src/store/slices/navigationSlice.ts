import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface NavigationState {
  activePath: string;
  sidebarActiveName: string;
}

const initialState: NavigationState = {
  activePath: "/",
  sidebarActiveName: "dasbor",
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setActivePath: (state, action: PayloadAction<string>) => {
      state.activePath = action.payload;
    },
    setSidebarActiveName: (state, action: PayloadAction<string>) => {
      state.sidebarActiveName = action.payload;
    },
  },
});

export const { setActivePath, setSidebarActiveName } = navigationSlice.actions;
export default navigationSlice.reducer;
