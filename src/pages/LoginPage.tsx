import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  // Si ya está autenticado, redirigir al admin
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setFormError(error || 'Error al iniciar sesión');
    }
  };

  // Demo credentials hint
  const demoCredentials = {
    email: 'admin@diablada.com',
    password: 'admin123',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter text-red-600 font-headline mb-2">
            La Diablada
          </h1>
          <p className="text-neutral-500 text-sm tracking-wide uppercase">Acceso al panel administrativo</p>
        </div>

        {/* Card de login */}
        <div className="bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-on-surface mb-6">Iniciar Sesión</h2>

          {/* Error Message */}
          {(formError || error) && (
            <div className="mb-6 p-4 bg-error/10 border border-error/30 rounded-xl flex gap-3">
              <AlertCircle className="w-5 h-5 text-error flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-error text-sm font-medium">{formError || error}</p>
                <p className="text-error/70 text-xs mt-1">
                  Demo: admin@diablada.com / admin123
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="admin@diablada.com"
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
                  placeholder="••••••••"
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
                  Autenticando...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-secondary-container/20 border border-secondary/30 rounded-xl">
              <p className="text-xs font-bold text-secondary mb-2 uppercase tracking-wide">Credenciales Demo:</p>
              <div className="space-y-1 text-xs text-on-surface-variant font-mono">
                <p>Email: {demoCredentials.email}</p>
                <p>Pass: {demoCredentials.password}</p>
              </div>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center border-t border-white/10 pt-6">
            <p className="text-on-surface-variant text-sm mb-3">¿No tienes cuenta?</p>
            <Link
              to="/signup"
              className="inline-block bg-secondary-container text-on-secondary-container px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all text-sm uppercase tracking-wide"
            >
              Registrarse
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
