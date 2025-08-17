// store/slices/authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getToken, getUserFromToken, clearToken, setToken, setRefreshToken, getUserData } from "../../utils/auth/auth";
import type { User } from "../../types/auth";
import api from "../../axios/httpMethods";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

const initialState: AuthState = {
  token: null, // Don't initialize from localStorage on startup
  user: null,  // Don't initialize from localStorage on startup
  isAuthenticated: false, // Don't initialize from localStorage on startup
  error: null,
  isLoading: false,
};

// Async thunk for registration
export const register = createAsyncThunk(
  'auth/register',
  async (registerData: RegisterData, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/register', registerData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

// Auth slice initialization

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      clearToken();
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthState: (state, action: PayloadAction<{ token: string; user: User; refreshToken?: string }>) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.error = null;
      
      // Store tokens in localStorage (this is now handled in the login components)
      // setToken(action.payload.token);
      // if (action.payload.refreshToken) {
      //   setRefreshToken(action.payload.refreshToken, true);
      // }
    },
    initializeAuthFromStorage: (state) => {
      // Only initialize if not already authenticated
      if (state.isAuthenticated) {
        return;
      }
      
      const token = getToken();
      const userData = getUserData();
      
      
      
      if (token && userData) {
        state.token = token;
        state.user = userData;
        state.isAuthenticated = true;
      } else {
        // No valid token or user data found
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.data.user;
        state.token = action.payload.data.accessToken;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  logout,
  clearError,
  setAuthState,
  initializeAuthFromStorage,
} = authSlice.actions;

export default authSlice.reducer;