import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for a logged-in user in localStorage
    const storedUser = localStorage.getItem('flightManagerUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/auth');
    }
  }, [navigate]);

  const login = (userData) => {
    localStorage.setItem('flightManagerUser', JSON.stringify(userData));
    setUser(userData);
    if (userData.role === 'admin') {
      navigate('/');
    } else {
      navigate('/');
    }
  };

  const logout = () => {
    localStorage.removeItem('flightManagerUser');
    setUser(null);
    navigate('/auth');
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};