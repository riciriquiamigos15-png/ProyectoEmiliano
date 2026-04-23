import {
  clearDiabloHotspotsFromStorage,
  DIABLO_CARD_IMAGE,
  DIABLO_DETAIL_IMAGE,
  defaultDiabloHotspotsEs,
  type HistoryHotspot,
} from '@/lib/historyHotspots';
import { apiClient } from '@/services/api';

export type HistoryGeneralContent = {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  sectionTitle: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  quote: string;
  protagonistsEyebrow: string;
  protagonistsTitle: string;
  protagonistsSubtitle: string;
  protagonistsHint: string;
  protagonistsListTitle: string;
  protagonistsDetailTitle: string;
  protagonistsOpenButton: string;
  protagonistsCloseButton: string;
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
};

export type EditableHistoryCharacter = {
  id: string;
  name: string;
  desc: string;
  detail: string;
  img: string;
  detailImg?: string;
  interactiveEnabled: boolean;
  hotspots: HistoryHotspot[];
};

export type HistoryEditorContent = {
  general: HistoryGeneralContent;
  characters: EditableHistoryCharacter[];
};

export const HISTORY_EDITOR_STORAGE_KEY = 'diablada:history:editor-content';
export const HISTORY_EDITOR_UPDATED_EVENT = 'diablada:history:editor-content-updated';

export const defaultHistoryGeneralContent: HistoryGeneralContent = {
  badge: 'Memoria Viva',
  title: 'EL ORIGEN DEL',
  titleAccent: 'RITUAL',
  description: 'Nacida de la resistencia y el misticismo, la Diablada de Píllaro no es solo una danza; es el grito de un pueblo que transformó la opresión en una manifestación de arte y libertad.',
  sectionTitle: 'Crónicas de Rebelión y Fe',
  paragraph1: 'Las raíces de la Diablada Pillareña se hunden en el tiempo de la colonia. Según la tradición oral, el festejo surgió como una forma de rebeldía de los campesinos frente a la rigidez de las instituciones coloniales y las élites de la época.',
  paragraph2: 'Originalmente, se dice que los jóvenes de las zonas rurales se disfrazaban de diablos para asustar a los forasteros y proteger sus territorios de cortejo. Con el paso de los siglos, esta travesura se transformó en una coreografía ritualizada que hoy es reconocida como Patrimonio Cultural del Ecuador.',
  paragraph3: 'A partir del siglo XX, la festividad se consolidó entre el 1 y el 6 de enero de cada año. La evolución ha sido constante: desde máscaras sencillas de cartón hasta las impresionantes obras de arte contemporáneas hechas de papel maché, cuernos reales de ganado y moldes de yeso que pueden pesar hasta 20 libras.',
  quote: 'El diablo de Píllaro no representa al mal bíblico, sino a la libertad desenfrenada y al poder de la identidad local frente a lo impuesto.',
  protagonistsEyebrow: 'Exploración interactiva',
  protagonistsTitle: 'Los Protagonistas',
  protagonistsSubtitle: 'La jerarquía y el simbolismo de la comparsa',
  protagonistsHint: 'Haz clic o pasa el cursor sobre los puntos para descubrir cada elemento del personaje.',
  protagonistsListTitle: 'Elementos destacados',
  protagonistsDetailTitle: 'Anatomía del personaje',
  protagonistsOpenButton: 'Ver más información',
  protagonistsCloseButton: 'Ocultar información',
  ctaTitle: '¿Deseas saber más?',
  ctaDescription: 'Explora nuestros archivos digitales sobre la fabricación artesanal de máscaras y la evolución de los pasos de baile a través de las décadas.',
  ctaButton: 'Ver Documental',
};

function cloneHotspots(hotspots: HistoryHotspot[]) {
  return hotspots.map((hotspot) => ({ ...hotspot }));
}

export const defaultHistoryCharacters: EditableHistoryCharacter[] = [
  {
    id: 'diablo',
    name: 'El Diablo',
    desc: 'El alma de la fiesta. Ataviado con su imponente máscara y traje de terciopelo rojo. Su danza es saltarina, representando la agilidad y el descontrol festivo. Es quien guía la energía de la comparsa con su látigo o fuete.',
    detail: 'Explora cada parte del traje del diablo y descubre cómo sus materiales, accesorios y colores construyen uno de los personajes más representativos de la Diablada Pillareña.',
    img: DIABLO_CARD_IMAGE,
    detailImg: DIABLO_DETAIL_IMAGE,
    interactiveEnabled: true,
    hotspots: cloneHotspots(defaultDiabloHotspotsEs),
  },
  {
    id: 'guaricha',
    name: 'La Guaricha',
    desc: 'Personaje femenino pícaro y alegre que representa a las mujeres del pueblo. Lleva una careta artesanal adornada y trajes coloridos. Su rol es interactuar con el público, bromear, bailar y difundir la alegría festiva por las calles con movimientos dinámicos y desenfadados.',
    detail: 'La Guaricha combina juego escénico, color y cercanía con el público. Sus detalles resaltan el carácter festivo y expresivo de la comparsa.',
    img: '/contenido/historia/Guaricha_2.png',
    interactiveEnabled: true,
    hotspots: [
      { id: 'careta', label: 'Careta', title: 'Careta (Obligatoria)', description: 'La careta es un elemento obligatorio en la guaricha. Está elaborada con malla de alambre, recubierta y moldeada para formar un rostro femenino. Representa una figura caricaturizada de la mujer dentro de la festividad, resaltando la expresión, el maquillaje exagerado y los rasgos llamativos propios del personaje.', x: 48, y: 26 },
      { id: 'sombrero', label: 'Sombrero', title: 'Sombrero o Adorno de Cabeza', description: 'Puede ser un sombrero o un adorno elaborado con telas, cintas y flores. Generalmente es colorido y llamativo, usando tonos como rojo, rosado o multicolor. En algunos casos se decora con encajes o elementos brillantes para resaltar durante la danza.', x: 50, y: 12 },
      { id: 'panuelo', label: 'Pañuelo', title: 'Pañuelo', description: 'Se utiliza como complemento en el cuello o en la cabeza. Es de tela ligera y con colores llamativos que combinan con el resto del vestuario.', x: 49, y: 34 },
      { id: 'bata', label: 'Bata', title: 'Bata (Antes llamada “Combinación”)', description: 'La prenda principal no es una blusa ni una falda por separado, sino una bata completa. Antiguamente se la conocía como “combinación”, ya que integra en una sola prenda lo que sería la blusa y la falda. Es de tela ligera, generalmente con colores vivos o estampados florales, y puede incluir detalles como encajes, pliegues o adornos. Esta bata permite mayor comodidad y movimiento durante la danza, además de mantener el estilo tradicional del personaje.', x: 50, y: 56 },
      { id: 'guantes', label: 'Guantes', title: 'Guantes', description: 'Los guantes complementan el traje y pueden ser de tela o material sintético. Generalmente son de colores como negro, blanco o rojo, combinando con la vestimenta.', x: 69, y: 47 },
      { id: 'medias', label: 'Medias', title: 'Medias', description: 'Las medias suelen ser largas y pueden ser de color piel, negro o tonos llamativos. Ayudan a completar la estética del personaje.', x: 48, y: 78 },
      { id: 'zapatos', label: 'Zapatos', title: 'Zapatos', description: 'Los zapatos son generalmente de lona y de color negro, ya que brindan comodidad y resistencia para bailar durante largos periodos.', x: 49, y: 93 },
    ],
  },
  {
    id: 'capariche',
    name: 'El Capariche',
    desc: 'El barrendero ritual encargado de abrir paso a la comparsa. Barre simbólicamente las malas energías del camino con su escoba de retama, preparando el terreno sagrado para la procesión. Es una figura de purificación y preparación espiritual.',
    detail: 'En el Capariche, la indumentaria y sus herramientas refuerzan la idea de limpieza ritual y preparación del camino para el resto de personajes.',
    img: '/contenido/historia/Capariche_3.png',
    interactiveEnabled: true,
    hotspots: [
      { id: 'sombrero', label: 'Sombrero', title: 'Sombrero o remate superior', description: 'La parte superior del personaje ordena su silueta y ayuda a distinguirlo dentro del grupo, reforzando su identidad como figura de apertura.', x: 52, y: 16 },
      { id: 'vestuario', label: 'Vestuario', title: 'Vestuario funcional', description: 'Su ropa remite al trabajo y al movimiento constante. La composición visual del traje conecta al personaje con su función de preparar el recorrido.', x: 49, y: 54 },
      { id: 'escoba', label: 'Escoba', title: 'Escoba ritual', description: 'La escoba es su atributo principal. Simboliza la limpieza simbólica del trayecto y convierte su presencia en un acto de purificación dentro de la fiesta.', x: 67, y: 73 },
    ],
  },
  {
    id: 'pareja-linea',
    name: 'Pareja de Línea',
    desc: 'Personajes que forman parejas coreografiadas en la estructura de la comparsa. Representan la unidad, la coordinación y el trabajo en equipo. Su danza sincronizada muestra la disciplina y el rigor de la tradición ancestral mantenida a través de las generaciones.',
    detail: 'La Pareja de Línea reúne la elegancia del vestuario masculino y femenino dentro de una sola escena. Explora las prendas y adornos de ambos integrantes para entender cómo se construye su presencia dentro de la comparsa.',
    img: '/contenido/historia/ParejaDeLinea_4.png',
    interactiveEnabled: true,
    hotspots: [
      { id: 'h-careta', label: 'H Careta', title: 'Hombre: Careta', description: 'El hombre utiliza una careta elaborada con materiales como malla, alambre o fibra, que cubre el rostro. A diferencia del diablo, esta máscara suele ser más estilizada y menos agresiva, con rasgos definidos.', x: 24, y: 20 },
      { id: 'h-sombrero', label: 'H Sombrero', title: 'Hombre: Sombrero o tocado', description: 'En algunos casos el hombre lleva un sombrero o tocado decorado que complementa la elegancia del conjunto, aunque no siempre es una pieza obligatoria.', x: 22, y: 8 },
      { id: 'h-camisa', label: 'H Camisa', title: 'Hombre: Camisa', description: 'La camisa suele ser de color blanco, creando un contraste claro que resalta los demás elementos decorativos del vestuario.', x: 29, y: 44 },
      { id: 'h-panuelo', label: 'H Pañuelo', title: 'Hombre: Pañuelo', description: 'El pañuelo se ubica en el cuello o sobre el pecho, aportando color, movimiento y un toque de elegancia tradicional al traje.', x: 28, y: 28 },
      { id: 'h-chaqueta', label: 'H Chaqueta', title: 'Hombre: Chaqueta o saco', description: 'Puede usar una chaqueta o saco decorado con colores vivos, bordados o detalles brillantes que enriquecen la presencia visual del personaje.', x: 18, y: 36 },
      { id: 'h-pantalon', label: 'H Pantalón', title: 'Hombre: Pantalón', description: 'El pantalón suele ser de tela, ajustado o semi-ajustado, y se combina con colores llamativos o sobrios según el diseño del traje.', x: 24, y: 80 },
      { id: 'h-adornos', label: 'H Adornos', title: 'Hombre: Adornos tipo faldón o nagua decorativa', description: 'Alrededor de la cintura o sobre el pantalón se colocan adornos de papel brillante o celofán. Estos elementos se mueven durante la danza y dan mayor vistosidad al traje.', x: 33, y: 69 },
      { id: 'h-zapatos', label: 'H Zapatos', title: 'Hombre: Zapatos', description: 'Generalmente son de color negro y están pensados para brindar comodidad y resistencia durante la danza.', x: 23, y: 94 },
      { id: 'm-careta', label: 'M Careta', title: 'Mujer: Careta', description: 'La mujer puede usar una máscara similar a la del hombre, hecha de malla o materiales ligeros, pero con rasgos más delicados.', x: 58, y: 21 },
      { id: 'm-corona', label: 'M Corona', title: 'Mujer: Corona', description: 'La corona decorativa se elabora con cartón, papel brillante o celofán y utiliza colores llamativos que resaltan durante la danza.', x: 56, y: 9 },
      { id: 'm-panuelos', label: 'M Pañuelos', title: 'Mujer: Pañuelos', description: 'Los pañuelos decorativos se colocan en la cabeza o en el cuello, aportando color, volumen y movimiento al personaje.', x: 54, y: 28 },
      { id: 'm-blusa', label: 'M Blusa', title: 'Mujer: Blusa', description: 'La blusa suele ser de colores vivos o incluir bordados, encajes y otros detalles decorativos que resaltan la feminidad del conjunto.', x: 56, y: 40 },
      { id: 'm-vestido', label: 'M Vestido', title: 'Mujer: Bata o vestido', description: 'La prenda principal es una bata o vestido amplio, colorido y llamativo, pensado para facilitar el movimiento durante la danza.', x: 58, y: 63 },
      { id: 'm-adornos', label: 'M Adornos', title: 'Mujer: Adornos tipo nagua o faldón', description: 'En la parte inferior puede llevar adornos de papel celofán u otros materiales brillantes que dan volumen, movimiento y mayor presencia escénica.', x: 69, y: 73 },
      { id: 'm-medias', label: 'M Medias', title: 'Mujer: Medias', description: 'Las medias pueden ser de color piel, blanco u otros tonos que armonicen con el traje y completen la estética del personaje.', x: 58, y: 89 },
      { id: 'm-zapatos', label: 'M Zapatos', title: 'Mujer: Zapatos', description: 'Los zapatos suelen ser cómodos, generalmente negros o acordes al vestuario, para acompañar el movimiento continuo de la comparsa.', x: 63, y: 95 },
    ],
  },
  {
    id: 'chorizo',
    name: 'El Chorizo',
    desc: 'Personaje satírico que porta un látigo o chorizo y aporta humor mediante movimientos exagerados y burlescos. Su función es entretener y bromear con los espectadores, añadiendo un toque de comedia física y desenfado a la procesión ritual.',
    detail: 'El Chorizo destaca por su apariencia humorística, sus accesorios llamativos y el uso del chorizo como eje de su actuación. Recorre cada parte del traje para entender cómo se construye su carácter burlesco dentro de la comparsa.',
    img: '/contenido/historia/Chorizo_5.png',
    interactiveEnabled: true,
    hotspots: [
      { id: 'sombrero-tocado', label: 'Sombrero', title: 'Accesorio llamativo y humorístico', description: 'Puede utilizar un gorro de payaso o un sombrero llamativo, adaptado de forma creativa para resaltar su carácter burlesco. Este elemento ayuda a destacar visualmente al personaje dentro de la comparsa y refuerza su estilo divertido.', x: 50, y: 11 },
      { id: 'rostro-mascara', label: 'Rostro', title: 'Expresión cómica del personaje', description: 'Puede presentarse con el rostro descubierto o utilizar una careta sencilla. A diferencia de otros personajes, su objetivo no es imponer, sino generar humor mediante expresiones exageradas que conectan con el público.', x: 50, y: 24 },
      { id: 'traje', label: 'Traje', title: 'Vestimenta principal del chorizo', description: 'Utiliza un traje completo, ya sea de una sola pieza o compuesto por chaqueta y pantalón. Los colores suelen ser llamativos o combinados de forma poco convencional, lo que refuerza su apariencia exagerada y su papel cómico.', x: 50, y: 56 },
      { id: 'panuelo', label: 'Pañuelo', title: 'Accesorio decorativo', description: 'Se coloca en el cuello y aporta color al vestuario. Además, genera movimiento durante la danza, complementando el estilo dinámico y alegre del personaje.', x: 46, y: 34 },
      { id: 'adornos', label: 'Adornos', title: 'Elementos creativos del traje', description: 'Incluye cintas, telas y otros detalles decorativos colocados de forma libre. Estos elementos hacen que el traje sea más vistoso y contribuyen a su apariencia única y llamativa.', x: 64, y: 55 },
      { id: 'zapatos', label: 'Zapatos', title: 'Calzado para la danza', description: 'Utiliza zapatos cómodos, generalmente de color oscuro, que le permiten moverse con facilidad. Son importantes para ejecutar sus movimientos exagerados durante la presentación.', x: 44, y: 92 },
      { id: 'latigo-chorizo', label: 'Chorizo', title: 'Elemento principal de humor', description: 'Porta un látigo o “chorizo”, que utiliza para generar humor mediante movimientos exagerados y burlescos. Este accesorio es fundamental en su actuación, ya que le permite interactuar con el público y dar vida a su personaje.', x: 50, y: 47 },
    ],
  },
  {
    id: 'cabecilla',
    name: 'El Cabecilla',
    desc: 'El organizador y autoridad máxima de la comparsa. Es quien coordina la logística, la música, el orden y el bienestar de todos los participantes. Su presencia impone respeto y asegura que la tradición se mantenga fiel a sus raíces ancestrales.',
    detail: 'El Cabecilla proyecta liderazgo y control. Su imagen reúne elementos que hacen visible su autoridad dentro del grupo y su función organizadora.',
    img: '/contenido/historia/Cabecilla_6.png',
    interactiveEnabled: true,
    hotspots: [
      { id: 'mascara', label: 'Rostro', title: 'Rostro y presencia', description: 'La zona del rostro concentra carácter y jerarquía. Es el primer elemento que comunica mando y reconocimiento dentro de la comparsa.', x: 49, y: 27 },
      { id: 'mando', label: 'Insignia', title: 'Elemento de mando', description: 'Los accesorios o detalles asociados al liderazgo refuerzan su papel como guía, coordinador y figura de referencia para el resto del grupo.', x: 64, y: 56 },
      { id: 'vestimenta', label: 'Vestimenta', title: 'Vestimenta de autoridad', description: 'Su traje articula respeto, orden y solemnidad. La composición visual busca distinguirlo claramente del resto de personajes.', x: 50, y: 67 },
    ],
  },
  {
    id: 'boxeador',
    name: 'El Boxeador',
    desc: 'Un elemento satírico que se mofa de la fuerza bruta y la vanidad. Con guantes y movimientos exagerados, aporta humor y comedia física a la procesión. Desafía amistosamente a los espectadores a duelos simbólicos llenos de gracia y jocosidad.',
    detail: 'El Boxeador mezcla sátira, teatralidad y acción física. Sus puntos interactivos permiten identificar cómo cada parte del personaje aporta a su tono caricaturesco.',
    img: '/contenido/historia/Boxeador_1.jpg',
    interactiveEnabled: true,
    hotspots: [
      { id: 'careta', label: 'Careta', title: 'Careta o máscara', description: 'La zona del rostro concentra la identidad caricaturesca del Boxeador. Allí se expresa el tono de parodia que define al personaje.', x: 50, y: 27 },
      { id: 'guantes', label: 'Guantes', title: 'Guantes de box', description: 'Los guantes son el elemento más reconocible del personaje. Funcionan como símbolo inmediato de combate lúdico y humor escénico.', x: 70, y: 58 },
      { id: 'indumentaria', label: 'Indumentaria', title: 'Indumentaria corporal', description: 'El resto del traje completa la parodia visual y ayuda a transformar la figura del boxeador en un personaje ritual dentro del desfile.', x: 50, y: 71 },
    ],
  },
];

export const defaultHistoryEditorContent: HistoryEditorContent = {
  general: { ...defaultHistoryGeneralContent },
  characters: defaultHistoryCharacters.map((character) => ({
    ...character,
    hotspots: cloneHotspots(character.hotspots),
  })),
};

function cloneContent(content: HistoryEditorContent): HistoryEditorContent {
  return {
    general: { ...content.general },
    characters: content.characters.map((character) => ({
      ...character,
      hotspots: cloneHotspots(character.hotspots),
    })),
  };
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
    && typeof candidate.y === 'number';
}

function isEditableCharacter(value: unknown): value is EditableHistoryCharacter {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === 'string'
    && typeof candidate.name === 'string'
    && typeof candidate.desc === 'string'
    && typeof candidate.detail === 'string'
    && typeof candidate.img === 'string'
    && (typeof candidate.detailImg === 'string' || typeof candidate.detailImg === 'undefined')
    && typeof candidate.interactiveEnabled === 'boolean'
    && Array.isArray(candidate.hotspots)
    && candidate.hotspots.every(isHistoryHotspot);
}

function isGeneralContent(value: unknown): value is HistoryGeneralContent {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.badge === 'string'
    && typeof candidate.title === 'string'
    && typeof candidate.titleAccent === 'string'
    && typeof candidate.description === 'string'
    && typeof candidate.sectionTitle === 'string'
    && typeof candidate.paragraph1 === 'string'
    && typeof candidate.paragraph2 === 'string'
    && typeof candidate.paragraph3 === 'string'
    && typeof candidate.quote === 'string'
    && typeof candidate.protagonistsEyebrow === 'string'
    && typeof candidate.protagonistsTitle === 'string'
    && typeof candidate.protagonistsSubtitle === 'string'
    && typeof candidate.protagonistsHint === 'string'
    && typeof candidate.protagonistsListTitle === 'string'
    && typeof candidate.protagonistsDetailTitle === 'string'
    && typeof candidate.protagonistsOpenButton === 'string'
    && typeof candidate.protagonistsCloseButton === 'string'
    && typeof candidate.ctaTitle === 'string'
    && typeof candidate.ctaDescription === 'string'
    && typeof candidate.ctaButton === 'string';
}

export function readHistoryEditorContent(): HistoryEditorContent {
  return cloneContent(defaultHistoryEditorContent);
}

export async function fetchHistoryEditorContent(): Promise<HistoryEditorContent> {
  const fallback = readHistoryEditorContent();

  // Intentar con el backend Express primero
  const response = await apiClient.historia.editorContent.get();
  if (
    response.success
    && response.data
    && isGeneralContent(response.data.general)
    && Array.isArray(response.data.characters)
    && response.data.characters.every(isEditableCharacter)
  ) {
    return cloneContent(response.data);
  }

  // Fallback: leer el JSON estático (funciona en Netlify sin backend)
  try {
    const res = await fetch('/contenido/historia/editor-content.json');
    if (res.ok) {
      const data = await res.json();
      if (
        data
        && isGeneralContent(data.general)
        && Array.isArray(data.characters)
        && data.characters.every(isEditableCharacter)
      ) {
        return cloneContent(data);
      }
    }
  } catch {
    // ignorar error de fetch estático
  }

  return fallback;
}

export async function saveHistoryEditorContent(content: HistoryEditorContent): Promise<boolean> {
  const response = await apiClient.historia.editorContent.save(content);
  if (!response.success) {
    return false;
  }

  if (typeof window !== 'undefined') {
    clearDiabloHotspotsFromStorage();
    window.dispatchEvent(new Event(HISTORY_EDITOR_UPDATED_EVENT));
  }

  return true;
}

export async function resetHistoryEditorContent(): Promise<boolean> {
  const response = await apiClient.historia.editorContent.reset();
  if (!response.success) {
    return false;
  }

  if (typeof window === 'undefined') {
    return true;
  }

  clearDiabloHotspotsFromStorage();
  window.dispatchEvent(new Event(HISTORY_EDITOR_UPDATED_EVENT));
  return true;
}
