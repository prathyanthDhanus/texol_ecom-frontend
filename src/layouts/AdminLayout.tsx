import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Sidebar from "../components/sidebar/Sidebar";
import AdminNavbar from "../components/navbar/AdminNavbar";
import RealTimeNotifications from "../components/notifications/RealTimeNotifications";
import { Customer_Path } from "../constants/customerPaths";
import { Admin_Path } from "../constants/adminPaths";
import "../App.css";

const AdminLayout: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);



  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to={`/auth/${Customer_Path.LOGIN}`} replace />;
  }

  // If user is not admin, redirect to customer home
  if (user && user.role?.toLowerCase() !== 'admin') {
    return <Navigate to={`/home/${Customer_Path.HOME}`} replace />;
  }

  // If user is admin, show admin layout
  if (user && user.role?.toLowerCase() === 'admin') {
    return (
      <div className="grid-container">
        <AdminNavbar OpenSidebar={OpenSidebar} />

        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <main className="main-container">
          <Outlet />
        </main>
        
        {/* Real-time notifications */}
        <RealTimeNotifications />
      </div>
    );
  }

  // Fallback - redirect to login
  return <Navigate to={`/auth/${Customer_Path.LOGIN}`} replace />;
};

export default AdminLayout;
