import { EASE, Reveal, Stagger, StaggerItem } from '@/components/motion';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { getServiceBySlug, services } from '@/data/services';
import { Link } from '@/components/localized-link';

import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServiceShowProps {
    slug: string;
}

export default function ServiceShowPage({ slug }: ServiceShowProps) {
    const service = getServiceBySlug(slug);

    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#FDFCFA]">
            <SeoHead />
            <Navbar />

            <main className="public-content flex-grow">
                {!service ? (
                    <section className="mx-auto max-w-3xl px-4 py-28 text-center sm:px-6">
                        <span className="text-xs font-bold tracking-[0.3em] text-[#74B946] uppercase">Page introuvable</span>
                        <h1 className="text-alidade-navy mt-4 text-4xl font-bold">Ce service n'existe pas.</h1>
                        <p className="mt-4 text-sm font-light text-gray-500">
                            Le lien est peut-etre ancien ou mal orthographie. Retrouvez l'ensemble de nos services.
                        </p>
                        <Link
                            href="/services"
                            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#74B946] px-8 py-4 text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#659F3B]"
                        >
                            <ArrowLeft size={16} />
                            <span>Voir tous nos services</span>
                        </Link>
                    </section>
                ) : (
                    <>
                        <section className="relative overflow-hidden bg-[#111827] py-16 text-white sm:py-24">
                            <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/40 via-[#111827]/70 to-[#111827]" />
                            <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                                <Stagger className="space-y-6" amount={0.3}>
                                    <StaggerItem>
                                        <span className="text-xs font-bold tracking-[0.28em] text-[#74B946] uppercase">Service ALLO CALL</span>
                                    </StaggerItem>
                                    <StaggerItem>
                                        <h1 className="text-4xl leading-[1.1] font-extrabold sm:text-5xl lg:text-6xl">{service.title}</h1>
                                    </StaggerItem>
                                    <StaggerItem>
                                        <p className="max-w-xl text-base leading-relaxed font-light text-white/82 lg:text-lg">
                                            {service.description}
                                        </p>
                                    </StaggerItem>
                                    <StaggerItem className="flex flex-wrap gap-3 pt-2">
                                        <Link
                                            href={`/devis?service=${encodeURIComponent(service.title)}`}
                                            className="inline-flex items-center gap-2 rounded-lg bg-[#74B946] px-7 py-4 text-sm font-bold tracking-wider text-white uppercase transition-colors hover:bg-[#659F3B]"
                                        >
                                            <span>Demander une soumission gratuite</span>
                                            <ArrowRight size={16} />
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-7 py-4 text-sm font-bold tracking-wider text-white uppercase transition-colors hover:border-[#74B946] hover:text-[#74B946]"
                                        >
                                            Nous contacter
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
                                        loading="eager"
                                        fetchPriority="high"
                                        decoding="async"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent" />
                                </motion.div>
                            </div>
                        </section>

                        <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6 lg:py-20">
                            <Reveal>
                                <p className="text-lg leading-8 text-[#1F2937] sm:text-xl">{service.intro}</p>
                            </Reveal>
                        </section>

                        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
                            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
                                <div className="space-y-8">
                                    {service.sections.map((section) => (
                                        <Reveal key={section.title} className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-gray-100 sm:p-9">
                                            <h2 className="text-2xl font-extrabold text-[#111827]">{section.title}</h2>
                                            {section.body && <p className="mt-4 text-base leading-8 text-gray-700">{section.body}</p>}
                                            {section.items && (
                                                <Stagger stagger={0.05} className="mt-6 space-y-4">
                                                    {section.items.map((item) => (
                                                        <StaggerItem key={item} className="flex gap-3" y={10}>
                                                            <CheckCircle2 size={19} className="mt-1 shrink-0 text-[#74B946]" />
                                                            <span data-public-body className="text-base leading-7 text-gray-700">
                                                                {item}
                                                            </span>
                                                        </StaggerItem>
                                                    ))}
                                                </Stagger>
                                            )}
                                        </Reveal>
                                    ))}
                                </div>

                                <aside className="h-fit rounded-xl bg-[#111827] p-7 text-white shadow-xl lg:sticky lg:top-8">
                                    <h2 className="text-2xl font-extrabold">{service.ctaTitle}</h2>
                                    <p className="mt-4 text-sm leading-7 text-white/75">{service.ctaBody}</p>
                                    <div className="mt-7 space-y-3">
                                        <Link
                                            href={`/devis?service=${encodeURIComponent(service.title)}`}
                                            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#74B946] px-5 py-3 text-sm font-bold text-white uppercase transition-colors hover:bg-[#659F3B]"
                                        >
                                            Demander une soumission gratuite
                                        </Link>
                                        <Link
                                            href="/contact"
                                            className="flex w-full items-center justify-center rounded-md border border-white/15 px-5 py-3 text-sm font-bold text-white uppercase transition-colors hover:border-[#74B946] hover:text-[#74B946]"
                                        >
                                            Nous contacter
                                        </Link>
                                    </div>
                                </aside>
                            </div>
                        </section>

                        <section className="bg-[#F9F7F3]">
                            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
                                <Reveal className="mb-8">
                                    <h2 className="text-3xl font-extrabold text-[#111827]">Autres services</h2>
                                </Reveal>
                                <div className="flex flex-wrap gap-3">
                                    {services
                                        .filter((s) => s.slug !== service.slug)
                                        .map((s) => (
                                            <Link
                                                key={s.slug}
                                                href={`/services/${s.slug}`}
                                                className="rounded-md border border-gray-200 bg-white px-5 py-2.5 text-sm font-bold text-[#111827] uppercase transition-colors hover:border-[#74B946] hover:text-[#74B946]"
                                            >
                                                {s.title}
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        </section>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
