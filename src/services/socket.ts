import { Socket, io } from "socket.io-client";
import { getToken } from "../utils/auth/auth";

const SOCKET_URL = import.meta.env.VITE_API_SOCKET_URL || "http://localhost:3000";
class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;

  // Initialize socket connection
  connect() {
    if (this.socket && this.isConnected) {
      return this.socket;
    }

    const token = getToken();
    if (!token) {
      // No authentication token found for socket connection
      return null;
    }

    this.socket = io(SOCKET_URL, {
      auth: {
        token,
      },
      transports: ["websocket", "polling"],
    });

    this.socket.on("connect", () => {

      this.isConnected = true;
    });

    this.socket.on("disconnect", () => {

      this.isConnected = false;
    });

    this.socket.on("connect_error", (error) => {

      this.isConnected = false;
    });

    return this.socket;
  }

  // Disconnect socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  // Get current socket instance
  getSocket(): Socket | null {
    return this.socket;
  }

  // Check if connected
  isSocketConnected(): boolean {
    return this.isConnected;
  }

  // Listen for order status updates
  onOrderStatusUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on("orderStatusUpdated", callback);
    }
  }

  // Listen for new orders (admin only)
  onNewOrder(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on("newOrder", callback);
    }
  }

  // Listen for stock updates
  onStockUpdate(callback: (data: { productId: string; newStock: number }) => void) {
    if (this.socket) {
      this.socket.on("stockUpdated", callback);
    }
  }

  // Listen for low stock alerts (admin only)
  onLowStockAlert(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on("lowStockAlert", callback);
    }
  }

  // Listen for product updates
  onProductUpdate(callback: (data: any) => void) {
    if (this.socket) {
      this.socket.on("productUpdated", callback);
    }
  }

  // Remove specific event listener
  off(event: string) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  // Remove all event listeners
  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

// Create singleton instance
const socketService = new SocketService();

export default socketService;
