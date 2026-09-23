import { useLocale } from '@/lib/i18n';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { type MarketingPage } from '@/data/industry-pages';
import { Link } from '@/components/localized-link';

import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface MarketingContentPageProps {
    page: MarketingPage;
}

export default function MarketingContentPage({
    page,
}: MarketingContentPageProps) {
const { t } = useLocale();

    return (
        <div className="flex min-h-screen flex-col bg-[#FDFCFA] text-[#111827]">
            <SeoHead />
            <Navbar />

            <main className="public-content flex-grow">
                <section className="relative overflow-hidden bg-[#111827] py-16 text-white lg:py-24">
                    <div className="absolute inset-0 bg-gradient-to-b from-[#111827]/35 via-[#111827]/75 to-[#111827]" />
                    <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
                        <Stagger className="space-y-6" amount={0.25}>
                            <StaggerItem>
                                <span className="text-xs font-bold tracking-[0.3em] text-[#74B946] uppercase">
                                    {t(page.eyebrow)}
                                </span>
                            </StaggerItem>
                            <StaggerItem>
                                <h1 className="text-4xl leading-tight font-extrabold uppercase sm:text-5xl">
                                    {t(page.title)}
                                </h1>
                            </StaggerItem>
                            <StaggerItem>
                                <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                                    {t(page.description)}
                                </p>
                            </StaggerItem>
                            <StaggerItem className="flex flex-wrap gap-3">
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 rounded-md bg-[#74B946] px-7 py-4 text-sm font-bold text-white uppercase transition-colors hover:bg-[#659F3B]"
                                >
                                    {t("Parler a un conseiller")}<ArrowRight size={16} />
                                </Link>
                                <Link
                                    href="/devis"
                                    className="inline-flex items-center rounded-md border border-white/20 px-7 py-4 text-sm font-bold text-white uppercase transition-colors hover:border-[#74B946] hover:text-[#74B946]"
                                >
                                    {t("Demander une soumission")}</Link>
                            </StaggerItem>
                        </Stagger>

                        <Reveal className="overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                            <img
                                src={page.image}
                                alt={t(page.title)}
                                className="aspect-[4/3] w-full object-cover"
                                loading="eager"
                                decoding="async"
                            />
                        </Reveal>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="grid gap-8 lg:grid-cols-2">
                        {page.sections.map((section) => (
                            <Reveal
                                key={section.title}
                                className="rounded-xl bg-white p-7 shadow-sm ring-1 ring-gray-100"
                            >
                                <h2 className="text-2xl font-extrabold text-[#111827]">
                                    {t(section.title)}
                                </h2>
                                {section.body && (
                                    <p className="mt-4 text-base leading-8 text-gray-700">
                                        {t(section.body)}
                                    </p>
                                )}
                                {section.items && (
                                    <ul className="mt-6 space-y-3">
                                        {section.items.map((item) => (
                                            <li
                                                key={item}
                                                className="flex gap-3 text-base leading-7 text-gray-700"
                                            >
                                                <CheckCircle2
                                                    size={18}
                                                    className="mt-1 shrink-0 text-[#74B946]"
                                                />
                                                <span>{t(item)}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </Reveal>
                        ))}
                    </div>
                </section>

                <section className="bg-[#111827] px-4 py-16 text-center text-white sm:px-6">
                    <h2 className="text-3xl font-extrabold">
                        {t("Vous voulez adapter cette solution a votre activite ?")}</h2>
                    <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
                        {t("Parlez-nous de vos appels, vos leads et vos rendez-vous. Nous vous aidons a definir ce qui peut etre gere par nos agents, par l IA, ou par les deux.")}</p>
                    <Link
                        href="/contact"
                        className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#74B946] px-7 py-4 text-sm font-bold text-white uppercase transition-colors hover:bg-[#659F3B]"
                    >
                        {t("Nous contacter")}<ArrowRight size={16} />
                    </Link>
                </section>
            </main>

            <Footer />
        </div>
    );
}
