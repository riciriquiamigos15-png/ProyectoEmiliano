import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  MapPin, 
  AlertTriangle,
  Users,
  Umbrella,
  Download
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const carouselStyles = `
  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(1.02);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes fadeOutScale {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.98);
    }
  }

  @keyframes dotPulse {
    0%, 100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(255, 215, 0, 0.7);
    }
    50% {
      transform: scale(1.1);
    }
  }

  .carousel-image-enter {
    animation: fadeInScale 1.5s ease-out forwards;
  }

  .carousel-image-exit {
    animation: fadeOutScale 1.5s ease-out forwards;
  }

  .carousel-dot-active {
    animation: dotPulse 1s ease-in-out infinite;
  }
`;

export default function InfoPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { language } = useLanguage();

  const carouselImages = [
    '/contenido/informacion/Danza_1.jpg',
    '/contenido/informacion/Danza_2.jpg',
    '/contenido/informacion/Danza_3.jpg',
    '/contenido/informacion/Danza_4.jpg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 30000); // Cambiar cada 30 segundos

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const copy = {
    es: {
      heroAlt: 'Prepárate para la Danza',
      imageLabel: 'Imagen',
      heroBadge: 'Guía Oficial del Turista',
      heroTitle: 'Prepárate para la Danza',
      heroDescription: 'Todo lo que necesitas saber para vivir la experiencia más vibrante de los Andes ecuatorianos del 1 al 6 de enero.',
      calendarTitle: 'Calendario y Horarios',
      dateRange: '1 al 6 de Enero',
      dateDescription: 'Las festividades se celebran ininterrumpidamente durante los primeros seis días del año en el cantón Píllaro.',
      schedule: [
        { label: 'Inicio de Comparsas', time: '10:00 AM' },
        { label: 'Punto Máximo', time: '15:00 PM' },
        { label: 'Cierre de Jornada', time: '20:00 PM' },
      ],
      routesTitle: 'Rutas',
      routesDescription: 'Los desfiles recorren las calles céntricas de Píllaro, partiendo desde los barrios tradicionales hacia la Plaza Central.',
      mapAlt: 'Mapa de Píllaro',
      mapButton: 'Ver Mapa Interactivo',
      recommendationsTitle: 'Recomendaciones de Seguridad',
      gastronomyTitle: 'Gastronomía Típica',
      firstTimeTitle: '¿Primera vez en la Diablada?',
      firstTimeDescription: 'Llega temprano para asegurar un buen lugar cerca de la Plaza Central. Los mejores asientos suelen ocuparse antes de las 9:00 AM.',
      downloadGuide: 'Descargar Guía PDF',
      securityRecommendations: [
        { title: 'Cuidado con las Máscaras', desc: 'No intente tocar o quitar las máscaras a los danzantes; es una falta de respeto y puede ser peligroso por la estructura de las mismas.' },
        { title: 'Zonas de Aglomeración', desc: 'Mantenga sus pertenencias al frente. Las calles principales suelen estar muy congestionadas entre las 14:00 y las 17:00.' },
        { title: 'Clima Variable', desc: 'Píllaro puede tener cambios bruscos de temperatura. Use protector solar y lleve siempre una prenda impermeable.' },
      ],
      food: [
        { category: 'Plato Estrella' },
        { category: 'Energía para el Baile' },
        { category: 'Bebida Tradicional' },
        { category: 'Sabor Local' },
      ],
    },
    en: {
      heroAlt: 'Get ready for the dance',
      imageLabel: 'Image',
      heroBadge: 'Official Visitor Guide',
      heroTitle: 'Get Ready for the Dance',
      heroDescription: 'Everything you need to know to experience the most vibrant celebration of the Ecuadorian Andes from January 1 to January 6.',
      calendarTitle: 'Calendar and Schedule',
      dateRange: 'January 1 to 6',
      dateDescription: 'The festivities take place continuously during the first six days of the year in the canton of Píllaro.',
      schedule: [
        { label: 'Troupes Begin', time: '10:00 AM' },
        { label: 'Peak Moment', time: '3:00 PM' },
        { label: 'Day Closing', time: '8:00 PM' },
      ],
      routesTitle: 'Routes',
      routesDescription: 'The parades move through the central streets of Píllaro, starting in traditional neighborhoods and heading toward the Main Square.',
      mapAlt: 'Map of Píllaro',
      mapButton: 'View Interactive Map',
      recommendationsTitle: 'Safety Recommendations',
      gastronomyTitle: 'Traditional Gastronomy',
      firstTimeTitle: 'First time at the Diablada?',
      firstTimeDescription: 'Arrive early to secure a good spot near the Main Square. The best viewing spaces are usually taken before 9:00 AM.',
      downloadGuide: 'Download PDF Guide',
      securityRecommendations: [
        { title: 'Be Careful with the Masks', desc: 'Do not try to touch or remove the dancers’ masks; it is disrespectful and can also be dangerous due to their structure.' },
        { title: 'Crowded Areas', desc: 'Keep your belongings in front of you. Main streets are usually heavily congested between 2:00 PM and 5:00 PM.' },
        { title: 'Changing Weather', desc: 'Píllaro can experience sudden temperature changes. Use sunscreen and always carry waterproof clothing.' },
      ],
      food: [
        { category: 'Signature Dish' },
        { category: 'Energy for Dancing' },
        { category: 'Traditional Drink' },
        { category: 'Local Flavor' },
      ],
    },
  }[language];

  const securityRecommendations = [
    { 
      title: copy.securityRecommendations[0].title, 
      desc: copy.securityRecommendations[0].desc,
      icon: AlertTriangle
    },
    { 
      title: copy.securityRecommendations[1].title, 
      desc: copy.securityRecommendations[1].desc,
      icon: Users
    },
    { 
      title: copy.securityRecommendations[2].title, 
      desc: copy.securityRecommendations[2].desc,
      icon: Umbrella
    },
  ];

  const food = [
    { name: 'Cuy Asado', category: copy.food[0].category, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIhJtnvxM_jAfeOpA5-6ZW0L1F3AZD71GBWiHMujH2QFlNyy4jIp-CwrQCtaDkMXqQiEWC6h1aSAE219fY9t2tCSERo-tx7kgP2IC_xD38JzzWTyJxrK586FJIzXjtseY0AjE_IhOMc8xQl7ETfmK4w0ePvlCKNbtpQsFzZ9yM33u5QmNYNdaUPCNjuiKXU478nOD4Sro_J1KGhtJCilUy35ELlswwD6GY-DOJSosyXds-rRvbHonAmbkWEK3__vjIOe5-1KDlXOs' },
    { name: 'Caldo de Gallina', category: copy.food[1].category, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaxZ5de-cJ9C0qZ1JqCEh-er5R_0DiHOPSoeoQIp3VexpQyBPm63o_wSjEwXBp_YeQOmy-n9L0cjWlKhCJQPtpBwrvQnrtMAAfXJg4Js-eiTMJFz0V3ScY8MIqdQgjI3cwnlh2H52CquLFnQfKsBjdYikcWc2qxUqF76i0T72yDjZYhr1NCQR0bA51tn_R5Ctr1OQkQscRDPvEt2D8ctSHxrERd-gLMb3XNFoMQ9tZBQ2o5_i9uxCmj-SsWr1sWgzl8_hIr72gtiU' },
    { name: 'Puntas con Infusión', category: copy.food[2].category, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMHATfiqU5HQm6Q79OFG1FluiBNsNNMInOaUGsosqOPJa_JLkRiT-QRYGiNct0_hMtgLHqQxPSRgW7Yq6RxLbvkZOn-MMKSzH_ofHijewi5vfxp93rSPWVCfZa9OyMe0oirWqvTnMflQs-_ywogz-cZP2AHdDRrJTydP5OjDEcKUPkE7zMIFhdYrZ_CVwqMDXBhmKSr1hlgwbURUxEJhwFCC9UYKzVHAh9-JC0fhFNqxFstG7eSxCvnCnAVeyZs-akBwCW3dkOXE0' },
    { name: 'Fritada Pillareña', category: copy.food[3].category, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6asWz5yq-YpYMbGE-Ew7bH8DN0X5e99OiVh2gOj-wszBz3jG1QKT2v4aGt6sMJWXEedzhx-HIrZ9ltxlWd_p8t1adwquY_uKc3HFdMvrbXaPwDqRGOJf1drfE4eRJ7U19s8L9pCj90a15-k2g6rt0dFCHbx_xTgu2-M4zHohIuZ1XboaYMGGPIDW3MVJWFWro3QWM8srZO53vhXPkl-BCOaf0aJCs5B8Z1udh9oZ8PDK6Bv_w2Z0AF7CKntAWsGHJ9yPaVlk7K6I' },
  ];

  return (
    <div className="w-full pt-20 pb-20">
      <style>{carouselStyles}</style>
      {/* Hero Section */}
      <section className="px-8 mb-16 max-w-screen-2xl mx-auto">
        <div className="relative h-[614px] rounded-xl overflow-hidden flex items-end p-12">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent z-10"></div>
          <img 
            key={currentImageIndex}
            className="absolute inset-0 w-full h-full object-cover carousel-image-enter" 
            src={carouselImages[currentImageIndex]}
            alt={copy.heroAlt}
          />
          {/* Indicadores del Carrusel */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-secondary w-8 h-2 carousel-dot-active' 
                    : 'bg-white/50 hover:bg-white/80 w-2 h-2'
                }`}
                aria-label={`${copy.imageLabel} ${index + 1}`}
              />
            ))}
          </div>
          <div className="relative z-20 max-w-2xl">
            <span className="inline-block bg-secondary text-on-secondary px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-4">{copy.heroBadge}</span>
            <h1 className="text-5xl md:text-7xl font-black font-headline tracking-tighter text-on-surface mb-4">{copy.heroTitle}</h1>
            <p className="text-lg text-on-surface-variant max-w-xl leading-relaxed">{copy.heroDescription}</p>
          </div>
        </div>
      </section>

      {/* Key Info Bento Grid */}
      <section className="px-8 mb-24 max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dates & Times */}
          <div className="md:col-span-2 bg-surface-container-low p-8 rounded-xl border-l-4 border-primary">
            <div className="flex items-center gap-3 mb-6">
              <Calendar className="text-primary w-8 h-8" />
              <h2 className="text-2xl font-bold tracking-tight">{copy.calendarTitle}</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-secondary font-bold text-lg mb-2">{copy.dateRange}</p>
                <p className="text-on-surface-variant text-sm leading-relaxed">{copy.dateDescription}</p>
              </div>
              <div className="space-y-4">
                {copy.schedule.map((item) => (
                  <div key={item.label} className="flex justify-between items-center border-b border-outline-variant/30 pb-2">
                    <span className="text-on-surface">{item.label}</span>
                    <span className="font-bold text-on-surface">{item.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Location/Map Mini */}
          <div className="bg-surface-container-high p-8 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-secondary w-8 h-8" />
                <h2 className="text-2xl font-bold tracking-tight">{copy.routesTitle}</h2>
              </div>
              <p className="text-on-surface-variant text-sm mb-6">{copy.routesDescription}</p>
            </div>
            <div className="h-32 bg-surface-variant rounded-lg relative overflow-hidden group cursor-pointer">
              <img 
                className="w-full h-full object-cover grayscale opacity-50" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDClvgBNu3CnvHyntrVA8b43rrBF7NyB80cCD_etSASrT8BggdqRmRAZ3ordJpYR_B5IqwOo-_U_B5-8atB9bqY9sKMLcBH60k5Z9MM5kURBUI7WgyiKpP_BIfBPSm_7LGgS7MiaL2rUZ_YYMECunXLAF0cFPJ-a3MR23cmo0z4aYsnKLUeaJLGOBqA1cKRbfaNfjk129WXFrsiM6pCHvzeKZXax4h3wdZOv10a5O5jJzYmlXh-7Xw8QdnDNk02tCHHTvczaNEjEEY"
                alt={copy.mapAlt}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="bg-primary/90 text-on-primary text-xs font-bold px-3 py-1 rounded-full">{copy.mapButton}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Categories */}
      <section className="px-8 mb-24 max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Recommendations */}
        <div>
          <h3 className="text-3xl font-black mb-8 border-b-2 border-primary-container inline-block pb-2">{copy.recommendationsTitle}</h3>
          <div className="space-y-6">
            {securityRecommendations.map((rec) => {
              const IconComponent = rec.icon;
              return (
                <div key={rec.title} className="flex gap-4 items-start">
                  <div className="w-12 h-12 bg-surface-container-highest rounded-full flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-on-surface">{rec.title}</h4>
                    <p className="text-on-surface-variant text-sm">{rec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gastronomy */}
        <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/10">
          <h3 className="text-3xl font-black mb-8 text-secondary">{copy.gastronomyTitle}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {food.map((item) => (
              <div key={item.name} className="group cursor-pointer">
                <div className="h-40 overflow-hidden rounded-xl mb-3">
                  <img 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                    src={item.img}
                    alt={item.name}
                  />
                </div>
                <h4 className="font-bold text-on-surface">{item.name}</h4>
                <p className="text-xs text-on-surface-variant uppercase tracking-widest">{item.category}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Banner */}
      <section className="px-8 max-w-screen-2xl mx-auto">
        <div className="bg-primary-container p-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20"></div>
          <div className="relative z-10 max-w-xl">
            <h2 className="text-4xl font-black text-on-primary-container mb-4 tracking-tighter">{copy.firstTimeTitle}</h2>
            <p className="text-on-primary-container/80 font-medium">{copy.firstTimeDescription}</p>
          </div>
          <button className="relative z-10 bg-on-primary-container text-primary-container px-8 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:scale-105 transition-all flex items-center gap-2">
            <Download className="w-5 h-5" />
            {copy.downloadGuide}
          </button>
        </div>
      </section>
    </div>
  );
}
