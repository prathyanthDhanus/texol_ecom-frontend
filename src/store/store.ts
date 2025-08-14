import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import navigationReducer from "./slices/navigationSlice";
import categoryReducer from "./slices/categorySlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    category:categoryReducer,
     auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
