// import axios from "axios";
// import type {
//   AxiosInstance,
//   AxiosRequestConfig,
//   AxiosResponse,
//   AxiosError,
//   InternalAxiosRequestConfig,
//   CancelTokenSource,
// } from "axios";

// import { getToken, clearToken } from "../utils/auth/auth";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export interface ApiResponse<T = any> {
//   data: T;
//   message?: string;
//   success: boolean;
//   statusCode?: number;
// }

// export interface CustomRequestConfig extends AxiosRequestConfig {
//   retry?: number;
//   retryDelay?: number;
//   __retryCount?: number;
// }

// const axiosInstance: AxiosInstance = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 10000,
//   headers: {
//     "Content-Type": "application/json",
//   },
// } as CustomRequestConfig);

// // Request interceptor
// axiosInstance.interceptors.request.use(
//   (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
//     const token = getToken();
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error: AxiosError): Promise<AxiosError> => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// axiosInstance.interceptors.response.use(
//   (response: AxiosResponse): AxiosResponse => {
//     return response;
//   },
//   async (error: AxiosError): Promise<ApiResponse> => {
//     const originalRequest = error.config as CustomRequestConfig;

//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           clearToken();
//           window.location.href = "/login";
//           break;
//         case 403:
//           window.location.href = "/forbidden";
//           break;
//         case 404:
//           window.location.href = "/not-found";
//           break;
//         case 500:
//           if (originalRequest.retry) {
//             originalRequest.__retryCount = originalRequest.__retryCount || 0;
//             if (originalRequest.__retryCount < originalRequest.retry) {
//               originalRequest.__retryCount += 1;
//               await new Promise((resolve) =>
//                 setTimeout(resolve, originalRequest.retryDelay || 1000)
//               );
//               return axiosInstance(originalRequest);
//             }
//           }
//           break;
//       }
//     }

//     return Promise.reject({
//       success: false,
//       message: error.message,
//       data: error.response?.data,
//       statusCode: error.response?.status,
//     } as ApiResponse);
//   }
// );

// // Create cancel token source
// export const createCancelSource = (): CancelTokenSource => {
//   return axios.CancelToken.source();
// };

// export default axiosInstance;

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

    // Handle 401 unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      const token = getToken();
      
      // If no token exists, clear and redirect to login
      if (!token) {
        clearToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      // Check if token is expired
      try {
        const decoded = jwtDecode<TokenPayload>(token);
        const isExpired = decoded?.exp ? decoded.exp < Date.now() / 1000 : true;

        if (!isExpired) {
          // Token isn't expired but we got 401 - might be invalid token
          clearToken();
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Token is expired, try to refresh
        if (isRefreshing) {
          // If refresh is already in progress, add to queue
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then((newToken) => {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const refreshToken = getRefreshToken();

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          // Call refresh token endpoint
          const response = await axios.post(`${API_BASE_URL}/auth/refresh-token`, {
            refreshToken,
          });

          const { accessToken, refreshToken: newRefreshToken } = response.data.data;

          // Store the new tokens
          setToken(accessToken, true); // or false based on remember me
          // Store refresh token - you'll need to implement this
          localStorage.setItem("refreshToken", newRefreshToken);

          // Update Authorization header
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          // Process queued requests
          processQueue(null, accessToken);

          // Retry the original request
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh fails, clear tokens and redirect to login
          processQueue(error as AxiosError);
          clearToken();
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      } catch (decodeError) {
        clearToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    // Handle other error cases
    if (error.response) {
      switch (error.response.status) {
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