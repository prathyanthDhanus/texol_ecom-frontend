import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsListCheck,
  BsMenuButtonWideFill,
  BsFillGearFill,
} from "react-icons/bs";

export const sidebarStructure = [
  { name: "Dashboard", link: "/", icon: <BsGrid1X2Fill className="icon" /> },
  { name: "Products", link: "/products", icon: <BsFillArchiveFill className="icon" /> },
  { name: "Categories", link: "/category", icon: <BsFillGrid3X3GapFill className="icon" /> },
  { name: "Customers", link: "/customers", icon: <BsPeopleFill className="icon" /> },
  { name: "Orders", link: "/orders", icon: <BsPeopleFill className="icon" /> },
  { name: "Inventory", link: "/inventory", icon: <BsListCheck className="icon" /> },
  { name: "Reports", link: "/reports", icon: <BsMenuButtonWideFill className="icon" /> },
  { name: "Setting", link: "/settings", icon: <BsFillGearFill className="icon" /> },
];
