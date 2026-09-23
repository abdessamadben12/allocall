import { Link } from '@/components/localized-link';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { aiIndustries, aiSolutions, aiWorkflow, humanInterventions } from '@/data/ai-solutions';
import { useLocale } from '@/lib/i18n';

import {
    ArrowDown,
    ArrowRight,
    AudioLines,
    BriefcaseBusiness,
    Building2,
    CalendarCheck,
    CarFront,
    Check,
    CheckCheck,
    ChevronDown,
    Database,
    Headset,
    HeartPulse,
    Mail,
    MessageSquare,
    Phone,
    RotateCw,
    ShieldCheck,
    Sparkles,
    UserPlus,
    Workflow,
} from 'lucide-react';
import { useRef, useState, type KeyboardEvent } from 'react';
import '../../css/content-details.css';
import '../../css/solutions-ia.css';

const workflowIcons = [UserPlus, CheckCheck, MessageSquare, Phone, RotateCw, CalendarCheck, Database];
const solutionIcons = [Database, Workflow, MessageSquare, AudioLines, Mail, CalendarCheck];
const industryIcons = [CarFront, Building2, ShieldCheck, HeartPulse, BriefcaseBusiness];

export default function SolutionsIaPage() {
    const { t } = useLocale();

    const [activeStep, setActiveStep] = useState(0);
    const stepButtons = useRef<(HTMLButtonElement | null)[]>([]);

    function navigateSteps(event: KeyboardEvent<HTMLButtonElement>, index: number) {
        let next = index;
        if (event.key === 'ArrowRight') next = (index + 1) % aiWorkflow.length;
        else if (event.key === 'ArrowLeft') next = (index - 1 + aiWorkflow.length) % aiWorkflow.length;
        else if (event.key === 'Home') next = 0;
        else if (event.key === 'End') next = aiWorkflow.length - 1;
        else return;
        event.preventDefault();
        setActiveStep(next);
        stepButtons.current[next]?.focus();
    }

    return (
        <div className="solutions-ai-page">
            <SeoHead />
            <Navbar />
            <main className="public-content">
                <section className="ai-hero" aria-labelledby="ai-title">
                    <img src="/images/hero/allocall-solutions-ai.webp" alt="" className="ai-hero-image" fetchPriority="high" />
                    <div className="ai-container ai-hero-content">
                        <p className="ai-eyebrow">{t('ALLO CALL / Solutions IA')}</p>
                        <h1 id="ai-title">
                            {t("Centre d'appels")}
                            <br />
                            {t('propulsé par ')}
                            <span>{t("l'IA.")}</span>
                        </h1>
                        <p>
                            {t('Automatisez vos appels, qualifiez vos prospects')}
                            <br className="ai-desktop-break" /> {t('et prenez vos rendez-vous.')}
                            <br />
                            {t("Avec l'humain au cœur de chaque relation.")}
                        </p>
                        <div className="ai-hero-actions">
                            <Link href="/contact" className="ai-button bg-alidade-gold">
                                {t('Parlons de votre projet ')}
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                            <a href="#parcours" className="ai-hero-link">
                                {t('Découvrir les solutions ')}
                                <ArrowDown size={17} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </section>

                <div className="ai-promises">
                    <div className="ai-container">
                        <span>
                            <Sparkles size={19} aria-hidden="true" /> {t('Plus de réactivité.')}
                        </span>
                        <span>
                            <Workflow size={19} aria-hidden="true" /> {t('Plus de suivi.')}
                        </span>
                        <span>
                            <CalendarCheck size={19} aria-hidden="true" /> {t("Plus d'opportunités commerciales.")}
                        </span>
                    </div>
                </div>

                <section id="parcours" className="ai-journey ai-container" aria-labelledby="ai-journey-title">
                    <div className="ai-section-heading">
                        <div>
                            <p className="ai-eyebrow">{t('Un parcours connecté de bout en bout')}</p>
                            <h2 id="ai-journey-title">
                                {t('Du premier contact')}
                                <br />
                                {t('au prochain rendez-vous.')}
                            </h2>
                        </div>
                        <p>{t('Vos outils connectés pour accompagner chaque prospect, du premier message au rendez-vous.')}</p>
                    </div>
                    <div className="ai-workflow-tabs" role="tablist" aria-label={t('Les étapes du parcours client')}>
                        {aiWorkflow.map((step, index) => {
                            const Icon = workflowIcons[index];
                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    role="tab"
                                    id={`ai-tab-${step.id}`}
                                    aria-controls={`ai-panel-${step.id}`}
                                    aria-selected={activeStep === index}
                                    tabIndex={activeStep === index ? 0 : -1}
                                    ref={(node) => {
                                        stepButtons.current[index] = node;
                                    }}
                                    onClick={() => setActiveStep(index)}
                                    onKeyDown={(event) => navigateSteps(event, index)}
                                >
                                    <span className="ai-step-index">
                                        {t('0')}
                                        {index + 1}
                                    </span>
                                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                                    <span>{t(step.label)}</span>
                                    <ArrowRight className="ai-step-arrow" size={15} aria-hidden="true" />
                                </button>
                            );
                        })}
                    </div>
                    {aiWorkflow.map((step, index) => (
                        <div
                            key={step.id}
                            id={`ai-panel-${step.id}`}
                            role="tabpanel"
                            aria-labelledby={`ai-tab-${step.id}`}
                            hidden={activeStep !== index}
                            tabIndex={0}
                            className="ai-workflow-panel"
                        >
                            <span className="ai-panel-number" aria-hidden="true">
                                {t('0')}
                                {index + 1}
                            </span>
                            <div>
                                <h3>{t(step.title)}</h3>
                                <p>{t(step.description)}</p>
                            </div>
                            <a href={step.href} className="ai-text-link">
                                {t('Explorer ')}
                                <ArrowRight size={17} aria-hidden="true" />
                            </a>
                        </div>
                    ))}
                </section>

                <section className="ai-tools" aria-labelledby="ai-tools-title">
                    <div className="ai-container ai-tools-heading">
                        <p className="ai-eyebrow">{t('Vos outils, une seule dynamique')}</p>
                        <h2 id="ai-tools-title">{t('Six solutions. Un suivi continu.')}</h2>
                        <p>{t("Automatisez les tâches répétitives. Gardez l'humain pour les conversations qui comptent.")}</p>
                    </div>
                    {[0, 2, 4].map((start) => (
                        <div className={`ai-tool-band ai-tool-band-${start}`} key={start}>
                            <div className="ai-container ai-tool-pair">
                                {aiSolutions.slice(start, start + 2).map((solution, offset) => {
                                    const Icon = solutionIcons[start + offset];
                                    return (
                                        <article id={solution.id} className="ai-tool" key={solution.id} aria-labelledby={`${solution.id}-title`}>
                                            <div className="ai-tool-label">
                                                <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                                                <span>{t(solution.label)}</span>
                                                <span className="ai-tool-index">
                                                    {t('0')}
                                                    {start + offset + 1}
                                                </span>
                                            </div>
                                            <h3 id={`${solution.id}-title`}>{t(solution.title)}</h3>
                                            <p className="ai-tool-description">{t(solution.summary)}</p>
                                            <details className="content-details">
                                                <summary>
                                                    <span>{t('Fonctionnalités')}</span>
                                                    <ChevronDown size={18} aria-hidden="true" />
                                                </summary>
                                                <div className="content-details-body">
                                                    <p className="ai-tool-description">{t(solution.description)}</p>
                                                    {solution.items && (
                                                        <ul className="ai-check-list">
                                                            {solution.items.map((item) => (
                                                                <li key={item}>
                                                                    <Check size={16} aria-hidden="true" />
                                                                    <span>{t(item)}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                    {solution.steps && (
                                                        <ol
                                                            className={`ai-mini-flow ${solution.items ? '' : 'ai-mini-flow-vertical'}`}
                                                            aria-label={t('Parcours : {0}', [t(solution.label)])}
                                                        >
                                                            {solution.steps.map((step, index) => (
                                                                <li key={step}>
                                                                    <span className="ai-mini-flow-mark">{index + 1}</span>
                                                                    <span>{t(step)}</span>
                                                                </li>
                                                            ))}
                                                        </ol>
                                                    )}
                                                    <p className="ai-tool-conclusion">{t(solution.conclusion)}</p>
                                                </div>
                                            </details>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </section>

                <section className="ai-human" aria-labelledby="ai-human-title">
                    <div className="ai-container ai-human-grid">
                        <div className="ai-human-image">
                            <img
                                src="/images/hero/allocall-call-center.webp"
                                alt={t('Une agente ALLO CALL accompagne un client par téléphone')}
                                loading="lazy"
                                width="900"
                                height="1000"
                            />
                            <div>
                                <Headset size={25} aria-hidden="true" />
                                <span>{t("La technologie au service de l'humain.")}</span>
                            </div>
                        </div>
                        <div className="ai-human-copy">
                            <p className="ai-eyebrow">{t('IA + Agents humains')}</p>
                            <h2 id="ai-human-title">
                                {t("La rapidité de l'IA.")}
                                <br />
                                <span>{t("La finesse de l'humain.")}</span>
                            </h2>
                            <p>{t("L'IA gère les demandes courantes. Nos agents prennent le relais pour les échanges qui demandent du tact.")}</p>
                            <h3>{t('Nos agents interviennent pour')}</h3>
                            <ul className="ai-human-list">
                                {humanInterventions.map((item) => (
                                    <li key={item}>
                                        <Check size={17} aria-hidden="true" />
                                        {t(item)}
                                    </li>
                                ))}
                            </ul>
                            <Link href="/contact" className="ai-text-link">
                                {t('Construisons votre solution ')}
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="ai-industries ai-container" aria-labelledby="ai-industries-title">
                    <div className="ai-section-heading">
                        <div>
                            <p className="ai-eyebrow">{t('Pensé pour votre réalité')}</p>
                            <h2 id="ai-industries-title">
                                {t('Une solution adaptée')}
                                <br />
                                {t('à votre activité.')}
                            </h2>
                        </div>
                        <p>{t('Des solutions ajustées aux besoins de votre secteur.')}</p>
                    </div>
                    <div className="ai-industry-list">
                        {aiIndustries.map((industry, index) => {
                            const Icon = industryIcons[index];
                            return (
                                <Link className="ai-industry-row" href={industry.href} key={industry.name}>
                                    <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                                    <h3>{t(industry.name)}</h3>
                                    <p>{t(industry.description)}</p>
                                    <ArrowRight size={19} aria-hidden="true" />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section className="ai-contact" aria-labelledby="ai-contact-title">
                    <div className="ai-container">
                        <p className="ai-eyebrow">{t("Automatisez votre centre d'appels")}</p>
                        <h2 id="ai-contact-title">
                            {t('Vous avez des leads ?')}
                            <br />
                            <span>{t('Donnons-leur une suite.')}</span>
                        </h2>
                        <p>{t('Identifions ensemble les tâches à automatiser pour mieux suivre vos prospects.')}</p>
                        <div className="ai-contact-actions">
                            <Link href="/contact" className="ai-button ai-button-dark">
                                {t('Parlons de votre projet ')}
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                            <Link href="/devis" className="ai-text-link">
                                {t('Demander une soumission ')}
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
