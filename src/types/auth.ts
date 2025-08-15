// src/types/auth.ts
import type { FormikProps } from "formik";

// Form Types
export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

// Component Prop Types
export interface LoginFormProps {
  formik: FormikProps<LoginFormValues>;
  isLoading: boolean;
}

export interface RegisterFormProps {
  formik: FormikProps<RegisterFormValues>;
  isLoading: boolean;
}

// API Response Types
export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface RegisterResponse {
  status: string;
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

// Core User Type (used across the application)
export interface User {
  _id: string;
  username: string;
  email: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

// Redux Auth State Type
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
