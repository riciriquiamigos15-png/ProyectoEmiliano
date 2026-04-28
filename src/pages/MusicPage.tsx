import React, { useState, useRef } from 'react';
import { Play, Pause, Music2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Song {
  name: string;
  desc: string;
  src: string;
  sourceUrl: string;
}

interface Genre {
  id: string;
  name: string;
  desc: string;
  songs: Song[];
}

export default function MusicPage() {
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { language } = useLanguage();

  const toggleTrack = (src: string) => {
    if (!audioRef.current) return;
    if (currentTrack === src && !audioRef.current.paused) {
      audioRef.current.pause();
      setCurrentTrack(null);
    } else {
      audioRef.current.src = src;
      audioRef.current.volume = 0.8;
      audioRef.current.play();
      setCurrentTrack(src);
    }
  };

  const handleAudioEnd = () => {
    setCurrentTrack(null);
  };

  const genres: Genre[] = language === 'es'
    ? [
        {
          id: 'sanjuanito',
          name: 'San Juanito',
          desc: 'Es uno de los ritmos más importantes de la Diablada Pillareña, porque transmite alegría, energía y tradición. Es la música que más representa la fiesta y acompaña a los danzantes en sus recorridos.',
          songs: [
            {
              name: 'Soldado de Cristo',
              desc: 'Sanjuanito muy conocido dentro de la celebración, que representa fuerza, tradición y el espíritu de la Diablada.',
              src: '/contenido/musica/sanjuanito/Soldado de Cristo.m4a',
              sourceUrl: 'https://www.youtube.com/watch?v=odjuyR5GStk',
            },
            {
              name: 'San Juan de los Toros',
              desc: 'Música tradicional muy ligada a la identidad cultural de Píllaro y sus festividades.',
              src: '/contenido/musica/sanjuanito/San Juan de los Toros.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=PcHXXl0gwjk',
            },
            {
              name: 'La Guarichada',
              desc: 'Canción alegre y popular que forma parte del ambiente festivo de la Diablada.',
              src: '/contenido/musica/sanjuanito/La Guarichada.m4a',
              sourceUrl: 'https://www.youtube.com/watch?v=S7lmfc4gwFA',
            },
          ],
        },
        {
          id: 'albazo',
          name: 'Albazo',
          desc: 'Es un ritmo tradicional ecuatoriano muy alegre, utilizado en muchas fiestas populares por su energía y entusiasmo.',
          songs: [
            {
              name: 'Avecilla',
              desc: 'Albazo reconocido por su melodía tradicional y su presencia en celebraciones andinas.',
              src: '/contenido/musica/albazo/Avecilla.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=LMsAnLlJRYM',
            },
          ],
        },
        {
          id: 'tonada',
          name: 'Tonada',
          desc: 'La tonada tiene un estilo más tranquilo y melódico, y suele transmitir las costumbres, recuerdos y tradiciones del pueblo.',
          songs: [
            {
              name: 'Pillaro Viejo',
              desc: 'Tonada representativa de Píllaro que refleja orgullo, identidad y tradición.',
              src: '/contenido/musica/tonada/PILLARO VIEJO.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=sd9pwQE7vKM',
            },
          ],
        },
        {
          id: 'pasacalle',
          name: 'Pasacalle',
          desc: 'Es un ritmo tradicional, alegre y dinámico que aporta energía, movimiento y un carácter festivo muy representativo en desfiles, celebraciones populares y eventos culturales.',
          songs: [
            {
              name: 'El Yumbo',
              desc: 'Tema alegre y enérgico que destaca por su ritmo festivo dentro de la celebración.',
              src: '/contenido/musica/pasacalle/EL YUMBO.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=QGPjWwE23Ok',
            },
          ],
        },
      ]
    : [
        {
          id: 'sanjuanito',
          name: 'San Juanito',
          desc: 'One of the most important rhythms of the Diablada Pillareña, conveying joy, energy and tradition. It is the music that best represents the celebration and accompanies the dancers on their routes.',
          songs: [
            {
              name: 'Soldado de Cristo',
              desc: 'A well-known Sanjuanito within the celebration, representing strength, tradition and the spirit of the Diablada.',
              src: '/contenido/musica/sanjuanito/Soldado de Cristo.m4a',
              sourceUrl: 'https://www.youtube.com/watch?v=odjuyR5GStk',
            },
            {
              name: 'San Juan de los Toros',
              desc: 'Traditional music closely tied to the cultural identity of Píllaro and its festivities.',
              src: '/contenido/musica/sanjuanito/San Juan de los Toros.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=PcHXXl0gwjk',
            },
            {
              name: 'La Guarichada',
              desc: 'A joyful and popular song that is part of the festive atmosphere of the Diablada.',
              src: '/contenido/musica/sanjuanito/La Guarichada.m4a',
              sourceUrl: 'https://www.youtube.com/watch?v=S7lmfc4gwFA',
            },
          ],
        },
        {
          id: 'albazo',
          name: 'Albazo',
          desc: 'A very cheerful traditional Ecuadorian rhythm, used in many popular festivals for its energy and enthusiasm.',
          songs: [
            {
              name: 'Avecilla',
              desc: 'Albazo recognized for its traditional melody and presence in Andean celebrations.',
              src: '/contenido/musica/albazo/Avecilla.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=LMsAnLlJRYM',
            },
          ],
        },
        {
          id: 'tonada',
          name: 'Tonada',
          desc: 'The Tonada has a quieter and more melodic style, and tends to convey the customs, memories and traditions of the people.',
          songs: [
            {
              name: 'Pillaro Viejo',
              desc: 'A representative Tonada of Píllaro that reflects pride, identity and tradition.',
              src: '/contenido/musica/tonada/PILLARO VIEJO.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=sd9pwQE7vKM',
            },
          ],
        },
        {
          id: 'pasacalle',
          name: 'Pasacalle',
          desc: 'A traditional, cheerful and dynamic rhythm that brings energy, movement and a festive character, very representative in parades, popular celebrations and cultural events.',
          songs: [
            {
              name: 'El Yumbo',
              desc: 'A cheerful and energetic piece that stands out for its festive rhythm within the celebration.',
              src: '/contenido/musica/pasacalle/EL YUMBO.mp3',
              sourceUrl: 'https://www.youtube.com/watch?v=QGPjWwE23Ok',
            },
          ],
        },
      ];

  const heroText = language === 'es'
    ? {
        badge: 'Ritmos Ancestrales',
        title: 'La Música de la',
        titleAccent: 'Diablada',
        description: 'La música no solo acompaña, ella comanda. Cada ritmo, cada melodía, es un latido de la tierra pillareña que vive en la fiesta.',
        heroAlt: 'Banda de Pueblo Pillareña',
      }
    : {
        badge: 'Ancestral Rhythms',
        title: 'The Music of the',
        titleAccent: 'Diablada',
        description: 'Music does not simply accompany, it commands. Every rhythm, every melody, is a heartbeat of Píllaro living within the festival.',
        heroAlt: 'Pillaro Town Band',
      };

  const sectionLabel = language === 'es' ? 'Ritmos de la Fiesta' : 'Festival Rhythms';
  const sectionSubtitle = language === 'es'
    ? 'Conoce los géneros musicales que forman parte de la celebración'
    : 'Discover the musical genres that are part of the celebration';
  const playLabel = language === 'es' ? 'Reproducir' : 'Play';
  const pauseLabel = language === 'es' ? 'Pausar' : 'Pause';
  const sourceLabel = language === 'es' ? 'Fuente original' : 'Original source';
  const sourceHint = language === 'es' ? 'Ver en YouTube' : 'View on YouTube';

  return (
    <div className="w-full pt-20">
      {/* Hidden audio element */}
      <audio ref={audioRef} onEnded={handleAudioEnd} />

      {/* Hero Section */}
      <section className="min-h-[600px] flex items-center px-8 md:px-20 py-16 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center w-full">
          {/* Text */}
          <div className="order-2 md:order-1">
            <span className="text-secondary font-headline font-bold uppercase tracking-widest text-sm mb-4 block">
              {heroText.badge}
            </span>
            <h1 className="text-6xl md:text-8xl font-black font-headline leading-tight mb-8">
              {heroText.title} <br />
              <span className="text-primary-container">{heroText.titleAccent}</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl leading-relaxed">
              {heroText.description}
            </p>
          </div>

          {/* Image */}
          <div className="order-1 md:order-2 relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                src="/contenido/musica/imagenes/Banda_Pillaro2.png"
                alt={heroText.heroAlt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            </div>
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* Genres & Songs Section */}
      <section className="px-8 md:px-20 py-16 bg-surface-container-low">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl font-black font-headline text-on-surface mb-2">{sectionLabel}</h2>
            <p className="text-secondary font-medium">{sectionSubtitle}</p>
          </div>

          <div className="space-y-16">
            {genres.map((genre) => (
              <div key={genre.id}>
                {/* Genre info — no play button */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary-container/20 border border-primary-container/40 flex items-center justify-center shrink-0 mt-1">
                    <Music2 className="w-5 h-5 text-primary-container" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black font-headline text-secondary mb-2">{genre.name}</h3>
                    <p className="text-on-surface-variant leading-relaxed max-w-2xl">{genre.desc}</p>
                  </div>
                </div>

                {/* Songs with play buttons */}
                <div className="ml-16 grid gap-3">
                  {genre.songs.map((song) => {
                    const isPlaying = currentTrack === song.src;
                    return (
                      <div
                        key={song.src}
                        className="flex items-center gap-4 bg-surface-container-high rounded-xl px-5 py-4 border border-outline-variant/15 group hover:border-primary-container/40 transition-all"
                      >
                        <button
                          onClick={() => toggleTrack(song.src)}
                          className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 hover:scale-110 transition-transform"
                          aria-label={isPlaying ? pauseLabel : playLabel}
                        >
                          {isPlaying ? (
                            <Pause className="w-4 h-4 fill-current" />
                          ) : (
                            <Play className="w-4 h-4 fill-current" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold font-headline text-on-surface text-base leading-tight">{song.name}</p>
                          <p className="text-sm text-on-surface-variant mt-0.5 leading-snug">{song.desc}</p>
                        </div>
                        <div className="shrink-0 flex flex-col items-end gap-2">
                          <a
                            href={song.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-secondary/40 text-secondary hover:bg-secondary/10 transition-colors"
                          >
                            {sourceLabel}
                          </a>
                          {isPlaying ? (
                            <span className="text-xs font-bold text-primary-container uppercase tracking-widest">
                              {language === 'es' ? 'Reproduciendo' : 'Playing'}
                            </span>
                          ) : (
                            <span className="text-[10px] font-semibold text-on-surface-variant uppercase tracking-wider">
                              {sourceHint}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments & Video Section */}
      <section className="px-8 md:px-20 py-16 bg-neutral-950">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black font-headline text-on-surface mb-2">
              {language === 'es' ? 'Instrumentos de la Banda' : 'Band Instruments'}
            </h2>
            <p className="text-secondary font-medium">
              {language === 'es'
                ? 'El alma sonora que da vida a la Diablada Pillareña'
                : 'The sound soul that gives life to the Diablada Pillareña'}
            </p>
          </div>

          {/* Layout: 2 images | video | 2 images */}
          <div className="flex flex-col md:flex-row items-center md:items-end gap-3 md:gap-2">

            {/* Left instruments */}
            <div className="flex flex-row md:flex-col gap-3 md:gap-3 shrink-0 md:translate-y-4">
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border border-outline-variant/20 group">
                  <img
                    src="/contenido/musica/imagenes/Bombo.png"
                    alt={language === 'es' ? 'Bombo' : 'Bass drum'}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-on-surface">Bombo</p>
              </div>
              <div className="flex flex-col items-center md:mt-2">
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border border-outline-variant/20 group">
                  <img
                    src="/contenido/musica/imagenes/Trompeta.jpg"
                    alt={language === 'es' ? 'Trompeta' : 'Trumpet'}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-on-surface">Trompeta</p>
              </div>
            </div>

            {/* Center video — vertical TikTok style */}
            <div className="flex-1 flex justify-center">
              <div className="w-full max-w-[280px] sm:max-w-[320px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/20 bg-black">
                <video
                  className="w-full h-full object-cover"
                  src="/contenido/musica/imagenes/Musica_Diablada.mp4"
                  controls
                  playsInline
                  loop
                  muted
                />
              </div>
            </div>

            {/* Right instruments */}
            <div className="flex flex-row md:flex-col gap-3 md:gap-3 shrink-0 md:translate-y-4">
              <div className="flex flex-col items-center md:mt-2">
                <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border border-outline-variant/20 group">
                  <img
                    src="/contenido/musica/imagenes/Platillos.jpg"
                    alt={language === 'es' ? 'Platillos' : 'Cymbals'}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-on-surface">Platillos</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-36 h-36 md:w-44 md:h-44 rounded-xl overflow-hidden border border-outline-variant/20 group">
                  <img
                    src="/contenido/musica/imagenes/Tambor.jpg"
                    alt={language === 'es' ? 'Tambores' : 'Drums'}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <p className="mt-2 text-sm font-semibold text-on-surface">Tambor</p>
              </div>
            </div>
          </div>

          {/* Instrument labels */}
          <div className="flex justify-center gap-6 md:gap-12 mt-8 flex-wrap">
            {(['Bombo', 'Trompeta', 'Platillos', 'Tambores'] as const).map((name) => (
              <span key={name} className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
