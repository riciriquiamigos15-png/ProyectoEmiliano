import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Check,
  Download,
  Eye,
  FileText,
  ImagePlus,
  Layers3,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
  defaultHistoryEditorContent,
  fetchHistoryEditorContent,
  HISTORY_EDITOR_UPDATED_EVENT,
  readHistoryEditorContent,
  resetHistoryEditorContent,
  saveHistoryEditorContent,
  type EditableHistoryCharacter,
  type HistoryEditorContent,
  type HistoryGeneralContent,
} from '@/lib/historyEditorContent';
import { getDefaultInteractiveAspectRatio, readImageAspectRatio } from '@/lib/imageAspectRatio';
import { type HistoryHotspot } from '@/lib/historyHotspots';

type EditorSection = 'general' | 'characters' | 'interaction';

function clampPosition(value: number) {
  return Math.min(100, Math.max(0, Number(value.toFixed(2))));
}

function cloneContent(content: HistoryEditorContent): HistoryEditorContent {
  return {
    general: { ...content.general },
    characters: content.characters.map((character) => ({
      ...character,
      hotspots: character.hotspots.map((hotspot) => ({ ...hotspot })),
    })),
  };
}

function toSlug(value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
        return;
      }

      reject(new Error('No se pudo leer el archivo.'));
    };
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

function loadImageElement(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('No se pudo procesar la imagen.'));
    image.src = source;
  });
}

async function compressImageForStorage(file: File) {
  const originalDataUrl = await readFileAsDataUrl(file);

  if (!file.type.startsWith('image/')) {
    return originalDataUrl;
  }

  const image = await loadImageElement(originalDataUrl);
  const maxDimension = 1600;
  const scale = Math.min(1, maxDimension / Math.max(image.width, image.height));
  const width = Math.max(1, Math.round(image.width * scale));
  const height = Math.max(1, Math.round(image.height * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext('2d');
  if (!context) {
    return originalDataUrl;
  }

  context.drawImage(image, 0, 0, width, height);

  const compressedDataUrl = canvas.toDataURL('image/webp', 0.82);
  return compressedDataUrl.length < originalDataUrl.length ? compressedDataUrl : originalDataUrl;
}

export default function HistoryEditor() {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const detailFileInputRef = useRef<HTMLInputElement | null>(null);
  const interactionFileInputRef = useRef<HTMLInputElement | null>(null);
  const selectedCharacterIdRef = useRef<string>(defaultHistoryEditorContent.characters[0].id);
  const selectedHotspotIdRef = useRef<string>(defaultHistoryEditorContent.characters[0].hotspots[0].id);
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState<HistoryEditorContent>(() => readHistoryEditorContent());
  const [selectedCharacterId, setSelectedCharacterId] = useState<string>(defaultHistoryEditorContent.characters[0].id);
  const [selectedHotspotId, setSelectedHotspotId] = useState<string>(defaultHistoryEditorContent.characters[0].hotspots[0].id);
  const [draggingHotspotId, setDraggingHotspotId] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [interactiveAspectRatio, setInteractiveAspectRatio] = useState<string>(getDefaultInteractiveAspectRatio(defaultHistoryEditorContent.characters[0].id));

  const currentTab = searchParams.get('tab');
  const editorSection: EditorSection = currentTab === 'characters' || currentTab === 'interaction' ? currentTab : 'general';

  const selectedCharacter = useMemo(() => {
    return content.characters.find((character) => character.id === selectedCharacterId) ?? content.characters[0];
  }, [content.characters, selectedCharacterId]);

  const selectedHotspot = useMemo(() => {
    return selectedCharacter.hotspots.find((hotspot) => hotspot.id === selectedHotspotId) ?? selectedCharacter.hotspots[0];
  }, [selectedCharacter, selectedHotspotId]);

  useEffect(() => {
    let isMounted = true;

    const loadAspectRatio = async () => {
      const fallback = getDefaultInteractiveAspectRatio(selectedCharacter.id);
      const nextAspectRatio = await readImageAspectRatio(selectedCharacter.detailImg ?? selectedCharacter.img, fallback);
      if (isMounted) {
        setInteractiveAspectRatio(nextAspectRatio);
      }
    };

    loadAspectRatio();

    return () => {
      isMounted = false;
    };
  }, [selectedCharacter.id, selectedCharacter.detailImg, selectedCharacter.img]);

  useEffect(() => {
    selectedCharacterIdRef.current = selectedCharacterId;
  }, [selectedCharacterId]);

  useEffect(() => {
    selectedHotspotIdRef.current = selectedHotspotId;
  }, [selectedHotspotId]);

  useEffect(() => {
    let isMounted = true;

    const syncHistoryContent = async () => {
      const nextContent = await fetchHistoryEditorContent();
      if (!isMounted) {
        return;
      }

      setContent(nextContent);
      const nextCharacter = nextContent.characters.find((character) => character.id === selectedCharacterIdRef.current) ?? nextContent.characters[0];
      const nextHotspotId = nextCharacter?.hotspots.find((hotspot) => hotspot.id === selectedHotspotIdRef.current)?.id ?? nextCharacter?.hotspots[0]?.id ?? '';

      setSelectedCharacterId(nextCharacter?.id ?? '');
      setSelectedHotspotId(nextHotspotId);
    };

    syncHistoryContent();
    window.addEventListener(HISTORY_EDITOR_UPDATED_EVENT, syncHistoryContent);

    return () => {
      isMounted = false;
      window.removeEventListener(HISTORY_EDITOR_UPDATED_EVENT, syncHistoryContent);
    };
  }, []);

  useEffect(() => {
    if (!draggingHotspotId) {
      return;
    }

    const handlePointerMove = (event: PointerEvent) => {
      updateHotspotFromPointer(draggingHotspotId, event.clientX, event.clientY);
    };

    const handlePointerUp = () => {
      setDraggingHotspotId(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [draggingHotspotId, selectedCharacterId]);

  function updateGeneralField(field: keyof HistoryGeneralContent, value: string) {
    setContent((currentContent) => ({
      ...currentContent,
      general: {
        ...currentContent.general,
        [field]: value,
      },
    }));
  }

  function updateCharacter(characterId: string, updater: (character: EditableHistoryCharacter) => EditableHistoryCharacter) {
    setContent((currentContent) => ({
      ...currentContent,
      characters: currentContent.characters.map((character) => {
        if (character.id !== characterId) {
          return character;
        }

        return updater(character);
      }),
    }));
  }

  function updateCharacterField(field: keyof EditableHistoryCharacter, value: string | boolean) {
    updateCharacter(selectedCharacter.id, (character) => ({
      ...character,
      [field]: value,
    }));
  }

  function updateHotspot(hotspotId: string, updater: (hotspot: HistoryHotspot) => HistoryHotspot) {
    updateCharacter(selectedCharacter.id, (character) => ({
      ...character,
      hotspots: character.hotspots.map((hotspot) => hotspot.id === hotspotId ? updater(hotspot) : hotspot),
    }));
  }

  function updateHotspotField(field: keyof HistoryHotspot, value: string | number) {
    if (!selectedHotspot) {
      return;
    }

    updateHotspot(selectedHotspot.id, (hotspot) => ({
      ...hotspot,
      [field]: value,
    }));
  }

  function updateHotspotFromPointer(hotspotId: string, clientX: number, clientY: number) {
    const previewElement = previewRef.current;
    if (!previewElement) {
      return;
    }

    const bounds = previewElement.getBoundingClientRect();
    const nextX = clampPosition(((clientX - bounds.left) / bounds.width) * 100);
    const nextY = clampPosition(((clientY - bounds.top) / bounds.height) * 100);

    updateHotspot(hotspotId, (hotspot) => ({
      ...hotspot,
      x: nextX,
      y: nextY,
    }));
  }

  function handleCharacterChange(characterId: string) {
    const nextCharacter = content.characters.find((character) => character.id === characterId);
    if (!nextCharacter) {
      return;
    }

    setSelectedCharacterId(characterId);
    setSelectedHotspotId(nextCharacter.hotspots[0]?.id ?? '');
  }

  function handleCanvasClick(event: React.MouseEvent<HTMLDivElement>) {
    if (!selectedHotspot) {
      return;
    }

    updateHotspotFromPointer(selectedHotspot.id, event.clientX, event.clientY);
  }

  function handlePointerDown(hotspotId: string, event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    setSelectedHotspotId(hotspotId);
    setDraggingHotspotId(hotspotId);
    updateHotspotFromPointer(hotspotId, event.clientX, event.clientY);
  }

  async function handleImageUpload(field: 'img' | 'detailImg', file: File | null) {
    if (!file) {
      return;
    }

    try {
      const result = await compressImageForStorage(file);
      updateCharacterField(field, result);
      setStatusType('success');
      setStatusMessage('Imagen cargada en el editor. Ahora pulsa Guardar historia para publicar el cambio.');
    } catch {
      setStatusType('error');
      setStatusMessage('No se pudo procesar la imagen seleccionada.');
    }
  }

  function handleSectionChange(section: EditorSection) {
    setSearchParams({ tab: section });
  }

  function handleDownloadInteractiveImage() {
    const imageUrl = selectedCharacter.detailImg ?? selectedCharacter.img;
    if (typeof window === 'undefined' || !imageUrl) {
      return;
    }

    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `${selectedCharacter.id}-interactivo`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function addHotspot() {
    const nextIndex = selectedCharacter.hotspots.length + 1;
    const label = `Nuevo punto ${nextIndex}`;
    const nextHotspot: HistoryHotspot = {
      id: `${toSlug(label)}-${Date.now()}`,
      label,
      title: label,
      description: 'Descripcion breve del nuevo elemento.',
      x: 50,
      y: 50,
    };

    updateCharacter(selectedCharacter.id, (character) => ({
      ...character,
      hotspots: [...character.hotspots, nextHotspot],
    }));
    setSelectedHotspotId(nextHotspot.id);
  }

  function removeSelectedHotspot() {
    if (!selectedHotspot || selectedCharacter.hotspots.length <= 1) {
      return;
    }

    const remainingHotspots = selectedCharacter.hotspots.filter((hotspot) => hotspot.id !== selectedHotspot.id);
    updateCharacter(selectedCharacter.id, (character) => ({
      ...character,
      hotspots: remainingHotspots,
    }));
    setSelectedHotspotId(remainingHotspots[0].id);
  }

  async function handleSave() {
    const saved = await saveHistoryEditorContent(content);
    if (saved) {
      setStatusType('success');
      setStatusMessage('Historia actualizada. La vista publica ya usa este contenido en cualquier navegador.');
      return;
    }

    setStatusType('error');
    setStatusMessage('No se pudo guardar en el servidor. Verifica que la API este ejecutandose.');
  }

  function handleReset() {
    const fallback = cloneContent(defaultHistoryEditorContent);
    setContent(fallback);
    setSelectedCharacterId(fallback.characters[0].id);
    setSelectedHotspotId(fallback.characters[0].hotspots[0].id);
    setStatusType('success');
    setStatusMessage('Editor restablecido a los valores base. Guarda para publicar esta version.');
  }

  async function handleClearSaved() {
    const resetWorked = await resetHistoryEditorContent();
    if (!resetWorked) {
      setStatusType('error');
      setStatusMessage('No se pudo borrar el contenido guardado en el servidor.');
      return;
    }

    const fallback = cloneContent(defaultHistoryEditorContent);
    setContent(fallback);
    setSelectedCharacterId(fallback.characters[0].id);
    setSelectedHotspotId(fallback.characters[0].hotspots[0].id);
    setStatusType('success');
    setStatusMessage('Se eliminaron los cambios guardados de Historia.');
  }

  const sectionTabs = [
    { id: 'general' as const, label: 'Editar Contenido General', icon: FileText },
    { id: 'characters' as const, label: 'Editar Personajes', icon: Sparkles },
    { id: 'interaction' as const, label: 'Sección del Sitio', icon: Layers3 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="space-y-3">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-secondary">Admin / Editar Historia</p>
          <div>
            <h1 className="text-4xl font-black text-on-surface">Módulo de Historia</h1>
            <p className="mt-2 max-w-3xl text-on-surface-variant">
              Gestiona contenido general, personajes y la interacción del personaje sin tocar código.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <a
            href="/history"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-on-surface hover:bg-surface-container-high"
          >
            <Eye className="h-4 w-4" />
            Ver historia pública
          </a>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-5 py-3 text-xs font-black uppercase tracking-[0.2em] text-surface hover:brightness-110"
          >
            <Save className="h-4 w-4" />
            Guardar historia
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className={`flex items-center gap-3 rounded-2xl px-5 py-4 text-sm ${statusType === 'error' ? 'border border-error/30 bg-error/10 text-on-surface' : 'border border-secondary/30 bg-secondary/10 text-on-surface'}`}>
          <Check className={`h-5 w-5 ${statusType === 'error' ? 'text-error' : 'text-secondary'}`} />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="flex flex-wrap gap-3">
        {sectionTabs.map((tab) => {
          const Icon = tab.icon;
          const active = editorSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleSectionChange(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition-colors ${active ? 'border-secondary bg-secondary text-surface' : 'border-outline-variant bg-surface text-on-surface-variant hover:border-secondary hover:text-on-surface'}`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {editorSection === 'general' && (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1.35fr)_360px]">
          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-on-surface">Editar Contenido General</h2>
              <p className="mt-2 text-on-surface-variant">Modifica títulos, descripciones y textos principales de la sección Historia.</p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Etiqueta superior</label>
                <input value={content.general.badge} onChange={(event) => updateGeneralField('badge', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título secundario</label>
                <input value={content.general.titleAccent} onChange={(event) => updateGeneralField('titleAccent', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título principal</label>
                <input value={content.general.title} onChange={(event) => updateGeneralField('title', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Descripción hero</label>
                <textarea value={content.general.description} onChange={(event) => updateGeneralField('description', event.target.value)} className="min-h-28 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título de narrativa</label>
                <input value={content.general.sectionTitle} onChange={(event) => updateGeneralField('sectionTitle', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Párrafo 1</label>
                <textarea value={content.general.paragraph1} onChange={(event) => updateGeneralField('paragraph1', event.target.value)} className="min-h-28 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Párrafo 2</label>
                <textarea value={content.general.paragraph2} onChange={(event) => updateGeneralField('paragraph2', event.target.value)} className="min-h-28 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Cita destacada</label>
                <textarea value={content.general.quote} onChange={(event) => updateGeneralField('quote', event.target.value)} className="min-h-24 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Párrafo 3</label>
                <textarea value={content.general.paragraph3} onChange={(event) => updateGeneralField('paragraph3', event.target.value)} className="min-h-28 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <Settings2 className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Bloque protagonistas</p>
                  <h2 className="text-xl font-black text-on-surface">Textos del módulo interactivo</h2>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  ['protagonistsEyebrow', 'Etiqueta superior'],
                  ['protagonistsTitle', 'Título'],
                  ['protagonistsSubtitle', 'Subtítulo'],
                  ['protagonistsHint', 'Ayuda de interacción'],
                  ['protagonistsListTitle', 'Título de lista'],
                  ['protagonistsDetailTitle', 'Título de anatomía'],
                  ['protagonistsOpenButton', 'Botón abrir'],
                  ['protagonistsCloseButton', 'Botón cerrar'],
                  ['ctaTitle', 'Título CTA'],
                  ['ctaButton', 'Botón CTA'],
                ].map(([field, label]) => (
                  <div key={field}>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">{label}</label>
                    <input
                      value={content.general[field as keyof HistoryGeneralContent] as string}
                      onChange={(event) => updateGeneralField(field as keyof HistoryGeneralContent, event.target.value)}
                      className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Descripción CTA</label>
                  <textarea value={content.general.ctaDescription} onChange={(event) => updateGeneralField('ctaDescription', event.target.value)} className="min-h-28 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <Save className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Acciones</p>
                  <h2 className="text-xl font-black text-on-surface">Guardar o restaurar</h2>
                </div>
              </div>
              <div className="space-y-3">
                <button type="button" onClick={handleSave} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-surface hover:brightness-110"><Save className="h-4 w-4" />Guardar historia</button>
                <button type="button" onClick={handleReset} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-outline-variant px-4 py-3 text-sm font-bold text-on-surface hover:bg-surface"><RotateCcw className="h-4 w-4" />Restablecer editor</button>
                <button type="button" onClick={handleClearSaved} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-error/40 px-4 py-3 text-sm font-bold text-error hover:bg-error/10"><Trash2 className="h-4 w-4" />Borrar cambios guardados</button>
              </div>
            </section>
          </aside>
        </div>
      )}

      {editorSection === 'characters' && (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_minmax(0,1fr)]">
          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <h2 className="text-xl font-black text-on-surface">Editar Personajes</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Selecciona un personaje para editar su nombre, descripción, imagen y visibilidad interactiva.</p>
            <div className="mt-6 space-y-3">
              {content.characters.map((character) => {
                const active = selectedCharacter.id === character.id;
                return (
                  <button key={character.id} type="button" onClick={() => handleCharacterChange(character.id)} className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${active ? 'border-secondary bg-secondary/10' : 'border-outline-variant/20 bg-surface hover:border-secondary/40'}`}>
                    <img src={character.img} alt={character.name} className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-on-surface">{character.name}</p>
                      <p className="text-xs text-on-surface-variant">{character.interactiveEnabled ? 'Interacción activa' : 'Interacción desactivada'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-black text-on-surface">{selectedCharacter.name}</h2>
                <p className="mt-2 text-on-surface-variant">Gestiona la ficha individual del personaje y su imagen principal.</p>
              </div>
              <label className="inline-flex items-center gap-3 rounded-full border border-outline-variant px-4 py-2 text-sm font-bold text-on-surface">
                <input type="checkbox" checked={selectedCharacter.interactiveEnabled} onChange={(event) => updateCharacterField('interactiveEnabled', event.target.checked)} />
                Activar vista interactiva
              </label>
            </div>

            <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
              <div className="space-y-4">
                <img src={selectedCharacter.img} alt={selectedCharacter.name} className="aspect-[3/4] w-full rounded-[1.75rem] border border-outline-variant/20 object-cover" />
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center justify-center gap-2 rounded-2xl border border-outline-variant px-4 py-3 text-sm font-bold text-on-surface hover:bg-surface"><Upload className="h-4 w-4" />Subir</button>
                  <button type="button" onClick={() => detailFileInputRef.current?.click()} className="flex items-center justify-center gap-2 rounded-2xl border border-outline-variant px-4 py-3 text-sm font-bold text-on-surface hover:bg-surface"><ImagePlus className="h-4 w-4" />Detalle</button>
                </div>
                <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload('img', event.target.files?.[0] ?? null)} />
                <input ref={detailFileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload('detailImg', event.target.files?.[0] ?? null)} />
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Nombre del personaje</label>
                  <input value={selectedCharacter.name} onChange={(event) => updateCharacterField('name', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Ruta o URL de imagen principal</label>
                  <input value={selectedCharacter.img} onChange={(event) => updateCharacterField('img', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Ruta o URL de imagen interactiva</label>
                  <input value={selectedCharacter.detailImg ?? ''} onChange={(event) => updateCharacterField('detailImg', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Descripción principal</label>
                  <textarea value={selectedCharacter.desc} onChange={(event) => updateCharacterField('desc', event.target.value)} className="min-h-32 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Texto de detalle</label>
                  <textarea value={selectedCharacter.detail} onChange={(event) => updateCharacterField('detail', event.target.value)} className="min-h-32 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {editorSection === 'interaction' && (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[320px_minmax(0,1fr)_360px]">
          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <h2 className="text-xl font-black text-on-surface">Personajes</h2>
            <p className="mt-2 text-sm text-on-surface-variant">Elige el personaje para cambiar o descargar la imagen interactiva ya implementada en el sitio.</p>
            <div className="mt-6 space-y-3">
              {content.characters.map((character) => {
                const active = selectedCharacter.id === character.id;
                return (
                  <button key={character.id} type="button" onClick={() => handleCharacterChange(character.id)} className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${active ? 'border-secondary bg-secondary/10' : 'border-outline-variant/20 bg-surface hover:border-secondary/40'}`}>
                    <img src={character.detailImg ?? character.img} alt={character.name} className="h-14 w-14 rounded-xl object-cover" />
                    <div>
                      <p className="font-bold text-on-surface">{character.name}</p>
                      <p className="text-xs text-on-surface-variant">{character.detailImg ? 'Imagen interactiva configurada' : 'Usa imagen principal como respaldo'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Sección del sitio</p>
                <h2 className="mt-2 text-2xl font-black text-on-surface">Imagen interactiva de {selectedCharacter.name}</h2>
                <p className="mt-2 max-w-2xl text-sm text-on-surface-variant">
                  La interacción ya existe en la vista pública. Aquí solo cambias la imagen base que usa ese personaje y puedes descargar la versión actual.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => interactionFileInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-full border border-secondary px-4 py-2 text-sm font-bold text-secondary hover:bg-secondary/10"><Upload className="h-4 w-4" />Cambiar imagen</button>
                <button type="button" onClick={handleDownloadInteractiveImage} className="inline-flex items-center gap-2 rounded-full border border-outline-variant px-4 py-2 text-sm font-bold text-on-surface hover:bg-surface"><Download className="h-4 w-4" />Descargar actual</button>
                <button type="button" onClick={addHotspot} className="inline-flex items-center gap-2 rounded-full border border-secondary px-4 py-2 text-sm font-bold text-secondary hover:bg-secondary/10"><Plus className="h-4 w-4" />Agregar punto</button>
                <button type="button" onClick={removeSelectedHotspot} disabled={selectedCharacter.hotspots.length <= 1} className="inline-flex items-center gap-2 rounded-full border border-error/40 px-4 py-2 text-sm font-bold text-error disabled:opacity-40 hover:bg-error/10"><Trash2 className="h-4 w-4" />Eliminar punto</button>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Ruta o URL de imagen interactiva</label>
                <input value={selectedCharacter.detailImg ?? ''} onChange={(event) => updateCharacterField('detailImg', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <input ref={interactionFileInputRef} type="file" accept="image/*" className="hidden" onChange={(event) => handleImageUpload('detailImg', event.target.files?.[0] ?? null)} />

              <div
                ref={previewRef}
                onClick={handleCanvasClick}
                className={`relative mx-auto w-full overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-black/30 shadow-2xl ${selectedCharacter.id === 'diablo' ? 'max-w-sm' : 'max-w-md'}`}
                style={{ aspectRatio: interactiveAspectRatio }}
              >
                <img src={selectedCharacter.detailImg ?? selectedCharacter.img} alt={selectedCharacter.name} className="h-full w-full object-contain" />
                {selectedCharacter.hotspots.map((hotspot) => {
                  const isSelected = hotspot.id === selectedHotspot?.id;
                  const isDragging = hotspot.id === draggingHotspotId;

                  return (
                    <div key={hotspot.id} className="absolute" style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}>
                      <button
                        type="button"
                        onPointerDown={(event) => handlePointerDown(hotspot.id, event)}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedHotspotId(hotspot.id);
                        }}
                        className={`relative flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all md:h-6 md:w-6 ${isSelected ? 'scale-110 border-secondary bg-secondary text-surface shadow-lg shadow-secondary/40' : 'border-white/80 bg-black/40 text-white hover:border-secondary hover:bg-secondary/80'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                      >
                        <span className="h-2.5 w-2.5 rounded-full bg-current"></span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
              <div className="mb-6 flex items-center gap-3">
                <Settings2 className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Punto interactivo</p>
                  <h2 className="text-xl font-black text-on-surface">Editar hotspot</h2>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {selectedCharacter.hotspots.map((hotspot) => {
                    const active = hotspot.id === selectedHotspot?.id;
                    return (
                      <button key={hotspot.id} type="button" onClick={() => setSelectedHotspotId(hotspot.id)} className={`rounded-full border px-3 py-2 text-xs font-bold transition-colors ${active ? 'border-secondary bg-secondary text-surface' : 'border-outline-variant bg-surface text-on-surface-variant hover:border-secondary hover:text-on-surface'}`}>
                        {hotspot.label}
                      </button>
                    );
                  })}
                </div>
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Nombre</label>
                  <input value={selectedHotspot?.label ?? ''} onChange={(event) => updateHotspotField('label', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título</label>
                  <input value={selectedHotspot?.title ?? ''} onChange={(event) => updateHotspotField('title', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Descripción</label>
                  <textarea value={selectedHotspot?.description ?? ''} onChange={(event) => updateHotspotField('description', event.target.value)} className="min-h-32 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Posición X</label>
                    <input type="number" min="0" max="100" step="0.1" value={selectedHotspot?.x ?? 0} onChange={(event) => updateHotspotField('x', clampPosition(Number(event.target.value)))} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Posición Y</label>
                    <input type="number" min="0" max="100" step="0.1" value={selectedHotspot?.y ?? 0} onChange={(event) => updateHotspotField('y', clampPosition(Number(event.target.value)))} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeSelectedHotspot}
                  disabled={selectedCharacter.hotspots.length <= 1}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-error/40 px-4 py-3 text-sm font-bold text-error disabled:opacity-40 hover:bg-error/10"
                >
                  <Trash2 className="h-4 w-4" />
                  Eliminar hotspot seleccionado
                </button>
                <div className="rounded-2xl border border-outline-variant/20 bg-surface px-4 py-4 text-sm text-on-surface-variant">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">Personaje</p>
                  <p className="mt-2 text-base font-bold text-on-surface">{selectedCharacter.name}</p>
                </div>
                <div className="rounded-2xl border border-outline-variant/20 bg-surface px-4 py-4 text-sm text-on-surface-variant">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">Estado</p>
                  <p className="mt-2 text-base font-bold text-on-surface">{selectedCharacter.interactiveEnabled ? 'Interacción activa en el sitio' : 'Interacción desactivada en el sitio'}</p>
                </div>
                <div className="rounded-2xl border border-outline-variant/20 bg-surface px-4 py-4 text-sm text-on-surface-variant">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-secondary">Puntos configurados</p>
                  <p className="mt-2 text-base font-bold text-on-surface">{selectedCharacter.hotspots.length} hotspots existentes</p>
                  <p className="mt-2">La ubicación y contenido de estos puntos se conserva tal como ya está implementado en la interacción pública.</p>
                </div>
              </div>
            </section>

            <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <Save className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Acciones</p>
                  <h2 className="text-xl font-black text-on-surface">Guardar o restaurar</h2>
                </div>
              </div>
              <div className="space-y-3">
                <button type="button" onClick={handleSave} className="flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-black uppercase tracking-[0.18em] text-surface hover:brightness-110"><Save className="h-4 w-4" />Guardar historia</button>
                <button type="button" onClick={handleReset} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-outline-variant px-4 py-3 text-sm font-bold text-on-surface hover:bg-surface"><RotateCcw className="h-4 w-4" />Restablecer editor</button>
                <button type="button" onClick={handleClearSaved} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-error/40 px-4 py-3 text-sm font-bold text-error hover:bg-error/10"><Trash2 className="h-4 w-4" />Borrar cambios guardados</button>
              </div>
            </section>
          </aside>
        </div>
      )}
    </div>
  );
}
