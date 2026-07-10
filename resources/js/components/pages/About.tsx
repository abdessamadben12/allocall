/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { aboutBanner, aboutCraftGrid, aboutCraftHero, aboutProjectOne, aboutProjectThree, aboutProjectTwo } from '@image';
import { Award, Building2, CheckCircle, Compass, Hammer, Shield, Sparkles, Users } from 'lucide-react';

export default function About() {
    const highlights = [
        {
            title: 'Travaux de rénovation',
            description: "Modernisation d'espaces, réhabilitation et mise en valeur des volumes existants avec une exécution propre et contrôlée.",
            icon: Hammer,
        },
        {
            title: 'Atelier finition',
            description: 'Laquage, vernissage, assemblage et contrôle qualité dans un atelier dédié aux finitions exigeantes.',
            icon: Sparkles,
        },
        {
            title: 'Agencement sur mesure',
            description: 'Conception de bureaux, boutiques, cuisines et aménagements intérieurs adaptés à vos contraintes et à votre image.',
            icon: Building2,
        },
    ];

    const values = [
        {
            title: 'Qualité garantie',
            description: 'Des matériaux suivis et des finitions propres à chaque étape.',
            icon: Shield,
        },
        {
            title: 'Équipe expérimentée',
            description: 'Des profils terrain capables de piloter des chantiers complexes.',
            icon: Users,
        },
        {
            title: 'Respect des délais',
            description: 'Un suivi clair du planning et des livrables.',
            icon: CheckCircle,
        },
        {
            title: 'Accompagnement',
            description: "Un interlocuteur unique du brief jusqu'à la réception.",
            icon: Compass,
        },
    ];

    const projects = [
        {
            image: aboutProjectOne,
            title: 'Construction',
            subtitle: 'Structure, coordination et exécution',
        },
        {
            image: aboutProjectTwo,
            title: 'Rénovation',
            subtitle: 'Réhabilitation et remise à niveau',
        },
        {
            image: aboutProjectThree,
            title: 'Agencement & aménagement',
            subtitle: 'Espaces professionnels et commerciaux',
        },
    ];

    return (
        <div className="relative w-full bg-[#FDFCFA] text-alidade-navy">
            <section className="relative overflow-hidden bg-alidade-navy text-white">
                {/* <div className="absolute inset-0">
                    <img
                        src={aboutBanner}
                        alt="Bannière À propos Alidade"
                        className="h-full w-full object-cover opacity-40"
                        fetchPriority="high"
                        decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-alidade-navy/75 via-alidade-navy/60 to-alidade-navy/75" />
                </div> */}

                <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8 lg:py-32">
                    <Stagger className="mx-auto max-w-3xl space-y-6 text-center" amount={0.3}>
                        <StaggerItem className="inline-flex items-center gap-3 text-alidade-gold">
                            <span className="h-px w-8 bg-alidade-gold" />
                            <span className="sm:text-xl xl:text-xl 2xl:text-xl  text-sm font-bold tracking-[0.35em] uppercase">Notre histoire</span>
                            <span className="h-px w-8 bg-alidade-gold" />
                        </StaggerItem>
                        <StaggerItem>
                            <h1 className="serif-display text-nowrap text-3xl leading-[1.1] font-bold text-white sm:text-4xl lg:text-5xl">
                                Construire avec intention
                            </h1>
                        </StaggerItem>
                        <StaggerItem>
                            <p className="mx-auto max-w-2xl text-base leading-relaxed font-light text-white/75 sm:text-lg">
                                Alidade conçoit, coordonne et réalise des projets de rénovation, d'agencement et de second œuvre. Un interlocuteur
                                unique, des finitions maîtrisées, une exigence constante.
                            </p>
                        </StaggerItem>
                    </Stagger>
                </div>
            </section>

            <section className="relative z-10">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <Reveal className="relative overflow-hidden rounded-2xl shadow-lg" y={36}>
                            <img
                                src={aboutCraftHero}
                                alt="Atelier Alidade"
                                className="aspect-[4/5] h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-alidade-navy/50 via-transparent to-transparent" />

                            <div className="absolute top-6 left-6 flex items-center gap-3 rounded-xl bg-white p-4 shadow-lg">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#003366] text-alidade-gold">
                                    <Award size={20} />
                                </div>
                                <div>
                                    <div className="text-xl font-bold text-alidade-navy">20+</div>
                                    <div className="text-[9px] font-semibold tracking-[0.2em] text-alidade-muted uppercase">Ans d'expérience</div>
                                </div>
                            </div>
                        </Reveal>

                        <Reveal className="space-y-6" delay={0.15}>
                            <div className="space-y-3">
                                <div className="inline-block">
                                    <span className="sm:text-xl text-sm font-bold tracking-[0.3em] text-[#003366] uppercase">Qui sommes-nous</span>
                                </div>
                                <h2 className="serif-display text-4xl leading-tight font-bold text-alidade-navy sm:text-5xl">Une équipe, une vision</h2>
                            </div>

                            <p className="text-base leading-relaxed text-alidade-muted">
                                Alidade prend en charge les projets de second œuvre, de réhabilitation et d'aménagement d'espaces professionnels ou
                                résidentiels. Nous coordonnons les corps de métier, sécurisons l'exécution et maintenons la cohérence esthétique du
                                premier croquis jusqu'à la livraison.
                            </p>

                            <div className="space-y-3 pt-4">
                                {highlights.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.title} className="group flex gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg  text-alidade-gold transition-colors ">
                                                <Icon size={18} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-sm font-bold text-alidade-navy">{item.title}</h4>
                                                <p className="mt-1 text-xs leading-5 text-alidade-muted">{item.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="bg-[#F9F7F3]">
                <div className="mx-auto max-w-6xl px-4 py- sm:px-6 sm:py-18 lg:px-8">
                    <Reveal className="mb-16 text-center">
                        <span className="sm:text-xl text-sm  font-bold tracking-[0.3em] text-[#003366] uppercase">Nos domaines</span>
                        <h2 className="serif-display mt-3 text-4xl font-bold text-alidade-navy sm:text-5xl">Ce que nous construisons</h2>
                    </Reveal>

                    <Stagger stagger={0.15} className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        {projects.map((project, index) => (
                            <StaggerItem key={project.title} className="h-full">
                            <article
                                className="group h-full overflow-hidden rounded-xl bg-white shadow-md transition-shadow hover:shadow-xl"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-[#F9F7F3]">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-alidade-navy/40 via-transparent to-transparent" />
                                </div>
                                <div className="p-5">
                                    <h4 className="text-sm font-bold tracking-wide text-alidade-navy uppercase">{project.title}</h4>
                                    <p className="mt-2 text-xs leading-5 text-alidade-muted">{project.subtitle}</p>
                                </div>
                            </article>
                            </StaggerItem>
                        ))}
                    </Stagger>
                </div>
            </section>

            <section className="bg-white">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
                    <Reveal className="mb-16 text-center">
                        <span className="sm:text-xl text-sm  font-bold tracking-[0.3em] text-[#003366] uppercase">Nos valeurs</span>
                        <h2 className="serif-display mt-3 text-4xl font-bold text-alidade-navy sm:text-5xl">Ce en quoi nous croyons</h2>
                    </Reveal>

                    <Stagger stagger={0.12} className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((item) => {
                            const Icon = item.icon;
                            return (
                                <StaggerItem key={item.title} className="h-full rounded-lg bg-[#ffffff] p-6 transition-colors hover:bg-[#F3EDE4]">
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-alidade-navy text-alidade-gold">
                                        <Icon size={20} />
                                    </div>
                                    <h4 className="text-sm font-bold tracking-wide text-alidade-navy uppercase">{item.title}</h4>
                                    <p className="mt-3 text-xs leading-5 text-alidade-muted">{item.description}</p>
                                </StaggerItem>
                            );
                        })}
                    </Stagger>
                </div>
            </section>

            <section className="bg-alidade-navy text-white">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        <Reveal className="order-2 space-y-6 lg:order-1">
                            <div className="space-y-3">
                                <h2 className="serif-display text-4xl leading-tight font-bold sm:text-5xl">Finitions premium, équipes alignées</h2>
                            </div>

                            <p className="text-base leading-relaxed text-white/70">
                                L'atelier centralise la préparation, l'assemblage et les finitions pour réduire les écarts entre conception et
                                réalisation. Cette méthode donne un meilleur contrôle sur les délais, la qualité et la cohérence des détails.
                            </p>
                        </Reveal>

                        <Reveal className="relative order-1 aspect-[4/3] overflow-hidden rounded-xl shadow-2xl lg:order-2" delay={0.15}>
                            <img
                                src={aboutCraftGrid}
                                alt="Finitions et agencement"
                                className="h-full w-full object-cover"
                                loading="lazy"
                                decoding="async"
                            />
                            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-alidade-navy/20 to-alidade-navy/40" />
                        </Reveal>
                    </div>
                </div>
            </section>
        </div>
    );
}
