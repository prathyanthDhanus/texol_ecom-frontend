import React from "react";
import "./ButtonStyles.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;  
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = "primary", 
  fullWidth = false, 
  ...props 
}) => {
  return (
    <button 
      className={`button button-${variant} ${fullWidth ? 'button-full-width' : ''}`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;