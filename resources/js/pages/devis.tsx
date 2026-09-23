import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import SeoHead from '@/components/seo-head';
import { useLocale } from '@/lib/i18n';
import { router } from '@inertiajs/react';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { QuoteRequest as QuoteType } from '@/components/types';
import { quoteBannerImage } from '@/image';
import {
    AlignLeft,
    ArrowRight,
    CheckCircle,
    ChevronDown,
    Headphones,
    Mail,
    MessageSquareText,
    Phone,
    ShieldCheck,
    Sparkles,
    Star,
    Upload,
    User,
    Wallet,
} from 'lucide-react';
import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from 'react';

interface QuoteRequestProps {
    preFilledSummary: string;
    preFilledCost: number;
    onClearPreFill: () => void;
    onNavigateToContact: () => void;
    onNavigateToMyQuotes: () => void;
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
                    onNavigateToMyQuotes={() => router.visit(href('/contact'))}
                />
            </main>
            <Footer />
        </>
    );
}

function QuoteRequest({ preFilledSummary, preFilledCost, onClearPreFill, onNavigateToContact, onNavigateToMyQuotes }: QuoteRequestProps) {
    const { t, locale } = useLocale();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const [projectType, setProjectType] = useState('Service à la clientèle');

    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<string | null>(null);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedQuote, setSubmittedQuote] = useState<QuoteType | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Préremplissage depuis un service sélectionné
     */
    useEffect(() => {
        if (preFilledSummary) {
            setDescription(preFilledSummary);

            if (preFilledCost) {
                setBudget(`${preFilledCost} $ CAD`);
            }
        }
    }, [preFilledSummary, preFilledCost]);

    /**
     * Sélection d'un fichier
     */
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            setFileName(file.name);

            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

            setFileSize(`${sizeInMB} ${locale === 'en' ? 'MB' : 'Mo'}`);
        }
    };

    /**
     * Drag & Drop
     */
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            setFileName(file.name);

            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

            setFileSize(`${sizeInMB} ${locale === 'en' ? 'MB' : 'Mo'}`);
        }
    };

    /**
     * Envoi du formulaire
     */
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!fullName || !email || !phone || !description) {
            alert(t('Veuillez remplir tous les champs obligatoires (*) pour envoyer votre demande.'));

            return;
        }

        const newQuote: QuoteType = {
            id: `AC-${Math.floor(100000 + Math.random() * 900000)}`,

            fullName,
            email,
            phone,
            projectType,
            description,

            budget: budget || 'À déterminer',

            fileName: fileName || undefined,

            fileSize: fileSize || undefined,

            date: new Date().toLocaleDateString(locale === 'en' ? 'en-CA' : 'fr-CA', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),

            status: 'En attente',
        };

        /**
         * Sauvegarde locale
         */
        const existingQuotesJson = localStorage.getItem('allocall_quotes');

        const existingQuotes: QuoteType[] = existingQuotesJson ? JSON.parse(existingQuotesJson) : [];

        existingQuotes.unshift(newQuote);

        localStorage.setItem('allocall_quotes', JSON.stringify(existingQuotes));

        setSubmittedQuote(newQuote);
        setIsSubmitted(true);

        /**
         * Reset
         */
        setFullName('');
        setEmail('');
        setPhone('');
        setDescription('');
        setBudget('');
        setFileName(null);
        setFileSize(null);

        onClearPreFill();
    };

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
                        backgroundImage: `url(${quoteBannerImage})`,
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

                                {/* SUCCESS */}

                                {isSubmitted && submittedQuote && (
                                    <div className="animate-in zoom-in-95 mb-6 space-y-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800 duration-300">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={18} className="shrink-0 text-emerald-500" />

                                            <span className="text-xs font-bold tracking-wider uppercase">
                                                {t('Demande enregistrée sous le numéro')} {submittedQuote.id}
                                            </span>
                                        </div>

                                        <p className="text-[11px] leading-relaxed font-light text-emerald-700">
                                            {t('Votre demande est conservée dans ce navigateur. Contactez notre équipe pour nous la transmettre.')}
                                        </p>

                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);

                                                onNavigateToMyQuotes();
                                            }}
                                            className="w-full rounded bg-emerald-600 py-2 text-[10px] font-bold tracking-wider text-white uppercase transition-colors hover:bg-emerald-700"
                                            id="view-estimate-dashboard-btn"
                                        >
                                            {t('Nous contacter')}
                                        </button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* NOM */}

                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            {t('Nom complet *')}
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder={t('Ex. Sophie Tremblay')}
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                id="quote-name-input"
                                            />

                                            <User size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* EMAIL + PHONE */}

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {/* Email */}

                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                {t('Courriel *')}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    placeholder={t('sophie@entreprise.ca')}
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                    id="quote-email-input"
                                                />

                                                <Mail size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* PHONE */}

                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                {t('Téléphone *')}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    placeholder={t('(514) 555-0187')}
                                                    required
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                    id="quote-phone-input"
                                                />

                                                <Phone size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* TYPE SERVICE */}

                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            {t('Service recherché *')}
                                        </label>

                                        <div className="relative">
                                            <select
                                                value={projectType}
                                                onChange={(e) => setProjectType(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-10 pl-4 text-xs font-medium outline-none focus:ring-1"
                                                id="quote-type-input"
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
                                            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
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
                                                rows={4}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs leading-relaxed outline-none focus:ring-1"
                                                id="quote-desc-input"
                                            />

                                            <AlignLeft size={15} className="absolute top-4 left-4 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* BUDGET */}

                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            {t('Budget mensuel estimé (optionnel)')}
                                        </label>

                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder={t('Ex. 2 500 $ CAD / mois')}
                                                value={budget}
                                                onChange={(e) => setBudget(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                id="quote-budget-input"
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
                                            onClick={() => fileInputRef.current?.click()}
                                            className="hover:border-alidade-gold/50 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 text-center transition-all hover:bg-gray-50/50"
                                        >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileChange}
                                                accept=".pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg"
                                                className="hidden"
                                                id="quote-file-input"
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
                                                        <span className="text-alidade-gold font-bold underline">{t('choisissez un fichier')}</span>
                                                    </span>
                                                )}
                                            </div>

                                            <span className="text-[9px] text-gray-400">
                                                {t('Scripts, cahier des charges, liste de besoins ou document de référence')}
                                            </span>
                                        </div>
                                    </div>

                                    {/* BUTTON */}

                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="bg-alidade-gold hover:bg-alidade-gold/90 text-alidade-navy flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-colors"
                                            id="quote-submit-btn"
                                        >
                                            <span>{t('Envoyer ma demande')}</span>

                                            <ArrowRight size={14} />
                                        </button>
                                    </div>
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
