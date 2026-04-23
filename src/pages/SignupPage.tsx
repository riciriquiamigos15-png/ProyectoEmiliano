import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, User, AlertCircle, Loader, CheckCircle } from 'lucide-react';

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup, isLoading, error, isAuthenticated } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  // Si ya está autenticado, redirigir al admin
  useEffect(() => {
    if (isAuthenticated && success) {
      setTimeout(() => navigate('/admin'), 1500);
    }
  }, [isAuthenticated, success, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validaciones
    if (!name || !email || !password || !confirmPassword) {
      setFormError('Todos los campos son requeridos');
      return;
    }

    if (password !== confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 6) {
      setFormError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      await signup(email, password, name);
      setSuccess(true);
    } catch (err) {
      setFormError(error || 'Error al registrarse');
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-on-surface mb-2">¡Registro Exitoso!</h1>
          <p className="text-on-surface-variant mb-6">Redirigiendo al panel administrativo...</p>
          <div className="inline-block">
            <Loader className="w-6 h-6 text-secondary animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-red-600 font-headline mb-2">
            La Diablada
          </h1>
          <p className="text-neutral-500 text-sm tracking-wide uppercase">Crear nueva cuenta</p>
        </div>

        {/* Card de signup */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-on-surface mb-2">Registro</h2>
          <p className="text-on-surface-variant text-sm mb-6">Crea tu cuenta para acceder al sistema</p>

          {/* Error Message */}
          {(formError || error) && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <p className="text-error text-sm font-medium">{formError || error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                Nombre Completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Mínimo 6 caracteres"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label className="block text-sm font-bold text-on-surface mb-2 uppercase tracking-wide">
                Confirmar Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repite tu contraseña"
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-xl pl-10 pr-4 py-3 text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/50 transition-all"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 rounded-xl uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-red-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                'Crear Cuenta'
              )}
            </button>

            {/* Info */}
            <div className="mt-6 p-4 bg-secondary-container/20 border border-secondary/30 rounded-xl">
              <p className="text-xs text-on-surface-variant">
                📌 <strong>Nota:</strong> Las nuevas cuentas tienen acceso limitado. 
                Solo administradores pueden editar contenido.
              </p>
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <p className="text-on-surface-variant text-sm mb-3">¿Ya tienes cuenta?</p>
            <Link
              to="/login"
              className="inline-block bg-secondary-container text-on-secondary-container px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all text-sm uppercase tracking-wide"
            >
              Iniciar Sesión
            </Link>
          </div>
        </div>

        {/* Footer info */}
        <div className="text-center mt-8">
          <p className="text-xs text-on-surface-variant tracking-widest uppercase">
            Panel Administrativo - La Diablada Pillareña
          </p>
        </div>
      </div>
    </div>
  );
}
