import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/Layout';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import HomeEditor from './pages/admin/HomeEditor';
import SectionEditor from './pages/admin/SectionEditor';
import HistoryEditor from './pages/admin/HistoryEditor';
import ArtEditor from './pages/admin/ArtEditor';
import Dashboard from './pages/Dashboard';
import InfoPage from './pages/InfoPage';
import HistoryPage from './pages/HistoryPage';
import ArtPage from './pages/ArtPage';
import HomePage from './pages/HomePage';
import MusicPage from './pages/MusicPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  return null;
}

// Componente para proteger rutas del admin
function ProtectedAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated || !user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </LanguageProvider>
  );
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Public Routes */}
        <Route path="/" element={<Layout mode="public"><HomePage /></Layout>} />
        <Route path="/history" element={<Layout mode="public"><HistoryPage /></Layout>} />
        <Route path="/art" element={<Layout mode="public"><ArtPage /></Layout>} />
        <Route path="/music" element={<Layout mode="public"><MusicPage /></Layout>} />
        <Route path="/info" element={<Layout mode="public"><InfoPage /></Layout>} />

        {/* Protected Admin Panel Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <AdminDashboard />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/editor/home"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <HomeEditor />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/sections/historia"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <HistoryEditor />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/sections/arte"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <ArtEditor />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/sections/:section"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <SectionEditor />
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/media"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <div className="space-y-8">
                  <h1 className="text-4xl font-black text-on-surface">Biblioteca de Medios</h1>
                  <div className="grid grid-cols-4 gap-4">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-surface-container rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all"
                      >
                        <img
                          src={`https://picsum.photos/seed/${i + 40}/400/400`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/styles"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <div className="space-y-8">
                  <h1 className="text-4xl font-black text-on-surface">Configuración de Estilos</h1>
                  <div className="bg-surface-container p-8 rounded-xl max-w-md">
                    Editor de Tema Avanzado - Próximamente
                  </div>
                </div>
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/multimedia"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <div className="space-y-8">
                  <h1 className="text-4xl font-black text-on-surface">Centro Multimedia</h1>
                  <div className="bg-surface-container p-8 rounded-xl max-w-md">
                    Gestión de videos externos e inserciones de redes sociales.
                  </div>
                </div>
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedAdminRoute>
              <AdminLayout>
                <div className="space-y-8">
                  <h1 className="text-4xl font-black text-on-surface">Configuración</h1>
                  <div className="bg-surface-container p-8 rounded-xl max-w-md">Panel de configuración - Próximamente</div>
                </div>
              </AdminLayout>
            </ProtectedAdminRoute>
          }
        />

        {/* Legacy CMS Routes - Kept for backward compatibility */}
        <Route path="/cms" element={<Layout mode="cms"><Dashboard /></Layout>} />
        <Route path="/cms/sections" element={<Layout mode="cms"><Dashboard /></Layout>} />
        <Route
          path="/cms/media"
          element={
            <Layout mode="cms">
              <div className="p-12">
                <h1 className="text-4xl font-black font-headline uppercase mb-8">Biblioteca de Medios</h1>
                <div className="grid grid-cols-4 gap-4">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <div
                      key={i}
                      className="aspect-square bg-surface-container rounded-xl overflow-hidden grayscale hover:grayscale-0 transition-all"
                    >
                      <img
                        src={`https://picsum.photos/seed/${i + 40}/400/400`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/cms/styles"
          element={
            <Layout mode="cms">
              <div className="p-12">
                <h1 className="text-4xl font-black font-headline uppercase mb-8">Configuración de Estilos</h1>
                <div className="bg-surface-container p-8 rounded-xl max-w-md">
                  Próximamente: Editor de Tema Avanzado
                </div>
              </div>
            </Layout>
          }
        />
        <Route
          path="/cms/multimedia"
          element={
            <Layout mode="cms">
              <div className="p-12">
                <h1 className="text-4xl font-black font-headline uppercase mb-8">Centro Multimedia</h1>
                <div className="bg-surface-container p-8 rounded-xl max-w-md">
                  Administra tus videos externos e inserciones de redes sociales.
                </div>
              </div>
            </Layout>
          }
        />
      </Routes>
    </>
  );
}
