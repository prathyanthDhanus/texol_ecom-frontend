import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import CustomerNavbar from "../components/navbar/CustomerNavbar";
import CustomerFooter from "../components/footer/CustomerFooter";
import { Customer_Path } from "../constants/customerPaths";
import { Admin_Path } from "../constants/adminPaths";
import styles from "./style/CustomerLayout.module.css";

const CustomerLayout = () => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={`/auth/${Customer_Path.LOGIN}`} replace />;
  }

  // If user is admin, redirect to admin dashboard
  if (user && user.role?.toLowerCase() === 'admin') {
    return <Navigate to={`/admin/${Admin_Path.HOME}`} replace />;
  }

  // If user is customer/user, show customer layout
  if (user && (user.role?.toLowerCase() === 'customer' || user.role?.toLowerCase() === 'user')) {
    return (
      <div className={styles.layout}>
        <CustomerNavbar />
        <main className={styles.main}>
          <Outlet />
        </main>
        <CustomerFooter />
      </div>
    );
  }

  // Fallback - redirect to login
  return <Navigate to={`/auth/${Customer_Path.LOGIN}`} replace />;
};

export default CustomerLayout;
