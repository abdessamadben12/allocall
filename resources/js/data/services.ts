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

export interface ServiceSection {
    title: string;
    body?: string;
    items?: string[];
}

export interface ServiceDetail {
    slug: string;
    title: string;
    description: string;
    imageUrl: string;
    icon: LucideIcon;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    intro: string;
    sections: ServiceSection[];
    ctaTitle: string;
    ctaBody: string;
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
        title: 'Assistante virtuelle',
        description:
            'Confiez vos appels, vos taches administratives, vos courriels et vos suivis a une assistante virtuelle professionnelle.',
        imageUrl: aiImage,
        icon: Users,
        seoTitle: 'Assistante virtuelle au Quebec | ALLO CALL',
        seoDescription:
            'Service d assistante virtuelle et telesecretariat pour appels, courriels, agenda, suivis clients et taches administratives.',
        keywords: ['assistante virtuelle Quebec', 'secretaire virtuelle', 'telesecretariat', 'externalisation administrative'],
        intro:
            "Chez ALLO CALL, notre equipe d'assistants virtuels s'integre directement a vos processus et a vos outils existants. Que vous soyez une PME, un travailleur autonome ou une grande entreprise, notre service de secretaire virtuelle vous offre le soutien administratif dont vous avez besoin, sans les couts d'un employe a temps plein.",
        sections: [
            {
                title: 'Pourquoi choisir une assistante virtuelle ALLO CALL ?',
                body:
                    "Faire appel a un assistant virtuel au Quebec vous permet de deleguer les taches chronophages tout en gardant un controle total sur votre image de marque. Notre equipe agit comme une extension naturelle de votre entreprise.",
            },
            {
                title: 'Nos services de telesecretariat comprennent',
                items: [
                    'Gestion des appels entrants et sortants: accueil professionnel, prise de messages et transfert d appels.',
                    'Receptionniste virtuelle: un point de contact unique et courtois pour tous vos interlocuteurs.',
                    'Gestion des courriels: tri, reponses et suivi de votre boite de reception.',
                    'Prise de rendez-vous et gestion d agenda: coordination de votre calendrier en temps reel.',
                    'Suivis clients et relances pour ne jamais perdre le fil avec vos prospects et clients.',
                    'Taches administratives courantes: saisie de donnees, preparation de documents et facturation de base.',
                ],
            },
            {
                title: 'Une integration a vos outils existants',
                body:
                    "Que vous utilisiez un CRM, un logiciel de gestion d'agenda, une plateforme de courriel ou des outils internes, notre equipe travaille directement dans votre environnement.",
            },
            {
                title: 'L externalisation administrative, une solution rentable',
                body:
                    "L externalisation administrative avec ALLO CALL vous permet de reduire vos couts fixes tout en beneficiant d'un service flexible, adapte au volume reel de votre entreprise.",
            },
        ],
        ctaTitle: 'Pret a alleger votre charge administrative ?',
        ctaBody:
            'Decouvrez comment notre service d assistante virtuelle peut transformer la gestion quotidienne de votre entreprise.',
        details: ['Gestion des appels.', 'Traitement des courriels.', 'Gestion d agenda.', 'Suivis clients et relances.'],
        materials: ['Telephone', 'Courriel', 'CRM', 'Outils collaboratifs'],
        gallery: [
            { src: aiImage, caption: 'Assistante virtuelle integree a vos outils' },
            { src: callCenterImage, caption: 'Gestion professionnelle des appels et suivis' },
        ],
    },
    {
        slug: 'televente-appels-sortants',
        title: 'Televendeur / Televente',
        description:
            'Nos televendeurs contactent vos prospects, presentent votre offre, identifient leurs besoins et transmettent les opportunites qualifiees.',
        imageUrl: salesImage,
        icon: PhoneOutgoing,
        seoTitle: 'Televente au Quebec | Televendeurs externalises ALLO CALL',
        seoDescription:
            'Service de televente, prospection telephonique, telemarketing B2B et vente externalisee pour augmenter vos opportunites commerciales.',
        keywords: ['televente Quebec', 'televendeur', 'prospection telephonique', 'telemarketing B2B', 'vente externalisee'],
        intro:
            "Grace a notre service de televente au Quebec, vous augmentez votre volume de ventes sans les couts et la complexite lies a l'embauche d'une equipe interne.",
        sections: [
            {
                title: 'Pourquoi confier votre prospection a ALLO CALL ?',
                body:
                    'La prospection telephonique demande du temps, de la rigueur et un savoir-faire commercial. En confiant cette tache a notre equipe de vente externalisee, vous concentrez vos ressources internes sur la conclusion des ventes.',
            },
            {
                title: 'Nos services de televente comprennent',
                items: [
                    'Prospection telephonique ciblee aupres de votre clientele ideale.',
                    'Presentation de votre offre avec un argumentaire adapte.',
                    'Qualification des besoins et du niveau d interet.',
                    'Telemarketing B2B adapte aux cycles de vente entre entreprises.',
                    'Transmission des opportunites qualifiees a votre equipe commerciale.',
                    'Suivi et relance des prospects pour maximiser la conversion.',
                ],
            },
            {
                title: 'Un centre d appel vente pense pour votre croissance',
                body:
                    'Notre centre d appel vente s adapte a vos objectifs: campagne ponctuelle, prospection continue ou renfort saisonnier.',
            },
            {
                title: 'Une equipe de vente externalisee',
                body:
                    'Externaliser votre televente avec ALLO CALL vous evite les delais et les couts de recrutement, de formation et de gestion.',
            },
        ],
        ctaTitle: 'Pret a faire croitre vos ventes ?',
        ctaBody:
            'Decouvrez comment notre service de televente peut alimenter votre pipeline commercial des aujourd hui.',
        details: ['Prospection ciblee.', 'Presentation de votre offre.', 'Qualification des prospects.', 'Relance commerciale.'],
        materials: ['CRM commercial', 'Scripts', 'Telephone', 'Rapports'],
        gallery: [
            { src: salesImage, caption: 'Prospection et vente externalisee' },
            { src: callCenterImage, caption: 'Equipe de televendeurs operationnelle' },
        ],
    },
    {
        slug: 'gestion-leads',
        title: 'Gestion des leads',
        description:
            'Qualification, suivi et relance de vos prospects afin de reduire les occasions perdues.',
        imageUrl: aiImage,
        icon: Target,
        seoTitle: 'Gestion de leads et qualification prospects | ALLO CALL',
        seoDescription:
            'Centralisez, qualifiez et relancez vos leads avec une equipe dediee et des processus commerciaux structures.',
        keywords: ['gestion leads', 'qualification prospects', 'relance prospects', 'conversion leads'],
        intro:
            'Ne laissez plus vos prospects sans reponse. ALLO CALL prend en charge la qualification, la relance et le suivi de vos leads afin d augmenter votre taux de conversion.',
        sections: [
            {
                title: 'Un suivi rapide de chaque demande',
                body:
                    'Chaque nouveau contact peut etre qualifie, priorise et transmis a la bonne personne selon vos criteres commerciaux.',
            },
            {
                title: 'Nos services de gestion de leads comprennent',
                items: [
                    'Qualification des nouveaux prospects.',
                    'Identification des demandes prioritaires.',
                    'Suivi de chaque opportunite commerciale.',
                    'Relance par telephone, courriel ou SMS.',
                    'Mise a jour de votre CRM.',
                    'Transmission des prospects qualifies a votre equipe.',
                ],
            },
        ],
        ctaTitle: 'Pret a convertir plus de prospects ?',
        ctaBody:
            'Confiez-nous le traitement de vos leads pour ne plus perdre d opportunites commerciales.',
        details: ['Qualification des prospects.', 'Relance structuree.', 'Suivi CRM.', 'Transmission des opportunites.'],
        materials: ['CRM', 'Telephone', 'Courriel', 'SMS', 'Automatisation'],
        gallery: [
            { src: aiImage, caption: 'Qualification et suivi des leads' },
            { src: salesImage, caption: 'Conversion des opportunites commerciales' },
        ],
    },
    {
        slug: 'prise-rendez-vous',
        title: 'Prise de rendez-vous',
        description:
            'Nos agents contactent vos prospects et clients et prennent directement les rendez-vous dans votre calendrier.',
        imageUrl: callCenterImage,
        icon: CalendarCheck,
        seoTitle: 'Prise de rendez-vous et appointment setting | ALLO CALL',
        seoDescription:
            'Service de prise de rendez-vous telephonique, teleprospection, confirmation et integration directe a votre calendrier.',
        keywords: ['prise de rendez-vous', 'appointment setting Quebec', 'teleprospection', 'prise de rendez-vous B2B'],
        intro:
            'Notre service de prise de rendez-vous vous permet de vous concentrer sur ce que vous faites de mieux: rencontrer vos clients et conclure des ventes pendant que nous gerons la logistique du premier contact.',
        sections: [
            {
                title: 'Pourquoi confier votre appointment setting a ALLO CALL ?',
                body:
                    'L appointment setting au Quebec exige de la constance, du professionnalisme et une bonne connaissance de votre offre. En deleguant cette tache, vous evitez les creneaux vides et assurez un flux constant de rencontres qualifiees.',
            },
            {
                title: 'Nos services de prise de rendez-vous comprennent',
                items: [
                    'Prise de rendez-vous telephonique avec vos prospects et clients.',
                    'Teleprospection et identification de nouveaux contacts cibles.',
                    'Prise de rendez-vous B2B adaptee aux cycles de decision.',
                    'Confirmation et rappel de rendez-vous.',
                    'Integration directe a Google Calendar, Outlook, CRM ou autre outil.',
                    'Reprogrammation et suivi des changements d horaire.',
                ],
            },
            {
                title: 'Un agenda toujours rempli',
                body:
                    'Notre equipe s integre a vos outils pour prendre des rendez-vous directement, sans intervention de votre part.',
            },
            {
                title: 'Une teleprospection qui respecte votre image de marque',
                body:
                    'Chaque appel est effectue avec professionnalisme, en respectant votre discours de marque et vos facons de faire.',
            },
        ],
        ctaTitle: 'Pret a remplir votre agenda ?',
        ctaBody:
            'Decouvrez comment notre service de prise de rendez-vous peut generer plus de rencontres qualifiees.',
        details: ['Contact telephonique.', 'Qualification avant rendez-vous.', 'Planification calendrier.', 'Confirmation et rappels.'],
        materials: ['Calendrier', 'CRM', 'Telephone', 'Courriel', 'Automatisation'],
        gallery: [
            { src: callCenterImage, caption: 'Planification de rendez-vous qualifies' },
            { src: salesImage, caption: 'Teleprospection et agenda commercial' },
        ],
    },
    {
        slug: 'service-clientele',
        title: 'Service a la clientele',
        description:
            'Reponse aux questions, gestion des demandes, suivi des dossiers et soutien a vos clients.',
        imageUrl: callCenterImage,
        icon: Headphones,
        seoTitle: 'Service a la clientele externalise | ALLO CALL',
        seoDescription:
            'Equipe externalisee pour repondre aux appels, demandes clients, suivis de dossiers et support de relation client.',
        keywords: ['service client externalise', 'relation client', 'centre appel client'],
        intro:
            'Offrez a vos clients un service rapide, courtois et professionnel sans devoir gerer une equipe interne.',
        sections: [
            {
                title: 'Un service client coherent avec votre marque',
                body:
                    'Nos agents suivent vos consignes, votre ton et vos processus pour offrir une experience fluide a chaque client.',
            },
            {
                title: 'Ce que nous prenons en charge',
                items: [
                    'Reponse aux appels et demandes clients.',
                    'Traitement des questions concernant vos services.',
                    'Suivi des dossiers en cours.',
                    'Transmission des demandes specifiques a la bonne equipe.',
                    'Communication professionnelle adaptee a votre marque.',
                ],
            },
        ],
        ctaTitle: 'Pret a ameliorer votre relation client ?',
        ctaBody:
            'Deleguez votre service a la clientele a une equipe professionnelle et flexible.',
        details: ['Reponse aux demandes.', 'Suivi de dossiers.', 'Support multicanal.', 'Transfert vers la bonne equipe.'],
        materials: ['Telephone', 'Courriel', 'CRM', 'Messagerie', 'Base de connaissances'],
        gallery: [
            { src: callCenterImage, caption: 'Equipe disponible pour vos clients' },
            { src: aiImage, caption: 'Gestion professionnelle de la relation client' },
        ],
    },
    {
        slug: 'support-technique-niveau-1',
        title: 'Support technique niveau 1',
        description:
            'Offrez a vos utilisateurs un soutien technique rapide et fiable, sans devoir batir et gerer votre propre equipe.',
        imageUrl: aiImage,
        icon: LifeBuoy,
        seoTitle: 'Support technique niveau 1 externalise | ALLO CALL',
        seoDescription:
            'Help desk externalise pour demandes techniques courantes, diagnostic initial, suivi des tickets et escalade structuree.',
        keywords: ['support technique niveau 1', 'help desk externalise', 'service technique externalise'],
        intro:
            'Notre support technique externalise prend en charge les demandes courantes de vos clients ou de vos employes, et achemine les cas plus complexes a vos experts internes lorsque necessaire.',
        sections: [
            {
                title: 'Pourquoi externaliser votre support technique niveau 1 ?',
                body:
                    'La majorite des demandes techniques concernent des problemes simples et recurrents. En confiant ce premier niveau a ALLO CALL, vous liberez vos equipes specialisees.',
            },
            {
                title: 'Notre service technique niveau 1 comprend',
                items: [
                    'Reponse aux demandes courantes selon vos procedures.',
                    'Diagnostic initial avant escalade.',
                    'Escalade structuree vers votre equipe technique.',
                    'Suivi des tickets dans votre systeme.',
                    'Support par telephone et par courriel.',
                    'Reponses basees sur vos guides, FAQ et procedures internes.',
                ],
            },
            {
                title: 'Un help desk externalise a l image de votre entreprise',
                body:
                    'Nos agents sont formes selon vos outils et procedures pour representer fidelement votre entreprise.',
            },
        ],
        ctaTitle: 'Pret a ameliorer votre support technique ?',
        ctaBody:
            'Reduisez les delais de reponse pour vos utilisateurs avec un support niveau 1 flexible.',
        details: ['Reception des demandes.', 'Qualification des incidents.', 'Resolution des problemes courants.', 'Escalade structuree.'],
        materials: ['Ticketing', 'Telephone', 'Courriel', 'Base de connaissances', 'CRM'],
        gallery: [
            { src: aiImage, caption: 'Support technique de premier niveau' },
            { src: callCenterImage, caption: 'Gestion et suivi des demandes techniques' },
        ],
    },
    {
        slug: 'reception-telephonique',
        title: 'Reception telephonique',
        description:
            'Ne manquez plus jamais un appel important. Notre service assure la prise en charge de tous vos appels entrants avec professionnalisme.',
        imageUrl: callCenterImage,
        icon: PhoneCall,
        seoTitle: 'Reception telephonique et answering service | ALLO CALL',
        seoDescription:
            'Receptionniste virtuelle, permanence telephonique, centre d appel entrant, prise de messages et transfert d appels.',
        keywords: ['reception telephonique', 'answering service Quebec', 'receptionniste virtuelle', 'permanence telephonique'],
        intro:
            'Grace a notre receptionniste virtuelle, chaque client ou prospect qui vous appelle obtient une reponse rapide et courtoise, en tout temps.',
        sections: [
            {
                title: 'Pourquoi confier votre reception d appels a ALLO CALL ?',
                body:
                    'Un appel manque est souvent une occasion d affaires manquee. Avec un service d answering service au Quebec, vous garantissez une presence constante sans embaucher de personnel supplementaire.',
            },
            {
                title: 'Nos services de reception telephonique comprennent',
                items: [
                    'Receptionniste virtuelle avec accueil personnalise.',
                    'Permanence telephonique selon vos horaires.',
                    'Centre d appel entrant pour volumes eleves.',
                    'Prise de messages et transfert d appels.',
                    'Filtrage et priorisation des appels importants.',
                    'Reponses aux questions frequentes de vos clients.',
                ],
            },
            {
                title: 'Une permanence telephonique adaptee a vos besoins',
                body:
                    'Couverture complete, support pendant les periodes achalandees ou service apres les heures: notre equipe s ajuste a votre realite.',
            },
        ],
        ctaTitle: 'Pret a ne plus manquer un seul appel ?',
        ctaBody:
            'Decouvrez comment notre service de reception telephonique peut ameliorer l accueil offert a vos clients.',
        details: ['Reponse professionnelle.', 'Accueil personnalise.', 'Transfert aux bonnes personnes.', 'Prise de messages.'],
        materials: ['Telephonie VoIP', 'Transfert d appels', 'CRM', 'Notifications'],
        gallery: [
            { src: callCenterImage, caption: 'Reception professionnelle des appels' },
            { src: salesImage, caption: 'Permanence telephonique a distance' },
        ],
    },
    {
        slug: 'confirmation-rappel-rendez-vous',
        title: 'Confirmation de rendez-vous',
        description:
            'Notre service contacte vos clients avant leur rencontre pour confirmer leur presence, reduire les absences et optimiser votre agenda.',
        imageUrl: salesImage,
        icon: BellRing,
        seoTitle: 'Confirmation de rendez-vous et rappels | ALLO CALL',
        seoDescription:
            'Service de confirmation de rendez-vous par appels, SMS, gestion des annulations, rapports et mise a jour calendrier.',
        keywords: ['confirmation rendez-vous', 'rappel rendez-vous', 'reduction absences', 'agenda optimise'],
        intro:
            'Un rendez-vous manque, c est du temps et des revenus perdus. Ce service est particulierement efficace pour les cliniques, concessionnaires, entreprises HVAC, construction et professionnels.',
        sections: [
            {
                title: 'Pourquoi confirmer vos rendez-vous fait une vraie difference',
                body:
                    'Un simple appel de confirmation quelques jours ou quelques heures avant la rencontre permet de reduire considerablement les absences et de reprendre les creneaux annules.',
            },
            {
                title: 'Notre service de confirmation comprend',
                items: [
                    'Appels de confirmation avant le rendez-vous.',
                    'Rappels automatises et personnalises.',
                    'Gestion des annulations et reports.',
                    'Mise a jour de votre calendrier en temps reel.',
                    'Rapports de suivi sur le taux de confirmation.',
                ],
            },
            {
                title: 'Ideal pour les secteurs ou chaque rendez-vous compte',
                items: [
                    'Cliniques et professionnels de la sante.',
                    'Concessionnaires automobiles.',
                    'Entreprises HVAC et construction.',
                    'Consultants, avocats, comptables et autres professionnels.',
                ],
            },
        ],
        ctaTitle: 'Pret a reduire vos rendez-vous manques ?',
        ctaBody:
            'Optimisez votre agenda avec un service de confirmation simple, humain et structure.',
        details: ['Confirmation par appel.', 'Rappels SMS et email.', 'Gestion des reports.', 'Mise a jour du calendrier.'],
        materials: ['Appels', 'SMS', 'CRM', 'Calendrier', 'Automatisations'],
        gallery: [
            { src: salesImage, caption: 'Confirmation des rendez-vous clients' },
            { src: aiImage, caption: 'Rappels automatises et suivi calendrier' },
        ],
    },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
    return services.find((service) => service.slug === slug);
}
