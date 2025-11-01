import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, Wallet, Search } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { Helmet } from 'react-helmet';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { useAuth } from '../contexts/AuthContext';

const UserFlights = () => {
  const { flights: allFlights, addReservation } = useData();
  const { user } = useAuth();
  const { toast } = useToast();

  // État des filtres
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    departureDate: '',
    maxPrice: ''
  });

  // État du formulaire de réservation
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [passengerData, setPassengerData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  // Appliquer les filtres
  const filteredFlights = useMemo(() => {
    return allFlights.filter(flight => {
      const matchesOrigin = !filters.origin || 
        flight.origin.toLowerCase().includes(filters.origin.toLowerCase());
      
      const matchesDestination = !filters.destination || 
        flight.destination.toLowerCase().includes(filters.destination.toLowerCase());
      
      const matchesDate = !filters.departureDate || 
        flight.departureDate >= filters.departureDate;
      
      const matchesPrice = !filters.maxPrice || 
        parseFloat(flight.price) <= parseFloat(filters.maxPrice);

      return matchesOrigin && matchesDestination && matchesDate && matchesPrice;
    });
  }, [allFlights, filters]);

  const handleBooking = (flight) => {
    setSelectedFlight(flight);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newReservation = {
      id: Date.now().toString(),
      flightId: selectedFlight.id,
      userId: user.id,
      passengers: [{ ...passengerData }],
      status: 'pending'
    };

    addReservation(newReservation);
    toast({
      title: "✅ Réservation créée",
      description: "Votre réservation est en attente de confirmation.",
    });
    setIsDialogOpen(false);
    setPassengerData({ firstName: '', lastName: '', email: '', phone: '' });
  };

  const updateFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div>
      <Helmet>
        <title>Vols Disponibles - FlightManager Pro</title>
        <meta name="description" content="Consultez et réservez des vols." />
      </Helmet>

      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Vols Disponibles</h2>
        <p className="text-slate-600">Trouvez votre prochaine destination.</p>
      </div>

      {/* Zone de filtres */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6">
        <div className="flex flex-col md:flex-row gap-4 flex-wrap">
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="origin" className="text-sm text-slate-600">Origine</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="origin"
                placeholder="Ex: Paris, CDG..."
                className="pl-10"
                value={filters.origin}
                onChange={(e) => updateFilter('origin', e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="destination" className="text-sm text-slate-600">Destination</Label>
            <div className="relative mt-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                id="destination"
                placeholder="Ex: New York, JFK..."
                className="pl-10"
                value={filters.destination}
                onChange={(e) => updateFilter('destination', e.target.value)}
              />
            </div>
          </div>

          <div className="flex-1 min-w-[180px]">
            <Label htmlFor="departureDate" className="text-sm text-slate-600">Départ à partir du</Label>
            <Input
              id="departureDate"
              type="date"
              className="mt-1"
              value={filters.departureDate}
              onChange={(e) => updateFilter('departureDate', e.target.value)}
            />
          </div>

          <div className="flex-1 min-w-[150px]">
            <Label htmlFor="maxPrice" className="text-sm text-slate-600">Prix max (€)</Label>
            <Input
              id="maxPrice"
              type="number"
              placeholder="Ex: 500"
              className="mt-1"
              value={filters.maxPrice}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Liste des vols */}
      {filteredFlights.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredFlights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{flight.flightNumber}</h3>
                    <p className="text-sm text-slate-600">{flight.origin} → {flight.destination}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Départ</span>
                    <span className="font-medium">{new Date(flight.departureDate).toLocaleDateString('fr-FR')} à {flight.departureTime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 flex items-center gap-2"><Calendar className="w-4 h-4" /> Arrivée</span>
                    <span className="font-medium">{new Date(flight.arrivalDate).toLocaleDateString('fr-FR')} à {flight.arrivalTime}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t mt-2">
                    <span className="text-slate-500 flex items-center gap-2"><Wallet className="w-4 h-4" /> Prix</span>
                    <span className="font-bold text-lg text-blue-600">{flight.price} €</span>
                  </div>
                </div>
              </div>
              
              <Button 
                onClick={() => handleBooking(flight)} 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
              >
                Réserver ce vol
              </Button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun vol trouvé</h3>
          <p className="text-slate-600">Aucun vol ne correspond à vos critères.</p>
        </div>
      )}

      {/* Formulaire de réservation */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Réserver ce vol</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">Prénom</Label>
                <Input
                  id="firstName"
                  value={passengerData.firstName}
                  onChange={(e) => setPassengerData({ ...passengerData, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nom</Label>
                <Input
                  id="lastName"
                  value={passengerData.lastName}
                  onChange={(e) => setPassengerData({ ...passengerData, lastName: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={passengerData.email}
                  onChange={(e) => setPassengerData({ ...passengerData, email: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={passengerData.phone}
                  onChange={(e) => setPassengerData({ ...passengerData, phone: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Confirmer
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserFlights;