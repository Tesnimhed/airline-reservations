import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Trash2, Plane } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Helmet } from 'react-helmet';

const UserReservations = () => {
    const { user } = useAuth();
    const { reservations, flights, deleteReservation } = useData();
    const { toast } = useToast();

    // In a real app, reservations would be filtered by user ID
    const userReservations = reservations; 

    const handleCancel = (id) => {
        deleteReservation(id);
        toast({
            title: "🗑️ Réservation annulée",
            description: "Votre réservation a bien été annulée.",
        });
    };

    return (
        <div>
             <Helmet>
                <title>Mes Réservations - FlightManager Pro</title>
                <meta name="description" content="Gérez vos réservations de vols." />
            </Helmet>
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Mes Réservations</h2>
                <p className="text-slate-600">Gérez vos voyages à venir.</p>
            </div>

            {userReservations.length > 0 ? (
                <div className="space-y-4">
                    {userReservations.map((reservation, index) => {
                        const flight = flights.find(f => f.id === reservation.flightId);
                        return (
                            <motion.div
                                key={reservation.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-all"
                            >
                                <div className="flex flex-col sm:flex-row items-start justify-between">
                                    <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                        <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                            <Plane className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900">
                                                {flight ? `${flight.origin} → ${flight.destination}` : 'Vol inconnu'}
                                            </h3>
                                            <p className="text-sm text-slate-600">
                                                Le {flight ? new Date(flight.departureDate).toLocaleDateString('fr-FR') : ''}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" className="w-full sm:w-auto">
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Annuler
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Confirmer l'annulation</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Êtes-vous sûr de vouloir annuler cette réservation ? Cette action est irréversible.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Retour</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => handleCancel(reservation.id)} className="bg-red-600 hover:bg-red-700">
                                                    Confirmer l'annulation
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
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
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucune réservation</h3>
                    <p className="text-slate-600">Vous n'avez pas encore réservé de vol.</p>
                </div>
            )}
        </div>
    );
};

export default UserReservations;