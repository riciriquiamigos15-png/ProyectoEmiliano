import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Palette, Music, Info, MapPin, Play, Pause } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

export default function HomePage() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { language, setLanguage } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const copy = {
    es: {
      badge: 'Tradición Milenaria',
      title: 'RITUAL',
      titleAccent: 'PILLAREÑA',
      description: 'Sumérgete en la danza frenética de los diablos. Una explosión de arte, música y tradición que late en el corazón del cantón de Píllaro.',
      primaryCta: 'VIVE LA EXPERIENCIA',
      secondaryCta: 'EXPLORAR GALERÍA',
      audioPlay: 'Reproducir música',
      audioPause: 'Pausar música',
      languageLabel: 'Idioma',
      welcomeTitle: 'La Sangre de una',
      welcomeAccent: 'Tierra Indomable',
      welcomeText1: 'Píllaro no solo celebra una fiesta; revive su identidad. La Diablada es el grito de libertad de un pueblo que transformó la sátira en arte y el movimiento en resistencia cultural.',
      welcomeText2: 'Cada máscara es una obra maestra única, tallada con la paciencia del artesano y el alma del danzante. Al son de la banda de pueblo, los "Diablos" recorren las calles contagiando un misticismo que solo se puede entender al vivirlo.',
      historyLink: 'Conoce nuestra historia',
      eventDates: 'Enero de cada año',
      legacyTitle: 'Explora el Legado',
      legacySubtitle: 'Los pilares fundamentales de nuestra celebración ancestral.',
      historyCard: 'HISTORIA',
      historyCardText: 'Desde las raíces coloniales hasta el reconocimiento como Patrimonio Cultural de la Nación.',
      artCard: 'ARTE',
      artCardCta: 'Ver artesanías',
      musicCard: 'MÚSICA',
      guideCard: 'GUÍA',
      guideCardText: 'Logística, hospedaje y mapa.',
      footerClaim: '© 2024 La Diablada Pillareña. Patrimonio Cultural del Ecuador.',
      footerLocationLabel: 'Corazón de Ecuador',
      footerLocation: 'Píllaro, Tungurahua',
      contact: 'Contacto',
      heroImageAlt: 'Danzante tradicional de Píllaro en la Diablada',
      historyImageAlt: 'Máscaras tradicionales siendo elaboradas',
      artImageAlt: 'Textiles tradicionales y bordados',
      musicImageAlt: 'Instrumentos tradicionales',
    },
    en: {
      badge: 'Ancient Tradition',
      title: 'RITUAL',
      titleAccent: 'PILLAREÑA',
      description: 'Immerse yourself in the frantic dance of the devils. An explosion of art, music, and tradition beating in the heart of Píllaro.',
      primaryCta: 'LIVE THE EXPERIENCE',
      secondaryCta: 'EXPLORE GALLERY',
      audioPlay: 'Play music',
      audioPause: 'Pause music',
      languageLabel: 'Language',
      welcomeTitle: 'The Blood of an',
      welcomeAccent: 'Untamed Land',
      welcomeText1: 'Píllaro does not simply celebrate a festival; it relives its identity. The Diablada is the cry of freedom of a people who transformed satire into art and movement into cultural resistance.',
      welcomeText2: 'Each mask is a one-of-a-kind masterpiece, carved with the patience of the artisan and the soul of the dancer. To the sound of the town band, the "Devils" roam the streets spreading a mysticism that can only be understood by living it.',
      historyLink: 'Discover our history',
      eventDates: 'January every year',
      legacyTitle: 'Explore the Legacy',
      legacySubtitle: 'The foundational pillars of our ancestral celebration.',
      historyCard: 'HISTORY',
      historyCardText: 'From colonial roots to recognition as National Cultural Heritage.',
      artCard: 'ART',
      artCardCta: 'See crafts',
      musicCard: 'MUSIC',
      guideCard: 'GUIDE',
      guideCardText: 'Logistics, lodging, and map.',
      footerClaim: '© 2024 La Diablada Pillareña. Cultural Heritage of Ecuador.',
      footerLocationLabel: 'Heart of Ecuador',
      footerLocation: 'Píllaro, Tungurahua',
      contact: 'Contact',
      heroImageAlt: 'Traditional Píllaro dancer in the Diablada',
      historyImageAlt: 'Traditional masks being crafted',
      artImageAlt: 'Traditional textiles and embroidery',
      musicImageAlt: 'Traditional instruments',
    },
  }[language];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    const handlePause = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);

    audio.addEventListener('pause', handlePause);
    audio.addEventListener('play', handlePlay);

    return () => {
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('play', handlePlay);
    };
  }, []);

  return (
    <div className="w-full">
      <audio 
        ref={audioRef}
        loop 
        playsInline
        style={{ display: 'none' }}
      >
        <source src="./audio/Pillareñita.mp3" type="audio/mpeg" />
      </audio>

      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="./videos/Video_Intro_WEB.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-black/40 to-black/20"></div>
        </div>

        <div className="absolute top-8 left-1/2 z-20 flex w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 items-center justify-between gap-3 rounded-full border border-white/10 bg-neutral-950/45 px-3 py-2 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur-xl md:top-10 md:left-auto md:right-8 md:w-auto md:max-w-none md:translate-x-0">
          <button
            type="button"
            onClick={toggleAudio}
            aria-label={isPlaying ? copy.audioPause : copy.audioPlay}
            title={isPlaying ? copy.audioPause : copy.audioPlay}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-secondary/25 bg-secondary/12 text-secondary transition hover:border-secondary/40 hover:bg-secondary/18"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 translate-x-[1px]" />}
          </button>

          <div className="flex items-center gap-2 rounded-full bg-black/25 p-1">
            <span className="sr-only">{copy.languageLabel}</span>
            {(['es', 'en'] as const).map((option) => {
              const active = language === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => setLanguage(option)}
                  className={`min-w-11 rounded-full px-3 py-2 text-xs font-black uppercase tracking-[0.2em] transition ${active ? 'bg-primary-container text-on-primary-container shadow-[0_8px_24px_rgba(211,47,47,0.35)]' : 'text-neutral-300 hover:text-white'}`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <span className="inline-block px-4 py-1 mb-6 text-secondary font-bold tracking-[0.2em] uppercase bg-secondary/10 backdrop-blur-sm rounded-full text-xs">
            {copy.badge}
          </span>
          
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-on-surface tracking-tighter leading-none mb-8 font-headline">
            {copy.title} <br/>DIABLADA <span className="text-primary-container">{copy.titleAccent}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-medium leading-relaxed">
            {copy.description}
          </p>
          
          <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              to="/history"
              className="px-10 py-4 bg-primary-container text-on-primary-container rounded-lg font-extrabold text-lg flex items-center gap-3 hover:bg-tertiary-container transition-all"
            >
              {copy.primaryCta}
              <Music className="w-5 h-5" />
            </Link>
            
            <Link 
              to="/art"
              className="px-10 py-4 border border-secondary/30 text-secondary rounded-lg font-bold text-lg hover:bg-secondary/10 transition-all"
            >
              {copy.secondaryCta}
            </Link>
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-4">
            <div className="w-12 h-1 bg-secondary rounded-full"></div>
            <div className="w-12 h-1 bg-surface-variant rounded-full"></div>
            <div className="w-12 h-1 bg-surface-variant rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-32 px-8 bg-surface">
        <div className="max-w-screen-xl mx-auto flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary-container/20 blur-[100px] rounded-full"></div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img 
                alt={copy.heroImageAlt} 
                className="w-full h-full object-cover" 
                src="./contenido/inicio/Inicio_2.jpg" 
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl"></div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 p-8 bg-surface-container-high rounded-xl shadow-xl border border-outline-variant/10 max-w-[240px]">
              <span className="text-secondary font-black text-4xl block mb-2">01-06</span>
              <span className="text-on-surface font-bold text-sm uppercase tracking-widest">{copy.eventDates}</span>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-on-surface mb-8 leading-tight font-headline">
              {copy.welcomeTitle} <br/><span className="text-secondary">{copy.welcomeAccent}</span>
            </h2>
            
            <div className="space-y-6 text-on-surface-variant text-lg leading-relaxed">
              <p>{copy.welcomeText1}</p>
              <p>{copy.welcomeText2}</p>
            </div>
            
            <div className="mt-12">
              <Link 
                to="/history"
                className="inline-flex items-center gap-2 text-secondary font-bold text-lg hover:underline decoration-2 underline-offset-8"
              >
                {copy.historyLink}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid */}
      <section className="py-24 px-8 bg-surface-container-low">
        <div className="max-w-screen-xl mx-auto">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-4xl font-bold text-on-surface font-headline">{copy.legacyTitle}</h2>
              <p className="text-on-surface-variant mt-2">{copy.legacySubtitle}</p>
            </div>
            <div className="h-[1px] flex-grow mx-8 bg-outline-variant/20 hidden md:block"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-auto md:h-[600px]">
            {/* Historia */}
            <Link 
              to="/history"
              className="md:col-span-2 md:row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl bg-surface-container"
            >
              <img 
                alt={copy.historyImageAlt} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" 
                src="./contenido/inicio/Inicio_3.jpg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
              <div className="absolute bottom-0 p-10">
                <h3 className="text-3xl font-black text-on-surface mb-3 font-headline">{copy.historyCard}</h3>
                <p className="text-on-surface-variant max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {copy.historyCardText}
                </p>
                <span className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-lg">
                  <BookOpen className="w-5 h-5" />
                </span>
              </div>
            </Link>

            {/* Arte */}
            <Link 
              to="/art"
              className="md:col-span-2 relative group cursor-pointer overflow-hidden rounded-2xl bg-surface-container"
            >
              <img 
                alt={copy.artImageAlt} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50" 
                src="./contenido/inicio/Inicio_4.jpg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
              <div className="absolute bottom-0 p-8">
                <h3 className="text-2xl font-black text-on-surface mb-2 font-headline">{copy.artCard}</h3>
                <div className="flex items-center gap-3 text-secondary">
                  <span className="text-sm font-bold uppercase tracking-widest">{copy.artCardCta}</span>
                  <Palette className="w-4 h-4" />
                </div>
              </div>
            </Link>

            {/* Música */}
            <Link 
              to="/music"
              className="md:col-span-1 relative group cursor-pointer overflow-hidden rounded-2xl bg-surface-container"
            >
              <img 
                alt={copy.musicImageAlt} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50" 
                src="./contenido/inicio/Inicio_5.jpg" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent"></div>
              <div className="absolute bottom-0 p-6">
                <h3 className="text-xl font-black text-on-surface font-headline">{copy.musicCard}</h3>
                <Music className="w-5 h-5 text-secondary mt-2" />
              </div>
            </Link>

            {/* Información */}
            <Link 
              to="/info"
              className="md:col-span-1 relative group cursor-pointer overflow-hidden rounded-2xl bg-primary-container"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary-container to-on-primary-fixed-variant"></div>
              <div className="relative h-full flex flex-col justify-between p-6">
                <Info className="w-8 h-8 text-on-primary-container" />
                <div>
                  <h3 className="text-xl font-black text-on-primary-container font-headline">{copy.guideCard}</h3>
                  <p className="text-on-primary-container/80 text-sm font-medium">{copy.guideCardText}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800/40 w-full py-12 px-8">
        <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-headline font-bold text-neutral-100 text-xl mb-2">La Diablada Pillareña</span>
            <p className="font-body text-sm tracking-wide text-neutral-400 text-center md:text-left">
              {copy.footerClaim}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-8">
            <a href="#" className="text-neutral-500 hover:text-red-500 transition-colors font-medium">Facebook</a>
            <a href="#" className="text-neutral-500 hover:text-red-500 transition-colors font-medium">Instagram</a>
            <a href="#" className="text-neutral-500 hover:text-red-500 transition-colors font-medium">YouTube</a>
            <a href="#" className="text-neutral-500 hover:text-red-500 transition-colors font-medium">{copy.contact}</a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="block text-xs text-neutral-500 uppercase tracking-tighter">{copy.footerLocationLabel}</span>
              <span className="text-on-surface font-bold">{copy.footerLocation}</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center">
              <MapPin className="w-5 h-5 text-secondary" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
