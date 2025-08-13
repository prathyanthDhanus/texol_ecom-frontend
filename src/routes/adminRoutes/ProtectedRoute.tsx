import React from "react";

import { getRoleFromToken } from "../../utils/auth/auth";
import { getToken } from "../../utils/auth/auth";

import Unauthorized from "../../components/statuses/Unauthorized";
import Forbidden from "../../components/statuses/Forbidden";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const isAuthenticated = (): boolean => {
  const token = getToken();
  return Boolean(token);
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole = "admin",
}) => {
  const authenticated = isAuthenticated();
  const userRole = getRoleFromToken();

  if (!authenticated) {
    return <Unauthorized />;
  }

  if (userRole !== requiredRole) {
    return <Forbidden />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
