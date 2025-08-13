import { jwtDecode } from "jwt-decode";

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
};

// ================== Set token to the appropriate storage =====================

export const setToken = (token: string, remember = false): void => {
  if (remember) {
    localStorage.setItem("authToken", token);
  } else {
    sessionStorage.setItem("authToken", token);
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
