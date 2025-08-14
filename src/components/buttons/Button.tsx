import React from "react";
import "./ButtonStyles.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  fullWidth?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  fullWidth = false,
  loading = false,
  icon,
  className = "",
  ...props 
}) => {
  return (
    <button 
      className={`button button-${variant} ${fullWidth ? 'button-full-width' : ''} ${className}`} 
      disabled={loading || props.disabled}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
      {loading && <span className="button-loading" />}
    </button>
  );
};

export default Button;