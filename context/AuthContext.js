// frontend/context/AuthContext.js

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // User State
  const [user, setUser] = useState(null);

  // Loading State
  const [loading, setLoading] = useState(true);

  // Check User on Page Refresh
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // Login Function
  const login = (data) => {
    // Save Token
    localStorage.setItem('token', data.token);

    // Save User
    localStorage.setItem(
      'user',
      JSON.stringify(data.user)
    );

    // Update State
    setUser(data.user);
  };

  // Logout Function
  const logout = () => {
    // Remove Data
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Clear State
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook
export const useAuth = () => useContext(AuthContext);