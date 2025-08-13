import { Outlet } from "react-router-dom";
import "./style/AuthStyles.css"

const AuthLayout = () => {
  return (
    <div className="auth-layout">
   
        <Outlet />
 
    </div>
  );
};

export default AuthLayout;