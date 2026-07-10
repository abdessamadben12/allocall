import React from 'react';
import { User, Home, Award, ChevronRight, ShieldCheck, Users, Clock, Headset } from 'lucide-react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';


// --- Types ---
interface ServiceCardProps {
  number: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  subDescription: string;
  color: 'amber' | 'teal' | 'purple';
  bgImage?: string;
  path:string;
}

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

// --- Composants Internes ---

const ServiceCard: React.FC<ServiceCardProps> = ({ number, title, icon, description, subDescription, color, bgImage,path }) => {
  const colorVariants = {
    amber: "border-alidade-gold text-[#5d5f5e] bg-[#0d1a2d]",
    teal: "border-alidade-gold text-[#5d5f5e] bg-[#0d1a2d]",
    purple: "border-alidade-gold text-[#5d5f5e] bg-[#0d1a2d]",
  };

  
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className={`relative flex flex-col h-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-b-[12px] ${colorVariants[color].split(' ')[0]}`}
    >
      {/* Header de la carte */}
      <div className="p-8 flex justify-between items-start z-10">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-alidade-gold shadow-lg ${colorVariants[color].split(' ')[2]}`}>
          {icon}
        </div>
        <span className={`text-4xl font-serif opacity-30 font-bold ${colorVariants[color].split(' ')[1]}`}>
          {number}
        </span>
      </div>

      {/* Zone Image/Illustration (Simulée avec un overlay) */}
      <div className="absolute top-0 right-0 w-full h-48 opacity-10 pointer-events-none">
         {bgImage ? (
           <img src={bgImage} alt="" className="w-full h-full object-cover" />
         ) : (
           <div className="w-full h-full bg-gradient-to-br from-transparent to-current opacity-20"></div>
         )}
      </div>

      {/* Contenu */}
      <div className="px-8 pb-20 flex-grow">
        <h3 className="text-2xl font-serif text-slate-800 mb-2 leading-tight">
          {title}
        </h3>
        <div className={`w-12 h-[3px] mb-6 ${colorVariants[color].split(' ')[2]}`}></div>
        
        <p className="text-slate-800 font-semibold text-sm leading-relaxed mb-4">
          {description}
        </p>
        <p className="text-slate-500 text-xs leading-relaxed italic">
          {subDescription}
        </p>
      </div>

      {/* Bouton Flèche */}
      <div className="absolute bottom-6 right-8">
        <Link  href={path} className={`w-12 h-12 bg-white border border-slate-100 rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform ${colorVariants[color].split(' ')[1]}`}>
          <ChevronRight size={24} />
        </Link>
      </div>
    </motion.div>
  );
};

const FeatureItem: React.FC<FeatureProps> = ({ icon, title, subtitle }) => (
  <div className="flex items-center gap-4 min-w-0 flex-1 basis-[200px]">
    <div className="w-14 h-14 lg:w-16 lg:h-16 shrink-0 rounded-full flex items-center justify-center bg-alidade-navy text-alidade-gold shadow-md">
      {icon}
    </div>
    <div className="min-w-0">
      <h4 className="font-bold text-alidade-navy text-sm lg:text-base uppercase tracking-wider">{title}</h4>
      <p className="text-xs lg:text-sm text-gray-400 font-light mt-0.5 text-nowrap">{subtitle}</p>
    </div>
  </div>
);

// --- Composant Principal ---

export const EngagementSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <Reveal className="text-center mb-16">
          <h2 className="text-alidade-navy serif-display text-3xl font-bold uppercase sm:text-4xl">
            Un partenaire de confiance à chaque étape
          </h2>
        </Reveal>

        {/* Grille de Cartes */}
        <Stagger stagger={0.15} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <StaggerItem className="h-full">
          <ServiceCard
            number="01"
            title="Qui Sommes Nous"
            icon={<User size={28} />}
            color="amber"
            description="Besoin d'une solution clé en main avec un interlocuteur unique pour réaliser vos travaux de rénovation, de construction..."
            subDescription="Alidade, contractant général au Maroc, prend en charge vos travaux second œuvre, la rénovation, la réhabilitation et l'agencement d'appartements."
            path='/apropos'
          />
          </StaggerItem>

          <StaggerItem className="h-full">
          <ServiceCard
            number="02"
            title="Atelier Finition"
            icon={<Home size={28} />}
            color="teal"
            description="Nous accordons une attention toute particulière au choix et à la qualité des finitions. Notre parc machine et nos artisans qualifiés."
            subDescription="Des équipements tels que l'atelier de thermoformage, les cabines de vernissage et les chambres de séchage autorisent tout type de finition haute qualité."
            path='/apropos'
          />
          </StaggerItem>

          <StaggerItem className="h-full">
          <ServiceCard
            number="03"
            title="Le Second Oeuvre Chez ALIDADE"
            icon={<Award size={28} />}
            color="purple"
            description="Votre projet d'agencement ou d'aménagement de votre structure de point de vente, devient le nôtre et Alidade y apporte tout le sérieux."
            subDescription="Toutes nos équipes sont choisies avec soin et nous les encadrons avec exigence pour respecter vos délais. Alidade est votre interlocuteur unique."
            path="/savoir-faire"
          />
          </StaggerItem>
        </Stagger>

        {/* Barre de réassurance (Footer bar) */}
        <Reveal className="bg-white rounded-[2rem] shadow-xl p-8 flex flex-wrap justify-between items-center gap-8 border border-slate-50">
          <FeatureItem
            icon={<ShieldCheck className="h-6 w-6 lg:h-7 lg:w-7" />}
            title="Qualité Garantie"
            subtitle="Matériaux haut de gamme"
          />
          <FeatureItem
            icon={<Users className="h-6 w-6 lg:h-7 lg:w-7" />}
            title="Équipe Expérimentée"
            subtitle="Experts qualifiés & passionnés"
          />
          <FeatureItem
            icon={<Clock className="h-6 w-6 lg:h-7 lg:w-7" />}
            title="Respect des Délais"
            subtitle="Engagement et suivi rigoureux"
          />
          <FeatureItem
            icon={<Headset className="h-6 w-6 lg:h-7 lg:w-7" />}
            title="Accompagnement"
            subtitle="Conseil et support à chaque étape"
          />
        </Reveal>

      </div>
    </section>
  );
};

export default EngagementSection;