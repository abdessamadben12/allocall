import { useLocale } from '@/lib/i18n';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { industryAutomation, industryOverview } from '@/data/industry-overview';
import { Link } from '@/components/localized-link';

import {
    ArrowDown,
    ArrowRight,
    AudioLines,
    Building2,
    CarFront,
    Check,
    ChevronDown,
    Database,
    HardHat,
    Headset,
    HeartPulse,
    Mail,
    MessageSquare,
    ShieldCheck,
    Snowflake,
    Workflow,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import '../../../css/content-details.css';
import '../../../css/industries.css';

const sectorIcons = [CarFront, HeartPulse, Snowflake, HardHat, ShieldCheck, Building2];
const automationIcons = [MessageSquare, AudioLines, Database, Mail, Workflow];

export default function IndustriesPage() {
const { t } = useLocale();

    const [activeSector, setActiveSector] = useState('');

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSector(entry.target.id);
                });
            },
            { rootMargin: '-15% 0px -55% 0px' },
        );
        industryOverview.forEach(({ slug }) => {
            const section = document.getElementById(slug);
            if (section) observer.observe(section);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="industries-page">
            <SeoHead />
            <Navbar />
            <main className="public-content">
                <section className="industry-hero" aria-labelledby="industry-title">
                    <img src="/images/hero/allocall-industries.webp" alt="" className="industry-hero-image" fetchPriority="high" />
                    <div className="industry-container industry-hero-content">
                        <p className="industry-eyebrow">{t("ALLO CALL / Industries")}</p>
                        <h1 id="industry-title">
                            {t("Un centre d'appels")}<br />
                            {t("pour votre ")}<span>{t("industrie.")}</span>
                        </h1>
                        <p className="industry-hero-description">
                            {t("Votre secteur a ses exigences.")}<br />
                            {t("Notre équipe parle votre métier.")}</p>
                        <a href="#secteurs" className="industry-button bg-alidade-gold">
                            {t("Explorer nos secteurs ")}<ArrowDown size={18} aria-hidden="true" />
                        </a>
                    </div>
                </section>

                <nav id="secteurs" className="industry-navigation" aria-label={t("Nos secteurs d'intervention")}>
                    <div className="industry-container industry-navigation-inner">
                        {industryOverview.map((sector, index) => {
                            const Icon = sectorIcons[index];
                            return (
                                <a
                                    key={sector.slug}
                                    href={`#${sector.slug}`}
                                    aria-current={activeSector === sector.slug ? 'location' : undefined}
                                    onClick={() => setActiveSector(sector.slug)}
                                >
                                    <Icon size={23} strokeWidth={1.6} aria-hidden="true" />
                                    <span>{t(sector.name)}</span>
                                </a>
                            );
                        })}
                    </div>
                </nav>

                <section className="industry-container industry-intro" aria-labelledby="industry-intro-title">
                    <div>
                        <p className="industry-eyebrow">{t("Une expertise, plusieurs univers")}</p>
                        <h2 id="industry-intro-title">
                            {t("Votre réalité.")}<br />
                            {t("Notre point de départ.")}</h2>
                    </div>
                    <div className="industry-intro-copy">
                        <p>
                            {t("Des agents, des outils et des scripts adaptés à votre secteur pour gérer vos appels et vos rendez-vous.")}</p>
                    </div>
                </section>

                <div className="industry-sectors">
                    {industryOverview.map((sector, index) => {
                        const Icon = sectorIcons[index];
                        return (
                            <section
                                key={sector.slug}
                                id={sector.slug}
                                className={`industry-sector ${index % 2 ? 'industry-sector-reversed' : ''}`}
                                aria-labelledby={`${sector.slug}-title`}
                            >
                                <div className="industry-container industry-sector-grid">
                                    <div className="industry-sector-visual">
                                        <div className="industry-sector-photo">
                                            <img src={sector.image} alt={t(sector.imageAlt)} loading="lazy" decoding="async" width="960" height="1080" />
                                            <span className="industry-sector-number" aria-hidden="true">
                                                {t("0")}{index + 1}
                                            </span>
                                        </div>
                                        <div className="industry-sector-caption">
                                            <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                                            <span>{t(sector.name)}</span>
                                            <ArrowDown size={18} aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="industry-sector-copy">
                                        <p className="industry-eyebrow">{t("Votre centre d'appels")}</p>
                                        <h2 id={`${sector.slug}-title`}>{t(sector.name)}</h2>
                                        <p className="industry-sector-description">{t(sector.summary)}</p>
                                        <ul className="industry-services">
                                            {sector.services.slice(0, 3).map((service) => (
                                                <li key={service}>
                                                    <Check size={16} aria-hidden="true" />
                                                    <span>{service}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <details className="content-details">
                                            <summary>
                                                <span>{t("Prestations et détails")}</span>
                                                <ChevronDown size={18} aria-hidden="true" />
                                            </summary>
                                            <div className="content-details-body">
                                                <p className="industry-sector-description">{t(sector.description)}</p>
                                                <ul className="industry-services">
                                                    {sector.services.slice(3).map((service) => (
                                                        <li key={service}>
                                                            <Check size={16} aria-hidden="true" />
                                                            <span>{service}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                {sector.flow && (
                                                    <ol className="industry-flow" aria-label={t("Parcours de suivi")}>
                                                        {sector.flow.map((step, stepIndex) => (
                                                            <li key={step}>
                                                                {stepIndex > 0 && <ArrowRight size={13} aria-hidden="true" />}
                                                                <span>{t(step)}</span>
                                                            </li>
                                                        ))}
                                                    </ol>
                                                )}
                                                {sector.note && <p className="industry-sector-note">{t(sector.note)}</p>}
                                            </div>
                                        </details>
                                        <Link href={sector.href} className="industry-text-link">
                                            {t(sector.linkLabel)}
                                            <ArrowRight size={18} aria-hidden="true" />
                                        </Link>
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </div>

                <section className="industry-ai" aria-labelledby="industry-ai-title">
                    <div className="industry-container">
                        <div className="industry-ai-heading">
                            <div>
                                <p className="industry-eyebrow">{t("L'intelligence au service du lien")}</p>
                                <h2 id="industry-ai-title">
                                    {t("Votre secteur.")}<br />
                                    {t("L'humain ")}<span>{t("+ l'IA.")}</span>
                                </h2>
                            </div>
                            <p>{t("L'IA automatise le suivi. Nos agents prennent le relais quand la conversation le demande.")}</p>
                        </div>
                        <div className="industry-ai-grid">
                            <div className="industry-ai-visual">
                                <img
                                    src="/images/hero/allocall-ai.webp"
                                    alt={t("Expertise humaine et outils numériques au service de la relation client")}
                                    loading="lazy"
                                    width="800"
                                    height="800"
                                />
                                <div className="industry-ai-caption">
                                    <Headset size={25} aria-hidden="true" />
                                    <span>
                                        {t("La technologie accélère.")}<br />
                                        <strong>{t("L'humain fait la différence.")}</strong>
                                    </span>
                                </div>
                            </div>
                            <div className="industry-ai-list">
                                {industryAutomation.map((solution, index) => {
                                    const Icon = automationIcons[index];
                                    return (
                                        <div key={solution.title} className="industry-ai-item">
                                            <Icon size={25} strokeWidth={1.5} aria-hidden="true" />
                                            <div>
                                                <h3>{t(solution.title)}</h3>
                                                <p>{t(solution.description)}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Link href="/solutions-ia" className="industry-text-link">
                                    {t("Explorer nos solutions IA ")}<ArrowRight size={18} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="industry-contact" aria-labelledby="industry-contact-title">
                    <div className="industry-container industry-contact-grid">
                        <div>
                            <p className="industry-eyebrow">{t("Votre activité, notre prochaine rencontre")}</p>
                            <h2 id="industry-contact-title">
                                {t("Et si on parlait")}<br />
                                {t("de ")}<span>{t("votre secteur ?")}</span>
                            </h2>
                        </div>
                        <div>
                            <p>{t("Parlons de vos appels, de vos clients et de ce que nous pouvons prendre en charge.")}</p>
                            <div className="industry-contact-actions">
                                <Link href="/devis" className="industry-button industry-button-dark">
                                    {t("Demander une soumission ")}<ArrowRight size={18} aria-hidden="true" />
                                </Link>
                                <Link href="/contact" className="industry-text-link">
                                    {t("Nous contacter ")}<ArrowRight size={18} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="industry-container industry-other-sectors">
                        <h3>{t("Vous ne trouvez pas votre secteur ?")}</h3>
                        <p>
                            {t("Services professionnels, commerce, éducation, finance, tourisme, énergie, industrie, technologie... Nos solutions s'adaptent aussi à votre domaine.")}</p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
