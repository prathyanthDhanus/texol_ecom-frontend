import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";

interface ProductState {
  list: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  list: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.list = action.payload;
      state.error = null;
    },
    addProduct: (state, action: PayloadAction<Product>) => {
      state.list.unshift(action.payload);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.list.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter(
        (product) => product._id !== action.payload
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    resetProductState: () => initialState,
  },
});

export const {
  setProducts,
  addProduct,
  updateProduct,
  removeProduct,
  setLoading,
  setError,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;
