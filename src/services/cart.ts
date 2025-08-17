import api from "../axios/httpMethods";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface CartItem {
  _id: string;
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  quantity: number;
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
}

export interface CartResponse {
  items: CartItem[];
  total: number;
  itemCount: number;
}

// Get user's cart
export const useGetCart = () => {
  return useQuery<CartResponse, Error>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get<{ data: CartResponse }>("/cart");
      return res.data.data;
    },
  });
};

// Add item to cart
export const useAddToCart = () => {
  const queryClient = useQueryClient();

  return useMutation<
    CartResponse,
    Error,
    { productId: string; quantity: number }
  >({
    mutationFn: async ({ productId, quantity }) => {
      const res = await api.post<{ data: CartResponse }>("/cart/add", {
        productId,
        quantity,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Update cart item quantity
export const useUpdateCartItem = () => {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error, { itemId: string; quantity: number }>(
    {
      mutationFn: async ({ itemId, quantity }) => {
        const res = await api.put<{ data: CartResponse }>(`/cart/update/${itemId}`, {
          quantity,
        });
        return res.data.data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["cart"] });
      },
    }
  );
};

// Remove item from cart
export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error, string>({
    mutationFn: async (itemId) => {
      const res = await api.delete<{ data: CartResponse }>(`/cart/remove/${itemId}`);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Clear entire cart
export const useClearCart = () => {
  const queryClient = useQueryClient();

  return useMutation<CartResponse, Error>({
    mutationFn: async () => {
      const res = await api.delete<{ data: CartResponse }>("/cart/clear");
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
