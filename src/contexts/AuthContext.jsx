// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🔥 MOCK : Simule un utilisateur admin connecté
  const [user, setUser] = useState({
    id: '1',
    name: 'Admin Utilisateur',
    email: 'admin@example.com',
    role: 'admin' // ou 'user' si tu veux tester le mode client
  });

  const logout = () => {
    setUser(null);
    // navigate('/auth');
  };

  // Optionnel : rediriger si pas connecté (pas nécessaire en mode mock)
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (!user && !window.location.pathname.startsWith('/auth')) {
  //     navigate('/auth');
  //   }
  // }, [user, navigate]);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};