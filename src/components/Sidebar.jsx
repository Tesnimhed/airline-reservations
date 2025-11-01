import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, Plane, Calendar, Settings, Ticket, User as UserIcon } from 'lucide-react';
import { cn } from '../lib/utils'; // ✅ corrigé : ../lib/utils
import { useToast } from './ui/use-toast'; // ✅ corrigé : ./ui/use-toast
import { useAuth } from '../contexts/AuthContext'; // ✅ corrigé : ../contexts/AuthContext

const Sidebar = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const location = useLocation();

  const adminMenuItems = [
    { path: '/', label: 'Tableau de bord', icon: LayoutDashboard },
    { path: '/flights', label: 'Vols', icon: Plane },
    { path: '/reservations', label: 'Réservations', icon: Calendar },
  ];

  const userMenuItems = [
    { path: '/', label: 'Vols disponibles', icon: Plane },
    { path: '/my-reservations', label: 'Mes Réservations', icon: Ticket },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  const handleSettings = () => {
    toast({
      title: "🚧 Fonctionnalité à venir",
      description: "Les paramètres seront bientôt disponibles ! 🚀",
    });
  };

  return (
    <div className="w-64 bg-white border-r border-slate-200 flex flex-col shrink-0">
      <div className="p-6 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
            <Plane className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">FlightManager</h1>
            <p className="text-xs text-slate-500 capitalize">{user?.role} Panel</p>
          </div>
        </div>
      </div>

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
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="p-4 border-t border-slate-200">
        <motion.button
          onClick={handleSettings}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
        >
          <Settings className="w-5 h-5" />
          <span>Paramètres</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;