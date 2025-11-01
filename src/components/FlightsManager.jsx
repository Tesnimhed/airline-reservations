import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Plane } from 'lucide-react';
import { Button } from './ui/button'; // ✅ corrigé
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'; // ✅ corrigé
import { Label } from './ui/label'; // ✅ corrigé
import { Input } from './ui/input'; // ✅ corrigé
import { useToast } from './ui/use-toast'; // ✅ corrigé
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog'; // ✅ corrigé

const FlightsManager = ({ flights, addFlight, updateFlight, deleteFlight }) => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [formData, setFormData] = useState({
    flightNumber: '',
    origin: '',
    destination: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    capacity: '',
    price: ''
  });

  const resetForm = () => {
    setFormData({
      flightNumber: '',
      origin: '',
      destination: '',
      departureDate: '',
      departureTime: '',
      arrivalDate: '',
      arrivalTime: '',
      capacity: '',
      price: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingFlight) {
      updateFlight(editingFlight.id, formData);
      toast({
        title: "✅ Vol modifié",
        description: "Le vol a été modifié avec succès",
      });
      setIsEditDialogOpen(false);
      setEditingFlight(null);
    } else {
      addFlight(formData);
      toast({
        title: "✅ Vol ajouté",
        description: "Le vol a été ajouté avec succès",
      });
      setIsAddDialogOpen(false);
    }
    
    resetForm();
  };

  const handleEdit = (flight) => {
    setEditingFlight(flight);
    setFormData(flight);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteFlight(id);
    toast({
      title: "🗑️ Vol supprimé",
      description: "Le vol a été supprimé avec succès",
    });
  };

  const FlightForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="flightNumber">Numéro de vol</Label>
          <Input
            id="flightNumber"
            value={formData.flightNumber}
            onChange={(e) => setFormData({ ...formData, flightNumber: e.target.value })}
            placeholder="AF123"
            required
          />
        </div>
        <div>
          <Label htmlFor="capacity">Capacité</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            placeholder="180"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="origin">Origine</Label>
          <Input
            id="origin"
            value={formData.origin}
            onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
            placeholder="Paris (CDG)"
            required
          />
        </div>
        <div>
          <Label htmlFor="destination">Destination</Label>
          <Input
            id="destination"
            value={formData.destination}
            onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
            placeholder="New York (JFK)"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="departureDate">Date de départ</Label>
          <Input
            id="departureDate"
            type="date"
            value={formData.departureDate}
            onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="departureTime">Heure de départ</Label>
          <Input
            id="departureTime"
            type="time"
            value={formData.departureTime}
            onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="arrivalDate">Date d'arrivée</Label>
          <Input
            id="arrivalDate"
            type="date"
            value={formData.arrivalDate}
            onChange={(e) => setFormData({ ...formData, arrivalDate: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="arrivalTime">Heure d'arrivée</Label>
          <Input
            id="arrivalTime"
            type="time"
            value={formData.arrivalTime}
            onChange={(e) => setFormData({ ...formData, arrivalTime: e.target.value })}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="price">Prix (€)</Label>
        <Input
          id="price"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="299"
          required
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
          {editingFlight ? 'Modifier' : 'Ajouter'}
        </Button>
      </div>
    </form>
  );

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Gestion des vols</h2>
          <p className="text-slate-600">Gérez tous vos vols disponibles</p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Nouveau vol
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau vol</DialogTitle>
            </DialogHeader>
            <FlightForm />
          </DialogContent>
        </Dialog>
      </div>

      {flights.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {flights.map((flight, index) => (
            <motion.div
              key={flight.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                    <Plane className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{flight.flightNumber}</h3>
                    <p className="text-sm text-slate-600">Capacité: {flight.capacity} passagers</p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(flight)}
                    className="hover:bg-blue-50 hover:text-blue-600"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                        <AlertDialogDescription>
                          Êtes-vous sûr de vouloir supprimer ce vol ? Cette action est irréversible.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(flight.id)} className="bg-red-600 hover:bg-red-700">
                          Supprimer
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-600">Départ</p>
                    <p className="font-semibold text-slate-900">{flight.origin}</p>
                    <p className="text-sm text-slate-600">
                      {new Date(flight.departureDate).toLocaleDateString('fr-FR')} à {flight.departureTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-slate-600">Arrivée</p>
                    <p className="font-semibold text-slate-900">{flight.destination}</p>
                    <p className="text-sm text-slate-600">
                      {new Date(flight.arrivalDate).toLocaleDateString('fr-FR')} à {flight.arrivalTime}
                    </p>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Prix par passager</span>
                    <span className="text-xl font-bold text-blue-600">{flight.price} €</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plane className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun vol disponible</h3>
          <p className="text-slate-600 mb-6">Commencez par ajouter votre premier vol</p>
        </div>
      )}

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le vol</DialogTitle>
          </DialogHeader>
          <FlightForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FlightsManager;