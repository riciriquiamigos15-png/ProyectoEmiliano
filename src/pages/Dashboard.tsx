import React from 'react';
import { Link } from 'react-router-dom';
import { 
  History, 
  ImageIcon, 
  FileText, 
  Music, 
  Info, 
  PlusCircle, 
  ArrowUpRight,
  TrendingUp,
  Files,
  Users,
  Palette,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Dashboard() {
  const sections = [
    { label: 'Inicio', icon: FileText, desc: 'Administración de Página Principal', img: 'https://images.unsplash.com/photo-1613946069412-38f7f1ff0b65?q=80&w=600&auto=format&fit=crop' },
    { label: 'Historia', icon: History, desc: 'Línea de Tiempo y Archivos', img: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=600&auto=format&fit=crop' },
    { label: 'Arte', icon: Palette, desc: 'Galería de Máscaras y Artesanía', img: 'https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=600&auto=format&fit=crop' },
    { label: 'Música', icon: Music, desc: 'Biblioteca de Audio y Ritmos', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=600&auto=format&fit=crop' },
    { label: 'Información', icon: Info, desc: 'Guías para Visitantes y Preguntas Frecuentes', img: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=600&auto=format&fit=crop' },
  ];

  return (
    <div className="p-8 space-y-12">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-2xl p-12 bg-surface-container-low border border-white/5">
        <div className="relative z-10 max-w-2xl">
          <span className="text-secondary font-bold tracking-[0.3em] uppercase text-xs mb-4 block">Resumen del Panel</span>
          <h1 className="text-5xl font-black text-on-surface leading-tight mb-4 tracking-tighter font-headline">Controla el Ritual.</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed font-medium">Administra la presencia digital de la Diablada de Píllaro. Actualiza contenido, monitorea participación y refina la narrativa cultural.</p>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=800&auto=format&fit=crop" 
            className="w-full h-full object-cover"
            alt="Devil Mask"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-surface-container-low to-transparent" />
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Visitas Mensuales', value: '12.4K', change: '+18%', icon: TrendingUp, color: 'primary' },
          { label: 'Cargas de Medios', value: '342', change: 'Archivos', icon: ImageIcon, color: 'secondary' },
          { label: 'Ediciones Pendientes', value: '07', change: 'Borradores', icon: Files, color: 'primary' },
          { label: 'Usuarios Activos', value: '04', change: 'Editores', icon: Users, color: 'secondary' },
        ].map((stat) => (
          <div key={stat.label} className="bg-surface-container-low p-6 rounded-xl border-l-4 border-primary">
            <span className="text-on-surface-variant text-[10px] font-black uppercase tracking-[0.2em] mb-3 block">{stat.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-on-surface font-headline">{stat.value}</span>
              <span className={stat.color === 'primary' ? 'text-primary text-xs font-bold' : 'text-secondary text-xs font-bold'}>{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sections Bento */}
        <div className="lg:col-span-8 space-y-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-on-surface flex items-center gap-3 font-headline">
                <FileText className="text-secondary w-6 h-6" />
                Secciones Editoriales
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {sections.map((section) => (
                <Link 
                  key={section.label}
                  to={`/cms/editor/${section.label.toLowerCase()}`}
                  className="group relative h-32 rounded-xl overflow-hidden bg-surface-container-highest transition-all hover:scale-[1.02] border border-white/5"
                >
                  <img src={section.img} className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" alt="" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5 flex flex-col justify-end text-left">
                    <span className="text-on-surface font-bold text-lg font-headline">{section.label}</span>
                    <span className="text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">{section.desc}</span>
                  </div>
                </Link>
              ))}
              <button className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-xl hover:border-secondary transition-colors group aspect-video h-32">
                <PlusCircle className="text-outline-variant group-hover:text-secondary mb-2 w-6 h-6" />
                <span className="text-[10px] font-black uppercase tracking-widest text-outline-variant group-hover:text-secondary">Nueva Página</span>
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-on-surface flex items-center gap-3 font-headline">
                <Video className="text-secondary w-6 h-6" />
                Multimedia Reciente
              </h2>
              <button className="text-xs font-black uppercase tracking-widest text-primary hover:underline">Ver Todo</button>
            </div>
            <div className="space-y-4">
              <div className="bg-surface-container-low p-6 rounded-xl flex gap-6 items-center border border-white/5">
                <div className="h-32 w-24 bg-black rounded-lg flex items-center justify-center relative overflow-hidden group flex-shrink-0">
                  <Video className="text-4xl text-on-surface-variant opacity-20" />
                  <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-0.5 rounded text-[8px] font-black tracking-widest text-white">TIKTOK</div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-on-surface font-headline">La Danza Ritual #Píllaro</h3>
                    <span className="text-[10px] bg-secondary/20 text-secondary px-2 py-1 rounded font-black uppercase tracking-widest">Tendencia</span>
                  </div>
                  <p className="text-sm text-on-surface-variant mb-4">Publicado hace 2 horas • 45.2k Vistas • 1.2k Compartidos</p>
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded-full text-[10px] font-black uppercase tracking-widest hover:opacity-90">Aprobar Inserción</button>
                    <button className="px-4 py-1.5 border border-outline-variant text-on-surface-variant rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-surface-container-highest transition-all">Moderar</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Styles Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-high rounded-xl p-8 border border-white/5">
            <h2 className="text-xl font-bold text-on-surface mb-8 flex items-center gap-3 font-headline uppercase tracking-tight">
              <Palette className="text-secondary w-5 h-5" />
              Estilos Globales
            </h2>
            <div className="space-y-8">
              <div>
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] block mb-4">Tipografía Principal</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 bg-surface-container-highest border-2 border-secondary rounded-lg text-[10px] font-bold text-secondary uppercase tracking-widest">Epilogue</button>
                  <button className="py-2 bg-surface-container border border-white/5 rounded-lg text-[10px] font-bold text-on-surface-variant hover:border-secondary transition-all uppercase tracking-widest">Manrope</button>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] block mb-4">Atmósfera Visual</label>
                <div className="space-y-3">
                  {[
                    { name: 'Fuego Ritual', color: 'bg-primary-container', active: true },
                    { name: 'Oro Sagrado', color: 'bg-secondary', active: false },
                    { name: 'Bruma de Obsidiana', color: 'bg-surface-bright', active: false },
                  ].map((theme) => (
                    <div key={theme.name} className={cn(
                      "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer",
                      theme.active ? "bg-surface-container-highest border-secondary/50" : "bg-surface-container border-transparent hover:border-white/5"
                    )}>
                      <div className="flex items-center gap-3">
                        <div className={cn("h-4 w-4 rounded-full", theme.color)} />
                        <span className="text-sm font-bold">{theme.name}</span>
                      </div>
                      {theme.active && <ArrowUpRight className="w-4 h-4 text-secondary" />}
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full py-3 border border-secondary/30 text-secondary font-black uppercase tracking-widest text-[10px] rounded-lg hover:bg-secondary/10 transition-colors">
                Abrir Editor de Tema
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-container to-red-950 rounded-xl p-8 text-on-primary-container relative overflow-hidden group">
            <TrendingUp className="absolute -right-4 -bottom-4 text-9xl opacity-5 rotate-12 transition-transform group-hover:scale-110" />
            <h3 className="text-xl font-black font-headline mb-2 uppercase tracking-tight">Estado en Vivo</h3>
            <p className="text-sm mb-6 opacity-80 leading-relaxed font-medium">El sitio principal está en vivo. Tienes 7 cambios sin publicar que afectarán el frontend.</p>
            <button className="px-6 py-2 bg-on-primary-container text-primary-container font-black rounded-lg text-[10px] uppercase tracking-widest hover:opacity-90">Publicar Ahora</button>
          </div>
        </div>
      </div>
    </div>
  );
}
