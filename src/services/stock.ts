import api from "../axios/httpMethods";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface StockReport {
  summary: {
    totalProducts: number;
    inStockProducts: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    totalValue: number;
  };
  timestamp: string;
}

export interface StockHistory {
  _id: string;
  productId: string;
  previousStock: number;
  newStock: number;
  change: number;
  reason: string;
  updatedBy: string;
  updatedAt: string;
}

export interface BulkStockUpdate {
  productId: string;
  newStock: number;
  reason?: string;
}

// Get comprehensive stock report
export const useGetStockReport = () => {
  return useQuery<{ data: StockReport }, Error>({
    queryKey: ["stock", "report"],
    queryFn: async () => {
      const res = await api.get<{ data: StockReport }>("/stock/report");
  
      return res.data;
    },
  });
};

// Get products by stock status
export const useGetProductsByStockStatus = (status: 'in-stock' | 'low-stock' | 'out-of-stock') => {
  return useQuery({
    queryKey: ["stock", "status", status],
    queryFn: async () => {
      const res = await api.get(`/stock/status/${status}`);
      return res.data;
    },
  });
};

// Get low stock products
export const useGetLowStockProducts = () => {
  return useQuery({
    queryKey: ["stock", "low-stock"],
    queryFn: async () => {
      const res = await api.get("/stock/low-stock");
      return res.data;
    },
  });
};

// Get out of stock products
export const useGetOutOfStockProducts = () => {
  return useQuery({
    queryKey: ["stock", "out-of-stock"],
    queryFn: async () => {
      const res = await api.get("/stock/out-of-stock");
      return res.data;
    },
  });
};

// Update product stock
export const useUpdateProductStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ productId, newStock, reason }: { productId: string; newStock: number; reason?: string }) => {
      const res = await api.put(`/stock/${productId}`, { newStock, reason });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Set stock threshold
export const useSetStockThreshold = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ productId, threshold }: { productId: string; threshold: number }) => {
      const res = await api.patch(`/stock/${productId}/threshold`, { threshold });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });
};

// Bulk update stock
export const useBulkUpdateStock = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (updates: BulkStockUpdate[]) => {
      const res = await api.post("/stock/bulk-update", { updates });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

// Get stock history for a product
export const useGetStockHistory = (productId: string) => {
  return useQuery<StockHistory[], Error>({
    queryKey: ["stock", "history", productId],
    queryFn: async () => {
      const res = await api.get<StockHistory[]>(`/stock/${productId}/history`);
      return res.data;
    },
    enabled: !!productId,
  });
};

// Trigger stock monitoring
export const useTriggerStockMonitoring = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/stock/monitor");
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stock"] });
    },
  });
};
