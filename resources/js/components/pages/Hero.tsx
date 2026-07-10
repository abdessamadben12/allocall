/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Hammer, CheckCircle2, DraftingCompass, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { EASE, Stagger, StaggerItem } from '@/components/motion';

const slideContent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.35 } },
};

const slideItem: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

interface HeroSliderProps {
  onDiscoverClick: () => void;
}

export default function Hero({ onDiscoverClick }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "MENUISERIE BOIS & CUISINE MODERNE",
      subtitle: "MENUISERIE SUR MESURE",
      description: "L'excellence du bois, pour des espaces uniques et durables. Des finitions soignées et un style adapté à vos goûts.",
      cta: "Découvrir nos réalisations",
      imageLarge: '/images/hero/alidade-Travaux-de-bois-1.webp', // Modern custom wood kitchen
      imageGrid1: '/images/hero/alidade-Travaux-de-bois-2.webp', // Hand carving / Wood artisan
      imageGrid2: '/images/hero/alidade-Travaux-de-bois-3.webp', // Wooden partition / door
      imageGrid3: '/images/hero/Travaux-demolition-1.webp', // Luxury cabinet / bedroom woodwork
      imageGrid4: '/images/hero/agencement.webp', // Elegant kitchen view
    },
    {
      title: "TRAVAUX DE FINITION & RÉNOVATION",
      subtitle: "CONSTRUCTION ET FINITIONS",
      description: "Donnez vie à vos projets immobiliers grâce à notre expertise globale en rénovation, peinture, plâtrerie et aménagement intérieur.",
      cta: "Estimer mon projet",
      imageLarge: '/images/hero/peinture.webp', // Finished luxury living room
      imageGrid1: '/images/hero/construction.webp', // Construction blueprint
      imageGrid2: '/images/hero/renovation.webp', // Painting / Plaster works
      imageGrid3: '/images/hero/plafond.webp', // Finished false ceiling with lighting
      imageGrid4: '/images/hero/carellage.webp', // Flooring / Wood parquetry installation
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative w-full overflow-hidden bg-alidade-navy">
      {/* Slider viewport */}
      <div className="relative lg:h-[650px] w-full flex items-center">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`w-full flex flex-col lg:flex-row transition-all duration-1000 ease-in-out ${
              index === currentSlide
                ? 'relative opacity-100 translate-x-0 scale-100 z-10 lg:h-full'
                : 'absolute inset-0 h-full opacity-0 translate-x-full scale-95 z-0 pointer-events-none'
            }`}
          >
            {/* Slide Left: Content Panel */}
            <div className="w-full lg:w-[45%] bg-gradient-to-br from-alidade-dark to-alidade-navy text-white p-8 pb-10 sm:p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              {/* Subtle gold decoration background */}
              <div className="absolute top-0 left-0 w-40 h-40 bg-alidade-gold/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-60 h-60 bg-alidade-gold/5 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                className="relative space-y-6"
                variants={slideContent}
                initial="hidden"
                animate={index === currentSlide ? 'visible' : 'hidden'}
              >
                <motion.div variants={slideItem} className="flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-alidade-gold" />
                  <span className="sm:text-xl text-sm tracking-[0.2em] font-bold text-alidade-gold uppercase">
                    {slide.subtitle}
                  </span>
                </motion.div>

                <motion.h1
                  variants={slideItem}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-none text-white font-sans uppercase"
                >
                  {slide.title.split('&')[0]}
                  {slide.title.includes('&') && (
                    <>
                      <span className="block">{slide.title.split('&')[1]}</span>
                    </>
                  )}
                </motion.h1>

                <motion.p variants={slideItem} className="text-sm sm:text-base text-gray-300 max-w-lg leading-relaxed font-light">
                  {slide.description}
                </motion.p>

                <motion.div variants={slideItem} className="pt-4">
                  <motion.button
                    onClick={onDiscoverClick}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                    className="inline-flex items-center gap-2.5 bg-alidade-gold hover:bg-alidade-gold-light text-alidade-dark font-bold text-xs sm:text-sm uppercase tracking-wider py-4 px-8 rounded shadow-xl transition-colors duration-300 hover:shadow-alidade-gold/20"
                    id={`hero-cta-btn-${index}`}
                  >
                    <span>{slide.cta}</span>
                    <ArrowRight size={16} className="text-alidade-dark animate-pulse" />
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>

            {/* Slide Right: Visual Layout exactly matching Screenshot 1 */}
            <div className="w-full lg:w-[55%] h-[350px] lg:h-full relative grid grid-cols-12 gap-1.5 p-1.5 bg-alidade-dark">
              {/* Large central / left split image */}
              <div className="col-span-7 h-full relative group overflow-hidden">
                <img
                  src={slide.imageLarge}
                  alt={slide.title}
                  className="w-full h-full object-cover transition-transform duration-10000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-alidade-dark/60 via-transparent to-transparent opacity-60" />
              </div>

              {/* Grid panel right split exactly as shown in screenshot */}
              <div className="col-span-5 h-full grid grid-rows-2 gap-1.5">
                {/* Row 1 split into 2 horizontal parts */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="relative group overflow-hidden">
                    <img
                      src={slide.imageGrid1}
                      alt="Artisan Craftsmanship"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <div className="relative group overflow-hidden">
                    <img
                      src={slide.imageGrid2}
                      alt="Wood Finish"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                </div>

                {/* Row 2 split into 2 horizontal parts */}
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="relative group overflow-hidden">
                    <img
                      src={slide.imageGrid3}
                      alt="Premium Design"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                  <div className="relative group overflow-hidden">
                    <img
                      src={slide.imageGrid4}
                      alt="Finished Interior"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="hidden sm:block absolute left-4 z-20 bg-alidade-navy/80 hover:bg-alidade-gold text-white hover:text-alidade-navy p-3 rounded-full transition-all duration-300 border border-alidade-gold/30 hover:scale-110"
          aria-label="Previous Slide"
          id="hero-prev-btn"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="hidden sm:block absolute right-4 z-20 bg-alidade-navy/80 hover:bg-alidade-gold text-white hover:text-alidade-navy p-3 rounded-full transition-all duration-300 border border-alidade-gold/30 hover:scale-110"
          aria-label="Next Slide"
          id="hero-next-btn"
        >
          <ChevronRight size={20} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-10 h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-alidade-gold w-14' : 'bg-white/40 hover:bg-white/70'
              }`}
              id={`slide-indicator-${index}`}
            />
          ))}
        </div>
      </div>

      {/* Value Proposition Strip below Hero exactly matching Screenshot 1 */}
      <div className="bg-white py-8 border-b border-gray-100 relative z-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-gray-100">
            {/* Value 1 */}
            <StaggerItem className="flex items-center gap-4 lg:pl-4 first:pl-0 pt-4 sm:pt-0 first:pt-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-alidade-navy flex items-center justify-center shadow-md shrink-0">
                <Hammer className="text-alidade-gold h-5 w-5 lg:h-7 lg:w-7" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-bold tracking-wider text-alidade-navy uppercase">
                  Menuiserie Sur Mesure
                </h3>
                <p className="text-xs lg:text-base text-gray-400 font-light mt-0.5">
                  Bois de qualité <br/>& finitions soignées
                </p>
              </div>
            </StaggerItem>

            {/* Value 2 */}
            <StaggerItem className="flex items-center gap-4 lg:pl-6 pt-4 sm:pt-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-alidade-navy flex items-center justify-center shadow-md shrink-0">
                <DraftingCompass className="text-alidade-gold h-5 w-5 lg:h-7 lg:w-7" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-bold tracking-wider text-alidade-navy uppercase">
                  Cuisines Modernes
                </h3>
                <p className="text-xs lg:text-base text-gray-400 font-light mt-0.5">
                  Design fonctionnel <br/> & élégant
                </p>
              </div>
            </StaggerItem>

            {/* Value 3 */}
            <StaggerItem className="flex items-center gap-4 lg:pl-6 pt-4 lg:pt-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-alidade-navy flex items-center justify-center shadow-md shrink-0">
                <CheckCircle2 className="text-alidade-gold h-5 w-5 lg:h-7 lg:w-7" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-bold tracking-wider text-alidade-navy uppercase">
                  Savoir-Faire Artisanal
                </h3>
                <p className="text-xs lg:text-base text-gray-400 font-light mt-0.5">
                  Expertise <br/> & précision d'orfèvre
                </p>
              </div>
            </StaggerItem>

            {/* Value 4 */}
            <StaggerItem className="flex items-center gap-4 lg:pl-6 pt-4 lg:pt-0">
              <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-alidade-navy flex items-center justify-center shadow-md shrink-0">
                <ShieldCheck className="text-alidade-gold h-5 w-5 lg:h-7 lg:w-7" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm lg:text-lg font-bold tracking-wider text-alidade-navy uppercase">
                  Durabilité & Fiabilité
                </h3>
                <p className="text-xs lg:text-base text-gray-400 font-light mt-0.5">
                  Des réalisations <br/> faites pour durer
                </p>
              </div>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </div>
  );
}
