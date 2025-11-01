import React from 'react';
import { useData } from '../contexts/DataContext';
import Dashboard from '../components/Dashboard';

const AdminDashboard = () => {
    const { flights, reservations } = useData();
    return <Dashboard flights={flights} reservations={reservations} />;
};

export default AdminDashboard;