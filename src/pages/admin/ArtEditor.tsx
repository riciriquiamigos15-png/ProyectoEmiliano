import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Check,
  Film,
  FileText,
  ImagePlus,
  Layers3,
  Link2,
  Mail,
  Palette,
  Phone,
  Plus,
  RotateCcw,
  Save,
  Settings2,
  Trash2,
  Upload,
  UserSquare2,
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
  ART_EDITOR_UPDATED_EVENT,
  defaultArtEditorContent,
  fetchArtEditorContent,
  readArtEditorContent,
  resetArtEditorContent,
  saveArtEditorContent,
  type ArtArtisan,
  type ArtContact,
  type ArtContactKind,
  type ArtEditorContent,
  type ArtGeneralContent,
  type ArtProcessCard,
} from '@/lib/artEditorContent';
import { apiClient } from '@/services/api';

type EditorSection = 'general' | 'masks' | 'info' | 'contacts' | 'gallery' | 'media' | 'cards' | 'process';

const FONT_OPTIONS = [
  { value: 'font-headline', label: 'Headline' },
  { value: 'font-body', label: 'Body' },
  { value: 'font-sans', label: 'Sans' },
];

const THEME_OPTIONS = [
  { value: 'primary', label: 'Rojo / Primario' },
  { value: 'secondary', label: 'Dorado / Secundario' },
];

const PROCESS_THEME_OPTIONS = [
  { value: 'surface', label: 'Superficie suave' },
  { value: 'primary', label: 'Primario' },
  { value: 'secondary', label: 'Secundario' },
  { value: 'outlined', label: 'Bordeado' },
];

const CONTACT_KIND_OPTIONS: Array<{ value: ArtContactKind; label: string }> = [
  { value: 'phone', label: 'Teléfono' },
  { value: 'mail', label: 'Correo' },
  { value: 'music', label: 'Red social' },
  { value: 'link', label: 'Enlace' },
];

function cloneContent(content: ArtEditorContent): ArtEditorContent {
  return {
    general: {
      ...content.general,
      translations: content.general.translations ? { ...content.general.translations, en: content.general.translations.en ? { ...content.general.translations.en } : undefined } : undefined,
    },
    artisans: content.artisans.map((artisan) => ({
      ...artisan,
      gallery: [...artisan.gallery],
      contacts: artisan.contacts.map((contact) => ({ ...contact })),
      translations: artisan.translations ? { ...artisan.translations, en: artisan.translations.en ? { ...artisan.translations.en } : undefined } : undefined,
    })),
    processCards: content.processCards.map((card) => ({
      ...card,
      translations: card.translations ? { ...card.translations, en: card.translations.en ? { ...card.translations.en } : undefined } : undefined,
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

function makeUniqueSlug(baseSlug: string, existingIds: string[]) {
  const normalizedBase = toSlug(baseSlug) || 'nuevo-caretero';
  if (!existingIds.includes(normalizedBase)) {
    return normalizedBase;
  }

  let counter = 2;
  let candidate = `${normalizedBase}-${counter}`;
  while (existingIds.includes(candidate)) {
    counter += 1;
    candidate = `${normalizedBase}-${counter}`;
  }

  return candidate;
}

function buildContactHref(kind: ArtContactKind, value: string) {
  if (kind === 'phone') {
    return `tel:${value}`;
  }

  if (kind === 'mail') {
    return `mailto:${value}`;
  }

  if (kind === 'link') {
    return value;
  }

  return '#';
}

function inferSocialHref(label: string) {
  const source = label.toLowerCase();

  if (source.includes('instagram') || source.includes('instagra')) {
    return 'https://www.instagram.com/';
  }

  if (source.includes('facebook') || source.includes('facebok')) {
    return 'https://www.facebook.com/';
  }

  if (source.includes('youtube')) {
    return 'https://www.youtube.com/';
  }

  if (source.includes('whatsapp')) {
    return 'https://wa.me/';
  }

  if (source.includes('tiktok')) {
    return 'https://www.tiktok.com/@';
  }

  if (source.includes('x ') || source === 'x' || source.includes('twitter')) {
    return 'https://x.com/';
  }

  return 'https://';
}

function shouldAutoReplaceSocialHref(currentHref: string) {
  return currentHref === ''
    || currentHref === '#'
    || currentHref === 'https://'
    || currentHref === 'https://www.instagram.com/'
    || currentHref === 'https://www.facebook.com/'
    || currentHref === 'https://www.youtube.com/'
    || currentHref === 'https://wa.me/'
    || currentHref === 'https://www.tiktok.com/@'
    || currentHref === 'https://x.com/';
}

function getContactValueLabel(kind: ArtContactKind) {
  if (kind === 'phone') {
    return 'Número';
  }

  if (kind === 'mail') {
    return 'Correo';
  }

  if (kind === 'music') {
    return 'Usuario o cuenta visible';
  }

  return 'Texto visible';
}

function getContactValuePlaceholder(kind: ArtContactKind) {
  if (kind === 'phone') {
    return '+593 99 999 9999';
  }

  if (kind === 'mail') {
    return 'artesano@diablada.ec';
  }

  if (kind === 'music') {
    return '@usuario o nombre de cuenta';
  }

  return 'Sitio web o referencia';
}

function getContactHrefPlaceholder(kind: ArtContactKind) {
  if (kind === 'music') {
    return 'https://www.instagram.com/...';
  }

  if (kind === 'link') {
    return 'https://...';
  }

  return 'Se genera automáticamente';
}

function shouldEditHrefDirectly(kind: ArtContactKind) {
  return kind === 'music' || kind === 'link';
}

function renderContactKindIcon(kind: ArtContactKind) {
  if (kind === 'phone') {
    return <Phone className="h-4 w-4" />;
  }

  if (kind === 'mail') {
    return <Mail className="h-4 w-4" />;
  }

  return <Link2 className="h-4 w-4" />;
}

function getDefaultContactDraft(kind: ArtContactKind, timestamp: number): ArtContact {
  if (kind === 'phone') {
    return {
      id: `contact-${timestamp}`,
      label: 'Teléfono',
      value: '',
      href: '#',
      kind,
    };
  }

  if (kind === 'mail') {
    return {
      id: `contact-${timestamp}`,
      label: 'Correo',
      value: '',
      href: '#',
      kind,
    };
  }

  if (kind === 'music') {
    return {
      id: `contact-${timestamp}`,
      label: 'Instagram',
      value: '',
      href: '',
      kind,
    };
  }

  return {
    id: `contact-${timestamp}`,
    label: 'Enlace',
    value: '',
    href: '',
    kind,
  };
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

function getFileExtension(filename: string) {
  const index = filename.lastIndexOf('.');
  return index >= 0 ? filename.slice(index).toLowerCase() : '';
}

async function uploadFileToArteFolder(file: File, folder: string, filenameOverride?: string) {
  const dataUrl = await readFileAsDataUrl(file);
  const base64data = dataUrl.split(',')[1] ?? '';
  const filename = filenameOverride || file.name;

  const response = await fetch('http://localhost:5000/api/upload', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      folder,
      filename,
      base64data,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error || 'No se pudo subir el archivo.');
  }

  return result.path as string;
}

export default function ArtEditor() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [content, setContent] = useState<ArtEditorContent>(() => readArtEditorContent());
  const [selectedArtisanId, setSelectedArtisanId] = useState<string>(defaultArtEditorContent.artisans[0].id);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error'>('success');
  const [uploadingLabel, setUploadingLabel] = useState('');
  const [newArtisanSlugInput, setNewArtisanSlugInput] = useState('');

  const currentTab = searchParams.get('tab');
  const editorSection: EditorSection = currentTab === 'masks'
    || currentTab === 'info'
    || currentTab === 'contacts'
    || currentTab === 'gallery'
    || currentTab === 'media'
    || currentTab === 'cards'
    || currentTab === 'process'
    ? currentTab
    : 'general';

  const selectedArtisan = useMemo(() => {
    return content.artisans.find((artisan) => artisan.id === selectedArtisanId) ?? content.artisans[0];
  }, [content.artisans, selectedArtisanId]);

  const selectedArtisanFolderSlug = useMemo(() => {
    return toSlug(selectedArtisan?.id || selectedArtisan?.name || 'nuevo-caretero');
  }, [selectedArtisan?.id, selectedArtisan?.name]);

  const selectedArtisanIdRef = useRef(selectedArtisanId);

  useEffect(() => {
    selectedArtisanIdRef.current = selectedArtisanId;
  }, [selectedArtisanId]);

  useEffect(() => {
    let isMounted = true;

    const syncArtContent = async () => {
      const nextContent = await fetchArtEditorContent({ preferApi: true });
      if (!isMounted) {
        return;
      }

      setContent(nextContent);
      const nextArtisan = nextContent.artisans.find((artisan) => artisan.id === selectedArtisanIdRef.current) ?? nextContent.artisans[0];
      setSelectedArtisanId(nextArtisan?.id ?? '');
    };

    syncArtContent();
    window.addEventListener(ART_EDITOR_UPDATED_EVENT, syncArtContent);

    return () => {
      isMounted = false;
      window.removeEventListener(ART_EDITOR_UPDATED_EVENT, syncArtContent);
    };
  }, []);

  function updateGeneralField(field: keyof ArtGeneralContent, value: string) {
    setContent((currentContent) => ({
      ...currentContent,
      general: {
        ...currentContent.general,
        [field]: value,
      },
    }));
  }

  function updateArtisanField(field: keyof ArtArtisan, value: string | string[]) {
    setContent((currentContent) => ({
      ...currentContent,
      artisans: currentContent.artisans.map((artisan) => artisan.id === selectedArtisan.id ? { ...artisan, [field]: value } : artisan),
    }));
  }

  function updateContact(contactId: string, field: keyof ArtContact, value: string) {
    setContent((currentContent) => ({
      ...currentContent,
      artisans: currentContent.artisans.map((artisan) => {
        if (artisan.id !== selectedArtisan.id) {
          return artisan;
        }

        return {
          ...artisan,
          contacts: artisan.contacts.map((contact) => {
            if (contact.id !== contactId) {
              return contact;
            }

            const nextContact = { ...contact, [field]: value };
            if (field === 'kind' || field === 'value') {
              nextContact.href = buildContactHref((field === 'kind' ? value : nextContact.kind) as ArtContactKind, field === 'value' ? value : nextContact.value);
            }

            if (field === 'label' && nextContact.kind === 'music' && shouldAutoReplaceSocialHref(nextContact.href)) {
              nextContact.href = inferSocialHref(value);
            }

            if (field === 'kind' && value === 'music') {
              nextContact.href = inferSocialHref(nextContact.label);
            }

            if (field === 'kind' && value === 'link' && nextContact.href === '#') {
              nextContact.href = 'https://';
            }

            return nextContact;
          }),
        };
      }),
    }));
  }

  function addContact(kind: ArtContactKind = 'link') {
    const timestamp = Date.now();
    const nextContact = getDefaultContactDraft(kind, timestamp);
    setContent((currentContent) => ({
      ...currentContent,
      artisans: currentContent.artisans.map((artisan) => artisan.id === selectedArtisan.id ? {
        ...artisan,
        contacts: [...artisan.contacts, nextContact],
      } : artisan),
    }));
    setStatusType('success');
    setStatusMessage(`${CONTACT_KIND_OPTIONS.find((option) => option.value === kind)?.label ?? 'Contacto'} agregado. Completa los datos y guarda el módulo.`);
  }

  function removeContact(contactId: string) {
    setContent((currentContent) => ({
      ...currentContent,
      artisans: currentContent.artisans.map((artisan) => artisan.id === selectedArtisan.id ? {
        ...artisan,
        contacts: artisan.contacts.filter((contact) => contact.id !== contactId),
      } : artisan),
    }));
  }

  function updateGalleryItem(index: number, value: string) {
    setContent((currentContent) => ({
      ...currentContent,
      artisans: currentContent.artisans.map((artisan) => {
        if (artisan.id !== selectedArtisan.id) {
          return artisan;
        }

        const nextGallery = [...artisan.gallery];
        nextGallery[index] = value;
        return { ...artisan, gallery: nextGallery };
      }),
    }));
  }

  function addGalleryItem() {
    updateArtisanField('gallery', [...selectedArtisan.gallery, '']);
  }

  function removeGalleryItem(index: number) {
    updateArtisanField('gallery', selectedArtisan.gallery.filter((_, currentIndex) => currentIndex !== index));
  }

  function updateProcessCard(cardId: string, field: keyof ArtProcessCard, value: string) {
    setContent((currentContent) => ({
      ...currentContent,
      processCards: currentContent.processCards.map((card) => card.id === cardId ? { ...card, [field]: value } : card),
    }));
  }

  async function addArtisan() {
    const artisanSlug = makeUniqueSlug(newArtisanSlugInput, content.artisans.map((artisan) => artisan.id));
    const newArtisan: ArtArtisan = {
      id: artisanSlug,
      name: 'Nuevo artesano',
      title: 'Nuevo cuadro',
      technique: 'Técnica artesanal',
      desc: 'Descripción breve de la obra o del artesano.',
      fullInfo: 'Biografía o información ampliada.',
      bibliography: '',
      img: `/contenido/arte/${artisanSlug}/01_perfil/principal.jpg`,
      gallery: [
        `/contenido/arte/${artisanSlug}/02_galeria/obra-01.jpg`,
        `/contenido/arte/${artisanSlug}/02_galeria/obra-02.jpg`,
        `/contenido/arte/${artisanSlug}/02_galeria/obra-03.jpg`,
      ],
      video: `/contenido/arte/${artisanSlug}/04_video/proceso.mp4`,
      contacts: [],
      theme: 'primary',
      translations: {
        en: {},
      },
    };

    setContent((currentContent) => ({
      ...currentContent,
      artisans: [...currentContent.artisans, newArtisan],
    }));
    setSelectedArtisanId(newArtisan.id);
    setSearchParams({ tab: 'cards' });

    const folderResult = await apiClient.arte.artisans.ensureFolders(artisanSlug);
    if (!folderResult.success) {
      setStatusType('error');
      setStatusMessage(`Artesano creado, pero no se pudo preparar carpetas: ${folderResult.error || 'Error desconocido'}`);
      return;
    }

    setNewArtisanSlugInput('');
    setStatusType('success');
    setStatusMessage('Nuevo artesano creado con carpetas listas (perfil, galería, equipo y video). Ahora sube archivos y guarda el módulo.');
  }

  function removeSelectedArtisan() {
    if (content.artisans.length <= 1) {
      return;
    }

    const remainingArtisans = content.artisans.filter((artisan) => artisan.id !== selectedArtisan.id);
    setContent((currentContent) => ({
      ...currentContent,
      artisans: remainingArtisans,
    }));
    setSelectedArtisanId(remainingArtisans[0].id);
  }

  async function ensureFoldersForSelectedArtisan() {
    const folderSlug = selectedArtisanFolderSlug;
    if (!folderSlug) {
      setStatusType('error');
      setStatusMessage('No se pudo generar el slug de carpeta para este artesano.');
      return;
    }

    const result = await apiClient.arte.artisans.ensureFolders(folderSlug);
    if (!result.success) {
      setStatusType('error');
      setStatusMessage(`No se pudieron preparar carpetas: ${result.error || 'Error desconocido'}`);
      return;
    }

    setStatusType('success');
    setStatusMessage('Carpetas del artesano preparadas correctamente.');
  }

  async function copyRouteToClipboard(routeLabel: string, routeValue: string) {
    try {
      await navigator.clipboard.writeText(routeValue);
      setStatusType('success');
      setStatusMessage(`Ruta copiada: ${routeLabel}`);
    } catch {
      setStatusType('error');
      setStatusMessage('No se pudo copiar la ruta automáticamente.');
    }
  }

  async function uploadToSelectedArtisan(field: 'img' | 'video', file: File) {
    try {
      setUploadingLabel(`Subiendo ${field === 'img' ? 'imagen' : 'video'}...`);
      const ext = getFileExtension(file.name) || (field === 'video' ? '.mp4' : '.jpg');
      const folder = field === 'img'
        ? `arte/${selectedArtisan.id}/01_perfil`
        : `arte/${selectedArtisan.id}/04_video`;
      const filename = field === 'img' ? `principal${ext}` : `proceso${ext}`;
      const uploadedPath = await uploadFileToArteFolder(file, folder, filename);
      updateArtisanField(field, uploadedPath);
      setStatusType('success');
      setStatusMessage(`${field === 'img' ? 'Imagen' : 'Video'} actualizado en su carpeta correspondiente.`);
    } catch (error) {
      setStatusType('error');
      setStatusMessage(error instanceof Error ? error.message : 'No se pudo subir el archivo.');
    } finally {
      setUploadingLabel('');
    }
  }

  async function uploadGalleryItem(index: number, file: File) {
    try {
      setUploadingLabel('Subiendo imagen de galería...');
      const ext = getFileExtension(file.name) || '.jpg';
      const filename = `obra-${String(index + 1).padStart(2, '0')}${ext}`;
      const uploadedPath = await uploadFileToArteFolder(file, `arte/${selectedArtisan.id}/02_galeria`, filename);
      updateGalleryItem(index, uploadedPath);
      setStatusType('success');
      setStatusMessage('Imagen de galería actualizada en su carpeta correspondiente.');
    } catch (error) {
      setStatusType('error');
      setStatusMessage(error instanceof Error ? error.message : 'No se pudo subir la imagen.');
    } finally {
      setUploadingLabel('');
    }
  }

  async function handleSave() {
    const saved = await saveArtEditorContent(content);
    setStatusType(saved ? 'success' : 'error');
    setStatusMessage(saved ? 'Contenido de Arte guardado correctamente.' : 'No se pudo guardar el contenido de Arte.');
  }

  async function handleReset() {
    setContent(cloneContent(defaultArtEditorContent));
    setSelectedArtisanId(defaultArtEditorContent.artisans[0].id);
    setStatusType('success');
    setStatusMessage('Editor de Arte restablecido en memoria.');
  }

  async function handleClearSaved() {
    const resetWorked = await resetArtEditorContent();
    if (!resetWorked) {
      setStatusType('error');
      setStatusMessage('No se pudo borrar el contenido guardado de Arte.');
      return;
    }

    const fallback = cloneContent(defaultArtEditorContent);
    setContent(fallback);
    setSelectedArtisanId(fallback.artisans[0].id);
    setStatusType('success');
    setStatusMessage('Contenido guardado eliminado. Se cargaron los valores base.');
  }

  const tabs: Array<{ id: EditorSection; label: string }> = [
    { id: 'general', label: 'Contenido General' },
    { id: 'masks', label: 'Máscaras' },
    { id: 'info', label: 'Información / Biografía' },
    { id: 'contacts', label: 'Contactos' },
    { id: 'gallery', label: 'Galería' },
    { id: 'media', label: 'Multimedia' },
    { id: 'cards', label: 'Cuadros / Obras' },
    { id: 'process', label: 'Proceso Ritual' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.28em] text-secondary">Panel de Arte</p>
          <h1 className="mt-2 text-4xl font-black text-on-surface">Editar Arte</h1>
          <p className="mt-3 max-w-3xl text-on-surface-variant">
            Gestiona textos, máscaras, biografías, contactos, galería, multimedia, cuadros informativos y proceso ritual del apartado de Arte.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleSave} className="flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-surface hover:brightness-110">
            <Save className="h-4 w-4" /> Guardar Arte
          </button>
          <button type="button" onClick={handleReset} className="flex items-center gap-2 rounded-2xl border border-outline-variant px-5 py-3 text-sm font-bold text-on-surface hover:bg-surface">
            <RotateCcw className="h-4 w-4" /> Restablecer editor
          </button>
        </div>
      </div>

      {(statusMessage || uploadingLabel) && (
        <div className={`rounded-2xl border px-4 py-3 text-sm font-medium ${statusType === 'success' ? 'border-secondary/30 bg-secondary/10 text-on-surface' : 'border-error/30 bg-error/10 text-on-surface'}`}>
          {uploadingLabel || statusMessage}
        </div>
      )}

      <div className="flex flex-wrap gap-3 rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-3">
        {tabs.map((tab) => {
          const active = tab.id === editorSection;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSearchParams({ tab: tab.id })}
              className={`rounded-2xl px-4 py-3 text-sm font-bold transition-colors ${active ? 'bg-secondary text-surface' : 'text-on-surface-variant hover:bg-surface hover:text-on-surface'}`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {(editorSection === 'masks' || editorSection === 'info' || editorSection === 'contacts' || editorSection === 'gallery' || editorSection === 'media' || editorSection === 'cards') && selectedArtisan && (
        <div className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-4">
          <div className="flex flex-wrap gap-2">
            {content.artisans.map((artisan) => {
              const active = artisan.id === selectedArtisan.id;
              return (
                <button
                  key={artisan.id}
                  type="button"
                  onClick={() => setSelectedArtisanId(artisan.id)}
                  className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${active ? 'border-secondary bg-secondary text-surface' : 'border-outline-variant bg-surface text-on-surface-variant hover:border-secondary hover:text-on-surface'}`}
                >
                  {artisan.name}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {editorSection === 'general' && (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_360px]">
          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <Settings2 className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Contenido General</p>
                <h2 className="text-xl font-black text-on-surface">Hero y etiquetas principales</h2>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Badge</label>
                <input value={content.general.badge} onChange={(event) => updateGeneralField('badge', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título destacado</label>
                <input value={content.general.titleAccent} onChange={(event) => updateGeneralField('titleAccent', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título principal</label>
                <input value={content.general.title} onChange={(event) => updateGeneralField('title', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Descripción</label>
                <textarea value={content.general.description} onChange={(event) => updateGeneralField('description', event.target.value)} rows={4} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Tipografía de títulos</label>
                <select value={content.general.headlineFontClass} onChange={(event) => updateGeneralField('headlineFontClass', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary">
                  {FONT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Tipografía de texto</label>
                <select value={content.general.bodyFontClass} onChange={(event) => updateGeneralField('bodyFontClass', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary">
                  {FONT_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Alineación del hero</label>
                <select value={content.general.heroAlignment} onChange={(event) => updateGeneralField('heroAlignment', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary">
                  <option value="center">Centrada</option>
                  <option value="left">Izquierda</option>
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Estilo visual de imágenes</label>
                <select value={content.general.imageEffect} onChange={(event) => updateGeneralField('imageEffect', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary">
                  <option value="grayscale">Blanco y negro</option>
                  <option value="color">Color completo</option>
                </select>
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
              <div className="mb-5 flex items-center gap-3">
                <Palette className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Etiquetas</p>
                  <h2 className="text-xl font-black text-on-surface">Textos de sección</h2>
                </div>
              </div>
              <div className="space-y-4">
                {([
                  ['techniqueLabel', 'Etiqueta de técnica'],
                  ['exploreMask', 'Botón explorar'],
                  ['biography', 'Título biografía'],
                  ['contact', 'Título contacto'],
                  ['follow', 'Texto de redes'],
                  ['galleryTitle', 'Título galería'],
                  ['watchWork', 'Título multimedia'],
                  ['processTitle', 'Título proceso ritual'],
                  ['closingButton', 'Botón final'],
                ] as Array<[keyof ArtGeneralContent, string]>).map(([field, label]) => (
                  <div key={field}>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">{label}</label>
                    <input value={content.general[field] as string} onChange={(event) => updateGeneralField(field, event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                  </div>
                ))}
                <div>
                  <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Cita final</label>
                  <textarea value={content.general.closingQuote} onChange={(event) => updateGeneralField('closingQuote', event.target.value)} rows={4} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                </div>
              </div>
            </section>
          </aside>
        </div>
      )}

      {editorSection === 'cards' && selectedArtisan && (
        <div className="grid gap-8 xl:grid-cols-[280px_minmax(0,1fr)_360px]">
          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Cuadros</p>
                <h2 className="text-xl font-black text-on-surface">Obras / Artesanos</h2>
              </div>
            </div>
            <div className="mb-4 rounded-2xl border border-outline-variant/20 bg-surface p-4">
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">
                Nombre de carpeta (slug)
              </label>
              <input
                value={newArtisanSlugInput}
                onChange={(event) => setNewArtisanSlugInput(toSlug(event.target.value))}
                placeholder="ejemplo: angel-velasco"
                className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary"
              />
              <p className="mt-2 text-xs text-on-surface-variant">
                Si lo dejas vacío, se genera automáticamente. Si ya existe, se crea una variante única.
              </p>
              <button type="button" onClick={addArtisan} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-secondary px-4 py-3 text-sm font-bold text-surface hover:brightness-110">
                <Plus className="h-4 w-4" /> Crear artesano
              </button>
            </div>

            <div className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-on-surface-variant">Artesanos creados</div>
            <div className="space-y-2">
              {content.artisans.map((artisan) => {
                const active = artisan.id === selectedArtisan.id;
                return (
                  <button key={artisan.id} type="button" onClick={() => setSelectedArtisanId(artisan.id)} className={`w-full rounded-2xl border px-4 py-3 text-left transition-colors ${active ? 'border-secondary bg-secondary/10 text-on-surface' : 'border-outline-variant/20 bg-surface text-on-surface-variant hover:border-secondary/40 hover:text-on-surface'}`}>
                    <p className="font-bold">{artisan.name}</p>
                    <p className="text-xs uppercase tracking-[0.22em] opacity-70">{artisan.title}</p>
                    <p className="mt-1 break-all text-[10px] uppercase tracking-[0.16em] text-secondary/90">{artisan.id}</p>
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={removeSelectedArtisan} disabled={content.artisans.length <= 1} className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-error/40 px-4 py-3 text-sm font-bold text-error disabled:opacity-40 hover:bg-error/10">
              <Trash2 className="h-4 w-4" /> Eliminar cuadro
            </button>
          </aside>

          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <UserSquare2 className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Cuadro seleccionado</p>
                <h2 className="text-xl font-black text-on-surface">Contenido base del artesano</h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Nombre</label>
                <input value={selectedArtisan.name} onChange={(event) => updateArtisanField('name', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Etiqueta superior</label>
                <input value={selectedArtisan.title} onChange={(event) => updateArtisanField('title', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Técnica</label>
                <input value={selectedArtisan.technique} onChange={(event) => updateArtisanField('technique', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Tema visual</label>
                <select value={selectedArtisan.theme} onChange={(event) => updateArtisanField('theme', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary">
                  {THEME_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Descripción corta del cuadro</label>
                <textarea value={selectedArtisan.desc} onChange={(event) => updateArtisanField('desc', event.target.value)} rows={4} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>

              <div className="md:col-span-2 rounded-2xl border border-outline-variant/20 bg-surface px-4 py-4 text-sm text-on-surface-variant">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-secondary">Rutas de carpetas del artesano</p>
                <div className="mt-2 space-y-2">
                  {[
                    { label: 'Perfil', value: `/contenido/arte/${selectedArtisanFolderSlug}/01_perfil` },
                    { label: 'Galería', value: `/contenido/arte/${selectedArtisanFolderSlug}/02_galeria` },
                    { label: 'Equipo', value: `/contenido/arte/${selectedArtisanFolderSlug}/03_equipo` },
                    { label: 'Video', value: `/contenido/arte/${selectedArtisanFolderSlug}/04_video` },
                  ].map((item) => (
                    <div key={item.label} className="flex flex-col gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-low px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
                      <p className="break-all text-xs sm:text-sm">
                        <span className="font-black text-on-surface">{item.label}:</span> {item.value}
                      </p>
                      <button
                        type="button"
                        onClick={() => copyRouteToClipboard(item.label, item.value)}
                        className="inline-flex w-fit items-center justify-center rounded-lg border border-secondary/40 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-secondary hover:bg-secondary/10"
                      >
                        Copiar ruta
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <ImagePlus className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Imagen principal</p>
                <h2 className="text-xl font-black text-on-surface">Portada del cuadro</h2>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface">
              <div className="aspect-[4/5] bg-surface-container-low">
                {selectedArtisan.img ? <img src={selectedArtisan.img} alt={selectedArtisan.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-on-surface-variant">Sin imagen</div>}
              </div>
            </div>
            <input value={selectedArtisan.img} onChange={(event) => updateArtisanField('img', event.target.value)} placeholder="/contenido/arte/archivo.jpg" className="mt-4 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-secondary/30 px-4 py-3 text-sm font-bold text-secondary hover:bg-secondary/10">
              <Upload className="h-4 w-4" /> Subir imagen
              <input type="file" accept="image/*" className="hidden" onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  return;
                }
                await uploadToSelectedArtisan('img', file);
                event.target.value = '';
              }} />
            </label>
            <button type="button" onClick={ensureFoldersForSelectedArtisan} className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-outline-variant/40 px-4 py-3 text-sm font-bold text-on-surface hover:bg-surface">
              <Plus className="h-4 w-4" /> Preparar carpetas del artesano
            </button>
          </aside>
        </div>
      )}

      {editorSection === 'masks' && selectedArtisan && (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_360px]">
          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl space-y-5">
            <div className="mb-1 flex items-center gap-3">
              <Palette className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Máscaras</p>
                <h2 className="text-xl font-black text-on-surface">Imagen, técnica y descripción</h2>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Técnica</label>
              <input value={selectedArtisan.technique} onChange={(event) => updateArtisanField('technique', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Descripción de la máscara</label>
              <textarea value={selectedArtisan.desc} onChange={(event) => updateArtisanField('desc', event.target.value)} rows={5} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
            </div>
          </section>

          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <ImagePlus className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Imagen de máscara</p>
                <h2 className="text-xl font-black text-on-surface">Reemplazar portada</h2>
              </div>
            </div>
            <div className="overflow-hidden rounded-3xl border border-outline-variant/20 bg-surface">
              <div className="aspect-[4/5] bg-surface-container-low">
                {selectedArtisan.img ? <img src={selectedArtisan.img} alt={selectedArtisan.name} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-on-surface-variant">Sin imagen</div>}
              </div>
            </div>
            <input value={selectedArtisan.img} onChange={(event) => updateArtisanField('img', event.target.value)} placeholder="Ruta o URL de imagen" className="mt-4 w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
            <label className="mt-4 flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-secondary/30 px-4 py-3 text-sm font-bold text-secondary hover:bg-secondary/10">
              <Upload className="h-4 w-4" /> Subir nueva imagen
              <input type="file" accept="image/*" className="hidden" onChange={async (event) => {
                const file = event.target.files?.[0];
                if (!file) {
                  return;
                }
                await uploadToSelectedArtisan('img', file);
                event.target.value = '';
              }} />
            </label>
          </aside>
        </div>
      )}

      {editorSection === 'info' && selectedArtisan && (
        <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
          <div className="mb-6 flex items-center gap-3">
            <FileText className="h-5 w-5 text-secondary" />
            <div>
              <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Información / Biografía</p>
              <h2 className="text-xl font-black text-on-surface">Texto ampliado del artesano</h2>
            </div>
          </div>
          <textarea value={selectedArtisan.fullInfo} onChange={(event) => updateArtisanField('fullInfo', event.target.value)} rows={14} className="w-full rounded-3xl border border-outline-variant/30 bg-surface px-5 py-4 text-sm text-on-surface outline-none focus:border-secondary" />
        </section>
      )}

      {editorSection === 'contacts' && selectedArtisan && (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Link2 className="h-5 w-5 text-secondary" />
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Contactos</p>
                  <h2 className="text-xl font-black text-on-surface">Editar contacto y redes</h2>
                </div>
              </div>
            </div>

            <div className="mb-6 flex flex-wrap gap-3 rounded-3xl border border-outline-variant/20 bg-surface px-4 py-4">
              <button type="button" onClick={() => addContact('phone')} className="flex items-center gap-2 rounded-2xl border border-outline-variant/30 px-4 py-3 text-sm font-bold text-on-surface hover:border-secondary hover:text-secondary">
                <Phone className="h-4 w-4" /> Agregar teléfono
              </button>
              <button type="button" onClick={() => addContact('mail')} className="flex items-center gap-2 rounded-2xl border border-outline-variant/30 px-4 py-3 text-sm font-bold text-on-surface hover:border-secondary hover:text-secondary">
                <Mail className="h-4 w-4" /> Agregar correo
              </button>
              <button type="button" onClick={() => addContact('music')} className="flex items-center gap-2 rounded-2xl border border-outline-variant/30 px-4 py-3 text-sm font-bold text-on-surface hover:border-secondary hover:text-secondary">
                <Link2 className="h-4 w-4" /> Agregar red social
              </button>
              <button type="button" onClick={() => addContact('link')} className="flex items-center gap-2 rounded-2xl border border-outline-variant/30 px-4 py-3 text-sm font-bold text-on-surface hover:border-secondary hover:text-secondary">
                <Plus className="h-4 w-4" /> Agregar enlace
              </button>
            </div>

            <div className="space-y-5">
              {selectedArtisan.contacts.map((contact) => (
                <div key={contact.id} className="rounded-3xl border border-outline-variant/20 bg-surface p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-low px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-secondary">
                      {renderContactKindIcon(contact.kind)} {CONTACT_KIND_OPTIONS.find((option) => option.value === contact.kind)?.label ?? 'Contacto'}
                    </div>
                    <button type="button" onClick={() => removeContact(contact.id)} className="flex items-center gap-2 text-sm font-bold text-error hover:opacity-80">
                      <Trash2 className="h-4 w-4" /> Eliminar
                    </button>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Etiqueta</label>
                      <input value={contact.label} onChange={(event) => updateContact(contact.id, 'label', event.target.value)} placeholder="Ej. Teléfono, Correo, Instagram, Facebook" className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Tipo</label>
                      <select value={contact.kind} onChange={(event) => updateContact(contact.id, 'kind', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary">
                        {CONTACT_KIND_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">{getContactValueLabel(contact.kind)}</label>
                      <input value={contact.value} onChange={(event) => updateContact(contact.id, 'value', event.target.value)} placeholder={getContactValuePlaceholder(contact.kind)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                    </div>
                    <div>
                      <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Enlace</label>
                      <input value={contact.href} onChange={(event) => updateContact(contact.id, 'href', event.target.value)} placeholder={getContactHrefPlaceholder(contact.kind)} disabled={!shouldEditHrefDirectly(contact.kind)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary disabled:cursor-not-allowed disabled:opacity-60" />
                    </div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-surface-container-low px-4 py-3 text-xs text-on-surface-variant">
                    {shouldEditHrefDirectly(contact.kind)
                      ? 'Para redes y enlaces libres puedes editar la URL manualmente.'
                      : 'Para teléfono y correo el enlace se genera automáticamente desde el valor ingresado.'}
                  </div>
                </div>
              ))}

              {selectedArtisan.contacts.length === 0 && (
                <div className="rounded-3xl border border-dashed border-outline-variant/30 bg-surface px-5 py-8 text-center text-sm text-on-surface-variant">
                  Este artesano no tiene contactos configurados todavía.
                </div>
              )}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Ayuda</p>
                <h2 className="text-xl font-black text-on-surface">Sugerencia</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              El admin puede definir la plataforma libremente: Instagram, Facebook, TikTok, YouTube, WhatsApp u otra. Usa la etiqueta para nombrar la red y el enlace para pegar la URL real.
            </p>
          </aside>
        </div>
      )}

      {editorSection === 'gallery' && selectedArtisan && (
        <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Galería</p>
                <h2 className="text-xl font-black text-on-surface">Imágenes principales del artesano</h2>
              </div>
            </div>
            <button type="button" onClick={addGalleryItem} className="rounded-full bg-secondary p-2 text-surface hover:brightness-110">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {selectedArtisan.gallery.map((galleryItem, index) => (
              <div key={`${selectedArtisan.id}-gallery-${index}`} className="rounded-3xl border border-outline-variant/20 bg-surface p-4">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-surface-container-low">
                  {galleryItem ? <img src={galleryItem} alt={`${selectedArtisan.name} ${index + 1}`} className="h-full w-full object-cover" /> : <div className="flex h-full items-center justify-center text-sm text-on-surface-variant">Sin imagen</div>}
                </div>
                <input value={galleryItem} onChange={(event) => updateGalleryItem(index, event.target.value)} placeholder="Ruta o URL de imagen" className="mt-4 w-full rounded-2xl border border-outline-variant/30 bg-surface-container-low px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                <div className="mt-4 flex gap-3">
                  <label className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-secondary/30 px-4 py-3 text-sm font-bold text-secondary hover:bg-secondary/10">
                    <Upload className="h-4 w-4" /> Subir
                    <input type="file" accept="image/*" className="hidden" onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) {
                        return;
                      }
                      await uploadGalleryItem(index, file);
                      event.target.value = '';
                    }} />
                  </label>
                  <button type="button" onClick={() => removeGalleryItem(index)} className="rounded-2xl border border-error/40 px-4 py-3 text-sm font-bold text-error hover:bg-error/10">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {editorSection === 'media' && selectedArtisan && (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-6 flex items-center gap-3">
              <Film className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Multimedia</p>
                <h2 className="text-xl font-black text-on-surface">Video del artesano</h2>
              </div>
            </div>
            <div className="space-y-4">
              <input value={selectedArtisan.video} onChange={(event) => updateArtisanField('video', event.target.value)} placeholder="/contenido/arte/video.mp4 o URL" className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border border-secondary/30 px-4 py-3 text-sm font-bold text-secondary hover:bg-secondary/10">
                <Upload className="h-4 w-4" /> Subir video
                <input type="file" accept="video/*" className="hidden" onChange={async (event) => {
                  const file = event.target.files?.[0];
                  if (!file) {
                    return;
                  }
                  await uploadToSelectedArtisan('video', file);
                  event.target.value = '';
                }} />
              </label>
              {selectedArtisan.video && (
                <video src={selectedArtisan.video} controls className="w-full rounded-3xl border border-outline-variant/20 bg-black" />
              )}
            </div>
          </section>

          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Gestión</p>
                <h2 className="text-xl font-black text-on-surface">Notas</h2>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-on-surface-variant">
              Puedes subir un video al directorio de Arte o usar una ruta ya existente dentro de /contenido/arte. Si prefieres un enlace externo, también puedes pegar la URL manualmente.
            </p>
          </aside>
        </div>
      )}

      {editorSection === 'process' && (
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-6">
            {content.processCards.map((card) => {
              return (
              <div key={card.id} className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
                <div className="mb-5 flex items-center gap-3">
                  <Palette className="h-5 w-5 text-secondary" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Tarjeta del proceso</p>
                    <h2 className="text-xl font-black text-on-surface">{card.id}</h2>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título</label>
                    <input value={card.title} onChange={(event) => updateProcessCard(card.id, 'title', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Estilo</label>
                    <select value={card.theme} onChange={(event) => updateProcessCard(card.id, 'theme', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary">
                      {PROCESS_THEME_OPTIONS.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Texto</label>
                    <textarea value={card.text} onChange={(event) => updateProcessCard(card.id, 'text', event.target.value)} rows={5} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
                  </div>
                </div>
              </div>
              );
            })}
          </section>

          <aside className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
            <div className="mb-5 flex items-center gap-3">
              <Layers3 className="h-5 w-5 text-secondary" />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Cierre</p>
                <h2 className="text-xl font-black text-on-surface">Frase y CTA</h2>
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Título del proceso</label>
                <input value={content.general.processTitle} onChange={(event) => updateGeneralField('processTitle', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Cita final</label>
                <textarea value={content.general.closingQuote} onChange={(event) => updateGeneralField('closingQuote', event.target.value)} rows={5} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-on-surface-variant">Botón</label>
                <input value={content.general.closingButton} onChange={(event) => updateGeneralField('closingButton', event.target.value)} className="w-full rounded-2xl border border-outline-variant/30 bg-surface px-4 py-3 text-sm text-on-surface outline-none focus:border-secondary" />
              </div>
            </div>
          </aside>
        </div>
      )}

      <section className="rounded-[2rem] border border-outline-variant/20 bg-surface-container-low p-6 shadow-xl">
        <div className="mb-5 flex items-center gap-3">
          <Save className="h-5 w-5 text-secondary" />
          <div>
            <p className="text-xs font-black uppercase tracking-[0.25em] text-secondary">Acciones globales</p>
            <h2 className="text-xl font-black text-on-surface">Guardar o restaurar</h2>
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={handleSave} className="flex items-center gap-2 rounded-2xl bg-secondary px-5 py-3 text-sm font-black uppercase tracking-[0.16em] text-surface hover:brightness-110"><Save className="h-4 w-4" />Guardar arte</button>
          <button type="button" onClick={handleReset} className="flex items-center gap-2 rounded-2xl border border-outline-variant px-5 py-3 text-sm font-bold text-on-surface hover:bg-surface"><RotateCcw className="h-4 w-4" />Restablecer editor</button>
          <button type="button" onClick={handleClearSaved} className="flex items-center gap-2 rounded-2xl border border-error/40 px-5 py-3 text-sm font-bold text-error hover:bg-error/10"><Trash2 className="h-4 w-4" />Borrar cambios guardados</button>
        </div>
      </section>
    </div>
  );
}