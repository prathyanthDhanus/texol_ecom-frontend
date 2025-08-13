import { Link } from "react-router-dom";

import LoginImage from "../../../assets/images/2151252489.jpg";
import LoginForm from "../../../components/forms/auth/login";
import useLoginForm from "../../../components/forms/auth/login/useLoginForm";
import "./Auth.css";

const LoginPage = () => {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Login submitted:", values);
    // Add your login logic here
  };

  const formik = useLoginForm(handleSubmit);
  const isLoading = false;

  return (
    <div className="auth-container">
      {/* Login image block */}
      <div className="auth-image-container">
        <img
          src={LoginImage}
          alt="Login background"
          className="auth-image"
        />
      </div>

      <div className="auth-form-container">
        <h1 className="auth-title">Login</h1>
        
        {/* Login form */}
        <LoginForm formik={formik} isLoading={isLoading} />

        <div className="auth-footer">
          <span className="auth-footer-text">Don't have an account?</span>
          <Link to="/register" className="auth-footer-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;