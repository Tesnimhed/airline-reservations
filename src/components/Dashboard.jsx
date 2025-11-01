import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Calendar, Users, TrendingUp } from 'lucide-react';

const Dashboard = ({ flights, reservations }) => {
  const stats = [
    {
      label: 'Vols actifs',
      value: flights.length,
      icon: Plane,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      label: 'Réservations',
      value: reservations.length,
      icon: Calendar,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    {
      label: 'Passagers',
      value: reservations.reduce((acc, r) => acc + (r.passengers?.length || 0), 0),
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      label: 'Taux d\'occupation',
      value: flights.length > 0 ? Math.round((reservations.length / (flights.reduce((acc, f) => acc + parseInt(f.capacity), 0))) * 100) + '%' : '0%',
      icon: TrendingUp,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    }
  ];

  const recentReservations = reservations.slice(-5).reverse();

  return (
    <div className="p-0">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">Tableau de bord</h2>
        <p className="text-slate-600">Vue d'ensemble de votre système de réservation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 ${stat.textColor}`} />
                </div>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-slate-200"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">Réservations récentes</h3>
          {recentReservations.length > 0 ? (
            <div className="space-y-3">
              {recentReservations.map((reservation) => {
                const flight = flights.find(f => f.id === reservation.flightId);
                return (
                  <div key={reservation.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="font-medium text-slate-900">
                        {flight ? `${flight.origin} → ${flight.destination}` : 'Vol inconnu'}
                      </div>
                      <div className="text-sm text-slate-600">
                        {reservation.passengers?.[0]?.firstName} {reservation.passengers?.[0]?.lastName}
                      </div>
                    </div>
                    <div className="text-sm text-slate-500">
                      {new Date(reservation.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              Aucune réservation pour le moment
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-slate-200"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-4">Vols disponibles</h3>
          {flights.length > 0 ? (
            <div className="space-y-3">
              {flights.slice(0, 5).map((flight) => (
                <div key={flight.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <div className="font-medium text-slate-900">
                      {flight.flightNumber}
                    </div>
                    <div className="text-sm text-slate-600">
                      {flight.origin} → {flight.destination}
                    </div>
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(flight.departureDate).toLocaleDateString('fr-FR')}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-slate-500">
              Aucun vol disponible
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;