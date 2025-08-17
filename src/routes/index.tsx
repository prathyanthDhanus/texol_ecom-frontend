import { createBrowserRouter } from "react-router-dom";
import { useMemo } from "react";

import { adminRoutesConfig } from "./adminRoutes/AdminRoutes";
import { customerRoutesConfig } from "./customerRoutes/CustomerRoutes";
import { generateRoutes } from "../utils/routes/generateRoutes";
import RootLayout from "../layouts";
import AuthLayout from "../layouts/AuthLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import AdminLayout from "../layouts/AdminLayout";
import RootRedirect from "./RootRedirect";

export const useRouter = () => {
  return useMemo(() => {
    return createBrowserRouter([
      {
        element: <RootLayout />,
        children: [
          // Auth routes (login/register) - accessible when not authenticated
          {
            path: "/auth",
            element: <AuthLayout />,
            children: [
              ...generateRoutes(customerRoutesConfig.auth),
              ...generateRoutes(adminRoutesConfig.auth),
            ],
          },
          // Customer routes - accessible when authenticated as customer
          {
            path: "/home",
            element: <CustomerLayout />,
            children: generateRoutes(customerRoutesConfig.customer),
          },
          // Admin routes - accessible when authenticated as admin
          {
            path: "/admin",
            element: <AdminLayout />,
            children: generateRoutes(adminRoutesConfig.dashboard),
          },
          // Root route - redirects based on authentication and role
          {
            path: "/",
            element: <RootRedirect />,
          },
          // Common routes (404, etc.)
          ...generateRoutes(customerRoutesConfig.common),
          ...generateRoutes(adminRoutesConfig.common),
        ],
      },
    ]);
  }, []);
};
