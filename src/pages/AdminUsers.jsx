import React from 'react';
import UsersManager from '../components/UsersManager';
import { mockFlights, mockReservations, mockUsers } from '../lib/mockData';

const UsersManagement = () => {
  const handleDeleteUser = (id) => {
    // Dans le mock, on ne peut pas vraiment supprimer, mais tu pourras le connecter au backend plus tard
    console.log('Supprimer utilisateur ID:', id);
  };

  return (
    <UsersManager
      users={mockUsers}
      reservations={mockReservations}
      flights={mockFlights}
      deleteUser={handleDeleteUser}
    />
  );
};

export default UsersManagement;