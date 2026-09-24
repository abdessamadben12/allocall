export interface MarketingPage {
    slug: string;
    title: string;
    eyebrow: string;
    description: string;
    image: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    sections: {
        title: string;
        body?: string;
        items?: string[];
    }[];
}

export const aiPage: MarketingPage = {
    slug: 'solutions-ia',
    eyebrow: 'Solutions IA',
    title: 'Centre d appels propulse par l IA',
    description:
        'Combinez intelligence artificielle et expertise humaine pour automatiser vos appels, qualifier vos prospects, gerer vos leads et prendre vos rendez-vous.',
    image: '/images/hero/allocall-ai.webp',
    seoTitle: 'Centre d appels IA, CRM et automatisation | ALLO CALL',
    seoDescription:
        'Solutions IA pour centre d appels: chatbot, AI Voice Agent, CRM intelligent, automatisation leads, SMS, email et prise de rendez-vous.',
    keywords: ['centre appels IA', 'chatbot IA', 'AI Voice Agent', 'CRM intelligent', 'automatisation leads'],
    sections: [
        {
            title: 'L intelligence artificielle au service de votre relation client',
            body:
                'Notre solution de centre d appels IA permet aux entreprises d automatiser une partie de leur relation client et de leur processus commercial, tout en conservant l intervention de nos agents lorsque l humain fait la difference.',
        },
        {
            title: 'Un centre d appel intelligent pour automatiser votre activite',
            body:
                'De la reception d un nouveau prospect jusqu a la prise de rendez-vous, nous connectons les outils pour creer un parcours client automatise: Lead -> Qualification -> SMS -> Appel -> Relance -> Rendez-vous -> CRM.',
        },
        {
            title: 'CRM intelligent',
            body:
                'Centralisez vos prospects, clients, appels, demandes, rendez-vous et interactions dans un CRM intelligent.',
            items: ['Gestion et centralisation des leads', 'Qualification des prospects', 'Historique des appels', 'Suivi commercial', 'Relances automatiques', 'Suivi des conversions'],
        },
        {
            title: 'Automatisation des leads',
            body:
                'Lorsqu un nouveau lead arrive depuis votre site, formulaire ou campagne publicitaire, son traitement peut etre automatiquement declenche pour reduire les delais de reponse et optimiser la conversion.',
        },
        {
            title: 'Chatbot IA',
            body:
                'Transformez les visiteurs de votre site web en prospects grace a un chatbot intelligent disponible 24h/24.',
            items: ['Repondre aux questions frequentes', 'Presenter vos services', 'Collecter les coordonnees', 'Qualifier les prospects', 'Proposer une prise de rendez-vous', 'Transferer a un agent'],
        },
        {
            title: 'AI Voice Agent',
            body:
                'L agent vocal IA permet d automatiser certaines conversations telephoniques: appels entrants, appels sortants, qualification, relances et prise de rendez-vous.',
            items: ['Repondre aux appels', 'Qualifier les prospects', 'Prendre des rendez-vous', 'Confirmer les rendez-vous', 'Transferer les appels complexes a un agent humain'],
        },
        {
            title: 'SMS & Email Automation',
            body:
                'Chaque interaction peut declencher automatiquement l envoi d un SMS ou d un email personnalise: formulaire web, demande de devis, prise de rendez-vous, absence ou relance commerciale.',
        },
        {
            title: 'IA + Agents humains',
            body:
                'Notre approche repose sur la complementarite entre intelligence artificielle et agents humains. L IA gere les taches simples et nos agents interviennent pour les conversations personnalisees ou complexes.',
        },
    ],
};

export const industriesPage: MarketingPage = {
    slug: 'industries',
    eyebrow: 'Industries',
    title: 'Des solutions de centre d appels adaptees a votre industrie',
    description:
        'Chaque industrie a ses propres clients, processus et besoins. Nous adaptons nos equipes, scripts, outils CRM et solutions IA a votre activite.',
    image: '/images/hero/allocall-call-cnter.webp',
    seoTitle: 'Centre d appels par industrie | ALLO CALL',
    seoDescription:
        'Solutions de centre d appels pour automobile, sante, HVAC, construction, assurance, immobilier et services professionnels.',
    keywords: ['centre appels industrie', 'centre appels automobile', 'centre appels sante', 'centre appels HVAC'],
    sections: [
        {
            title: 'Nos principaux secteurs d intervention',
            body:
                'Automobile, sante, HVAC et thermopompes, construction, assurance et immobilier.',
        },
        {
            title: 'Automobile',
            body:
                'Nous accompagnons les concessionnaires automobiles dans la gestion des appels, prospects et rendez-vous.',
            items: ['Appels entrants', 'Prise de rendez-vous service', 'Suivi des leads automobiles', 'Relance des prospects', 'Confirmation des rendez-vous', 'Appels apres-vente'],
        },
        {
            title: 'Sante',
            body:
                'Nous aidons les cliniques, cabinets medicaux et centres de soins a gerer leurs communications et rendez-vous.',
            items: ['Prise de rendez-vous', 'Confirmation', 'Appels entrants', 'Qualification des demandes', 'Rappels'],
        },
        {
            title: 'HVAC, construction, assurance et immobilier',
            body:
                'Qualification des leads, prise de rendez-vous, suivi des soumissions, relance commerciale, CRM et reactivation des prospects.',
        },
        {
            title: 'Expertise sectorielle + intelligence artificielle',
            body:
                'Selon votre activite, nous pouvons integrer chatbot IA, AI Voice Agent, CRM intelligent, SMS & Email Automation et automatisation des leads.',
        },
    ],
};

export const industryDetails: Record<string, MarketingPage> = {
    automobile: {
        slug: 'automobile',
        eyebrow: 'Industrie automobile',
        title: 'Centre d appels pour concessionnaires automobiles',
        description:
            'Dans le secteur automobile, chaque prospect compte. Nous accompagnons les concessionnaires dans la gestion des appels, prospects et rendez-vous.',
        image: '/images/hero/allocall-sales.webp',
        seoTitle: 'Centre d appels automobile pour concessionnaires | ALLO CALL',
        seoDescription:
            'Gestion des appels, leads automobiles, rendez-vous service, relances, confirmations et campagnes de reactivation pour concessionnaires.',
        keywords: ['centre appels automobile', 'concessionnaire automobile', 'leads automobiles', 'rendez-vous service'],
        sections: [
            {
                title: 'Nos services pour les concessionnaires automobiles',
                items: ['Appels entrants', 'Prise de rendez-vous service', 'Suivi des leads automobiles', 'Relance des prospects', 'Confirmation des rendez-vous', 'Appels apres-vente', 'Campagnes de reactivation'],
            },
            {
                title: 'Suivi des leads automobiles',
                body:
                    'Chaque nouveau prospect peut etre qualifie et enregistre dans votre CRM: vehicules neufs, occasions, demandes de prix, essais, financement et disponibilite.',
            },
            {
                title: 'Une expertise adaptee au secteur automobile',
                body:
                    'Nous travaillons actuellement avec des concessionnaires de marques telles que Honda, Chrysler, Kia et Toyota.',
            },
            {
                title: 'Centre d appel automobile + IA',
                body:
                    'Chatbot IA -> Qualification des leads -> Appel -> Relance -> Rendez-vous -> CRM. L IA automatise certaines taches tandis que nos agents prennent en charge les conversations humaines.',
            },
        ],
    },
    sante: {
        slug: 'sante',
        eyebrow: 'Industrie sante',
        title: 'Centre d appels pour les professionnels de sante',
        description:
            'Notre centre d appels pour la sante permet aux cliniques, cabinets et centres medicaux de deleguer la gestion des appels et rendez-vous.',
        image: '/images/hero/allocall-ll-center.webp',
        seoTitle: 'Centre d appels sante pour cliniques et cabinets | ALLO CALL',
        seoDescription:
            'Gestion des appels, rendez-vous, confirmations, rappels et demandes patients pour cliniques, cabinets medicaux et centres de soins.',
        keywords: ['centre appels sante', 'centre appels clinique', 'prise rendez-vous patients', 'confirmation rendez-vous sante'],
        sections: [
            {
                title: 'Nos services pour les professionnels de sante',
                items: ['Prise de rendez-vous', 'Confirmation des rendez-vous', 'Appels entrants', 'Qualification des demandes', 'Rappels', 'Gestion des appels telephoniques'],
            },
            {
                title: 'Une relation patient professionnelle',
                body:
                    'Nos agents suivent vos procedures afin d offrir une experience fluide aux patients et aux equipes.',
            },
            {
                title: 'Centre d appels sante et automatisation',
                body:
                    'L intelligence artificielle peut automatiser certaines taches simples: confirmations, rappels, collecte d informations et reponses aux demandes frequentes.',
            },
        ],
    },
};
