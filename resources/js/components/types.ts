export type ActiveTab = 'accueil' | 'apropos' | 'services' | 'gallery' | 'configurator' | 'devis' | 'contact';

export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
  imageUrl: string;
  iconName: string;
  category: string;
}

export interface QuoteRequest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  projectType: string;
  description: string;
  budget?: string;
  fileName?: string;
  fileSize?: string;
  date: string;
  status: 'En attente' | 'En cours d\'étude' | 'Approuvé' | 'Besoin de précisions';
  estimatedCostMin?: number;
  estimatedCostMax?: number;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  date: string;
}

export interface ConfiguratorSelection {
  projectType: 'kitchen' | 'wardrobe' | 'cladding';
  material: string; // Chêne, Noyer, MDF, etc.
  finish: string; // Mat, Laqué, Vernis
  dimensions: {
    width: number; // in meters
    height: number; // in meters
    depth?: number; // in meters
  };
  options: string[];
}
