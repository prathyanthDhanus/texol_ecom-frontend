import React, { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaShoppingCart,
  FaSearch,
  FaHome,
} from "react-icons/fa";

interface UserNavbarProps {
  cartItemCount?: number;
}

const UserNavbar: React.FC<UserNavbarProps> = ({ cartItemCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <style>
        {`
          .user-navbar {
            background-color: #ffffff;
            color: #333333;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem 2rem;
            height: 70px;
            position: sticky;
            top: 0;
            z-index: 1000;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .navbar-brand {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2c3e50;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .nav-links {
            display: flex;
            gap: 2rem;
            align-items: center;
          }

          .nav-link {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
            transition: color 0.3s;
            position: relative;
          }

          .nav-link:hover {
            color: #3498db;
          }

          .search-container {
            display: flex;
            align-items: center;
            background: #f5f7fa;
            border-radius: 20px;
            padding: 0.5rem 1rem;
          }

          .search-input {
            border: none;
            background: transparent;
            outline: none;
            padding: 0.3rem;
            width: 150px;
          }

          .cart-badge {
            position: absolute;
            top: -8px;
            right: -8px;
            background-color: #e74c3c;
            color: white;
            border-radius: 50%;
            width: 18px;
            height: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 0.7rem;
          }

          .mobile-menu-button {
            display: none;
            background: none;
            border: none;
            color: #2c3e50;
            font-size: 1.5rem;
            cursor: pointer;
          }

          .mobile-menu {
            display: none;
            position: fixed;
            top: 70px;
            left: 0;
            width: 100%;
            background-color: #ffffff;
            padding: 1rem;
            box-shadow: 0 5px 10px rgba(0,0,0,0.1);
          }

          .mobile-menu.open {
            display: block;
          }

          .mobile-nav-link {
            padding: 1rem 0;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-bottom: 1px solid #f1f1f1;
          }

          @media (max-width: 992px) {
            .search-container {
              display: none;
            }
          }

          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }

            .mobile-menu-button {
              display: block;
            }

            .user-navbar {
              padding: 1rem;
            }
          }
        `}
      </style>

      <nav className="user-navbar">
        <div className="navbar-brand">
          <FaHome size={20} />
          <span>ShopEase</span>
        </div>

        <div className="nav-links">
          <div className="search-container">
            <FaSearch color="#7f8c8d" />
            <input
              type="text"
              className="search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="nav-link">
            <FaUser />
            <span>Account</span>
          </div>

          <div className="nav-link">
            <FaShoppingCart />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
        </div>

        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
          <div className="mobile-nav-link">
            <FaSearch />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%",
              }}
            />
          </div>
          <div className="mobile-nav-link">
            <FaUser />
            <span>Account</span>
          </div>
          <div className="mobile-nav-link">
            <FaShoppingCart />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="cart-badge">{cartItemCount}</span>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default UserNavbar;
