// Données de la galerie — ajouter/retirer des projets ici, la page /galerie se met à jour seule.
export interface GalleryItem {
    id: string;
    title: string;
    category: string;
    description: string;
    image: string;
    location?: string;
    year?: number;
    // Renseigner pour afficher un slider avant/après dans la lightbox.
    beforeAfter?: { before: string; after: string };
}

export const galleryCategories = [
    { value: 'all', label: 'Tous les projets' },
    { value: 'cuisine', label: 'Cuisines' },
    { value: 'salon', label: 'Salons' },
    { value: 'dressing', label: 'Dressings' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'construction', label: 'Construction' },
    { value: 'renovation', label: 'Rénovation' },
    { value: 'amenagement', label: 'Aménagement' },
];

export const galleryItems: GalleryItem[] = [
    // — Cuisines —
    {
        id: '1',
        title: 'Cuisine Moderne Noyer',
        category: 'cuisine',
        description: 'Cuisine contemporaine en noyer massif avec plan de travail fenix noir mat et électroménagers intégrés haut de gamme.',
        image: '/images/cuisines/cuisine-moderne.jpg',
        location: 'Casablanca',
        year: 2024,
    },
    {
        id: '2',
        title: 'Cuisine Équipée Contemporaine',
        category: 'cuisine',
        description: 'Cuisine équipée sur-mesure avec façades laquées, îlot central et rangements optimisés jusqu’au plafond.',
        image: '/images/cuisines/cuisine-moderne-3.webp',
        location: 'Casablanca',
        year: 2024,
    },
    {
        id: '3',
        title: 'Cuisine Design Épurée',
        category: 'cuisine',
        description: 'Lignes épurées, crédence en grès cérame et éclairage LED sous meubles pour un plan de travail parfaitement fonctionnel.',
        image: '/images/cuisines/cuisine-moderne-4.webp',
        location: 'Rabat',
        year: 2023,
    },
    // — Salons —
    {
        id: '4',
        title: 'Habillage Mural Salon',
        category: 'salon',
        description: "Claustra décoratif en chêne massif créant une séparation élégante entre le salon et l'espace cuisine.",
        image: '/images/agencement/agencement-et-aménagement.webp',
        location: 'Casablanca',
        year: 2024,
    },
    {
        id: '5',
        title: 'Décoration Intérieure Salon',
        category: 'salon',
        description: 'Décoration intérieure complète : habillages muraux, faux plafond à gorges lumineuses et finitions peinture veloutée.',
        image: '/images/agencement/décoration_intérieure.webp',
        location: 'Casablanca',
        year: 2023,
    },
    {
        id: '6',
        title: 'Ambiance Salon Sur-Mesure',
        category: 'salon',
        description: 'Aménagement chaleureux d’un séjour avec menuiseries intégrées et jeux de matières bois et pierre.',
        image: '/images/decoration-interieur.jpg',
        location: 'Marrakech',
        year: 2023,
    },
    // — Dressings —
    {
        id: '7',
        title: 'Dressing Luxe',
        category: 'dressing',
        description: 'Dressing haut de gamme avec rangements optimisés, éclairage LED intégré et placards vitrés design.',
        image: '/images/cuisines/dressing-1.webp',
        location: 'Marrakech',
        year: 2023,
    },
    {
        id: '8',
        title: 'Dressing Sur-Mesure',
        category: 'dressing',
        description: 'Dressing toute hauteur en panneaux mélaminés haute résistance, penderies et tiroirs à fermeture douce.',
        image: '/images/cuisines/dressing.jpg',
        location: 'Casablanca',
        year: 2024,
    },
    // — Commercial —
    {
        id: '9',
        title: 'Agencement Commercial',
        category: 'commercial',
        description: "Boutique haut de gamme avec présentoirs sur-mesure, comptoir de vente et espace d'accueil premium.",
        image: '/images/slidealidade/industrie-publicitaire.webp',
        location: 'Casablanca',
        year: 2023,
    },
    {
        id: '10',
        title: 'Espace Professionnel',
        category: 'commercial',
        description: 'Agencement de bureaux avec cloisonnement modulaire acoustique et banque d’accueil haut de gamme.',
        image: '/images/agencement/agencement-et-réaménagement-image-3.webp',
        location: 'Casablanca',
        year: 2024,
    },
    {
        id: '11',
        title: 'Showroom & Présentoirs',
        category: 'commercial',
        description: 'Optimisation fonctionnelle d’un espace d’exposition : présentoirs éclairés, rails lumineux et finitions laquées.',
        image: '/images/slidealidade/agencement-profesionnel.webp',
        location: 'Rabat',
        year: 2022,
    },
    // — Construction —
    {
        id: '12',
        title: 'Rénovation Construction',
        category: 'construction',
        description: "Projet de rénovation complète avec restructuration d'espace et finitions premium.",
        image: '/images/construction-rénovation-1.webp',
        location: 'Rabat',
        year: 2023,
    },
    {
        id: '13',
        title: 'Second-Œuvre Complet',
        category: 'construction',
        description: 'Prise en charge du second-œuvre : cloisons, plâtrerie, électricité et finitions, avec suivi de chantier dédié.',
        image: '/images/construction-rénovation-4.webp',
        location: 'Casablanca',
        year: 2023,
        beforeAfter: {
            before: '/images/Travaux-demolition-1.jpg',
            after: '/images/construction-rénovation-4.webp',
        },
    },
    {
        id: '14',
        title: 'Gros Œuvre & Maçonnerie',
        category: 'construction',
        description: 'Travaux de démolition contrôlée et reconstruction avec redistribution complète des espaces.',
        image: '/images/construction-rénovation-6.webp',
        location: 'Casablanca',
        year: 2022,
    },
    // — Rénovation —
    {
        id: '15',
        title: 'Réhabilitation Bâtiment',
        category: 'renovation',
        description: "Réhabilitation thermique et acoustique d'un bâtiment ancien avec modernisation complète.",
        image: '/images/revetement-sol/revetement-sol-1.webp',
        location: 'Fès',
        year: 2022,
    },
    {
        id: '16',
        title: 'Rénovation & Finitions',
        category: 'renovation',
        description: 'Rénovation complète d’un appartement : démolition, plâtrerie, peinture et revêtements de sol.',
        image: '/images/slidealidade/renovation-et-travaux-e-finition.webp',
        location: 'Casablanca',
        year: 2024,
        beforeAfter: {
            before: '/images/Travaux-demolition-2.jpg',
            after: '/images/slidealidade/renovation-et-travaux-e-finition.webp',
        },
    },
    {
        id: '17',
        title: 'Faux Plafond Lumineux',
        category: 'renovation',
        description: 'Faux plafond suspendu en plaques de plâtre avec gorges lumineuses LED pour un éclairage indirect moderne.',
        image: '/images/faux-plafon/faux-plafon-3.webp',
        location: 'Casablanca',
        year: 2023,
    },
    {
        id: '18',
        title: 'Mise en Peinture Premium',
        category: 'renovation',
        description: 'Préparation soignée des supports, enduisage croisé et peinture veloutée de qualité professionnelle.',
        image: '/images/travaux-peinture2.webp',
        location: 'Casablanca',
        year: 2024,
    },
    // — Aménagement —
    {
        id: '19',
        title: 'Aménagement Intérieur',
        category: 'amenagement',
        description: "Aménagement complet d'espaces professionnels avec cloisonnement acoustique modulable.",
        image: '/images/agencement/agencement-et-réaménagement-image-2.webp',
        location: 'Casablanca',
        year: 2022,
    },
    {
        id: '20',
        title: 'Menuiserie Aluminium & Vitrage',
        category: 'amenagement',
        description: 'Vitrage accordéon coulissant et menuiseries aluminium à rupture de pont thermique.',
        image: '/images/vitrage-accordeon-coulissant-1.webp',
        location: 'Casablanca',
        year: 2023,
    },
    {
        id: '21',
        title: 'Pergola Bioclimatique',
        category: 'amenagement',
        description: 'Pergola bioclimatique à lames orientables pour profiter de votre terrasse en toute saison.',
        image: '/images/pergola-bioclimatique-1.webp',
        location: 'Casablanca',
        year: 2024,
    },
    {
        id: '22',
        title: 'Menuiserie Bois Sur-Mesure',
        category: 'amenagement',
        description: 'Agencements bois sur-mesure : bibliothèques, plans de travail et portes en bois massif certifié.',
        image: '/images/alidade-Travaux-de-bois-32.webp',
        location: 'Casablanca',
        year: 2023,
    },
];
