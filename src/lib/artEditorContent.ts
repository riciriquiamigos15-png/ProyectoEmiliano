import { apiClient } from '@/services/api';

export type ArtTranslationLanguage = 'es' | 'en';

export type ArtGeneralTranslationContent = {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  techniqueLabel: string;
  exploreMask: string;
  biography: string;
  contact: string;
  follow: string;
  galleryTitle: string;
  creationAlt: string;
  watchWork: string;
  videoFallback: string;
  processTitle: string;
  closingQuote: string;
  closingButton: string;
};

export type ArtGeneralTranslationField = keyof ArtGeneralTranslationContent;

export type ArtArtisanTranslationContent = {
  title: string;
  technique: string;
  desc: string;
  fullInfo: string;
  bibliography: string;
};

export type ArtArtisanTranslationField = keyof ArtArtisanTranslationContent;

export type ArtProcessCardTranslationContent = {
  title: string;
  text: string;
};

export type ArtProcessCardTranslationField = keyof ArtProcessCardTranslationContent;

type ArtTranslations<T> = Partial<Record<ArtTranslationLanguage, Partial<T>>>;

export type ArtGeneralContent = ArtGeneralTranslationContent & {
  headlineFontClass: string;
  bodyFontClass: string;
  heroAlignment: 'center' | 'left';
  imageEffect: 'grayscale' | 'color';
  translations?: ArtTranslations<ArtGeneralTranslationContent>;
};

export type ArtContactKind = 'phone' | 'mail' | 'music' | 'link';

export type ArtContact = {
  id: string;
  label: string;
  value: string;
  href: string;
  kind: ArtContactKind;
};

export type ArtArtisan = ArtArtisanTranslationContent & {
  id: string;
  name: string;
  img: string;
  gallery: string[];
  video: string;
  contacts: ArtContact[];
  theme: 'primary' | 'secondary';
  translations?: ArtTranslations<ArtArtisanTranslationContent>;
};

export type ArtProcessCard = ArtProcessCardTranslationContent & {
  id: string;
  theme: 'surface' | 'primary' | 'secondary' | 'outlined';
  translations?: ArtTranslations<ArtProcessCardTranslationContent>;
};

export type ArtEditorContent = {
  general: ArtGeneralContent;
  artisans: ArtArtisan[];
  processCards: ArtProcessCard[];
};

export const ART_EDITOR_UPDATED_EVENT = 'diablada:art:editor-content-updated';

const GENERAL_TRANSLATION_FIELDS: ArtGeneralTranslationField[] = [
  'badge',
  'title',
  'titleAccent',
  'description',
  'techniqueLabel',
  'exploreMask',
  'biography',
  'contact',
  'follow',
  'galleryTitle',
  'creationAlt',
  'watchWork',
  'videoFallback',
  'processTitle',
  'closingQuote',
  'closingButton',
];

const ARTISAN_TRANSLATION_FIELDS: ArtArtisanTranslationField[] = ['title', 'technique', 'desc', 'fullInfo', 'bibliography'];
const PROCESS_TRANSLATION_FIELDS: ArtProcessCardTranslationField[] = ['title', 'text'];

const DEFAULT_EN_GENERAL_TRANSLATIONS: ArtGeneralTranslationContent = {
  badge: 'Artisan Tradition',
  title: 'THE ART OF THE',
  titleAccent: 'MASK',
  description: 'The masks of Píllaro are not mere costumes; they are the soul of the festival. Shaped with paper, paste, and the mystical vision of artisans who inherit centuries of tradition.',
  techniqueLabel: 'Technique',
  exploreMask: 'EXPLORE MASK',
  biography: 'Biography',
  contact: 'Contact',
  follow: 'Follow on:',
  galleryTitle: 'Gallery of Creations',
  creationAlt: 'Creation',
  watchWork: 'See the work in motion',
  videoFallback: 'Your browser does not support HTML5 video',
  processTitle: 'THE RITUAL PROCESS',
  closingQuote: 'It is not the mask that dances, but the spirit that inhabits it.',
  closingButton: 'Visit Workshops',
};

const DEFAULT_EN_ARTISAN_TRANSLATIONS: Record<string, ArtArtisanTranslationContent> = {
  'angel-velasco': {
    title: 'Master Mask Maker',
    technique: 'Clay Modeling',
    desc: 'Velasco uses clay molds he has perfected for more than 40 years. His style is defined by aggressive expressions and the use of authentic cattle horns.',
    fullInfo: 'With a career spanning more than 40 years, Ángel Velasco is considered one of the most respected masters in Píllaro. His masks are works of art that capture the essence of the ritual. Each mask is unique, shaped with artisan precision and finished with the most traditional pigments.',
    bibliography: 'Oral references from artisans of Píllaro and local cultural documentation on the Diablada Pillareña.',
  },
  'fredy-zhunaula': {
    title: 'Living Tradition',
    technique: 'Papier-Mache and Varnish',
    desc: 'Fredy Zhunaula is an Ecuadorian artisan specialized in creating traditional masks for the Diablada. His pieces stand out for combining traditional techniques with detailed finishes.',
    fullInfo: 'Fredy Zhunaula is an Ecuadorian artisan dedicated to the creation of traditional masks, specializing in folk art linked to the Diablada and cultural festivities of Ecuador’s central highlands.\n\nHis work is characterized by the combination of traditional techniques and detailed finishes, mainly using materials such as papier-mache, handcrafted paint, and varnish to produce unique pieces distinguished by expression, color, and durability.\n\nThroughout his career, Fredy has helped keep the cultural identity of Andean festivities alive, transmitting through his creations the history, symbolism, and force of the Diablada Pillareña.\n\nHis masks are not only decorative elements, but cultural representations reflecting the tradition, identity, and festive spirit of his community.',
    bibliography: 'Workshop testimonies, photographic records, and cultural memory connected to papier-mache craftsmanship.',
  },
  'italo-espin': {
    title: 'Contemporary Vision',
    technique: 'Detailed Sculpture',
    desc: 'Espín has taken mask art to a museum level. He integrates elements of local fauna and hyperrealistic textures into the sculpting of demonic features.',
    fullInfo: 'Italo Espín revolutionized the art of the mask by introducing contemporary sculptural techniques. His works combine tradition and modernity, creating pieces that are both functional and suitable for display in art galleries.',
    bibliography: 'Contemporary art catalogues and exhibition references related to ritual masks in Ecuador.',
  },
  'javier-pujos': {
    title: 'YACHAY Workshop',
    technique: 'The Devil’s Letter',
    desc: 'Javier Pujos preserves the cultural tradition of the YACHAY Workshop, creating symbolic figures and masks that form part of the identity of the Diablada Pillareña.',
    fullInfo: 'The Devil’s Letter is a cultural tradition that forms part of the YACHAY Workshop in Píllaro, Tungurahua province. This expression represents the creativity and identity of traditional celebrations, where figures, masks, and symbolic representations of the devil are made as part of the popular culture of the Diablada Pillareña.\n\nIn this context, the Devil’s Letter does not have a negative meaning, but rather an artistic and cultural one, serving to express the history, satire, and customs of the people. Through these activities, the goal is to keep the tradition alive and pass it on to new generations, strengthening the sense of local identity.\n\nThe YACHAY Workshop continues with this kind of cultural expression, encouraging community participation and learning through the practice of Píllaro’s traditions.',
    bibliography: 'Cultural material from the YACHAY Workshop and community references on artisan pedagogy and local memory.',
  },
  'nestor-bonilla': {
    title: 'Traditional Mask Artisan',
    technique: 'Handcrafted Making',
    desc: 'Néstor Bonilla is recognized for the handcrafted production of masks used in the Diablada Pillareña, keeping local tradition alive with dedication and distinctive detail.',
    fullInfo: 'Néstor Bonilla is a traditional mask artisan from Píllaro, recognized for the handcrafted creation of masks used in the Diablada Pillareña. His work is characterized by the making of representative devil masks, crafted with dedication and details rooted in local tradition.\n\nThrough his creations, he keeps alive one of the canton’s most important cultural expressions, contributing to the preservation of Píllaro’s identity and customs.',
    bibliography: 'Oral memory from Píllaro and artisan documentation linked to traditional mask making.',
  },
};

const DEFAULT_EN_PROCESS_TRANSLATIONS: Record<string, ArtProcessCardTranslationContent> = {
  'ancestral-mold': {
    title: 'The Ancestral Mold',
    text: 'Everything begins with the base that gives life to the devil. Some artisans work from the earth, patiently shaping clay until every facial feature appears. Others start from pre-made cement molds, refined over time, used as guides to keep the traditional essence alive. In both cases, each mask is born with its own identity in a process that can take weeks of dedication.',
  },
  layers: {
    title: 'Layers of Life',
    text: 'Over the mold, the mask is built layer by layer. Paper and handmade paste are carefully applied to form a resistant structure. They are not just materials: they represent hours of work, heritage, and effort. Up to fifteen layers shape a solid piece ready to preserve its form and detail over time.',
  },
  horns: {
    title: 'The Strength of the Horns',
    text: 'The horns are the most imposing element of the mask. They represent power, rebellion, and character. They are carefully fixed with wire and fiber, ensuring resistance and balance in the structure. Every shape and size is unique, reflecting the artisan’s creativity.',
  },
  color: {
    title: 'The Fire of Color',
    text: 'Color gives life to the mask. Red symbolizes strength, energy, and rebellion, while other vivid tones highlight every detail. Each artisan leaves a personal mark in the combination of colors, creating unique pieces that convey the essence and cultural richness of the Diablada Pillareña.',
  },
};

const defaultContacts = (phone: string, email: string, tiktok: string): ArtContact[] => [
  {
    id: 'phone',
    label: 'Teléfono',
    value: phone,
    href: `tel:${phone}`,
    kind: 'phone',
  },
  {
    id: 'email',
    label: 'Correo',
    value: email,
    href: `mailto:${email}`,
    kind: 'mail',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    value: tiktok,
    href: '#',
    kind: 'music',
  },
];

export const defaultArtEditorContent: ArtEditorContent = {
  general: {
    badge: 'Tradición Artesanal',
    title: 'EL ARTE DE LA',
    titleAccent: 'MÁSCARA',
    description: 'Las caretas de Píllaro no son simples disfraces; son el alma de la fiesta. Moldeadas con papel, engrudo y la visión mística de artesanos que heredan siglos de tradición.',
    techniqueLabel: 'Técnica',
    exploreMask: 'EXPLORAR CARETA',
    biography: 'Biografía',
    contact: 'Contacto',
    follow: 'Síguelo en:',
    galleryTitle: 'Galería de Creaciones',
    creationAlt: 'Creación',
    watchWork: 'Ver su obra en acción',
    videoFallback: 'Tu navegador no soporta video HTML5',
    processTitle: 'EL PROCESO RITUAL',
    closingQuote: 'No es la máscara la que baila, es el espíritu que la habita.',
    closingButton: 'Visitar Talleres',
    headlineFontClass: 'font-headline',
    bodyFontClass: 'font-body',
    heroAlignment: 'center',
    imageEffect: 'grayscale',
    translations: {
      en: DEFAULT_EN_GENERAL_TRANSLATIONS,
    },
  },
  artisans: [
    {
      id: 'angel-velasco',
      name: 'Ángel Velasco',
      title: 'Maestro Mascarero',
      technique: 'Modelado en Barro',
      desc: 'Velasco utiliza moldes de barro que ha perfeccionado por más de 40 años. Su estilo se caracteriza por la agresividad de las expresiones y el uso de cuernos auténticos de ganado.',
      fullInfo: 'Con una carrera de más de 40 años, Ángel Velasco es considerado uno de los maestros más respetados de Píllaro. Sus máscaras son obra de arte que capturan la esencia del ritual. Cada careta es única, modelada con precisión artesanal y acabada con los pigmentos más tradicionales.',
      bibliography: 'Referencias orales de artesanos de Píllaro y documentación cultural local sobre la Diablada Pillareña.',
      img: '/contenido/arte/AngelVelasco_1.png',
      gallery: ['/contenido/arte/AngelVelasco_3.png', '/contenido/arte/AngelVelasco_2.png', '/contenido/arte/AngelVelasco_1.png'],
      video: '/contenido/arte/Video_Velasco.mp4',
      contacts: defaultContacts('+593 98 765 4321', 'angel.velasco@diablada.ec', '@angemiliano'),
      theme: 'primary',
      translations: {
        en: DEFAULT_EN_ARTISAN_TRANSLATIONS['angel-velasco'],
      },
    },
    {
      id: 'fredy-zhunaula',
      name: 'Fredy Zhunaula',
      title: 'Tradición Viva',
      technique: 'Papel Maché y Barniz',
      desc: 'Fredy Zhunaula es un artesano ecuatoriano especializado en la creación de máscaras tradicionales para la Diablada. Sus piezas destacan por la combinación de técnicas tradicionales y acabados detallados.',
      fullInfo: 'Fredy Zhunaula es un artesano ecuatoriano dedicado a la creación de máscaras tradicionales, especializado en el arte popular relacionado con la Diablada y las festividades culturales de la Sierra centro del Ecuador.\n\nSu trabajo se caracteriza por la combinación de técnicas tradicionales y acabados detallados, donde utiliza principalmente materiales como papel maché, pintura artesanal y barniz, logrando piezas únicas que destacan por su expresión, colorido y resistencia.\n\nA lo largo de su trayectoria, Fredy ha contribuido a mantener viva la identidad cultural de las festividades andinas, transmitiendo a través de sus creaciones la historia, simbolismo y fuerza de la Diablada Pillareña.\n\nSus máscaras no solo son elementos decorativos, sino también representaciones culturales que reflejan la tradición, la identidad y el espíritu festivo de su comunidad.',
      bibliography: 'Testimonios de taller, registros fotográficos y memoria cultural vinculada al trabajo artesanal en papel maché.',
      img: '/contenido/arte/CaretasFredy_1.png',
      gallery: ['/contenido/arte/CaretasFredy_2.png', '/contenido/arte/CaretasFredy_3.png', '/contenido/arte/CaretasFredy_4.png'],
      video: '/contenido/arte/CaretrasFredy.mp4',
      contacts: defaultContacts('+593 99 876 5432', 'fredy.zhunaula@diablada.ec', '@fredyzhunaula'),
      theme: 'secondary',
      translations: {
        en: DEFAULT_EN_ARTISAN_TRANSLATIONS['fredy-zhunaula'],
      },
    },
    {
      id: 'italo-espin',
      name: 'Italo Espín',
      title: 'Visión Contemporánea',
      technique: 'Escultura Detallada',
      desc: 'Espín ha llevado el arte de la careta a un nivel museístico. Integra elementos de la fauna local y texturas hiperrealistas en el modelado de las facciones diabólicas.',
      fullInfo: 'Italo Espín revolucionó el arte de la máscara al introducir técnicas de escultura contemporánea. Sus obras combinan la tradición con la modernidad, creando piezas que son tanto funcionales como exhibibles en galerías de arte.',
      bibliography: 'Catálogos de obra contemporánea y referencias de exposiciones relacionadas con la máscara ritual ecuatoriana.',
      img: '/contenido/arte/Italo_1.png',
      gallery: ['/contenido/arte/Italo_2.png', '/contenido/arte/Italo_3.png', '/contenido/arte/Italo_4.png'],
      video: '/contenido/arte/Video_Italo.mp4',
      contacts: defaultContacts('+593 97 654 3210', 'italo.espin@diablada.ec', '@italoespin'),
      theme: 'primary',
      translations: {
        en: DEFAULT_EN_ARTISAN_TRANSLATIONS['italo-espin'],
      },
    },
    {
      id: 'javier-pujos',
      name: 'Javier Pujos',
      title: 'Taller YACHAY',
      technique: 'La Carta del Diablo',
      desc: 'Javier Pujos preserva la tradición cultural del Taller YACHAY, elaborando figuras y máscaras simbólicas que forman parte de la identidad de la Diablada Pillareña.',
      fullInfo: 'La carta del diablo es una tradición cultural que forma parte del Taller YACHAY en Píllaro, provincia de Tungurahua. Esta expresión representa la creatividad y la identidad de las fiestas tradicionales, donde se elaboran figuras, máscaras y representaciones simbólicas del diablo como parte de la cultura popular de la Diablada Pillareña.\n\nEn este contexto, la carta del diablo no tiene un significado negativo, sino más bien artístico y cultural, ya que sirve para expresar la historia, la sátira y las costumbres del pueblo. A través de estas actividades, se busca mantener viva la tradición y transmitirla a las nuevas generaciones, fortaleciendo así el sentido de identidad local.\n\nEl Taller YACHAY continúa con este tipo de expresiones culturales, fomentando la participación de la comunidad y el aprendizaje mediante la práctica de las tradiciones de Píllaro.',
      bibliography: 'Material cultural del Taller YACHAY y referencias comunitarias sobre pedagogía artesanal y memoria local.',
      img: '/contenido/arte/Pujos_1.jpg',
      gallery: ['/contenido/arte/Pujos_2.jpg', '/contenido/arte/Pujos_3.jpg', '/contenido/arte/Pujos_4.jpg'],
      video: '/contenido/arte/Video_Pujos.mp4',
      contacts: defaultContacts('+593 98 543 2109', 'javier.pujos@diablada.ec', '@javierpujos'),
      theme: 'secondary',
      translations: {
        en: DEFAULT_EN_ARTISAN_TRANSLATIONS['javier-pujos'],
      },
    },
    {
      id: 'nestor-bonilla',
      name: 'Néstor Bonilla',
      title: 'Caretero Tradicional',
      technique: 'Elaboración Artesanal',
      desc: 'Néstor Bonilla es reconocido por la elaboración artesanal de caretas utilizadas en la Diablada Pillareña, manteniendo viva la tradición local con dedicación y detalles propios.',
      fullInfo: 'Néstor Bonilla es un caretero tradicional de Píllaro, reconocido por la elaboración artesanal de caretas utilizadas en la Diablada Pillareña. Su trabajo se caracteriza por la creación de máscaras representativas del diablo, elaboradas con dedicación y detalles propios de la tradición local.\n\nA través de sus creaciones, mantiene viva una de las expresiones culturales más importantes del cantón, aportando a la conservación de la identidad y las costumbres de Píllaro.',
      bibliography: 'Memoria oral de Píllaro y documentación artesanal vinculada a la elaboración tradicional de caretas.',
      img: '/contenido/arte/Nestor_1.jpg',
      gallery: ['/contenido/arte/Nestor_2.jpg', '/contenido/arte/Nestor_3.jpg', '/contenido/arte/Nestor_4.jpg'],
      video: '/contenido/arte/Video_Nestor.mp4',
      contacts: defaultContacts('+593 94 432 1098', 'nestor.bonilla@diablada.ec', '@nestorbonilla'),
      theme: 'primary',
      translations: {
        en: DEFAULT_EN_ARTISAN_TRANSLATIONS['nestor-bonilla'],
      },
    },
  ],
  processCards: [
    {
      id: 'ancestral-mold',
      title: 'El Molde Ancestral',
      text: 'Todo inicia con la base que da vida al diablo. Algunos artesanos trabajan desde la tierra, moldeando el barro con paciencia hasta formar cada rasgo del rostro. Otros parten de moldes de cemento ya elaborados, perfeccionados con el tiempo, que sirven como guía para mantener viva la esencia tradicional. En ambos casos, cada máscara nace con identidad propia, en un proceso que puede tomar semanas de dedicación.',
      theme: 'surface',
      translations: {
        en: DEFAULT_EN_PROCESS_TRANSLATIONS['ancestral-mold'],
      },
    },
    {
      id: 'layers',
      title: 'Las Capas de Vida',
      text: 'Sobre el molde comienza a construirse la máscara capa por capa. El papel y el engrudo artesanal se aplican cuidadosamente, formando una estructura resistente. No son solo materiales: son horas de trabajo, herencia y esfuerzo. Hasta quince capas dan forma a una pieza firme, preparada para conservar su forma y detalle a lo largo del tiempo.',
      theme: 'primary',
      translations: {
        en: DEFAULT_EN_PROCESS_TRANSLATIONS.layers,
      },
    },
    {
      id: 'horns',
      title: 'La Fuerza de los Cuernos',
      text: 'Los cuernos son el elemento más imponente de la careta. Representan poder, rebeldía y carácter. Se fijan cuidadosamente con alambre y fibra, asegurando resistencia y equilibrio en la estructura. Cada forma y tamaño es único, reflejando la creatividad del artesano.',
      theme: 'secondary',
      translations: {
        en: DEFAULT_EN_PROCESS_TRANSLATIONS.horns,
      },
    },
    {
      id: 'color',
      title: 'El Fuego del Color',
      text: 'El color da vida a la máscara. El rojo simboliza fuerza, energía y rebeldía, mientras otros tonos intensos resaltan cada detalle. Cada artesano imprime su estilo en la combinación de colores, creando piezas únicas que transmiten la esencia y la riqueza cultural de la Diablada Pillareña.',
      theme: 'outlined',
      translations: {
        en: DEFAULT_EN_PROCESS_TRANSLATIONS.color,
      },
    },
  ],
};

function cloneTranslations<T extends object>(translations?: ArtTranslations<T>) {
  if (!translations) {
    return undefined;
  }

  return Object.fromEntries(Object.entries(translations).map(([language, value]) => [language, value ? { ...value } : value])) as ArtTranslations<T>;
}

function cloneContact(contact: ArtContact): ArtContact {
  return { ...contact };
}

function cloneArtisan(artisan: ArtArtisan): ArtArtisan {
  return {
    ...artisan,
    gallery: [...artisan.gallery],
    contacts: artisan.contacts.map(cloneContact),
    translations: cloneTranslations(artisan.translations),
  };
}

function cloneProcessCard(card: ArtProcessCard): ArtProcessCard {
  return {
    ...card,
    translations: cloneTranslations(card.translations),
  };
}

function cloneContent(content: ArtEditorContent): ArtEditorContent {
  return {
    general: { ...content.general, translations: cloneTranslations(content.general.translations) },
    artisans: content.artisans.map(cloneArtisan),
    processCards: content.processCards.map(cloneProcessCard),
  };
}

function pickTranslationFields<T extends string>(source: Record<string, unknown>, keys: T[]) {
  const result: Partial<Record<T, string>> = {};

  keys.forEach((key) => {
    const value = source[key];
    if (typeof value === 'string') {
      result[key] = value;
    }
  });

  return result;
}

function isPartialTranslationObject<T extends string>(value: unknown, keys: T[]): boolean {
  if (!value || typeof value !== 'object') {
    return false;
  }

  return Object.entries(value as Record<string, unknown>).every(([key, fieldValue]) => keys.includes(key as T) && typeof fieldValue === 'string');
}

function normalizeGeneralTranslations(value: unknown, fallback?: ArtTranslations<ArtGeneralTranslationContent>) {
  if (!value || typeof value !== 'object') {
    return cloneTranslations(fallback);
  }

  const candidate = value as Record<string, unknown>;
  return {
    ...cloneTranslations(fallback),
    en: {
      ...(fallback?.en ?? {}),
      ...(isPartialTranslationObject(candidate.en, GENERAL_TRANSLATION_FIELDS) ? candidate.en as Partial<ArtGeneralTranslationContent> : {}),
    },
  };
}

function normalizeArtisanTranslations(value: unknown, fallback?: ArtTranslations<ArtArtisanTranslationContent>) {
  if (!value || typeof value !== 'object') {
    return cloneTranslations(fallback);
  }

  const candidate = value as Record<string, unknown>;
  return {
    ...cloneTranslations(fallback),
    en: {
      ...(fallback?.en ?? {}),
      ...(isPartialTranslationObject(candidate.en, ARTISAN_TRANSLATION_FIELDS) ? candidate.en as Partial<ArtArtisanTranslationContent> : {}),
    },
  };
}

function normalizeProcessTranslations(value: unknown, fallback?: ArtTranslations<ArtProcessCardTranslationContent>) {
  if (!value || typeof value !== 'object') {
    return cloneTranslations(fallback);
  }

  const candidate = value as Record<string, unknown>;
  return {
    ...cloneTranslations(fallback),
    en: {
      ...(fallback?.en ?? {}),
      ...(isPartialTranslationObject(candidate.en, PROCESS_TRANSLATION_FIELDS) ? candidate.en as Partial<ArtProcessCardTranslationContent> : {}),
    },
  };
}

function normalizeGeneral(value: unknown, fallback: ArtGeneralContent): ArtGeneralContent {
  if (!value || typeof value !== 'object') {
    return { ...fallback, translations: cloneTranslations(fallback.translations) };
  }

  const candidate = value as Record<string, unknown>;
  return {
    ...fallback,
    ...pickTranslationFields(candidate, GENERAL_TRANSLATION_FIELDS),
    headlineFontClass: typeof candidate.headlineFontClass === 'string' ? candidate.headlineFontClass : fallback.headlineFontClass,
    bodyFontClass: typeof candidate.bodyFontClass === 'string' ? candidate.bodyFontClass : fallback.bodyFontClass,
    heroAlignment: candidate.heroAlignment === 'left' ? 'left' : candidate.heroAlignment === 'center' ? 'center' : fallback.heroAlignment,
    imageEffect: candidate.imageEffect === 'color' ? 'color' : candidate.imageEffect === 'grayscale' ? 'grayscale' : fallback.imageEffect,
    translations: normalizeGeneralTranslations(candidate.translations, fallback.translations),
  };
}

function normalizeArtisan(value: unknown, fallback?: ArtArtisan): ArtArtisan | null {
  if (!value || typeof value !== 'object') {
    return fallback ? cloneArtisan(fallback) : null;
  }

  const candidate = value as Record<string, unknown>;
  const base = fallback ? cloneArtisan(fallback) : {
    id: typeof candidate.id === 'string' ? candidate.id : `artisan-${Date.now()}`,
    name: typeof candidate.name === 'string' ? candidate.name : 'Nuevo artesano',
    title: typeof candidate.title === 'string' ? candidate.title : 'Nuevo cuadro',
    technique: typeof candidate.technique === 'string' ? candidate.technique : 'Técnica artesanal',
    desc: typeof candidate.desc === 'string' ? candidate.desc : '',
    fullInfo: typeof candidate.fullInfo === 'string' ? candidate.fullInfo : '',
    bibliography: typeof candidate.bibliography === 'string' ? candidate.bibliography : '',
    img: typeof candidate.img === 'string' ? candidate.img : '',
    gallery: Array.isArray(candidate.gallery) ? candidate.gallery.filter((item): item is string => typeof item === 'string') : [],
    video: typeof candidate.video === 'string' ? candidate.video : '',
    contacts: Array.isArray(candidate.contacts) ? candidate.contacts.filter(isArtContact) : [],
    theme: candidate.theme === 'secondary' ? 'secondary' : 'primary',
    translations: undefined,
  } satisfies ArtArtisan;

  return {
    ...base,
    id: typeof candidate.id === 'string' ? candidate.id : base.id,
    name: typeof candidate.name === 'string' ? candidate.name : base.name,
    ...pickTranslationFields(candidate, ARTISAN_TRANSLATION_FIELDS),
    img: typeof candidate.img === 'string' ? candidate.img : base.img,
    gallery: Array.isArray(candidate.gallery) ? candidate.gallery.filter((item): item is string => typeof item === 'string') : base.gallery,
    video: typeof candidate.video === 'string' ? candidate.video : base.video,
    contacts: Array.isArray(candidate.contacts) && candidate.contacts.every(isArtContact) ? candidate.contacts.map(cloneContact) : base.contacts,
    theme: candidate.theme === 'secondary' ? 'secondary' : candidate.theme === 'primary' ? 'primary' : base.theme,
    translations: normalizeArtisanTranslations(candidate.translations, base.translations),
  };
}

function normalizeProcessCard(value: unknown, fallback?: ArtProcessCard): ArtProcessCard | null {
  if (!value || typeof value !== 'object') {
    return fallback ? cloneProcessCard(fallback) : null;
  }

  const candidate = value as Record<string, unknown>;
  const base = fallback ? cloneProcessCard(fallback) : {
    id: typeof candidate.id === 'string' ? candidate.id : `process-${Date.now()}`,
    title: typeof candidate.title === 'string' ? candidate.title : 'Nueva tarjeta',
    text: typeof candidate.text === 'string' ? candidate.text : '',
    theme: candidate.theme === 'primary' || candidate.theme === 'secondary' || candidate.theme === 'outlined' ? candidate.theme : 'surface',
    translations: undefined,
  } satisfies ArtProcessCard;

  return {
    ...base,
    id: typeof candidate.id === 'string' ? candidate.id : base.id,
    ...pickTranslationFields(candidate, PROCESS_TRANSLATION_FIELDS),
    theme: candidate.theme === 'primary' || candidate.theme === 'secondary' || candidate.theme === 'outlined' || candidate.theme === 'surface' ? candidate.theme : base.theme,
    translations: normalizeProcessTranslations(candidate.translations, base.translations),
  };
}

function normalizeArtEditorContent(value: unknown): ArtEditorContent {
  const fallback = cloneContent(defaultArtEditorContent);

  if (!value || typeof value !== 'object') {
    return fallback;
  }

  const candidate = value as Record<string, unknown>;
  const artisansCandidate = Array.isArray(candidate.artisans) ? candidate.artisans : [];
  const processCandidate = Array.isArray(candidate.processCards) ? candidate.processCards : [];

  const fallbackArtisansById = new Map(fallback.artisans.map((artisan) => [artisan.id, artisan]));
  const fallbackProcessById = new Map(fallback.processCards.map((card) => [card.id, card]));

  const normalizedArtisans = artisansCandidate
    .map((artisan) => {
      const artisanId = typeof (artisan as Record<string, unknown>)?.id === 'string' ? (artisan as Record<string, unknown>).id as string : '';
      return normalizeArtisan(artisan, fallbackArtisansById.get(artisanId));
    })
    .filter((artisan): artisan is ArtArtisan => artisan !== null);

  const normalizedProcessCards = processCandidate
    .map((card) => {
      const cardId = typeof (card as Record<string, unknown>)?.id === 'string' ? (card as Record<string, unknown>).id as string : '';
      return normalizeProcessCard(card, fallbackProcessById.get(cardId));
    })
    .filter((card): card is ArtProcessCard => card !== null);

  return {
    general: normalizeGeneral(candidate.general, fallback.general),
    artisans: normalizedArtisans.length > 0 ? normalizedArtisans : fallback.artisans,
    processCards: normalizedProcessCards.length > 0 ? normalizedProcessCards : fallback.processCards,
  };
}

function isArtContact(value: unknown): value is ArtContact {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === 'string'
    && typeof candidate.label === 'string'
    && typeof candidate.value === 'string'
    && typeof candidate.href === 'string'
    && typeof candidate.kind === 'string';
}

function isArtArtisan(value: unknown): value is ArtArtisan {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === 'string'
    && typeof candidate.name === 'string'
    && typeof candidate.title === 'string'
    && typeof candidate.technique === 'string'
    && typeof candidate.desc === 'string'
    && typeof candidate.fullInfo === 'string'
    && typeof candidate.bibliography === 'string'
    && typeof candidate.img === 'string'
    && typeof candidate.video === 'string'
    && typeof candidate.theme === 'string'
    && Array.isArray(candidate.gallery)
    && candidate.gallery.every((item) => typeof item === 'string')
    && Array.isArray(candidate.contacts)
    && candidate.contacts.every(isArtContact)
    && (!('translations' in candidate) || candidate.translations === undefined || typeof candidate.translations === 'object');
}

function isArtProcessCard(value: unknown): value is ArtProcessCard {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.id === 'string'
    && typeof candidate.title === 'string'
    && typeof candidate.text === 'string'
    && typeof candidate.theme === 'string'
    && (!('translations' in candidate) || candidate.translations === undefined || typeof candidate.translations === 'object');
}

function isArtGeneralContent(value: unknown): value is ArtGeneralContent {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return typeof candidate.badge === 'string'
    && typeof candidate.title === 'string'
    && typeof candidate.titleAccent === 'string'
    && typeof candidate.description === 'string'
    && typeof candidate.techniqueLabel === 'string'
    && typeof candidate.exploreMask === 'string'
    && typeof candidate.biography === 'string'
    && typeof candidate.contact === 'string'
    && typeof candidate.follow === 'string'
    && typeof candidate.galleryTitle === 'string'
    && typeof candidate.creationAlt === 'string'
    && typeof candidate.watchWork === 'string'
    && typeof candidate.videoFallback === 'string'
    && typeof candidate.processTitle === 'string'
    && typeof candidate.closingQuote === 'string'
    && typeof candidate.closingButton === 'string'
    && typeof candidate.headlineFontClass === 'string'
    && typeof candidate.bodyFontClass === 'string'
    && typeof candidate.heroAlignment === 'string'
    && typeof candidate.imageEffect === 'string'
    && (!('translations' in candidate) || candidate.translations === undefined || typeof candidate.translations === 'object');
}

export function readArtEditorContent(): ArtEditorContent {
  return cloneContent(defaultArtEditorContent);
}

export function getLocalizedArtGeneral(content: ArtGeneralContent, language: ArtTranslationLanguage): ArtGeneralTranslationContent {
  if (language === 'es') {
    return pickTranslationFields(content as unknown as Record<string, unknown>, GENERAL_TRANSLATION_FIELDS) as ArtGeneralTranslationContent;
  }

  return {
    ...pickTranslationFields(content as unknown as Record<string, unknown>, GENERAL_TRANSLATION_FIELDS),
    ...(content.translations?.en ?? {}),
  } as ArtGeneralTranslationContent;
}

export function getLocalizedArtisan(artisan: ArtArtisan, language: ArtTranslationLanguage): ArtArtisan {
  if (language === 'es') {
    return artisan;
  }

  return {
    ...artisan,
    ...(artisan.translations?.en ?? {}),
  };
}

export function getLocalizedProcessCard(card: ArtProcessCard, language: ArtTranslationLanguage): ArtProcessCard {
  if (language === 'es') {
    return card;
  }

  return {
    ...card,
    ...(card.translations?.en ?? {}),
  };
}

export async function fetchArtEditorContent(): Promise<ArtEditorContent> {
  const fallback = readArtEditorContent();
  const response = await apiClient.arte.editorContent.get();

  if (response.success && response.data) {
    return normalizeArtEditorContent(response.data);
  }

  return fallback;
}

export async function saveArtEditorContent(content: ArtEditorContent): Promise<boolean> {
  const response = await apiClient.arte.editorContent.save(content);
  if (!response.success) {
    return false;
  }

  window.dispatchEvent(new Event(ART_EDITOR_UPDATED_EVENT));
  return true;
}

export async function resetArtEditorContent(): Promise<boolean> {
  const response = await apiClient.arte.editorContent.reset();
  if (!response.success) {
    return false;
  }

  window.dispatchEvent(new Event(ART_EDITOR_UPDATED_EVENT));
  return true;
}
