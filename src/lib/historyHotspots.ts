export type HistoryHotspot = {
  id: string;
  label: string;
  title: string;
  description: string;
  x: number;
  y: number;
};

export const DIABLO_HOTSPOTS_STORAGE_KEY = 'diablada:history:diablo-hotspots';
export const DIABLO_HOTSPOTS_UPDATED_EVENT = 'diablada:history:diablo-hotspots-updated';
export const DIABLO_CARD_IMAGE = '/contenido/historia/Diablo_1.jpg';
export const DIABLO_DETAIL_IMAGE = '/contenido/historia/Diablo_2_CurpoCompleto.png';

export const defaultDiabloHotspotsEs: HistoryHotspot[] = [
  {
    id: 'coronilla',
    label: 'Coronilla',
    title: 'Coronilla',
    description: 'Es la parte superior del traje del diablo, caracterizada por su gran tamaño y colores llamativos. Esta decorada con materiales como papel brillante, celofan y otros elementos que le dan un aspecto festivo y tradicional.',
    x: 51,
    y: 10,
  },
  {
    id: 'careta',
    label: 'Careta',
    title: 'Careta',
    description: 'Es la mascara que representa el rostro del diablo, con rasgos llamativos como cuernos, colmillos y expresiones intensas. Puede elaborarse con materiales como papel mache o fibra de vidrio.',
    x: 51,
    y: 24,
  },
  {
    id: 'panuelo',
    label: 'Panuelo',
    title: 'Panuelo',
    description: 'Es un accesorio que se coloca en el cuello, aportando color y estilo al traje. Ademas, complementa la vestimenta tradicional del personaje.',
    x: 51,
    y: 31,
  },
  {
    id: 'blusa',
    label: 'Blusa',
    title: 'Blusa',
    description: 'Es la prenda superior del traje, generalmente de colores vivos o con disenos florales. En muchos casos, se utilizan blusas tradicionales que pueden ser heredadas o adaptadas.',
    x: 40,
    y: 46,
  },
  {
    id: 'guantes',
    label: 'Guantes',
    title: 'Guantes',
    description: 'Los guantes forman parte del atuendo y ayudan a completar la apariencia del personaje, aportando uniformidad y proteccion.',
    x: 67,
    y: 38,
  },
  {
    id: 'acial-o-fuete',
    label: 'Acial o Fuete',
    title: 'Acial o Fuete',
    description: 'Es un objeto elaborado generalmente con cuerda o cuero, utilizado por el personaje como simbolo de autoridad y para generar sonido durante la danza.',
    x: 52,
    y: 55,
  },
  {
    id: 'pantalon-corto',
    label: 'Pantalon corto',
    title: 'Pantalon corto',
    description: 'Es una prenda que llega hasta las rodillas, comunmente de colores como rojo o negro. Esta hecha de tela y permite mayor movilidad durante la danza.',
    x: 50,
    y: 72,
  },
  {
    id: 'medias',
    label: 'Medias',
    title: 'Medias',
    description: 'Son parte del vestuario que cubre las piernas. Pueden ser de color piel, rojo o negro, y complementan el conjunto del traje.',
    x: 51,
    y: 87,
  },
  {
    id: 'zapatos',
    label: 'Zapatos',
    title: 'Zapatos',
    description: 'Generalmente son de lona y de color negro. Son comodos y adecuados para resistir el movimiento constante durante la danza.',
    x: 51,
    y: 97,
  },
];

export const defaultDiabloHotspotsEn: HistoryHotspot[] = [
  {
    id: 'coronilla',
    label: 'Crown',
    title: 'Crown',
    description: 'It is the upper part of the Devil costume, known for its large size and striking colors. It is decorated with shiny paper, cellophane, and other elements that create a festive traditional look.',
    x: 51,
    y: 10,
  },
  {
    id: 'careta',
    label: 'Mask',
    title: 'Mask',
    description: 'It is the mask that represents the Devil face, with striking features such as horns, fangs, and intense expressions. It can be made from papier-mache or fiberglass.',
    x: 51,
    y: 24,
  },
  {
    id: 'scarf',
    label: 'Scarf',
    title: 'Scarf',
    description: 'It is an accessory worn around the neck, adding color and style to the costume. It also complements the traditional attire of the character.',
    x: 51,
    y: 31,
  },
  {
    id: 'blouse',
    label: 'Blouse',
    title: 'Blouse',
    description: 'It is the upper garment of the costume, usually in vivid colors or floral patterns. In many cases, traditional blouses are used, either inherited or adapted.',
    x: 40,
    y: 46,
  },
  {
    id: 'gloves',
    label: 'Gloves',
    title: 'Gloves',
    description: 'The gloves are part of the outfit and help complete the character appearance, adding uniformity and protection.',
    x: 67,
    y: 38,
  },
  {
    id: 'whip',
    label: 'Whip',
    title: 'Whip',
    description: 'It is generally made of rope or leather and is used by the character as a symbol of authority and to produce sound during the dance.',
    x: 52,
    y: 55,
  },
  {
    id: 'short-pants',
    label: 'Short pants',
    title: 'Short pants',
    description: 'It is a garment that reaches the knees, commonly in colors such as red or black. It is made of fabric and allows greater mobility during the dance.',
    x: 50,
    y: 72,
  },
  {
    id: 'stockings',
    label: 'Stockings',
    title: 'Stockings',
    description: 'They are part of the costume that covers the legs. They can be skin-colored, red, or black, and they complete the outfit.',
    x: 51,
    y: 87,
  },
  {
    id: 'shoes',
    label: 'Shoes',
    title: 'Shoes',
    description: 'They are generally black canvas shoes. They are comfortable and suitable for constant movement during the dance.',
    x: 51,
    y: 97,
  },
];

export function cloneDiabloHotspotsEs() {
  return defaultDiabloHotspotsEs.map((hotspot) => ({ ...hotspot }));
}

function isHistoryHotspot(value: unknown): value is HistoryHotspot {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;

  return typeof candidate.id === 'string'
    && typeof candidate.label === 'string'
    && typeof candidate.title === 'string'
    && typeof candidate.description === 'string'
    && typeof candidate.x === 'number'
    && Number.isFinite(candidate.x)
    && typeof candidate.y === 'number'
    && Number.isFinite(candidate.y);
}

export function readDiabloHotspotsFromStorage() {
  if (typeof window === 'undefined') {
    return null;
  }

  const rawValue = window.localStorage.getItem(DIABLO_HOTSPOTS_STORAGE_KEY);
  if (!rawValue) {
    return null;
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (!Array.isArray(parsed) || !parsed.every(isHistoryHotspot)) {
      return null;
    }

    return parsed.map((hotspot) => ({ ...hotspot }));
  } catch {
    return null;
  }
}

export function saveDiabloHotspotsToStorage(hotspots: HistoryHotspot[]) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(DIABLO_HOTSPOTS_STORAGE_KEY, JSON.stringify(hotspots));
  window.dispatchEvent(new Event(DIABLO_HOTSPOTS_UPDATED_EVENT));
}

export function clearDiabloHotspotsFromStorage() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(DIABLO_HOTSPOTS_STORAGE_KEY);
  window.dispatchEvent(new Event(DIABLO_HOTSPOTS_UPDATED_EVENT));
}

export function mergeLocalizedHotspots(baseHotspots: HistoryHotspot[], overrideHotspots: HistoryHotspot[]) {
  const overridesById = new Map(overrideHotspots.map((hotspot) => [hotspot.id, hotspot]));

  return baseHotspots.map((hotspot) => {
    const override = overridesById.get(hotspot.id);
    return override ? { ...override } : { ...hotspot };
  });
}

export function mergeHotspotPositions(baseHotspots: HistoryHotspot[], overrideHotspots: HistoryHotspot[]) {
  const overridesById = new Map(overrideHotspots.map((hotspot) => [hotspot.id, hotspot]));

  return baseHotspots.map((hotspot) => {
    const override = overridesById.get(hotspot.id);
    if (!override) {
      return { ...hotspot };
    }

    return {
      ...hotspot,
      x: override.x,
      y: override.y,
    };
  });
}
