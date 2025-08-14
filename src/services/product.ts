import api from "../axios/httpMethods";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Product, PaginatedProducts } from "../types/product";

//・・・・・・・・・・・・・・・ Create Product Api ・・・・・・・・・・・・・・・
export const useCreateProduct = () => {
  return useMutation<Product, Error, FormData>({
    mutationFn: async (productData) => {
      const res = await api.post<Product>("/product", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
  });
};

//・・・・・・・・・・・・・・・ Get All Products Api ・・・・・・・・・・・・・・・
export const useGetProducts = (page: number = 1, limit: number = 10) => {
  return useQuery<PaginatedProducts, Error>({
    queryKey: ["products", page, limit],
    queryFn: async () => {
      const res = await api.get<{
        data: Product[];
        total: number;
        page: number;
        totalPages: number;
      }>(`/product?page=${page}&limit=${limit}`);

      return {
        products: res.data.data,
        total: res.data.total,
        page: res.data.page,
        totalPages: res.data.totalPages,
      };
    },
  });
};

//・・・・・・・・・・・・・・・ Update Product Api ・・・・・・・・・・・・・・・
export const useUpdateProduct = () => {
  return useMutation<Product, Error, { id: string; data: FormData }>({
    mutationFn: async ({ id, data }) => {
      const res = await api.put<Product>(`/product/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
  });
};
//・・・・・・・・・・・・・・・ Restore Product Api ・・・・・・・・・・・・・・・
export const useRestoreProduct = () => {
  return useMutation<Product, Error, string>({
    mutationFn: async (id) => {
      if (!id) throw new Error("Product ID is required");
      const res = await api.patch<Product>(`/product/${id}/restore`);
      return res.data;
    },
  });
};

//・・・・・・・・・・・・・・・ Delete Product Api ・・・・・・・・・・・・・・・
export const useDeleteProduct = () => {
  return useMutation<Product, Error, string>({
    mutationFn: async (id) => {
      const res = await api.patch<Product>(`/product/${id}`);
      return res.data;
    },
  });
};
