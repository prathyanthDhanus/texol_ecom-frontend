import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";

import LoginImage from "../../../assets/images/2151252489.jpg";
import RegisterForm from "../../../components/forms/auth/register";
import useRegisterForm from "../../../components/forms/auth/register/useRegisterForm";
import { useRegister } from "../../../services/auth";
import type { RegisterFormValues } from "../../../types/auth";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import "./Auth.css";

const RegisterPage = () => {
  const navigate = useNavigate();
  // Register api hook
  const {
    mutate: register,
    isPending: isApiLoading,
    isSuccess: registerSuccess,
    error: registerError,
    data: registerData,
  } = useRegister();
  
  // Local loading state to handle the entire registration process
  const [isLoading, setIsLoading] = useState(false);

  // Register form submission function
  const handleSubmit = (values: RegisterFormValues) => {
    // Set loading state to true
    setIsLoading(true);
    
    register(values, {
      onSuccess: (data) => {
        toastSuccess(data.message || "Registration successful!");
        navigate("/login");
      },
      onError: (error) => {
        toastError(error.message || "Registration failed. Please try again.");
        // Set loading state to false on error
        setIsLoading(false);
      },
    });
  };  



  const formik = useRegisterForm(handleSubmit);

  return (
    <div className="auth-container">
      {/* Login image block */}
      <div className="auth-image-container">
        <img src={LoginImage} alt="auth background" className="auth-image" />
      </div>

      <div className="auth-form-container">
        <h1 className="auth-title">Register</h1>
        {registerError && (
          <div
            className="auth-error-message"
            style={{ color: "red", marginBottom: "1rem" }}
          >
            ⚠️{" "}
            {(registerError as AxiosError<{ message: string }>)?.response?.data
              ?.message || "Registration failed. Please try again."}
          </div>
        )}
        {/* Login form */}
        <RegisterForm formik={formik} isLoading={isLoading} />

        <div className="auth-footer">
          <span className="auth-footer-text">Already have an account?</span>
          <Link to="/auth/admin/login" className="auth-footer-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
