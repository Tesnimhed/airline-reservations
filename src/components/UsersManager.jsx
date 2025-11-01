import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { User as UserIcon, Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from './ui/dialog';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from './ui/alert-dialog';

const UsersManager = ({ users, reservations, flights, deleteUser }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  // Filtrer les utilisateurs
  const filteredUsers = useMemo(() => {
    if (!searchTerm) return users;
    const term = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
    );
  }, [users, searchTerm]);

  const handleDelete = (id) => {
    if (users.length <= 1) {
      toast({
        title: "❌ Action impossible",
        description: "Vous ne pouvez pas supprimer le dernier utilisateur.",
      });
      return;
    }
    deleteUser(id);
    toast({
      title: "🗑️ Utilisateur supprimé",
      description: "Le compte a été supprimé avec succès.",
    });
  };

  // Récupérer les réservations d’un utilisateur
  const getUserReservations = (userId) => {
    return reservations.filter(r => r.userId === userId);
  };

  const getFlight = (flightId) => {
    return flights.find(f => f.id === flightId);
  };

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
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="p-0">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Gestion des utilisateurs</h2>
          <p className="text-slate-600">Consultez et gérez les comptes utilisateurs</p>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          placeholder="Rechercher un utilisateur..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <Button
            size="sm"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 p-0"
            onClick={() => setSearchTerm('')}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {filteredUsers.length > 0 ? (
        <div className="space-y-4">
          {filteredUsers.map((user, index) => (
            <motion.div
              key={user.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-slate-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
                    <p className="text-sm text-slate-600">{user.email}</p>
                    <span className={`text-xs px-2 py-1 rounded-full mt-1 inline-block ${
                      user.role === 'admin' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {user.role === 'admin' ? 'Administrateur' : 'Client'}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        Détails
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>Détails de l'utilisateur</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-slate-500">Nom complet</p>
                            <p className="font-medium">{user.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Email</p>
                            <p className="font-medium">{user.email}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">Rôle</p>
                            <p className="font-medium">
                              {user.role === 'admin' ? 'Administrateur' : 'Client'}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-500">ID</p>
                            <p className="font-mono text-sm text-slate-600">{user.id}</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="font-semibold mb-3">Réservations associées</h3>
                          {getUserReservations(user.id).length > 0 ? (
                            <div className="space-y-3">
                              {getUserReservations(user.id).map((res, idx) => {
                                const flight = getFlight(res.flightId);
                                return (
                                  <div key={idx} className="p-3 border border-slate-200 rounded-lg">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">
                                          {flight ? `${flight.flightNumber} - ${flight.origin} → ${flight.destination}` : 'Vol inconnu'}
                                        </p>
                                        <p className="text-sm text-slate-600">
                                          {flight && `${new Date(flight.departureDate).toLocaleDateString('fr-FR')} à ${flight.departureTime}`}
                                        </p>
                                      </div>
                                      {getStatusBadge(res.status)}
                                    </div>
                                    <div className="mt-2 text-sm text-slate-600">
                                      {res.passengers.length} passager(s)
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <p className="text-slate-500 italic">Aucune réservation.</p>
                          )}
                        </div>
                      </div>
                      <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                      </DialogClose>
                    </DialogContent>
                  </Dialog>
                  
                  {user.role !== 'admin' && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          Supprimer
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Supprimer cet utilisateur ?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Toutes les réservations de <strong>{user.name}</strong> seront perdues.
                            Cette action est irréversible.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(user.id)} 
                            className="bg-red-600 hover:bg-red-700"
                          >
                            Supprimer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserIcon className="w-8 h-8 text-slate-400" />
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">
            {searchTerm ? "Aucun utilisateur trouvé" : "Aucun utilisateur"}
          </h3>
          <p className="text-slate-600">
            {searchTerm 
              ? "Aucun utilisateur ne correspond à votre recherche." 
              : "Il n’y a aucun utilisateur enregistré."}
          </p>
        </div>
      )}
    </div>
  );
};

export default UsersManager;