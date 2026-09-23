import { site } from '@/data/site';
import { useLocale } from '@/lib/i18n';
import { useForm, usePage } from '@inertiajs/react';
import { CheckCircle2, Mail, MapPin, Phone, Send } from 'lucide-react';
import { type FormEvent } from 'react';
import '../../../css/company.css';

type SubmissionStatus = { success?: string; error?: string };

export default function Contact() {
    const { t, href } = useLocale();

    const { submissionStatus } = usePage<{ submissionStatus?: SubmissionStatus }>().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        request_type: 'contact',
        full_name: '',
        phone: '',
        email: '',
        message: '',
    });

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        post(href('/contact'), {
            preserveScroll: true,
            onSuccess: (page) => {
                if (!(page.props.submissionStatus as SubmissionStatus | undefined)?.error) reset();
            },
        });
    }

    return (
        <div className="company-page">
            <section className="company-hero company-contact-hero" aria-labelledby="contact-title">
                <img src="/images/hero/allocall-contact.webp" alt="" fetchPriority="high" />
                <div className="company-container">
                    <p className="company-eyebrow">{t('ALLO CALL / Contact')}</p>
                    <h1 id="contact-title">{t('Parlons de votre projet.')}</h1>
                    <p>
                        {t('Vos appels, vos prospects, votre relation client.')}
                        <br />
                        {t('Notre équipe est à votre écoute.')}
                    </p>
                </div>
            </section>
            <section className="company-container contact-layout">
                <div>
                    <h2>{t('Envoyez-nous un message')}</h2>
                    {submissionStatus?.success && (
                        <div role="status" className="contact-feedback">
                            <CheckCircle2 size={22} aria-hidden="true" />
                            <span>{submissionStatus.success}</span>
                        </div>
                    )}
                    {submissionStatus?.error && (
                        <div role="alert" className="contact-feedback contact-feedback-error">
                            {submissionStatus.error}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="contact-form">
                        <div>
                            <label htmlFor="contact-full-name">{t('Nom complet')}</label>
                            <input
                                id="contact-full-name"
                                name="full_name"
                                autoComplete="name"
                                required
                                maxLength={255}
                                value={data.full_name}
                                onChange={(event) => setData('full_name', event.target.value)}
                                aria-invalid={!!errors.full_name}
                                aria-describedby={errors.full_name ? 'contact-name-error' : undefined}
                            />
                            {errors.full_name && (
                                <p id="contact-name-error" className="contact-field-error">
                                    {errors.full_name}
                                </p>
                            )}
                        </div>
                        <div className="contact-form-row">
                            <div>
                                <label htmlFor="contact-phone">{t('Téléphone')}</label>
                                <input
                                    id="contact-phone"
                                    name="phone"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    maxLength={40}
                                    value={data.phone}
                                    onChange={(event) => setData('phone', event.target.value)}
                                    aria-invalid={!!errors.phone}
                                    aria-describedby={errors.phone ? 'contact-phone-error' : undefined}
                                />
                                {errors.phone && (
                                    <p id="contact-phone-error" className="contact-field-error">
                                        {errors.phone}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label htmlFor="contact-email">{t('Email')}</label>
                                <input
                                    id="contact-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    maxLength={255}
                                    value={data.email}
                                    onChange={(event) => setData('email', event.target.value)}
                                    aria-invalid={!!errors.email}
                                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                />
                                {errors.email && (
                                    <p id="contact-email-error" className="contact-field-error">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="contact-message">{t('Message')}</label>
                            <textarea
                                id="contact-message"
                                name="message"
                                required
                                minLength={10}
                                rows={6}
                                value={data.message}
                                onChange={(event) => setData('message', event.target.value)}
                                aria-invalid={!!errors.message}
                                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                            />
                            {errors.message && (
                                <p id="contact-message-error" className="contact-field-error">
                                    {errors.message}
                                </p>
                            )}
                        </div>
                        <button type="submit" className="company-button" disabled={processing}>
                            {processing ? t('Envoi en cours...') : t('Envoyer le message')}
                            <Send size={18} aria-hidden="true" />
                        </button>
                    </form>
                </div>
                <aside className="relative overflow-hidden rounded-2xl border border-[#e4eadf] bg-white px-7 py-9 shadow-[0_18px_55px_rgba(32,39,34,0.06)] sm:px-9 sm:py-11">
                    {/* Décoration */}
                    <div className="absolute top-10 left-0 h-[calc(100%-80px)] w-[3px] rounded-r-full bg-gradient-to-b from-[#74b946] via-[#9acb79] to-transparent" />

                    {/* Header */}
                    <div className="mb-8">
                        <div className="mb-4 flex items-center gap-3">
                            <span className="h-[2px] w-7 bg-[#74b946]" />

                            <p className="text-[11px] font-bold tracking-[0.16em] text-[#598435] uppercase">{t('Restons en contact')}</p>
                        </div>

                        <h2 className="text-[30px] font-bold tracking-[-0.03em] text-[#202722]">
                            {t('ALLO ')}
                            <span className="text-[#74b946]">{t('CALL')}</span>
                        </h2>

                        <p className="mt-3 max-w-[330px] text-sm leading-6 text-[#737c74]">
                            {t('Notre équipe est disponible pour répondre à vos questions et vous accompagner dans votre projet.')}
                        </p>
                    </div>

                    {/* Informations */}
                    <div className="space-y-2">
                        {/* Maroc */}
                        <a
                            href="tel:+212522484425"
                            className="group flex items-center gap-4 rounded-xl px-3 py-4 transition-all duration-300 hover:bg-[#f4f8f1]"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff7e9] text-[#598435] transition-all duration-300 group-hover:bg-[#74b946] group-hover:text-white">
                                <Phone size={20} strokeWidth={1.8} />
                            </div>

                            <div className="min-w-0">
                                <span className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#8a938b] uppercase">{t('Maroc')}</span>

                                <span className="block text-[17px] font-semibold text-[#202722] transition-colors group-hover:text-[#598435]">
                                    {t('+212 5 22 48 44 25')}
                                </span>
                            </div>
                        </a>

                        {/* Canada */}
                        <a
                            href="tel:+15148509092"
                            className="group flex items-center gap-4 rounded-xl px-3 py-4 transition-all duration-300 hover:bg-[#f4f8f1]"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff7e9] text-[#598435] transition-all duration-300 group-hover:bg-[#74b946] group-hover:text-white">
                                <Phone size={20} strokeWidth={1.8} />
                            </div>

                            <div className="min-w-0">
                                <span className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#8a938b] uppercase">{t('Canada')}</span>

                                <span className="block text-[17px] font-semibold text-[#202722] transition-colors group-hover:text-[#598435]">
                                    {t('+1 (514) 850-9092')}
                                </span>
                            </div>
                        </a>

                        {/* Email */}
                        <a
                            href={`mailto:${site.email}`}
                            className="group flex items-center gap-4 rounded-xl px-3 py-4 transition-all duration-300 hover:bg-[#f4f8f1]"
                        >
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff7e9] text-[#598435] transition-all duration-300 group-hover:bg-[#74b946] group-hover:text-white">
                                <Mail size={20} strokeWidth={1.8} />
                            </div>

                            <div className="min-w-0">
                                <span className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#8a938b] uppercase">{t('Email')}</span>

                                <span className="block text-[17px] font-semibold break-all text-[#202722] transition-colors group-hover:text-[#598435]">
                                    {site.email}
                                </span>
                            </div>
                        </a>

                        {/* Adresse */}
                        <div className="flex items-start gap-4 rounded-xl px-3 py-4">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff7e9] text-[#598435]">
                                <MapPin size={20} strokeWidth={1.8} />
                            </div>

                            <div className="min-w-0">
                                <span className="mb-1 block text-[11px] font-semibold tracking-[0.08em] text-[#8a938b] uppercase">
                                    {t('Adresse')}
                                </span>

                                <p className="max-w-[290px] text-[16px] leading-7 font-semibold text-[#202722]">{t(site.address)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                </aside>
            </section>
        </div>
    );
}
