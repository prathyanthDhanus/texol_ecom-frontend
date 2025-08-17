import api from "../axios/httpMethods";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product, PaginatedProducts } from "../types/product";

//・・・・・・・・・・・・・・・ Create Product Api ・・・・・・・・・・・・・・・
export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, Error, FormData>({
    mutationFn: async (productData) => {
      const res = await api.post<Product>("/products", productData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: () => {
      // Force refetch products list immediately
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.refetchQueries({ queryKey: ["products"] });
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
      }>(`/products?page=${page}&limit=${limit}`);

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
  const queryClient = useQueryClient();
  
  return useMutation<Product, Error, { id: string; data: FormData }>({
    mutationFn: async ({ id, data }) => {
      const res = await api.put<Product>(`/products/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      // Force refetch products list immediately
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.refetchQueries({ queryKey: ["products"] });
      // Also invalidate the specific product query
      queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
    },
  });
};
//・・・・・・・・・・・・・・・ Get Product By ID Api ・・・・・・・・・・・・・・・
export const useGetProductById = (id: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await api.get<Product>(`/products/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

//・・・・・・・・・・・・・・・ Restore Product Api ・・・・・・・・・・・・・・・
export const useRestoreProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, Error, string>({
    mutationFn: async (id) => {
      if (!id) throw new Error("Product ID is required");
      const res = await api.patch<Product>(`/products/${id}/restore`);
      return res.data;
    },
    onSuccess: (data, variables) => {
      // Force refetch products list immediately
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.refetchQueries({ queryKey: ["products"] });
      // Also invalidate the specific product query
      queryClient.invalidateQueries({ queryKey: ["product", variables] });
    },
  });
};

//・・・・・・・・・・・・・・・ Delete Product Api ・・・・・・・・・・・・・・・
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation<Product, Error, string>({
    mutationFn: async (id) => {
      const res = await api.patch<Product>(`/products/${id}`);
      return res.data;
    },
    onSuccess: (data, variables) => {
      // Force refetch products list immediately
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.refetchQueries({ queryKey: ["products"] });
      // Also invalidate the specific product query
      queryClient.invalidateQueries({ queryKey: ["product", variables] });
    },
  });
};
