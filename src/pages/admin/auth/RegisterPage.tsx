import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
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
    isPending: isLoading,
    isSuccess: registerSuccess,
    error: registerError,
    data: registerData,
  } = useRegister();

  // Register form submission function
  const handleSubmit = (values: RegisterFormValues) => {
    register(values, {
      onError: (error) => {
        toastError(error.message || "Registration failed. Please try again.");
      },
    });
  };

  useEffect(() => {
    if (registerSuccess && registerData) {
      toastSuccess(registerData.message || "Registration successful!");
      navigate("/login");
    }
  }, [registerSuccess, registerData, navigate]);

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
          <Link to="/login" className="auth-footer-link">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
