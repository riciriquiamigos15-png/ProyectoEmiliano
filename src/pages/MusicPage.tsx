import React, { useState, useRef } from 'react';
import { Play, Music, Quote, Pause } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { language } = useLanguage();

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.volume = 0.3;
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  const copy = {
    es: {
      badge: 'Ritmos Ancestrales',
      title: 'El Pulso del',
      titleAccent: 'Diablo',
      description: 'La música no solo acompaña, ella comanda. Desde el estruendo de las bandas de pueblo hasta el ritmo frenético del Sanjuanito, cada nota es un latido de la tierra pillareña.',
      pause: 'Pausar',
      play: 'Escuchar Tradición',
      heroAlt: 'Instrumentos de Banda de Pueblo',
      bandsTitle: 'Bandas de Pueblo',
      bandsSubtitle: 'Los arquitectos del sonido de la fiesta.',
      legendary: 'La Legendaria',
      featuredBandTitle: 'Banda Municipal de Píllaro',
      featuredBandDesc: 'Institución musical que ha guardado las partituras originales de la Diablada por más de medio siglo.',
      cards: [
        { title: 'El Sanjuanito', desc: 'El ritmo base que marca el paso de los diablos. Un compás de 2/4 que invita al zapateo constante y frenético.' },
        { title: 'Bandas de Pueblo', desc: 'Son las principales encargadas de poner el ambiente festivo. Recorren las calles tocando música tradicional durante toda la fiesta.' },
        { title: 'Música de Banda (Pasacalles)', desc: 'Ritmos alegres y fuertes que acompañan el desfile de los diablos y dan energía a la celebración.' },
        { title: 'Albazos y Tonadas', desc: 'Son melodías más suaves y tradicionales que representan momentos culturales y de reunión.' },
        { title: 'Dianas o Toques de Banda', desc: 'Son sonidos fuertes de viento y percusión que anuncian el inicio de la fiesta o momentos importantes.' },
        { title: 'Zapateo de los Diablos', desc: 'No es música como tal, pero el sonido de los pasos fuertes sobre el suelo forma parte del ritmo de la fiesta.' },
        { title: 'Caracoles y Silbatos', desc: 'Se usan para animar y marcar el ritmo durante el recorrido en algunas comparsas.' },
      ],
      quoteBefore: 'Al son de la banda, el diablo no camina,',
      quoteAccent: 'vuela sobre el empedrado',
      quoteAfter: 'buscando el alma de la fiesta.',
      sectionA: 'La Banda Mocha',
      sectionADesc: 'Una variante ancestral que utiliza instrumentos vegetales como el penco o la hoja de capulí, creando una textura orgánica única que resuena con los espíritus de la montaña.',
      sectionB: 'Tonadas y Albazos',
      sectionBDesc: 'Aunque el Sanjuanito es el rey, las tonadas marcan los momentos de descanso y los albazos saludan el despertar del pueblo antes de la gran partida.',
      rhythmStrip: 'PILLARO • MUSICA • DIABLO • RITMO • PILLARO • MUSICA • DIABLO • RITMO',
    },
    en: {
      badge: 'Ancestral Rhythms',
      title: 'The Pulse of the',
      titleAccent: 'Devil',
      description: 'Music does not simply accompany, it commands. From the thunder of town bands to the frantic rhythm of the Sanjuanito, every note is a heartbeat of Píllaro.',
      pause: 'Pause',
      play: 'Listen to the Tradition',
      heroAlt: 'Town band instruments',
      bandsTitle: 'Town Bands',
      bandsSubtitle: 'The architects of the festival’s sound.',
      legendary: 'The Legendary One',
      featuredBandTitle: 'Píllaro Municipal Band',
      featuredBandDesc: 'A musical institution that has preserved the original Diablada scores for more than half a century.',
      cards: [
        { title: 'The Sanjuanito', desc: 'The base rhythm that marks the devils’ steps. A 2/4 meter that invites constant, frenzied footwork.' },
        { title: 'Town Bands', desc: 'They are chiefly responsible for creating the festive atmosphere, moving through the streets playing traditional music throughout the celebration.' },
        { title: 'Band Music and Street Marches', desc: 'Joyful and powerful rhythms that accompany the devils’ parade and energize the celebration.' },
        { title: 'Albazos and Melodies', desc: 'Softer and more traditional melodies representing cultural and communal moments.' },
        { title: 'Band Calls and Fanfares', desc: 'Strong wind and percussion sounds that announce the start of the celebration or other important moments.' },
        { title: 'The Devils’ Footwork', desc: 'Not music in itself, but the sound of strong steps against the ground forms part of the celebration’s rhythm.' },
        { title: 'Conches and Whistles', desc: 'Used to animate and mark the rhythm along the route in some troupes.' },
      ],
      quoteBefore: 'To the sound of the band, the devil does not walk, it',
      quoteAccent: 'flies over the cobblestones',
      quoteAfter: 'in search of the soul of the festival.',
      sectionA: 'The Banda Mocha',
      sectionADesc: 'An ancestral variant that uses plant-based instruments such as agave stalks or capulí leaves, creating a unique organic texture that resonates with the spirits of the mountain.',
      sectionB: 'Melodies and Albazos',
      sectionBDesc: 'Although the Sanjuanito reigns supreme, melodies mark moments of rest while albazos greet the awakening of the town before the grand departure.',
      rhythmStrip: 'PILLARO • MUSIC • DEVIL • RHYTHM • PILLARO • MUSIC • DEVIL • RHYTHM',
    },
  }[language];

  const bands = [
    { name: 'Banda Municipal de Píllaro', desc: 'Institución musical que ha guardado las partituras originales de la Diablada por más de medio siglo.' },
    { name: 'El Sanjuanito', desc: 'El ritmo base que marca el paso de los diablos. Un compás de 2/4 que invita al zapateo constante y frenético.', isRhythm: true },
    { name: '+12 Instrumentos de Viento', isStatCard: true },
    { name: '24h Música Ininterrumpida', isStatCard: true }
  ];

  const rhythmGallery = [
    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6RvNPscGCYkAKNKEhY6CKatOhMdwzinCmm0ctnwrGh7skVMoj0-qRdqNykYICtO6NUlCNpQoxkoTqIUYoTR0q3jF2iEXmXz6OHkBxRzKPwieLK1ldzqeWX75S72_2XW3InaTNYqnwXG_yXkUONoALV_ZqUfzqCwvh1DYN03n4pG1yQ4dLKWYOrNRsh9q4P7gxZqufAzdvLc12hsFmGnOvWYkpetiEvfQhsBeuuYflz1He3mHlvoZpUIhB-pAEkEOSlTZAP-4jCuA', alt: language === 'es' ? 'Tambor' : 'Drum' },
    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGuZqBLg-Tp-OzOA4gJKNcJXjUcQB4s04FgfiQ9H93q0qMsyMwpCeXKGj_x6wXBoJPj1YiqpJCWCx8Fl_c4gtRUy-F1D6N3KCJRQL95_wB47ZblZ40Em8iyBeO67be-U-HlCx6dUMmIyq4Lw10OxCRTJy6ahrhjtv7l8KKyh0mjwGlQG351lexho4qKdWkNHWpuOcFL9rWDOrG_RMCbJNczFwyyLfiHFW9wxbwLzJ0GGAvOP1jEW3vRDt7qybMWOg4Jm3BmSCawws', alt: language === 'es' ? 'Saxofón' : 'Saxophone', offset: true },
    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDv4kwxYyguMkRghF-bnC_Isn2pB4RCPJh80GfZgGhkv-uWt5AWGYgLjPNy6rMLNwjmZKC8f2s4qIBrHDgU18fSgwpjelTbMnz2JWHkudVvqnqqxBL4m88Vet1PxlQdEQe4V_Cg7SRgMunYlXpqj-ucftmOpztmS9iKkBFKP3t6mWiHywFGr2l69HRCg0HU0r-h49PZyZppodG2crnj5IrtyVi3rWpSHiO4KM9ANPHdUw-iucBTQPKtWlXbEqtClHCiW98ZrWedIxw', alt: language === 'es' ? 'Danzantes' : 'Dancers' },
    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz3iFZczK9kA4e3NCDepRT1UDpNRIwn084RNHF55MG4EPpj5XzN3FVh0qwDosawmpoVe4kx79QS8nFz2k0jB8Krb1dKZS7ZzII4MmfbCj5cmzR5YgyVe1vBJ_ARqdILU7yooABPjTL-hKnSDTZf_v67YoTUCs3xGf8QD47JXEDKlxRPfOW0_S-gfT2z8WzxTBHi0p8mJ6VVWWX1KAWwwGhcYpFShV0HUJeFSQ9-fHIQrKG5rUiFfJKCvbPXnQ4DC4YE8eS1NDmmMs', alt: language === 'es' ? 'Flauta' : 'Flute', offset: true },
    { img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUNGl8-6KmIDf4U-WoAhubgWUYvNIEZWMsfXG6Jxz1PIwq6YIVMXcHuHb0pdwBQCtPe0ImllZdJSHBFIsBcSNRF5gHvhYJu_2bR9mO3MAIMnjU-BdSQKtX5PaDPvj9MrBcVX-Bhg17Z5yR0jomOxKQkJ2gruTP3fC8Nde9gutn25EbtEUalulAd5Hss8SnwCdYci3E6zaaHObSwuUgx6xjppizVAOsV2HLZjPFfAAwzOGGmlPoWvi9pdgpPcP4agZShIo5ALduUqk', alt: language === 'es' ? 'Partituras' : 'Sheet music' }
  ];

  return (
    <div className="w-full pt-20">
      {/* Hero Section */}
      <section className="min-h-[819px] flex items-center px-8 md:px-20 mb-20">
        <div className="grid grid-cols-1 md:grid-cols-1.2fr md:grid-cols-[1.2fr_0.8fr] gap-12 items-center w-full">
          {/* Text Left */}
          <div className="order-2 md:order-1">
            <span className="text-secondary font-headline font-bold uppercase tracking-widest text-sm mb-4 block">
              {copy.badge}
            </span>
            <h1 className="text-6xl md:text-8xl font-black font-headline leading-tight mb-8">
              {copy.title} <br /> <span className="text-primary-container">{copy.titleAccent}</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant max-w-xl mb-10 leading-relaxed">
              {copy.description}
            </p>
            <div className="flex gap-4">
              <button 
                onClick={togglePlay}
                className="bg-primary-container text-on-primary-container px-8 py-4 rounded-lg font-bold flex items-center gap-2 hover:scale-105 transition-all"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-5 h-5 fill-current" />
                    {copy.pause}
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-current" />
                    {copy.play}
                  </>
                )}
              </button>
              <audio
                ref={audioRef}
                src="/contenido/musica/SOLDADO DE CRISTO BANDA NIÑA MARIA  AUDIO OFICIAL..mp3"
                onEnded={handleAudioEnd}
              />
            </div>
          </div>

          {/* Image Right */}
          <div className="order-1 md:order-2 relative">
            <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl relative z-10">
              <img
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 hover:scale-100"
                src="/contenido/musica/Banda_Pillaro2.png"
                alt={copy.heroAlt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-primary/10 rounded-full blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Bandas de Pueblo Section */}
      <section className="px-8 md:px-20 py-20 bg-surface-container-low">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black font-headline text-on-surface mb-2">{copy.bandsTitle}</h2>
              <p className="text-secondary font-medium italic">{copy.bandsSubtitle}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Featured Band */}
            <div className="md:col-span-2 md:row-span-2 bg-surface-variant/60 backdrop-blur-xl p-8 rounded-xl border border-outline-variant/15 flex flex-col justify-end min-h-[400px] relative overflow-hidden group">
              <img
                className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity"
                src="/contenido/musica/Banda_Pillaro.png"
                alt={language === 'es' ? 'Músicos Tradicionales' : 'Traditional musicians'}
              />
              <div className="relative z-10">
                <span className="bg-secondary text-on-secondary px-3 py-1 text-xs font-bold uppercase rounded mb-4 inline-block">{copy.legendary}</span>
                <h3 className="text-3xl font-bold font-headline mb-3 text-secondary-fixed-dim">{copy.featuredBandTitle}</h3>
                <p className="text-on-surface-variant line-clamp-3">{copy.featuredBandDesc}</p>
              </div>
            </div>

            {/* Rhythm Card */}
            <div className="md:col-span-2 bg-surface-container-high p-8 rounded-xl border border-outline-variant/15 flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <Music className="w-8 h-8 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">{copy.cards[0].title}</h3>
                <p className="text-sm text-neutral-400">{copy.cards[0].desc}</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="md:col-span-2 bg-surface-container-high p-8 rounded-xl border border-outline-variant/15 flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <Music className="w-8 h-8 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">{copy.cards[1].title}</h3>
                <p className="text-sm text-neutral-400">{copy.cards[1].desc}</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-surface-container-high p-8 rounded-xl border border-outline-variant/15 flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <Music className="w-8 h-8 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">{copy.cards[2].title}</h3>
                <p className="text-sm text-neutral-400">{copy.cards[2].desc}</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-surface-container-high p-8 rounded-xl border border-outline-variant/15 flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <Music className="w-8 h-8 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">{copy.cards[3].title}</h3>
                <p className="text-sm text-neutral-400">{copy.cards[3].desc}</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-surface-container-high p-8 rounded-xl border border-outline-variant/15 flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <Music className="w-8 h-8 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">{copy.cards[4].title}</h3>
                <p className="text-sm text-neutral-400">{copy.cards[4].desc}</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-surface-container-high p-8 rounded-xl border border-outline-variant/15 flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <Music className="w-8 h-8 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">{copy.cards[5].title}</h3>
                <p className="text-sm text-neutral-400">{copy.cards[5].desc}</p>
              </div>
            </div>

            <div className="md:col-span-2 bg-surface-container-high p-8 rounded-xl border border-outline-variant/15 flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                <Music className="w-8 h-8 text-on-primary-container" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-headline mb-2 text-primary">{copy.cards[6].title}</h3>
                <p className="text-sm text-neutral-400">{copy.cards[6].desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lyrics & Ritual Section */}
      <section className="px-8 md:px-20 py-32">
        <div className="max-w-4xl mx-auto text-center">
          <Quote className="w-16 h-16 text-primary-container/30 mb-8 mx-auto" />
          <blockquote className="text-3xl md:text-5xl font-black font-headline italic leading-tight mb-12 text-on-surface">
            "{copy.quoteBefore} <span className="text-secondary">{copy.quoteAccent}</span> {copy.quoteAfter}"
          </blockquote>
          <div className="w-24 h-1 bg-primary-container mx-auto mb-12"></div>

          <div className="grid md:grid-cols-2 gap-16 text-left">
            <div className="space-y-4">
              <h4 className="text-xl font-bold font-headline text-secondary">{copy.sectionA}</h4>
              <p className="text-on-surface-variant leading-relaxed">
                {copy.sectionADesc}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-xl font-bold font-headline text-secondary">{copy.sectionB}</h4>
              <p className="text-on-surface-variant leading-relaxed">
                {copy.sectionBDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Rhythm Gallery */}
      <section className="overflow-hidden py-20 bg-neutral-950">
        <div className="flex whitespace-nowrap gap-8 py-10 opacity-20 hover:opacity-100 transition-opacity">
          <span className="text-9xl font-black font-headline uppercase tracking-tighter text-outline-variant whitespace-nowrap">
            {copy.rhythmStrip}
          </span>
        </div>

        <div className="px-8 md:px-20">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {rhythmGallery.map((item, i) => (
              <div
                key={i}
                className={`aspect-square rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 ${
                  item.offset ? 'mt-8' : ''
                }`}
              >
                <img className="w-full h-full object-cover" src={item.img} alt={item.alt} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}