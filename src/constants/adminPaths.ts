export const Admin_Path = {
  //・・・・・・・・・・ Common paths ・・・・・・・・・・

  PAGE_NOT_FOUND: "*",
  NOT_FOUND: "/not-found",
  UNAUTHORIZED: "/unauthorized",
  FORBIDDEN: "/forbidden",

  //・・・・・・・・・・ Auth paths ・・・・・・・・・・

  LOGIN: "admin/login",
  REGISTER: "register",

  //・・・・・・・・・・ Dashboard paths ・・・・・・・・・・

  HOME: "",
  ADD_CATEGORY: "add/category",
  VIEW_CATEGORIES: "category",
  EDIT_CATEGORY: "edit/category/:id",
  ADD_PRODUCT: "add/product",
  EDIT_PRODUCT: "edit/product/:id",
  VIEW_PRODUCTS: "products",
  VIEW_ORDERS: "orders",
  ORDER_DETAIL: "orders/:orderId",
} as const;
