import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { DataProvider } from '../contexts/DataContext';

const AppLayout = () => {
  return (
    <DataProvider>
      <div className="flex h-screen bg-slate-50">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Header />
          <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
          </main>
        </div>
      </div>
    </DataProvider>
  );
};

export default AppLayout;