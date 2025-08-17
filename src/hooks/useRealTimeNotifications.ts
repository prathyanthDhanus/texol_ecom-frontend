import { useEffect, useRef, useMemo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import socketService from "../services/socket";
import { toastSuccess, toastError } from "../utils/toast/toast";

export const useRealTimeNotifications = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Memoize the isAdmin value to prevent unnecessary re-renders
  const isAdmin = useMemo(() => {
    return user?.role?.toLowerCase() === 'admin';
  }, [user?.role]);

  useEffect(() => {
    // Only connect if we have a user
    if (!user) {
      return;
    }

    // Connect to socket when component mounts
    const socket = socketService.connect();

    if (!socket) {
      return;
    }

    // Create event handlers
    const handleOrderStatusUpdate = (updatedOrder: any) => {

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", updatedOrder._id] });
      
      // Show notification for order status update
      toastSuccess(`Order #${updatedOrder._id.slice(-6)} status updated to ${updatedOrder.status}`);
    };

    const handleNewOrder = (newOrder: any) => {

      queryClient.invalidateQueries({ queryKey: ["orders"] });
      
      // Show notification for new order (admin only)
      if (isAdmin) {
        toastSuccess(`New order received! Order #${newOrder._id.slice(-6)} - $${newOrder.total}`);
      }
    };

    const handleStockUpdate = ({ productId, newStock, name }: any) => {

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["stock"] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      
      // Show notification for stock update
      toastSuccess(`Stock updated for ${name}: ${newStock} units`);
    };

    const handleLowStockAlert = (alert: any) => {

      queryClient.invalidateQueries({ queryKey: ["stock"] });
      
      // Show notification for low stock alert (admin only)
      if (isAdmin) {
        toastError(`Low stock alert: ${alert.productName} has only ${alert.currentStock} units left`);
      }
    };

    const handleProductUpdate = (updatedProduct: any) => {

      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", updatedProduct._id] });
      
      // Show notification for product update
      toastSuccess(`Product updated: ${updatedProduct.name}`);
    };

    // Add event listeners
    socketService.onOrderStatusUpdate(handleOrderStatusUpdate);
    
    if (isAdmin) {
      socketService.onNewOrder(handleNewOrder);
      socketService.onLowStockAlert(handleLowStockAlert);
    }
    
    socketService.onStockUpdate(handleStockUpdate);
    socketService.onProductUpdate(handleProductUpdate);

    // Cleanup on unmount
    return () => {
      socketService.off("orderStatusUpdated");
      if (isAdmin) {
        socketService.off("newOrder");
        socketService.off("lowStockAlert");
      }
      socketService.off("stockUpdated");
      socketService.off("productUpdated");
    };
  }, [queryClient, isAdmin, user]);

  // Return socket service for manual operations
  return {
    socket: socketService.getSocket(),
    isConnected: socketService.isSocketConnected(),
    disconnect: () => socketService.disconnect(),
  };
};
