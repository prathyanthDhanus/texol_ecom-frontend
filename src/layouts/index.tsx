import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavigationListener from "../components/navigationListner/NavigationListner";

const RootLayout = () => {
  return (
    <>
      <NavigationListener />
      <Toaster position="top-right" reverseOrder={false} />
      <Outlet />
    </>
  );
};
export default RootLayout;
