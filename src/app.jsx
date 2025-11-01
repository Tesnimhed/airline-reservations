import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from './components/ui/toaster';
import AuthLayout from './layouts/AuthLayout';
import AppLayout from './layouts/AppLayout';
import AuthPage from './pages/AuthPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminFlights from './pages/AdminFlights';
import AdminReservations from './pages/AdminReservations';
import UserFlights from './pages/UserFlights';
import UserReservations from './pages/UserReservations';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import UsersManagement from './pages/AdminUsers';
import LandingPage from './pages/LandingPage';


const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route element={<AuthLayout />}>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
      </Route>
      
      {user?.role === 'admin' && (
        <Route path="/" element={<AppLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="/users" element={<UsersManagement />} />
          <Route path="flights" element={<AdminFlights />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}

      {user?.role === 'user' && (
        <Route path="/" element={<AppLayout />}>
          <Route index element={<UserFlights />} />
          <Route path="my-reservations" element={<UserReservations />} />
           <Route path="*" element={<Navigate to="/" />} />
        </Route>
      )}

      {/* Redirect to auth if no user */}
      <Route path="*" element={<Navigate to="/auth" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Helmet>
        <title>FlightManager Pro</title>
        <meta name="description" content="Application de gestion complète pour les réservations de vols et la gestion des passagers" />
      </Helmet>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  );
}

export default App;