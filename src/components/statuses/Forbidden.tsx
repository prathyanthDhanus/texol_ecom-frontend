import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaLock, FaEnvelope } from "react-icons/fa";

interface ForbiddenProps {
  className?: string;
  title?: string;
  description?: string;
  showContact?: boolean;
  contactEmail?: string;
  showHomeButton?: boolean;
  customActions?: React.ReactNode;
}

const Forbidden: React.FC<ForbiddenProps> = ({
  className = "",
  title = "Access Denied",
  description = "You don't have permission to view this page.",
  showContact = true,
  contactEmail = "support@yourdomain.com",
  showHomeButton = true,
  customActions,
}) => {
  return (
    <>
      <style>
        {`
          .forbidden-container {
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

          .contact-text {
            margin-top: 2rem;
            font-size: 0.875rem;
            color: #6c757d;
          }

          .contact-link {
            color: #0d6efd;
            text-decoration: none;
          }

          .contact-link:hover {
            text-decoration: underline;
          }
        `}
      </style>

      <div className={`forbidden-container ${className}`}>
        <div className="error-illustration">
          <div className="error-code">403</div>
          <FaLock className="error-icon" />
        </div>

        <h1 className="error-title">{title}</h1>

        <p className="error-message">{description}</p>

        <div className="action-buttons">
          {showHomeButton && (
            <Link to="/" className="button button-primary">
              <FaHome className="button-icon" />
              Return Home
            </Link>
          )}

          {showContact && (
            <a
              href={`mailto:${contactEmail}`}
              className="button button-outline"
            >
              <FaEnvelope className="button-icon" />
              Contact Support
            </a>
          )}

          {customActions}
        </div>

        {showContact && (
          <p className="contact-text">
            Need access? Contact{" "}
            <a href={`mailto:${contactEmail}`} className="contact-link">
              {contactEmail}
            </a>
          </p>
        )}
      </div>
    </>
  );
};

export default Forbidden;
