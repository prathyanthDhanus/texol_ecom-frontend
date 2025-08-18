import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";

import LoginImage from "../../../assets/images/2151252489.jpg";
import LoginForm from "../../../components/forms/auth/login";
import useLoginForm from "../../../components/forms/auth/login/useLoginForm";
import { useAppDispatch } from "../../../store/store";
import { setAuthState, clearError } from "../../../store/slices/authSlice";
import { useLogin } from "../../../services/auth";
import { setToken, setRefreshToken, setUserData } from "../../../utils/auth/auth";
import type { LoginFormValues } from "../../../types/auth";
import { toastSuccess, toastError } from "../../../utils/toast/toast";
import "./Auth.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // React Query for API operations
  const {
    mutate: login,
    isPending: isApiLoading,
    error: loginError,
    data: loginData,
  } = useLogin();
  
  // Local loading state to handle the entire authentication process
  const [isLoading, setIsLoading] = useState(false); 
  

  // Login form submission function
  const handleSubmit = (values: LoginFormValues) => {
    
    // Set loading state to true
    setIsLoading(true);
    
    // Clear any existing tokens first to ensure we get fresh ones
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userData");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("userData");
    
    dispatch(clearError()); // Clear any previous Redux errors
    
    // Simplified approach - call the mutation directly
    login(values, {
      onSuccess: (data) => {
        // Store tokens immediately
        localStorage.setItem("authToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("userData", JSON.stringify(data.data.user));
        
        // Decode and verify the token
        try {
          const decoded = jwtDecode(data.data.accessToken);
          console.log("Decoded token payload:", decoded);
        } catch (error) {
          console.error("Error decoding token:", error);
        }
        
        // Update Redux state
        dispatch(setAuthState({
          token: data.data.accessToken,
          user: data.data.user,
          refreshToken: data.data.refreshToken,
        }));
        
        toastSuccess("Login successful!");
        
        // Navigate immediately
        if (data.data.user.role?.toLowerCase() === 'admin') {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      },
      onError: (error: any) => {
        console.error("=== LOGIN ERROR CALLBACK EXECUTED ===");
        console.error("Login API error:", error);
        toastError("Login failed. Please try again.");
        
        // Set loading state to false on error
        setIsLoading(false);
      },
    });
  };

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
            ⚠️ {(loginError as AxiosError<{ message: string }>)?.response?.data?.message || "Login failed. Please try again."}
          </div>
        )}
        {/* Login form */}
        <LoginForm formik={formik} isLoading={isLoading} />

        <div className="auth-footer">
          <span className="auth-footer-text">Don't have an account?</span>
          <Link to="/auth/admin/register" className="auth-footer-link">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
