import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Customer_Path } from "../constants/customerPaths";
import { Admin_Path } from "../constants/adminPaths";

const RootRedirect = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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

  // Only redirect if we're actually on the root path
  // This prevents redirecting when refreshing other pages
  if (location.pathname !== '/') {
    return null; // Don't redirect, let the current route handle it
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={`/auth/${Customer_Path.LOGIN}`} replace />;
  }

  // If authenticated, check user role and redirect accordingly
  if (user) {
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

  // Fallback - redirect to login
  return <Navigate to={`/auth/${Customer_Path.LOGIN}`} replace />;
};

export default RootRedirect;
