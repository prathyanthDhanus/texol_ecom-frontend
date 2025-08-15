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
  return (
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken")
  );
};

// ================== Remove token from both storages =====================

export const clearToken = (): void => {
  localStorage.removeItem("authToken");
  sessionStorage.removeItem("authToken");
  clearRefreshToken();
};
// ================== Set token to the appropriate storage =====================

export const setToken = (token: string, remember = false): void => {
  if (remember) {
    localStorage.setItem("authToken", token);
  } else {
    sessionStorage.setItem("authToken", token);
  }
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

    return {
      id: decoded.userId,
      email: decoded.email || "",
      username: decoded.username || "",
      role: decoded.role,
    };
  } catch (error) {
    console.error("Invalid token format", error);
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
