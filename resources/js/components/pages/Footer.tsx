import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { site } from '@/data/site';
import { footerHeroImage, logoImage } from '@/image';
import { motion } from 'framer-motion';
import { Award, Facebook, Handshake, Instagram, Linkedin, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import React from 'react';

const socialLinks = [
    { href: site.socials.facebook, icon: <Facebook size={18} />, label: 'Facebook' },
    { href: site.socials.instagram, icon: <Instagram size={18} />, label: 'Instagram' },
    { href: site.socials.linkedin, icon: <Linkedin size={18} />, label: 'LinkedIn' },
].filter((s) => s.href);

const Footer: React.FC = () => {
    return (
        <footer className="bg-alidade-dark overflow-hidden text-white">
            {/* SECTION PRINCIPALE */}
            <div className="flex flex-col items-stretch lg:flex-row">
                {/* 1. Image avec découpe oblique (Clip-path) */}
                <div className="relative hidden overflow-hidden lg:block lg:w-1/4">
                    <img
                        src={footerHeroImage}
                        alt=""
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 75% 100%, 0 100%)' }}
                        loading="lazy"
                        decoding="async"
                    />
                </div>

                {/* 2. Bloc Logo et Description */}
                <Reveal className="flex w-full flex-col justify-center p-8 lg:w-1/3 lg:p-12" amount={0.15}>
                    <div className="mb-6">
                        <img src={logoImage} alt="Logo Alidade" className="mb-4 h-12 w-auto" loading="lazy" decoding="async" />
                    </div>

                    <p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-400">
                        Expert en travaux de finition, construction et rénovation.<br/> Nous transformons vos idées en espaces uniques.
                    </p>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-5 h-5 text-alidade-gold flex-shrink-0" />
                        <a href={site.phoneHref} className="text-sm text-gray-300">
                          {site.phone}
                        </a>
                      </div>

                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-alidade-gold flex-shrink-0" />
                        <span className="text-sm text-gray-300">{site.address}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Mail className="w-5 h-5 text-alidade-gold flex-shrink-0" />
                        <a href={`mailto:${site.email}`} className="text-sm text-gray-300">{site.email}</a>
                      </div>
                    </div>

                    {socialLinks.length > 0 && (
                        <div className="mt-8 flex gap-3">
                            {socialLinks.map((s) => (
                                <SocialCircle key={s.label} href={s.href} label={s.label} icon={s.icon} />
                            ))}
                        </div>
                    )}
                </Reveal>

                {/* 3. Section Atouts (Qualité, Engagement, Confiance) */}
                <Stagger stagger={0.15} className="grid flex-1 grid-cols-1 border-t border-gray-800 items-center md:grid-cols-3 lg:border-t-0">
                    <FeatureItem
                        icon={<Award className="text-alidade-gold h-10 w-10 lg:h-16 lg:w-14" strokeWidth={1} />}
                        title="QUALITÉ"
                        description="Des matériaux de qualité et des finitions soignées."
                    />
                    <FeatureItem
                        icon={<Handshake className="text-alidade-gold h-10 w-10 lg:h-16 lg:w-16" strokeWidth={1} />}
                        title="ENGAGEMENT"
                        description="Respect des délais&nbsp;et accompagnement personnalisé."
                        hasBorder
                    />
                    <FeatureItem
                        icon={<ShieldCheck className="text-alidade-gold h-10 w-10 lg:h-16 lg:w-16" strokeWidth={1} />}
                        title="CONFIANCE"
                        description="Une équipe d'experts à votre service."
                    />
                </Stagger>
            </div>

            {/* BAS DE PAGE (Copyright) */}
            <div className="bg-alidade-navy border-t border-gray-800 py-6">
                <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-6 md:flex-row">
                    <p className="text-center text-xs tracking-widest text-gray-500">© {new Date().getFullYear()} Alidade. Tous droits réservés.</p>
                </div>
            </div>
        </footer>
    );
};

// --- Sous-composants utilitaires ---

const FeatureItem = ({ icon, title, description, hasBorder }: { icon: React.ReactNode; title: string; description: string; hasBorder?: boolean }) => (
    <StaggerItem className={`flex flex-col items-center p-10 text-center ${hasBorder ? 'border-gray-800 md:border-x' : ''}`}>
        <div className="mb-6">{icon}</div>
        <h3 className="mb-4 text-xs font-bold tracking-widest uppercase lg:text-sm">{title}</h3>
        <p className="px-4 text-xs  text-gray-400 lg:text-base">{description}</p>
    </StaggerItem>
);

const SocialCircle = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => (
    <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{ scale: 1.15, y: -2 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        className="hover:text-alidade-gold hover:border-alidade-gold flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors"
    >
     {icon}
    </motion.a>
);

export default Footer;
