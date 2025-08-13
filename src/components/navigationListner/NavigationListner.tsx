import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../store/store";
import {
  setActivePath,
  setSidebarActiveName,
} from "../../store/slices/navigationSlice";
import { sidebarStructure } from "../../components/sidebar/structure";

const findActiveName = (path: string): string => {
  // Flatten the sidebar structure to search all items
  const flattenItems = (items: any[]): any[] => {
    return items.reduce((acc, item) => {
      if (item.child) {
        return [...acc, item, ...flattenItems(item.child)];
      }
      return [...acc, item];
    }, []);
  };

  const allItems = flattenItems(sidebarStructure);
  const foundItem = allItems.find((item) => item.link === path);

  return foundItem?.name || "";
};

const NavigationListener = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setActivePath(location.pathname));
    const activeName = findActiveName(location.pathname);
    if (activeName) {
      dispatch(setSidebarActiveName(activeName));
    }
  }, [location.pathname, dispatch]);

  return null;
};

export default NavigationListener;
