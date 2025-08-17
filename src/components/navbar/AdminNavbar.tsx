import React from "react";
import {
  BsFillBellFill,

  BsSearch,
  BsJustify,
} from "react-icons/bs";
import { IoMdLogOut } from "react-icons/io";
import { clearToken } from "../../utils/auth/auth";
import { useAppDispatch } from "../../store/store";
import { logout } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
interface AdminNavbarProps {
  OpenSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ OpenSidebar }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      clearToken(); // Clear token from localStorage
      dispatch(logout()); // Update Redux state
      navigate("/auth/admin/login");
    }
  };

  return (
    <header className="header">
      <div className="menu-icon">
        <BsJustify className="icon" onClick={OpenSidebar} />
      </div>
      <div className="header-left">
        <BsSearch className="icon" />
      </div>
      <div className="header-right" style={{ cursor: "pointer" }}>
        <BsFillBellFill className="icon" />
     
        <IoMdLogOut className="icon" onClick={handleLogout} />
      </div>
    </header>
  );
};

export default AdminNavbar;
