import { Link } from '@/components/localized-link';
import { useLocale } from '@/lib/i18n';

import {
    ArrowRight,
    BadgeDollarSign,
    CheckCircle2,
    Headphones,
    HeartHandshake,
    Target,
} from 'lucide-react';

import React from 'react';

import {
    Reveal,
    Stagger,
    StaggerItem,
} from '@/components/motion';

import { motion } from 'framer-motion';

/* =========================================================
   TYPES
========================================================= */

interface ServiceCardProps {
    number: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    items: string[];
    path: string;
}

interface FeatureProps {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
}

/* =========================================================
   SERVICE CARD
========================================================= */

const ServiceCard: React.FC<ServiceCardProps> = ({
    number,
    title,
    icon,
    description,
    items,
    path,
}) => {
    const { t } = useLocale();

    return (
        <motion.div
            whileHover={{
                y: -8,
            }}
            transition={{
                type: 'spring',
                stiffness: 300,
                damping: 22,
            }}
            className="
                group
                relative
                flex
                h-full
                flex-col
                overflow-hidden
                rounded-[28px]
                border
                border-slate-100
                bg-white
                shadow-[0_10px_40px_rgba(15,23,42,0.06)]
                transition-shadow
                duration-300
                hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]
            "
        >
            {/* GREEN TOP LINE */}

            <div className="absolute top-0 right-0 left-0 h-[5px] bg-[#74B946]" />

            {/* DECORATION */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-16
                    -right-16
                    h-48
                    w-48
                    rounded-full
                    bg-[#74B946]/5
                    transition-transform
                    duration-500
                    group-hover:scale-125
                    group-hover:bg-[#74B946]
                    group-hover:text-white
                "
            />

            {/* HEADER */}

            <div className="relative flex items-start justify-between p-7 pb-5 lg:p-8 lg:pb-5">

                {/* ICON */}

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-[#F1F8EC]
                        text-[#74B946]
                        transition-all
                        duration-300
                        group-hover:bg-[#74B946]
                        group-hover:text-white
                    "
                >
                    {icon}
                </div>

                {/* NUMBER */}

                <span
                    className="
                        text-4xl
                        font-black
                        tracking-tight
                        text-gray-200
                        transition-colors
                        duration-300
                        group-hover:text-white
                    "
                >
                    {number}
                </span>
            </div>

            {/* CONTENT */}

            <div className="relative flex flex-1 flex-col px-7 pb-8 lg:px-8">

                <h3 className="mb-4 text-xl font-bold text-[#111827] lg:text-2xl">
                    {t(title)}
                </h3>

                <p className="mb-6 text-sm leading-7 text-slate-500 lg:text-[15px]">
                    {t(description)}
                </p>

                {/* LIST */}

                <div className="mb-8 space-y-3">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-start gap-3"
                        >
                            <CheckCircle2
                                size={17}
                                className="mt-0.5 shrink-0 text-[#74B946]"
                            />

                            <span className="text-sm text-slate-600">
                                {t(item)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* BUTTON */}

                <div className="mt-auto">
                    <Link
                        href={path}
                        className="
                            group/link
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-bold
                            text-[#111827]
                            transition-colors
                            duration-300
                            hover:text-[#74B946]
                        "
                    >
                        {t('Découvrir le service')}

                        <span
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-full
                                bg-[#F1F8EC]
                                text-[#74B946]
                                transition-all
                                duration-300
                                group-hover/link:bg-[#74B946]
                                group-hover/link:text-white
                            "
                        >
                            <ArrowRight
                                size={16}
                                className="
                                    transition-transform
                                    duration-300
                                    group-hover/link:translate-x-0.5
                                "
                            />
                        </span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

/* =========================================================
   FEATURE ITEM
========================================================= */

const FeatureItem: React.FC<FeatureProps> = ({
    icon,
    title,
    subtitle,
}) => {
    const { t } = useLocale();

    return (
        <div className="flex min-w-0 flex-1 basis-[210px] items-center gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[#74B946] shadow-md lg:h-16 lg:w-16">
                {icon}
            </div>

            <div className="min-w-0">

                <h4 className="text-sm font-bold tracking-wide text-[#111827] uppercase lg:text-base">
                    {t(title)}
                </h4>

                <p className="mt-1 text-xs text-slate-400 lg:text-sm">
                    {t(subtitle)}
                </p>

            </div>
        </div>
    );
};

/* =========================================================
   MAIN SECTION
========================================================= */

export const EngagementSection: React.FC = () => {
    const { t } = useLocale();

    return (
        <section
            className="
                relative
                overflow-hidden
                bg-[#F8FAFC]
                px-4
                py-12
                sm:px-6
                lg:px-8
                lg:py-20
            "
        >

            {/* BACKGROUND DECORATION */}

            <div
                className="
                    pointer-events-none
                    absolute
                    top-0
                    right-0
                    h-[450px]
                    w-[450px]
                    translate-x-1/3
                    -translate-y-1/3
                    rounded-full
                    bg-[#74B946]/5
                    blur-3xl
                "
            />

            <div className="relative mx-auto max-w-7xl">

                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <Reveal className="mx-auto mb-14 max-w-3xl text-center">

                    {/* EYEBROW */}

                    <div className="mb-4 flex items-center justify-center gap-3">

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
                            {t('NOS SERVICES')}
                        </span>

                        <span className="h-[2px] w-8 bg-[#74B946]" />

                    </div>

                    {/* TITLE */}

                    <h2
                        className="
                            text-3xl
                            leading-tight
                            font-extrabold
                            tracking-tight
                            text-[#111827]
                            sm:text-4xl
                            lg:text-5xl
                        "
                    >
                        {t('UNE ÉQUIPE POUR')}

                        <span className="text-[#74B946]">
                            <br />
                            {t('CHAQUE INTERACTION CLIENT')}
                        </span>
                    </h2>

                    {/* DESCRIPTION */}

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-7
                            whitespace-pre-line
                            text-slate-500
                            sm:text-base
                            lg:text-lg
                        "
                    >
                        {t(
                            "De la réception téléphonique à la prospection commerciale, \nALLO CALL accompagne les entreprises du Québec et du Canada pour mieux répondre aux clients, qualifier les prospects et générer davantage d'occasions d'affaires.",
                        )}
                    </p>

                </Reveal>

                {/* =================================================
                    SERVICES GRID
                ================================================= */}

                <Stagger
                    stagger={0.12}
                    className="
                        mb-16
                        grid
                        grid-cols-1
                        gap-6
                        md:grid-cols-2
                        xl:grid-cols-4
                    "
                >

                    {/* SERVICE 1 */}

                    <StaggerItem className="h-full">

                        <ServiceCard
                            number="01"
                            title="Service à la clientèle"
                            icon={
                                <Headphones size={27} />
                            }
                            description="Offrez à vos clients une réponse rapide, courtoise et professionnelle grâce à une équipe qui agit comme une extension de votre entreprise."
                            items={[
                                "Réception d'appels",
                                'Soutien à la clientèle',
                                'Suivi des demandes',
                            ]}
                            path="/services/service-clientele"
                        />

                    </StaggerItem>

                    {/* SERVICE 2 */}

                    <StaggerItem className="h-full">

                        <ServiceCard
                            number="02"
                            title="Prospection téléphonique"
                            icon={
                                <Target size={27} />
                            }
                            description="Développez votre clientèle grâce à des campagnes de prospection structurées, adaptées à votre marché et à vos objectifs commerciaux."
                            items={[
                                'Prise de rendez-vous',
                                'Qualification de prospects',
                                'Relance commerciale',
                            ]}
                            path="/services/televente"
                        />

                    </StaggerItem>

                    {/* SERVICE 3 */}

                    <StaggerItem className="h-full">

                        <ServiceCard
                            number="03"
                            title="Fidélisation et suivi client"
                            icon={
                                <HeartHandshake size={27} />
                            }
                            description="Maintenez une relation durable avec vos clients grâce à des suivis personnalisés, des rappels et une communication régulière."
                            items={[
                                'Suivi client',
                                'Enquêtes de satisfaction',
                                'Réactivation des clients',
                            ]}
                            path="/services"
                        />

                    </StaggerItem>

                    {/* SERVICE 4 */}

                    <StaggerItem className="h-full">

                        <ServiceCard
                            number="04"
                            title="Télévente"
                            icon={
                                <BadgeDollarSign size={27} />
                            }
                            description="Confiez vos appels commerciaux à une équipe dédiée qui présente votre offre, qualifie les besoins et transforme davantage de prospects en occasions d'affaires."
                            items={[
                                'Vente B2B & B2C',
                                'Présentation de votre offre',
                                'Suivi des prospects',
                            ]}
                            path="/services/televente"
                        />

                    </StaggerItem>

                </Stagger>

                {/* =================================================
                    CTA BLOCK
                ================================================= */}

                <Reveal>
                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-[32px]
                            bg-[#111827]
                            px-6
                            py-10
                            text-white
                            sm:px-10
                            lg:flex
                            lg:items-center
                            lg:justify-between
                            lg:px-14
                            lg:py-12
                        "
                    >

                        {/* DECORATION */}

                        <div
                            className="
                                pointer-events-none
                                absolute
                                -top-24
                                right-0
                                h-72
                                w-72
                                rounded-full
                                bg-[#74B946]/10
                                blur-3xl
                            "
                        />

                        <div className="relative max-w-2xl">

                            <span
                                className="
                                    text-xs
                                    font-bold
                                    tracking-[0.18em]
                                    text-[#74B946]
                                    uppercase
                                    sm:text-sm
                                "
                            >
                                {t('UNE SOLUTION ADAPTÉE À VOTRE ENTREPRISE')}
                            </span>

                            <h3
                                className="
                                    mt-3
                                    text-2xl
                                    leading-tight
                                    font-extrabold
                                    sm:text-3xl
                                    lg:text-4xl
                                "
                            >
                                {t(
                                    'Vous avez des appels, des prospects ou des rendez-vous à gérer ?',
                                )}
                            </h3>

                            <p
                                className="
                                    mt-4
                                    max-w-xl
                                    text-sm
                                    leading-7
                                    text-slate-300
                                    sm:text-base
                                "
                            >
                                {t(
                                    'Parlez-nous de vos besoins. Nous vous proposerons une solution adaptée à votre volume, votre secteur et vos objectifs.',
                                )}
                            </p>

                        </div>

                        <div className="relative mt-8 shrink-0 lg:mt-0 lg:pl-10">

                            <Link
                                href="/contact"
                                className="
                                    group
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-3
                                    rounded-xl
                                    bg-[#74B946]
                                    px-7
                                    py-4
                                    text-sm
                                    font-bold
                                    text-white
                                    transition-all
                                    duration-300
                                    hover:bg-[#659F3B]
                                "
                            >
                                {t('Demander une soumission')}

                                <ArrowRight
                                    size={18}
                                    className="
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                />
                            </Link>

                        </div>

                    </div>
                </Reveal>

            </div>
        </section>
    );
};

export default EngagementSection;