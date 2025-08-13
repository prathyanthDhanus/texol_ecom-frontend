import { lazy } from "react";

import { Admin_Path } from "../../constants/adminPaths";

export const lazyComponents = {
  //------------------ Common Components ----------------------
  PageNotFound: lazy(() => import("../../components/statuses/PageNotFound")),
  Unauthorized: lazy(() => import("../../components/statuses/Unauthorized")),
  //------------------- Dashboard Components ----------------------
  Dashboard: lazy(() => import("../../pages/admin/dashboard/index")),
};

// Route configuration interface
interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  protected?: boolean;
  roles?: string[];
}

// Grouped admin route configuration
export const adminRoutesConfig = {
  dashboard: [
    //🎯
    {
      path: Admin_Path.HOME,
      component: lazyComponents.Dashboard,
      // protected: true,
      protected: false,
    },
  ],

  common: [
    //🎯
    {
      path: Admin_Path.PAGE_NOT_FOUND,
      component: lazyComponents.PageNotFound,
    },
    {
      path: Admin_Path.UNAUTHORIZED,
      component: lazyComponents.Unauthorized,
    },
  ],
} satisfies {
  common: RouteConfig[];
  dashboard: RouteConfig[];
};
