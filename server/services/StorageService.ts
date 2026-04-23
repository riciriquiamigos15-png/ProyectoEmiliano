import fs from 'fs';
import path from 'path';

const CONTENIDO_DIR = path.join(process.cwd(), 'contenido');
const HISTORIA_EDITOR_FILE = path.join(CONTENIDO_DIR, 'historia', 'editor-content.json');
const ARTE_EDITOR_FILE = path.join(CONTENIDO_DIR, 'arte', 'editor-content.json');

// Asegurar que la carpeta contenido existe
function ensureDirExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Inicializar estructura de carpetas
export function initializeStorage() {
  ensureDirExists(CONTENIDO_DIR);
  ensureDirExists(path.join(CONTENIDO_DIR, 'historia'));
  ensureDirExists(path.join(CONTENIDO_DIR, 'arte'));
  ensureDirExists(path.join(CONTENIDO_DIR, 'musica'));
  ensureDirExists(path.join(CONTENIDO_DIR, 'informacion'));
  ensureDirExists(path.join(CONTENIDO_DIR, 'inicio'));
  ensureDirExists(path.join(CONTENIDO_DIR, 'imagenes'));
}

// Leer archivo JSON
export function readJSON(filePath: string, defaultValue: any = null) {
  try {
    if (!fs.existsSync(filePath)) {
      if (defaultValue !== null) {
        writeJSON(filePath, defaultValue);
        return defaultValue;
      }
      return null;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return defaultValue;
  }
}

// Escribir archivo JSON
export function writeJSON(filePath: string, data: any) {
  try {
    const dir = path.dirname(filePath);
    ensureDirExists(dir);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filePath}:`, error);
    return false;
  }
}

// Operaciones específicas para cada sección
export const StorageService = {
  // HISTORIA
  historia: {
    getMain: () =>
      readJSON(path.join(CONTENIDO_DIR, 'historia', 'data.json'), {
        titulo: 'La Danza de los Mil Demonios',
        descripcion: 'Una crónica sobre los orígenes, la rebeldía y el fuego que forjó la identidad de Píllaro.',
        imagen: '',
        contenido: '',
      }),
    saveMain: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'historia', 'data.json'), data),

    getEditorContent: () =>
      readJSON(HISTORIA_EDITOR_FILE, null),
    saveEditorContent: (data: any) =>
      writeJSON(HISTORIA_EDITOR_FILE, data),
    resetEditorContent: () => {
      try {
        if (fs.existsSync(HISTORIA_EDITOR_FILE)) {
          fs.unlinkSync(HISTORIA_EDITOR_FILE);
        }
        return true;
      } catch (error) {
        console.error('Error deleting history editor content:', error);
        return false;
      }
    },

    getPersonajes: () =>
      readJSON(path.join(CONTENIDO_DIR, 'historia', 'personajes.json'), []),
    savePersonajes: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'historia', 'personajes.json'), data),

    getPersonaje: (id: string) => {
      const personajes = StorageService.historia.getPersonajes();
      return personajes.find((p: any) => p.id === id);
    },
    addPersonaje: (personaje: any) => {
      const personajes = StorageService.historia.getPersonajes();
      personaje.id = Date.now().toString();
      personajes.push(personaje);
      StorageService.historia.savePersonajes(personajes);
      return personaje;
    },
    updatePersonaje: (id: string, personaje: any) => {
      const personajes = StorageService.historia.getPersonajes();
      const index = personajes.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        personajes[index] = { ...personajes[index], ...personaje };
        StorageService.historia.savePersonajes(personajes);
        return personajes[index];
      }
      return null;
    },
    deletePersonaje: (id: string) => {
      const personajes = StorageService.historia.getPersonajes();
      const filtered = personajes.filter((p: any) => p.id !== id);
      StorageService.historia.savePersonajes(filtered);
      return true;
    },
  },

  // ARTE
  arte: {
    getMain: () =>
      readJSON(path.join(CONTENIDO_DIR, 'arte', 'data.json'), {
        titulo: 'El Arte de la Diablada',
        descripcion: 'Conoce a los artistas que crean las máscaras legendarias.',
        imagenes: [],
      }),
    saveMain: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'arte', 'data.json'), data),

    getEditorContent: () =>
      readJSON(ARTE_EDITOR_FILE, null),
    saveEditorContent: (data: any) =>
      writeJSON(ARTE_EDITOR_FILE, data),
    resetEditorContent: () => {
      try {
        if (fs.existsSync(ARTE_EDITOR_FILE)) {
          fs.unlinkSync(ARTE_EDITOR_FILE);
        }
        return true;
      } catch (error) {
        console.error('Error deleting art editor content:', error);
        return false;
      }
    },

    getMasks: () =>
      readJSON(path.join(CONTENIDO_DIR, 'arte', 'masks.json'), []),
    saveMasks: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'arte', 'masks.json'), data),

    getMask: (id: string) => {
      const masks = StorageService.arte.getMasks();
      return masks.find((m: any) => m.id === id);
    },
    addMask: (mask: any) => {
      const masks = StorageService.arte.getMasks();
      mask.id = Date.now().toString();
      masks.push(mask);
      StorageService.arte.saveMasks(masks);
      return mask;
    },
    updateMask: (id: string, mask: any) => {
      const masks = StorageService.arte.getMasks();
      const index = masks.findIndex((m: any) => m.id === id);
      if (index !== -1) {
        masks[index] = { ...masks[index], ...mask };
        StorageService.arte.saveMasks(masks);
        return masks[index];
      }
      return null;
    },
    deleteMask: (id: string) => {
      const masks = StorageService.arte.getMasks();
      const filtered = masks.filter((m: any) => m.id !== id);
      StorageService.arte.saveMasks(filtered);
      return true;
    },
  },

  // MÚSICA
  musica: {
    getMain: () =>
      readJSON(path.join(CONTENIDO_DIR, 'musica', 'data.json'), {
        titulo: 'La Música de Píllaro',
        descripcion: 'Los sonidos que dan vida a la Diablada.',
        imagenes: [],
      }),
    saveMain: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'musica', 'data.json'), data),

    getBandas: () =>
      readJSON(path.join(CONTENIDO_DIR, 'musica', 'bandas.json'), []),
    saveBandas: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'musica', 'bandas.json'), data),

    getBanda: (id: string) => {
      const bandas = StorageService.musica.getBandas();
      return bandas.find((b: any) => b.id === id);
    },
    addBanda: (banda: any) => {
      const bandas = StorageService.musica.getBandas();
      banda.id = Date.now().toString();
      bandas.push(banda);
      StorageService.musica.saveBandas(bandas);
      return banda;
    },
    updateBanda: (id: string, banda: any) => {
      const bandas = StorageService.musica.getBandas();
      const index = bandas.findIndex((b: any) => b.id === id);
      if (index !== -1) {
        bandas[index] = { ...bandas[index], ...banda };
        StorageService.musica.saveBandas(bandas);
        return bandas[index];
      }
      return null;
    },
    deleteBanda: (id: string) => {
      const bandas = StorageService.musica.getBandas();
      const filtered = bandas.filter((b: any) => b.id !== id);
      StorageService.musica.saveBandas(filtered);
      return true;
    },
  },

  // INFORMACIÓN
  informacion: {
    getMain: () =>
      readJSON(path.join(CONTENIDO_DIR, 'informacion', 'data.json'), {
        titulo: 'Información Práctica',
        fechas: [],
        horarios: [],
        rutas: [],
        recomendaciones: [],
      }),
    saveMain: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'informacion', 'data.json'), data),
  },

  // INICIO
  inicio: {
    getMain: () =>
      readJSON(path.join(CONTENIDO_DIR, 'inicio', 'data.json'), {
        titulo: 'La Diablada Pillareña',
        descripcion: 'Celebración ancestral de Píllaro',
        imagen: '',
        contenido: '',
      }),
    saveMain: (data: any) =>
      writeJSON(path.join(CONTENIDO_DIR, 'inicio', 'data.json'), data),
  },
};
