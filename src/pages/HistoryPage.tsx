import React, { useEffect, useState } from 'react';
import { ArrowRight, BookOpen, ChevronDown, Sparkles } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  defaultDiabloHotspotsEn,
  type HistoryHotspot,
} from '@/lib/historyHotspots';
import { getDefaultInteractiveAspectRatio, readImageAspectRatio } from '@/lib/imageAspectRatio';
import {
  fetchHistoryEditorContent,
  HISTORY_EDITOR_UPDATED_EVENT,
  readHistoryEditorContent,
  type EditableHistoryCharacter,
  type HistoryEditorContent,
} from '@/lib/historyEditorContent';

type Hotspot = HistoryHotspot;

type CharacterCopy = {
  name: string;
  desc: string;
  detail: string;
  hotspots: Hotspot[];
};

type CharacterView = {
  id: string;
  color: string;
  name: string;
  desc: string;
  detail: string;
  img: string;
  detailImg?: string;
  interactiveEnabled?: boolean;
  hotspots: Hotspot[];
};

export default function HistoryPage() {
  const { language } = useLanguage();
  const [expandedCharacterId, setExpandedCharacterId] = useState<string | null>(null);
  const [activeHotspots, setActiveHotspots] = useState<Record<string, string>>({});
  const [historyContent, setHistoryContent] = useState<HistoryEditorContent>(() => readHistoryEditorContent());
  const [interactiveAspectRatios, setInteractiveAspectRatios] = useState<Record<string, string>>({});

  useEffect(() => {
    let isMounted = true;

    const syncHistoryContent = async () => {
      const nextContent = await fetchHistoryEditorContent();
      if (isMounted) {
        setHistoryContent(nextContent);
      }
    };

    syncHistoryContent();
    window.addEventListener(HISTORY_EDITOR_UPDATED_EVENT, syncHistoryContent);

    return () => {
      isMounted = false;
      window.removeEventListener(HISTORY_EDITOR_UPDATED_EVENT, syncHistoryContent);
    };
  }, []);

  const characterColors: Record<string, string> = {
    diablo: 'text-primary',
    guaricha: 'text-secondary',
    capariche: 'text-primary',
    'pareja-linea': 'text-secondary',
    chorizo: 'text-primary',
    cabecilla: 'text-secondary',
    boxeador: 'text-primary',
  };

  const copy = {
    es: {
      badge: historyContent.general.badge,
      title: historyContent.general.title,
      titleAccent: historyContent.general.titleAccent,
      description: historyContent.general.description,
      sectionTitle: historyContent.general.sectionTitle,
      paragraphs: [
        historyContent.general.paragraph1,
        historyContent.general.paragraph2,
        historyContent.general.paragraph3,
      ],
      quote: historyContent.general.quote,
      protagonistsTitle: historyContent.general.protagonistsTitle,
      protagonistsSubtitle: historyContent.general.protagonistsSubtitle,
      protagonistsEyebrow: historyContent.general.protagonistsEyebrow,
      protagonistsOpenButton: historyContent.general.protagonistsOpenButton,
      protagonistsCloseButton: historyContent.general.protagonistsCloseButton,
      protagonistsHint: historyContent.general.protagonistsHint,
      protagonistsListTitle: historyContent.general.protagonistsListTitle,
      protagonistsDetailTitle: historyContent.general.protagonistsDetailTitle,
      ctaTitle: historyContent.general.ctaTitle,
      ctaDescription: historyContent.general.ctaDescription,
      ctaButton: historyContent.general.ctaButton,
      characters: historyContent.characters,
    },
    en: {
      badge: 'Living Memory',
      title: 'THE ORIGIN OF THE',
      titleAccent: 'RITUAL',
      description: 'Born from resistance and mysticism, the Diablada of Píllaro is not just a dance; it is the cry of a people who transformed oppression into a manifestation of art and freedom.',
      sectionTitle: 'Chronicles of Rebellion and Faith',
      paragraphs: [
        'The roots of the Diablada Pillareña reach back to colonial times. According to oral tradition, the celebration emerged as a form of rebellion by peasants against the rigidity of colonial institutions and the elites of the era.',
        'Originally, it is said that young people from rural areas dressed as devils to scare outsiders and protect their courting territories. Over the centuries, this prank evolved into a ritualized choreography that is now recognized as Cultural Heritage of Ecuador.',
        'Starting in the 20th century, the festivity became firmly established between January 1 and January 6 each year. Its evolution has been constant: from simple cardboard masks to stunning contemporary artworks made of papier-mache, real cattle horns, and plaster molds that can weigh up to 20 pounds.',
      ],
      quote: 'The devil of Píllaro does not represent biblical evil, but rather unrestrained freedom and the power of local identity against imposed forces.',
      protagonistsTitle: 'The Protagonists',
      protagonistsSubtitle: 'The hierarchy and symbolism of the troupe',
      protagonistsEyebrow: 'Interactive exploration',
      protagonistsOpenButton: 'View more information',
      protagonistsCloseButton: 'Hide information',
      protagonistsHint: 'Click or hover over the points to discover each part of the character.',
      protagonistsListTitle: 'Featured elements',
      protagonistsDetailTitle: 'Character anatomy',
      ctaTitle: 'Want to know more?',
      ctaDescription: 'Explore our digital archives on handcrafted mask making and the evolution of dance steps through the decades.',
      ctaButton: 'Watch Documentary',
      characters: [
        {
          name: 'The Devil',
          desc: 'The soul of the celebration. Dressed in an imposing mask and red velvet costume, this character dances with springing movements that represent agility and festive chaos. He guides the energy of the troupe with his whip.',
          detail: 'Explore each part of the Devil costume and discover how its materials, accessories, and colors shape one of the most representative characters of the Diablada Pillareña.',
          hotspots: defaultDiabloHotspotsEn,
        },
        {
          name: 'The Guaricha',
          desc: 'A playful and joyful female character representing the women of the town. She wears a decorated handcrafted mask and colorful costumes. Her role is to interact with the audience, joke, dance, and spread festive joy through the streets with dynamic, carefree movements.',
          detail: 'The Guaricha combines playful performance, color, and audience connection. Her details highlight the expressive and festive spirit of the troupe.',
          hotspots: [
            {
              id: 'tocado',
              label: 'Headpiece',
              title: 'Headpiece and ornaments',
              description: 'The upper adornments frame the character and enhance elegance, visibility, and festive presence throughout the route.',
              x: 50,
              y: 16,
            },
            {
              id: 'careta',
              label: 'Mask',
              title: 'Expressive mask',
              description: 'The mask gathers the playful expression of the Guaricha. Its visual treatment reinforces a cheerful, provocative, and approachable tone.',
              x: 48,
              y: 30,
            },
            {
              id: 'falda',
              label: 'Dress',
              title: 'Dress and movement',
              description: 'The full-body costume adds fluidity to turns and gestures. Its colors and forms help communicate celebration and energy.',
              x: 51,
              y: 66,
            },
          ],
        },
        {
          name: 'The Capariche',
          desc: 'The ritual sweeper in charge of clearing the way for the troupe. He symbolically sweeps away bad energies with his broom, preparing sacred ground for the procession. He is a figure of purification and spiritual preparation.',
          detail: 'In the Capariche, clothing and tools reinforce the idea of ritual cleansing and preparation of the path for the rest of the characters.',
          hotspots: [
            {
              id: 'sombrero',
              label: 'Hat',
              title: 'Hat or upper finish',
              description: 'The top section helps define the silhouette and distinguish the character as the one who symbolically opens the way.',
              x: 52,
              y: 16,
            },
            {
              id: 'vestuario',
              label: 'Clothing',
              title: 'Functional clothing',
              description: 'His clothing refers to labor and constant movement. The visual composition connects the character to his role in preparing the route.',
              x: 49,
              y: 54,
            },
            {
              id: 'escoba',
              label: 'Broom',
              title: 'Ritual broom',
              description: 'The broom is his defining attribute. It symbolizes the cleansing of the path and turns his presence into an act of purification.',
              x: 67,
              y: 73,
            },
          ],
        },
        {
          name: 'Line Pair',
          desc: 'Characters who form choreographed couples within the troupe structure. They represent unity, coordination, and teamwork. Their synchronized dance shows the discipline and rigor of an ancestral tradition preserved across generations.',
          detail: 'The Line Pair brings together the elegant clothing of both the man and the woman in one shared scene. Explore the garments and decorative elements of each performer to understand how the pair builds its visual identity within the troupe.',
          hotspots: [
            {
              id: 'h-careta',
              label: 'M Mask',
              title: 'Man: Mask',
              description: 'The man wears a mask made from mesh, wire, or fiber that covers the face. Unlike the devil, it is usually more stylized and less aggressive, with defined features.',
              x: 24,
              y: 20,
            },
            {
              id: 'h-sombrero',
              label: 'M Hat',
              title: 'Man: Hat or headpiece',
              description: 'In some cases, the man wears a decorated hat or headpiece that adds elegance to the outfit, though it is not always mandatory.',
              x: 22,
              y: 8,
            },
            {
              id: 'h-camisa',
              label: 'M Shirt',
              title: 'Man: Shirt',
              description: 'The shirt is usually white, creating a clean contrast that highlights the rest of the decorative pieces.',
              x: 29,
              y: 44,
            },
            {
              id: 'h-panuelo',
              label: 'M Scarf',
              title: 'Man: Scarf',
              description: 'The scarf sits around the neck or over the chest, adding color, movement, and traditional elegance to the costume.',
              x: 28,
              y: 28,
            },
            {
              id: 'h-chaqueta',
              label: 'M Jacket',
              title: 'Man: Jacket or coat',
              description: 'He may wear a jacket or coat decorated with bright colors, embroidery, or shiny details that enrich the visual impact of the character.',
              x: 18,
              y: 36,
            },
            {
              id: 'h-pantalon',
              label: 'M Pants',
              title: 'Man: Pants',
              description: 'The pants are usually fitted or semi-fitted cloth garments combined with either bold or sober colors depending on the design.',
              x: 24,
              y: 80,
            },
            {
              id: 'h-adornos',
              label: 'M Ornaments',
              title: 'Man: Decorative overskirt ornaments',
              description: 'Around the waist or over the pants, bright paper or cellophane ornaments are placed to create movement and make the costume more striking during the dance.',
              x: 33,
              y: 69,
            },
            {
              id: 'h-zapatos',
              label: 'M Shoes',
              title: 'Man: Shoes',
              description: 'They are generally black shoes chosen for comfort and durability during the dance.',
              x: 23,
              y: 94,
            },
            {
              id: 'm-careta',
              label: 'W Mask',
              title: 'Woman: Mask',
              description: 'The woman may wear a mask similar to the man’s, made from mesh or light materials, but with softer and more delicate features.',
              x: 58,
              y: 21,
            },
            {
              id: 'm-corona',
              label: 'W Crown',
              title: 'Woman: Crown',
              description: 'The crown is a decorative piece made with cardboard, shiny paper, or cellophane, using bright colors that stand out in the dance.',
              x: 56,
              y: 9,
            },
            {
              id: 'm-panuelos',
              label: 'W Scarves',
              title: 'Woman: Scarves',
              description: 'Decorative scarves are worn on the head or around the neck, adding color, volume, and movement to the character.',
              x: 54,
              y: 28,
            },
            {
              id: 'm-blusa',
              label: 'W Blouse',
              title: 'Woman: Blouse',
              description: 'The blouse is usually brightly colored or decorated with embroidery, lace, and other details that enhance the feminine look of the outfit.',
              x: 56,
              y: 40,
            },
            {
              id: 'm-vestido',
              label: 'W Dress',
              title: 'Woman: Dress or gown',
              description: 'The main garment is a wide, colorful, and eye-catching dress or gown designed to allow comfortable movement during the dance.',
              x: 58,
              y: 63,
            },
            {
              id: 'm-adornos',
              label: 'W Ornaments',
              title: 'Woman: Lower decorative ornaments',
              description: 'The lower part may include ornaments made from cellophane or other shiny materials that add volume, movement, and scenic presence.',
              x: 69,
              y: 73,
            },
            {
              id: 'm-medias',
              label: 'W Stockings',
              title: 'Woman: Stockings',
              description: 'The stockings may be skin-colored, white, or coordinated with the rest of the outfit to complete the character’s look.',
              x: 58,
              y: 89,
            },
            {
              id: 'm-zapatos',
              label: 'W Shoes',
              title: 'Woman: Shoes',
              description: 'The shoes are usually comfortable, generally black or matched to the costume, so they can support continuous movement in the troupe.',
              x: 63,
              y: 95,
            },
          ],
        },
        {
          name: 'The Chorizo',
          desc: 'A satirical character who carries a whip and brings humor through exaggerated, mocking movements. His role is to entertain and joke with spectators, adding a touch of physical comedy and irreverence to the ritual procession.',
          detail: 'The Chorizo stands out through humorous styling, eye-catching accessories, and the use of the chorizo itself as the core of the performance. Explore each part of the outfit to understand how this burlesque character is built within the troupe.',
          hotspots: [
            {
              id: 'sombrero-tocado',
              label: 'Hat',
              title: 'Striking and humorous accessory',
              description: 'He may wear a clown-like cap or a striking hat adapted creatively to emphasize his burlesque character. This piece helps the character stand out visually and reinforces his playful style.',
              x: 50,
              y: 11,
            },
            {
              id: 'rostro-mascara',
              label: 'Face',
              title: 'Comic expression of the character',
              description: 'He may appear with an uncovered face or wear a simple mask. Unlike other characters, the goal is not intimidation but humor through exaggerated expressions that connect with the audience.',
              x: 50,
              y: 24,
            },
            {
              id: 'traje',
              label: 'Outfit',
              title: 'Main costume of the Chorizo',
              description: 'He wears a full outfit, either as a one-piece garment or as a jacket-and-pants combination. The colors tend to be bright or unusually mixed, reinforcing his exaggerated appearance and comic role.',
              x: 50,
              y: 56,
            },
            {
              id: 'panuelo',
              label: 'Scarf',
              title: 'Decorative accessory',
              description: 'It is worn around the neck and adds color to the outfit. It also creates movement during the dance, complementing the character’s lively and dynamic style.',
              x: 46,
              y: 34,
            },
            {
              id: 'adornos',
              label: 'Ornaments',
              title: 'Creative elements of the costume',
              description: 'It includes ribbons, fabrics, and other decorative details arranged freely. These elements make the outfit more striking and contribute to its unique, eye-catching appearance.',
              x: 64,
              y: 55,
            },
            {
              id: 'zapatos',
              label: 'Shoes',
              title: 'Footwear for dancing',
              description: 'He wears comfortable shoes, generally dark in color, that allow him to move easily. They are important for carrying out his exaggerated movements during the performance.',
              x: 44,
              y: 92,
            },
            {
              id: 'latigo-chorizo',
              label: 'Whip',
              title: 'Main comic element',
              description: 'He carries a whip or “chorizo,” which he uses to create humor through exaggerated and mocking movements. This accessory is essential to the performance because it helps him interact with the audience and bring the character to life.',
              x: 50,
              y: 47,
            },
          ],
        },
        {
          name: 'The Leader',
          desc: 'The organizer and highest authority of the troupe. He coordinates logistics, music, order, and the well-being of all participants. His presence commands respect and ensures the tradition remains faithful to its ancestral roots.',
          detail: 'The Leader projects hierarchy and control. His image combines elements that make his authority and organizing role immediately legible.',
          hotspots: [
            {
              id: 'mascara',
              label: 'Face',
              title: 'Face and presence',
              description: 'The facial area concentrates character and hierarchy. It is the first element that communicates command and recognition.',
              x: 49,
              y: 27,
            },
            {
              id: 'mando',
              label: 'Insignia',
              title: 'Leadership element',
              description: 'Accessories linked to leadership reinforce his role as guide, organizer, and reference point for the rest of the group.',
              x: 64,
              y: 56,
            },
            {
              id: 'vestimenta',
              label: 'Clothing',
              title: 'Authority attire',
              description: 'His costume conveys respect, order, and solemnity. The visual composition clearly distinguishes him from the other characters.',
              x: 50,
              y: 67,
            },
          ],
        },
        {
          name: 'The Boxer',
          desc: 'A satirical element that mocks brute strength and vanity. With gloves and exaggerated movements, he brings humor and physical comedy to the procession, playfully challenging spectators to symbolic duels full of wit and grace.',
          detail: 'The Boxer blends satire, performance, and physical comedy. Its interactive points help explain how each part supports the caricatured tone.',
          hotspots: [
            {
              id: 'careta',
              label: 'Mask',
              title: 'Mask or face piece',
              description: 'The facial zone concentrates the Boxer’s caricatured identity. It is where the parodic tone becomes most visible.',
              x: 50,
              y: 27,
            },
            {
              id: 'guantes',
              label: 'Gloves',
              title: 'Boxing gloves',
              description: 'The gloves are the most recognizable element of the character. They instantly signal playful combat and comic performance.',
              x: 70,
              y: 58,
            },
            {
              id: 'indumentaria',
              label: 'Outfit',
              title: 'Body outfit',
              description: 'The rest of the clothing completes the visual parody and transforms the boxer into a ritual figure within the procession.',
              x: 50,
              y: 71,
            },
          ],
        },
      ] as CharacterCopy[],
    },
  }[language];

  const translatedCharacters = copy.characters as CharacterCopy[];

  const characters: CharacterView[] = historyContent.characters.map((storedCharacter, index) => {
    const translatedCharacter = translatedCharacters[index];

    if (language === 'es' || !translatedCharacter) {
      return {
        ...storedCharacter,
        color: characterColors[storedCharacter.id] ?? 'text-primary',
      };
    }

    const translatedHotspotsById = new Map(
      translatedCharacter.hotspots.map((hotspot) => [hotspot.id, hotspot])
    );

    return {
      ...storedCharacter,
      color: characterColors[storedCharacter.id] ?? 'text-primary',
      name: translatedCharacter.name,
      desc: translatedCharacter.desc,
      detail: translatedCharacter.detail,
      hotspots: storedCharacter.hotspots.map((hotspot) => {
        const translatedHotspot = translatedHotspotsById.get(hotspot.id);

        if (!translatedHotspot) {
          return hotspot;
        }

        return {
          ...hotspot,
          label: translatedHotspot.label,
          title: translatedHotspot.title,
          description: translatedHotspot.description,
        };
      }),
    };
  });

  useEffect(() => {
    let isMounted = true;

    const loadAspectRatios = async () => {
      const entries = await Promise.all(
        characters.map(async (character) => {
          const fallback = getDefaultInteractiveAspectRatio(character.id);
          const aspectRatio = await readImageAspectRatio(character.detailImg ?? character.img, fallback);
          return [character.id, aspectRatio] as const;
        })
      );

      if (!isMounted) {
        return;
      }

      setInteractiveAspectRatios(Object.fromEntries(entries));
    };

    loadAspectRatios();

    return () => {
      isMounted = false;
    };
  }, [characters]);

  function toggleCharacter(characterId: string, defaultHotspotId: string) {
    setExpandedCharacterId((currentId) => currentId === characterId ? null : characterId);
    setActiveHotspots((currentHotspots) => {
      if (currentHotspots[characterId]) {
        return currentHotspots;
      }

      return {
        ...currentHotspots,
        [characterId]: defaultHotspotId,
      };
    });
  }

  function setActiveHotspot(characterId: string, hotspotId: string) {
    setActiveHotspots((currentHotspots) => ({
      ...currentHotspots,
      [characterId]: hotspotId,
    }));
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[819px] flex items-end overflow-hidden pt-20">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover brightness-50"
          >
            <source src="./videos/Pillaro_Video1.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
        </div>
        
        <div className="relative z-10 px-8 pb-16 w-full max-w-screen-2xl mx-auto">
          <div className="max-w-2xl">
            <span className="inline-block text-secondary font-headline uppercase tracking-[0.3em] text-sm mb-4 font-bold">{copy.badge}</span>
            <h1 className="text-6xl md:text-8xl font-headline font-black tracking-tighter leading-none mb-8">
              {copy.title} <span className="text-primary-container italic">{copy.titleAccent}</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl leading-relaxed">
              {copy.description}
            </p>
          </div>
        </div>
      </section>

      {/* Narrative Content */}
      <section className="py-24 px-8 bg-surface">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4 flex flex-col justify-center">
            <h2 className="text-4xl font-headline font-bold text-secondary mb-8 leading-tight">
              {copy.sectionTitle}
            </h2>
            <div className="w-16 h-1 bg-primary-container"></div>
          </div>
          
          <div className="lg:col-start-6 lg:col-span-6">
            <div className="space-y-8 text-on-surface leading-loose text-lg font-light">
              <p>
                {copy.paragraphs[0]}
              </p>
              
              <p>
                {copy.paragraphs[1]}
              </p>
              
              <blockquote className="border-l-4 border-secondary pl-8 py-4 my-12 bg-surface-container-low italic text-xl text-secondary-fixed">
                "{copy.quote}"
              </blockquote>
              
              <p>
                {copy.paragraphs[2]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery of Characters */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-16 text-center">
            <p className="text-secondary font-headline uppercase tracking-[0.25em] text-xs md:text-sm mb-4 font-bold">{copy.protagonistsEyebrow}</p>
            <h2 className="text-5xl font-headline font-black uppercase tracking-tight mb-4">{copy.protagonistsTitle}</h2>
            <p className="text-neutral-400 font-body text-sm max-w-3xl mx-auto">{copy.protagonistsSubtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-start">
            {characters.map((char, i) => (
              (() => {
                const isExpanded = expandedCharacterId === char.id;
                const activeHotspotId = activeHotspots[char.id] ?? char.hotspots[0].id;
                const activeHotspot = char.hotspots.find((hotspot) => hotspot.id === activeHotspotId) ?? char.hotspots[0];
                const isInteractiveEnabled = char.interactiveEnabled !== false;

                return (
              <div 
                key={char.id}
                className={`group bg-surface-container-high rounded-2xl overflow-hidden border border-outline-variant/20 transition-all duration-300 hover:scale-[1.01] ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''} ${!isExpanded && (i === 1 || i === 4) ? 'lg:mt-12' : ''}`}
              >
                <div className={`${isExpanded ? 'lg:grid lg:grid-cols-[320px_minmax(0,1fr)]' : ''}`}>
                  <div className="aspect-[3/4] overflow-hidden relative bg-gradient-to-b from-black/20 via-transparent to-black/40">
                    <img 
                      alt={char.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src={char.img}
                    />
                    <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className={`text-3xl font-headline font-bold ${char.color}`}>{char.name}</h3>
                    </div>
                  </div>

                  <div className="p-8 flex flex-col justify-between gap-6">
                    <div className="space-y-4">
                      <p className="text-on-surface-variant leading-relaxed">
                        {char.desc}
                      </p>
                    </div>

                    {isInteractiveEnabled && (
                      <button
                        type="button"
                        className="inline-flex items-center gap-3 self-start rounded-full border border-secondary/40 px-5 py-3 text-sm font-bold uppercase tracking-[0.18em] text-secondary transition-colors hover:bg-secondary hover:text-surface"
                        aria-expanded={isExpanded}
                        onClick={() => toggleCharacter(char.id, char.hotspots[0].id)}
                      >
                        <Sparkles className="h-4 w-4" />
                        {isExpanded ? copy.protagonistsCloseButton : copy.protagonistsOpenButton}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    )}
                  </div>
                </div>

                {isExpanded && isInteractiveEnabled && (
                  <div className="border-t border-outline-variant/20 bg-surface/30 p-8 md:p-10">
                    <div className="grid gap-10 xl:grid-cols-[minmax(0,1.3fr)_380px] xl:items-start">
                      <div className="space-y-6">
                        <div className="space-y-3">
                          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">{copy.protagonistsDetailTitle}</p>
                          <p className="text-on-surface-variant leading-relaxed max-w-3xl">{char.detail}</p>
                          <p className="text-sm text-neutral-400">{copy.protagonistsHint}</p>
                        </div>

                        <div
                          className={`relative mx-auto w-full overflow-hidden rounded-[2rem] border border-outline-variant/20 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.18),_transparent_45%),linear-gradient(180deg,rgba(26,26,26,0.35),rgba(0,0,0,0.05))] ${char.id === 'diablo' ? 'max-w-sm bg-black/30' : 'max-w-2xl bg-black/20'}`}
                          style={{ aspectRatio: interactiveAspectRatios[char.id] ?? getDefaultInteractiveAspectRatio(char.id) }}
                        >
                          <img
                            alt={char.name}
                            src={char.detailImg ?? char.img}
                            className="h-full w-full object-contain"
                          />

                          {char.hotspots.map((hotspot) => {
                            const isActive = activeHotspot.id === hotspot.id;

                            return (
                              <div
                                key={hotspot.id}
                                className="absolute"
                                style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
                              >
                                <button
                                  type="button"
                                  className={`relative flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all md:h-5 md:w-5 ${isActive ? 'scale-125 border-secondary bg-secondary shadow-lg shadow-secondary/40' : 'border-white/80 bg-white/20 hover:scale-110 hover:border-secondary hover:bg-secondary/80'}`}
                                  aria-label={hotspot.title}
                                  onClick={() => setActiveHotspot(char.id, hotspot.id)}
                                  onMouseEnter={() => setActiveHotspot(char.id, hotspot.id)}
                                  onFocus={() => setActiveHotspot(char.id, hotspot.id)}
                                >
                                  <span className={`h-2 w-2 rounded-full ${isActive ? 'bg-surface' : 'bg-white'}`}></span>
                                  <span className={`absolute inset-0 rounded-full ${isActive ? 'animate-ping bg-secondary/40' : ''}`}></span>
                                </button>

                                {isActive && (
                                  <span className="pointer-events-none absolute left-1/2 top-0 z-10 hidden max-w-[11rem] -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] rounded-2xl bg-surface/95 px-3 py-2 text-center text-[11px] font-semibold leading-tight text-on-surface shadow-lg backdrop-blur md:block">
                                    {hotspot.label}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>

                        <div className="rounded-3xl bg-surface px-5 py-6 xl:hidden">
                          <h4 className="text-2xl font-headline font-bold text-on-surface mb-3">{activeHotspot.title}</h4>
                          <p className="text-on-surface-variant leading-relaxed">{activeHotspot.description}</p>
                        </div>
                      </div>

                      <aside className="hidden self-start rounded-[2rem] border border-outline-variant/20 bg-surface-container px-6 py-7 md:px-8 xl:sticky xl:top-28 xl:block xl:max-h-[calc(100vh-8rem)] xl:overflow-y-auto">
                        <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary mb-5">{copy.protagonistsListTitle}</p>
                        <div className="flex flex-wrap gap-3 mb-8">
                          {char.hotspots.map((hotspot) => {
                            const isActive = activeHotspot.id === hotspot.id;

                            return (
                              <button
                                key={hotspot.id}
                                type="button"
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${isActive ? 'border-secondary bg-secondary text-surface' : 'border-outline-variant text-on-surface-variant hover:border-secondary hover:text-on-surface'}`}
                                onClick={() => setActiveHotspot(char.id, hotspot.id)}
                              >
                                {hotspot.label}
                              </button>
                            );
                          })}
                        </div>

                        <div className="rounded-3xl bg-surface px-5 py-6">
                          <h4 className="text-2xl font-headline font-bold text-on-surface mb-3">{activeHotspot.title}</h4>
                          <p className="text-on-surface-variant leading-relaxed">{activeHotspot.description}</p>
                        </div>
                      </aside>
                    </div>
                  </div>
                )}
              </div>
                );
              })()
            ))}
            
            {/* CTA Card */}
            <div className="lg:mt-24 p-8 border border-outline-variant/30 rounded-xl bg-gradient-to-br from-primary-container/20 to-transparent">
              <BookOpen className="w-12 h-12 text-secondary mb-6" />
              <h4 className="text-2xl font-headline font-bold mb-4">{copy.ctaTitle}</h4>
              <p className="text-on-surface-variant mb-6 leading-relaxed">
                {copy.ctaDescription}
              </p>
              <button className="text-secondary font-bold hover:underline flex items-center gap-2">
                {copy.ctaButton} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
