import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import { setAuthState, clearError } from "../../store/slices/authSlice";
import { useLogin } from "../../services/auth";
import { setToken, setRefreshToken, setUserData } from "../../utils/auth/auth";
import { Customer_Path } from "../../constants/customerPaths";
import { toastSuccess, toastError } from "../../utils/toast/toast";
import styles from "./CustomerLoginPage.module.css";

interface LoginFormData {
  email: string;
  password: string;
}

const CustomerLoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  // React Query for API operations
  const {
    mutate: login,
    isPending: isApiLoading,
    error: loginError,
  } = useLogin();
  
  // Local loading state to handle the entire authentication process
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginFormData> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Set loading state to true
    setIsLoading(true);

    dispatch(clearError()); // Clear any previous Redux errors
    
    login(formData, {
      onSuccess: (data) => {

        
        // Store tokens and user data in localStorage
        setToken(data.data.accessToken, true);
        setRefreshToken(data.data.refreshToken, true);
        setUserData(data.data.user, true);
        

        
        // Update Redux state with the API response
        dispatch(setAuthState({
          token: data.data.accessToken,
          user: data.data.user,
          refreshToken: data.data.refreshToken,
        }));
        
        toastSuccess(data.message || "Login successful!");
        navigate(`/home/${Customer_Path.HOME}`);
      },
      onError: (error: any) => {
        console.error("Login API error:", error);
        const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
        setErrors({
          email: errorMessage,
        });
        toastError(errorMessage);
        
        // Set loading state to false on error
        setIsLoading(false);
      },
    });
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1 className={styles.loginTitle}>Welcome Back</h1>
          <p className={styles.loginSubtitle}>Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.email ? styles.error : ""}`}
              placeholder="Enter your email"
              disabled={isLoading}
            />
            {errors.email && (
              <span className={styles.errorMessage}>{errors.email}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`${styles.input} ${errors.password ? styles.error : ""}`}
              placeholder="Enter your password"
              disabled={isLoading}
            />
            {errors.password && (
              <span className={styles.errorMessage}>{errors.password}</span>
            )}
          </div>

          <button
            type="submit"
            className={styles.submitBtn}
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className={styles.loginFooter}>
          <p className={styles.registerText}>
            Don't have an account?{" "}
                         <Link to={`/auth/${Customer_Path.REGISTER}`} className={styles.registerLink}>
               Sign up here
             </Link>
             
          </p>
            <Link to="/auth/admin/login" style={{fontSize:"0.7rem"}}>
           Admin login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CustomerLoginPage;
