import { Link } from '@/components/localized-link';
import { useLocale } from '@/lib/i18n';

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
                    <p className="company-eyebrow">{t('À propos de nous')}</p>
                    <h1 id="about-title">{t('ALLO CALL')}</h1>
                    <p>
                        {t('Une équipe à vos côtés.')}
                        <br />
                        {t('Une relation client à votre image.')}
                    </p>
                    <Link href="/contact" className="company-button">
                        {t('Parlons de votre entreprise ')}
                        <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
         <section className="relative overflow-hidden bg-white py-5 lg:py-10">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-12 max-w-3xl lg:mb-16">
            <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-10 bg-[#74B946]" />

                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#74B946]">
                    {t('Pourquoi ALLO CALL ?')}
                </p>
            </div>

            <h2 className="text-4xl font-semibold leading-[1.1] tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
                {t('Renforcez votre équipe sans alourdir votre structure.')}
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
                {t(
                    "ALLO CALL permet aux entreprises québécoises d'accéder à une équipe francophone qualifiée, disponible et intégrée à leurs processus, tout en gardant une meilleure maîtrise de leurs coûts opérationnels.",
                )}
            </p>
        </div>

        {/* CONTENT */}
        <div className="grid items-stretch w-full  gap-8 lg:grid-cols-1">
            {/* BENEFITS */}
            <div className="overflow-hidden  bg-[#F8FAF6]">

                {/* ITEM 01 */}
                <div className="grid gap-5 border-b border-slate-200 p-7 transition-all duration-300 hover:bg-white sm:p-9 lg:grid-cols-[70px_1fr]">
                    <div>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#74B946]/30 bg-[#74B946]/10 text-sm font-bold text-[#74B946]">
                            01
                        </span>
                    </div>

                    <div>
                        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                            {t('Accédez plus facilement aux talents')}
                        </h3>

                        <p className="text-base leading-8 text-slate-600">
                            {t(
                                "Dans un marché où le recrutement d'agents de service client peut être difficile et coûteux, ALLO CALL vous donne accès à des professionnels francophones formés aux métiers de la relation client.",
                            )}
                        </p>

                        <p className="mt-4 text-base leading-8 text-slate-600">
                            {t(
                                'Vous pouvez ainsi renforcer rapidement votre capacité de traitement sans dépendre uniquement du recrutement local.',
                            )}
                        </p>
                    </div>
                </div>

                {/* ITEM 02 */}
                <div className="grid gap-5 border-b border-slate-200 p-7 transition-all duration-300 hover:bg-white sm:p-9 lg:grid-cols-[70px_1fr]">
                    <div>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#74B946]/30 bg-[#74B946]/10 text-sm font-bold text-[#74B946]">
                            02
                        </span>
                    </div>

                    <div>
                        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                            {t('Gagnez en stabilité et en continuité')}
                        </h3>

                        <p className="text-base leading-8 text-slate-600">
                            {t(
                                "La qualité de votre service dépend aussi de la stabilité des personnes qui représentent votre entreprise. Nos équipes sont recrutées, formées et accompagnées afin d'assurer une meilleure continuité dans la gestion de vos appels et de votre relation client.",
                            )}
                        </p>
                    </div>
                </div>

                {/* ITEM 03 */}
                <div className="grid gap-5 p-7 transition-all duration-300 hover:bg-white sm:p-9 lg:grid-cols-[70px_1fr]">
                    <div>
                        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-[#74B946]/30 bg-[#74B946]/10 text-sm font-bold text-[#74B946]">
                            03
                        </span>
                    </div>

                    <div>
                        <h3 className="mb-3 text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
                            {t('Optimisez vos coûts opérationnels')}
                        </h3>

                        <p className="text-base leading-8 text-slate-600">
                            {t(
                                "Notre modèle vous permet de bénéficier d'une équipe professionnelle tout en réduisant les coûts associés au recrutement, à la formation, aux infrastructures et à la gestion d'une équipe interne.",
                            )}
                        </p>

                        <p className="mt-4 text-base leading-8 text-slate-600">
                            {t(
                                "Vous conservez ainsi davantage de flexibilité pour investir dans votre croissance, votre acquisition client et le développement de votre entreprise au Québec.",
                            )}
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
            <section className="company-expertise">
                <div className="company-container">
                    <p className="company-eyebrow">{t('Nos métiers')}</p>
                    <h2>{t('Chaque contact mérite un suivi.')}</h2>
                    <div className="company-expertise-grid">
                        {expertise.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.title}>
                                    <Icon size={32} strokeWidth={1.5} aria-hidden="true" />
                                    <h3>{t(item.title)}</h3>
                                    <p>{t(item.description)}</p>
                                    <Link href={item.href} className="company-text-link">
                                        {t('Découvrir ')}
                                        <ArrowRight size={18} aria-hidden="true" />
                                    </Link>
                                </article>
                            );
                        })}
                    </div>
                    <Link href="/services" className="company-text-link">
                        {t('Tous nos services ')}
                        <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
            <section className="company-container company-commitments">
                <p className="company-eyebrow">{t('Notre façon de travailler')}</p>
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
                        alt={t('Intelligence artificielle et accompagnement humain chez ALLO CALL')}
                        loading="lazy"
                        width="800"
                        height="800"
                    />
                    <div>
                        <p className="company-eyebrow">{t('Agents humains + Intelligence artificielle')}</p>
                        <h2>{t('La technologie au service de la relation.')}</h2>
                        <p>
                            {t(
                                'Chatbot IA, agent vocal, CRM intelligent et automatisations accompagnent le traitement de vos leads, les relances et la prise de rendez-vous.',
                            )}
                        </p>
                        <p>
                            {t(
                                "Nos agents prennent le relais lorsqu'une demande nécessite une conversation personnalisée, une assistance spécifique ou une intervention humaine.",
                            )}
                        </p>
                        <Link href="/solutions-ia" className="company-text-link">
                            {t('Explorer nos solutions IA ')}
                            <Workflow size={19} aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
            <section className="company-container company-sector">
                <MessageSquare size={32} aria-hidden="true" />
                <h2>{t('Votre secteur a ses propres enjeux.')}</h2>
                <p>
                    {t(
                        'Automobile, santé, HVAC et thermopompes, construction, assurance, immobilier : nous adaptons nos équipes, nos scripts et nos outils à votre réalité.',
                    )}
                </p>
                <Link href="/industries" className="company-text-link">
                    {t('Découvrir nos industries ')}
                    <ArrowRight size={18} aria-hidden="true" />
                </Link>
            </section>
            <section className="company-contact">
                <div className="company-container">
                    <p className="company-eyebrow">{t('Construisons votre accompagnement')}</p>
                    <h2>{t('Parlons de votre organisation.')}</h2>
                    <p>
                        {t(
                            'Confiez-nous vos appels, vos prospects et vos rendez-vous. Définissons ensemble le soutien dont votre entreprise a besoin.',
                        )}
                    </p>
                    <Link href="/contact" className="company-button">
                        {t('Nous contacter ')}
                        <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
