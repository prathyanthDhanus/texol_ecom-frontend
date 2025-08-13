import React from "react";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../store/store";
import { sidebarStructure } from "./structure";

interface SidebarProps {
  openSidebarToggle: boolean;
  OpenSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ openSidebarToggle, OpenSidebar }) => {
  const activePath = useAppSelector((state) => state.navigation.activePath);

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
          {/* Example: first icon from structure */}
          {sidebarStructure[0].icon} SHOP
        </div>
        <span className="icon close_icon" onClick={OpenSidebar}>
          X
        </span>
      </div>

      <ul className="sidebar-list">
        {sidebarStructure.map((item) => (
          <li
            key={item.name}
            className={`sidebar-list-item ${activePath === item.link ? "active" : ""}`}
          >
            <NavLink to={item.link}>
              {item.icon} {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
