import { lazy } from "react";

import { Admin_Path } from "../../constants/adminPaths";

export const lazyComponents = {
  //------------------ Common Components ----------------------
  PageNotFound: lazy(() => import("../../components/statuses/PageNotFound")),
  Unauthorized: lazy(() => import("../../components/statuses/Unauthorized")),
  Forbidden: lazy(() => import("../../components/statuses/Forbidden")),
  //------------------- Dashboard Components ----------------------
  Dashboard: lazy(() => import("../../pages/admin/dashboard/index")),
  AddCategory: lazy(() => import("../../pages/admin/category/AddCategory")),
  ViewCategories: lazy(
    () => import("../../pages/admin/category/ViewCategories")
  ),
  EditCategory: lazy(() => import("../../pages/admin/category/EditCategory")),
  //------------------- Auth Components ----------------------
  Login: lazy(() => import("../../pages/admin/auth/LoginPage")),
  Register: lazy(() => import("../../pages/admin/auth/RegisterPage")),
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
      protected: true,
      // protected: false,
    },
    {
      path: Admin_Path.ADD_CATEGORY,
      component: lazyComponents.AddCategory,
      protected: true,
      // protected: false,
    },
    {
      path: Admin_Path.VIEW_CATEGORIES,
      component: lazyComponents.ViewCategories,
      protected: true,
      // protected: false,
    },
    {
      path: Admin_Path.EDIT_CATEGORY,
      component: lazyComponents.EditCategory,
      protected: true,
      // protected: false,
    },
  ],

  common: [
    //🎯
    {
      path: Admin_Path.PAGE_NOT_FOUND,
      component: lazyComponents.PageNotFound,
    },
    {
      path: Admin_Path.NOT_FOUND, // Display the "Not Found" page from the Axios interceptor
      component: lazyComponents.PageNotFound,
    },
    {
      path: Admin_Path.UNAUTHORIZED,
      component: lazyComponents.Unauthorized,
    },
    {
      path: Admin_Path.FORBIDDEN,
      component: lazyComponents.Forbidden,
    },
  ],
  auth: [
    //🎯
    {
      path: Admin_Path.LOGIN,
      component: lazyComponents.Login,
    },
    {
      path: Admin_Path.REGISTER,
      component: lazyComponents.Register,
    },
  ],
} satisfies {
  common: RouteConfig[];
  dashboard: RouteConfig[];
  auth: RouteConfig[];
};
