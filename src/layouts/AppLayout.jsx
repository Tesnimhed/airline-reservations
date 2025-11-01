// src/layouts/AppLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { DataProvider } from '../contexts/DataContext';

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <DataProvider>
      <div className="flex h-screen bg-slate-50">
        {/* Overlay mobile */}
        <div
          className={`${!isSidebarOpen ? 'hidden' : 'block'} fixed inset-0 z-40 bg-black/40 lg:hidden`}
          onClick={() => setIsSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen ? 'w-64' : 'w-20'
          } transition-all duration-300 ease-in-out h-full bg-white border-r border-slate-200 flex flex-col shrink-0 z-50 lg:z-auto lg:static`}
        >
          <Sidebar isOpen={isSidebarOpen} />
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col flex-1">
          <Header toggleSidebar={toggleSidebar} />
          <main className="flex-1 overflow-y-auto p-4 md:p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default AppLayout;