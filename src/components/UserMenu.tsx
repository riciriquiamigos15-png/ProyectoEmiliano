import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogIn, UserPlus, LogOut, ChevronDown } from 'lucide-react';

export default function UserMenu() {
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Cerrar menú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isAuthenticated && user) {
    // Usuario autenticado - mostrar menú con opciones
    return (
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all text-sm uppercase tracking-wide group"
        >
          <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline max-w-[120px] truncate">{user.name}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
            {/* Header */}
            <div className="bg-gradient-to-r from-red-600/20 to-red-700/20 p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-on-secondary" />
                </div>
                <div>
                  <p className="font-bold text-on-surface text-sm">{user.name}</p>
                  <p className="text-xs text-on-surface-variant">{user.email}</p>
                  <p className="text-xs text-secondary font-bold mt-1 uppercase">
                    {user.role === 'admin' ? '👑 Administrador' : '👤 Usuario'}
                  </p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1">
              {user.role === 'admin' && (
                <>
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-on-surface hover:bg-surface-container rounded-lg transition-colors text-sm"
                  >
                    <span>📊</span>
                    Panel de Control
                  </Link>
                  <Link
                    to="/admin/settings"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-on-surface hover:bg-surface-container rounded-lg transition-colors text-sm"
                  >
                    <span>⚙️</span>
                    Configuración
                  </Link>
                  <div className="border-t border-white/10 my-2"></div>
                </>
              )}

              {/* Ver sitio público */}
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-2 text-on-surface hover:bg-surface-container rounded-lg transition-colors text-sm"
              >
                <span>🌐</span>
                Ver Sitio Público
              </Link>

              {/* Logout */}
              <button
                onClick={() => {
                  logout();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-2 text-error hover:bg-error/10 rounded-lg transition-colors text-sm font-medium"
              >
                <LogOut className="w-4 h-4" />
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Usuario no autenticado - mostrar botones de Login/Signup
  return (
    <div className="flex items-center gap-3">
      <Link
        to="/login"
        className="flex items-center gap-2 text-neutral-300 hover:text-neutral-100 font-medium transition-colors text-sm uppercase tracking-wide hover:scale-105 transform"
      >
        <LogIn className="w-4 h-4" />
        <span className="hidden sm:inline">Acceder</span>
      </Link>
      <Link
        to="/signup"
        className="flex items-center gap-2 bg-secondary text-on-secondary px-4 py-2 rounded-lg font-bold hover:brightness-110 transition-all text-sm uppercase tracking-wide"
      >
        <UserPlus className="w-4 h-4" />
        <span className="hidden sm:inline">Registrarse</span>
      </Link>
    </div>
  );
}
