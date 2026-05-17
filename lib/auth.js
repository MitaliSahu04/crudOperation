import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const token = localStorage.getItem(
    "token"
  );

  if (!token) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    localStorage.removeItem("token");

    return null;
  }
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") {
    return false;
  }

  return !!localStorage.getItem("token");
};