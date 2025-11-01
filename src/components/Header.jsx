import React from 'react';
import { useAuth } from '../contexts/AuthContext'; // ✅ corrigé
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'; // ✅ corrigé
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'; // ✅ corrigé
import { Button } from './ui/button'; // ✅ corrigé
import { LogOut, User } from 'lucide-react';

const Header = () => {
    const { user, logout } = useAuth();
    const initials = user?.name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';

    return (
        <header className="flex items-center justify-between h-16 px-8 bg-white border-b border-slate-200">
            <div>
                <h1 className="text-xl font-semibold text-slate-800">
                    {user?.role === 'admin' ? 'Panneau d\'administration' : 'Espace Client'}
                </h1>
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={`https://avatar.vercel.sh/${user?.email}.png`} alt={user?.name} />
                            <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{user?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Déconnexion</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </header>
    );
};

export default Header;