import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { services } from '@/data/services';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    FileSignature,
    HardHat,
    KeyRound,
    MessageSquare,
} from 'lucide-react';

interface ServicesGridProps {
    onQuoteWithService: (serviceName: string) => void;
}

const serviceOverview = [
    {
        slug: 'assistants-virtuels',
        title: 'Assistante virtuelle',
        description:
            "Vous croulez sous les appels, les courriels et les taches administratives ? Notre assistante virtuelle prend le relais pour vous permettre de vous concentrer sur l'essentiel. Une solution flexible et professionnelle, pensee pour les entreprises du Quebec.",
        icon: '/Icons/Icon1.svg',
    },
    {
        slug: 'televente-appels-sortants',
        title: 'Televendeur / Televente',
        description:
            'Boostez vos ventes sans agrandir votre equipe. Nos televendeurs contactent vos prospects, presentent votre offre et vous transmettent uniquement les opportunites qualifiees. Une force de vente externalisee, prete a performer des le depart.',
        icon: '/Icons/Icon 2.svg',
    },
    {
        slug: 'gestion-leads',
        title: 'Gestion des leads',
        description:
            "Ne laissez plus vos prospects sans reponse. AlloCall prend en charge la qualification, la relance et le suivi de vos leads afin d'augmenter votre taux de conversion.",
        icon: '/Icons/Icon 3.svg',
    },
    {
        slug: 'prise-rendez-vous',
        title: 'Prise de rendez-vous',
        description:
            "Nos agents contactent vos prospects et clients et prennent directement les rendez-vous dans votre calendrier. Un moyen simple et efficace de remplir l'agenda de votre equipe commerciale.",
        icon: '/Icons/Icon4.svg',
    },
    {
        slug: 'service-clientele',
        title: 'Service a la clientele',
        description:
            "Offrez a vos clients un service rapide, courtois et professionnel, sans devoir gerer une equipe interne. Notre centre d'appel prend en charge vos demandes clients avec le meme soin que si c'etait votre propre equipe.",
        icon: '/Icons/Icon5.svg',
    },
    {
        slug: 'reception-telephonique',
        title: 'Reception telephonique',
        description:
            'Ne manquez plus jamais un appel. Notre equipe assure la reception de tous vos appels entrants avec professionnalisme, comme si elle faisait partie de votre entreprise.',
        icon: '/Icons/Icon6.svg',
    },
    {
        slug: 'support-technique-niveau-1',
        title: 'Support technique niveau 1',
        description:
            'Offrez a vos utilisateurs un soutien technique rapide et fiable, sans devoir batir votre propre equipe. Nos agents prennent en charge les demandes courantes et acheminent les cas complexes a vos experts internes.',
        icon: '/Icons/Icon7.svg',
    },
    {
        slug: 'confirmation-rappel-rendez-vous',
        title: 'Confirmation de rendez-vous',
        description:
            'Reduisez vos rendez-vous manques grace a nos appels de confirmation et de rappel. Un service particulierement efficace pour les cliniques, concessionnaires, entreprises HVAC, construction et professionnels.',
        icon: '/Icons/Icon8.svg',
    },
];

export default function Services({
    onQuoteWithService,
}: ServicesGridProps) {
    return (
        <section
            className="w-full bg-[#FDFCFA] text-alidade-navy"
            id="services-section"
        >
            <div className="relative overflow-hidden bg-alidade-navy py-10 text-white sm:py-18">
                <div className="absolute inset-0 bg-gradient-to-b from-alidade-navy/50 via-alidade-navy/70 to-alidade-navy" />
                <Stagger
                    className="relative mx-auto max-w-6xl space-y-6 px-4 text-center sm:px-6 lg:px-8"
                    amount={0.3}
                >
                    <StaggerItem className="inline-block">
                        <span className="text-sm font-bold tracking-[0.3em] text-alidade-gold uppercase sm:text-xl">
                            Services
                        </span>
                    </StaggerItem>
                    <StaggerItem>
                        <h1 className="serif-display text-3xl leading-[1.1] font-bold sm:text-4xl lg:text-5xl">
                            Nos services
                        </h1>
                    </StaggerItem>
                    <StaggerItem>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed font-light text-white/75 sm:text-lg">
                            Une equipe telephonique et commerciale a
                            distance pour vos appels, vos ventes, vos
                            rendez-vous et votre relation client.
                        </p>
                    </StaggerItem>
                </Stagger>

                <Stagger
                    stagger={0.15}
                    delay={0.2}
                    className="relative mx-auto mt-16 grid max-w-4xl grid-cols-3 divide-x divide-white/10 border-t border-white/10 px-4 pt-8 sm:px-6 lg:px-8"
                >
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-3xl font-bold text-alidade-gold sm:text-4xl">
                            8
                        </div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">
                            Services
                        </div>
                    </StaggerItem>
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-3xl font-bold text-alidade-gold sm:text-4xl">
                            24/7
                        </div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">
                            Disponibilite
                        </div>
                    </StaggerItem>
                    <StaggerItem className="px-2 text-center">
                        <div className="serif-display text-3xl font-bold text-alidade-gold sm:text-4xl">
                            1
                        </div>
                        <div className="mt-1 text-[10px] tracking-[0.2em] text-white/60 uppercase sm:text-xs">
                            Equipe dediee
                        </div>
                    </StaggerItem>
                </Stagger>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18 lg:px-8">
                <Reveal className="mb-14 space-y-3 text-center">
                    <h2 className="serif-display text-3xl font-bold text-alidade-navy sm:text-4xl">
                        Des services pour chaque besoin client
                    </h2>
                </Reveal>

                <Stagger
                    stagger={0.1}
                    amount={0.05}
                    className="grid grid-cols-1 gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {serviceOverview.map((service) => (
                        <StaggerItem key={service.slug}>
                            <Link
                                href={route('services.show', service.slug)}
                                className="group mx-auto block max-w-[340px] text-center transition-transform duration-300 hover:-translate-y-1"
                            >
                                <div className="mx-auto flex h-16 w-16 items-center justify-center">
                                    <img
                                        src={service.icon}
                                        alt=""
                                        className="h-14 w-14 object-contain transition-transform duration-300 group-hover:scale-110"
                                        loading="lazy"
                                        decoding="async"
                                    />
                                </div>

                                <h3 className="mt-4 text-lg leading-snug font-extrabold text-[#111827]">
                                    {service.title}
                                </h3>

                                <p className="mx-auto mt-4 text-base leading-relaxed text-[#111827]">
                                    {service.description}
                                </p>

                                {services.some(
                                    (item) => item.slug === service.slug,
                                ) && (
                                    <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#74B946] uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                        <span>Decouvrir</span>
                                        <ArrowRight size={14} />
                                    </span>
                                )}
                            </Link>
                        </StaggerItem>
                    ))}
                </Stagger>
            </div>

            <div className="bg-[#F9F7F3]">
                <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8">
                    <Reveal className="mb-16 space-y-3 text-center">
                        <h2 className="serif-display text-3xl font-bold text-alidade-navy sm:text-4xl">
                            Comment nous travaillons
                        </h2>
                    </Reveal>

                    <Stagger
                        stagger={0.18}
                        className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {[
                            {
                                icon: MessageSquare,
                                step: '01',
                                title: 'Consultation',
                                desc: 'Ecoute de votre besoin et cadrage des objectifs.',
                            },
                            {
                                icon: FileSignature,
                                step: '02',
                                title: 'Plan d action',
                                desc: 'Scripts, processus et indicateurs de suivi.',
                            },
                            {
                                icon: HardHat,
                                step: '03',
                                title: 'Mise en place',
                                desc: 'Formation des agents et demarrage controle.',
                            },
                            {
                                icon: KeyRound,
                                step: '04',
                                title: 'Suivi',
                                desc: 'Rapports, ajustements et amelioration continue.',
                            },
                        ].map((item, idx, arr) => {
                            const StepIcon = item.icon;

                            return (
                                <StaggerItem
                                    key={item.step}
                                    className="relative space-y-4 text-center"
                                >
                                    {idx < arr.length - 1 && (
                                        <span className="absolute top-8 left-[60%] hidden h-px w-full bg-[#ffe40f] lg:block" />
                                    )}
                                    <div className="relative z-10 mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#2f302f] bg-[#101311] text-[#ffe40f] shadow-md">
                                        <StepIcon size={26} />
                                    </div>
                                    <div className="text-[11px] font-bold tracking-[0.3em] text-[#5d5f5e] uppercase">
                                        Etape {item.step}
                                    </div>
                                    <h4 className="text-lg font-bold text-alidade-navy">
                                        {item.title}
                                    </h4>
                                    <p className="text-sm leading-relaxed text-alidade-muted">
                                        {item.desc}
                                    </p>
                                </StaggerItem>
                            );
                        })}
                    </Stagger>
                </div>
            </div>

            <div className="bg-alidade-navy text-white">
                <Stagger
                    className="mx-auto max-w-6xl space-y-8 px-4 py-20 text-center sm:px-6 lg:px-8"
                    amount={0.3}
                >
                    <StaggerItem className="space-y-4">
                        <span className="text-sm font-bold tracking-[0.3em] text-alidade-gold uppercase sm:text-xl">
                            Un besoin a externaliser ?
                        </span>
                        <h2 className="serif-display text-3xl font-bold sm:text-4xl">
                            Parlons de votre organisation
                        </h2>
                    </StaggerItem>
                    <StaggerItem>
                        <motion.button
                            onClick={() =>
                                onQuoteWithService(
                                    'un service de relation client',
                                )
                            }
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            transition={{
                                type: 'spring',
                                stiffness: 400,
                                damping: 20,
                            }}
                            className="inline-flex items-center gap-2 rounded-lg bg-alidade-gold px-8 py-4 text-sm font-bold tracking-wider text-alidade-navy uppercase transition-colors hover:bg-alidade-gold-light"
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
