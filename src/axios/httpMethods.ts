import axiosInstance from "./axiosInstance";
import type { CustomRequestConfig, ApiResponse } from "./axiosInstance";
import type { AxiosProgressEvent } from "axios";

// Typed API methods
const api = {
  get: <T = any>(
    url: string,
    params?: object,
    config?: CustomRequestConfig
  ): Promise<ApiResponse<T>> => axiosInstance.get(url, { params, ...config }),

  post: <T = any>(
    url: string,
    data?: object,
    config?: CustomRequestConfig
  ): Promise<ApiResponse<T>> => axiosInstance.post(url, data, config),

  put: <T = any>(
    url: string,
    data?: object,
    config?: CustomRequestConfig
  ): Promise<ApiResponse<T>> => axiosInstance.put(url, data, config),

  patch: <T = any>(
    url: string,
    data?: object,
    config?: CustomRequestConfig
  ): Promise<ApiResponse<T>> => axiosInstance.patch(url, data, config),

  delete: <T = any>(
    url: string,
    config?: CustomRequestConfig
  ): Promise<ApiResponse<T>> => axiosInstance.delete(url, config),

  upload: <T = any>(
    url: string,
    formData: FormData,
    onUploadProgress?: (progressEvent: AxiosProgressEvent) => void
  ): Promise<ApiResponse<T>> =>
    axiosInstance.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress,
    }),
};

export default api;
