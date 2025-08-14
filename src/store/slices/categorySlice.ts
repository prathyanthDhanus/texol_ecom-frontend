
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Category {
  _id: string;
  name: string;
  description: string;
  isDeleted?: boolean;
  createdAt?: string;
}

interface CategoryState {
  list: Category[];
}

const initialState: CategoryState = {
  list: [],
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.list = action.payload;
    },
    addCategory(state, action: PayloadAction<Category>) {
      state.list.push(action.payload);
    },
    updateCategory(state, action: PayloadAction<Category>) {
      const index = state.list.findIndex(c => c._id === action.payload._id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    deleteCategory(state, action: PayloadAction<string>) {
      state.list = state.list.filter(c => c._id !== action.payload);
    },
  },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;
export default categorySlice.reducer;
