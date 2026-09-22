export const aiWorkflow = [
    {
        id: 'lead',
        label: 'Lead',
        title: 'Chaque nouveau contact compte.',
        description:
            'Site web, formulaire ou campagne publicitaire : une nouvelle demande peut d\u00e9clencher automatiquement le traitement du prospect.',
        href: '#automatisation-leads',
    },
    {
        id: 'qualification',
        label: 'Qualification',
        title: 'Comprendre avant de proposer.',
        description: 'L\u2019IA identifie le besoin et qualifie la demande pour orienter chaque prospect vers la bonne action.',
        href: '#chatbot-ia',
    },
    {
        id: 'sms',
        label: 'SMS',
        title: 'Un premier retour, sans attendre.',
        description: 'Un SMS ou un email personnalis\u00e9 confirme la r\u00e9ception de la demande et pr\u00e9pare la suite de la conversation.',
        href: '#sms-email',
    },
    {
        id: 'appel',
        label: 'Appel',
        title: 'La conversation prend le relais.',
        description: 'Un agent vocal IA ou un agent humain contacte le prospect selon son besoin et votre processus commercial.',
        href: '#voice-agent',
    },
    {
        id: 'relance',
        label: 'Relance',
        title: 'Garder le fil de chaque opportunit\u00e9.',
        description: 'Des relances par appel, SMS ou email accompagnent le prospect et assurent un suivi r\u00e9gulier.',
        href: '#sms-email',
    },
    {
        id: 'rendez-vous',
        label: 'Rendez-vous',
        title: 'Transformer l\u2019int\u00e9r\u00eat en rencontre.',
        description:
            'Le besoin et les disponibilit\u00e9s sont identifi\u00e9s. Le rendez-vous est enregistr\u00e9, puis confirm\u00e9 dans vos outils.',
        href: '#rendez-vous-ia',
    },
    {
        id: 'crm',
        label: 'CRM',
        title: 'Toute l\u2019histoire, au m\u00eame endroit.',
        description:
            'Coordonn\u00e9es, appels, interactions et rendez-vous sont centralis\u00e9s pour donner \u00e0 vos \u00e9quipes une vision claire de chaque opportunit\u00e9.',
        href: '#crm-intelligent',
    },
];

export const aiSolutions = [
    {
        id: 'crm-intelligent',
        label: 'CRM intelligent',
        title: 'Tous vos prospects au m\u00eame endroit.',
        description:
            'Centralisez vos prospects, clients, appels, demandes, rendez-vous et interactions dans un CRM intelligent. Notre solution permet de mieux organiser vos donn\u00e9es et de suivre chaque prospect tout au long de son parcours.',
        items: [
            'Gestion et centralisation des leads',
            'Qualification des prospects',
            'Historique des appels et interactions',
            'Suivi commercial',
            'Gestion des rendez-vous',
            'Relances automatiques',
            'Mise \u00e0 jour du CRM',
            'Suivi des conversions',
        ],
        conclusion: 'Vos \u00e9quipes disposent ainsi d\u2019une vision claire de chaque prospect et de chaque opportunit\u00e9 commerciale.',
    },
    {
        id: 'automatisation-leads',
        label: 'Automatisation des leads',
        title: 'Aucun prospect laiss\u00e9 sans r\u00e9ponse.',
        description:
            'Lorsqu\u2019un nouveau lead arrive depuis votre site web, formulaire, campagne publicitaire ou autre canal, son traitement peut \u00eatre automatiquement d\u00e9clench\u00e9. L\u2019intelligence artificielle peut identifier le besoin du prospect, qualifier sa demande et d\u00e9clencher les actions appropri\u00e9es.',
        steps: ['Nouveau lead', 'Qualification', 'SMS', 'Appel', 'Relance', 'Rendez-vous', 'CRM'],
        conclusion:
            'Cette automatisation permet de r\u00e9duire les d\u00e9lais de r\u00e9ponse, am\u00e9liorer le suivi des prospects et optimiser la conversion des leads.',
    },
    {
        id: 'chatbot-ia',
        label: 'Chatbot IA',
        title: 'Votre assistant commercial, disponible 24h/24.',
        description:
            'Transformez les visiteurs de votre site web en prospects gr\u00e2ce \u00e0 un chatbot intelligent aliment\u00e9 par l\u2019intelligence artificielle. Il comprend les demandes, r\u00e9pond aux questions fr\u00e9quentes et collecte les coordonn\u00e9es.',
        items: [
            'R\u00e9pondre automatiquement aux questions',
            'Pr\u00e9senter vos services',
            'Identifier les besoins des visiteurs',
            'Collecter les coordonn\u00e9es',
            'Qualifier les prospects',
            'G\u00e9n\u00e9rer des leads',
            'Proposer une prise de rendez-vous',
            'Orienter vers le bon service',
            'Transf\u00e9rer la conversation \u00e0 un agent',
        ],
        conclusion: 'Votre entreprise reste ainsi disponible 24h/24 et 7j/7.',
    },
    {
        id: 'voice-agent',
        label: 'AI Voice Agent',
        title: 'Des appels intelligents gr\u00e2ce \u00e0 l\u2019IA.',
        description:
            'L\u2019agent vocal IA automatise certaines conversations t\u00e9l\u00e9phoniques. Il peut \u00eatre utilis\u00e9 pour les appels entrants et sortants, la qualification de prospects, les relances ou encore la prise de rendez-vous.',
        items: [
            'R\u00e9pondre aux appels',
            'Qualifier les prospects',
            'Identifier les besoins',
            'Prendre des rendez-vous',
            'Confirmer les rendez-vous',
            'Effectuer des relances',
            'Transf\u00e9rer les appels complexes \u00e0 un agent humain',
        ],
        conclusion:
            'L\u2019objectif n\u2019est pas de remplacer syst\u00e9matiquement vos \u00e9quipes : l\u2019IA prend en charge les t\u00e2ches r\u00e9p\u00e9titives et laisse vos agents se concentrer sur les conversations qui n\u00e9cessitent une v\u00e9ritable intervention humaine.',
    },
    {
        id: 'sms-email',
        label: 'SMS & Email Automation',
        title: 'Un suivi qui garde le contact.',
        description:
            'Chaque interaction peut d\u00e9clencher automatiquement l\u2019envoi d\u2019un SMS ou d\u2019un email personnalis\u00e9. Les automatisations peuvent \u00eatre d\u00e9clench\u00e9es apr\u00e8s :',
        items: [
            'Un formulaire web',
            'Une demande d\u2019information',
            'Un appel',
            'Une demande de devis',
            'Une soumission',
            'Une prise de rendez-vous',
            'Une annulation',
            'Une absence au rendez-vous',
            'Une relance commerciale',
        ],
        steps: ['Formulaire web', 'SMS de confirmation', 'Appel', 'Relance', 'Rendez-vous', 'Confirmation SMS'],
        conclusion: 'Vous gagnez du temps tout en assurant un suivi r\u00e9gulier et professionnel de vos prospects.',
    },
    {
        id: 'rendez-vous-ia',
        label: 'Prise de rendez-vous automatis\u00e9e',
        title: 'De l\u2019int\u00e9r\u00eat au rendez-vous.',
        description:
            'L\u2019IA peut accompagner votre prospect jusqu\u2019\u00e0 la prise de rendez-vous. Elle peut identifier son besoin, v\u00e9rifier ses disponibilit\u00e9s, proposer un cr\u00e9neau et enregistrer le rendez-vous dans votre syst\u00e8me.',
        steps: ['Besoin identifi\u00e9', 'Disponibilit\u00e9s', 'Cr\u00e9neau propos\u00e9', 'Rendez-vous enregistr\u00e9', 'Confirmation et rappel'],
        conclusion:
            'Une fois le rendez-vous pris, des SMS et emails de confirmation ou de rappel peuvent \u00eatre automatiquement envoy\u00e9s. Une solution particuli\u00e8rement adapt\u00e9e aux entreprises qui re\u00e7oivent un grand nombre de demandes commerciales ou de rendez-vous.',
    },
];

export const aiIndustries = [
    {
        name: 'Automobile',
        description: 'Qualification des prospects, prise de rendez-vous, relance commerciale et suivi apr\u00e8s-vente.',
        href: '/industries/automobile',
    },
    {
        name: 'Immobilier',
        description: 'Qualification des acheteurs et locataires, traitement des demandes et prise de rendez-vous.',
        href: '/industries#immobilier',
    },
    {
        name: 'Assurance',
        description: 'Qualification des prospects, appels sortants, collecte d\u2019informations et prise de rendez-vous.',
        href: '/industries#assurance',
    },
    { name: 'Sant\u00e9', description: 'Gestion des demandes, prise de rendez-vous, confirmations et rappels.', href: '/industries/sante' },
    {
        name: 'Services professionnels',
        description: 'G\u00e9n\u00e9ration de leads, qualification commerciale, t\u00e9l\u00e9prospection et suivi des prospects.',
        href: '/contact',
    },
];

export const humanInterventions = [
    'Une conversation personnalis\u00e9e',
    'Une n\u00e9gociation commerciale',
    'Une demande complexe',
    'Une assistance sp\u00e9cifique',
    'Une intervention humaine',
];
