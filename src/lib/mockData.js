// src/lib/mockData.js

export const mockUsers = [
  {
    id: '1',
    name: 'Admin Principal',
    email: 'admin@example.com',
    role: 'admin'
  },
  {
    id: '2',
    name: 'Jean Dupont',
    email: 'jean@example.com',
    role: 'user'
  },
  {
    id: '3',
    name: 'Marie Lambert',
    email: 'marie@example.com',
    role: 'user'
  }
];

export const mockFlights = [
  {
    id: '1',
    flightNumber: 'AF123',
    origin: 'Paris (CDG)',
    destination: 'New York (JFK)',
    departureDate: '2025-12-01',
    departureTime: '10:00',
    arrivalDate: '2025-12-01',
    arrivalTime: '13:00',
    capacity: 180,
    price: 299
  },
  {
    id: '2',
    flightNumber: 'DL456',
    origin: 'Londres (LHR)',
    destination: 'Tokyo (HND)',
    departureDate: '2025-12-05',
    departureTime: '14:30',
    arrivalDate: '2025-12-06',
    arrivalTime: '08:45',
    capacity: 220,
    price: 899
  }
];

export const mockReservations = [
  {
    id: '101',
    userId: '2',
    flightId: '1',
    status: 'confirmed',
    passengers: [
      { firstName: 'Jean', lastName: 'Dupont', email: 'jean@example.com', phone: '0612345678' }
    ]
  },
  {
    id: '102',
    userId: '3',
    flightId: '2',
    status: 'pending',
    passengers: [
      { firstName: 'Marie', lastName: 'Lambert', email: 'marie@example.com', phone: '0787654321' }
    ]
  }
];