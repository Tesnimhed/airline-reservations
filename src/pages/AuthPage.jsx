import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { useToast } from '../components/ui/use-toast';
import { cn } from '../lib/utils';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      if (email === 'admin@flight.com' && password === 'admin') {
        login({ email, role: 'admin', name: 'Admin' });
        toast({ title: "🎉 Bienvenue, Admin !" });
      } else if (email === 'user@flight.com' && password === 'user') {
        login({ email, role: 'user', name: 'John Doe' });
        toast({ title: "🎉 Connexion réussie !" });
      } else {
        toast({
          variant: "destructive",
          title: "Email ou mot de passe incorrect.",
          description: "Veuillez réessayer.",
        });
      }
    } else {
      toast({
        title: "🚧 Inscription à venir",
        description: "La création de compte sera bientôt disponible !",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
      className="w-full max-w-md p-8 space-y-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          {isLogin ? 'Connexion' : 'Créer un compte'}
        </h2>
        <p className="mt-2 text-slate-600">
          {isLogin ? 'Accédez à votre tableau de bord' : 'Rejoignez-nous dès aujourd\'hui !'}
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="email">Adresse email</Label>
          <Input id="email" type="email" placeholder="nom@exemple.com" required value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Mot de passe</Label>
          <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6">
          {isLogin ? 'Se connecter' : 'S\'inscrire'}
        </Button>
      </form>

      <div className="text-center">
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          {isLogin ? 'Pas de compte ? Créez-en un' : 'Déjà un compte ? Connectez-vous'}
        </button>
      </div>
    </motion.div>
  );
};

export default AuthPage;