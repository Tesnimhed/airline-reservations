import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, Wallet } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { Button } from '../components/ui/button';
import { useToast } from '../components/ui/use-toast';
import { Helmet } from 'react-helmet';

const UserFlights = () => {
    const { flights } = useData();
    const { toast } = useToast();

    const handleBooking = () => {
        toast({
            title: "🚧 Fonctionnalité à venir",
            description: "La réservation de vols sera bientôt disponible ! 🚀",
        });
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

            {flights.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {flights.map((flight, index) => (
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
                            
                            <Button onClick={handleBooking} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">Réserver ce vol</Button>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Plane className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Aucun vol disponible</h3>
                    <p className="text-slate-600">Revenez plus tard pour de nouvelles offres.</p>
                </div>
            )}
        </div>
    );
};

export default UserFlights;