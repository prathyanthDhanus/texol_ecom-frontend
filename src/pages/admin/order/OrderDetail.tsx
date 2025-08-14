import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetOrder, useUpdateOrderStatus } from "../../../services/order";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import Button from "../../../components/buttons/Button";
import "./Order.css";

const OrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  const { data: order, isLoading, error } = useGetOrder(orderId || "");
  const { mutate: updateStatus, isPending: isUpdating } =
    useUpdateOrderStatus();

  const handleStatusUpdate = (newStatus: string) => {
    if (!orderId) return;

    updateStatus(
      { orderId, status: newStatus },
      {
        onSuccess: () => {
          toastSuccess("Order status updated successfully");
        },
        onError: (error) => {
          toastError(error.message || "Failed to update order status");
        },
      }
    );
  };

  const getOrderIdDisplay = (id?: string) => {
    return id ? `#${id.substring(0, 8)}` : "#N/A";
  };

  const getFirstImage = (images?: string[]) => {
    return images?.[0] || "https://via.placeholder.com/150";
  };

  const formatStatus = (status?: string) => {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (isLoading) return <div className="loading">Loading order details...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;
  if (!order || !order._id)
    return <div className="not-found">Order not found</div>;

  return (
    <div className="order-detail-container">
      <div className="order-header">
        <Button variant="secondary" onClick={() => navigate(-1)}>
          Back to Orders
        </Button>
        <h2>Order - {order._id} </h2>
        <div className="order-status">
          <span className={`status-badge ${order.status}`}>
            {formatStatus(order.status)}
          </span>
        </div>
      </div>

      <div className="order-sections">
        <div className="order-section">
          <h3>Customer Information</h3>
          <div className="info-grid">
            <div>
              <strong>Name:</strong> {order.user?.username || "N/A"}
            </div>
            <div>
              <strong>Email:</strong> {order.user?.email || "N/A"}
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3>Shipping Information</h3>
          <div className="shipping-info">
            <p>{order.shippingAddress || "No shipping address provided"}</p>
          </div>
        </div>

        <div className="order-section">
          <h3>Payment Information</h3>
          <div className="info-grid">
            <div>
              <strong>Method:</strong> {order.paymentMethod || "N/A"}
            </div>
            <div>
              <strong>Status:</strong> {formatStatus(order.paymentStatus)}
            </div>
            <div>
              <strong>Total:</strong> ${order.totalAmount?.toFixed(2) || "0.00"}
            </div>
          </div>
        </div>

        <div className="order-section">
          <h3>Order Items</h3>
          <div className="order-items">
            {order.products?.map((item, index) => (
              <div key={item._id || index} className="order-item">
                <div className="item-image">
                  <img
                    src={getFirstImage(item.product?.images)}
                    alt={item.product?.name || "Product image"}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div className="item-details">
                  <h4>{item.product?.name || "Unnamed Product"}</h4>
                  <p>
                    ${item.price?.toFixed(2) || "0.00"} × {item.quantity || 0}
                  </p>
                </div>
                <div className="item-total">
                  ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="info-grid">
            <div>
              <strong>Name:</strong> {order.user?.username || "Guest User"}
            </div>
            <div>
              <strong>Email:</strong> {order.user?.email || "No email provided"}
            </div>
          </div>
        </div>

        {order.status === "pending" && (
          <div className="order-actions">
            <Button
              variant="primary"
              onClick={() => handleStatusUpdate("processing")}
              disabled={isUpdating}
            >
              {isUpdating ? "Processing..." : "Process Order"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
