import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { useLocale } from '@/lib/i18n';

import { site } from '@/data/site';
import { logoImage } from '@/image';

import { motion } from 'framer-motion';

import { Bot, Facebook, Headphones, Instagram, Linkedin, Mail, Phone, Target } from 'lucide-react';

import React from 'react';

/* =========================================================
   CONTACT ALLOCAL
========================================================= */

const contactInfo = {
    maroc: {
        label: 'Maroc',
        phone: '+212 5 22 48 44 25',
        href: 'tel:+212522484425',
    },

    montreal: {
        label: 'Montréal',
        phone: '+1 514-660-2337',
        href: 'tel:+15146602337',
    },

    email: 'contact@allocall.ma',
};

/* =========================================================
   SOCIAL LINKS
========================================================= */

const socialLinks = [
    {
        href: site.socials.facebook,
        icon: <Facebook size={18} />,
        label: 'Facebook',
    },
    {
        href: site.socials.instagram,
        icon: <Instagram size={18} />,
        label: 'Instagram',
    },
    {
        href: site.socials.linkedin,
        icon: <Linkedin size={18} />,
        label: 'LinkedIn',
    },
].filter((s) => s.href);

/* =========================================================
   FOOTER
========================================================= */

const Footer: React.FC = () => {
    const { t } = useLocale();

    return (
        <footer className="overflow-hidden bg-[#111827] text-white">
            {/* =====================================================
                SECTION PRINCIPALE
            ===================================================== */}

            <div className="flex flex-col items-stretch lg:flex-row">
                {/* =================================================
                    2. LOGO + DESCRIPTION + CONTACT
                ================================================= */}

                <Reveal className="flex w-full flex-col justify-center p-8 lg:w-1/3 lg:p-12" amount={0.15}>
                    {/* LOGO */}

                    <div className="mb-6">
                        <img src={logoImage} alt={t('Logo AlloCall')} className="mb-4 h-14 w-auto" loading="lazy" decoding="async" />
                    </div>

                    {/* DESCRIPTION */}

                    <p className="mb-8 max-w-sm text-sm leading-7 text-gray-400">
                        {t('Une équipe à distance pour gérer vos appels, vos prospects et votre relation client.')}
                        <br />
                        {t('AlloCall combine expertise humaine et technologie pour vous aider à ne laisser passer aucune opportunité.')}
                    </p>

                    {/* =================================================
                        CONTACT INFO
                    ================================================= */}

                    <div className="flex flex-col gap-4">
                        {/* MAROC */}

                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 shrink-0 text-[#74B946]" />

                            <div className="flex flex-wrap items-center gap-1">
                                <span className="text-sm font-semibold text-gray-500">{t('Maroc :')}</span>

                                <a
                                    href={contactInfo.maroc.href}
                                    className="text-sm text-gray-300 transition-colors duration-300 hover:text-[#74B946]"
                                >
                                    {contactInfo.maroc.phone}
                                </a>
                            </div>
                        </div>

                        {/* MONTRÉAL */}

                        <div className="flex items-center gap-3">
                            <Phone className="h-5 w-5 shrink-0 text-[#74B946]" />

                            <div className="flex flex-wrap items-center gap-1">
                                <span className="text-sm font-semibold text-gray-500">{t('Montréal :')}</span>

                                <a
                                    href={contactInfo.montreal.href}
                                    className="text-sm text-gray-300 transition-colors duration-300 hover:text-[#74B946]"
                                >
                                    {contactInfo.montreal.phone}
                                </a>
                            </div>
                        </div>

                        {/* EMAIL */}

                        <div className="flex items-center gap-3">
                            <Mail className="h-5 w-5 shrink-0 text-[#74B946]" />

                            <a
                                href={`mailto:${contactInfo.email}`}
                                className="text-sm text-gray-300 transition-colors duration-300 hover:text-[#74B946]"
                            >
                                {contactInfo.email}
                            </a>
                        </div>
                    </div>

                    {/* =================================================
                        SOCIAL NETWORKS
                    ================================================= */}

                    {socialLinks.length > 0 && (
                        <div className="mt-8 flex gap-3">
                            {socialLinks.map((social) => (
                                <SocialCircle key={social.label} href={social.href} label={social.label} icon={social.icon} />
                            ))}
                        </div>
                    )}
                </Reveal>

                {/* =================================================
                    3. ATOUTS ALLOCAL
                ================================================= */}

                <Stagger stagger={0.15} className="grid flex-1 grid-cols-1 items-center border-t border-gray-800 md:grid-cols-3 lg:border-t-0">
                    {/* RELATION CLIENT */}

                    <FeatureItem
                        icon={<Headphones className="h-10 w-10 text-[#74B946] lg:h-16 lg:w-14" strokeWidth={1} />}
                        title={t('RELATION CLIENT')}
                        description={t('Des agents dédiés pour répondre à vos clients avec professionnalisme.')}
                    />

                    {/* PERFORMANCE */}

                    <FeatureItem
                        icon={<Target className="h-10 w-10 text-[#74B946] lg:h-16 lg:w-16" strokeWidth={1} />}
                        title={t('PERFORMANCE')}
                        description={t('Qualification, suivi et relance pour transformer plus de prospects.')}
                        hasBorder
                    />

                    {/* IA + HUMAIN */}

                    <FeatureItem
                        icon={<Bot className="h-10 w-10 text-[#74B946] lg:h-16 lg:w-16" strokeWidth={1} />}
                        title={t('IA + HUMAIN')}
                        description={t("La technologie pour gagner du temps, l'humain pour créer la relation.")}
                    />
                </Stagger>
            </div>

            {/* =====================================================
                COPYRIGHT
            ===================================================== */}

            <div className="border-t border-gray-800 bg-[#0C1421] py-6">
                <div className="container mx-auto flex flex-col items-center justify-center gap-2 px-6 md:flex-row">
                    <p className="text-center text-xs tracking-widest text-gray-500">
                        {t('© ')}
                        {new Date().getFullYear()} {t('AlloCall. Tous droits réservés.')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

/* =========================================================
   FEATURE ITEM
========================================================= */

const FeatureItem = ({ icon, title, description, hasBorder }: { icon: React.ReactNode; title: string; description: string; hasBorder?: boolean }) => {
    const { t } = useLocale();
    return (
        <StaggerItem className={`flex flex-col items-center p-10 text-center ${hasBorder ? 'border-gray-800 md:border-x' : ''} `}>
            <div className="mb-6">{icon}</div>

            <h3 className="mb-4 text-xs font-bold tracking-widest uppercase lg:text-sm">{t(title)}</h3>

            <p className="px-4 text-xs leading-6 text-gray-400 lg:text-base">{t(description)}</p>
        </StaggerItem>
    );
};

/* =========================================================
   SOCIAL CIRCLE
========================================================= */

const SocialCircle = ({ icon, href, label }: { icon: React.ReactNode; href: string; label: string }) => {
    const { t } = useLocale();
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t(label)}
            whileHover={{
                scale: 1.15,
                y: -2,
            }}
            whileTap={{
                scale: 0.95,
            }}
            transition={{
                type: 'spring',
                stiffness: 400,
                damping: 18,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-700 text-gray-400 transition-colors duration-300 hover:border-[#74B946] hover:bg-[#74B946] hover:text-white"
        >
            {icon}
        </motion.a>
    );
};

export default Footer;
