import React from 'react';
import { Outlet } from 'react-router-dom';
import { Plane } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-600 p-4">
      <div className="absolute top-8 left-8 flex items-center gap-3 text-white">
        <Plane className="w-8 h-8" />
        <h1 className="text-2xl font-bold">FlightManager Pro</h1>
      </div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;