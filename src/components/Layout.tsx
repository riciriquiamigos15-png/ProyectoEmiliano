import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileEdit, 
  Image as ImageIcon, 
  Palette, 
  Video, 
  Settings, 
  LogOut,
  Bell,
  HelpCircle,
  Search,
  ChevronRight,
  Eye,
  History as HistoryIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import BrandLogo from './BrandLogo';
import UserMenu from './UserMenu';

interface LayoutProps {
  children: React.ReactNode;
  mode?: 'cms' | 'public';
}

export default function Layout({ children, mode = 'cms' }: LayoutProps) {
  const location = useLocation();
  const { language } = useLanguage();

  const copy = {
    es: {
      publicLinks: [
        { label: 'Inicio', path: '/' },
        { label: 'Historia', path: '/history' },
        { label: 'Arte', path: '/art' },
        { label: 'Música', path: '/music' },
        { label: 'Información', path: '/info' },
      ],
      login: 'Acceder',
      contact: 'Contacto',
      footerClaim: '© 2024 La Diablada Pillareña. Patrimonio Cultural del Ecuador.',
    },
    en: {
      publicLinks: [
        { label: 'Home', path: '/' },
        { label: 'History', path: '/history' },
        { label: 'Art', path: '/art' },
        { label: 'Music', path: '/music' },
        { label: 'Info', path: '/info' },
      ],
      login: 'Log in',
      contact: 'Contact',
      footerClaim: '© 2024 La Diablada Pillareña. Cultural Heritage of Ecuador.',
    },
  }[language];

  const navItems = [
    { label: 'Panel de Control', icon: LayoutDashboard, path: '/' },
    { label: 'Secciones del Sitio', icon: FileEdit, path: '/cms/sections' },
    { label: 'Biblioteca de Medios', icon: ImageIcon, path: '/cms/media' },
    { label: 'Configuración de Estilos', icon: Palette, path: '/cms/styles' },
    { label: 'Centro Multimedia', icon: Video, path: '/cms/multimedia' },
  ];

  if (mode === 'public') {
    return (
      <div className="min-h-screen bg-surface flex flex-col">
        <header className="fixed top-0 w-full z-50 bg-neutral-950/60 backdrop-blur-xl border-b border-white/5">
          <div className="flex justify-between items-center px-8 py-4 w-full max-w-screen-2xl mx-auto">
            <Link to="/" className="shrink-0">
              <BrandLogo compact />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {copy.publicLinks.map((link) => (
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
            <Link to="/login" className="bg-secondary text-on-secondary px-6 py-2 rounded-lg font-bold hover:brightness-110 transition-all text-sm uppercase tracking-wide">
              {copy.login}
            </Link>
          </div>
        </header>
        <main className="flex-1 pt-20">
          {children}
        </main>
        <footer className="bg-neutral-950 w-full py-12 px-8 border-t border-neutral-800/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 w-full max-w-screen-2xl mx-auto">
            <div className="font-headline font-bold text-neutral-100">
              LA DIABLADA PILLAREÑA
            </div>
            <div className="flex gap-8">
              {['Facebook', 'Instagram', 'YouTube', copy.contact].map((social) => (
                <a key={social} href="#" className="text-neutral-500 hover:text-red-500 transition-colors text-sm uppercase tracking-wide">
                  {social}
                </a>
              ))}
            </div>
            <div className="text-sm tracking-wide text-neutral-400">
              {copy.footerClaim}
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface-dim overflow-hidden">
      {/* CMS Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-surface border-r border-surface-container-highest/30 flex flex-col z-40">
        <div className="px-6 py-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-surface-container-highest rounded-full flex items-center justify-center">
              <FileEdit className="text-secondary w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-on-surface leading-tight">Control de Diablada</h2>
              <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">Control Editorial</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 transition-colors duration-300",
                  isActive 
                    ? "text-secondary font-bold border-r-4 border-secondary bg-surface-container-low" 
                    : "text-on-surface-variant font-medium hover:bg-surface-container-low"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-6 mt-auto border-t border-surface-container-highest/30 space-y-4">
          <button className="w-full bg-secondary-container/20 text-secondary text-[11px] font-black uppercase tracking-widest py-3 rounded border border-secondary/30 hover:bg-secondary-container/30 transition-all">
            Publicar Cambios
          </button>
          <div className="space-y-1">
            <button className="flex items-center gap-3 text-on-surface-variant hover:text-on-surface text-sm transition-colors py-2 w-full text-left">
              <Settings className="w-4 h-4" />
              <span>Configuración</span>
            </button>
            <button className="flex items-center gap-3 text-red-500/70 hover:text-red-500 text-sm transition-colors py-2 w-full text-left">
              <LogOut className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1 flex flex-col min-w-0">
        <header className="h-16 w-full flex justify-between items-center px-8 bg-surface/90 backdrop-blur-xl border-b border-surface-container-highest/30 z-30">
          <div className="flex items-center gap-8">
            <span className="text-lg font-black uppercase text-on-surface tracking-widest font-headline">PANEL CMS</span>
            <div className="relative hidden md:flex items-center bg-surface-container-highest/30 rounded-full px-4 py-2 border border-white/5">
              <Search className="text-on-surface-variant w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar recursos..." 
                className="bg-transparent border-none focus:ring-0 text-sm placeholder-on-surface-variant/50 w-48 text-on-surface ml-2" 
              />
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex gap-4 items-center">
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="text-on-surface-variant hover:text-primary transition-colors">
                <HelpCircle className="w-5 h-5" />
              </button>
            </div>
            <img 
              src="https://picsum.photos/seed/admin/100/100" 
              alt="Admin" 
              className="w-8 h-8 rounded-full border border-secondary"
            />
          </div>
        </header>

        {/* Sub-header for breadcrumbs etc */}
        <div className="h-12 border-b border-surface-container-highest/10 flex items-center justify-between px-8 bg-surface-container-low shrink-0">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            <span>Administrador</span>
            <ChevronRight className="w-3 h-3" />
            <span>Secciones</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-secondary">Vista Actual</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface">
              <Eye className="w-3.5 h-3.5" />
              Prevista
            </button>
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-on-surface-variant hover:text-on-surface">
              <HistoryIcon className="w-3.5 h-3.5" />
              Historial
            </button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
