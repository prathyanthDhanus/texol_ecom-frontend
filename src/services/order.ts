import api from "../axios/httpMethods";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Order, PaginatedOrders } from "../types/order";

export const useGetOrders = (page: number = 1, limit: number = 10) => {
  return useQuery<PaginatedOrders, Error>({
    queryKey: ["orders", page, limit],
    queryFn: async () => {
      const res = await api.get(`/order?page=${page}&limit=${limit}`);
      return {
        data: res.data.data,
        total: res.data.pagination.total,
        page: res.data.pagination.page,
        totalPages: res.data.pagination.totalPages,
      };
    },
  });
};

export const useGetOrder = (orderId: string) => {
  return useQuery<Order, Error>({
    queryKey: ["order", orderId],
    queryFn: async () => {
      const res = await api.get<Order>(`/order/${orderId}`);
      return res.data.data;
    },
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation<Order, Error, { orderId: string; status: string }>({
    mutationFn: async ({ orderId, status }) => {
      const res = await api.put<Order>(`/order/${orderId}`, { status });
      return res.data;
    },
  });
};
