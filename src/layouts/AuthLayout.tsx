import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Customer_Path } from "../constants/customerPaths";
import { Admin_Path } from "../constants/adminPaths";
import "./style/AuthStyles.css"

const AuthLayout = () => {
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

  // If authenticated, redirect to appropriate dashboard
  if (isAuthenticated && user) {
    const userRole = user.role?.toLowerCase();
    
    // If admin, redirect to admin dashboard
    if (userRole === 'admin') {
      return <Navigate to={`/admin/${Admin_Path.HOME}`} replace />;
    }
    
    // If customer/user, redirect to customer home
    if (userRole === 'customer' || userRole === 'user') {
      return <Navigate to={`/home/${Customer_Path.HOME}`} replace />;
    }
  }

  // If not authenticated, show auth layout (login/register pages)
  return (
    <div className="auth-layout">
      <Outlet />
    </div>
  );
};

export default AuthLayout;