import { useParams, Link } from "react-router-dom";
import { useGetOrder } from "../../services/order";
import { Customer_Path } from "../../constants/customerPaths";
import styles from "./CustomerOrderDetailPage.module.css";

const CustomerOrderDetailPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { data: order, isLoading, error } = useGetOrder(orderId || "");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return styles.pending;
      case "processing":
        return styles.processing;
      case "shipped":
        return styles.shipped;
      case "delivered":
        return styles.delivered;
      case "cancelled":
        return styles.cancelled;
      default:
        return styles.pending;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading order details...</div>;
  }

  if (error || !order) {
    return <div className={styles.error}>Order not found</div>;
  }

  return (
    <div className={styles.orderDetailPage}>
      <div className={styles.orderDetailHeader}>
        <div className={styles.headerContent}>
          <h1 className={styles.orderDetailTitle}>Order Details</h1>
          <Link to={Customer_Path.ORDERS} className={styles.backToOrdersBtn}>
            ← Back to Orders
          </Link>
        </div>
      </div>

      <div className={styles.orderDetailContainer}>
        {/* Order Information */}
        <div className={styles.orderInfoSection}>
          <h2 className={styles.sectionTitle}>Order Information</h2>
          
          <div className={styles.orderInfoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Order ID:</span>
              <span className={styles.infoValue}>#{order._id.slice(-8)}</span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Order Date:</span>
              <span className={styles.infoValue}>{formatDate(order.createdAt)}</span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Status:</span>
              <span className={`${styles.statusBadge} ${getStatusColor(order.status)}`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Total Amount:</span>
              <span className={styles.infoValue}>${order.totalAmount}</span>
            </div>
          </div>
        </div>

        {/* Shipping Information */}
        <div className={styles.shippingSection}>
          <h2 className={styles.sectionTitle}>Shipping Information</h2>
          
          <div className={styles.shippingInfo}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Shipping Address:</span>
              <span className={styles.infoValue}>{order.shippingAddress}</span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Payment Method:</span>
              <span className={styles.infoValue}>
                {order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)}
              </span>
            </div>
            
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Payment Status:</span>
              <span className={`${styles.paymentStatus} ${
                order.paymentStatus === "completed" ? styles.completed : styles.pending
              }`}>
                {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className={styles.orderItemsSection}>
          <h2 className={styles.sectionTitle}>Order Items</h2>
          
          <div className={styles.orderItemsList}>
            {order.products.map((product, index) => (
              <div key={index} className={styles.orderItem}>
                <div className={styles.itemImage}>
                  <img
                    src={product.product.images[0] || "/placeholder-image.jpg"}
                    alt={product.product.name}
                    className={styles.image}
                  />
                </div>
                
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{product.product.name}</h3>
                  <p className={styles.itemQuantity}>Quantity: {product.quantity}</p>
                  <p className={styles.itemPrice}>Price: ${product.price}</p>
                  <p className={styles.itemTotal}>
                    Total: ${(product.price * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className={styles.orderSummarySection}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>
          
          <div className={styles.summaryDetails}>
            <div className={styles.summaryRow}>
              <span>Subtotal:</span>
              <span>${order.totalAmount}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping:</span>
              <span>Free</span>
            </div>
            <div className={styles.summaryTotal}>
              <span>Total:</span>
              <span>${order.totalAmount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerOrderDetailPage;
