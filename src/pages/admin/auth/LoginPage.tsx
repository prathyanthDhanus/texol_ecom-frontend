import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { AxiosError } from "axios";

import LoginImage from "../../../assets/images/2151252489.jpg";
import LoginForm from "../../../components/forms/auth/login";
import useLoginForm from "../../../components/forms/auth/login/useLoginForm";
import { useLogin } from "../../../services/auth";
import { setRefreshToken, setToken } from "../../../utils/auth/auth";
import type { LoginFormValues } from "../../../types/auth";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import "./Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  // Login api hook
  const {
    mutate: login,
    isPending: isLoading,
    isSuccess: loginSuccess,
    error: loginError,
    data: loginData,
  } = useLogin();

  // Login form submission function
  const handleSubmit = (values: LoginFormValues) => {
    login(values, {
      onError: (error: any) => {
        toastError(error?.message || "Login failed. Please try again.");
      },
    });
  };

  useEffect(() => {
    if (loginSuccess && loginData) {
      setToken(loginData.data.accessToken, true);
      setRefreshToken(loginData.data.refreshToken, true);
      toastSuccess(loginData.message || "Login successful!");
      navigate("/");
    }
  }, [loginSuccess, loginData, navigate]);

  const formik = useLoginForm(handleSubmit);

  return (
    <div className="auth-container">
      {/* Login image block */}
      <div className="auth-image-container">
        <img src={LoginImage} alt="Login background" className="auth-image" />
      </div>

      <div className="auth-form-container">
        <h1 className="auth-title">Login</h1>

        {loginError && (
          <div
            className="auth-error-message"
            style={{ color: "red", marginBottom: "1rem" }}
          >
            ⚠️{" "}
            {(loginError as AxiosError<{ message: string }>)?.response?.data
              ?.message || "Login failed. Please try again."}
          </div>
        )}
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
