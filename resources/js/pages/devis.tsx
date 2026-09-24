import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { useLocale } from '@/lib/i18n';
import { router, useForm, usePage } from '@inertiajs/react';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import {
    AlignLeft,
    ArrowRight,
    CheckCircle,
    ChevronDown,
    Headphones,
    LoaderCircle,
    Mail,
    MessageSquareText,
    Phone,
    ShieldCheck,
    Sparkles,
    Star,
    Upload,
    User,
    Wallet,
    X,
} from 'lucide-react';
import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from 'react';

interface QuoteRequestProps {
    preFilledSummary: string;
    preFilledCost: number;
    onClearPreFill: () => void;
    onNavigateToContact: () => void;
}

export default function QuotePage() {
    const { href, url, t } = useLocale();
    const service = new URLSearchParams(url.split('?')[1] || '').get('service');
    const [cleared, setCleared] = useState(false);
    return (
        <>
            <SeoHead />
            <Navbar />
            <main>
                <QuoteRequest
                    preFilledSummary={!cleared && service ? t(service) : ''}
                    preFilledCost={0}
                    onClearPreFill={() => setCleared(true)}
                    onNavigateToContact={() => router.visit(href('/contact'))}
                />
            </main>
            <Footer />
        </>
    );
}

type SubmissionStatus = { success?: string; error?: string };

function QuoteRequest({ preFilledSummary, preFilledCost, onClearPreFill, onNavigateToContact }: QuoteRequestProps) {
    const { t, locale, href } = useLocale();
    const { submissionStatus } = usePage<{ submissionStatus?: SubmissionStatus }>().props;
    const { data, setData, post, processing, progress, errors, reset, clearErrors, setError } = useForm({
        request_type: 'quote',
        full_name: '',
        email: '',
        phone: '',
        project_type: 'Service à la clientèle',
        message: preFilledSummary,
        budget: preFilledCost ? `${preFilledCost} $ CAD` : '',
        attachment: null as File | null,
    });
    const fileInputRef = useRef<HTMLInputElement>(null);
    const fileName = data.attachment?.name;
    const fileSize = data.attachment ? `${(data.attachment.size / (1024 * 1024)).toFixed(2)} ${locale === 'en' ? 'MB' : 'Mo'}` : '';

    function selectFile(file?: File) {
        if (processing || !file) return;
        clearErrors('attachment');
        if (file.size > 10 * 1024 * 1024) {
            setError('attachment', t('Le fichier ne doit pas dépasser 10 Mo.'));
            setData('attachment', null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            return;
        }
        setData('attachment', file);
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => selectFile(event.target.files?.[0]);
    const handleDragOver = (event: DragEvent) => event.preventDefault();
    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        selectFile(event.dataTransfer.files[0]);
    };

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        if (processing) return;
        post(href('/devis'), {
            preserveScroll: true,
            forceFormData: true,
            onSuccess: (page) => {
                if ((page.props.submissionStatus as SubmissionStatus | undefined)?.success) {
                    reset();
                    setData('message', '');
                    setData('budget', '');
                    if (fileInputRef.current) fileInputRef.current.value = '';
                    onClearPreFill();
                }
            },
        });
    }

    return (
        <div className="relative w-full bg-white">
            {/* =========================================================
                HERO / DEMANDE DE SOUMISSION
            ========================================================== */}

            <section className="bg-alidade-navy border-alidade-gold/10 relative overflow-hidden border-b py-16 text-white sm:py-20">
                {/* Background */}
                <div
                    className="absolute inset-0 bg-[length:cover] bg-center opacity-10 mix-blend-overlay"
                    style={{
                        backgroundImage: "url('/images/hero/allocall-contact.webp')",
                    }}
                />

                <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* ================= LEFT ================= */}

                        <Reveal className="space-y-6 lg:col-span-6" amount={0.15}>
                            <div className="flex items-center gap-2">
                                <span className="bg-alidade-gold h-[1.5px] w-8" />

                                <span className="text-alidade-gold text-sm font-bold tracking-[0.25em] uppercase sm:text-xl">
                                    {t('Solution personnalisée')}
                                </span>
                            </div>

                            <h1 className="text-3xl font-bold uppercase sm:text-4xl lg:text-5xl">
                                {t('Demandez votre')}
                                <br />

                                <span className="text-alidade-gold font-serif">{t('soumission gratuite')}</span>
                            </h1>

                            <p className="max-w-lg text-sm leading-relaxed font-light text-gray-300 sm:text-base">
                                {t(
                                    "Parlez-nous de vos besoins en service à la clientèle, appels, ventes ou prise de rendez-vous. Notre équipe vous proposera une solution adaptée à votre volume d'appels, vos objectifs et votre organisation.",
                                )}
                            </p>

                            {/* Avantages */}

                            <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                                {/* Rapide */}

                                <div className="flex items-center gap-3">
                                    <div className="border-alidade-gold/30 text-alidade-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white/5">
                                        <CheckCircle size={16} />
                                    </div>

                                    <div>
                                        <span className="block text-xs font-bold tracking-wider uppercase">{t('Réponse rapide')}</span>

                                        <span className="block text-[10px] font-light text-gray-400">{t('Prise en charge rapide')}</span>
                                    </div>
                                </div>

                                {/* Sans engagement */}

                                <div className="flex items-center gap-3">
                                    <div className="border-alidade-gold/30 text-alidade-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white/5">
                                        <Sparkles size={16} />
                                    </div>

                                    <div>
                                        <span className="block text-xs font-bold tracking-wider uppercase">{t('Soumission gratuite')}</span>

                                        <span className="block text-[10px] font-light text-gray-400">{t('Sans engagement')}</span>
                                    </div>
                                </div>

                                {/* Sur mesure */}

                                <div className="flex items-center gap-3">
                                    <div className="border-alidade-gold/30 text-alidade-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white/5">
                                        <Headphones size={16} />
                                    </div>

                                    <div>
                                        <span className="block text-xs font-bold tracking-wider uppercase">{t('Service sur mesure')}</span>

                                        <span className="block text-[10px] font-light text-gray-400">{t('Adapté à votre entreprise')}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* ================= FORMULAIRE ================= */}

                        <Reveal className="lg:col-span-6" delay={0.15} amount={0.1}>
                            <div
                                className="text-alidade-navy relative rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-8"
                                id="quote-request-card"
                            >
                                <div className="mb-6">
                                    <h3 className="text-alidade-navy text-lg font-bold tracking-wider uppercase">{t('Demande de soumission')}</h3>

                                    <p className="mt-2 text-xs leading-relaxed text-gray-500">
                                        {t('Remplissez le formulaire et notre équipe communiquera avec vous pour mieux comprendre vos besoins.')}
                                    </p>
                                </div>

                                {submissionStatus?.success && (
                                    <div
                                        role="status"
                                        className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
                                    >
                                        <CheckCircle size={20} className="shrink-0" aria-hidden="true" />
                                        <p>{submissionStatus.success}</p>
                                    </div>
                                )}
                                {submissionStatus?.error && (
                                    <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                                        {submissionStatus.error}
                                    </div>
                                )}
                                {Object.keys(errors).length > 0 && (
                                    <div role="alert" className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
                                        <ul className="list-inside list-disc">
                                            {Object.entries(errors).map(([field, error]) => (
                                                <li key={field}>{error}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} aria-busy={processing}>
                                    <fieldset disabled={processing} className="min-w-0 space-y-4">
                                        {/* NOM */}

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="quote-name-input"
                                                className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                                            >
                                                {t('Nom complet *')}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder={t('Ex. Sophie Tremblay')}
                                                    required
                                                    value={data.full_name}
                                                    onChange={(e) => setData('full_name', e.target.value)}
                                                    className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                    id="quote-name-input"
                                                    name="full_name"
                                                    aria-invalid={!!errors.full_name}
                                                />

                                                <User size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* EMAIL + PHONE */}

                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                            {/* Email */}

                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="quote-email-input"
                                                    className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                                                >
                                                    {t('Courriel *')}
                                                </label>

                                                <div className="relative">
                                                    <input
                                                        type="email"
                                                        placeholder={t('sophie@entreprise.ca')}
                                                        required
                                                        value={data.email}
                                                        onChange={(e) => setData('email', e.target.value)}
                                                        className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                        id="quote-email-input"
                                                        name="email"
                                                        aria-invalid={!!errors.email}
                                                    />

                                                    <Mail size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                                </div>
                                            </div>

                                            {/* PHONE */}

                                            <div className="space-y-1">
                                                <label
                                                    htmlFor="quote-phone-input"
                                                    className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                                                >
                                                    {t('Téléphone *')}
                                                </label>

                                                <div className="relative">
                                                    <input
                                                        type="tel"
                                                        placeholder={t('(514) 555-0187')}
                                                        required
                                                        value={data.phone}
                                                        onChange={(e) => setData('phone', e.target.value)}
                                                        className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                        id="quote-phone-input"
                                                        name="phone"
                                                        aria-invalid={!!errors.phone}
                                                    />

                                                    <Phone size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                                </div>
                                            </div>
                                        </div>

                                        {/* TYPE SERVICE */}

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="quote-type-input"
                                                className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                                            >
                                                {t('Service recherché *')}
                                            </label>

                                            <div className="relative">
                                                <select
                                                    value={data.project_type}
                                                    onChange={(e) => setData('project_type', e.target.value)}
                                                    className="focus:ring-alidade-gold focus:border-alidade-gold w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-10 pl-4 text-xs font-medium outline-none focus:ring-1"
                                                    id="quote-type-input"
                                                    name="project_type"
                                                    aria-invalid={!!errors.project_type}
                                                >
                                                    <option value="Assistante virtuelle">{t('Assistante virtuelle')}</option>

                                                    <option value="Télévente / appels sortants">{t('Télévente / appels sortants')}</option>

                                                    <option value="Gestion des leads">{t('Gestion des leads')}</option>

                                                    <option value="Prise de rendez-vous">{t('Prise de rendez-vous')}</option>

                                                    <option value="Service à la clientèle">{t('Service à la clientèle')}</option>

                                                    <option value="Réception téléphonique">{t('Réception téléphonique')}</option>

                                                    <option value="Support technique niveau 1">{t('Support technique niveau 1')}</option>

                                                    <option value="Confirmation de rendez-vous">{t('Confirmation de rendez-vous')}</option>

                                                    <option value="Plusieurs services">{t('Plusieurs services')}</option>

                                                    <option value="Autre besoin">{t('Autre besoin')}</option>
                                                </select>

                                                <ChevronDown
                                                    size={15}
                                                    className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
                                                />
                                            </div>
                                        </div>

                                        {/* DESCRIPTION */}

                                        <div className="space-y-1">
                                            <div className="flex justify-between gap-3">
                                                <label
                                                    htmlFor="quote-desc-input"
                                                    className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                                                >
                                                    {t('Parlez-nous de vos besoins *')}
                                                </label>

                                                {preFilledSummary && (
                                                    <span className="text-alidade-gold bg-alidade-gold/5 animate-pulse rounded px-2 py-0.5 text-[9px] font-bold">
                                                        {t('Service sélectionné')}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="relative">
                                                <textarea
                                                    placeholder={t(
                                                        'Ex. Nous recevons environ 150 appels par semaine et recherchons une équipe pour répondre aux clients, prendre les rendez-vous et assurer les suivis...',
                                                    )}
                                                    required
                                                    minLength={10}
                                                    rows={4}
                                                    value={data.message}
                                                    onChange={(e) => setData('message', e.target.value)}
                                                    className="focus:ring-alidade-gold focus:border-alidade-gold w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs leading-relaxed outline-none focus:ring-1"
                                                    id="quote-desc-input"
                                                    name="message"
                                                    aria-invalid={!!errors.message}
                                                />

                                                <AlignLeft size={15} className="absolute top-4 left-4 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* BUDGET */}

                                        <div className="space-y-1">
                                            <label
                                                htmlFor="quote-budget-input"
                                                className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase"
                                            >
                                                {t('Budget mensuel estimé (optionnel)')}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    placeholder={t('Ex. 2 500 $ CAD / mois')}
                                                    value={data.budget}
                                                    onChange={(e) => setData('budget', e.target.value)}
                                                    className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                    id="quote-budget-input"
                                                    name="budget"
                                                    aria-invalid={!!errors.budget}
                                                />

                                                <Wallet size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* FICHIERS */}

                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                {t('Ajouter un document (optionnel)')}
                                            </label>

                                            <div
                                                onDragOver={handleDragOver}
                                                onDrop={handleDrop}
                                                onClick={() => !processing && fileInputRef.current?.click()}
                                                role="button"
                                                tabIndex={processing ? -1 : 0}
                                                aria-disabled={processing}
                                                onKeyDown={(event) => {
                                                    if (event.key === 'Enter' || event.key === ' ') {
                                                        event.preventDefault();
                                                        if (!processing) fileInputRef.current?.click();
                                                    }
                                                }}
                                                className="hover:border-alidade-gold/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 text-center transition-all hover:bg-gray-50/50"
                                            >
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileChange}
                                                    onClick={(event) => event.stopPropagation()}
                                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp"
                                                    className="hidden"
                                                    id="quote-file-input"
                                                    name="attachment"
                                                    aria-label={t('Ajouter un document (optionnel)')}
                                                    aria-invalid={!!errors.attachment}
                                                />

                                                <Upload size={18} className="text-gray-400" />

                                                <div className="text-xs font-light text-gray-500">
                                                    {fileName ? (
                                                        <span className="text-alidade-navy font-bold">
                                                            {fileName}{' '}
                                                            <span className="text-[10px] font-light text-gray-400">
                                                                {t('(')}
                                                                {fileSize}
                                                                {t(')')}
                                                            </span>
                                                        </span>
                                                    ) : (
                                                        <span>
                                                            {t('Glissez votre document ici ou')}{' '}
                                                            <span className="text-alidade-gold font-bold underline">
                                                                {t('choisissez un fichier')}
                                                            </span>
                                                        </span>
                                                    )}
                                                </div>

                                                <span className="text-[9px] text-gray-400">
                                                    {t('Scripts, cahier des charges, liste de besoins ou document de référence')}
                                                </span>
                                            </div>
                                        </div>

                                        {data.attachment && (
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setData('attachment', null);
                                                    clearErrors('attachment');
                                                    if (fileInputRef.current) fileInputRef.current.value = '';
                                                }}
                                                className="inline-flex items-center gap-2 text-sm text-gray-600"
                                            >
                                                <X size={16} aria-hidden="true" /> {t('Retirer le fichier')}
                                            </button>
                                        )}
                                        {progress && (
                                            <p role="status" className="text-sm text-gray-600">
                                                {t('Téléversement : {0} %', [progress.percentage ?? 0])}
                                            </p>
                                        )}
                                        {/* BUTTON */}

                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                className="bg-alidade-gold hover:bg-alidade-gold/90 text-alidade-navy flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-colors"
                                                id="quote-submit-btn"
                                                disabled={processing}
                                            >
                                                <span>{t(processing ? 'Envoi en cours...' : 'Envoyer ma demande')}</span>

                                                {processing ? (
                                                    <LoaderCircle size={16} className="animate-spin" aria-hidden="true" />
                                                ) : (
                                                    <ArrowRight size={14} aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* =========================================================
                POURQUOI ALLOCAL
            ========================================================== */}

            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
                    <Reveal className="space-y-3 text-center">
                        <span className="text-alidade-gold text-xs font-bold tracking-[0.25em] uppercase">
                            {t('Votre partenaire relation client')}
                        </span>

                        <h3 className="text-alidade-navy text-2xl font-bold sm:text-3xl">{t('Pourquoi choisir AlloCall ?')}</h3>

                        <div className="bg-alidade-gold mx-auto h-0.5 w-16 rounded-full" />

                        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500">
                            {t(
                                "Une équipe dédiée pour vous aider à améliorer votre relation client, gérer davantage d'appels et soutenir votre croissance.",
                            )}
                        </p>
                    </Reveal>

                    <Stagger stagger={0.12} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* 1 */}

                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <MessageSquareText size={20} />
                            </div>

                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Analyse de vos besoins')}</h4>

                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t(
                                    "Nous analysons votre volume d'appels, vos objectifs, vos processus et vos besoins afin de définir la solution la mieux adaptée à votre entreprise.",
                                )}
                            </p>
                        </StaggerItem>

                        {/* 2 */}

                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <Sparkles size={20} />
                            </div>

                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Solution personnalisée')}</h4>

                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t(
                                    'Scripts, horaires, processus, outils CRM et méthodes de communication sont adaptés à votre entreprise et à votre clientèle.',
                                )}
                            </p>
                        </StaggerItem>

                        {/* 3 */}

                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <ShieldCheck size={20} />
                            </div>

                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Équipe professionnelle')}</h4>

                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t(
                                    'Vos appels et vos clients sont pris en charge avec professionnalisme par une équipe formée pour représenter votre entreprise.',
                                )}
                            </p>
                        </StaggerItem>

                        {/* 4 */}

                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <Star size={20} />
                            </div>

                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Accompagnement continu')}</h4>

                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t('Nous suivons les performances, ajustons les processus et faisons évoluer le service en fonction de vos besoins.')}
                            </p>
                        </StaggerItem>
                    </Stagger>

                    {/* CTA */}

                    <Reveal className="from-alidade-navy to-alidade-dark border-alidade-gold/15 flex flex-col items-center justify-between gap-6 rounded-2xl border bg-gradient-to-r p-6 text-white shadow-lg sm:p-8 md:flex-row">
                        <div className="space-y-1.5 text-center md:text-left">
                            <span className="text-alidade-gold block text-xs font-bold tracking-widest uppercase">
                                {t('Vous avez des questions ?')}
                            </span>

                            <p className="max-w-xl text-sm leading-relaxed font-light text-gray-300">
                                {t(
                                    "Discutez avec notre équipe de vos besoins en service client, télévente, gestion des leads, réception d'appels ou prise de rendez-vous.",
                                )}
                            </p>
                        </div>

                        <button
                            onClick={onNavigateToContact}
                            className="hover:bg-alidade-gold text-alidade-dark flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-bold tracking-widest uppercase shadow-md transition-all duration-300 hover:text-white"
                            id="devis-contact-btn"
                        >
                            <span>{t('Nous contacter')}</span>

                            <ArrowRight size={13} />
                        </button>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
