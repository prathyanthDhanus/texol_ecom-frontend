import { lazy } from "react";
import { Customer_Path } from "../../constants/customerPaths";

export const lazyCustomerComponents = {
  //------------------ Common Components ----------------------
  PageNotFound: lazy(() => import("../../components/statuses/PageNotFound")),
  Unauthorized: lazy(() => import("../../components/statuses/Unauthorized")),
  Forbidden: lazy(() => import("../../components/statuses/Forbidden")),
  
  //------------------- Customer Components ----------------------
  CustomerHomePage: lazy(() => import("../../pages/user/CustomerHomePage")),
  CustomerProductsPage: lazy(() => import("../../pages/user/CustomerProductsPage")),
  CustomerProductDetailPage: lazy(() => import("../../pages/user/CustomerProductDetailPage")),
  CustomerCartPage: lazy(() => import("../../pages/user/CustomerCartPage")),
  CustomerCheckoutPage: lazy(() => import("../../pages/user/CustomerCheckoutPage")),
  CustomerOrdersPage: lazy(() => import("../../pages/user/CustomerOrdersPage")),
  CustomerOrderDetailPage: lazy(() => import("../../pages/user/CustomerOrderDetailPage")),
  
  //------------------- Auth Components ----------------------
  CustomerLoginPage: lazy(() => import("../../pages/user/CustomerLoginPage")),
  CustomerRegisterPage: lazy(() => import("../../pages/user/CustomerRegisterPage")),
};

// Route configuration interface
interface RouteConfig {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  protected?: boolean;
  customerProtected?: boolean;
}

// Grouped customer route configuration
export const customerRoutesConfig = {
  customer: [
    {
      path: Customer_Path.HOME,
      component: lazyCustomerComponents.CustomerHomePage,
    },
    {
      path: Customer_Path.PRODUCTS,
      component: lazyCustomerComponents.CustomerProductsPage,
    },
    {
      path: Customer_Path.PRODUCT_DETAIL,
      component: lazyCustomerComponents.CustomerProductDetailPage,
    },
    {
      path: Customer_Path.CART,
      component: lazyCustomerComponents.CustomerCartPage,
    },
    {
      path: Customer_Path.CHECKOUT,
      component: lazyCustomerComponents.CustomerCheckoutPage,
      customerProtected: true,
    },
    {
      path: Customer_Path.ORDERS,
      component: lazyCustomerComponents.CustomerOrdersPage,
      customerProtected: true,
    },
    {
      path: Customer_Path.ORDER_DETAIL,
      component: lazyCustomerComponents.CustomerOrderDetailPage,
      customerProtected: true,
    },
  ],

  common: [
    {
      path: Customer_Path.PAGE_NOT_FOUND,
      component: lazyCustomerComponents.PageNotFound,
    },
    {
      path: Customer_Path.NOT_FOUND,
      component: lazyCustomerComponents.PageNotFound,
    },
    {
      path: Customer_Path.UNAUTHORIZED,
      component: lazyCustomerComponents.Unauthorized,
    },
    {
      path: Customer_Path.FORBIDDEN,
      component: lazyCustomerComponents.Forbidden,
    },
  ],
  
  auth: [
    {
      path: Customer_Path.LOGIN,
      component: lazyCustomerComponents.CustomerLoginPage,
    },
    {
      path: Customer_Path.REGISTER,
      component: lazyCustomerComponents.CustomerRegisterPage,
    },
  ],
} satisfies {
  common: RouteConfig[];
  customer: RouteConfig[];
  auth: RouteConfig[];
};
