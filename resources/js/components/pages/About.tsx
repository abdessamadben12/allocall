import { useLocale } from '@/lib/i18n';
import { Link } from '@/components/localized-link';

import { ArrowRight, CalendarCheck, Check, Headset, MessageSquare, PhoneIncoming, Workflow } from 'lucide-react';
import '../../../css/company.css';

const expertise = [
    {
        title: 'Accueil et relation client',
        description: 'Réception téléphonique, service à la clientèle, assistante virtuelle et support technique niveau 1.',
        icon: Headset,
        href: '/services/reception-telephonique',
    },
    {
        title: 'Développement commercial',
        description: 'Télévente, qualification des prospects, gestion des leads et relances commerciales.',
        icon: PhoneIncoming,
        href: '/services/televente-appels-sortants',
    },
    {
        title: 'Gestion des rendez-vous',
        description: 'Prise de rendez-vous, confirmations et rappels directement dans vos outils et votre calendrier.',
        icon: CalendarCheck,
        href: '/services/prise-rendez-vous',
    },
];
const commitments = [
    { title: 'À votre image', text: 'Nos agents suivent vos consignes et votre discours de marque pour représenter fidèlement votre entreprise.' },
    { title: 'Dans vos outils', text: 'Nous nous intégrons à votre CRM, votre agenda, votre messagerie et vos processus existants.' },
    { title: 'Selon vos besoins', text: 'Un accompagnement adapté à votre secteur, votre volume d’appels et vos objectifs.' },
];

export default function About() {
const { t } = useLocale();

    return (
        <div className="company-page">
            <section className="company-hero" aria-labelledby="about-title">
                <img src="/images/hero/allocall-about.webp" alt="" fetchPriority="high" />
                <div className="company-container">
                    <p className="company-eyebrow">{t("À propos de nous")}</p>
                    <h1 id="about-title">{t("ALLO CALL")}</h1>
                    <p>
                        {t("Une équipe à vos côtés.")}<br />
                        {t("Une relation client à votre image.")}</p>
                    <Link href="/contact" className="company-button">
                        {t("Parlons de votre entreprise ")}<ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
            <section className="company-container company-intro">
                <div>
                    <p className="company-eyebrow">{t("Qui sommes-nous ?")}</p>
                    <h2>{t("Le prolongement de votre équipe.")}</h2>
                </div>
                <div>
                    <p>
                        {t("ALLO CALL accompagne les entreprises dans la gestion de leurs appels, de leur relation client et de leur suivi commercial. Nous mettons à votre disposition des agents qui s'intègrent à vos processus et à vos outils.")}</p>
                    <p>
                        {t("PME, travailleurs autonomes ou grandes entreprises : nos services s'adaptent à votre activité pour vous permettre de vous concentrer sur vos clients et votre croissance.")}</p>
                    <p>{t("Nous accompagnons notamment les entreprises du Québec, avec une présence au Canada, au Maroc et en France.")}</p>
                </div>
            </section>
            <section className="company-expertise">
                <div className="company-container">
                    <p className="company-eyebrow">{t("Nos métiers")}</p>
                    <h2>{t("Chaque contact mérite un suivi.")}</h2>
                    <div className="company-expertise-grid">
                        {expertise.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.title}>
                                    <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
                                    <h3>{t(item.title)}</h3>
                                    <p>{t(item.description)}</p>
                                    <Link href={item.href} className="company-text-link">
                                        {t("Découvrir ")}<ArrowRight size={18} aria-hidden="true" />
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                    <Link href="/services" className="company-text-link">
                        {t("Tous nos services ")}<ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
            <section className="company-container company-commitments">
                <p className="company-eyebrow">{t("Notre façon de travailler")}</p>
                <h2>{t("Une collaboration qui s'adapte à vous.")}</h2>
                <div>
                    {commitments.map((item) => (
                        <article key={item.title}>
                            <Check size={24} aria-hidden="true" />
                            <h3>{t(item.title)}</h3>
                            <p>{t(item.text)}</p>
                        </article>
                    ))}
                </div>
            </section>
            <section className="company-human">
                <div className="company-container company-human-grid">
                    <img
                        src="/images/hero/allocall-ai.webp"
                        alt={t("Intelligence artificielle et accompagnement humain chez ALLO CALL")}
                        loading="lazy"
                        width="800"
                        height="800"
                    />
                    <div>
                        <p className="company-eyebrow">{t("Agents humains + Intelligence artificielle")}</p>
                        <h2>{t("La technologie au service de la relation.")}</h2>
                        <p>
                            {t("Chatbot IA, agent vocal, CRM intelligent et automatisations accompagnent le traitement de vos leads, les relances et la prise de rendez-vous.")}</p>
                        <p>
                            {t("Nos agents prennent le relais lorsqu'une demande nécessite une conversation personnalisée, une assistance spécifique ou une intervention humaine.")}</p>
                        <Link href="/solutions-ia" className="company-text-link">
                            {t("Explorer nos solutions IA ")}<Workflow size={19} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="company-container company-sector">
                <MessageSquare size={32} aria-hidden="true" />
                <h2>{t("Votre secteur a ses propres enjeux.")}</h2>
                <p>
                    {t("Automobile, santé, HVAC et thermopompes, construction, assurance, immobilier : nous adaptons nos équipes, nos scripts et nos outils à votre réalité.")}</p>
                <Link href="/industries" className="company-text-link">
                    {t("Découvrir nos industries ")}<ArrowRight size={18} aria-hidden="true" />
                </Link>
            </section>
            <section className="company-contact">
                <div className="company-container">
                    <p className="company-eyebrow">{t("Construisons votre accompagnement")}</p>
                    <h2>{t("Parlons de votre organisation.")}</h2>
                    <p>{t("Confiez-nous vos appels, vos prospects et vos rendez-vous. Définissons ensemble le soutien dont votre entreprise a besoin.")}</p>
                    <Link href="/contact" className="company-button">
                        {t("Nous contacter ")}<ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
