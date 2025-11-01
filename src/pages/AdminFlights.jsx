import React from 'react';
import { useData } from '../contexts/DataContext';
import FlightsManager from '../components/FlightsManager';

const AdminFlights = () => {
    const { flights, addFlight, updateFlight, deleteFlight } = useData();
    return <FlightsManager flights={flights} addFlight={addFlight} updateFlight={updateFlight} deleteFlight={deleteFlight} />;
};

export default AdminFlights;