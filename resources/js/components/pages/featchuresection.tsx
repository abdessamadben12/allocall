import { Link } from '@/components/localized-link';
import { useLocale } from '@/lib/i18n';
import { ArrowRight, BadgeDollarSign, CheckCircle2, Headphones, HeartHandshake, Target } from 'lucide-react';
import React from 'react';

import { Reveal, Stagger, StaggerItem } from '@/components/motion';
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

const ServiceCard: React.FC<ServiceCardProps> = ({ number, title, icon, description, items, path }) => {
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
            className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-slate-100 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)] transition-shadow duration-300 hover:shadow-[0_20px_60px_rgba(15,23,42,0.12)]"
        >
            {/* GREEN TOP LINE */}
            <div className="absolute top-0 right-0 left-0 h-[5px] bg-[#74B946]" />

            {/* DECORATION */}
            <div className="group-hover:bg-alidade-gold pointer-events-none absolute -top-16 -right-16 h-48 w-48 rounded-full bg-[#74B946]/5 transition-transform duration-500 group-hover:scale-125 group-hover:text-white" />

            {/* HEADER */}
            <div className="relative flex items-start justify-between p-7 pb-5 lg:p-8 lg:pb-5">
                {/* ICON */}

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F8EC] text-[#74B946] transition-all duration-300 group-hover:bg-[#74B946] group-hover:text-white">
                    {icon}
                </div>

                {/* NUMBER */}

                <span className="text-4xl font-black tracking-tight text-gray-200 transition-colors duration-300 group-hover:text-white">
                    {number}
                </span>
            </div>

            {/* CONTENT */}

            <div className="relative flex flex-1 flex-col px-7 pb-8 lg:px-8">
                <h3 className="mb-4 text-xl font-bold text-[#111827] lg:text-2xl">{t(title)}</h3>

                <p className="mb-6 text-sm leading-7 text-slate-500 lg:text-[15px]">{t(description)}</p>

                {/* LIST */}

                <div className="mb-8 space-y-3">
                    {items.map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle2 size={17} className="mt-0.5 shrink-0 text-[#74B946]" />

                            <span className="text-sm text-slate-600">{t(item)}</span>
                        </div>
                    ))}
                </div>

                {/* BUTTON */}

                <div className="mt-auto">
                    <Link
                        href={path}
                        className="group/link inline-flex items-center gap-2 text-sm font-bold text-[#111827] transition-colors duration-300 hover:text-[#74B946]"
                    >
                        {t('Découvrir le service')}
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F1F8EC] text-[#74B946] transition-all duration-300 group-hover/link:bg-[#74B946] group-hover/link:text-white">
                            <ArrowRight size={16} className="transition-transform duration-300 group-hover/link:translate-x-0.5" />
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

const FeatureItem: React.FC<FeatureProps> = ({ icon, title, subtitle }) => {
    const { t } = useLocale();

    return (
        <div className="flex min-w-0 flex-1 basis-[210px] items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#111827] text-[#74B946] shadow-md lg:h-16 lg:w-16">
                {icon}
            </div>

            <div className="min-w-0">
                <h4 className="text-sm font-bold tracking-wide text-[#111827] uppercase lg:text-base">{t(title)}</h4>

                <p className="mt-1 text-xs text-slate-400 lg:text-sm">{t(subtitle)}</p>
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
        <section className="relative overflow-hidden bg-[#F8FAFC] px-4 py-5 sm:px-6 lg:px-8 lg:py-10">
            {/* BACKGROUND DECORATION */}

            <div className="pointer-events-none absolute top-0 right-0 h-[450px] w-[450px] translate-x-1/3 -translate-y-1/3 rounded-full bg-[#74B946]/5 blur-3xl" />

            <div className="relative mx-auto max-w-7xl">
                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <Reveal className="mx-auto mb-14 max-w-3xl text-center">
                    {/* EYEBROW */}

                    <div className="mb-4 flex items-center justify-center gap-3">
                        <span className="h-[2px] w-8 bg-[#74B946]" />

                        <span className="text-xs font-bold tracking-[0.2em] text-[#74B946] uppercase sm:text-sm">{t('NOS EXPERTISES')}</span>

                        <span className="h-[2px] w-8 bg-[#74B946]" />
                    </div>

                    {/* TITLE */}

                    <h2 className="text-3xl leading-tight font-extrabold tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
                        {t('VOTRE RELATION CLIENT,')}
                        <span className="text-[#74B946]">
                            <br /> {t('NOTRE EXPERTISE')}
                        </span>
                    </h2>

                    {/* DESCRIPTION */}

                    <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 whitespace-pre-line text-slate-500 sm:text-base lg:text-lg">
                        {t(
                            "De la réception d'appels à la prospection commerciale, \nAlloCall accompagne votre entreprise à chaque étape de la relation client.",
                        )}
                    </p>
                </Reveal>

                {/* =================================================
                    SERVICES GRID
                ================================================= */}

                <Stagger stagger={0.12} className="mb-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {/* SERVICE 1 */}

                    <StaggerItem className="h-full">
                        <ServiceCard
                            number="01"
                            title={t('Service Client')}
                            icon={<Headphones size={27} />}
                            description={t(
                                'Confiez la gestion de vos demandes clients à une équipe dédiée, professionnelle et orientée satisfaction.',
                            )}
                            items={["Réception d'appels", 'Assistance client', 'Service Desk']}
                            path="/services"
                        />
                    </StaggerItem>

                    {/* SERVICE 2 */}

                    <StaggerItem className="h-full">
                        <ServiceCard
                            number="02"
                            title={t('Téléprospection')}
                            icon={<Target size={27} />}
                            description={t(
                                'Développez votre activité grâce à une prospection téléphonique structurée et adaptée à vos objectifs commerciaux.',
                            )}
                            items={['Prise de rendez-vous', 'Qualification de prospects', 'Relance commerciale']}
                            path="/services"
                        />
                    </StaggerItem>

                    {/* SERVICE 3 */}

                    <StaggerItem className="h-full">
                        <ServiceCard
                            number="03"
                            title={t('Fidélisation Client')}
                            icon={<HeartHandshake size={27} />}
                            description={t('Renforcez la relation avec vos clients grâce à des échanges personnalisés et un suivi régulier.')}
                            items={['Suivi client', 'Enquêtes de satisfaction', 'Reconquête client']}
                            path="/services"
                        />
                    </StaggerItem>

                    {/* SERVICE 4 */}

                    <StaggerItem className="h-full">
                        <ServiceCard
                            number="04"
                            title={t('Télévente')}
                            icon={<BadgeDollarSign size={27} />}
                            description={t(
                                'Transformez vos contacts en opportunités commerciales grâce à des équipes orientées performance et conversion.',
                            )}
                            items={['Vente B2B & B2C', 'Upselling & cross-selling', 'Externalisation commerciale']}
                            path="/services"
                        />
                    </StaggerItem>
                </Stagger>

                {/* =================================================
                    CTA BLOCK
                ================================================= */}
            </div>
        </section>
    );
};

export default EngagementSection;
