import api from "../axios/httpMethods";
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CategoryResponse,
  CategoryFormValues,
  CategoryData,
} from "../types/category";
import type { PaginatedResponse } from "../types/pagination";

//・・・・・・・・・・・・・・・ Create Category Api ・・・・・・・・・・・・・・・
export const useCreateCategory = () => {
  return useMutation<CategoryResponse, Error, CategoryFormValues>({
    mutationFn: async (categoryData) => {
      const res = await api.post<CategoryResponse>("/categories", categoryData);
      return res.data;
    },
  });
};

//・・・・・・・・・・・・・・・ Get All Categories Api ・・・・・・・・・・・・・・・

export const useGetCategories = (page: number = 1, limit: number = 10) => {
  return useQuery<PaginatedResponse<CategoryData>, Error>({
    queryKey: ["categories", page, limit],
    queryFn: async () => {
      const res = await api.get<{ data: CategoryData[]; total: number }>(
        `/categories?page=${page}&limit=${limit}`
      );
      return {
        data: res.data.data,
        total: res.data.total,
        page,
        limit,
      };
    },
  });
};
//・・・・・・・・・・・・・・・ Update Category Api ・・・・・・・・・・・・・・・
export const useUpdateCategory = () => {
  return useMutation<
    CategoryResponse,
    Error,
    { id: string; data: CategoryFormValues }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await api.put<CategoryResponse>(`/categories/${id}`, data);
      return res.data;
    },
  });
};

//・・・・・・・・・・・・・・・ Restore Category Api ・・・・・・・・・・・・・・・
export const useRestoreCategory = () => {
  return useMutation<
    CategoryResponse,
    Error,
    { id: string; data: { isDeleted: boolean } }
  >({
    mutationFn: async ({ id, data }) => {
      const res = await api.patch<CategoryResponse>(
        `/categories/${id}/restore`,
        data
      );
      return res.data;
    },
  });
};

//・・・・・・・・・・・・・・・ Delete Category Api ・・・・・・・・・・・・・・・
export const useDeleteCategory = () => {
  return useMutation<CategoryResponse, Error, string>({
    mutationFn: async (id) => {
      const res = await api.patch<CategoryResponse>(`/categories/${id}`);
      return res.data;
    },
  });
};
