import React, { useState } from 'react';
import { Save, X } from 'lucide-react';
import { useParams } from 'react-router-dom';

export default function SectionEditor() {
  const { section } = useParams<{ section: string }>();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState(`Editar: ${section?.charAt(0).toUpperCase()}${section?.slice(1)}`);

  const sectionDescriptions: { [key: string]: string } = {
    inicio: 'Edita el contenido de la página de inicio',
    historia: 'Gestiona la narrativa histórica y personajes',
    arte: 'Administra información de artesanos y técnicas',
    música: 'Controla contenido musical y bandas',
    información: 'Actualiza guías turísticas e información general',
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-on-surface mb-2">{title}</h1>
          <p className="text-on-surface-variant">{sectionDescriptions[section || ''] || 'Editar contenido'}</p>
        </div>
        <button className="px-6 py-3 bg-primary-container text-on-primary-container font-bold rounded-lg hover:opacity-90 flex items-center gap-2">
          <Save className="w-5 h-5" />
          Guardar Cambios
        </button>
      </div>

      {/* Editor Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Field */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-3">Título Principal</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface placeholder-on-surface-variant/50 focus:border-secondary focus:outline-none transition-colors"
              placeholder="Ingresa el título"
            />
          </div>

          {/* Content Area */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-3">Contenido Principal</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface placeholder-on-surface-variant/50 focus:border-secondary focus:outline-none transition-colors min-h-[400px] resize-none"
              placeholder="Escribe el contenido aquí..."
            />
            <div className="mt-2 text-xs text-on-surface-variant">
              {content.length} caracteres
            </div>
          </div>

          {/* Media Insert */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
            <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-4">Insertar Medios</label>
            <div className="grid grid-cols-2 gap-4">
              <button className="py-3 border-2 border-dashed border-secondary rounded-lg hover:bg-secondary/10 transition-colors text-secondary font-bold">
                + Agregar Imagen
              </button>
              <button className="py-3 border-2 border-dashed border-secondary rounded-lg hover:bg-secondary/10 transition-colors text-secondary font-bold">
                + Agregar Video
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publishing Options */}
          <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
            <h3 className="text-lg font-bold text-on-surface mb-4">Estado de Publicación</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg">
                <input type="radio" id="draft" name="status" defaultChecked className="w-4 h-4" />
                <label htmlFor="draft" className="text-sm font-medium cursor-pointer">Borrador</label>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg">
                <input type="radio" id="review" name="status" className="w-4 h-4" />
                <label htmlFor="review" className="text-sm font-medium cursor-pointer">En Revisión</label>
              </div>
              <div className="flex items-center gap-3 p-3 bg-surface-container rounded-lg">
                <input type="radio" id="published" name="status" className="w-4 h-4" />
                <label htmlFor="published" className="text-sm font-medium cursor-pointer">Publicado</label>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
            <h3 className="text-lg font-bold text-on-surface mb-4">Metadatos</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-2">SEO Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface text-sm"
                  placeholder="SEO título"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-on-surface-variant uppercase tracking-widest block mb-2">Descripción</label>
                <textarea
                  className="w-full px-3 py-2 bg-surface-container rounded-lg border border-outline-variant/30 text-on-surface text-sm min-h-[100px] resize-none"
                  placeholder="Meta descripción"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-surface-container-high p-6 rounded-xl border border-outline-variant/10">
            <h3 className="text-lg font-bold text-on-surface mb-4">Acciones</h3>
            <div className="space-y-2">
              <button className="w-full py-2 bg-surface-container text-on-surface rounded-lg hover:bg-surface-container-low transition-colors text-sm font-bold">
                Previsualizar
              </button>
              <button className="w-full py-2 border border-error text-error rounded-lg hover:bg-error/10 transition-colors text-sm font-bold">
                Descartar Cambios
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
