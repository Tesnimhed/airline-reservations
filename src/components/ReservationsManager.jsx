import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Calendar, User } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { useToast } from './ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';
import { useAuth } from '../contexts/AuthContext';

const ReservationsManager = ({ flights, reservations, addReservation, updateReservation, deleteReservation }) => {
  const { toast } = useToast();
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [formData, setFormData] = useState({
    flightId: '',
    passengers: [{ firstName: '', lastName: '', email: '', phone: '' }],
    status: 'confirmed'
  });

  const resetForm = () => {
    setFormData({
      flightId: '',
      passengers: [{ firstName: '', lastName: '', email: '', phone: '' }],
      status: 'confirmed'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingReservation) {
      updateReservation(editingReservation.id, formData);
      toast({
        title: "✅ Réservation modifiée",
        description: "La réservation a été modifiée avec succès",
      });
      setIsEditDialogOpen(false);
      setEditingReservation(null);
    } else {
      const newReservation = {
        ...formData,
        userId: user.id,
        id: Date.now().toString()
      };
      addReservation(newReservation);
      toast({
        title: "✅ Réservation créée",
        description: "La réservation a été créée avec succès",
      });
      setIsAddDialogOpen(false);
    }
    
    resetForm();
  };

  const handleEdit = (reservation) => {
    setEditingReservation(reservation);
    setFormData(reservation);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (id) => {
    deleteReservation(id);
    toast({
      title: "🗑️ Réservation supprimée",
      description: "La réservation a été supprimée avec succès",
    });
  };

  const addPassenger = () => {
    setFormData({
      ...formData,
      passengers: [...formData.passengers, { firstName: '', lastName: '', email: '', phone: '' }]
    });
  };

  const removePassenger = (index) => {
    const newPassengers = formData.passengers.filter((_, i) => i !== index);
    setFormData({ ...formData, passengers: newPassengers });
  };

  const updatePassenger = (index, field, value) => {
    const newPassengers = [...formData.passengers];
    newPassengers[index][field] = value;
    setFormData({ ...formData, passengers: newPassengers });
  };

  const ReservationForm = () => (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="flightId">Vol</Label>
        <Select value={formData.flightId} onValueChange={(value) => setFormData({ ...formData, flightId: value })} required>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner un vol" />
          </SelectTrigger>
          <SelectContent>
            {flights.map((flight) => (
              <SelectItem key={flight.id} value={flight.id}>
                {flight.flightNumber} - {flight.origin} → {flight.destination}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="status">Statut</Label>
        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="confirmed">Confirmée</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="cancelled">Annulée</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Passagers</Label>
          {!isAdmin && (
            <Button type="button" variant="outline" size="sm" onClick={addPassenger}>
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un passager
            </Button>
          )}
        </div>

        {formData.passengers.map((passenger, index) => (
          <div key={index} className="p-4 border border-slate-200 rounded-lg space-y-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">Passager {index + 1}</span>
              {!isAdmin && formData.passengers.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removePassenger(index)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  Retirer
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`firstName-${index}`}>Prénom</Label>
                <Input
                  id={`firstName-${index}`}
                  value={passenger.firstName}
                  onChange={(e) => updatePassenger(index, 'firstName', e.target.value)}
                  required
                  disabled={isAdmin}
                />
              </div>
              <div>
                <Label htmlFor={`lastName-${index}`}>Nom</Label>
                <Input
                  id={`lastName-${index}`}
                  value={passenger.lastName}
                  onChange={(e) => updatePassenger(index, 'lastName', e.target.value)}
                  required
                  disabled={isAdmin}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor={`email-${index}`}>Email</Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  value={passenger.email}
                  onChange={(e) => updatePassenger(index, 'email', e.target.value)}
                  required
                  disabled={isAdmin}
                />
              </div>
              <div>
                <Label htmlFor={`phone-${index}`}>Téléphone</Label>
                <Input
                  id={`phone-${index}`}
                  type="tel"
                  value={passenger.phone}
                  onChange={(e) => updatePassenger(index, 'phone', e.target.value)}
                  required
                  disabled={isAdmin}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isAdmin && (
        <div className="flex justify-end gap-2 pt-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            {editingReservation ? 'Modifier' : 'Créer'}
          </Button>
        </div>
      )}
    </form>
  );

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    
    const labels = {
      confirmed: 'Confirmée',
      pending: 'En attente',
      cancelled: 'Annulée'
    };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {isAdmin ? "Toutes les réservations" : "Gestion des réservations"}
          </h2>
          <p className="text-slate-600">
            {isAdmin 
              ? "Liste complète des réservations clients" 
              : "Gérez toutes vos réservations de vols"}
          </p>
        </div>
        
        {!isAdmin && (
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={resetForm}>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle réservation
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer une nouvelle réservation</DialogTitle>
              </DialogHeader>
              <ReservationForm />
            </DialogContent>
          </Dialog>
        )}
      </div>

      {reservations.length > 0 ? (
        <div className="space-y-4">
          {reservations.map((reservation, index) => {
            const flight = flights.find(f => f.id === reservation.flightId);
            
            return (
              <motion.div
                key={reservation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Calendar className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {flight ? `${flight.flightNumber} - ${flight.origin} → ${flight.destination}` : 'Vol inconnu'}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {flight && `${new Date(flight.departureDate).toLocaleDateString('fr-FR')} à ${flight.departureTime}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {getStatusBadge(reservation.status)}
                    
                    {!isAdmin && (
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEdit(reservation)}
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
                                Êtes-vous sûr de vouloir supprimer cette réservation ? Cette action est irréversible.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Annuler</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(reservation.id)} className="bg-red-600 hover:bg-red-700">
                                Supprimer
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <User className="w-4 h-4" />
                    <span>{reservation.passengers.length} passager(s)</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {reservation.passengers.map((passenger, pIndex) => (
                      <div key={pIndex} className="p-3 bg-slate-50 rounded-lg">
                        <p className="font-medium text-slate-900">
                          {passenger.firstName} {passenger.lastName}
                        </p>
                        <p className="text-sm text-slate-600">{passenger.email}</p>
                        <p className="text-sm text-slate-600">{passenger.phone}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {isAdmin ? "Aucune réservation" : "Aucune réservation"}
          </h3>
          <p className="text-slate-600 mb-6">
            {isAdmin 
              ? "Aucune réservation n’a été effectuée." 
              : "Commencez par créer votre première réservation"}
          </p>
        </div>
      )}

      {!isAdmin && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Modifier la réservation</DialogTitle>
            </DialogHeader>
            <ReservationForm />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ReservationsManager;