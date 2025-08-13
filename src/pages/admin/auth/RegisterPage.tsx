import { Link } from "react-router-dom";

import LoginImage from "../../../assets/images/2151252489.jpg";
import RegisterForm from "../../../components/forms/auth/register";
import useRegisterForm from "../../../components/forms/auth/register/useRegisterForm";
import "./Auth.css";

const RegisterPage = () => {
  const handleSubmit = (values: { email: string; password: string }) => {
    console.log("Login submitted:", values);
    // Add your login logic here
  };

  const formik = useRegisterForm(handleSubmit);

 const isLoading = false;
  return (
    <div className="auth-container">
      {/* Login image block */}
      <div className="auth-image-container">
        <img
          src={LoginImage}
          alt="auth background"
          className="auth-image"
        />
      </div>

      <div className="auth-form-container">
        <h1 className="auth-title">Login</h1>
        
        {/* Login form */}
        <RegisterForm formik={formik}  isLoading={isLoading}/>

        <div className="auth-footer">
          <span className="auth-footer-text">Already have an account?</span>
          <Link to="/login" className="auth-footer-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;