import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useOrderUpdates = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state: RootState) => state.socket.socket);
  const isConnected = useSelector(
    (state: RootState) => state.socket.isConnected
  );
  const userId = useSelector((state: RootState) => state.auth.user?._id);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isConnected || !socket || !userId) return;

    // Listen for order status updates
    socket.on("orderStatusUpdated", (updatedOrder) => {
      toast.info(
        `Order #${updatedOrder._id.substring(0, 8)} status updated to ${
          updatedOrder.status
        }`
      );
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["order", updatedOrder._id]);
    });

    // Listen for new orders (admin dashboard)
    socket.on("newOrder", (newOrder) => {
      toast.success(`New order received: #${newOrder._id.substring(0, 8)}`);
      queryClient.invalidateQueries(["orders"]);
    });

    // Listen for stock changes
    socket.on("stockUpdated", ({ productId, newStock }) => {
      toast.warning(`Stock updated for product ${productId}`);
      queryClient.invalidateQueries(["products"]);
    });

    return () => {
      socket.off("orderStatusUpdated");
      socket.off("newOrder");
      socket.off("stockUpdated");
    };
  }, [isConnected, socket, userId, queryClient, dispatch]);
};

export const useSocket = () => {
  return useSelector((state: RootState) => ({
    socket: state.socket.socket,
    isConnected: state.socket.isConnected,
    error: state.socket.error,
  }));
};
