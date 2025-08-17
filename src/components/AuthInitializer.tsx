import { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../store/store';
import { initializeAuthFromStorage } from '../store/slices/authSlice';

const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(state => state.auth);
  const initialized = useRef(false);

  useEffect(() => {
    // Only initialize if not already authenticated and not already initialized
    if (!initialized.current && !isAuthenticated) {
    
      dispatch(initializeAuthFromStorage());
      initialized.current = true;
    }
  }, [dispatch, isAuthenticated]);

  return null; // This component doesn't render anything
};

export default AuthInitializer;
