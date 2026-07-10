import { EASE, Reveal, Stagger, StaggerItem } from '@/components/motion';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { services } from '@/data/services';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServiceShowProps {
    slug: string;
}

export default function ServiceShowPage({ slug }: ServiceShowProps) {
    const service = services.find((s) => s.slug === slug);

    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#FDFCFA]">
            <SeoHead
                title={service ? `${service.title} | Alidade Casablanca` : 'Service introuvable | Alidade'}
                description={service?.description ?? "Ce service n'existe pas ou a été déplacé."}
                keywords={service ? [service.title, 'Alidade Casablanca', 'travaux Maroc'] : ['Alidade']}
                image={service?.imageUrl}
            />
            <Navbar />

            <main className="flex-grow">
                {!service ? (
                    <section className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
                        <span className="text-alidade-gold-dark text-xs font-bold tracking-[0.3em] uppercase">Page introuvable</span>
                        <h1 className="serif-display mt-4 text-4xl font-bold text-alidade-navy">Ce service n'existe pas.</h1>
                        <p className="mt-4 text-sm font-light text-gray-500">
                            Le lien est peut-être ancien ou mal orthographié. Retrouvez l'ensemble de nos prestations sur la page savoir-faire.
                        </p>
                        <Link
                            href="/savoir-faire"
                            className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy mt-8 inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase transition-colors"
                        >
                            <ArrowLeft size={16} />
                            <span>Voir tous nos services</span>
                        </Link>
                    </section>
                ) : (
                    <>
                        {/* Hero */}
                        <div className="relative overflow-hidden bg-alidade-navy py-16 text-white sm:py-24">
                            <div className="absolute inset-0 bg-gradient-to-b from-alidade-navy/50 via-alidade-navy/70 to-alidade-navy" />
                            <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                                <Stagger className="space-y-6" amount={0.3}>
                                    <StaggerItem>
                                        <h1 className="serif-display text-4xl leading-[1.1] font-bold sm:text-5xl lg:text-6xl">{service.title}</h1>
                                    </StaggerItem>
                                    <StaggerItem>
                                        <p className="max-w-xl text-base leading-relaxed font-light text-white/80 lg:text-lg">
                                            {service.description}
                                        </p>
                                    </StaggerItem>
                                    <StaggerItem className="pt-2">
                                        <Link
                                            href={`/devis?service=${encodeURIComponent(service.title)}`}
                                            className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase transition-colors"
                                        >
                                            <span>Obtenir un devis gratuit</span>
                                            <ArrowRight size={16} />
                                        </Link>
                                    </StaggerItem>
                                </Stagger>

                                <motion.div
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
                                    className="group relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10"
                                >
                                    <img
                                        src={service.imageUrl}
                                        alt={service.title}
                                        className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        referrerPolicy="no-referrer"
                                        loading="eager"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-alidade-navy/60 via-transparent to-transparent" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Détails de la prestation */}
                        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
                            <Reveal className="space-y-8">
                                <h2 className="serif-display text-3xl font-bold text-alidade-navy md:text-4xl xl:text-5xl">Ce que nous réalisons</h2>
                                <Stagger stagger={0.08} className="space-y-5" amount={0.1}>
                                    {service.details.map((detail) => (
                                        <StaggerItem key={detail} y={16} className="flex items-start gap-3">
                                            <CheckCircle2 size={20} className="text-alidade-gold-dark mt-0.5 shrink-0" />
                                            <span className="text-alidade-text text-base leading-relaxed lg:text-lg">{detail}</span>
                                        </StaggerItem>
                                    ))}
                                </Stagger>
                            </Reveal>

                            <Reveal className="h-fit rounded-2xl bg-[#F9F7F3] p-8 sm:p-10" delay={0.15}>
                                <span className="text-alidade-gold-dark sm:text-xl text-sm  font-bold tracking-[0.3em] uppercase">Matériaux & garanties</span>
                                <ul className="mt-6 space-y-4">
                                    {service.materials.map((material) => (
                                        <li
                                            key={material}
                                            className="border-alidade-navy/10 text-alidade-navy border-b pb-4 text-base leading-relaxed lg:text-lg"
                                        >
                                            {material}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        </div>

                        {/* Réalisations */}
                        <div className="bg-[#F9F7F3]">
                            <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                                <Reveal className="mb-12 space-y-3 text-center">
                                    <span className="text-alidade-gold-dark text-sm sm:text-xl font-bold tracking-[0.3em] uppercase">Réalisations</span>
                                    <h2 className="serif-display text-3xl font-bold text-alidade-navy sm:text-4xl xl:text-5xl">Nos chantiers en images</h2>
                                </Reveal>

                                <Stagger stagger={0.12} amount={0.05} className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                    {service.gallery.map((photo) => (
                                        <StaggerItem key={photo.src} className="group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
                                            <img
                                                src={photo.src}
                                                alt={photo.caption}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                referrerPolicy="no-referrer"
                                                loading="lazy"
                                                decoding="async"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-alidade-navy/70 via-transparent to-transparent" />
                                            <div className="absolute right-0 bottom-0 left-0 p-5 text-left">
                                                <span className="text-xs font-bold tracking-widest text-alidade-gold uppercase">
                                                    {service.title}
                                                </span>
                                                <h3 className="mt-0.5 text-base font-bold text-white lg:text-lg">{photo.caption}</h3>
                                            </div>
                                        </StaggerItem>
                                    ))}
                                </Stagger>

                                <Reveal className="mt-10 text-center" y={16}>
                                    <Link
                                        href="/devis"
                                        className="text-alidade-navy hover:text-alidade-gold-dark border-alidade-navy/10 hover:border-alidade-gold inline-flex items-center gap-2.5 border-b-2 pb-1.5 text-sm font-bold tracking-widest uppercase transition-all duration-300"
                                    >
                                        <span>Demander un devis gratuit</span>
                                        <ArrowRight size={15} />
                                    </Link>
                                </Reveal>
                            </div>
                        </div>

                        {/* Autres services */}
                        <div className="border-t border-gray-100 bg-white">
                            <Reveal className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                                <h2 className="serif-display text-3xl font-bold text-alidade-navy xl:text-4xl">Nos autres métiers</h2>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    {services
                                        .filter((s) => s.slug !== service.slug)
                                        .map((s) => (
                                            <Link
                                                key={s.slug}
                                                href={`/services/${s.slug}`}
                                                className="text-alidade-navy hover:border-alidade-gold hover:text-alidade-gold-dark border-alidade-navy/15 rounded-lg border px-5 py-2.5 text-sm font-bold tracking-wider uppercase transition-colors"
                                            >
                                                {s.title}
                                            </Link>
                                        ))}
                                </div>
                            </Reveal>
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
