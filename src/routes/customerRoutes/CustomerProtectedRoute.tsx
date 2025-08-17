import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Customer_Path } from "../../constants/customerPaths";

interface CustomerProtectedRouteProps {
  children: React.ReactNode;
}

const CustomerProtectedRoute: React.FC<CustomerProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to={`/auth/${Customer_Path.LOGIN}`} replace />;
  }

  return <>{children}</>;
};

export default CustomerProtectedRoute;
