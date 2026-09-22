import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { industryAutomation, industryOverview } from '@/data/industry-overview';
import { Link } from '@inertiajs/react';
import {
    ArrowDown,
    ArrowRight,
    AudioLines,
    Building2,
    CarFront,
    Check,
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
import '../../../css/industries.css';

const sectorIcons = [CarFront, HeartPulse, Snowflake, HardHat, ShieldCheck, Building2];
const automationIcons = [MessageSquare, AudioLines, Database, Mail, Workflow];

export default function IndustriesPage() {
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
            <SeoHead
                title="Centre d'appels par industrie | ALLO CALL"
                description="Des solutions de centre d'appels pour l'automobile, la santé, le HVAC, la construction, l'assurance et l'immobilier. Agents humains, CRM et IA adaptés à votre secteur."
                keywords={[
                    'centre appels industrie',
                    'centre appels automobile',
                    'centre appels santé',
                    'centre appels HVAC',
                    'externalisation relation client',
                ]}
                image="/images/hero/allocall-call-center.webp"
            />
            <Navbar />
            <main className="public-content">
                <section className="industry-hero" aria-labelledby="industry-title">
                    <img src="/images/hero/allocall-call-center.webp" alt="" className="industry-hero-image" fetchPriority="high" />
                    <div className="industry-container industry-hero-content">
                        <p className="industry-eyebrow">ALLO CALL / Industries</p>
                        <h1 id="industry-title">
                            Un centre d'appels
                            <br />
                            pour votre <span>industrie.</span>
                        </h1>
                        <p className="industry-hero-description">
                            Votre secteur a ses exigences.
                            <br />
                            Notre &eacute;quipe parle votre m&eacute;tier.
                        </p>
                        <a href="#secteurs" className="industry-button bg-alidade-gold">
                            Explorer nos secteurs <ArrowDown size={18} aria-hidden="true" />
                        </a>
                    </div>
                 
                </section>

                <nav id="secteurs" className="industry-navigation" aria-label="Nos secteurs d'intervention">
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
                                    <span>{sector.name}</span>
                                </a>
                            );
                        })}
                    </div>
                </nav>

                <section className="industry-container industry-intro" aria-labelledby="industry-intro-title">
                    <div>
                        <p className="industry-eyebrow">Une expertise, plusieurs univers</p>
                        <h2 id="industry-intro-title">
                            Votre r&eacute;alit&eacute;.
                            <br />
                            Notre point de d&eacute;part.
                        </h2>
                    </div>
                    <div className="industry-intro-copy">
                        <p>
                            Chaque industrie a ses propres clients, ses propres processus et ses propres besoins. Notre centre d'appels accompagne les
                            entreprises dans la gestion de leurs appels, la g&eacute;n&eacute;ration de leads, la prise de rendez-vous et le service
                            client.
                        </p>
                        <p>
                            Nous adaptons nos &eacute;quipes, nos scripts, nos outils CRM et nos solutions d'intelligence artificielle &agrave; votre
                            activit&eacute;.
                        </p>
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
                                            <img src={sector.image} alt={sector.imageAlt} loading="lazy" decoding="async" width="960" height="1080" />
                                            <span className="industry-sector-number" aria-hidden="true">
                                                0{index + 1}
                                            </span>
                                        </div>
                                        <div className="industry-sector-caption">
                                            <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                                            <span>{sector.name}</span>
                                            <ArrowDown size={18} aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="industry-sector-copy">
                                        <p className="industry-eyebrow">Expertise / {sector.name}</p>
                                        <h2 id={`${sector.slug}-title`}>{sector.title}</h2>
                                        <p className="industry-sector-description">{sector.description}</p>
                                        <h3>Nous prenons le relais sur</h3>
                                        <ul className="industry-services">
                                            {sector.services.map((service) => (
                                                <li key={service}>
                                                    <Check size={16} aria-hidden="true" />
                                                    <span>{service}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        {sector.flow && (
                                            <ol className="industry-flow" aria-label="Parcours de suivi">
                                                {sector.flow.map((step, stepIndex) => (
                                                    <li key={step}>
                                                        {stepIndex > 0 && <ArrowRight size={13} aria-hidden="true" />}
                                                        <span>{step}</span>
                                                    </li>
                                                ))}
                                            </ol>
                                        )}
                                        {sector.note && <p className="industry-sector-note">{sector.note}</p>}
                                        <Link href={sector.href} className="industry-text-link">
                                            {sector.linkLabel}
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
                                <p className="industry-eyebrow">L'intelligence au service du lien</p>
                                <h2 id="industry-ai-title">
                                    Votre secteur.
                                    <br />
                                    L'humain <span>+ l'IA.</span>
                                </h2>
                            </div>
                            <p>
                                Une expertise sectorielle combin&eacute;e &agrave; l'intelligence artificielle. Nos agents et nos solutions
                                d'automatisation travaillent ensemble, selon les besoins de votre activit&eacute;.
                            </p>
                        </div>
                        <div className="industry-ai-grid">
                            <div className="industry-ai-visual">
                                <img
                                    src="/images/hero/allocall-ai.webp"
                                    alt="Expertise humaine et outils numériques au service de la relation client"
                                    loading="lazy"
                                    width="800"
                                    height="800"
                                />
                                <div className="industry-ai-caption">
                                    <Headset size={25} aria-hidden="true" />
                                    <span>
                                        La technologie acc&eacute;l&egrave;re.
                                        <br />
                                        <strong>L'humain fait la diff&eacute;rence.</strong>
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
                                                <h3>{solution.title}</h3>
                                                <p>{solution.description}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                                <Link href="/solutions-ia" className="industry-text-link">
                                    Explorer nos solutions IA <ArrowRight size={18} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="industry-contact" aria-labelledby="industry-contact-title">
                    <div className="industry-container industry-contact-grid">
                        <div>
                            <p className="industry-eyebrow">Votre activit&eacute;, notre prochaine rencontre</p>
                            <h2 id="industry-contact-title">
                                Et si on parlait
                                <br />
                                de <span>votre secteur ?</span>
                            </h2>
                        </div>
                        <div>
                            <p>
                                Une &eacute;quipe capable de g&eacute;rer vos appels, vos prospects et vos rendez-vous, avec des outils modernes et
                                des solutions adapt&eacute;es &agrave; votre entreprise.
                            </p>
                            <div className="industry-contact-actions">
                                <Link href="/devis" className="industry-button industry-button-dark">
                                    Demander une soumission <ArrowRight size={18} aria-hidden="true" />
                                </Link>
                                <Link href="/contact" className="industry-text-link">
                                    Nous contacter <ArrowRight size={18} aria-hidden="true" />
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="industry-container industry-other-sectors">
                        <h3>Vous ne trouvez pas votre secteur ?</h3>
                        <p>
                            Services professionnels, commerce, &eacute;ducation, finance, tourisme, &eacute;nergie, industrie, technologie... Nos
                            solutions s'adaptent aussi &agrave; votre domaine.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
