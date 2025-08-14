import { createBrowserRouter } from "react-router-dom";
import { useMemo } from "react";

import { adminRoutesConfig } from "./adminRoutes/AdminRoutes";
import { generateRoutes } from "../utils/routes/generateRoutes";
import RootLayout from "../layouts";
import AdminLayout from "../layouts/AdminLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./adminRoutes/ProtectedRoute";

export const useRouter = () => {
  return useMemo(() => {
    return createBrowserRouter([
      {
        element: <RootLayout />,
        children: [
          // Auth routes
          {
            element: <AuthLayout />,
            children: generateRoutes(adminRoutesConfig.auth),
          },
          // Admin routes
          {
            element: (
              <ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            ),
            children: [...generateRoutes(adminRoutesConfig.dashboard)],
          },
          // Common routes
          ...generateRoutes(adminRoutesConfig.common),
        ],
      },
    ]);
  }, []);
};
