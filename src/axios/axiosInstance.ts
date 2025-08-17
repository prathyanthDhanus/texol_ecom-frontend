import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  CancelTokenSource,
} from "axios";
import { jwtDecode } from "jwt-decode";
import { getToken, clearToken, setToken, getRefreshToken } from "../utils/auth/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  statusCode?: number;
}

export interface CustomRequestConfig extends AxiosRequestConfig {
  retry?: number;
  retryDelay?: number;
  __retryCount?: number;
  _retry?: boolean; 
}

interface TokenPayload {
  role?: string;
  exp?: number;
  userId?: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
} as CustomRequestConfig);

// Refresh token state management
let isRefreshing = false;
let failedRequestsQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null = null) => {
  failedRequestsQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token as string);
    }
  });
  failedRequestsQueue = [];
};

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();
    
    
    if (token) {
              config.headers.Authorization = `Bearer ${token}`;
      } else {
        // No token found, skipping Authorization header
      }
    
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError): Promise<ApiResponse> => {
    return Promise.reject(error);
  }
);

// Create cancel token source
export const createCancelSource = (): CancelTokenSource => {
  return axios.CancelToken.source();
};

export default axiosInstance;