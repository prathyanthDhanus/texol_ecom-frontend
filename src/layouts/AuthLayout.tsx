import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout">
      <div className="auth-content">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;


const styles = `
.auth-layout {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f1f5f9; /* slate-100 equivalent */
  padding: 1rem;
}

.auth-content {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 2rem;
  width: 100%;
  max-width: 400px;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .auth-content {
    padding: 1.5rem;
    max-width: 90%;
  }
}
`;

// Append style to document head once
if (typeof document !== "undefined") {
  const styleTag = document.createElement("style");
  styleTag.innerHTML = styles;
  document.head.appendChild(styleTag);
}
