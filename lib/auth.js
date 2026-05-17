import { jwtDecode } from "jwt-decode";

export const getUser = () => {
  if (typeof window === "undefined")
    return null;

  const token = localStorage.getItem("token");

  if (!token) return null;

  try {
    return jwtDecode(token);
  } catch (error) {
    return null;
  }
};