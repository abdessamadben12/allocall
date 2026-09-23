// Coordonnées de l'entreprise — source unique de vérité.
// Modifier ici met à jour la navbar, le footer, la page contact et le bouton WhatsApp.
export const site = {
    name: 'ALLO CALL',
    phone: '05 22 48 44 25',
    phoneHref: 'tel:0522484425',

    // Numéro WhatsApp au format international, sans « + » ni espaces.
    // TODO: remplacer par le numéro WhatsApp mobile réel (ex: '2126XXXXXXXX').
    whatsapp: '212668746386',
    whatsappMessage: 'Bonjour ALLO CALL, je souhaite obtenir des informations sur vos services.',

    email: 'contact@allocall.ma',
    address: '3, Avenue 2 Mars Résidence Marwa 5 ème étage Casablanca, Maroc',

    // TODO: remplacer par l'embed de l'adresse exacte (Google Maps → Partager → Intégrer une carte).
    mapEmbedUrl: 'https://maps.google.com/maps?q=Casablanca%2C%20Maroc&z=12&output=embed',

    // Renseigner une URL pour faire apparaître l'icône correspondante (vide = icône masquée).
    socials: {
        facebook: '',
        instagram: '',
        linkedin: '',
    },
};

export function whatsappUrl(message = site.whatsappMessage): string {
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
