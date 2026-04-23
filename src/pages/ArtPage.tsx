import React, { useEffect, useMemo, useState } from 'react';
import { ChevronDown, Facebook, Hammer, Instagram, Layers, Link as LinkIcon, Mail, MessageCircle, Music2, Palette, Phone, X, Youtube } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ART_EDITOR_UPDATED_EVENT,
  fetchArtEditorContent,
  getLocalizedArtGeneral,
  getLocalizedArtisan,
  getLocalizedProcessCard,
  readArtEditorContent,
  type ArtArtisan,
  type ArtContact,
  type ArtEditorContent,
  type ArtProcessCard,
} from '@/lib/artEditorContent';

export default function ArtPage() {
  const [expandedArtisan, setExpandedArtisan] = useState<string | null>(null);
  const [content, setContent] = useState<ArtEditorContent>(() => readArtEditorContent());
  const { language } = useLanguage();

  useEffect(() => {
    let isMounted = true;

    const syncArtContent = async () => {
      const nextContent = await fetchArtEditorContent();
      if (isMounted) {
        setContent(nextContent);
      }
    };

    syncArtContent();
    window.addEventListener(ART_EDITOR_UPDATED_EVENT, syncArtContent);

    return () => {
      isMounted = false;
      window.removeEventListener(ART_EDITOR_UPDATED_EVENT, syncArtContent);
    };
  }, []);

  const toggleArtisan = (artisanId: string) => {
    setExpandedArtisan((currentValue) => currentValue === artisanId ? null : artisanId);
  };

  const general = content.general;
  const copy = getLocalizedArtGeneral(content.general, language);

  const artisans = useMemo(() => {
    return content.artisans.map((artisan) => getLocalizedArtisan(artisan, language));
  }, [content.artisans, language]);

  const processCards = useMemo(() => {
    return content.processCards.map((card) => getLocalizedProcessCard(card, language));
  }, [content.processCards, language]);

  const heroAlignmentClass = general.heroAlignment === 'left' ? 'items-start text-left' : 'items-center text-center';
  const imageEffectClass = general.imageEffect === 'grayscale' ? 'grayscale hover:grayscale-0' : '';

  function getThemeClasses(theme: ArtArtisan['theme']) {
    return theme === 'secondary'
      ? { border: 'border-secondary', accent: 'text-secondary' }
      : { border: 'border-primary', accent: 'text-primary-fixed' };
  }

  function renderContactIcon(contact: ArtContact) {
    if (contact.kind === 'phone') {
      return <Phone className="h-5 w-5" />;
    }

    if (contact.kind === 'mail') {
      return <Mail className="h-5 w-5 flex-shrink-0" />;
    }

    if (contact.kind === 'music') {
      return <Music2 className="h-5 w-5" />;
    }

    return <LinkIcon className="h-5 w-5" />;
  }

  function detectSocialPlatform(contact: ArtContact) {
    const source = `${contact.label} ${contact.href} ${contact.value}`.toLowerCase();

    if (source.includes('instagram') || source.includes('instagra')) {
      return 'instagram';
    }

    if (source.includes('facebook') || source.includes('facebok') || source.includes('fb.com')) {
      return 'facebook';
    }

    if (source.includes('youtube') || source.includes('youtu.be')) {
      return 'youtube';
    }

    if (source.includes('whatsapp') || source.includes('wa.me') || source.includes('api.whatsapp.com')) {
      return 'whatsapp';
    }

    if (source.includes('tiktok')) {
      return 'tiktok';
    }

    return 'generic';
  }

  function renderSocialIcon(contact: ArtContact) {
    const platform = detectSocialPlatform(contact);

    if (platform === 'instagram') {
      return <Instagram className="h-4 w-4" />;
    }

    if (platform === 'facebook') {
      return <Facebook className="h-4 w-4" />;
    }

    if (platform === 'youtube') {
      return <Youtube className="h-4 w-4" />;
    }

    if (platform === 'whatsapp') {
      return <MessageCircle className="h-4 w-4" />;
    }

    if (platform === 'tiktok') {
      return <Music2 className="h-4 w-4" />;
    }

    return <LinkIcon className="h-4 w-4" />;
  }

  function getSocialHeading(contacts: ArtContact[]) {
    if (contacts.length !== 1) {
      return language === 'en' ? 'Follow on social media' : 'Síguelo en redes sociales';
    }

    const platform = detectSocialPlatform(contacts[0]);

    if (platform === 'instagram') {
      return language === 'en' ? 'Follow on Instagram' : 'Síguelo en Instagram';
    }

    if (platform === 'facebook') {
      return language === 'en' ? 'Find on Facebook' : 'Encuéntralo en Facebook';
    }

    if (platform === 'tiktok') {
      return language === 'en' ? 'Watch on TikTok' : 'Míralo en TikTok';
    }

    if (platform === 'youtube') {
      return language === 'en' ? 'Watch on YouTube' : 'Míralo en YouTube';
    }

    if (platform === 'whatsapp') {
      return language === 'en' ? 'Contact on WhatsApp' : 'Contáctalo por WhatsApp';
    }

    return copy.follow;
  }

  function getProcessCardClasses(card: ArtProcessCard, index: number) {
    const layoutClass = index === 0 || index === processCards.length - 1 ? 'md:col-span-2' : '';

    if (card.theme === 'primary') {
      return `${layoutClass} bg-primary-container text-on-primary-container`;
    }

    if (card.theme === 'secondary') {
      return `${layoutClass} bg-secondary text-on-secondary`;
    }

    if (card.theme === 'outlined') {
      return `${layoutClass} bg-surface-container-high border border-outline-variant/20 text-on-surface`;
    }

    return `${layoutClass} bg-surface-container-low text-on-surface`;
  }

  return (
    <div className="w-full pt-20">
      <section className="px-8 mb-32 flex items-center justify-center min-h-[500px] bg-gradient-to-b from-surface-container-low to-surface">
        <div className={`flex max-w-4xl flex-col ${heroAlignmentClass}`}>
          <span className="inline-block px-6 py-2 mb-8 text-secondary font-bold tracking-[0.2em] uppercase bg-secondary/10 backdrop-blur-sm rounded-full text-xs border border-secondary/20">
            {copy.badge}
          </span>
          
          <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8 leading-none ${general.headlineFontClass}`}>
            {copy.title} <br/><span className="text-primary-container italic">{copy.titleAccent}</span>
          </h1>
          
          <p className={`text-lg md:text-2xl text-on-surface-variant max-w-3xl leading-relaxed font-light mb-6 ${general.bodyFontClass} ${general.heroAlignment === 'center' ? 'mx-auto' : ''}`}>
            {copy.description}
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-12"></div>
        </div>
      </section>

      <section className="px-8 space-y-16 max-w-screen-2xl mx-auto mb-40">
        {artisans.map((artisan, i) => {
          const themeClasses = getThemeClasses(artisan.theme);
          const imageClasses = `w-full h-full object-cover transition-all duration-700 ${imageEffectClass}`;
          const primaryContacts = artisan.contacts.filter((contact) => contact.kind === 'phone' || contact.kind === 'mail');
          const socialContacts = artisan.contacts.filter((contact) => contact.kind === 'music' || contact.kind === 'link');

          return (
          <div 
            key={artisan.id}
            className={`transition-all duration-500 ${
              expandedArtisan === artisan.id 
                ? 'bg-surface-container-low p-0 rounded-2xl overflow-hidden' 
                : 'bg-transparent'
            }`}
          >
            {expandedArtisan !== artisan.id ? (
              <div className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>
                <div className="w-full md:w-1/2 aspect-[4/5] rounded-xl overflow-hidden bg-surface-container-low">
                  <img 
                    className={imageClasses}
                    src={artisan.img}
                    alt={artisan.name}
                  />
                </div>
                
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  <span className="text-secondary font-bold tracking-widest uppercase mb-4 text-sm font-body">
                    {artisan.title}
                  </span>
                  <h2 className={`text-4xl md:text-6xl font-black mb-6 ${general.headlineFontClass}`}>
                    {artisan.name}
                  </h2>
                  
                  <div className={`bg-surface-container-low p-8 rounded-xl border-l-4 ${themeClasses.border}`}>
                    <h3 className={`text-xl font-bold mb-3 ${themeClasses.accent}`}>
                      {copy.techniqueLabel}: {artisan.technique}
                    </h3>
                    <p className={`text-on-surface-variant leading-relaxed mb-6 ${general.bodyFontClass}`}>
                      {artisan.desc}
                    </p>
                    
                    <button 
                      onClick={() => toggleArtisan(artisan.id)}
                      className="flex items-center gap-2 text-secondary font-bold hover:gap-3 transition-all group"
                    >
                      {copy.exploreMask}
                      <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Expanded View */
              <div className="p-0">
                {/* Close Button */}
                <div className="flex justify-end p-6 bg-surface-container-high border-b border-outline-variant/20">
                  <button
                    onClick={() => toggleArtisan(artisan.id)}
                    className="p-2 hover:bg-surface-container rounded-full transition-colors"
                  >
                    <X className="w-6 h-6 text-on-surface" />
                  </button>
                </div>

                <div className="p-8 md:p-12">
                  <div className="text-center mb-12">
                    <span className="inline-block text-secondary font-bold tracking-widest uppercase mb-4 text-sm font-body">
                      {artisan.title}
                    </span>
                    <h2 className={`text-5xl md:text-7xl font-black mb-2 ${general.headlineFontClass}`}>
                      {artisan.name}
                    </h2>
                    <p className={`text-lg font-bold ${themeClasses.accent}`}>
                      {artisan.technique}
                    </p>
                  </div>

                  <div className="mx-auto mb-12 w-full md:w-2/3 aspect-[4/5] rounded-xl overflow-hidden">
                    <img 
                      className="w-full h-full object-cover" 
                      src={artisan.img}
                      alt={artisan.name}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="md:col-span-2">
                      <h3 className={`text-2xl font-black mb-4 ${general.headlineFontClass}`}>{copy.biography}</h3>
                      <div className={`space-y-4 text-on-surface-variant leading-relaxed text-lg ${general.bodyFontClass}`}>
                        {artisan.fullInfo.split('\n\n').filter(Boolean).map((paragraph, index) => (
                          <p key={`${artisan.id}-bio-${index}`}>{paragraph}</p>
                        ))}
                      </div>
                    </div>

                    <div className="bg-surface-container-high p-8 rounded-xl border border-outline-variant/20">
                      <h3 className={`text-xl font-black mb-6 ${general.headlineFontClass}`}>{copy.contact}</h3>
                      <div className="space-y-3">
                        {primaryContacts.map((contact) => (
                          <a key={contact.id} href={contact.href || '#'} className="flex items-start gap-3 rounded-2xl border border-outline-variant/20 bg-surface px-4 py-4 text-on-surface hover:border-secondary/40 hover:bg-surface-container transition-colors break-all">
                            <span className="mt-0.5 text-secondary">{renderContactIcon(contact)}</span>
                            <span className="min-w-0">
                              <span className="block text-[11px] font-black uppercase tracking-[0.22em] text-on-surface-variant">{contact.label}</span>
                              <span className="mt-1 block text-sm font-bold">{contact.value}</span>
                            </span>
                          </a>
                        ))}
                        {primaryContacts.length === 0 && socialContacts.length === 0 && (
                          <div className="rounded-2xl border border-dashed border-outline-variant/20 px-4 py-5 text-sm text-on-surface-variant">
                            Este artesano todavía no tiene contactos publicados.
                          </div>
                        )}
                      </div>
                      {socialContacts.length > 0 && (
                        <div className="mt-6 pt-6 border-t border-outline-variant/20">
                          <p className="text-on-surface-variant text-sm mb-3">{getSocialHeading(socialContacts)}</p>
                          <div className="flex flex-wrap gap-3">
                            {socialContacts.map((contact) => (
                              <a key={`${artisan.id}-${contact.id}`} href={contact.href || '#'} className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-4 py-2 text-sm font-bold text-secondary hover:bg-secondary/20">
                                {renderSocialIcon(contact)}
                                <span>{contact.label}</span>
                                <span className="opacity-70">/</span>
                                <span>{contact.value}</span>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className={`text-2xl font-black mb-6 ${general.headlineFontClass}`}>{copy.galleryTitle}</h3>
                    
                    <div className="hidden md:grid md:grid-cols-3 gap-6 mb-8">
                      {artisan.gallery.map((img, idx) => (
                        <div key={idx} className="aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low hover:ring-2 ring-secondary transition-all cursor-pointer group">
                          <img 
                            src={img}
                            alt={`${copy.creationAlt} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>

                    <div className="md:hidden grid grid-cols-1 gap-6">
                      {artisan.gallery.map((img, idx) => (
                        <div key={idx} className="aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low hover:ring-2 ring-secondary transition-all cursor-pointer group">
                          <img 
                            src={img}
                            alt={`${copy.creationAlt} ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {artisan.video && (
                    <div className="mb-12 p-0 bg-surface-container-high rounded-xl border border-outline-variant/20 overflow-hidden">
                      <h3 className={`text-2xl font-black mb-6 text-center px-8 pt-8 ${general.headlineFontClass}`}>{copy.watchWork}</h3>
                      <div className="flex justify-center pb-8 px-8">
                        <video
                          width="100%"
                          height="auto"
                          controls
                          autoPlay
                          muted
                          loop
                          className="rounded-lg w-full max-w-md"
                        >
                          <source src={artisan.video} type="video/mp4" />
                          {copy.videoFallback}
                        </video>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )})}
      </section>

      <section className="px-8 max-w-screen-2xl mx-auto mb-40">
        <h2 className={`text-5xl font-black mb-12 text-center ${general.headlineFontClass}`}>{copy.processTitle}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
          {processCards.map((card, index) => (
            <div key={card.id} className={`p-10 rounded-xl flex flex-col justify-between relative overflow-hidden group ${getProcessCardClasses(card, index)}`}>
              <div className="relative z-10">
                <h3 className={`text-3xl font-black mb-4 ${general.headlineFontClass}`}>{card.title}</h3>
                <p className={`${card.theme === 'primary' ? 'text-on-primary-container/80' : card.theme === 'secondary' ? 'text-on-secondary/80' : 'text-on-surface-variant'} ${general.bodyFontClass}`}>
                  {card.text}
                </p>
              </div>
              <div className="mt-8 flex items-center justify-between">
                {card.id === 'layers' ? <Layers className="w-10 h-10" /> : card.id === 'horns' ? <Hammer className="w-10 h-10" /> : <Palette className="w-10 h-10" />}
                {card.id === 'color' && (
                  <div className="flex gap-2">
                    <div className="w-12 h-12 rounded-full bg-red-800"></div>
                    <div className="w-12 h-12 rounded-full bg-red-600"></div>
                    <div className="w-12 h-12 rounded-full bg-yellow-500"></div>
                    <div className="w-12 h-12 rounded-full bg-black border border-white/10"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-8 text-center max-w-4xl mx-auto mb-40">
        <div className="bg-surface-variant/40 p-16 rounded-xl backdrop-blur-md">
          <h2 className={`text-4xl font-black mb-6 italic ${general.headlineFontClass}`}>
            "{copy.closingQuote}"
          </h2>
          <button className="bg-primary-container text-on-primary-container px-10 py-4 rounded-lg font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-primary/20">
            {copy.closingButton}
          </button>
        </div>
      </section>
    </div>
  );
}
