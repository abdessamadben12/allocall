import {
    BellRing,
    CalendarCheck,
    Headphones,
    LifeBuoy,
    PhoneCall,
    PhoneOutgoing,
    Target,
    Users,
    type LucideIcon,
} from 'lucide-react';

export interface ServiceDetail {
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    icon: LucideIcon;
    details: string[];
    materials: string[];
    gallery: {
        src: string;
        caption: string;
    }[];
}

const callCenterImage = '/images/hero/allocall-call-center.webp';
const aiImage = '/images/hero/allocall-ai.webp';
const salesImage = '/images/hero/allocall-sales.webp';

export const services: ServiceDetail[] = [
    {
        slug: 'assistants-virtuels',

        title: 'Assistants virtuels',

        description:
            'Une équipe à distance pour gérer vos appels, courriels, tâches administratives et suivis.',

        imageUrl: aiImage,

        icon: Users,

        details: [
            'Gestion de vos appels entrants et sortants.',
            'Traitement et suivi de vos courriels professionnels.',
            'Prise en charge de tâches administratives récurrentes.',
            'Suivi de vos clients, prospects et demandes.',
            'Support quotidien à distance pour alléger la charge de votre équipe.',
        ],

        materials: [
            'Téléphone',
            'Courriel',
            'CRM',
            'Outils collaboratifs',
            'Automatisation',
        ],

        gallery: [
            {
                src: aiImage,
                caption:
                    'Une équipe à distance dédiée à votre entreprise',
            },
            {
                src: callCenterImage,
                caption:
                    'Gestion des appels, courriels et tâches administratives',
            },
        ],
    },

    {
        slug: 'televente-appels-sortants',

        title: 'Télévente et appels sortants',

        description:
            'Des agents commerciaux pour contacter vos prospects, présenter vos services et générer des opportunités.',

        imageUrl: salesImage,

        icon: PhoneOutgoing,

        details: [
            'Contact de vos prospects et clients potentiels.',
            'Présentation de vos produits et services.',
            'Qualification des besoins de vos prospects.',
            'Relance commerciale des contacts intéressés.',
            'Développement de nouvelles opportunités commerciales.',
        ],

        materials: [
            'Téléphonie professionnelle',
            'CRM commercial',
            'Scripts commerciaux',
            'Suivi des prospects',
            'Rapports de performance',
        ],

        gallery: [
            {
                src: salesImage,
                caption:
                    'Agents dédiés à la télévente',
            },
            {
                src: callCenterImage,
                caption:
                    'Prospection et développement commercial',
            },
        ],
    },

    {
        slug: 'gestion-leads',

        title: 'Gestion de leads',

        description:
            'Qualification, suivi et relance de vos prospects afin de réduire les occasions perdues.',

        imageUrl: aiImage,

        icon: Target,

        details: [
            'Qualification des nouveaux prospects.',
            'Identification des demandes prioritaires.',
            'Suivi de chaque opportunité commerciale.',
            'Relance des prospects par téléphone, courriel ou SMS.',
            'Transmission des prospects qualifiés à votre équipe.',
        ],

        materials: [
            'CRM',
            'Téléphone',
            'Courriel',
            'SMS',
            'Automatisation des relances',
        ],

        gallery: [
            {
                src: aiImage,
                caption:
                    'Qualification et suivi de vos prospects',
            },
            {
                src: salesImage,
                caption:
                    'Centralisation des opportunités commerciales',
            },
        ],
    },

    {
        slug: 'prise-rendez-vous',

        title: 'Prise de rendez-vous',

        description:
            'Nos agents contactent vos prospects et clients et planifient directement les rendez-vous dans votre calendrier.',

        imageUrl: callCenterImage,

        icon: CalendarCheck,

        details: [
            'Contact téléphonique de vos prospects et clients.',
            'Qualification de la demande avant le rendez-vous.',
            'Consultation des disponibilités de votre équipe.',
            'Planification directe dans votre calendrier.',
            'Transmission des informations nécessaires avant chaque rendez-vous.',
        ],

        materials: [
            'Calendrier professionnel',
            'CRM',
            'Téléphone',
            'Courriel',
            'Automatisation',
        ],

        gallery: [
            {
                src: callCenterImage,
                caption:
                    'Planification de rendez-vous qualifiés',
            },
            {
                src: salesImage,
                caption:
                    'Gestion directe de votre calendrier',
            },
        ],
    },

    {
        slug: 'service-clientele',

        title: 'Service à la clientèle',

        description:
            'Réponse aux questions, gestion des demandes, suivi des dossiers et soutien à vos clients.',

        imageUrl: callCenterImage,

        icon: Headphones,

        details: [
            'Réponse aux appels et demandes de vos clients.',
            'Traitement des questions concernant vos services.',
            'Suivi des dossiers et demandes en cours.',
            'Transmission des demandes spécifiques à la bonne équipe.',
            'Communication professionnelle adaptée à votre marque.',
        ],

        materials: [
            'Téléphone',
            'Courriel',
            'CRM',
            'Messagerie',
            'Base de connaissances',
        ],

        gallery: [
            {
                src: callCenterImage,
                caption:
                    'Une équipe disponible pour vos clients',
            },
            {
                src: aiImage,
                caption:
                    'Gestion professionnelle de la relation client',
            },
        ],
    },

    {
        slug: 'support-technique-niveau-1',

        title: 'Support technique de niveau 1',

        description:
            'Prise en charge des demandes techniques courantes et transfert des dossiers complexes à votre équipe.',

        imageUrl: aiImage,

        icon: LifeBuoy,

        details: [
            'Réception des demandes techniques.',
            'Qualification des incidents signalés.',
            'Résolution des problèmes techniques courants.',
            'Création et suivi des demandes de support.',
            'Transfert des problèmes complexes à votre équipe technique.',
        ],

        materials: [
            'Outil de ticketing',
            'Téléphone',
            'Courriel',
            'Base de connaissances',
            'CRM',
        ],

        gallery: [
            {
                src: aiImage,
                caption:
                    'Support technique de premier niveau',
            },
            {
                src: callCenterImage,
                caption:
                    'Gestion et suivi des demandes techniques',
            },
        ],
    },

    {
        slug: 'reception-telephonique',

        title: 'Réception téléphonique',

        description:
            'Répondez à vos appels professionnels sans avoir à embaucher une réceptionniste à temps plein.',

        imageUrl: callCenterImage,

        icon: PhoneCall,

        details: [
            'Réponse professionnelle à vos appels entrants.',
            'Accueil personnalisé au nom de votre entreprise.',
            'Identification du besoin de chaque appelant.',
            'Transfert des appels aux bonnes personnes.',
            'Prise de messages lorsque votre équipe est indisponible.',
        ],

        materials: [
            'Téléphonie VoIP',
            'Transfert d’appels',
            'CRM',
            'Prise de messages',
            'Notifications',
        ],

        gallery: [
            {
                src: callCenterImage,
                caption:
                    'Réception professionnelle de vos appels',
            },
            {
                src: salesImage,
                caption:
                    'Une réception téléphonique à distance',
            },
        ],
    },

    {
        slug: 'confirmation-rappel-rendez-vous',

        title: 'Confirmation et rappel de rendez-vous',

        description:
            'Réduction des absences grâce aux appels, SMS et automatisations de rappel.',

        imageUrl: salesImage,

        icon: BellRing,

        details: [
            'Confirmation des rendez-vous avec vos clients.',
            'Envoi de rappels avant chaque rendez-vous.',
            'Relance téléphonique lorsque nécessaire.',
            'Automatisation des rappels par SMS.',
            'Mise à jour du calendrier après confirmation, annulation ou déplacement.',
        ],

        materials: [
            'Appels téléphoniques',
            'SMS automatisés',
            'CRM',
            'Calendrier',
            'Automatisations',
        ],

        gallery: [
            {
                src: salesImage,
                caption:
                    'Confirmation des rendez-vous clients',
            },
            {
                src: aiImage,
                caption:
                    'Rappels automatisés par téléphone et SMS',
            },
        ],
    },
];

export function getServiceBySlug(
    slug: string,
): ServiceDetail | undefined {
    return services.find(
        (service) => service.slug === slug,
    );
}
