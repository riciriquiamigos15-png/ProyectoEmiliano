import React, { useState, useEffect } from 'react';
import { Save, Eye, Check, Upload, Image as ImageIcon } from 'lucide-react';

interface ImageData {
  name: string;
  path: string;
  url: string;
}

export default function HomeEditor() {
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [publishStatus, setPublishStatus] = useState<'borrador' | 'revision' | 'publicado'>('borrador');
  const [activeImageSelector, setActiveImageSelector] = useState<string | null>(null);
  const [availableImages, setAvailableImages] = useState<ImageData[]>([]);
  const [loadingImages, setLoadingImages] = useState(false);

  const [formData, setFormData] = useState({
    heroTitle: 'EL RITUAL',
    heroTitleHighlight: 'DEL FUEGO',
    heroSubtitle: 'Tradición Milenaria',
    heroDescription: 'Sumérgete en la danza frenética de los diablos. Una explosión de arte, música y herencia que late en el corazón de los Andes.',
    heroImage: 'contenido/inicio/Inicio_1.jpg',
    welcomeTitle: 'La Sangre de una',
    welcomeTitleHighlight: 'Tierra Indomable',
    welcomeDescription: 'Píllaro no solo celebra una fiesta; revive su identidad. La Diablada es el grito de libertad de un pueblo que transformó la sátira en arte y el movimiento en resistencia cultural.',
    welcomeImage: 'contenido/inicio/Inicio_2.jpg',
    historyTitle: 'HISTORIA',
    historyImage: 'contenido/inicio/Inicio_3.jpg',
    artTitle: 'ARTE',
    artImage: 'contenido/inicio/Inicio_4.jpg',
    musicTitle: 'MÚSICA',
    musicImage: 'contenido/musica/Banda_Pillaro.png',
    infoTitle: 'INFORMACIÓN',
    infoImage: 'contenido/informacion/Danza_1.jpg',
  });

  useEffect(() => {
    if (activeImageSelector) {
      loadAvailableImages();
    }
  }, [activeImageSelector]);

  const loadAvailableImages = async () => {
    setLoadingImages(true);
    setAvailableImages([
      { name: 'Inicio_1.jpg', path: 'contenido/inicio/Inicio_1.jpg', url: '/contenido/inicio/Inicio_1.jpg' },
      { name: 'Inicio_2.jpg', path: 'contenido/inicio/Inicio_2.jpg', url: '/contenido/inicio/Inicio_2.jpg' },
      { name: 'Inicio_3.jpg', path: 'contenido/inicio/Inicio_3.jpg', url: '/contenido/inicio/Inicio_3.jpg' },
      { name: 'Inicio_4.jpg', path: 'contenido/inicio/Inicio_4.jpg', url: '/contenido/inicio/Inicio_4.jpg' },
      { name: 'Inicio_5.jpg', path: 'contenido/inicio/Inicio_5.jpg', url: '/contenido/inicio/Inicio_5.jpg' },
    ]);
    setLoadingImages(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageSelect = (image: ImageData) => {
    if (activeImageSelector) {
      handleInputChange(activeImageSelector, image.path);
      setActiveImageSelector(null);
    }
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('success');
      setPublishStatus('revision');
      
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => {
        setSaveStatus('idle');
      }, 2000);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-black text-on-surface mb-2">Editar: Inicio</h1>
          <p className="text-on-surface-variant">Gestión de Página de Inicio</p>
        </div>
        <button
          onClick={handleSaveChanges}
          disabled={isSaving}
          className={`px-8 py-4 rounded-lg font-bold flex items-center gap-2 transition-all ${
            saveStatus === 'success'
              ? 'bg-green-600 text-white'
              : 'bg-red-600 text-white hover:opacity-90'
          } disabled:opacity-50`}
        >
          {saveStatus === 'saving' && (
            <>
              <div className="animate-spin">⟳</div>
              Guardando...
            </>
          )}
          {saveStatus === 'success' && (
            <>
              <Check className="w-5 h-5" />
              Cambios Guardados
            </>
          )}
          {(saveStatus === 'idle' || saveStatus === 'error') && (
            <>
              <Save className="w-5 h-5" />
              Guardar Cambios
            </>
          )}
        </button>
      </div>

      {/* Image Selector Modal */}
      {activeImageSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-surface-container-low rounded-xl max-w-4xl w-full max-h-[80vh] overflow-y-auto p-8 border border-outline-variant/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-on-surface">Seleccionar Imagen</h3>
              <button
                onClick={() => setActiveImageSelector(null)}
                className="text-on-surface-variant hover:text-on-surface text-2xl"
              >
                ✕
              </button>
            </div>

            {loadingImages ? (
              <p className="text-on-surface-variant">Cargando imágenes...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {availableImages.map((image) => (
                  <button
                    key={image.name}
                    onClick={() => handleImageSelect(image)}
                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                      formData[activeImageSelector as keyof typeof formData] === image.path
                        ? 'border-secondary'
                        : 'border-outline-variant/20'
                    } hover:border-secondary group`}
                  >
                    <div className="relative aspect-square bg-surface-container overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                      <span className="text-white font-bold opacity-0 group-hover:opacity-100 text-center px-2 text-sm">
                        {image.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Panel Izquierda */}
        <div className="lg:col-span-1 space-y-6 max-h-screen overflow-y-auto">
          {/* Estado */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
            <h3 className="text-lg font-bold text-on-surface mb-4">Estado</h3>
            <div className="space-y-2">
              {[
                { id: 'borrador', label: 'Borrador' },
                { id: 'revision', label: 'En Revisión' },
                { id: 'publicado', label: 'Publicado' },
              ].map(s => (
                <label key={s.id} className="flex items-center gap-2 p-2 cursor-pointer">
                  <input
                    type="radio"
                    checked={publishStatus === s.id}
                    onChange={() => setPublishStatus(s.id as any)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-bold text-on-surface">{s.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hero */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 space-y-4">
            <h3 className="text-lg font-bold text-on-surface mb-4">🎭 Hero</h3>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Título 1</label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => handleInputChange('heroTitle', e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Título 2 (Rojo)</label>
              <input
                type="text"
                value={formData.heroTitleHighlight}
                onChange={(e) => handleInputChange('heroTitleHighlight', e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Subtítulo</label>
              <input
                type="text"
                value={formData.heroSubtitle}
                onChange={(e) => handleInputChange('heroSubtitle', e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Descripción</label>
              <textarea
                value={formData.heroDescription}
                onChange={(e) => handleInputChange('heroDescription', e.target.value)}
                rows={2}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary resize-none"
              />
            </div>
            <button
              onClick={() => setActiveImageSelector('heroImage')}
              className="w-full bg-surface-container border border-secondary/30 rounded-lg px-3 py-2 text-secondary hover:bg-secondary/10 font-bold text-sm flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Cambiar Imagen
            </button>
          </div>

          {/* Bienvenida */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 space-y-4">
            <h3 className="text-lg font-bold text-on-surface mb-4">🎉 Bienvenida</h3>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Título 1</label>
              <input
                type="text"
                value={formData.welcomeTitle}
                onChange={(e) => handleInputChange('welcomeTitle', e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Título 2</label>
              <input
                type="text"
                value={formData.welcomeTitleHighlight}
                onChange={(e) => handleInputChange('welcomeTitleHighlight', e.target.value)}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-secondary uppercase mb-1">Descripción</label>
              <textarea
                value={formData.welcomeDescription}
                onChange={(e) => handleInputChange('welcomeDescription', e.target.value)}
                rows={3}
                className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary resize-none"
              />
            </div>
            <button
              onClick={() => setActiveImageSelector('welcomeImage')}
              className="w-full bg-surface-container border border-secondary/30 rounded-lg px-3 py-2 text-secondary hover:bg-secondary/10 font-bold text-sm flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Cambiar Imagen
            </button>
          </div>

          {/* Tarjetas */}
          <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20 space-y-4">
            <h3 className="text-lg font-bold text-on-surface mb-4">📚 Tarjetas</h3>
            
            {[
              { field: 'historyTitle', img: 'historyImage', label: 'Historia' },
              { field: 'artTitle', img: 'artImage', label: 'Arte' },
              { field: 'musicTitle', img: 'musicImage', label: 'Música' },
              { field: 'infoTitle', img: 'infoImage', label: 'Información' },
            ].map((item, i) => (
              <div key={i} className={i > 0 ? 'pt-4 border-t border-outline-variant/20' : ''}>
                <label className="block text-xs font-bold text-secondary uppercase mb-1">{item.label}</label>
                <input
                  type="text"
                  value={formData[item.field as keyof typeof formData]}
                  onChange={(e) => handleInputChange(item.field, e.target.value)}
                  className="w-full bg-surface-container border border-outline-variant/30 rounded-lg px-3 py-2 text-on-surface focus:outline-none focus:border-secondary mb-2"
                />
                <button
                  onClick={() => setActiveImageSelector(item.img)}
                  className="w-full bg-surface-container border border-secondary/30 rounded-lg px-3 py-2 text-secondary hover:bg-secondary/10 font-bold text-sm flex items-center justify-center gap-2"
                >
                  <ImageIcon className="w-4 h-4" />
                  Imagen
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Preview Derecha */}
        <div className="lg:col-span-2">
          <div className="bg-surface-container-low rounded-xl border border-outline-variant/20 overflow-hidden sticky top-8">
            <div className="flex items-center gap-2 px-6 py-4 border-b border-outline-variant/20 bg-surface-container-high">
              <Eye className="w-5 h-5 text-secondary" />
              <h3 className="font-bold text-on-surface">Preview</h3>
            </div>
            <div className="p-6 space-y-8 max-h-[calc(100vh-300px)] overflow-y-auto">
              {/* Hero */}
              <div className="relative h-80 rounded-xl overflow-hidden bg-gradient-to-b from-background to-surface">
                <img src={formData.heroImage} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent flex flex-col justify-center items-center p-8 text-center">
                  <span className="inline-block px-4 py-1 mb-6 text-secondary font-bold text-xs uppercase bg-secondary/10 rounded-full">
                    {formData.heroSubtitle}
                  </span>
                  <h2 className="text-5xl font-black text-on-surface mb-4">
                    {formData.heroTitle} <br/>
                    <span className="text-red-500">{formData.heroTitleHighlight}</span>
                  </h2>
                  <p className="text-on-surface-variant max-w-md text-sm">{formData.heroDescription}</p>
                </div>
              </div>

              {/* Bienvenida */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-on-surface">
                    {formData.welcomeTitle} <br/>
                    <span className="text-secondary">{formData.welcomeTitleHighlight}</span>
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed text-sm">{formData.welcomeDescription}</p>
                </div>
                <div className="aspect-square rounded-xl overflow-hidden bg-surface-container-high">
                  <img src={formData.welcomeImage} alt="Welcome" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { img: formData.historyImage, title: formData.historyTitle },
                  { img: formData.artImage, title: formData.artTitle },
                  { img: formData.musicImage, title: formData.musicTitle },
                  { img: formData.infoImage, title: formData.infoTitle },
                ].map((card, i) => (
                  <div key={i} className="relative overflow-hidden rounded-xl h-40 bg-surface-container group">
                    <img src={card.img} alt="Card" className="w-full h-full object-cover opacity-50 group-hover:opacity-70" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4">
                      <h4 className="text-lg font-black text-white">{card.title}</h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
