import { useLocale } from '@/lib/i18n';
import { useEffect, useState } from 'react';
import {
    ArrowRight,
    Bot,
    CalendarCheck,
    ChevronLeft,
    ChevronRight,
    Clock3,
    PhoneCall,
} from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { Link } from '@/components/localized-link';

import {
    EASE,
    Stagger,
    StaggerItem,
} from '@/components/motion';

/* =========================================================
   ANIMATIONS
========================================================= */

const slideContent: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.14,
            delayChildren: 0.35,
        },
    },
};

const slideItem: Variants = {
    hidden: {
        opacity: 0,
        y: 26,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.7,
            ease: EASE,
        },
    },
};

/* =========================================================
   PROPS
========================================================= */

interface HeroSliderProps {
    onDiscoverClick: () => void;
}

/* =========================================================
   HERO
========================================================= */

export default function Hero({
    onDiscoverClick: _onDiscoverClick,
}: HeroSliderProps) {
const { t } = useLocale();

    const [currentSlide, setCurrentSlide] = useState(0);

    /* =====================================================
       SLIDES
       UNE SEULE IMAGE PAR SLIDE
    ===================================================== */

    const slides = [
        {
            id: 1,

            subtitle:
                "CENTRE D'APPELS BILINGUE · MONTRÉAL · CASABLANCA · PARIS",

            title:
                'RÉPONDEZ À CHAQUE APPEL. NE PERDEZ PLUS UN SEUL CLIENT.',

            description:
                "Une équipe téléphonique et commerciale à distance, dédiée aux PME québécoises. Réception d'appels, service à la clientèle, télévente, gestion de leads et prise de rendez-vous — sans les coûts d'une équipe interne.",

            cta: 'OBTENIR UNE SOUMISSION GRATUITE',

            secondaryCta: 'Parler à un conseiller',

            href: '/contact',

            secondaryHref: '/contact',

            image: '/images/hero/gestion-leads.webp',
        },

        {
            id: 2,

            subtitle:
                'INTELLIGENCE ARTIFICIELLE + AGENTS HUMAINS',

            title:
                'VOS LEADS TRAITÉS EN QUELQUES MINUTES, 24 H SUR 24',

            description:
                "Chatbot, agent vocal IA, SMS automatisés et CRM intelligent travaillent avec nos agents pour qualifier, relancer et convertir vos prospects. L'IA gère le volume, nos agents gèrent les conversations qui comptent.",

            cta: 'DÉCOUVRIR NOS SOLUTIONS IA',

            secondaryCta: null,

            href: '/solutions-ia',

            secondaryHref: null,

            image: '/images/hero/allocall-ai.webp',
        },

        {
            id: 3,

            subtitle:
                'CHAQUE APPEL EST UNE OPPORTUNITÉ',

            title:
                "UN APPEL MANQUÉ, C'EST UNE VENTE CHEZ VOTRE CONCURRENT",

            description:
                "Un prospect qui n'est pas rappelé ne revient pas. AlloCall prend en charge vos appels entrants, vos relances et votre agenda pour transformer chaque demande en rendez-vous qualifié.",

            cta: 'PLANIFIER UN APPEL',

            secondaryCta: null,

            href: '/contact',

            secondaryHref: null,

            image: '/images/hero/allocall-sales.webp',
        },
    ];

    /* =====================================================
       AUTO SLIDER — 7 SECONDES
    ===================================================== */

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide(
                (prev) => (prev + 1) % slides.length,
            );
        }, 7000);

        return () => clearInterval(timer);
    }, [slides.length]);

    /* =====================================================
       NEXT / PREVIOUS
    ===================================================== */

    const nextSlide = () => {
        setCurrentSlide(
            (prev) => (prev + 1) % slides.length,
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            (prev) =>
                (prev - 1 + slides.length) %
                slides.length,
        );
    };

    return (
        <div className="relative w-full overflow-hidden bg-[#111827]">
            {/* =================================================
                HERO
            ================================================= */}

            <div className="relative grid w-full">
                {slides.map((slide, index) => (
                    <div
                        key={slide.id}
                        inert={index !== currentSlide}
                        className={`col-start-1 row-start-1 flex w-full flex-col transition-all duration-1000 ease-in-out lg:min-h-[650px] lg:flex-row ${
                            index === currentSlide
                                ? 'relative z-10 translate-x-0 scale-100 opacity-100'
                                : 'pointer-events-none relative z-0 translate-x-full scale-95 opacity-0'
                        }`}
                    >
                        {/* =====================================
                            LEFT CONTENT
                        ===================================== */}

                        <div
                            className="
                                relative
                                flex
                                w-full
                                flex-col
                                justify-center
                                overflow-hidden
                                bg-gradient-to-br
                                from-[#101826]
                                to-[#1B2738]
                                p-8
                                pb-10
                                text-white
                                sm:p-12
                                lg:w-[48%]
                                lg:p-16
                                xl:p-20
                            "
                        >
                            {/* BACKGROUND DECORATION */}

                            <div className="pointer-events-none absolute top-0 left-0 h-40 w-40 rounded-full bg-[#74B946]/10 blur-3xl" />

                            <div className="pointer-events-none absolute right-0 bottom-0 h-64 w-64 rounded-full bg-[#74B946]/10 blur-3xl" />

                            {/* GREEN LEFT LINE */}

                            <div className="absolute top-0 left-0 h-full w-1 bg-[#74B946]" />

                            <motion.div
                                className="relative space-y-6"
                                variants={slideContent}
                                initial="hidden"
                                animate={
                                    index === currentSlide
                                        ? 'visible'
                                        : 'hidden'
                                }
                            >
                                {/* SUBTITLE */}

                                <motion.div
                                    variants={slideItem}
                                    className="flex items-center gap-3"
                                >
                                    <span className="h-[2px] w-8 shrink-0 bg-[#74B946]" />

                                    <span
                                        className="
                                            text-xs
                                            font-bold
                                            tracking-[0.16em]
                                            text-[#74B946]
                                            uppercase
                                            sm:text-sm
                                            lg:text-[14px]
                                        "
                                    >
                                        {t(slide.subtitle)}
                                    </span>
                                </motion.div>

                                {/* TITLE */}

                                <motion.h1
                                    variants={slideItem}
                                    className="
                                        max-w-2xl
                                        text-3xl
                                        leading-[1.08]
                                        font-extrabold
                                        tracking-tight
                                        text-white
                                        uppercase
                                        sm:text-4xl
                                        lg:text-[42px]
                                        xl:text-[49px]
                                    "
                                >
                                    {t(slide.title)}
                                </motion.h1>

                                {/* DESCRIPTION */}

                                <motion.p
                                    variants={slideItem}
                                    className="
                                        max-w-xl
                                        text-sm
                                        leading-7
                                        font-light
                                        text-gray-300
                                        sm:text-base
                                        lg:text-[16px]
                                        lg:leading-8
                                    "
                                >
                                    {t(slide.description)}
                                </motion.p>

                                {/* BUTTONS */}

                                <motion.div
                                    variants={slideItem}
                                    className="
                                        flex
                                        flex-col
                                        gap-3
                                        pt-3
                                        sm:flex-row
                                        sm:items-center
                                    "
                                >
                                    {/* PRIMARY */}

                                    <motion.div
                                        whileHover={{
                                            scale: 1.03,
                                        }}
                                        whileTap={{
                                            scale: 0.97,
                                        }}
                                        transition={{
                                            type: 'spring',
                                            stiffness: 400,
                                            damping: 20,
                                        }}
                                    >
                                        <Link
                                            href={slide.href}
                                            className="
                                                group
                                                inline-flex
                                                items-center
                                                justify-center
                                                gap-2.5
                                                rounded
                                                bg-[#74B946]
                                                px-7
                                                py-4
                                                text-xs
                                                font-bold
                                                tracking-wider
                                                text-white
                                                uppercase
                                                shadow-xl
                                                transition-all
                                                duration-300
                                                hover:bg-[#659F3B]
                                                hover:shadow-[#74B946]/20
                                                sm:text-sm
                                            "
                                        >
                                            <span>
                                                {t(slide.cta)}
                                            </span>

                                            <ArrowRight
                                                size={17}
                                                className="
                                                    transition-transform
                                                    duration-300
                                                    group-hover:translate-x-1
                                                "
                                            />
                                        </Link>
                                    </motion.div>

                                    {/* SECONDARY */}

                                    {slide.secondaryCta &&
                                        slide.secondaryHref && (
                                            <Link
                                                href={
                                                    slide.secondaryHref
                                                }
                                                className="
                                                    group
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    px-5
                                                    py-4
                                                    text-sm
                                                    font-semibold
                                                    text-white
                                                    transition-colors
                                                    duration-300
                                                    hover:text-[#74B946]
                                                "
                                            >
                                                {
                                                    t(slide.secondaryCta)
                                                }

                                                <ArrowRight
                                                    size={16}
                                                    className="
                                                        transition-transform
                                                        duration-300
                                                        group-hover:translate-x-1
                                                    "
                                                />
                                            </Link>
                                        )}
                                </motion.div>
                            </motion.div>
                        </div>

                        {/* =====================================
                            RIGHT — ONE IMAGE ONLY
                        ===================================== */}

                        <div
                            className="
                                relative
                                h-[380px]
                                w-full
                                overflow-hidden
                                bg-[#111827]
                                lg:h-auto
                                lg:w-[52%]
                            "
                        >
                            <img
                                src={slide.image}
                                alt={t(slide.title)}
                                loading={
                                    index === currentSlide
                                        ? 'eager'
                                        : 'lazy'
                                }
                                decoding="async"
                                fetchPriority={
                                    index === currentSlide
                                        ? 'high'
                                        : 'low'
                                }
                                className="
                                    h-full
                                    w-full
                                    object-cover
                                    lg:absolute
                                    lg:inset-0
                                    transition-transform
                                    duration-[8000ms]
                                    hover:scale-105
                                "
                                referrerPolicy="no-referrer"
                            />

                            {/* DARK GRADIENT LEFT */}

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-r
                                    from-[#111827]/35
                                    via-transparent
                                    to-transparent
                                    lg:from-[#111827]/25
                                "
                            />

                            {/* DARK BOTTOM GRADIENT */}

                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#111827]/35
                                    via-transparent
                                    to-transparent
                                "
                            />

                           
                        </div>
                    </div>
                ))}

                {/* =================================================
                    PREVIOUS BUTTON
                ================================================= */}

                <button
                    onClick={prevSlide}
                    className="
                        absolute
                        left-4
                        top-1/2
                        -translate-y-1/2
                        z-20
                        hidden
                        rounded-full
                        border
                        border-[#74B946]/40
                        bg-[#111827]/80
                        p-3
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-[#74B946]
                        sm:block
                    "
                    aria-label={t("Slide précédente")}
                >
                    <ChevronLeft size={20} />
                </button>

                {/* =================================================
                    NEXT BUTTON
                ================================================= */}

                <button
                    onClick={nextSlide}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        z-20
                        hidden
                        rounded-full
                        border
                        border-[#74B946]/40
                        bg-[#111827]/80
                        p-3
                        text-white
                        backdrop-blur-md
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-[#74B946]
                        sm:block
                    "
                    aria-label={t("Slide suivante")}
                >
                    <ChevronRight size={20} />
                </button>

                {/* =================================================
                    SLIDE INDICATORS
                ================================================= */}

                <div
                    className="
                        absolute
                        bottom-6
                        left-1/2
                        z-20
                        flex
                        -translate-x-1/2
                        gap-2
                    "
                >
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() =>
                                setCurrentSlide(index)
                            }
                            aria-label={t("Afficher le slide {0}", [index + 1])}
                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                index === currentSlide
                                    ? 'w-14 bg-[#74B946]'
                                    : 'w-9 bg-white/40 hover:bg-white/70'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* =================================================
                VALUE PROPOSITION STRIP
            ================================================= */}

            <div className="relative z-20 border-b border-gray-100 bg-white py-8 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Stagger
                        className="
                            grid
                            grid-cols-1
                            gap-6
                            divide-y
                            divide-gray-100
                            sm:grid-cols-2
                            sm:gap-8
                            sm:divide-y-0
                            lg:grid-cols-4
                            lg:divide-x
                        "
                    >
                        {/* 1 */}

                        <StaggerItem className="flex items-center gap-4 pt-4 first:pt-0 sm:pt-0 lg:pl-4 first:pl-0">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16">
                                <PhoneCall className="h-5 w-5 text-[#74B946] lg:h-7 lg:w-7" />
                            </div>

                            <div>
                                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase sm:text-sm lg:text-lg">
                                    {t("Appels entrants")}</h3>

                                <p className="mt-0.5 text-xs font-light text-gray-400 lg:text-base">
                                    {t("Aucun appel")}<br />
                                    {t("laissé sans réponse")}</p>
                            </div>
                        </StaggerItem>

                        {/* 2 */}

                        <StaggerItem className="flex items-center gap-4 pt-4 sm:pt-0 lg:pl-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16">
                                <Bot className="h-5 w-5 text-[#74B946] lg:h-7 lg:w-7" />
                            </div>

                            <div>
                                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase sm:text-sm lg:text-lg">
                                    {t("IA+Humain")}</h3>

                                <p className="mt-0.5 text-xs font-light text-gray-400 lg:text-base">
                                    {t("Automatisation")}<br />
                                    {t("et agents dédiés")}</p>
                            </div>
                        </StaggerItem>

                        {/* 3 */}

                        <StaggerItem className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16">
                                <Clock3 className="h-5 w-5 text-[#74B946] lg:h-7 lg:w-7" />
                            </div>

                            <div>
                                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase sm:text-sm lg:text-lg">
                                    {t("24H/24")}</h3>

                                <p className="mt-0.5 text-xs font-light text-gray-400 lg:text-base">
                                    {t("Vos leads traités")}<br />
                                    {t("rapidement")}</p>
                            </div>
                        </StaggerItem>

                        {/* 4 */}

                        <StaggerItem className="flex items-center gap-4 pt-4 lg:pt-0 lg:pl-6">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#111827] shadow-md lg:h-16 lg:w-16">
                                <CalendarCheck className="h-5 w-5 text-[#74B946] lg:h-7 lg:w-7" />
                            </div>

                            <div>
                                <h3 className="text-xs font-bold tracking-wider text-[#111827] uppercase sm:text-sm lg:text-lg">
                                    {t("Rendez-vous")}</h3>

                                <p className="mt-0.5 text-xs font-light text-gray-400 lg:text-base">
                                    {t("Plus de prospects")}<br />
                                    {t("convertis en clients")}</p>
                            </div>
                        </StaggerItem>
                    </Stagger>
                </div>
            </div>
        </div>
    );
}
