import {
  useGetStockReport,
  useGetLowStockProducts,
  useGetOutOfStockProducts,
} from "../../../services/stock";
import { useGetOrders } from "../../../services/order";
import { useGetProducts } from "../../../services/product";
import { useRealTimeNotifications } from "../../../hooks/useRealTimeNotifications";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {


  const {
    data: stockReport,
    isLoading: stockLoading,
    refetch: refetchStock,
  } = useGetStockReport();
  const {
    data: lowStockProducts,
    isLoading: lowStockLoading,
    refetch: refetchLowStock,
  } = useGetLowStockProducts();
  const {
    data: outOfStockProducts,
    isLoading: outOfStockLoading,
    refetch: refetchOutOfStock,
  } = useGetOutOfStockProducts();
  const {
    data: ordersData,
    isLoading: ordersLoading,
    refetch: refetchOrders,
  } = useGetOrders(1, 5); // Recent 5 orders
  const {
    data: productsData,
    isLoading: productsLoading,
    refetch: refetchProducts,
  } = useGetProducts(1, 5); // Recent 5 products

  // Initialize real-time notifications
  useRealTimeNotifications();

  const isLoading =
    stockLoading ||
    lowStockLoading ||
    outOfStockLoading ||
    ordersLoading ||
    productsLoading;

  // Extract data safely
  const stockData = stockReport?.data?.summary || {
    totalProducts: 0,
    inStockProducts: 0,
    lowStockProducts: 0,
    outOfStockProducts: 0,
    totalValue: 0,
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  
  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1 className={styles.title}>Admin Dashboard</h1>
        <p className={styles.subtitle}>
          Welcome back! Here's what's happening with your store.
        </p>
      </div>

      {/* Stock Overview Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon}>📦</div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Total Products</h3>
            <p className={styles.statValue}>{stockData.totalProducts}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>✅</div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>In Stock</h3>
            <p className={styles.statValue}>{stockData.inStockProducts}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>⚠️</div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Low Stock</h3>
            <p className={styles.statValue}>{stockData.lowStockProducts}</p>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon}>❌</div>
          <div className={styles.statContent}>
            <h3 className={styles.statTitle}>Out of Stock</h3>
            <p className={styles.statValue}>{stockData.outOfStockProducts}</p>
          </div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Low Stock Alerts */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Low Stock Alerts</h2>
          <div className={styles.alertList}>
            {lowStockProducts?.data && lowStockProducts.data.length > 0 ? (
              lowStockProducts.data.slice(0, 5).map((product: any) => (
                <div key={product._id} className={styles.alertItem}>
                  <div className={styles.alertInfo}>
                    <h4 className={styles.alertTitle}>{product.name}</h4>
                    <p className={styles.alertStock}>
                      Stock: {product.stock} units
                    </p>
                  </div>
                  <span className={styles.alertBadge}>Low Stock</span>
                </div>
              ))
            ) : (
              <p className={styles.noAlerts}>No low stock alerts</p>
            )}
          </div>
        </div>

        {/* Out of Stock Products */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Out of Stock Products</h2>
          <div className={styles.alertList}>
            {outOfStockProducts?.data && outOfStockProducts.data.length > 0 ? (
              outOfStockProducts.data.slice(0, 5).map((product: any) => (
                <div key={product._id} className={styles.alertItem}>
                  <div className={styles.alertInfo}>
                    <h4 className={styles.alertTitle}>{product.name}</h4>
                    <p className={styles.alertStock}>Stock: 0 units</p>
                  </div>
                  <span className={styles.alertBadge}>Out of Stock</span>
                </div>
              ))
            ) : (
              <p className={styles.noAlerts}>No out of stock products</p>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Orders</h2>
          <div className={styles.orderList}>
            {ordersData?.data && ordersData.data.length > 0 ? (
              ordersData.data.map((order: any) => (
                <div key={order._id} className={styles.orderItem}>
                  <div className={styles.orderInfo}>
                    <h4 className={styles.orderId}>
                      Order #{order._id.slice(-6)}
                    </h4>
                    <p className={styles.orderStatus}>{order.status}</p>
                    <p className={styles.orderTotal}>${order.total}</p>
                  </div>
                  <span
                    className={`${styles.statusBadge} ${
                      styles[order.status.toLowerCase()]
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              ))
            ) : (
              <p className={styles.noOrders}>No recent orders</p>
            )}
          </div>
        </div>

        {/* Recent Products */}
        <div className={styles.section}>
          <h2 className={styles.sectionTitle}>Recent Products</h2>
          <div className={styles.productList}>
            {productsData?.products && productsData.products.length > 0 ? (
              productsData.products.map((product: any) => (
                <div key={product._id} className={styles.productItem}>
                  <div className={styles.productImage}>
                    <img
                      src={product.images[0] || "/placeholder-image.jpg"}
                      alt={product.name}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h4 className={styles.productName}>{product.name}</h4>
                    <p className={styles.productPrice}>${product.price}</p>
                    <p className={styles.productStock}>
                      Stock: {product.stock}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className={styles.noProducts}>No products found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
