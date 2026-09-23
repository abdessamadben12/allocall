import { Link } from '@/components/localized-link';
import { EASE, Reveal } from '@/components/motion';
import { useLocale } from '@/lib/i18n';

import { motion } from 'framer-motion';
import { ArrowRight, CalendarCheck, PhoneCall, Target, Users } from 'lucide-react';
import React from 'react';

/* =========================================================
   TYPES
========================================================= */

interface ServiceItem {
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    icon: React.ReactNode;
}

const callCenterImage = '/images/hero/allocall-call-center.webp';
const aiImage = '/images/hero/allocall-ai.webp';
const salesImage = '/images/hero/allocall-sales.webp';
const imageConfiramtion = '/images/services/confirmation-rendez-vous.webp';
const imageGestionLeads = '/images/services/gestion-leads.webp';
const imageTelevente = '/images/services/televente-appels-sortants.webp';
const imageAssistance = '/images/services/assistante-virtuelle.webp';
const imagePriseRendezVous = '/images/services/prise-rendez-vous.webp';
const imageServiceClientele = '/images/services/service-clientele.webp';
const imageReceptionnTele = '/images/services/reception-telephonique.webp';
const imageSupportClient = '/images/services/support-technique-niveau-1.webp';

/* =========================================================
   4 SERVICES MIS EN AVANT
========================================================= */

const featuredServices: ServiceItem[] = [
    {
        slug: 'assistants-virtuels',
        title: 'Assistants virtuels',
        description: 'Une équipe à distance pour gérer vos appels, courriels, tâches administratives et suivis.',
        imageUrl: imageAssistance,
        icon: <Users size={23} />,
    },

    {
        slug: 'televente-appels-sortants',
        title: 'Télévente et appels sortants',
        description: 'Des agents commerciaux pour contacter vos prospects, présenter vos services et générer des opportunités.',
        imageUrl: imageTelevente,
        icon: <PhoneCall size={23} />,
    },

    {
        slug: 'gestion-leads',
        title: 'Gestion de leads',
        description: 'Qualification, suivi et relance de vos prospects afin de réduire les occasions perdues.',
        imageUrl: imageGestionLeads,
        icon: <Target size={23} />,
    },

    {
        slug: 'prise-rendez-vous',
        title: 'Prise de rendez-vous',
        description: 'Nos agents contactent vos prospects et clients et planifient directement les rendez-vous dans votre calendrier.',
        imageUrl: imagePriseRendezVous,
        icon: <CalendarCheck size={23} />,
    },
];

/* =========================================================
   SERVICE CARD
========================================================= */

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
    const { t } = useLocale();

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{
                once: true,
                amount: 0.3,
            }}
            variants={{
                hidden: {
                    opacity: 0,
                    y: 45,
                },

                visible: {
                    opacity: 1,
                    y: 0,

                    transition: {
                        duration: 0.65,
                        ease: EASE,
                    },
                },
            }}
        >
            <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-auto items-stretch overflow-hidden rounded-2xl border border-gray-100 bg-[#F8FAFC] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#74B946]/20 hover:shadow-xl sm:h-[150px] lg:h-[150px]"
            >
                {/* NUMBER */}

                <div className="relative flex w-20 shrink-0 items-center justify-center border-r border-gray-100 sm:w-28">
                    {/* LEFT GREEN LINE */}

                    <div className="absolute top-0 bottom-0 left-0 w-[4px] bg-[#74B946] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <span className="text-3xl font-black text-gray-200 transition-colors duration-300 group-hover:text-[#74B946] sm:text-5xl">
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </div>

                {/* CONTENT */}

                <div className="flex min-w-0 flex-grow items-center gap-4 px-5 py-6 sm:px-7 lg:px-8">
                    {/* ICON */}

                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#EFF8E9] text-[#74B946] transition-all duration-300 group-hover:bg-[#74B946] group-hover:text-white md:flex">
                        {service.icon}
                    </div>

                    {/* TEXT */}

                    <div className="min-w-0 flex-1">
                        <h4 className="text-base font-bold tracking-wide text-[#111827] uppercase transition-colors duration-300 group-hover:text-[#74B946] sm:text-xl lg:text-2xl">
                            {t(service.title)}
                        </h4>

                        {/* DESCRIPTION */}

                        <motion.div
                            className="overflow-hidden"
                            variants={{
                                hidden: {
                                    height: 0,
                                    opacity: 0,
                                    marginTop: 0,
                                },

                                visible: {
                                    height: 'auto',
                                    opacity: 1,
                                    marginTop: 6,

                                    transition: {
                                        duration: 0.7,
                                        delay: 0.2,
                                        ease: EASE,
                                    },
                                },
                            }}
                        >
                            <p className="max-w-3xl text-xs leading-6 font-light text-gray-500 sm:text-sm lg:text-base">{t(service.description)}</p>
                        </motion.div>
                    </div>
                </div>

                {/* IMAGE */}

                <div className="relative hidden h-full w-[32%] max-w-[330px] shrink-0 overflow-hidden sm:block">
                    <img
                        src={service.imageUrl}
                        alt={t(service.title)}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                {/* MOBILE ARROW */}

                <span className="mr-4 flex items-center self-center text-[#74B946] sm:hidden">
                    <ArrowRight size={19} />
                </span>
            </Link>
        </motion.div>
    );
}

/* =========================================================
   SERVICES SECTION
========================================================= */

export default function MetiersSection() {
    const { t } = useLocale();

    return (
        <section className="relative overflow-hidden border-t border-gray-100 bg-white py-5 lg:py-10">
            {/* BACKGROUND DECORATION */}

            <div className="pointer-events-none absolute top-0 right-0 h-[400px] w-[400px] translate-x-1/2 -translate-y-1/2 rounded-full bg-[#74B946]/5 blur-3xl" />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* =================================================
                    HEADER
                ================================================= */}

                <Reveal className="mx-auto max-w-3xl text-center">
                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-[2px] w-8 bg-[#74B946]" />

                        <span className="text-xs font-bold tracking-[0.2em] text-[#74B946] uppercase sm:text-sm">{t('Nos services')}</span>

                        <span className="h-[2px] w-8 bg-[#74B946]" />
                    </div>

                    <h3 className="text-3xl leading-tight font-extrabold tracking-tight text-[#111827] uppercase sm:text-4xl lg:text-5xl">
                        {t('Des solutions pour')}
                        <span className="text-[#74B946]">
                            <br /> {t('votre relation client')}
                        </span>
                    </h3>

                    <p className="max-w-3xl text-xs leading-6 font-light text-gray-500 sm:text-sm lg:text-base">
                        {t(
                            'AlloCall accompagne votre entreprise avec des équipes dédiées pour gérer vos appels, développer vos ventes et transformer davantage de prospects en clients.',
                        )}
                    </p>
                </Reveal>

                {/* =================================================
                    ONLY 4 SERVICES
                ================================================= */}

                <div className="mt-14 space-y-5">
                    {featuredServices.map((service, index) => (
                        <ServiceCard key={service.slug} service={service} index={index} />
                    ))}
                </div>

                {/* =================================================
                    DISCOVER BUTTON
                ================================================= */}

                <Reveal className="mt-12 text-center" delay={0.15}>
                    <Link
                        href="/services"
                        className="group inline-flex items-center gap-3 rounded-md bg-[#74B946] px-8 py-4 text-xs font-bold tracking-widest text-white uppercase shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#659F3B] hover:shadow-xl sm:text-sm"
                    >
                        <span>{t('Découvrir tous nos services')}</span>

                        <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
