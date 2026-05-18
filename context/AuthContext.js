// frontend/context/AuthContext.js

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Create Context
const AuthContext = createContext();

// Provider Component
export const AuthProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(true);

  // Check User on Refresh
  useEffect(() => {
    const storedUser =
      localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // =========================
  // LOGIN FUNCTION
  // =========================
  const login = (data) => {
    // Save token in localStorage
    localStorage.setItem(
      'token',
      data.token
    );

    // Save user in localStorage
    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );

    // Save token in cookies
    document.cookie = `token=${data.token}; path=/`;

    // Update user state
    setUser(data.user);
  };

  // =========================
  // LOGOUT FUNCTION
  // =========================
  const logout = () => {
    // Remove localStorage data
    localStorage.removeItem('token');

    localStorage.removeItem('user');

    // Remove cookie
    document.cookie =
      'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';

    // Clear user state
    setUser(null);
  };

  // Return Provider
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () =>
  useContext(AuthContext);