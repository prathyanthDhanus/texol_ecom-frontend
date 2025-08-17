import React, { memo, useMemo } from "react";

import ProtectedRoute from "../../routes/adminRoutes/ProtectedRoute";
import CustomerProtectedRoute from "../../routes/customerRoutes/CustomerProtectedRoute";
import LazyRoute from "../lazyLoading/LazyRoute";

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  protected?: boolean;
  customerProtected?: boolean;
}

interface SimpleRoute {
  path: string;
  element: React.ReactNode;
}

interface RouteElementProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  protected?: boolean;
  customerProtected?: boolean;
}

const RouteElement: React.FC<RouteElementProps> = memo(
  ({ component, protected: isProtected, customerProtected }) => {
    const lazyElement = <LazyRoute component={component} />;

    if (isProtected) {
      return <ProtectedRoute>{lazyElement}</ProtectedRoute>;
    }

    if (customerProtected) {
      return <CustomerProtectedRoute>{lazyElement}</CustomerProtectedRoute>;
    }

    return lazyElement;
  }
);

RouteElement.displayName = "RouteElement";

export const generateRoutes = (config: RouteConfig[]): SimpleRoute[] => {
  return config.map((route) => ({
    path: route.path,
    element: (
      <RouteElement 
        component={route.component} 
        protected={route.protected}
        customerProtected={route.customerProtected}
      />
    ),
  }));
};

export const useMemoizedRoutes = (config: RouteConfig[]): SimpleRoute[] => {
  return useMemo(() => generateRoutes(config), [config]);
};
