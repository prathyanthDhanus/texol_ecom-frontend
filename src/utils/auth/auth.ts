import { jwtDecode } from "jwt-decode";
import type { User } from "../../types/auth";
export interface TokenPayload {
  userId?: string;
  role?: string;
  email?: string;
  username?: string;
  exp?: number;
}
// ================== Get token from local or session storage =====================

export const getToken = (): string | null => {
  const localToken = localStorage.getItem("authToken");
  const sessionToken = sessionStorage.getItem("authToken");
  const token = localToken || sessionToken;
  

  
  if (token) {
    try {
      const decoded = jwtDecode(token);
          // Token decoded successfully
  } catch (error) {
    // Error decoding token
    }
  }
  
  return token;
};

// ================== Remove token from both storages =====================

export const clearToken = (): void => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  localStorage.removeItem("userData");
  sessionStorage.removeItem("userData");
  clearRefreshToken();
};
// ================== Set token to the appropriate storage =====================

export const setToken = (token: string, remember = true): void => {
  
  try {
    if (remember) {
      localStorage.setItem("authToken", token);
      
      // Verify storage
      const stored = localStorage.getItem("authToken");
    } else {
      sessionStorage.setItem("authToken", token);
      
      // Verify storage
      const stored = sessionStorage.getItem("authToken");
    }
  } catch (error) {
    throw error;
  }
};

// ================== Set user data to storage =====================

export const setUserData = (user: any, remember = true): void => {
  
  try {
    const userData = JSON.stringify(user);
    if (remember) {
      localStorage.setItem("userData", userData);
    } else {
      sessionStorage.setItem("userData", userData);
    }
  } catch (error) {
    throw error;
  }
};

// ================== Get user data from storage =====================

export const getUserData = (): any => {
  const localUserData = localStorage.getItem("userData");
  const sessionUserData = sessionStorage.getItem("userData");
  const userData = localUserData || sessionUserData;
  
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (error) {
      return null;
    }
  }
  
  return null;
};
// ================== Get user from token =====================
export const getUserFromToken = (): User | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);

    if (!decoded.userId || !decoded.role) {
      return null;
    }

    // JWT token only contains userId and role, not email/username
    // We need to get user details from the login response
    const user: User = {
      _id: decoded.userId,
      email: "", // JWT token doesn't contain email
      username: "", // JWT token doesn't contain username
      role: decoded.role,
    };
    
    return user;
  } catch (error) {
    return null;
  }
};

// ================== Get role from the token =====================

export interface TokenPayload {
  role?: string;
  exp?: number;
}

export const getRoleFromToken = (): string | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    return decoded?.role || null;
  } catch (error) {
    console.error("Invalid token format", error);
    return null;
  }
};

// ================== Check if the token is expired  =====================

export const isTokenExpired = (): boolean => {
  const token = getToken();
  if (!token) return true;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    if (!decoded?.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    console.error("error:", error);
    return true;
  }
};

// ================== Get refresh token from the storage =====================
export const getRefreshToken = (): string | null => {
  return (
    localStorage.getItem("refreshToken") ||
    sessionStorage.getItem("refreshToken")
  );
};

// ================== Set refresh token to the storage =====================
export const setRefreshToken = (token: string, remember = false): void => {
  if (remember) {
    localStorage.setItem("refreshToken", token);
  } else {
    sessionStorage.setItem("refreshToken", token);
  }
};
// ================== Delete refresh token from the storage =====================
export const clearRefreshToken = (): void => {
  localStorage.removeItem("refreshToken");
  sessionStorage.removeItem("refreshToken");
};
