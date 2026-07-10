import { LayoutGrid, Hammer, Paintbrush, Grid3X3, Layers, Building2, DoorOpen, type LucideIcon } from 'lucide-react';
import {
  servicesAluminium,
  servicesCommercial,
  servicesConstruction,
  servicesCeiling,
  servicesFloor,
  servicesPainting,
  servicesWoodwork,
} from '@/image';

export interface ServiceDetail {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  icon: LucideIcon;
  details: string[];
  materials: string[];
  gallery: { src: string; caption: string }[];
}

export const services: ServiceDetail[] = [
  {
    slug: 'aluminium',
    title: 'Travaux Aluminium',
    description: "Fenêtres, baies vitrées, vérandas et façades : Alidade conçoit et pose des menuiseries aluminium et PVC de haute technicité, alliant performance thermique, sécurité et design contemporain. Chaque réalisation est fabriquée sur mesure dans notre atelier et posée par nos propres équipes.",
    imageUrl: servicesAluminium,
    icon: LayoutGrid,
    details: [
      'Conception de baies coulissantes et fenêtres battantes haute performance thermique.',
      'Réalisation de cloisons amovibles en aluminium pour bureaux et espaces pro.',
      "Création de verrières d'intérieur style atelier d'artiste.",
      'Mise en œuvre de façades rideaux et murs de verre structuraux.',
    ],
    materials: ['Aluminium thermolaqué labellisé Qualicoat', 'Double et triple vitrage acoustique/thermique Saint-Gobain', 'Profilés à rupture de pont thermique de dernière génération'],
    gallery: [
      { src: '/images/travaux-aliminium-1.webp', caption: 'Menuiserie aluminium sur mesure' },
      { src: '/images/vitrage-accordeon-coulissant-1.webp', caption: 'Vitrage accordéon coulissant' },
    ],
  },
  {
    slug: 'renovation',
    title: 'Travaux De Construction Et Rénovation',
    description: "De la démolition à la livraison clé en main, Alidade pilote toutes les étapes de votre construction ou rénovation, pour l'habitation comme pour le commercial. Un seul interlocuteur, un planning maîtrisé et des finitions à la hauteur de vos exigences.",
    imageUrl: servicesConstruction,
    icon: Hammer,
    details: [
      'Prise en charge du second-œuvre complet de votre chantier.',
      "Démolition contrôlée, modification de cloisons porteuses et redistribution d'espace.",
      'Réhabilitation thermique et phonique globale des bâtiments anciens.',
      'Suivi de chantier rigoureux par un conducteur de travaux dédié.',
    ],
    materials: ['Matériaux certifiés aux normes de sécurité en vigueur', 'Isolants biosourcés haute densité', "Structures d'ossatures renforcées"],
    gallery: [
      { src: '/images/construction-rénovation-1.webp', caption: 'Chantier de rénovation complète' },
      { src: '/images/construction-rénovation-3.webp', caption: 'Second-œuvre et redistribution d’espace' },
    ],
  },
  {
    slug: 'peinture',
    title: 'Travaux De Peinture',
    description: "Un mur parfait commence bien avant la peinture : nos équipes préparent minutieusement chaque support (ratissage, enduisage, impression) avant d'appliquer deux couches de finition haut de gamme. Résultat : des surfaces impeccables et durables, mates, satinées ou décoratives.",
    imageUrl: servicesPainting,
    icon: Paintbrush,
    details: [
      "Ratissage complet des murs et enduisage croisé pour un support d'une planéité parfaite.",
      'Peinture mate, satinée ou veloutée de qualité professionnelle à fort pouvoir couvrant.',
      "Application d'enduits décoratifs effet béton ciré, stuc, chaux ou peintures texturées.",
      'Traitement antifissures et imperméabilisation de tous types de parois.',
    ],
    materials: ['Peintures haut de gamme éco-responsables (Label NF Environnement)', 'Enduits de lissage extra-fins', 'Pigments naturels résistants aux UV'],
    gallery: [
      { src: '/images/alidade-traveaux-pinture-1.jfif', caption: 'Mise en peinture de finition' },
      { src: '/images/travaux-peinture2.webp', caption: 'Préparation soignée des supports' },
    ],
  },
  {
    slug: 'sol',
    title: 'Revêtement De Sol',
    description: "Parquet massif, carrelage grand format, marbre ou résine continue : le sol signe le caractère de votre espace. Alidade vous conseille sur le matériau adapté à chaque pièce et garantit une pose de précision, du ragréage à la finition, en intérieur comme en extérieur.",
    imageUrl: servicesFloor,
    icon: Grid3X3,
    details: [
      'Pose de parquet massif ou contrecollé en chêne naturel (pose droite, point de Hongrie, bâtons rompus).',
      'Pose de carrelages grand format, grès cérame, marbre poli ou carreaux de ciment rétro.',
      'Application de résines de sol continues sans joints pour un design ultra-contemporain.',
      "Préparation de chapes d'égalisation autolissantes haute précision.",
    ],
    materials: ['Bois nobles certifiés PEFC (provenance forêts éco-gérées)', 'Adhésifs et joints flexibles antibactériens', 'Finitions vitrifiées, huilées ou cirées ultra-résistantes'],
    gallery: [
      { src: '/images/revetement-sol/revetement-sol-1.webp', caption: 'Pose de revêtement de sol' },
      { src: '/images/revetement-sol/revetement_sol4.webp', caption: 'Finition haut de gamme' },
    ],
  },
  {
    slug: 'plafond',
    title: 'Plafond Et Faux Plafond',
    description: "Bien plus qu'une solution technique pour dissimuler câbles et gaines, le faux plafond sculpte la lumière de votre intérieur : gorges lumineuses LED, plafonds acoustiques ou tendus à finition miroir. Alidade conçoit et pose des plafonds qui transforment l'ambiance de chaque pièce.",
    imageUrl: servicesCeiling,
    icon: Layers,
    details: [
      'Création de faux plafonds suspendus en plaques de plâtre (Placo) sur ossature métallique.',
      'Intégration de gorges lumineuses pour éclairage LED indirect moderne.',
      'Mise en place de dalles de faux plafonds acoustiques démontables pour locaux pro.',
      'Réalisation de plafonds tendus à finition miroir ou mate.',
    ],
    materials: ['Plaques de plâtre hydrofuges (BA13) ou acoustiques', 'Profilés métalliques rigides certifiés CSTB', 'Systèmes de suspentes antivibratoires'],
    gallery: [
      { src: '/images/faux-plafon/faux-plafon-3.webp', caption: 'Faux plafond avec éclairage indirect' },
      { src: '/images/faux-plafon/faux-plafon-5.webp', caption: 'Plafond suspendu en plaques de plâtre' },
    ],
  },
  {
    slug: 'amenagement',
    title: 'Aménagement Commerciale',
    description: "Boutiques, bureaux, showrooms : votre espace de travail est votre première vitrine. Alidade conçoit et réalise des agencements commerciaux sur mesure qui valorisent votre image, optimisent les parcours clients et améliorent le confort de vos équipes.",
    imageUrl: servicesCommercial,
    icon: Building2,
    details: [
      'Agencement complet de boutiques, comptoirs de vente et présentoirs sur-mesure.',
      'Cloisonnement modulaire acoustique pour open spaces et salles de réunion.',
      "Création d'espaces d'accueil conviviaux et de banques de réception haut de gamme.",
      "Optimisation fonctionnelle et ergonomique des espaces d'exposition et showrooms.",
    ],
    materials: ['Panneaux mélaminés et stratifiés haute résistance à l\'abrasion', "Bois massif d'ébenisterie", 'Intégrations de rails lumineux et prises de raccordement discrètes'],
    gallery: [
      { src: '/images/agencement/agencement-et-réaménagement-image-2.webp', caption: 'Agencement de locaux professionnels' },
      { src: '/images/agencement/agencement-et-réaménagement-image-3.webp', caption: 'Aménagement d’espace commercial' },
    ],
  },
  {
    slug: 'menuiserie-bois',
    title: 'Travaux Menuiserie Et Bois',
    description: "Le bois est notre matière de prédilection : portes de tous types, châssis, dressings, bibliothèques et cuisines sur mesure prennent forme dans notre atelier de menuiserie. Des essences nobles certifiées, une quincaillerie de précision et des finitions d'ébéniste.",
    imageUrl: servicesWoodwork,
    icon: DoorOpen,
    details: [
      'Pose de portes standards, coupe-feu, coulissantes et à galandage.',
      'Fabrication de châssis bois, PVC ou aluminium sur mesure.',
      "Réalisation d'agencements bois sur-mesure : dressings, bibliothèques, plans de travail.",
      'Installation de tablettes et étagères sur crémaillères pour rangements modulables.',
    ],
    materials: ['Bois massif et panneaux dérivés certifiés PEFC/FSC', 'Quincaillerie de précision haute durabilité', "Vernis et lasures de finition adaptés à chaque essence"],
    gallery: [
      { src: '/images/alidade-Travaux-de-bois-32.webp', caption: 'Menuiserie bois sur mesure' },
      { src: '/images/cuisines/cuisine-moderne-3.webp', caption: 'Cuisine moderne en bois' },
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return services.find((service) => service.slug === slug);
}
