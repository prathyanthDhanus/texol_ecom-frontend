import React, { memo, useMemo } from "react";

import ProtectedRoute from "../../routes/adminRoutes/ProtectedRoute";
import LazyRoute from "../lazyLoading/LazyRoute";

interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  protected?: boolean;
}

interface SimpleRoute {
  path: string;
  element: React.ReactNode;
}

interface RouteElementProps {
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  protected?: boolean;
}

const RouteElement: React.FC<RouteElementProps> = memo(
  ({ component, protected: isProtected }) => {
    const lazyElement = <LazyRoute component={component} />;

    return isProtected ? (
      <ProtectedRoute>{lazyElement}</ProtectedRoute>
    ) : (
      lazyElement
    );
  }
);

RouteElement.displayName = "RouteElement";

export const generateRoutes = (config: RouteConfig[]): SimpleRoute[] => {
  return config.map((route) => ({
    path: route.path,
    element: (
      <RouteElement component={route.component} protected={route.protected} />
    ),
  }));
};

export const useMemoizedRoutes = (config: RouteConfig[]): SimpleRoute[] => {
  return useMemo(() => generateRoutes(config), [config]);
};
