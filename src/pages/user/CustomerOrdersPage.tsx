import { useState } from "react";
import { Link } from "react-router-dom";
import { useGetOrders } from "../../services/order";
import { Customer_Path } from "../../constants/customerPaths";
import Pagination from "../../components/pagination/Pagination";
import styles from "./CustomerOrdersPage.module.css";

const CustomerOrdersPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: ordersData, isLoading, error } = useGetOrders(currentPage, 10);

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
    return <div className={styles.loading}>Loading orders...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error loading orders</div>;
  }

  return (
    <div className={styles.ordersPage}>
      <div className={styles.ordersHeader}>
        <h1 className={styles.ordersTitle}>My Orders</h1>
        <p className={styles.ordersSubtitle}>Track your order history</p>
      </div>

      {ordersData?.data.length === 0 ? (
        <div className={styles.emptyOrders}>
          <div className={styles.emptyOrdersContent}>
            <h2 className={styles.emptyOrdersTitle}>No orders found</h2>
            <p className={styles.emptyOrdersMessage}>
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Link to={Customer_Path.PRODUCTS} className={styles.startShoppingBtn}>
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.ordersList}>
            {ordersData?.data.map((order) => (
              <div key={order._id} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div className={styles.orderInfo}>
                    <h3 className={styles.orderId}>Order #{order._id.slice(-8)}</h3>
                    <p className={styles.orderDate}>
                      Placed on {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className={styles.orderStatus}>
                    <span className={`${styles.statusBadge} ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className={styles.orderItems}>
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
                        <h4 className={styles.itemName}>{product.product.name}</h4>
                        <p className={styles.itemQuantity}>Quantity: {product.quantity}</p>
                        <p className={styles.itemPrice}>${product.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.orderFooter}>
                  <div className={styles.orderTotal}>
                    <span className={styles.totalLabel}>Total:</span>
                    <span className={styles.totalAmount}>${order.totalAmount}</span>
                  </div>
                  <Link
                    to={`${Customer_Path.ORDER_DETAIL.replace(":orderId", order._id)}`}
                    className={styles.viewOrderBtn}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {ordersData && ordersData.totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <Pagination
                currentPage={currentPage}
                totalPages={ordersData.totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerOrdersPage;
