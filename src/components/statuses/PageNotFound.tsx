import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

interface PageNotFoundProps {
  className?: string;
  showIllustration?: boolean;
  customMessage?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
}

const PageNotFound: React.FC<PageNotFoundProps> = ({
  className = "",
  showIllustration = true,
  customMessage,
  showHomeButton = true,
  showBackButton = true,
}) => {
  return (
    <>
      <style>
        {`
          .page-not-found {
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
            color: #dc3545;
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

          .button-group {
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

          .button-outline {
            border: 1px solid #dee2e6;
            background-color: transparent;
            color: #212529;
          }

          .button-outline:hover {
            background-color: #f8f9fa;
            border-color: #adb5bd;
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

          .button-icon {
            margin-right: 0.5rem;
            height: 1rem;
            width: 1rem;
          }
        `}
      </style>

      <div className={`page-not-found ${className}`}>
        {showIllustration && (
          <div className="error-illustration">
            <div className="error-code">404</div>
            <FaExclamationTriangle className="error-icon" />
          </div>
        )}

        <h1 className="error-title">Page Not Found</h1>

        <p className="error-message">
          {customMessage ||
            "The page you're looking for doesn't exist or has been moved."}
        </p>

        <div className="button-group">
          {showBackButton && (
            <button
              className="button button-outline"
              onClick={() => window.history.back()}
            >
              <FaArrowLeft className="button-icon" />
              Go Back
            </button>
          )}

          {showHomeButton && (
            <Link to="/" className="button button-primary">
              <FaHome className="button-icon" />
              Return Home
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default PageNotFound;