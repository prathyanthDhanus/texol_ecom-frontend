import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
  CancelTokenSource,
} from "axios";

import { getToken, clearToken } from "../utils/auth/auth";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
} as CustomRequestConfig);

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    const originalRequest = error.config as CustomRequestConfig;

    if (error.response) {
      switch (error.response.status) {
        case 401:
          clearToken();
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/forbidden";
          break;
        case 404:
          window.location.href = "/not-found";
          break;
        case 500:
          if (originalRequest.retry) {
            originalRequest.__retryCount = originalRequest.__retryCount || 0;
            if (originalRequest.__retryCount < originalRequest.retry) {
              originalRequest.__retryCount += 1;
              await new Promise((resolve) =>
                setTimeout(resolve, originalRequest.retryDelay || 1000)
              );
              return axiosInstance(originalRequest);
            }
          }
          break;
      }
    }

    return Promise.reject({
      success: false,
      message: error.message,
      data: error.response?.data,
      statusCode: error.response?.status,
    } as ApiResponse);
  }
);

// Create cancel token source
export const createCancelSource = (): CancelTokenSource => {
  return axios.CancelToken.source();
};

export default axiosInstance;
