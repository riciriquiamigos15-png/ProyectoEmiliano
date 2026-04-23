import React from 'react';
import { TrendingUp, FileText, Image, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  const sections = [
    { name: 'Inicio', desc: 'Gestión de Página de Inicio', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDgYucgRG3rPQ5HIdifnfowr8hwnc-C6u2pdyCm3ily-x0ZZ8NVcK5cSOf0uWiZhZmOxuWKRI-Q2m8Ol0GqM7dDCVSGLM_jcY23sGlb9MU62nS3FUBKgHt5TbzUAD7RqtpN2PnrZO27VhvTtQ8T-jIjO6kkm1ewLF_a83A8OeKoJiJ8S6l10JbbHnmfe6b74qBPHU9kVGk4GxhSlgFfSDxmAB2KSlV5Jop71jrgKl7l2Ph0bsf8K9rPUhRDmtDl3MITO-uKoO9Bf50' },
    { name: 'Historia', desc: 'Cronología y Archivos', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFlBQiiiULWx3R4TVJbn66u1Vy_a3VDoh9UBvhdQ14AJ7A5BB8JmBzx02H2x2NqjJSj4JEZQbV2J7Bb1oKobRuSSzWUz2y_fhJxFBVTnGLgMnKUYWCwtHa6_nqX__V5O7ZBZjvlB0c0pHblT6F0Mq-EApcjVPE4SEsY8MNGuRayvAvabXQK3m06Pv5AQWkgVprABgdfcX6Ac72M8kCq3FCT-u98TxFE6ErcLMP4pqcuASxWV-1fKTZieBiADsVpzdKy6XrWM6ZweQ' },
    { name: 'Arte', desc: 'Galería de Caretas y Artesanía', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAR8NDV-2PPiP6Fq-T8mneIqJbXx_M1w8Ht9l5uBtUJ12SCga3h3T0a1NTnUTr99Hm_DmNTGf1gNtq1Aevpyxi7xQHxRIAwON2_aIHyqhAdvjAt8iuIFoB5UouFhlR10ZmtK0IBWoNm5DINzLrXDr8O1MsSj1noOKhLHj7v1zmsLaOfqK5a2esVcUkdza5ai3LZZeR4rR_cTJg_PvwILK1sQcjM9pyYBabmcw0_41FEsBq3OzPJOzGTyL-SqfJZ3MYpQlj8ntjDMlA' },
    { name: 'Música', desc: 'Biblioteca de Audio y Ritmos', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfMPANDik6_HZlhHolYUimDd0W-1IxkIEwXqPGil4WIoewVB8Awe0kPfk0HhGjpEPl_cTPSt-WVrC4wQCFPOvq15xLE4o2XSk1EY8j0Ugnx7tz7XMAl5lk-hvkU-lclEgwvfkISexrKyM1bOaN4v4qkC4xhH2DVWElwQWrjFxDWvWh8XDoa5tjk8QFOTOFampKIOlHal4quwoaqny5wXxrdd8F3rSGasND7pHSj8GpgYmSdmlHDPHRGSsu5XBWmG9481_UbA_nrE4' },
    { name: 'Información', desc: 'Guías de Visitantes y Preguntas Frecuentes', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_0MIhTSNI6XsgVq2jlscC6DIrrluxJj9r0BcFvUdfyKCkGQTM-LdHfUYwJlDKRRsR57Q72o9wNzURfPUC3vU4GScaSCx_60Ci6fFGNeH5MJuPtSeiOpD8i56aTr7vAB_kdDlsTEuUBneDtSYlamMHGv_uy948AYb5c7jmgMbB1bJ-gcSl-kNHbOeEjBjoMzhK-mDgg6M6FKrd8cpq7vzhxdg4mPj8WDKaIl5dWVrYLaZyeHmLkqWbscscao5KE7SvC-7ASBZZTX8' },
  ];

  const stats = [
    { label: 'Visitas Mensuales', value: '12.4K', change: '+18%', color: 'border-primary' },
    { label: 'Cargas Multimedia', value: '342', desc: 'Archivos', color: 'border-secondary' },
    { label: 'Ediciones Pendientes', value: '07', desc: 'Borradores', color: 'border-primary' },
    { label: 'Usuarios Activos', value: '04', desc: 'Editores', color: 'border-secondary' },
  ];

  return (
    <div className="space-y-12">
      {/* Welcome Hero */}
      <section className="relative overflow-hidden rounded-xl p-12 bg-surface-container-low border border-outline-variant/10">
        <div className="relative z-10 max-w-2xl">
          <span className="text-secondary font-bold tracking-widest uppercase text-xs mb-4 block">Resumen del Panel</span>
          <h1 className="text-5xl font-black text-on-surface leading-tight mb-4 tracking-tighter">Controla el Ritual.</h1>
          <p className="text-on-surface-variant text-lg leading-relaxed font-medium">Gestiona la presencia digital de la Diablada Pillareña. Actualiza contenido, monitorea enganche y refina la narrativa cultural.</p>
        </div>
        <div className="absolute right-0 top-0 w-1/3 h-full opacity-20">
          <img
            className="w-full h-full object-cover rounded-l-3xl"
            src="/contenido/inicio/Inicio_4.jpg"
            alt="Imagen ritual de inicio"
          />
        </div>
      </section>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-surface-container-low p-6 rounded-xl border-l-4 ${stat.color}`}>
            <span className="text-on-surface-variant text-xs font-bold uppercase tracking-wider mb-2 block">{stat.label}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-on-surface">{stat.value}</span>
              <span className={`text-sm font-bold ${stat.change ? 'text-secondary' : 'text-on-surface-variant'}`}>
                {stat.change || stat.desc}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Editorial Sections */}
        <div className="lg:col-span-8">
          <h2 className="text-2xl font-bold text-on-surface mb-6 flex items-center gap-3">
            <FileText className="w-6 h-6 text-secondary" />
            Secciones Editorial
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {sections.map((section, i) => (
              <Link
                key={i}
                to={`/admin/sections/${section.name.toLowerCase()}`}
                className="group relative aspect-video rounded-xl overflow-hidden bg-surface-container-highest transition-all hover:scale-[1.02] cursor-pointer"
              >
                <img
                  className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity"
                  src={section.img}
                  alt={section.name}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end text-left">
                  <span className="text-on-surface font-bold text-lg">{section.name}</span>
                  <span className="text-on-surface-variant text-xs">{section.desc}</span>
                </div>
              </Link>
            ))}
            <button className="flex flex-col items-center justify-center border-2 border-dashed border-outline-variant/30 rounded-xl hover:border-secondary transition-colors group">
              <Plus className="w-6 h-6 text-outline-variant group-hover:text-secondary mb-2" />
              <span className="text-xs font-bold text-outline-variant group-hover:text-secondary uppercase tracking-widest">Nueva Página</span>
            </button>
          </div>
        </div>

        {/* Global Styles */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-surface-container-high rounded-xl p-8 border border-outline-variant/10">
            <h2 className="text-xl font-bold text-on-surface mb-6 flex items-center gap-3">
              <span className="material-symbols-outlined text-secondary">palette</span>
              Estilos Globales
            </h2>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-3">Tipografía Primaria</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="py-2 bg-surface-container-highest border-2 border-secondary rounded-lg text-xs font-bold text-secondary">Epílogo</button>
                  <button className="py-2 bg-surface-container border border-outline-variant/30 rounded-lg text-xs font-bold text-on-surface-variant hover:border-secondary transition-all">Manrope</button>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-3">Paleta de Temas</label>
                <div className="space-y-2">
                  {[
                    { name: 'Fuego Ritual', color: 'bg-primary-container' },
                    { name: 'Oro Sagrado', color: 'bg-secondary' },
                    { name: 'Obsidiana', color: 'bg-surface-bright' },
                  ].map((theme, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-surface-container rounded-lg border border-outline-variant/20 hover:border-secondary transition-all cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`h-4 w-4 rounded-full ${theme.color}`}></div>
                        <span className="text-sm font-medium">{theme.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <Link
                to="/admin/styles"
                className="w-full py-3 border border-secondary text-secondary font-bold rounded-lg text-sm hover:bg-secondary/10 transition-colors text-center"
              >
                Abrir Editor de Temas
              </Link>
            </div>
          </div>

          {/* Live Status */}
          <div className="bg-gradient-to-br from-primary-container to-error rounded-xl p-8 text-on-primary-container relative overflow-hidden">
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-9xl opacity-10">warning</span>
            <h3 className="text-xl font-bold mb-2">Estado en Vivo</h3>
            <p className="text-sm mb-6 opacity-90 leading-relaxed">El sitio principal está actualmente en vivo. Tienes 7 cambios no publicados que afectarán la interfaz frontal.</p>
            <button className="px-6 py-2 bg-on-primary-container text-primary-container font-black rounded-lg text-sm uppercase tracking-tighter hover:opacity-90">
              Desplegar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
