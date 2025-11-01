// src/pages/LandingPage.jsx
import React from 'react';
import { Plane } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Décoration d'avion en arrière-plan */}
      <div className="absolute inset-0 opacity-5">
        <Plane className="absolute top-1/4 left-1/4 w-64 h-64 rotate-12" />
        <Plane className="absolute bottom-1/3 right-1/4 w-48 h-48 -rotate-6" />
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-6">
          <Plane className="w-8 h-8" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
          Bienvenue sur <span className="text-blue-600">FlightManager</span>
        </h1>

        <p className="text-lg text-slate-600 mb-8">
          Gérez vos vols, réservez en un clic, et voyagez en toute sérénité.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="bg-blue-600 hover:bg-blue-700 px-6 py-3 text-base">
            <Link to="/auth?mode=login">Se connecter</Link>
          </Button>
          <Button asChild variant="outline" className="px-6 py-3 text-base">
            <Link to="/auth?mode=signup">S’inscrire</Link>
          </Button>
        </div>
      </div>

      {/* Optionnel : petit logo ou copyright en bas */}
      <div className="absolute bottom-6 text-slate-500 text-sm">
        © {new Date().getFullYear()} FlightManager — Vos voyages, simplifiés.
      </div>
    </div>
  );
};

export default LandingPage;