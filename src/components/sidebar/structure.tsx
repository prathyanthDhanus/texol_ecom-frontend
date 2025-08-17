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
  { name: "Dashboard", link: "/admin", icon: <BsGrid1X2Fill className="icon" /> },
  { name: "Products", link: "/admin/products", icon: <BsFillArchiveFill className="icon" /> },
  { name: "Categories", link: "/admin/category", icon: <BsFillGrid3X3GapFill className="icon" /> },
  { name: "Orders", link: "/admin/orders", icon: <BsPeopleFill className="icon" /> },
  { name: "Add Product", link: "/admin/add/product", icon: <BsFillArchiveFill className="icon" /> },
  { name: "Add Category", link: "/admin/add/category", icon: <BsFillGrid3X3GapFill className="icon" /> },
];
