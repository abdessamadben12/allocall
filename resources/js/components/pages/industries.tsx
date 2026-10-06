import { Link } from '@/components/localized-link';
import { Reveal } from '@/components/motion';
import { industryOverview } from '@/data/industry-overview';
import { useLocale } from '@/lib/i18n';

import {
    ArrowLeft,
    ArrowRight,
} from 'lucide-react';

import {
    useEffect,
    useState,
} from 'react';

/* =========================================================
   INDUSTRIES DATA
========================================================= */

const industries = industryOverview.map((industry) => ({
    slug: industry.slug,
    title: industry.name,
    description: industry.summary,
    image: industry.image,
    imageAlt: industry.imageAlt,

    href: industry.href.startsWith('/industries/')
        ? industry.href
        : `/industries#${industry.slug}`,
}));

/* =========================================================
   CONFIG
========================================================= */

const visibleCount = 3;

/* =========================================================
   INDUSTRIES SECTION
========================================================= */

export default function IndustriesSection() {
    const { t } = useLocale();

    const [startIndex, setStartIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    /* =====================================================
       CAROUSEL LIMIT
    ===================================================== */

    const maxStartIndex = Math.max(
        0,
        industries.length - visibleCount,
    );

    /*
     * Pas de modulo :
     * aucune répétition des cartes.
     */

    const visibleIndustries = industries.slice(
        startIndex,
        startIndex + visibleCount,
    );

    /* =====================================================
       PREVIOUS
    ===================================================== */

    const handlePrevious = () => {
        setStartIndex((current) =>
            Math.max(0, current - 1),
        );
    };

    /* =====================================================
       NEXT
    ===================================================== */

    const handleNext = () => {
        setStartIndex((current) =>
            Math.min(
                maxStartIndex,
                current + 1,
            ),
        );
    };

    /* =====================================================
       AUTOPLAY
    ===================================================== */

    useEffect(() => {
        if (
            paused ||
            hovered ||
            focused
        ) {
            return;
        }

        /*
         * Arrête l'autoplay
         * lorsque la dernière série est affichée.
         */

        if (startIndex >= maxStartIndex) {
            return;
        }

        const timer = window.setInterval(() => {
            if (!document.hidden) {
                setStartIndex((current) =>
                    Math.min(
                        maxStartIndex,
                        current + 1,
                    ),
                );
            }
        }, 5000);

        return () =>
            window.clearInterval(timer);
    }, [
        paused,
        hovered,
        focused,
        startIndex,
        maxStartIndex,
    ]);

    /* =====================================================
       RENDER
    ===================================================== */

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-white
                py-14
                sm:py-16
                lg:py-20
            "
            aria-labelledby="home-industries-title"
        >
            {/* BACKGROUND DECORATION */}

            <div
                className="
                    pointer-events-none
                    absolute
                    top-0
                    left-1/2
                    h-[420px]
                    w-[700px]
                    -translate-x-1/2
                    -translate-y-1/2
                    rounded-full
                    bg-[#74B946]/5
                    blur-3xl
                "
            />

            <div
                className="
                    relative
                    mx-auto
                    max-w-7xl
                    px-4
                    sm:px-6
                    lg:px-8
                "
            >

                {/* =================================================
                    HEADER
                ================================================= */}

                <Reveal className="mx-auto max-w-4xl text-center">

                    {/* EYEBROW */}

                    <div
                        className="
                            mb-4
                            flex
                            items-center
                            justify-center
                            gap-3
                        "
                    >
                        <span className="h-[2px] w-8 bg-[#74B946]" />

                        <span
                            className="
                                text-xs
                                font-bold
                                tracking-[0.2em]
                                text-[#74B946]
                                uppercase
                                sm:text-sm
                            "
                        >
                            {t(
                                'DES SOLUTIONS ADAPTÉES À VOTRE SECTEUR',
                            )}
                        </span>

                        <span className="h-[2px] w-8 bg-[#74B946]" />
                    </div>

                    {/* TITLE */}

                    <h2
                        id="home-industries-title"
                        className="
                            text-3xl
                            leading-tight
                            font-extrabold
                            tracking-tight
                            text-[#111827]
                            uppercase
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        {t(
                            'NOUS COMPRENONS VOTRE',
                        )}

                        <span className="text-[#74B946]">
                            <br />

                            {t(
                                'RÉALITÉ D’AFFAIRES',
                            )}
                        </span>
                    </h2>

                    {/* DESCRIPTION */}

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-3xl
                            text-sm
                            leading-7
                            font-light
                            text-gray-500
                            sm:text-base
                            lg:text-lg
                        "
                    >
                        {t(
                            "Automobile, santé, thermopompes, construction, assurance ou immobilier : ALLO CALL adapte ses agents, ses scripts et ses processus aux besoins des entreprises du Québec et du Canada.",
                        )}
                    </p>

                </Reveal>

                {/* =================================================
                    CAROUSEL
                ================================================= */}

                <div
                    className="relative mt-10"
                    onMouseEnter={() =>
                        setHovered(true)
                    }
                    onMouseLeave={() =>
                        setHovered(false)
                    }
                    onFocusCapture={() =>
                        setFocused(true)
                    }
                    onBlurCapture={(event) => {
                        if (
                            !event.currentTarget.contains(
                                event.relatedTarget,
                            )
                        ) {
                            setFocused(false);
                        }
                    }}
                >

                    {/* =================================================
                        PREVIOUS BUTTON — DESKTOP
                    ================================================= */}

                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={startIndex === 0}
                        aria-label={t(
                            'Secteurs précédents',
                        )}
                        className="
                            absolute
                            top-1/2
                            -left-5
                            z-20
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-gray-100
                            bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all
                            duration-300

                            hover:border-[#74B946]
                            hover:bg-[#74B946]
                            hover:text-white

                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:border-gray-100
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]

                            lg:flex
                        "
                    >
                        <ArrowLeft
                            size={22}
                            aria-hidden="true"
                        />
                    </button>

                    {/* =================================================
                        INDUSTRY CARDS
                    ================================================= */}

                    <div
                        className="
                            grid
                            auto-rows-fr
                            gap-7
                            md:grid-cols-2
                            lg:grid-cols-3
                        "
                    >
                        {visibleIndustries.map(
                            (industry) => (
                                <Link
                                    key={
                                        industry.slug
                                    }
                                    href={
                                        industry.href
                                    }
                                    aria-labelledby={`home-industry-${industry.slug}`}
                                    className="
                                        group
                                        relative
                                        grid
                                        min-h-[460px]
                                        overflow-hidden
                                        rounded-[24px]
                                        bg-[#111827]
                                        shadow-sm
                                        transition-all
                                        duration-500

                                        hover:-translate-y-1
                                        hover:shadow-xl

                                        focus-visible:outline-3
                                        focus-visible:outline-offset-4
                                        focus-visible:outline-[#74B946]
                                    "
                                >

                                    {/* IMAGE */}

                                    <img
                                        src={
                                            industry.image
                                        }
                                        alt={t(
                                            industry.imageAlt,
                                        )}
                                        width="960"
                                        height="1080"
                                        className="
                                            absolute
                                            inset-0
                                            h-full
                                            w-full
                                            object-cover
                                            transition-transform
                                            duration-700
                                            group-hover:scale-105

                                            motion-reduce:transform-none
                                            motion-reduce:transition-none
                                        "
                                        loading="lazy"
                                        decoding="async"
                                    />

                                    {/* OVERLAY */}

                                    <div
                                        className="
                                            absolute
                                            inset-0
                                            bg-gradient-to-t
                                            from-[#111827]
                                            via-[#111827]/60
                                            to-[#111827]/5
                                        "
                                    />

                                    {/* GREEN DECORATION */}

                                    <div
                                        className="
                                            absolute
                                            top-0
                                            left-0
                                            h-1
                                            w-0
                                            bg-[#74B946]
                                            transition-all
                                            duration-500
                                            group-hover:w-full
                                        "
                                    />

                                    {/* CONTENT */}

                                    <div
                                        className="
                                            relative
                                            self-end
                                            p-6
                                            text-white
                                            sm:p-7
                                        "
                                    >
                                        <h3
                                            id={`home-industry-${industry.slug}`}
                                            className="
                                                text-xl
                                                font-extrabold
                                                tracking-normal
                                                sm:text-2xl
                                            "
                                        >
                                            {t(
                                                industry.title,
                                            )}
                                        </h3>

                                        <p
                                            className="
                                                mt-3
                                                max-w-sm
                                                text-sm
                                                leading-6
                                                font-normal
                                                text-white/85
                                            "
                                        >
                                            {t(
                                                industry.description,
                                            )}
                                        </p>

                                        <span
                                            className="
                                                mt-6
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-sm
                                                font-bold
                                                text-[#b6e58e]
                                                transition-all
                                                duration-300
                                                group-hover:gap-3
                                                sm:text-base
                                            "
                                        >
                                            {t(
                                                'Découvrir ce secteur',
                                            )}

                                            <ArrowRight
                                                size={18}
                                                aria-hidden="true"
                                            />
                                        </span>

                                    </div>
                                </Link>
                            ),
                        )}
                    </div>

                    {/* =================================================
                        NEXT BUTTON — DESKTOP
                    ================================================= */}

                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={
                            startIndex >=
                            maxStartIndex
                        }
                        aria-label={t(
                            'Secteurs suivants',
                        )}
                        className="
                            absolute
                            top-1/2
                            -right-5
                            z-20
                            hidden
                            h-12
                            w-12
                            -translate-y-1/2
                            items-center
                            justify-center
                            rounded-full
                            border
                            border-gray-100
                            bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all
                            duration-300

                            hover:border-[#74B946]
                            hover:bg-[#74B946]
                            hover:text-white

                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:border-gray-100
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]

                            lg:flex
                        "
                    >
                        <ArrowRight
                            size={22}
                            aria-hidden="true"
                        />
                    </button>

                    {/* =================================================
                        MOBILE CONTROLS
                    ================================================= */}

                    <div
                        className="
                            mt-6
                            flex
                            items-center
                            justify-center
                            gap-3
                            lg:hidden
                        "
                    >
                        <button
                            type="button"
                            onClick={
                                handlePrevious
                            }
                            disabled={
                                startIndex === 0
                            }
                            aria-label={t(
                                'Secteurs précédents',
                            )}
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-gray-200
                                bg-white
                                text-[#111827]
                                transition

                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white

                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            <ArrowLeft
                                size={20}
                            />
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={
                                startIndex >=
                                maxStartIndex
                            }
                            aria-label={t(
                                'Secteurs suivants',
                            )}
                            className="
                                flex
                                h-11
                                w-11
                                items-center
                                justify-center
                                rounded-full
                                border
                                border-gray-200
                                bg-white
                                text-[#111827]
                                transition

                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white

                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            <ArrowRight
                                size={20}
                            />
                        </button>
                    </div>

                    {/* =================================================
                        PAGINATION
                    ================================================= */}

                    <div
                        className="
                            mt-6
                            flex
                            flex-wrap
                            items-center
                            justify-center
                            gap-2
                        "
                    >
                        {Array.from(
                            {
                                length:
                                    maxStartIndex +
                                    1,
                            },
                            (_, index) => (
                                <button
                                    key={
                                        index
                                    }
                                    type="button"
                                    onClick={() =>
                                        setStartIndex(
                                            index,
                                        )
                                    }
                                    aria-label={t(
                                        'Afficher le groupe {0}',
                                        [
                                            String(
                                                index +
                                                    1,
                                            ),
                                        ],
                                    )}
                                    aria-pressed={
                                        index ===
                                        startIndex
                                    }
                                    className="
                                        flex
                                        h-6
                                        items-center
                                        justify-center

                                        focus-visible:outline-2
                                        focus-visible:outline-[#74B946]
                                    "
                                >
                                    <span
                                        className={`
                                            h-2
                                            rounded-full
                                            transition-all
                                            duration-300

                                            ${
                                                index ===
                                                startIndex
                                                    ? 'w-6 bg-[#74B946]'
                                                    : 'w-2 bg-gray-300'
                                            }
                                        `}
                                    />
                                </button>
                            ),
                        )}
                    </div>

                </div>

                {/* =================================================
                    VIEW ALL
                ================================================= */}

                <div className="mt-7 text-center">

                    <Link
                        href="/industries"
                        className="
                            group
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            border
                            border-[#74B946]/20
                            px-6
                            py-3
                            text-xs
                            font-bold
                            tracking-[0.14em]
                            text-[#74B946]
                            uppercase
                            transition-all
                            duration-300

                            hover:border-[#74B946]
                            hover:bg-[#74B946]
                            hover:text-white

                            sm:text-sm
                        "
                    >
                        {t(
                            'Découvrir tous nos secteurs',
                        )}

                        <ArrowRight
                            size={18}
                            aria-hidden="true"
                            className="
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                            "
                        />
                    </Link>

                </div>

            </div>
        </section>
    );
}