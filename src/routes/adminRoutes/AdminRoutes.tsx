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
  AddProduct: lazy(() => import("../../pages/admin/product/AddProduct")),
  ViewProducts: lazy(() => import("../../pages/admin/product/ViewProduct")),
  EditProduct: lazy(() => import("../../pages/admin/product/EditProduct")),
  ViewOrders: lazy(() => import("../../pages/admin/order/ViewOrders")),
  OrderDetail: lazy(() => import("../../pages/admin/order/OrderDetail")),
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
      roles: ["admin"],
    },
    {
      path: Admin_Path.ADD_CATEGORY,
      component: lazyComponents.AddCategory,
      protected: true,
      roles: ["admin"],
    },
    {
      path: Admin_Path.VIEW_CATEGORIES,
      component: lazyComponents.ViewCategories,
      protected: true,
      roles: ["admin"],
    },
    {
      path: Admin_Path.EDIT_CATEGORY,
      component: lazyComponents.EditCategory,
      protected: true,
      roles: ["admin"],
    },
    {
      path: Admin_Path.ADD_PRODUCT,
      component: lazyComponents.AddProduct,
      protected: true,
      roles: ["admin"],
    },
    {
      path: Admin_Path.EDIT_PRODUCT,
      component: lazyComponents.EditProduct,
      protected: true,
      roles: ["admin"],
    },
    {
      path: Admin_Path.VIEW_PRODUCTS,
      component: lazyComponents.ViewProducts,
      protected: true,
      roles: ["admin"],
    },
    {
      path: Admin_Path.ORDER_DETAIL,
      component: lazyComponents.OrderDetail,
      protected: true,
      roles: ["admin"],
    },
    {
      path: Admin_Path.VIEW_ORDERS,
      component: lazyComponents.ViewOrders,
      protected: true,
      roles: ["admin"],
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
