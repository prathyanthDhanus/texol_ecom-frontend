import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaSignInAlt, FaExclamationCircle } from "react-icons/fa";

interface UnauthorizedProps {
  className?: string;
  title?: string;
  description?: string;
  showLoginButton?: boolean;
  loginUrl?: string;
  showHomeButton?: boolean;
  customActions?: React.ReactNode;
}

const Unauthorized: React.FC<UnauthorizedProps> = ({
  className = "",
  title = "Unauthorized Access",
  description = "Please sign in to view this content.",
  showLoginButton = true,
  loginUrl = "/login",
  showHomeButton = true,
  customActions,
}) => {
  return (
    <>
      <style>
        {`
          .unauthorized-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: calc(100vh - 64px);
            padding: 3rem 1rem;
            text-align: center;
          }

          .error-illustration {
            position: relative;
            margin-bottom: 2rem;
          }

          .error-code {
            font-size: 6rem;
            font-weight: bold;
            color: rgba(0, 0, 0, 0.1);
          }

          .error-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 4rem;
            width: 4rem;
            color: #ffc107;
          }

          .error-title {
            font-size: 1.875rem;
            font-weight: bold;
            margin-bottom: 1rem;
          }

          .error-message {
            font-size: 1.125rem;
            color: #6c757d;
            margin-bottom: 2rem;
            max-width: 32rem;
          }

          .action-buttons {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
          }

          .button {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 0.5rem 1rem;
            border-radius: 0.25rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.2s ease;
          }

          .button-primary {
            background-color: #0d6efd;
            color: white;
            border: 1px solid #0d6efd;
          }

          .button-primary:hover {
            background-color: #0b5ed7;
            border-color: #0a58ca;
          }

          .button-outline {
            border: 1px solid #dee2e6;
            background-color: transparent;
            color: #212529;
          }

          .button-outline:hover {
            background-color: #f8f9fa;
            border-color: #adb5bd;
          }

          .button-icon {
            margin-right: 0.5rem;
            height: 1rem;
            width: 1rem;
          }

          .register-text {
            margin-top: 2rem;
            font-size: 0.875rem;
            color: #6c757d;
          }

          .register-link {
            color: #0d6efd;
            text-decoration: none;
          }

          .register-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className={`unauthorized-container ${className}`}>
        <div className="error-illustration">
          <div className="error-code">401</div>
          <FaExclamationCircle className="error-icon" />
        </div>

        <h1 className="error-title">{title}</h1>

        <p className="error-message">{description}</p>

        <div className="action-buttons">
          {showLoginButton && (
            <Link to={loginUrl} className="button button-primary">
              <FaSignInAlt className="button-icon" />
              Sign In
            </Link>
          )}

          {showHomeButton && (
            <Link to="/" className="button button-outline">
              <FaHome className="button-icon" />
              Return Home
            </Link>
          )}

          {customActions}
        </div>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </p>
      </div>
    </>
  );
};

export default Unauthorized;
