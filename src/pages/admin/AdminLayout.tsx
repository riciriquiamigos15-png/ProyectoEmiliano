import React, { useEffect, useState } from 'react';
import {
  Activity,
  Bell,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Home,
  ImageIcon,
  LayoutDashboard,
  LogOut,
  Palette,
  Save,
  Search,
  Settings,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isEditorialMenuOpen, setIsEditorialMenuOpen] = useState(() => location.pathname.startsWith('/admin/sections/historia'));
  const [isArtEditorialMenuOpen, setIsArtEditorialMenuOpen] = useState(() => location.pathname.startsWith('/admin/sections/arte'));

  const menuItems = [
    { icon: LayoutDashboard, label: 'Panel Principal', path: '/admin' },
    { icon: Home, label: 'Editar Inicio', path: '/admin/editor/home' },
    { icon: ImageIcon, label: 'Galería Multimedia', path: '/admin/media' },
    { icon: Palette, label: 'Configuración de Estilos', path: '/admin/styles' },
    { icon: Activity, label: 'Centro Multimedia', path: '/admin/multimedia' },
  ];

  const editorialItems = [
    { label: 'Editar Contenido General', path: '/admin/sections/historia?tab=general' },
    { label: 'Editar Personajes', path: '/admin/sections/historia?tab=characters' },
    { label: 'Sección del Sitio', path: '/admin/sections/historia?tab=interaction' },
  ];

  const artEditorialItems = [
    { label: 'Contenido General', path: '/admin/sections/arte?tab=general' },
    { label: 'Máscaras', path: '/admin/sections/arte?tab=masks' },
    { label: 'Información / Biografía', path: '/admin/sections/arte?tab=info' },
    { label: 'Contactos', path: '/admin/sections/arte?tab=contacts' },
    { label: 'Galería', path: '/admin/sections/arte?tab=gallery' },
    { label: 'Multimedia', path: '/admin/sections/arte?tab=media' },
    { label: 'Cuadros / Obras', path: '/admin/sections/arte?tab=cards' },
    { label: 'Proceso Ritual', path: '/admin/sections/arte?tab=process' },
  ];

  useEffect(() => {
    if (location.pathname.startsWith('/admin/sections/historia')) {
      setIsEditorialMenuOpen(true);
    }

    if (location.pathname.startsWith('/admin/sections/arte')) {
      setIsArtEditorialMenuOpen(true);
    }
  }, [location.pathname]);

  function isActive(path: string) {
    return `${location.pathname}${location.search}` === path || location.pathname === path;
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-background border-r border-surface-variant/30 flex flex-col z-40 transition-all duration-300 ${isSidebarExpanded ? 'w-64' : 'w-24'}`}>
        {/* Logo Section */}
        <div className="px-4 py-6">
          <button
            type="button"
            onClick={() => setIsSidebarExpanded((currentValue) => !currentValue)}
            className={`flex w-full rounded-2xl border border-surface-variant/20 bg-surface-container-low text-left transition-colors hover:bg-surface-container ${isSidebarExpanded ? 'items-center gap-3 px-3 py-3' : 'flex-col items-center justify-center gap-2 px-2 py-4'}`}
            aria-expanded={isSidebarExpanded}
          >
            <div className={`min-w-0 ${isSidebarExpanded ? 'flex-1' : 'flex items-center justify-center'}`}>
              {isSidebarExpanded ? (
                <>
                  <div className="text-xl font-black tracking-tighter text-secondary">Admin Diablada</div>
                  <div className="text-xs font-medium uppercase tracking-widest text-on-surface-variant">Control Editorial</div>
                </>
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-secondary/40 bg-background text-base font-black uppercase tracking-[0.18em] text-secondary">
                  AD
                </div>
              )}
            </div>
            <ChevronRight className={`h-5 w-5 flex-shrink-0 text-on-surface-variant transition-transform ${isSidebarExpanded ? 'rotate-180' : '-rotate-90'}`} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 pb-6 no-scrollbar">
          {isSidebarExpanded && (
            <div className="space-y-2 border-t border-surface-variant/20 pt-4">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                      active
                        ? 'bg-surface-container-low border-l-4 border-secondary font-bold text-secondary'
                        : 'font-medium text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-sm">{item.label}</span>
                  </Link>
                );
              })}

              <div className="rounded-2xl border border-surface-variant/20 bg-surface/40 p-2">
                <button
                  type="button"
                  onClick={() => setIsEditorialMenuOpen((currentValue) => !currentValue)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors ${location.pathname.startsWith('/admin/sections/historia') ? 'bg-surface-container-low text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                  aria-expanded={isEditorialMenuOpen}
                >
                  <div className="flex items-center gap-3">
                    <ImageIcon className="h-5 w-5" />
                    <div>
                      <div className="text-sm font-bold">Control Editorial</div>
                      <div className="text-[11px] uppercase tracking-[0.22em] opacity-70">Historia</div>
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isEditorialMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isEditorialMenuOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {editorialItems.map((item) => {
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block rounded-xl px-4 py-3 text-sm transition-colors ${active ? 'bg-secondary text-surface font-bold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="rounded-2xl border border-surface-variant/20 bg-surface/40 p-2">
                <button
                  type="button"
                  onClick={() => setIsArtEditorialMenuOpen((currentValue) => !currentValue)}
                  className={`flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors ${location.pathname.startsWith('/admin/sections/arte') ? 'bg-surface-container-low text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                  aria-expanded={isArtEditorialMenuOpen}
                >
                  <div className="flex items-center gap-3">
                    <Palette className="h-5 w-5" />
                    <div>
                      <div className="text-sm font-bold">Control Editorial</div>
                      <div className="text-[11px] uppercase tracking-[0.22em] opacity-70">Arte</div>
                    </div>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${isArtEditorialMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isArtEditorialMenuOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {artEditorialItems.map((item) => {
                      const active = isActive(item.path);
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`block rounded-xl px-4 py-3 text-sm transition-colors ${active ? 'bg-secondary text-surface font-bold' : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'}`}
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="pt-4 space-y-2 border-t border-surface-variant/20">
                <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-4 py-3 font-bold text-on-primary-container hover:opacity-90">
                  <Save className="h-4 w-4" />
                  Publicar Cambios
                </button>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-3 rounded-xl px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                >
                  <Settings className="h-5 w-5" />
                  <span className="text-sm font-medium">Configuración</span>
                </Link>
                <button className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface">
                  <LogOut className="h-5 w-5" />
                  <span className="text-sm font-medium">Cerrar Sesión</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className={`w-full flex flex-col transition-all duration-300 ${isSidebarExpanded ? 'ml-64' : 'ml-24'}`}>
        {/* Top Bar */}
        <header className={`fixed top-0 right-0 bg-background/90 backdrop-blur-xl z-30 border-b border-surface-variant/30 transition-all duration-300 ${isSidebarExpanded ? 'left-64' : 'left-24'}`}>
          <div className="flex justify-between items-center w-full px-8 py-4 gap-8">
            {/* Left Section */}
            <div className="flex items-center gap-8">
              <h1 className="text-lg font-black uppercase text-on-surface">CMS Diablada Pillareña</h1>
              <nav className="hidden md:flex gap-6">
                <a href="/" className="text-secondary border-b-2 border-secondary pb-1 text-sm font-bold hover:opacity-80">Inicio</a>
                <a href="/history" className="text-on-surface-variant hover:text-on-surface text-sm font-bold transition-all">Historia</a>
                <a href="/art" className="text-on-surface-variant hover:text-on-surface text-sm font-bold transition-all">Arte</a>
                <a href="/music" className="text-on-surface-variant hover:text-on-surface text-sm font-bold transition-all">Música</a>
                <a href="/info" className="text-on-surface-variant hover:text-on-surface text-sm font-bold transition-all">Información</a>
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">
              {/* Search */}
              <div className="relative flex items-center bg-surface-container-high/50 rounded-full px-4 py-2 hidden md:flex">
                <Search className="w-4 h-4 text-on-surface-variant" />
                <input
                  type="text"
                  placeholder="Buscar recursos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent border-none focus:ring-0 text-sm placeholder-on-surface-variant/50 w-48 ml-2"
                />
              </div>

              {/* Icons */}
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant hover:text-on-surface">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-surface-container-high rounded-full transition-colors text-on-surface-variant hover:text-on-surface">
                <HelpCircle className="w-5 h-5" />
              </button>

              {/* Save Draft Button */}
              <button className="px-4 py-2 bg-transparent border border-outline-variant text-on-surface text-xs font-bold rounded-full hover:bg-surface-container-high transition-all">
                Guardar Borrador
              </button>

              {/* Profile Image */}
              <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-secondary bg-surface-container">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCuFdELWGwAarYLk3ExSKPn0isG2Gw7flntJiVGPozDUUn0AUOQYICjzwWS6FL4bkquNKauZYTKpInf-PyiHuIqLsydSab_1slvbQCzmN3xkrzh6HogRJ1nNBQ0gR4v9iASalA6otcQWaeFgVf54_sT5DzXtd9WwhrYU45naUBOFKVO5stvfxKBwuS67jC-BHfLbaQuy8ns_Py4Pl4RY0MDfgKdpM6g-jPnHacf4BwV35XyCcADpAgkv7LW9s6dD4JJVo_CEph2UWg"
                  alt="Admin"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="mt-20 p-8 min-h-screen bg-surface-dim overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
