import { Reveal } from '@/components/motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const industries = [
    {
        title: 'Telecoms',
        description:
            'Connectivite sans faille, appels traites rapidement et experience client superieure.',
        image: '/images/hero/allocall-call-center.webp',
    },
    {
        title: 'Energie',
        description:
            'Efficacite operationnelle, support client et suivis pour un service durable.',
        image: '/images/hero/allocall-ai.webp',
    },
    {
        title: 'Banque',
        description:
            'Transformer les relations clients pour une croissance durable.',
        image: '/images/hero/allocall-sales.webp',
    },
    {
        title: 'Sante',
        description:
            'Accueil, confirmation et rappels de rendez-vous avec professionnalisme.',
        image: '/images/hero/allocall-call-center.webp',
    },
    {
        title: 'Immobilier',
        description:
            'Qualification rapide des prospects et relances commerciales structurees.',
        image: '/images/hero/allocall-sales.webp',
    },
];

const visibleCount = 3;

export default function IndustriesSection() {
    const [startIndex, setStartIndex] = useState(0);

    const visibleIndustries = Array.from(
        { length: visibleCount },
        (_, index) => industries[(startIndex + index) % industries.length],
    );

    const previous = () => {
        setStartIndex(
            (current) =>
                (current - 1 + industries.length) %
                industries.length,
        );
    };

    const next = () => {
        setStartIndex(
            (current) => (current + 1) % industries.length,
        );
    };

    useEffect(() => {
        const timer = window.setInterval(() => {
            setStartIndex(
                (current) =>
                    (current + 1) % industries.length,
            );
        }, 5000);

        return () => window.clearInterval(timer);
    }, []);

    return (
        <section className="bg-white py-20 lg:py-24">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mx-auto max-w-5xl text-center">
                    <h2 className="text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl">
                        Industries
                    </h2>

                    <p className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-7
                            text-gray-500
                            sm:text-base
                            lg:text-lg
                        ">
                       Dans un environnement en constante évolution, nous mettons notre expertise au service de votre transformation pour assurer la croissance et le succès durable de votre entreprise.

                    </p>
                </Reveal>

                <div className="mt-10 flex justify-center gap-4 md:justify-end">
                    <button
                        type="button"
                        onClick={previous}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#74B946] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#659F3B] hover:shadow-lg"
                        aria-label="Industrie precedente"
                    >
                        <ArrowLeft size={22} />
                    </button>

                    <button
                        type="button"
                        onClick={next}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#74B946] text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#659F3B] hover:shadow-lg"
                        aria-label="Industrie suivante"
                    >
                        <ArrowRight size={22} />
                    </button>
                </div>

                <div className="mt-4 grid gap-7 md:grid-cols-3">
                    {visibleIndustries.map((industry) => (
                        <div key={industry.title}>
                            <article className="group relative h-64 overflow-hidden bg-[#111827] shadow-sm">
                                <img
                                    src={industry.image}
                                    alt={industry.title}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />

                                <div className="absolute inset-0 bg-[#111827]/20" />

                                <div className="absolute inset-x-5 bottom-5 bg-[#111827]/82 p-7 text-white backdrop-blur-sm transition-colors duration-300 group-hover:bg-[#74B946]/90">
                                    <h3 className="text-xl font-extrabold tracking-wide uppercase sm:text-2xl">
                                        {industry.title}
                                    </h3>

                                    <p className="mt-4 max-w-sm text-sm leading-5 font-medium text-white/95">
                                        {industry.description}
                                    </p>
                                </div>
                            </article>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-2">
                    {industries.map((industry, index) => (
                        <button
                            key={industry.title}
                            type="button"
                            onClick={() => setStartIndex(index)}
                            aria-label={`Afficher ${industry.title}`}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === startIndex
                                    ? 'w-6 bg-[#74B946]'
                                    : 'w-2 bg-gray-300 hover:bg-[#74B946]/60'
                            }`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
