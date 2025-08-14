import api from "../axios/httpMethods";
import { useMutation, useQuery } from "@tanstack/react-query";
import type {
  CategoryResponse,
  CategoryFormValues,
  CategoryData,
} from "../types/category";

//・・・・・・・・・・・・・・・ Create Category Api ・・・・・・・・・・・・・・・
export const useCreateCategory = () => {
  return useMutation<CategoryResponse, Error, CategoryFormValues>({
    mutationFn: async (categoryData) => {
      const res = await api.post<CategoryResponse>("/category", categoryData);
      return res.data;
    },
  });
};

//・・・・・・・・・・・・・・・ Get All Categories Api ・・・・・・・・・・・・・・・
export const useGetCategories = () => {
  return useQuery<CategoryData[], Error>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get<{ data: CategoryData[] }>("/category");
      return res.data.data;
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
      const res = await api.put<CategoryResponse>(`/category/${id}`, data);
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
      const res = await api.patch<CategoryResponse>(`/category/${id}/restore`, data);
      return res.data;
    }
  });
};

//・・・・・・・・・・・・・・・ Delete Category Api ・・・・・・・・・・・・・・・
export const useDeleteCategory = () => {
  return useMutation<CategoryResponse, Error, string>({
    mutationFn: async (id) => {
      const res = await api.patch<CategoryResponse>(`/category/${id}`);
      return res.data;
    },
  });
};
