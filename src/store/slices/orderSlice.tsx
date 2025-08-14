
import { createSlice } from '@reduxjs/toolkit';
import type{ PayloadAction } from '@reduxjs/toolkit';
import type { Order } from '../../types/order';

interface OrderState {
  orders: Order[];
  selectedOrder: Order | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  status: 'idle',
  error: null,
};

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
      state.status = 'succeeded';
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.selectedOrder = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.status = action.payload ? 'loading' : 'idle';
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.status = 'failed';
    },
    clearError: (state) => {
      state.error = null;
    },
    resetOrderState: () => initialState,
  },
});

export const {
  setOrders,
  setOrder,
  setLoading,
  setError,
  clearError,
  resetOrderState,
} = orderSlice.actions;

export default orderSlice.reducer;