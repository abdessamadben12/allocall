import { Reveal } from '@/components/motion';
import { site } from '@/data/site';
import { useLocale } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { MapPin, Phone, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const locations = [
    {
        id: 'canada',
        label: 'Canada',
        sites: '1 site',
        address: '8815 Av. du Parc, Montréal, QC H2N 1X9, Canada',
        phone: '+1 (438) 699-1965',
        phoneHref: 'tel:+14386991965',

        // Montréal
        position: 'left-[29.6%] top-[16.7%]',

        cardPosition: 'sm:left-[31.5%] sm:top-[24.7%]',
    },
    {
        id: 'maroc',
        label: 'Maroc',
        sites: '1 site',
        address: site.address,
        phone: '+212 5 22 48 44 25',
        phoneHref: 'tel:+212522484425',

        // Casablanca
        position: 'left-[47.9%] top-[37%]',

        cardPosition: 'sm:left-[50%] sm:top-[39%]',
    },
    {
        id: 'france',
        label: 'France',
        sites: 'Partenaires',
        address: null,
        phone: null,
        phoneHref: null,

        // Paris
        position: 'left-[53.7%] top-[22.8%]',

        cardPosition: 'sm:left-[55.5%] sm:top-[27.8%]',
    },
];

export default function GlobalPresenceSection() {
    const { t } = useLocale();

    const [activeLocation, setActiveLocation] = useState<(typeof locations)[number] | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!activeLocation) return;
        function closeOutside(event: PointerEvent) {
            const target = event.target;
            if (!(target instanceof Element) || cardRef.current?.contains(target) || target.closest('[data-location-trigger]')) return;
            setActiveLocation(null);
        }
        function closeOnEscape(event: KeyboardEvent) {
            if (event.key !== 'Escape') return;
            setActiveLocation(null);
            document.getElementById(`location-${activeLocation?.id}`)?.focus();
        }
        document.addEventListener('pointerdown', closeOutside);
        document.addEventListener('keydown', closeOnEscape);
        return () => {
            document.removeEventListener('pointerdown', closeOutside);
            document.removeEventListener('keydown', closeOnEscape);
        };
    }, [activeLocation]);

    return (
        <section className="overflow-hidden bg-white py-20 lg:py-24" onClick={() => setActiveLocation(null)}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl">{t('Présence internationale')}</h2>

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base lg:text-lg">
                        {t(
                            "Une organisation connectée entre l'Amérique du Nord, l'Europe et l'Afrique pour offrir un service client fluide, rapide et adapté à vos marchés.",
                        )}
                    </p>
                </Reveal>

                <Reveal className="relative mt-12" delay={0.12} y={18}>
                    <div className="relative mx-auto max-w-6xl">
                        <img src="/images/maps.svg" alt={t('Carte des implantations AlloCall')} className="w-full" loading="lazy" decoding="async" />

                        {locations.map((location, index) => {
                            const animations = [
                                {
                                    x: -100,
                                    y: -100,
                                },
                                {
                                    x: 0,
                                    y: 70,
                                },
                                {
                                    x: 70,
                                    y: -40,
                                },
                            ];

                            return (
                                <div key={location.id} className={`absolute -translate-x-1/2 -translate-y-1/2 ${location.position} `}>
                                    <motion.button
                                        type="button"
                                        id={`location-${location.id}`}
                                        data-location-trigger
                                        aria-expanded={activeLocation?.id === location.id}
                                        aria-controls={activeLocation?.id === location.id ? 'location-contact-card' : undefined}
                                        initial={{
                                            opacity: 0,
                                            scale: 0.4,
                                            x: animations[index].x,
                                            y: animations[index].y,
                                        }}
                                        whileInView={{
                                            opacity: 1,
                                            scale: 1,
                                            x: 0,
                                            y: 0,
                                        }}
                                        viewport={{
                                            once: true,
                                            amount: 0.5,
                                        }}
                                        transition={{
                                            duration: 1.9,
                                            delay: index * 0.18,
                                            ease: [0.16, 1, 0.3, 1],
                                        }}
                                        whileHover={{
                                            scale: 1.25,
                                        }}
                                        whileTap={{
                                            scale: 0.9,
                                        }}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setActiveLocation(location);
                                        }}
                                        onMouseEnter={() => {
                                            if (window.matchMedia('(hover: hover) and (min-width: 640px)').matches) setActiveLocation(location);
                                        }}
                                        className="flex h-10 w-10 items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#487e2e]"
                                        aria-label={t('Afficher {0}', [t(location.label)])}
                                    >
                                        <span
                                            className={`h-4 w-4 rounded-full border-2 border-white bg-[#74B946] shadow-lg shadow-[#74B946]/40 sm:h-5 sm:w-5 sm:border-4 ${
                                                activeLocation?.id === location.id ? 'ring-4 ring-[#74B946]/25' : ''
                                            } `}
                                        />
                                    </motion.button>
                                </div>
                            );
                        })}

                        {activeLocation && (
                            <motion.div
                                key={activeLocation.id}
                                ref={cardRef}
                                id="location-contact-card"
                                role="region"
                                aria-labelledby="location-contact-title"
                                onClick={(event) => event.stopPropagation()}
                                initial={{
                                    opacity: 0,
                                    scale: 0.95,
                                }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: 'easeOut',
                                }}
                                className={`absolute top-1/2 left-1/2 z-20 w-[260px] max-w-full -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-[#111827] to-[#74B946] p-4 text-white shadow-xl sm:w-[270px] sm:translate-x-0 ${activeLocation.cardPosition} `}
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <h3 id="location-contact-title" className="text-lg font-extrabold uppercase">
                                        {t(activeLocation.label)}
                                    </h3>
                                    <button
                                        type="button"
                                        aria-label={t('Fermer la fiche')}
                                        title={t('Fermer la fiche')}
                                        onClick={() => setActiveLocation(null)}
                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-white"
                                    >
                                        <X size={18} aria-hidden="true" />
                                    </button>
                                </div>
                                <p className="mt-1 text-sm text-white/80">{t(activeLocation.sites)}</p>
                                {activeLocation.address && (
                                    <address className="mt-4 space-y-3 text-sm leading-6 not-italic">
                                        {activeLocation.address && (
                                            <div className="flex items-start gap-2.5">
                                                <MapPin size={17} className="mt-1 shrink-0" aria-hidden="true" />
                                                <span>{t(activeLocation.address)}</span>
                                            </div>
                                        )}
                                        {activeLocation.phoneHref && (
                                            <a
                                                href={activeLocation.phoneHref}
                                                className="flex min-h-8 items-center gap-2.5 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-white"
                                            >
                                                <Phone size={17} className="shrink-0" aria-hidden="true" />
                                                <span>{activeLocation.phone}</span>
                                            </a>
                                        )}
                                    </address>
                                )}
                            </motion.div>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
