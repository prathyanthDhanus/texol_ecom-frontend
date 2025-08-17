import React from "react";
import { useAppSelector } from "../../store/store";

import Unauthorized from "../../components/statuses/Unauthorized";
import Forbidden from "../../components/statuses/Forbidden";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "admin",
}) => {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);



  if (!isAuthenticated) {

    return <Unauthorized />;
  }

  if (user?.role?.toLowerCase() !== requiredRole.toLowerCase()) {

    return <Forbidden />;
  }

  
  return <>{children}</>;
};

export default ProtectedRoute;
