import React from 'react';
import UserMenu from './UserMenu';

/**
 * Wrapper seguro para UserMenu
 * Esto aísla posibles errores de contexto
 */
export default function UserMenuWrapper() {
  try {
    return <UserMenu />;
  } catch (error) {
    // Fallback si hay un error
    return (
      <div className="flex items-center gap-3">
        <a
          href="/login"
          className="text-neutral-300 hover:text-neutral-100 font-medium transition-colors text-sm uppercase tracking-wide"
        >
          Acceder
        </a>
        <button className="bg-primary-container text-on-primary-container px-6 py-2 rounded-lg font-bold hover:scale-95 transition-transform">
          Registrarse
        </button>
      </div>
    );
  }
}
