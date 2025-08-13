import React from "react";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaRegCopyright,
} from "react-icons/fa";

const AdminFooter: React.FC = () => {
  return (
    <>
      <style>
        {`
          .admin-footer {
            background-color: #2c3e50;
            color: white;
            padding: 2rem 1rem;
            margin-top: auto;
          }

          .footer-content {
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
          }

          .footer-section h3 {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            color: #3498db;
          }

          .footer-section p {
            margin: 0.5rem 0;
            line-height: 1.6;
          }

          .footer-links {
            list-style: none;
            padding: 0;
          }

          .footer-links li {
            margin-bottom: 0.5rem;
          }

          .footer-links a {
            color: #ecf0f1;
            text-decoration: none;
            transition: color 0.3s;
            display: flex;
            align-items: center;
            gap: 0.5rem;
          }

          .footer-links a:hover {
            color: #3498db;
          }

          .social-icons {
            display: flex;
            gap: 1rem;
            margin-top: 1rem;
          }

          .social-icons a {
            color: white;
            font-size: 1.5rem;
            transition: color 0.3s;
          }

          .social-icons a:hover {
            color: #3498db;
          }

          .footer-bottom {
            text-align: center;
            padding-top: 2rem;
            margin-top: 2rem;
            border-top: 1px solid #34495e;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          }

          @media (max-width: 768px) {
            .footer-content {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <footer className="admin-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Admin Panel</h3>
            <p>
              A powerful administration interface for managing your
              application's content, users, and settings with ease.
            </p>
            <div className="social-icons">
              <a href="#" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="#" aria-label="Twitter">
                <FaTwitter />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <a href="#">
                  <span>Dashboard</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>User Management</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Content Management</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Settings</span>
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Support</h3>
            <ul className="footer-links">
              <li>
                <a href="#">
                  <span>Documentation</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>API Reference</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Contact Us</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Feedback</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <FaRegCopyright />
          <span>
            {new Date().getFullYear()} Admin Panel. All rights reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default AdminFooter;
