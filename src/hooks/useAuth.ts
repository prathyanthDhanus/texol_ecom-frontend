import { useAppSelector, useAppDispatch } from "../store/store";
import { logout as logoutAction } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  // Debug logging to track auth state changes


  const logout = () => {
    dispatch(logoutAction());
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
  };
};
