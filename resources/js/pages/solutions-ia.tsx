import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { aiIndustries, aiSolutions, aiWorkflow, humanInterventions } from '@/data/ai-solutions';
import { Link } from '@inertiajs/react';
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
import '../../css/solutions-ia.css';

const workflowIcons = [UserPlus, CheckCheck, MessageSquare, Phone, RotateCw, CalendarCheck, Database];
const solutionIcons = [Database, Workflow, MessageSquare, AudioLines, Mail, CalendarCheck];
const industryIcons = [CarFront, Building2, ShieldCheck, HeartPulse, BriefcaseBusiness];

export default function SolutionsIaPage() {
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
            <SeoHead
                title="Centre d'appels IA, CRM et automatisation | ALLO CALL"
                description="Combinez intelligence artificielle et agents humains : CRM intelligent, chatbot IA, agent vocal, automatisation des leads, SMS, emails et rendez-vous."
                keywords={[
                    'centre appels IA',
                    'chatbot IA',
                    'AI Voice Agent',
                    'CRM intelligent',
                    'automatisation leads',
                    'prise de rendez-vous automatique',
                ]}
                image="/images/hero/allocall-ai.webp"
            />
            <Navbar />
            <main className="public-content">
                <section className="ai-hero" aria-labelledby="ai-title">
                    <img src="/images/hero/allocall-ai.webp" alt="" className="ai-hero-image" fetchPriority="high" />
                    <div className="ai-container ai-hero-content">
                        <p className="ai-eyebrow">ALLO CALL / Solutions IA</p>
                        <h1 id="ai-title">
                            Centre d'appels
                            <br />
                            propuls&eacute; par <span>l'IA.</span>
                        </h1>
                        <p>
                            Automatisez vos appels, qualifiez vos prospects
                            <br className="ai-desktop-break" /> et prenez vos rendez-vous.
                            <br />
                            Avec l'humain au c&oelig;ur de chaque relation.
                        </p>
                        <div className="ai-hero-actions">
                            <Link href="/contact" className="ai-button bg-alidade-gold">
                                Parlons de votre projet <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                            <a href="#parcours" className="ai-hero-link">
                                D&eacute;couvrir les solutions <ArrowDown size={17} aria-hidden="true" />
                            </a>
                        </div>
                    </div>
                </section>

                <div className="ai-promises">
                    <div className="ai-container">
                        <span>
                            <Sparkles size={19} aria-hidden="true" /> Plus de r&eacute;activit&eacute;.
                        </span>
                        <span>
                            <Workflow size={19} aria-hidden="true" /> Plus de suivi.
                        </span>
                        <span>
                            <CalendarCheck size={19} aria-hidden="true" /> Plus d'opportunit&eacute;s commerciales.
                        </span>
                    </div>
                </div>

                <section id="parcours" className="ai-journey ai-container" aria-labelledby="ai-journey-title">
                    <div className="ai-section-heading">
                        <div>
                            <p className="ai-eyebrow">Un parcours connect&eacute; de bout en bout</p>
                            <h2 id="ai-journey-title">
                                Du premier contact
                                <br />
                                au prochain rendez-vous.
                            </h2>
                        </div>
                        <p>
                            De la r&eacute;ception d'un nouveau prospect jusqu'&agrave; la prise de rendez-vous, nous connectons vos outils pour
                            cr&eacute;er un parcours client automatis&eacute; et efficace. Chaque &eacute;tape s'adapte &agrave; votre processus
                            commercial.
                        </p>
                    </div>
                    <div className="ai-workflow-tabs" role="tablist" aria-label="Les étapes du parcours client">
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
                                    <span className="ai-step-index">0{index + 1}</span>
                                    <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                                    <span>{step.label}</span>
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
                                0{index + 1}
                            </span>
                            <div>
                                <h3>{step.title}</h3>
                                <p>{step.description}</p>
                            </div>
                            <a href={step.href} className="ai-text-link">
                                Explorer <ArrowRight size={17} aria-hidden="true" />
                            </a>
                        </div>
                    ))}
                </section>

                <section className="ai-tools" aria-labelledby="ai-tools-title">
                    <div className="ai-container ai-tools-heading">
                        <p className="ai-eyebrow">Vos outils, une seule dynamique</p>
                        <h2 id="ai-tools-title">
                            L'intelligence artificielle au service
                            <br className="ai-desktop-break" /> de votre relation client.
                        </h2>
                        <p>
                            Automatisez une partie de votre relation client et de votre processus commercial, tout en conservant l'intervention de nos
                            agents lorsque l'humain fait la diff&eacute;rence.
                        </p>
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
                                                <span>{solution.label}</span>
                                                <span className="ai-tool-index">0{start + offset + 1}</span>
                                            </div>
                                            <h3 id={`${solution.id}-title`}>{solution.title}</h3>
                                            <p className="ai-tool-description">{solution.description}</p>
                                            {solution.items && (
                                                <ul className="ai-check-list">
                                                    {solution.items.map((item) => (
                                                        <li key={item}>
                                                            <Check size={16} aria-hidden="true" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                            {solution.steps && (
                                                <ol
                                                    className={`ai-mini-flow ${solution.items ? '' : 'ai-mini-flow-vertical'}`}
                                                    aria-label={`Parcours : ${solution.label}`}
                                                >
                                                    {solution.steps.map((step, index) => (
                                                        <li key={step}>
                                                            <span className="ai-mini-flow-mark">{index + 1}</span>
                                                            <span>{step}</span>
                                                        </li>
                                                    ))}
                                                </ol>
                                            )}
                                            <p className="ai-tool-conclusion">{solution.conclusion}</p>
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
                                alt="Une agente ALLO CALL accompagne un client par téléphone"
                                loading="lazy"
                                width="900"
                                height="1000"
                            />
                            <div>
                                <Headset size={25} aria-hidden="true" />
                                <span>La technologie au service de l'humain.</span>
                            </div>
                        </div>
                        <div className="ai-human-copy">
                            <p className="ai-eyebrow">IA + Agents humains</p>
                            <h2 id="ai-human-title">
                                La rapidit&eacute; de l'IA.
                                <br />
                                <span>La finesse de l'humain.</span>
                            </h2>
                            <p>
                                Notre approche repose sur la compl&eacute;mentarit&eacute; entre intelligence artificielle et agents humains. L'IA
                                prend en charge les t&acirc;ches simples, r&eacute;p&eacute;titives et &agrave; fort volume.
                            </p>
                            <h3>Nos agents interviennent pour</h3>
                            <ul className="ai-human-list">
                                {humanInterventions.map((item) => (
                                    <li key={item}>
                                        <Check size={17} aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                            <p>Vous b&eacute;n&eacute;ficiez ainsi de la rapidit&eacute; de l'IA et de l'expertise de nos &eacute;quipes.</p>
                            <Link href="/contact" className="ai-text-link">
                                Construisons votre solution <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="ai-industries ai-container" aria-labelledby="ai-industries-title">
                    <div className="ai-section-heading">
                        <div>
                            <p className="ai-eyebrow">Pens&eacute; pour votre r&eacute;alit&eacute;</p>
                            <h2 id="ai-industries-title">
                                Une solution adapt&eacute;e
                                <br />
                                &agrave; votre activit&eacute;.
                            </h2>
                        </div>
                        <p>
                            Nos solutions d'intelligence artificielle pour centre d'appels s'adaptent &agrave; vos clients, &agrave; vos outils et aux
                            enjeux de votre secteur.
                        </p>
                    </div>
                    <div className="ai-industry-list">
                        {aiIndustries.map((industry, index) => {
                            const Icon = industryIcons[index];
                            return (
                                <Link className="ai-industry-row" href={industry.href} key={industry.name}>
                                    <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                                    <h3>{industry.name}</h3>
                                    <p>{industry.description}</p>
                                    <ArrowRight size={19} aria-hidden="true" />
                                </Link>
                            );
                        })}
                    </div>
                </section>

                <section className="ai-contact" aria-labelledby="ai-contact-title">
                    <div className="ai-container">
                        <p className="ai-eyebrow">Automatisez votre centre d'appels</p>
                        <h2 id="ai-contact-title">
                            Vous avez des leads ?<br />
                            <span>Donnons-leur une suite.</span>
                        </h2>
                        <p>
                            Am&eacute;liorez la gestion de vos leads, r&eacute;duisez le temps de r&eacute;ponse et augmentez le nombre de rendez-vous
                            qualifi&eacute;s. Nous vous accompagnons avec une solution combinant IA, automatisation, CRM et agents humains.
                        </p>
                        <p>
                            Parlez-nous de votre projet et d&eacute;couvrons ensemble les t&acirc;ches que l'intelligence artificielle peut
                            automatiser dans votre centre d'appels.
                        </p>
                        <div className="ai-contact-actions">
                            <Link href="/contact" className="ai-button ai-button-dark">
                                Parlons de votre projet <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                            <Link href="/devis" className="ai-text-link">
                                Demander une soumission <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
