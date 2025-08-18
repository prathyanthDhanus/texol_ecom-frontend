import api from "../axios/httpMethods";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { Order, PaginatedOrders } from "../types/order";

export const useGetOrders = (page: number = 1, limit: number = 10) => {
  return useQuery<PaginatedOrders, Error>({
    queryKey: ["orders", page, limit],
    queryFn: async () => {
      const res = await api.get(`/orders?page=${page}&limit=${limit}`);
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
      const res = await api.get<{ data: Order }>(`/orders/${orderId}`);
      return res.data.data;
    },
    enabled: !!orderId,
  });
};

export const useCreateOrder = () => {
  return useMutation<Order, Error, any>({
    mutationFn: async (orderData) => {
      const res = await api.post<{ data: Order }>("/orders", orderData);
      return res.data.data;
    },
  });
};

export const useUpdateOrderStatus = () => {
  return useMutation<Order, Error, { orderId: string; status: string }>({
    mutationFn: async ({ orderId, status }) => {
      const res = await api.put<Order>(`/orders/${orderId}`, { status });
      return res.data;
    },
  });
};
