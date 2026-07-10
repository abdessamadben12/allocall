import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { services } from '@/data/services';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, FileSignature, HardHat, KeyRound, MessageSquare } from 'lucide-react';

interface ServicesGridProps {
    onQuoteWithService: (serviceName: string) => void;
}

export default function Services({ onQuoteWithService }: ServicesGridProps) {
    return (
        <section className="w-full bg-[#FDFCFA] text-alidade-navy" id="services-section">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-alidade-navy py-10 text-white sm:py-18">
                <div className="absolute inset-0 bg-gradient-to-b from-alidade-navy/50 via-alidade-navy/70 to-alidade-navy" />
                <Stagger className="relative mx-auto max-w-6xl space-y-6 px-4 text-center sm:px-6 lg:px-8" amount={0.3}>
                    <StaggerItem className="inline-block">
                        <span className="sm:text-xl text-sm font-bold tracking-[0.3em] text-alidade-gold uppercase">Services</span>
                    </StaggerItem>
                    <StaggerItem>
                        <h1 className="serif-display text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl">Nos Domaines d'Expertise</h1>
                    </StaggerItem>
                    <StaggerItem>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed font-light text-white/75 sm:text-lg">
                            De la conception à la réalisation, nous maîtrisons tous les aspects des travaux de construction, rénovation et
                            agencement.
                        </p>
                    </StaggerItem>
                </Stagger>

                {/* Stats strip */}
                <Stagger
                    stagger={0.15}
                    delay={0.2}
                    className="relative mx-auto mt-16 grid max-w-4xl grid-cols-3 divide-x divide-white/10 border-t border-white/10 px-4 pt-8 sm:px-6 lg:px-8"
                >
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-3xl font-bold text-alidade-gold sm:text-4xl">6</div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">Corps de métier</div>
                    </StaggerItem>
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-3xl font-bold text-alidade-gold sm:text-4xl">10+</div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">Ans d'expérience</div>
                    </StaggerItem>
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-3xl font-bold text-alidade-gold sm:text-4xl">1</div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">Interlocuteur unique</div>
                    </StaggerItem>
                </Stagger>
            </div>

            {/* Services — creative diagonal cards, each linking to its own page */}
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
                <Reveal className="mb-16 space-y-3 text-center">
                    <h2 className="serif-display text-3xl font-bold text-alidade-navy sm:text-4xl">Six métiers, un seul interlocuteur</h2>
                </Reveal>

                <Stagger stagger={0.1} amount={0.05} className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                    {services.map((service, index) => {
                        const IconComponent = service.icon;
                        const number = String(index + 1).padStart(2, '0');

                        return (
                            <StaggerItem key={service.slug} className="h-full">
                            <Link
                                href={route('services.show', service.slug)}
                                className="group relative flex h-full flex-col rounded-2xl bg-alidade-navy shadow-lg transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl"
                            >
                                {/* Image with diagonal cut into the dark panel */}
                                <div
                                    className="relative h-52 overflow-hidden rounded-t-2xl"
                                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 78%, 0% 100%)' }}
                                >
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        referrerPolicy="no-referrer"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-alidade-navy via-alidade-navy/10 to-black/20" />
                                </div>

                                {/* Number watermark */}
                                <span className="serif-display pointer-events-none absolute top-3 right-5 text-6xl font-bold text-white/[0.06] select-none">
                                    {number}
                                </span>

                                {/* Icon medallion straddling the seam */}
                                <div className="relative -mt-7 pl-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-alidade-navy bg-white text-alidade-navy shadow-lg transition-colors duration-300 group-hover:bg-[#0d1a2d] group-hover:text-[#ffe40f]">
                                        <IconComponent size={22} />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex flex-grow flex-col space-y-3 px-6 pt-4 pb-7">
                                    <h3 className="serif-display text-xl leading-snug font-bold text-white">{service.title}</h3>
                                    <p className="line-clamp-3 text-sm leading-relaxed text-white/60">{service.description}</p>

                                    <span className="mt-auto inline-flex items-center gap-2 pt-3 text-xs font-bold tracking-[0.2em] text-alidade-gold uppercase">
                                        <span>Découvrir</span>
                                        <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
                                    </span>
                                </div>

                                {/* Accent border glow on hover */}
                                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5 transition-all duration-500 ring-inset group-hover:ring-alidade-gold/50" />
                            </Link>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </div>

            {/* Process Section */}
            <div className="bg-[#F9F7F3]">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
                    <Reveal className="mb-16 space-y-3 text-center">
                        <h2 className="serif-display text-3xl font-bold text-alidade-navy sm:text-4xl">Comment nous travaillons</h2>
                    </Reveal>

                    <Stagger stagger={0.18} className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {[
                            { icon: MessageSquare, step: '01', title: 'Consultation', desc: 'Écoute de votre besoin et visite technique sur site.' },
                            {
                                icon: FileSignature,
                                step: '02',
                                title: 'Devis & Étude',
                                desc: 'Chiffrage détaillé et validation du cahier des charges.',
                            },
                            { icon: HardHat, step: '03', title: 'Réalisation', desc: 'Exécution des travaux suivie par un conducteur dédié.' },
                            { icon: KeyRound, step: '04', title: 'Livraison', desc: 'Réception du chantier et accompagnement après travaux.' },
                        ].map((item, idx, arr) => {
                            const StepIcon = item.icon;
                            return (
                                <StaggerItem key={item.step} className="relative space-y-4 text-center">
                                    {idx < arr.length - 1 && (
                                        <span className="absolute top-8 left-[60%] hidden h-px w-full bg-[#ffe40f] lg:block" />
                                    )}
                                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#2f302f] bg-[#101311] text-[#ffe40f] shadow-md">
                                        <StepIcon size={26} />
                                    </div>
                                    <div className="text-[11px] font-bold tracking-[0.3em] text-[#5d5f5e] uppercase">Étape {item.step}</div>
                                    <h4 className="text-lg font-bold text-alidade-navy">{item.title}</h4>
                                    <p className="text-sm leading-relaxed text-alidade-muted">{item.desc}</p>
                                </StaggerItem>
                            );
                        })}
                    </Stagger>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-alidade-navy text-white">
                <Stagger className="mx-auto max-w-6xl space-y-8 px-4 py-20 text-center sm:px-6 lg:px-8" amount={0.3}>
                    <StaggerItem className="space-y-4">
                        <span className="sm:text-xl text-sm font-bold tracking-[0.3em] text-alidade-gold uppercase">Un projet en tête ?</span>
                        <h2 className="serif-display text-3xl font-bold sm:text-4xl">Discutons de vos travaux</h2>
                    </StaggerItem>
                    <StaggerItem>
                        <motion.button
                            onClick={() => onQuoteWithService('un projet de travaux')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                            className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase transition-colors"
                        >
                            <span>Obtenir un devis gratuit</span>
                            <ArrowRight size={16} />
                        </motion.button>
                    </StaggerItem>
                </Stagger>
            </div>
        </section>
    );
}
