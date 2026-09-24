import { Link } from '@/components/localized-link';
import { Reveal } from '@/components/motion';
import { industryOverview } from '@/data/industry-overview';
import { useLocale } from '@/lib/i18n';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

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

const visibleCount = 3;

export default function IndustriesSection() {
    const { t } = useLocale();

    const [startIndex, setStartIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    // Dernier index autorisé
    const maxStartIndex = Math.max(0, industries.length - visibleCount);

    // Pas de modulo ici => pas de répétition
    const visibleIndustries = industries.slice(
        startIndex,
        startIndex + visibleCount,
    );

    const handlePrevious = () => {
        setStartIndex((current) => Math.max(0, current - 1));
    };

    const handleNext = () => {
        setStartIndex((current) =>
            Math.min(maxStartIndex, current + 1),
        );
    };

    useEffect(() => {
        if (paused || hovered || focused) return;

        // Arrêter l'autoplay quand on arrive à la fin
        if (startIndex >= maxStartIndex) return;

        const timer = window.setInterval(() => {
            if (!document.hidden) {
                setStartIndex((current) =>
                    Math.min(maxStartIndex, current + 1),
                );
            }
        }, 5000);

        return () => window.clearInterval(timer);
    }, [
        paused,
        hovered,
        focused,
        startIndex,
        maxStartIndex,
    ]);

    return (
        <section
            className="bg-white"
            aria-labelledby="home-industries-title"
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mx-auto max-w-5xl text-center">
                    <h2
                        id="home-industries-title"
                        className="text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl"
                    >
                        {t('Industries')}
                    </h2>

                    <p className="mx-auto mt-5 text-center text-xs leading-6 font-light text-gray-500 sm:text-sm lg:text-base">
                        {t(
                            'Des solutions pour vos appels, vos prospects et vos rendez-vous, adaptées à votre secteur.',
                        )}
                    </p>
                </Reveal>

                <div
                    className="relative"
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocusCapture={() => setFocused(true)}
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
                    {/* Bouton précédent */}
                    <button
                        type="button"
                        onClick={handlePrevious}
                        disabled={startIndex === 0}
                        aria-label={t('Secteurs précédents')}
                        className="
                            absolute top-1/2 -left-5 z-20
                            hidden h-12 w-12 -translate-y-1/2
                            items-center justify-center
                            rounded-full bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all duration-300
                            hover:bg-[#74B946] hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]
                            lg:flex
                        "
                    >
                        <ArrowLeft size={22} />
                    </button>

                    {/* Cards */}
                    <div className="mt-6 grid auto-rows-fr gap-7 lg:grid-cols-3">
                        {visibleIndustries.map((industry) => (
                            <Link
                                key={industry.slug}
                                href={industry.href}
                                aria-labelledby={`home-industry-${industry.slug}`}
                                className="
                                    group relative grid min-h-96
                                    overflow-hidden bg-[#111827]
                                    shadow-sm
                                    focus-visible:outline-3
                                    focus-visible:outline-offset-4
                                    focus-visible:outline-[#74B946]
                                "
                            >
                                <img
                                    src={industry.image}
                                    alt={t(industry.imageAlt)}
                                    width="960"
                                    height="1080"
                                    className="
                                        absolute inset-0 h-full w-full
                                        object-cover
                                        transition-transform duration-700
                                        group-hover:scale-105
                                        motion-reduce:transform-none
                                        motion-reduce:transition-none
                                    "
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent" />

                                <div className="relative self-end p-6 text-white">
                                    <h3
                                        id={`home-industry-${industry.slug}`}
                                        className="text-xl font-extrabold tracking-normal sm:text-2xl"
                                    >
                                        {t(industry.title)}
                                    </h3>

                                    <p className="mt-3 max-w-sm text-sm leading-5 font-medium text-white/95">
                                        {t(industry.description)}
                                    </p>

                                    <span className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#b6e58e]">
                                        {t('Découvrir')}
                                        <ArrowRight
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {/* Bouton suivant */}
                    <button
                        type="button"
                        onClick={handleNext}
                        disabled={startIndex >= maxStartIndex}
                        aria-label={t('Secteurs suivants')}
                        className="
                            absolute top-1/2 -right-5 z-20
                            hidden h-12 w-12 -translate-y-1/2
                            items-center justify-center
                            rounded-full bg-white
                            text-[#111827]
                            shadow-lg
                            transition-all duration-300
                            hover:bg-[#74B946] hover:text-white
                            disabled:cursor-not-allowed
                            disabled:opacity-30
                            disabled:hover:bg-white
                            disabled:hover:text-[#111827]
                            lg:flex
                        "
                    >
                        <ArrowRight size={22} />
                    </button>

                    {/* Boutons mobile */}
                    <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={startIndex === 0}
                            className="
                                flex h-11 w-11 items-center justify-center
                                rounded-full border border-gray-200
                                bg-white text-[#111827]
                                transition
                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            <ArrowLeft size={20} />
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={startIndex >= maxStartIndex}
                            className="
                                flex h-11 w-11 items-center justify-center
                                rounded-full border border-gray-200
                                bg-white text-[#111827]
                                transition
                                hover:border-[#74B946]
                                hover:bg-[#74B946]
                                hover:text-white
                                disabled:cursor-not-allowed
                                disabled:opacity-30
                            "
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>

                    {/* Pagination */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                        {Array.from(
                            { length: maxStartIndex + 1 },
                            (_, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                        setStartIndex(index)
                                    }
                                    aria-label={t(
                                        'Afficher le groupe {0}',
                                        [String(index + 1)],
                                    )}
                                    aria-pressed={
                                        index === startIndex
                                    }
                                    className="
                                        flex h-6 items-center
                                        justify-center
                                        focus-visible:outline-2
                                        focus-visible:outline-[#74B946]
                                    "
                                >
                                    <span
                                        className={`
                                            h-2 rounded-full
                                            transition-all duration-300
                                            ${
                                                index === startIndex
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

                <div className="mt-4 text-center">
                    <Link
                        href="/industries"
                        className="
                            inline-flex items-center gap-2 py-3
                            text-xs font-bold tracking-[0.2em]
                            text-[#74B946] uppercase
                            hover:underline sm:text-sm
                        "
                    >
                        {t('Tous nos secteurs')}
                        <ArrowRight
                            size={18}
                            aria-hidden="true"
                        />
                    </Link>
                </div>
            </div>
        </section>
    );
}