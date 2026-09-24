import { Link } from '@/components/localized-link';
import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { detailedIndustries } from '@/data/industry-details';
import { useLocale } from '@/lib/i18n';

import { ArrowLeft, ArrowRight, CalendarCheck, Check, Headset, PhoneIncoming, Sparkles } from 'lucide-react';
import '../../../css/industry-detail.css';

interface IndustryShowProps {
    slug: string;
}

export default function IndustryShowPage({ slug }: IndustryShowProps) {
    const { t } = useLocale();

    const page = detailedIndustries[slug];

    if (!page) {
        return (
            <div className="flex min-h-screen flex-col bg-white">
                <SeoHead />
                <Navbar />
                <main className="public-content mx-auto max-w-3xl flex-grow px-4 py-24 text-center">
                    <h1 className="text-4xl font-extrabold text-[#111827]">{t('Industrie introuvable')}</h1>
                    <Link href="/industries" className="mt-8 inline-flex rounded-md bg-[#74B946] px-6 py-3 text-sm font-bold text-white uppercase">
                        {t('Voir les industries')}
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="industry-detail-page">
            <SeoHead />
            <Navbar />
            <main className="public-content">
                <section className="detail-hero" aria-labelledby="detail-title">
                    <img src={page.image} alt="" fetchPriority="high" />
                    <div className="detail-container detail-hero-content">
                        <Link href="/industries" className="detail-back">
                            <ArrowLeft size={17} aria-hidden="true" /> {t('Toutes les industries')}
                        </Link>
                        <p className="detail-eyebrow">
                            {t('ALLO CALL / ')}
                            {t(page.name)}
                        </p>
                        <h1 id="detail-title">{t(page.title)}</h1>
                        <p className="detail-hero-description">{t(page.description)}</p>
                        <a href="#prestations" className="detail-button bg-alidade-gold">
                            {t('Découvrir nos services ')}
                            <ArrowRight size={18} aria-hidden="true" />
                        </a>
                    </div>
                </section>
                <div className="detail-benefits">
                    <div className="detail-container">
                        <span>
                            <PhoneIncoming size={22} aria-hidden="true" /> {t('Vos appels pris en charge')}
                        </span>
                        <span>
                            <CalendarCheck size={22} aria-hidden="true" /> {t('Vos rendez-vous suivis')}
                        </span>
                        <span>
                            <Headset size={22} aria-hidden="true" /> {t('Une équipe à vos côtés')}
                        </span>
                    </div>
                </div>

                <section className="detail-container detail-intro" aria-labelledby="detail-intro-title">
                    <div>
                        <p className="detail-eyebrow">{t('Votre secteur, notre expertise')}</p>
                        <h2 id="detail-intro-title">{t(page.introTitle)}</h2>
                    </div>
                    <div>
                        {page.intro.map((paragraph) => (
                            <p key={paragraph}>{t(paragraph)}</p>
                        ))}
                    </div>
                </section>

                <section id="prestations" className="detail-services" aria-labelledby="detail-services-title">
                    <div className="detail-container">
                        <p className="detail-eyebrow">{t('Un accompagnement au quotidien')}</p>
                        <h2 id="detail-services-title">{t(page.servicesTitle)}</h2>
                        <div className="detail-service-grid">
                            {page.services.map((service, index) => (
                                <article key={service.title}>
                                    <span className="detail-number" aria-hidden="true">
                                        {t('0')}
                                        {index + 1}
                                    </span>
                                    <h3>{t(service.title)}</h3>
                                    <p>{t(service.description)}</p>
                                    {service.items && (
                                        <ul className="detail-checks">
                                            {service.items.map((item) => (
                                                <li key={item}>
                                                    <Check size={17} aria-hidden="true" />
                                                    <span>{t(item)}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="detail-container detail-expertise" aria-labelledby="detail-expertise-title">
                    <div className="detail-expertise-photo">
                        <img
                            src="/images/hero/allocall-call-cnter.webp"
                            alt={t('Une agente ALLO CALL assure le suivi téléphonique des clients')}
                            width="900"
                            height="900"
                            loading="lazy"
                        />
                        <span>
                            <Headset size={22} aria-hidden="true" /> {t('Des agents qui comprennent votre métier.')}
                        </span>
                    </div>
                    <div>
                        <p className="detail-eyebrow">{t("L'humain fait la différence")}</p>
                        <h2 id="detail-expertise-title">{t(page.expertiseTitle)}</h2>
                        {page.expertise.map((paragraph) => (
                            <p key={paragraph}>{t(paragraph)}</p>
                        ))}
                        {page.brands && (
                            <ul className="detail-brands" aria-label={t('Marques de concessionnaires accompagnés')}>
                                {page.brands.map((brand) => (
                                    <li key={brand}>{brand}</li>
                                ))}
                            </ul>
                        )}
                        {page.audiences && (
                            <ul className="detail-checks">
                                {page.audiences.map((audience) => (
                                    <li key={audience}>
                                        <Check size={17} aria-hidden="true" />
                                        <span>{t(audience)}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>

                <section className="detail-automation" aria-labelledby="detail-automation-title">
                    <div className="detail-container">
                        <div className="detail-automation-heading">
                            <Sparkles size={35} strokeWidth={1.5} aria-hidden="true" />
                            <div>
                                <p className="detail-eyebrow">{t('Expertise humaine + Solutions IA')}</p>
                                <h2 id="detail-automation-title">{t(page.automationTitle)}</h2>
                            </div>
                        </div>
                        <div className="detail-automation-copy">
                            {page.automation.map((paragraph) => (
                                <p key={paragraph}>{t(paragraph)}</p>
                            ))}
                        </div>
                        <ol className="detail-flow" aria-label={t('Parcours de suivi')}>
                            {page.flow.map((step, index) => (
                                <li key={step}>
                                    <span className="detail-flow-number">
                                        {t('0')}
                                        {index + 1}
                                    </span>
                                    <span>{t(step)}</span>
                                    {index < page.flow.length - 1 && <ArrowRight size={18} aria-hidden="true" />}
                                </li>
                            ))}
                        </ol>
                        <Link href="/solutions-ia" className="detail-text-link">
                            {t('Explorer nos solutions IA ')}
                            <ArrowRight size={18} aria-hidden="true" />
                        </Link>
                    </div>
                </section>

                <section className="detail-contact" aria-labelledby="detail-contact-title">
                    <div className="detail-container">
                        <p className="detail-eyebrow">{t('Parlons de votre projet')}</p>
                        <h2 id="detail-contact-title">{t(page.ctaTitle)}</h2>
                        <p>{t(page.ctaBody)}</p>
                        <div className="detail-contact-actions">
                            <Link href="/contact" className="detail-button detail-button-dark">
                                {t('Nous contacter ')}
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                            <Link href="/devis" className="detail-text-link">
                                {t('Demander une soumission ')}
                                <ArrowRight size={18} aria-hidden="true" />
                            </Link>
                        </div>
                        <Link className="detail-related" href={slug === 'automobile' ? '/industries/sante' : '/industries/automobile'}>
                            {t('Découvrir aussi : ')}
                            {slug === 'automobile' ? t('Santé') : t('Automobile')} <ArrowRight size={17} aria-hidden="true" />
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
