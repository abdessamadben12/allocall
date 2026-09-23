import { useLocale } from '@/lib/i18n';
import { Reveal } from '@/components/motion';
import { industryOverview } from '@/data/industry-overview';
import { Link } from '@/components/localized-link';

import { ArrowRight, Pause, Play } from 'lucide-react';
import { useEffect, useState } from 'react';

const industries = industryOverview.map((industry) => ({
    slug: industry.slug,
    title: industry.name,
    description: industry.summary,
    image: industry.image,
    imageAlt: industry.imageAlt,
    href: industry.href.startsWith('/industries/') ? industry.href : `/industries#${industry.slug}`,
}));

const visibleCount = 3;

export default function IndustriesSection() {
const { t } = useLocale();

    const [startIndex, setStartIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    const visibleIndustries = Array.from({ length: visibleCount }, (_, index) => industries[(startIndex + index) % industries.length]);

    useEffect(() => {
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        const respectMotionPreference = () => {
            if (motionPreference.matches) setPaused(true);
        };
        respectMotionPreference();
        motionPreference.addEventListener('change', respectMotionPreference);

        return () => motionPreference.removeEventListener('change', respectMotionPreference);
    }, []);

    useEffect(() => {
        if (paused || hovered || focused) return;

        const timer = window.setInterval(() => {
            if (!document.hidden) {
                setStartIndex((current) => (current + 1) % industries.length);
            }
        }, 5000);

        return () => window.clearInterval(timer);
    }, [paused, hovered, focused]);

    return (
        <section className="bg-white" aria-labelledby="home-industries-title">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mx-auto max-w-5xl text-center">
                    <h2 id="home-industries-title" className="text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl">
                        {t("Industries")}</h2>
                    <p className="
                                    mx-auto
                                    text-center
                                    text-xs
                                    leading-6
                                    font-light
                                    text-gray-500
                                    sm:text-sm
                                    lg:text-base
                                ">
                        {t("Des solutions pour vos appels, vos prospects et vos rendez-vous, adaptées à votre secteur.")}</p>
                </Reveal>

                <div
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onFocusCapture={() => setFocused(true)}
                    onBlurCapture={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
                    }}
                >
                    <div className="mt-6 grid auto-rows-fr gap-7 lg:grid-cols-3">
                        {visibleIndustries.map((industry) => (
                            <Link
                                key={industry.slug}
                                href={industry.href}
                                aria-labelledby={`home-industry-${industry.slug}`}
                                className="group relative grid min-h-96 overflow-hidden bg-[#111827] shadow-sm focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[#74B946]"
                            >
                                <img
                                    src={industry.image}
                                    alt={t(industry.imageAlt)}
                                    width="960"
                                    height="1080"
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/50 to-transparent" />
                                <div className="relative self-end p-6 text-white">
                                    <h3 id={`home-industry-${industry.slug}`} className="text-xl font-extrabold tracking-normal sm:text-2xl">
                                        {t(industry.title)}
                                    </h3>
                                    <p className="mt-3 max-w-sm text-sm leading-5 font-medium text-white/95">{t(industry.description)}</p>
                                    <span className="mt-5 inline-flex items-center gap-2 text-base font-semibold text-[#b6e58e]">
                                        {t("Découvrir ")}<ArrowRight size={18} aria-hidden="true" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-6 flex flex-wrap items-center justify-center gap-1">
                        {industries.map((industry, index) => (
                            <button
                                key={industry.slug}
                                type="button"
                                onClick={() => setStartIndex(index)}
                                aria-label={t("Afficher {0}", [industry.title])}
                                aria-pressed={index === startIndex}
                                title={t(industry.title)}
                                className="flex h-11 w-11 items-center justify-center rounded-sm focus-visible:outline-2 focus-visible:outline-[#74B946]"
                            >
                                <span
                                    className={`h-2 rounded-full ${index === startIndex ? 'w-6 bg-[#74B946]' : 'w-2 bg-gray-300'}`}
                                    aria-hidden="true"
                                />
                            </button>
                        ))}
                      
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <Link href="/industries" className="inline-flex items-center gap-2 py-3
                                text-xs
                                font-bold
                                tracking-[0.2em]
                                text-[#74B946]
                                uppercase
                                sm:text-sm
                               
                                
  hover:underline">
                        {t("Tous nos secteurs ")}<ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
