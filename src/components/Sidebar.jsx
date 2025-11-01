// src/components/Sidebar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Plane, Calendar, Ticket, User as UserIcon, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ isOpen }) => {
  const { user } = useAuth(); // ← récupère l'utilisateur réel
  const location = useLocation();

  // Définir les items selon le rôle
  const menuItems = React.useMemo(() => {
    if (!user) return [];

    if (user.role === 'admin') {
      return [
        { path: '/admin', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/flights', label: 'Vols', icon: Plane },
        { path: '/admin-reservations', label: 'Réservations', icon: Calendar },
        { path: '/users', label: 'Utilisateurs', icon: UserIcon },
      ];
    } else {
      return [
        { path: '/flights', label: 'Vols disponibles', icon: Plane },
        { path: '/my-reservations', label: 'Mes Réservations', icon: Ticket },
      ];
    }
  }, [user]);

  if (!user) return null; // ou un fallback

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          {isOpen && (
            <h1 className="text-lg font-bold text-slate-900">FlightManager</h1>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link to={item.path} key={item.path}>
                <motion.div
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all",
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  )}
                  whileHover={{ x: isOpen ? 4 : 0 }}
                >
                  <Icon className="w-5 h-5" />
                  {isOpen && <span>{item.label}</span>}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Déconnexion */}
      <div className="p-4 border-t border-slate-200">
        <motion.button
          onClick={() => console.log('Déconnexion')}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all"
          whileHover={{ x: isOpen ? 4 : 0 }}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span>Déconnexion</span>}
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;