// Coordonnées de l'entreprise — source unique de vérité.
// Modifier ici met à jour la navbar, le footer, la page contact et le bouton WhatsApp.
export const site = {
    name: 'ALLO CALL',
    phone: '+1 514-850-9092',
    phoneHref: 'tel:+15148509092',

    // Numéro WhatsApp au format international, sans « + » ni espaces.
    // TODO: remplacer par le numéro WhatsApp mobile réel (ex: '2126XXXXXXXX').
    whatsapp: '+15148509092',
    whatsappMessage: 'Bonjour ALLO CALL, je souhaite obtenir des informations sur vos services.',

    email: 'contact@allocall.ca',
    address: 'Québec, Canada',

    // Zone desservie au Québec. Remplacer par l'embed de l'adresse exacte dès qu'un bureau existe
    // (Google Maps → Partager → Intégrer une carte).
    mapEmbedUrl: 'https://maps.google.com/maps?q=Montr%C3%A9al%2C%20QC%2C%20Canada&z=10&output=embed',

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
