interface IndustryDetail {
    name: string;
    title: string;
    description: string;
    image: string;
    seoTitle: string;
    keywords: string[];
    introTitle: string;
    intro: string[];
    servicesTitle: string;
    services: { title: string; description: string; items?: string[] }[];
    expertiseTitle: string;
    expertise: string[];
    audiences?: string[];
    brands?: string[];
    automationTitle: string;
    automation: string[];
    flow: string[];
    ctaTitle: string;
    ctaBody: string;
}

export const detailedIndustries: Record<string, IndustryDetail> = {
    automobile: {
        name: 'Automobile',
        title: 'Centre d\u2019appels automobile',
        description: 'Des appels aux rendez-vous, un suivi rapide et structur\u00e9 pour vos clients et vos prospects.',
        image: '/images/industries/automobile.webp',
        seoTitle: 'Centre d\u2019appels automobile pour concessionnaires | ALLO CALL',
        keywords: [
            'centre appels automobile',
            'concessionnaires automobiles',
            'leads automobiles',
            'rendez-vous service',
            'relance prospects automobile',
        ],
        introTitle: 'Chaque prospect compte.',
        intro: [
            'Dans le secteur automobile, chaque prospect compte. Une demande de v\u00e9hicule, un appel pour un entretien ou une demande d\u2019information doit \u00eatre trait\u00e9 rapidement pour maximiser les opportunit\u00e9s commerciales.',
            'Notre centre d\u2019appels sp\u00e9cialis\u00e9 dans l\u2019automobile accompagne les concessionnaires et groupes automobiles dans la gestion de leurs appels, de leurs prospects et de leurs rendez-vous.',
            'Nous combinons agents humains, CRM et solutions d\u2019intelligence artificielle pour assurer un suivi rapide et structur\u00e9 de chaque contact.',
        ],
        servicesTitle: 'Nos services pour les concessionnaires automobiles',
        services: [
            {
                title: 'Appels entrants',
                description:
                    'Nous prenons en charge les appels de vos clients et prospects afin de r\u00e9pondre \u00e0 leurs demandes, recueillir les informations n\u00e9cessaires et les orienter vers le bon service.',
            },
            {
                title: 'Prise de rendez-vous service',
                description: 'Nous g\u00e9rons la prise de rendez-vous pour :',
                items: ['Entretien', 'R\u00e9vision', 'Vidange', 'Diagnostic', 'R\u00e9paration', 'Pneumatiques', 'Service apr\u00e8s-vente'],
            },
            {
                title: 'Suivi des leads automobiles',
                description:
                    'Chaque nouveau prospect peut \u00eatre qualifi\u00e9 et enregistr\u00e9 dans votre CRM afin d\u2019assurer un suivi commercial efficace. Nous pouvons traiter les demandes concernant :',
                items: [
                    'V\u00e9hicules neufs',
                    'V\u00e9hicules d\u2019occasion',
                    'Demandes de prix',
                    'Demandes d\u2019essai',
                    'Financement',
                    'Disponibilit\u00e9 d\u2019un v\u00e9hicule',
                    'Informations commerciales',
                ],
            },
            {
                title: 'Relance des prospects',
                description:
                    'Un prospect qui n\u2019a pas encore achet\u00e9 ne doit pas \u00eatre oubli\u00e9. Nos \u00e9quipes peuvent effectuer des campagnes de relance t\u00e9l\u00e9phonique pour reprendre contact avec les prospects et identifier les opportunit\u00e9s encore actives.',
            },
            {
                title: 'Confirmation des rendez-vous',
                description:
                    'Nous contactons les clients avant leur rendez-vous afin de confirmer leur pr\u00e9sence et de limiter les rendez-vous manqu\u00e9s.',
            },
            {
                title: 'Appels apr\u00e8s-vente',
                description:
                    'Nous pouvons \u00e9galement prendre en charge les appels li\u00e9s au service apr\u00e8s-vente, au suivi client et \u00e0 la satisfaction apr\u00e8s intervention.',
            },
            {
                title: 'Campagnes de r\u00e9activation',
                description:
                    'Vous disposez d\u2019une ancienne base de clients ou de prospects ? Nous pouvons lancer des campagnes de r\u00e9activation et de fid\u00e9lisation afin d\u2019identifier les clients susceptibles de revenir en concession.',
            },
        ],
        expertiseTitle: 'Une expertise adapt\u00e9e au secteur automobile',
        expertise: [
            'Nous travaillons actuellement avec des concessionnaires de marques telles que Honda, Chrysler, Kia et Toyota.',
            'Notre exp\u00e9rience nous permet de comprendre les enjeux sp\u00e9cifiques des concessionnaires : rapidit\u00e9 de r\u00e9ponse, qualification des prospects, gestion des rendez-vous, suivi commercial et fid\u00e9lisation des clients.',
        ],
        brands: ['Honda', 'Chrysler', 'Kia', 'Toyota'],
        automationTitle: 'Centre d\u2019appels automobile + IA',
        automation: [
            'Nos solutions peuvent \u00e9galement int\u00e9grer un chatbot IA, la qualification des leads, les appels, les relances, les rendez-vous et le CRM.',
            'L\u2019intelligence artificielle peut automatiser certaines t\u00e2ches tandis que nos agents prennent en charge les conversations n\u00e9cessitant une intervention humaine.',
        ],
        flow: ['Chatbot IA', 'Qualification des leads', 'Appel', 'Relance', 'Rendez-vous', 'CRM'],
        ctaTitle: 'Un centre d\u2019appels pour votre concession ?',
        ctaBody:
            'Confiez-nous la gestion de vos appels, prospects et rendez-vous et concentrez vos \u00e9quipes sur la vente et la satisfaction de vos clients. Parlez-nous de vos besoins en centre d\u2019appels automobile.',
    },
    sante: {
        name: 'Sant\u00e9',
        title: 'Centre d\u2019appels sant\u00e9',
        description: 'Un accueil professionnel et des rendez-vous bien suivis, pour vos patients et vos \u00e9quipes.',
        image: '/images/industries/sante.webp',
        seoTitle: 'Centre d\u2019appels sant\u00e9 pour cliniques et cabinets | ALLO CALL',
        keywords: [
            'centre appels sant\u00e9',
            'centre appels clinique',
            'prise rendez-vous patients',
            'confirmation rendez-vous sant\u00e9',
            'accueil t\u00e9l\u00e9phonique m\u00e9dical',
        ],
        introTitle: 'Au service de la relation patient.',
        intro: [
            'Les \u00e9tablissements de sant\u00e9 re\u00e7oivent quotidiennement un volume important d\u2019appels et de demandes.',
            'Notre centre d\u2019appels pour le secteur de la sant\u00e9 permet aux cliniques, cabinets, centres m\u00e9dicaux et \u00e9tablissements sp\u00e9cialis\u00e9s de d\u00e9l\u00e9guer la gestion de leurs appels et de leurs rendez-vous.',
            'Nos agents assurent un accueil t\u00e9l\u00e9phonique professionnel et peuvent suivre vos proc\u00e9dures pour offrir une exp\u00e9rience fluide aux patients et aux \u00e9quipes.',
        ],
        servicesTitle: 'Nos services pour les professionnels de sant\u00e9',
        services: [
            {
                title: 'Prise de rendez-vous',
                description:
                    'Nous prenons en charge les demandes de rendez-vous et orientons les patients selon vos disponibilit\u00e9s et vos consignes.',
            },
            {
                title: 'Confirmation des rendez-vous',
                description:
                    'Des appels, SMS ou messages de confirmation peuvent \u00eatre r\u00e9alis\u00e9s avant les rendez-vous afin de r\u00e9duire les oublis et les absences.',
            },
            {
                title: 'Appels entrants',
                description:
                    'Nos agents r\u00e9pondent aux appels entrants, recueillent les informations n\u00e9cessaires et orientent les demandes vers le service appropri\u00e9.',
            },
            {
                title: 'Qualification des demandes',
                description:
                    'Nous pouvons qualifier les demandes selon des crit\u00e8res d\u00e9finis avec votre \u00e9tablissement et transmettre les informations n\u00e9cessaires \u00e0 vos \u00e9quipes.',
            },
            {
                title: 'Rappels',
                description:
                    'Nous pouvons effectuer des campagnes de rappel pour les rendez-vous, consultations ou demandes n\u00e9cessitant un suivi.',
            },
        ],
        expertiseTitle: 'Une relation patient professionnelle',
        expertise: [
            'Notre objectif est de vous permettre de vous concentrer sur votre activit\u00e9 pendant que notre \u00e9quipe assure la gestion de vos appels et de vos rendez-vous. Nos solutions peuvent \u00eatre adapt\u00e9es aux :',
        ],
        audiences: [
            'Cliniques',
            'Cabinets m\u00e9dicaux',
            'Centres de soins',
            'Centres sp\u00e9cialis\u00e9s',
            'Professionnels de sant\u00e9',
            '\u00c9tablissements m\u00e9dicaux',
        ],
        automationTitle: 'Centre d\u2019appels sant\u00e9 et automatisation',
        automation: [
            'L\u2019intelligence artificielle peut \u00e9galement \u00eatre utilis\u00e9e pour automatiser certaines t\u00e2ches simples : confirmation de rendez-vous, rappels, collecte d\u2019informations et r\u00e9ponses aux demandes fr\u00e9quentes.',
            'Les demandes n\u00e9cessitant une intervention humaine sont transf\u00e9r\u00e9es \u00e0 nos agents.',
        ],
        flow: ['Demande', 'Rendez-vous', 'Confirmation', 'Rappel', 'Suivi'],
        ctaTitle: 'Un centre d\u2019appels pour votre \u00e9tablissement de sant\u00e9 ?',
        ctaBody:
            'Nous pouvons adapter notre organisation \u00e0 vos horaires, vos proc\u00e9dures et votre volume d\u2019appels. Contactez-nous pour discuter de votre projet.',
    },
};
