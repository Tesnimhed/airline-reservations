import React from 'react';
import { useData } from '../contexts/DataContext';
import ReservationsManager from '../components/ReservationsManager';

const AdminReservations = () => {
    const { flights, reservations, addReservation, updateReservation, deleteReservation } = useData();
    return (
        <ReservationsManager 
            flights={flights}
            reservations={reservations}
            addReservation={addReservation}
            updateReservation={updateReservation}
            deleteReservation={deleteReservation}
        />
    );
};

export default AdminReservations;