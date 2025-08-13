import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";
import AdminNavbar from "../components/navbar/AdminNavbar";
import AdminFooter from "../components/footer/Admin.Footer";
import "../App.css"
const AdminLayout: React.FC = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };
  return (
    <>
      <div className="grid-container">
        <AdminNavbar OpenSidebar={OpenSidebar} />
        <Sidebar
          openSidebarToggle={openSidebarToggle}
          OpenSidebar={OpenSidebar}
        />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
