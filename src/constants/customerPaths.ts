export const Customer_Path = {
  //・・・・・・・・・・ Common paths ・・・・・・・・・・
  PAGE_NOT_FOUND: "*",
  NOT_FOUND: "/not-found",
  UNAUTHORIZED: "/unauthorized",
  FORBIDDEN: "/forbidden",

  //・・・・・・・・・・ Auth paths ・・・・・・・・・・
  LOGIN: "login",
  REGISTER: "register",

  //・・・・・・・・・・ Customer paths ・・・・・・・・・・
  HOME: "",
  PRODUCTS: "products",
  PRODUCT_DETAIL: "product/:id",
  CART: "cart",
  CHECKOUT: "checkout",
  ORDERS: "orders",
  ORDER_DETAIL: "order/:orderId",
} as const;
