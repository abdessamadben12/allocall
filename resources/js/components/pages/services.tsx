import { Link } from '@/components/localized-link';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { services } from '@/data/services';
import { useLocale } from '@/lib/i18n';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface ServicesGridProps {
    onQuoteWithService: (serviceName: string) => void;
}

const serviceOverview = [
    {
        slug: 'assistants-virtuels',
        title: 'Assistante virtuelle',
        description:
            "Vous croulez sous les appels, les courriels et les tâches administratives ? Notre assistante virtuelle prend le relais pour vous permettre de vous concentrer sur l'essentiel. Une solution flexible et professionnelle, pensée pour les entreprises du Québec.",
        icon: '/Icons/Icon1.svg',
    },
    {
        slug: 'televente-appels-sortants',
        title: 'Télévendeur / Télévente',
        description:
            "Boostez vos ventes sans agrandir votre équipe. Nos télévendeurs contactent vos prospects, présentent votre offre et vous transmettent uniquement les opportunités qualifiées. Une force de vente externalisée, prête à performer dès le départ.",
        icon: '/Icons/Icon 2.svg',
    },
    {
        slug: 'gestion-leads',
        title: 'Gestion des leads',
        description:
            "Ne laissez plus vos prospects sans réponse. AlloCall prend en charge la qualification, la relance et le suivi de vos leads afin d'augmenter votre taux de conversion.",
        icon: '/Icons/Icon 3.svg',
    },
    {
        slug: 'prise-rendez-vous',
        title: 'Prise de rendez-vous',
        description:
            "Nos agents contactent vos prospects et clients et prennent directement les rendez-vous dans votre calendrier. Un moyen simple et efficace de remplir l'agenda de votre équipe commerciale.",
        icon: '/Icons/Icon4.svg',
    },
    {
        slug: 'service-clientele',
        title: 'Service à la clientèle',
        description:
            "Offrez à vos clients un service rapide, courtois et professionnel, sans devoir gérer une équipe interne. Notre centre d'appels prend en charge vos demandes clients avec le même soin que s'il s'agissait de votre propre équipe.",
        icon: '/Icons/Icon5.svg',
    },
    {
        slug: 'reception-telephonique',
        title: 'Réception téléphonique',
        description:
            "Ne manquez plus jamais un appel. Notre équipe assure la réception de tous vos appels entrants avec professionnalisme, comme si elle faisait partie de votre entreprise.",
        icon: '/Icons/Icon6.svg',
    },
    {
        slug: 'support-technique-niveau-1',
        title: 'Support technique de niveau 1',
        description:
            "Offrez à vos utilisateurs un soutien technique rapide et fiable, sans devoir bâtir votre propre équipe. Nos agents prennent en charge les demandes courantes et acheminent les cas complexes à vos experts internes.",
        icon: '/Icons/Icon7.svg',
    },
    {
        slug: 'confirmation-rappel-rendez-vous',
        title: 'Confirmation de rendez-vous',
        description:
            "Réduisez les rendez-vous manqués grâce à nos appels de confirmation et de rappel. Un service particulièrement efficace pour les cliniques, les concessionnaires, les entreprises de CVC (HVAC), le secteur de la construction et les professionnels.",
        icon: '/Icons/Icon8.svg',
    },
];

export default function Services({ onQuoteWithService }: ServicesGridProps) {
    const { t } = useLocale();

    return (
        <section className="text-alidade-navy w-full bg-[#FDFCFA]" id="services-section">
            <div className="bg-alidade-navy relative overflow-hidden py-10 text-white sm:py-18">
                <div className="from-alidade-navy/50 via-alidade-navy/70 to-alidade-navy absolute inset-0 bg-gradient-to-b" />
                <Stagger className="relative mx-auto max-w-6xl space-y-6 px-4 text-center sm:px-6 lg:px-8" amount={0.3}>
                    <StaggerItem>
                        <h1 className="serif-display text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl">{t('Nos services')}</h1>
                    </StaggerItem>
                    <StaggerItem>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed font-light text-white/75 sm:text-lg">
                            {t(
                                'Une equipe telephonique et commerciale a distance pour vos appels, vos ventes, vos rendez-vous et votre relation client.',
                            )}
                        </p>
                    </StaggerItem>
                </Stagger>

                <Stagger
                    stagger={0.15}
                    delay={0.2}
                    className="relative mx-auto mt-16 grid max-w-4xl grid-cols-3 divide-x divide-white/10 border-t border-white/10 px-4 pt-8 sm:px-6 lg:px-8"
                >
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-alidade-gold text-3xl font-bold sm:text-4xl">{t('8')}</div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">{t('Services')}</div>
                    </StaggerItem>
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-alidade-gold text-3xl font-bold sm:text-4xl">{t('24/7')}</div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">{t('Disponibilite')}</div>
                    </StaggerItem>
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-alidade-gold text-3xl font-bold sm:text-4xl">{t('1')}</div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">{t('Equipe dediee')}</div>
                    </StaggerItem>
                </Stagger>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
                <Reveal className="mb-14 space-y-3 text-center">
                    <h2 className="serif-display text-alidade-navy text-3xl font-bold sm:text-4xl">{t('Des services pour chaque besoin client')}</h2>
                </Reveal>

                <Stagger stagger={0.1} amount={0.05} className="grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-6">
                    {serviceOverview.map((service, index) => {
                        const isBeforeLast = index === serviceOverview.length - 2;
                        const isLast = index === serviceOverview.length - 1;

                        return (
                            <StaggerItem
                                key={service.slug}
                                className={`lg:col-span-2 ${isBeforeLast ? 'lg:col-start-2' : ''} ${isLast ? 'lg:col-start-4' : ''} `}
                            >
                                <Link
                                    href={route('services.show', service.slug)}
                                    className="group relative mx-auto flex max-w-[350px] flex-col items-center text-center"
                                >
                                    {/* ICON / CERCLES */}
                                    <div className="relative flex h-[150px] w-[150px] items-center justify-center">
                                        {/* Cercle extérieur + point :
                            ils bougent ENSEMBLE au hover */}
                                        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                                            {/* Cercle extérieur */}
                                            <div className="absolute inset-0 rounded-full border border-[#74B946]/30 transition-colors duration-500 group-hover:border-[#74B946]" />

                                            {/* Petit point décoratif */}
                                            <span className="absolute top-[2px] left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[#74B946] shadow-[0_0_0_5px_rgba(116,185,70,0.12)]" />
                                        </div>

                                        {/* Cercle pointillé */}
                                        <div className="absolute inset-[10px] rounded-full border border-dashed border-[#111827]/10 transition-all duration-700 group-hover:rotate-[45deg] group-hover:border-[#74B946]/40" />

                                        {/* Numéro */}
                                        <span className="absolute top-4 -right-1 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white text-[10px] font-bold text-[#111827] shadow-sm">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>

                                        {/* Cercle intérieur */}
                                        {/* Cercle intérieur */}
                                        <div className="relative z-10 h-[105px] w-[105px] rounded-full bg-[#F7FAF5] shadow-[0_10px_35px_rgba(17,24,39,0.06)] transition-all duration-500 group-hover:bg-[#74B946] group-hover:shadow-[0_15px_40px_rgba(116,185,70,0.25)]">
                                            {/* Fond blanc de l'icône */}
                                            <div
                                                className={`{ absolute top-1/2 left-1/2 flex ${service.slug === 'prise-rendez-vous' ? 'h-[74px] w-[74px] p-3' : 'h-[62px] w-[62px]'} ${service.slug === 'service-clientele' ? 'h-[62px] w-[70px] p-2' : 'h-[62px] w-[62px]'} ${service.slug === 'assistance' ? 's h-[62px] w-[70px] p-3' : 'h-[62px] w-[62px]'} -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white`}
                                            >
                                                <img
                                                    src={service.icon}
                                                    alt=""
                                                    className={`h-12 w-12 object-contain transition-transform duration-500 group-hover:scale-110 ${
                                                        service.slug === 'prise-rendez-vous' ? 'h-20 w-20 translate-x-[3px]' : ''
                                                    } ${service.slug === 'service-clientele' ? 'w-20 translate-x-[3px]' : ''} `}
                                                    loading="lazy"
                                                    decoding="async"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* CONTENU */}
                                    <div className="mt-7">
                                        <h3 className="text-xl font-extrabold tracking-[-0.02em] text-[#111827] transition-colors duration-300 group-hover:text-[#74B946]">
                                            {t(service.title)}
                                        </h3>

                                        <p className="mx-auto mt-4 max-w-[310px] text-[15px] leading-7 text-[#667085]">{t(service.description)}</p>

                                        {services.some((item) => item.slug === service.slug) && (
                                            <div className="mt-6 inline-flex items-center gap-3">
                                                <span className="inline-flex items-center gap-2 py-3 text-xs font-bold tracking-[0.2em] text-[#74B946] uppercase sm:text-sm">
                                                    {t('Découvrir')}
                                                </span>

                                                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#111827]/15 transition-all duration-300 group-hover:border-[#74B946] group-hover:bg-[#74B946] group-hover:text-white">
                                                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            </StaggerItem>
                        );
                    })}
                </Stagger>
            </div>

            <div className="bg-alidade-navy text-white">
                <Stagger
                    className="mx-auto flex max-w-4xl flex-col items-center space-y-7 px-4 py-14 text-center sm:px-6 sm:py-18 lg:px-8"
                    amount={0.3}
                >
                    <StaggerItem className="space-y-4">
                        <span className="block text-xs font-extrabold tracking-[0.28em] text-[#74B946] uppercase sm:text-sm">
                            {t('Un besoin à externaliser ?')}
                        </span>
                        <h2 className="text-2xl leading-tight font-extrabold text-white sm:text-4xl">{t('Parlons de votre organisation')}</h2>
                    </StaggerItem>
                    <StaggerItem>
                        <motion.button
                            onClick={() => onQuoteWithService('un service de relation client')}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 20,
                            }}
                            className="bg-alidade-gold hover:bg-alidade-gold/90 inline-flex w-full max-w-[290px] items-center justify-center gap-2 rounded-md px-6 py-3.5 text-xs font-extrabold tracking-wide text-white uppercase transition-colors sm:max-w-none sm:px-8 sm:py-4 sm:text-sm"
                        >
                            <span>{t('Demander une soumission')}</span>
                            <ArrowRight size={16} />
                        </motion.button>
                    </StaggerItem>
                </Stagger>
            </div>
        </section>
    );
}
