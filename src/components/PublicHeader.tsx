import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import BrandLogo from './BrandLogo';

interface PublicHeaderProps {
  withAuth?: boolean;
}

export default function PublicHeader({ withAuth = false }: PublicHeaderProps) {
  const location = useLocation();

  const publicLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Historia', path: '/history' },
    { label: 'Arte', path: '/art' },
    { label: 'Música', path: '/music' },
    { label: 'Información', path: '/info' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
        <Link to="/" className="shrink-0">
          <BrandLogo compact />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-neutral-400 font-medium hover:text-neutral-100 transition-colors font-headline text-sm",
                location.pathname === link.path && "text-yellow-500 font-bold border-b-2 border-yellow-500 pb-1"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {withAuth ? (
          <div className="flex items-center gap-3">
            <Link 
              to="/login"
              className="text-neutral-300 hover:text-neutral-100 font-medium transition-colors text-sm uppercase tracking-wide"
            >
              Acceder
            </Link>
            <Link 
              to="/signup"
              className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all text-sm uppercase tracking-wide"
            >
              Registrarse
            </Link>
          </div>
        ) : (
          <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-bold hover:scale-95 transition-transform">
            Entradas
          </button>
        )}
      </div>
    </header>
  );
}
