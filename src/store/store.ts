import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import navigationReducer from "./slices/navigationSlice";
import categoryReducer from "./slices/categorySlice";
import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import orderReducer from "./slices/orderSlice";
import socketMiddleware from "../utils/middleWares/socketMiddleware";
import socketReducer from "./slices/socketSlice";

export const store = configureStore({
  reducer: {
    navigation: navigationReducer,
    category: categoryReducer,
    auth: authReducer,
    product: productReducer,
    orders: orderReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
