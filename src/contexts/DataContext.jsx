import React, { createContext, useState, useContext, useEffect } from 'react';

const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [flights, setFlights] = useState([]);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const savedFlights = localStorage.getItem('flights');
    const savedReservations = localStorage.getItem('reservations');
    
    setFlights(savedFlights ? JSON.parse(savedFlights) : []);
    setReservations(savedReservations ? JSON.parse(savedReservations) : []);
  }, []);

  const updateAndStore = (setter, key) => (data) => {
    localStorage.setItem(key, JSON.stringify(data));
    setter(data);
  };

  const setStoredFlights = updateAndStore(setFlights, 'flights');
  const setStoredReservations = updateAndStore(setReservations, 'reservations');

  const addFlight = (flight) => {
    const newFlight = { ...flight, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setStoredFlights([...flights, newFlight]);
  };

  const updateFlight = (id, updatedFlight) => {
    setStoredFlights(flights.map(f => f.id === id ? { ...updatedFlight, id } : f));
  };

  const deleteFlight = (id) => {
    setStoredFlights(flights.filter(f => f.id !== id));
    setStoredReservations(reservations.filter(r => r.flightId !== id));
  };

  const addReservation = (reservation) => {
    const newReservation = { ...reservation, id: Date.now().toString(), createdAt: new Date().toISOString() };
    setStoredReservations([...reservations, newReservation]);
  };

  const updateReservation = (id, updatedReservation) => {
    setStoredReservations(reservations.map(r => r.id === id ? { ...updatedReservation, id } : r));
  };

  const deleteReservation = (id) => {
    setStoredReservations(reservations.filter(r => r.id !== id));
  };

  const value = { 
    flights, addFlight, updateFlight, deleteFlight,
    reservations, addReservation, updateReservation, deleteReservation
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  return useContext(DataContext);
};