import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verificar si hay sesión guardada al cargar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('user');
        const token = localStorage.getItem('auth_token');

        if (savedUser && token) {
          setUser(JSON.parse(savedUser));
        }
      } catch (err) {
        console.error('Error checking auth:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      // Validación simple - en producción usarías autenticación real
      if (!email || !password) {
        throw new Error('Email y contraseña son requeridos');
      }

      // Aquí irá la llamada a tu API de autenticación
      // Por ahora, simulamos un login exitoso para admin
      if (email === 'admin@diablada.com' && password === 'admin123') {
        const mockUser: User = {
          id: 'admin-001',
          email: 'admin@diablada.com',
          name: 'Administrador',
          role: 'admin',
        };

        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        localStorage.setItem('auth_token', 'mock-token-' + Date.now());
      } else {
        throw new Error('Credenciales inválidas. Usa admin@diablada.com / admin123');
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al iniciar sesión';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      setIsLoading(true);

      // Validación simple
      if (!email || !password || !name) {
        throw new Error('Todos los campos son requeridos');
      }

      if (password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
      }

      // En producción, aquí iría la llamada a tu API
      // Por ahora, solo permitimos que se guarde pero como usuario normal
      const mockUser: User = {
        id: 'user-' + Date.now(),
        email,
        name,
        role: 'user', // Los nuevos usuarios son normales, no admins
      };

      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      localStorage.setItem('auth_token', 'mock-token-' + Date.now());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al registrarse';
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
