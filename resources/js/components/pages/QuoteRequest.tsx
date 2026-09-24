import { useLocale } from '@/lib/i18n';
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { quoteBannerImage } from '@/image';
import {
    AlignLeft,
    ArrowRight,
    CheckCircle,
    ChevronDown,
    FolderArchive,
    Mail,
    Phone,
    SearchCode,
    Shield,
    Sparkles,
    Star,
    Upload,
    User,
    Wallet,
} from 'lucide-react';
import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { QuoteRequest as QuoteType } from '../types';

interface QuoteRequestProps {
    preFilledSummary: string;
    preFilledCost: number;
    onClearPreFill: () => void;
    onNavigateToContact: () => void;
    onNavigateToMyQuotes: () => void;
}

export default function QuoteRequest({
    preFilledSummary,
    preFilledCost,
    onClearPreFill,
    onNavigateToContact,
    onNavigateToMyQuotes,
}: QuoteRequestProps) {
    const { t } = useLocale();

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [projectType, setProjectType] = useState('Menuiserie Bois & Cuisine Moderne');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');
    const [fileName, setFileName] = useState<string | null>(null);
    const [fileSize, setFileSize] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [submittedQuote, setSubmittedQuote] = useState<QuoteType | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Set pre-filled summary from configurator
    useEffect(() => {
        if (preFilledSummary) {
            setDescription(preFilledSummary);
            setProjectType('Menuiserie Bois & Cuisine Moderne');
            if (preFilledCost) {
                setBudget(`${preFilledCost} MAD`);
            }
        }
    }, [preFilledSummary, preFilledCost]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFileName(file.name);
            // Format file size
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            setFileSize(`${sizeInMB} MB`);
        }
    };

    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            setFileName(file.name);
            const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
            setFileSize(`${sizeInMB} MB`);
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!fullName || !email || !phone || !description) {
            alert('Veuillez remplir tous les champs obligatoires (*) pour soumettre.');
            return;
        }

        const newQuote: QuoteType = {
            id: `QT-${Math.floor(100000 + Math.random() * 900000)}`,
            fullName,
            email,
            phone,
            projectType,
            description,
            budget: budget || 'Non défini',
            fileName: fileName || undefined,
            fileSize: fileSize || undefined,
            date: new Date().toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            }),
            status: 'En attente',
        };

        // Save to local storage for persistence
        const existingQuotesJson = localStorage.getItem('allocall_quotes');
        const existingQuotes: QuoteType[] = existingQuotesJson ? JSON.parse(existingQuotesJson) : [];
        existingQuotes.unshift(newQuote);
        localStorage.setItem('allocall_quotes', JSON.stringify(existingQuotes));

        setSubmittedQuote(newQuote);
        setIsSubmitted(true);

        // Reset inputs
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
            {/* Upper banner section matching Screenshot 5 Right */}
            <section className="bg-alidade-navy border-alidade-gold/10 relative overflow-hidden border-b py-16 text-white sm:py-20">
                <div
                    className="absolute inset-0 bg-[length:cover] bg-center opacity-10 mix-blend-overlay"
                    style={{ backgroundImage: `url(${quoteBannerImage})` }}
                />
                <div className="relative z-10 mx-auto max-w-7xl">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
                        {/* Left side text columns (Screenshot 5 Right Left column) */}
                        <Reveal className="space-y-6 lg:col-span-6" amount={0.15}>
                            <div className="flex items-center gap-2">
                                <span className="bg-alidade-gold h-[1.5px] w-8" />
                                <span className="text-alidade-gold text-sm font-bold tracking-[0.25em] uppercase sm:text-xl">
                                    {t('Étude Personnalisée')}
                                </span>
                            </div>
                            <h2 className="text-3xl font-bold uppercase sm:text-4xl lg:text-5xl">
                                {t('Demandez Votre ')}
                                <br />
                                <span className="text-alidade-gold font-serif">{t('Devis Gratuit')}</span>
                            </h2>
                            <p className="max-w-lg text-sm leading-relaxed font-light text-gray-300">
                                {t(
                                    "Décrivez votre projet d'agencement, de menuiserie fine ou de rénovation globale. Nos ingénieurs évaluent vos volumes et vous rédigent un estimatif détaillé sous 48 heures.",
                                )}
                            </p>

                            {/* Grid indicators (Screenshot 5 Right) */}
                            <div className="grid grid-cols-1 gap-6 border-t border-white/10 pt-6 sm:grid-cols-3">
                                <div className="flex items-center gap-3">
                                    <div className="border-alidade-gold/30 text-alidade-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white/5">
                                        <CheckCircle size={16} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold tracking-wider uppercase">{t('Réponse rapide')}</span>
                                        <span className="block text-[10px] font-light text-gray-400">{t('Sous 48 heures')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="border-alidade-gold/30 text-alidade-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white/5">
                                        <Sparkles size={16} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold tracking-wider uppercase">{t('Devis gratuit')}</span>
                                        <span className="block text-[10px] font-light text-gray-400">{t('Sans engagement')}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className="border-alidade-gold/30 text-alidade-gold flex h-10 w-10 shrink-0 items-center justify-center rounded-full border bg-white/5">
                                        <FolderArchive size={16} />
                                    </div>
                                    <div>
                                        <span className="block text-xs font-bold tracking-wider uppercase">{t('Étude sur mesure')}</span>
                                        <span className="block text-[10px] font-light text-gray-400">{t('Adaptée à vos besoins')}</span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>

                        {/* Right side form block inside card (Screenshot 5 Right Right column) */}
                        <Reveal className="lg:col-span-6" delay={0.15} amount={0.1}>
                            <div
                                className="text-alidade-navy relative rounded-2xl border border-gray-100 bg-white p-6 shadow-2xl sm:p-8"
                                id="quote-request-card"
                            >
                                <div className="mb-6 flex items-center justify-between">
                                    <h3 className="text-alidade-navy text-lg font-bold tracking-wider uppercase">{t('Demande de Devis')}</h3>
                                </div>

                                {isSubmitted && submittedQuote && (
                                    <div className="animate-in zoom-in-95 mb-6 space-y-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-emerald-800 duration-300">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle size={18} className="shrink-0 text-emerald-500" />
                                            <span className="text-xs font-bold tracking-wider uppercase">
                                                {t('Devis enregistré sous le numéro ')}
                                                {submittedQuote.id}
                                            </span>
                                        </div>
                                        <p className="text-[11px] leading-relaxed font-light text-emerald-700">
                                            {t(
                                                "Votre dossier a bien été soumis à notre bureau d'études technique de Casablanca. Vous pouvez suivre l'avancement de cette demande dans votre tableau de bord.",
                                            )}
                                        </p>
                                        <button
                                            onClick={() => {
                                                setIsSubmitted(false);
                                                onNavigateToMyQuotes();
                                            }}
                                            className="w-full rounded bg-emerald-600 py-2 text-[10px] font-bold tracking-wider text-white uppercase transition-colors hover:bg-emerald-700"
                                            id="view-estimate-dashboard-btn"
                                        >
                                            {t('Suivre mon dossier de devis')}
                                        </button>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    {/* Nom complet */}
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            {t('Nom complet *')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder={t('Ex: Youssef El Alami')}
                                                required
                                                value={fullName}
                                                onChange={(e) => setFullName(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                id="quote-name-input"
                                            />
                                            <User size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Email & Phone */}
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {/* Email */}
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                {t('Email *')}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    placeholder={t('votre@email.com')}
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                    id="quote-email-input"
                                                />
                                                <Mail size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                            </div>
                                        </div>

                                        {/* Phone */}
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                {t('Téléphone *')}
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    placeholder={t('05 22 48 44 25')}
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

                                    {/* Project Type */}
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            {t('Type de projet *')}
                                        </label>
                                        <div className="relative">
                                            <select
                                                value={projectType}
                                                onChange={(e) => setProjectType(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full appearance-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-10 pl-4 text-xs font-medium outline-none focus:ring-1"
                                                id="quote-type-input"
                                            >
                                                <option value="Menuiserie Bois & Cuisine Moderne">{t('Menuiserie Bois & Cuisine Moderne')}</option>
                                                <option value="Travaux De Construction Et Rénovation">
                                                    {t('Travaux De Construction Et Rénovation')}
                                                </option>
                                                <option value="Travaux De Peinture Professionnelle">
                                                    {t('Travaux De Peinture Professionnelle')}
                                                </option>
                                                <option value="Revêtement De Sol / Parquet">{t('Revêtement De Sol / Parquet')}</option>
                                                <option value="Faux Plafond & Eclairage LED">{t('Faux Plafond & Eclairage LED')}</option>
                                                <option value="Aménagement Commerciale & Agencement">
                                                    {t('Aménagement Commerciale & Agencement')}
                                                </option>
                                                <option value="Projet Global Clé-En-Main">{t('Projet Global Clé-En-Main')}</option>
                                            </select>
                                            <ChevronDown
                                                size={15}
                                                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-gray-400"
                                            />
                                        </div>
                                    </div>

                                    {/* Project Description */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between">
                                            <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                {t('Description de votre projet *')}
                                            </label>
                                            {preFilledSummary && (
                                                <span className="text-alidade-gold bg-alidade-gold/5 animate-pulse rounded px-2 py-0.5 text-[9px] font-bold">
                                                    {t('Données configurateur injectées')}
                                                </span>
                                            )}
                                        </div>
                                        <div className="relative">
                                            <textarea
                                                placeholder={t(
                                                    'Nombre de pièces, dimensions estimées, essence de bois souhaitée (Chêne, Noyer, MDF, Mélaminé), ou spécifications de peinture...',
                                                )}
                                                required
                                                rows={4}
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full resize-none rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                id="quote-desc-input"
                                            />
                                            <AlignLeft size={15} className="absolute top-4 left-4 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* Budget selection */}
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            {t('Budget estimatif (optionnel)')}
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder={t('Ex: 45 000 MAD')}
                                                value={budget}
                                                onChange={(e) => setBudget(e.target.value)}
                                                className="focus:ring-alidade-gold focus:border-alidade-gold w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pr-4 pl-11 text-xs outline-none focus:ring-1"
                                                id="quote-budget-input"
                                            />
                                            <Wallet size={15} className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                                        </div>
                                    </div>

                                    {/* File Uploader */}
                                    <div className="space-y-1">
                                        <label className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                            {t('Ajouter des fichiers (plans, photos...)')}
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
                                                        {t('Glissez vos fichiers ou')}{' '}
                                                        <span className="text-alidade-gold font-bold underline">{t('choisissez un fichier')}</span>
                                                    </span>
                                                )}
                                            </div>
                                            <span className="text-[9px] text-gray-400">{t('Taille maximale : 15 Mo (PDF, PNG, JPG, CAD)')}</span>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="pt-2">
                                        <button
                                            type="submit"
                                            className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-colors"
                                            id="quote-submit-btn"
                                        >
                                            <span>{t('ENVOYER LA DEMANDE DE DEVIS')}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* Why ask a quote from Allocall section (Screenshot 5 Bottom Right) */}
            <section className="bg-gray-50 py-20">
                <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
                    <Reveal className="space-y-3 text-center">
                        <h3 className="text-alidade-navy text-2xl font-bold sm:text-3xl">{t('Pourquoi demander un devis chez ALLO CALL ?')}</h3>
                        <div className="bg-alidade-gold mx-auto h-0.5 w-16 rounded-full" />
                    </Reveal>

                    <Stagger stagger={0.12} className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {/* Box 1 */}
                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <SearchCode size={20} />
                            </div>
                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Analyse détaillée')}</h4>
                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t(
                                    "Nous étudions minutieusement chaque paramètre, plan d'exécution ou photo transmise pour émettre un estimatif d'une justesse rigoureuse.",
                                )}
                            </p>
                        </StaggerItem>

                        {/* Box 2 */}
                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <Sparkles size={20} />
                            </div>
                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Solutions adaptées')}</h4>
                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t(
                                    'Chaque pièce de bois, type de laque ou profilé de cloison est dimensionné selon vos besoins ergonomiques et vos préférences esthétiques.',
                                )}
                            </p>
                        </StaggerItem>

                        {/* Box 3 */}
                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <Shield size={20} />
                            </div>
                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Rapport Qualité/Prix')}</h4>
                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t(
                                    "Aucun intermédiaire. Nous produisons directement dans notre atelier à Casablanca, vous offrant des tarifs d'usine directs sans compromettre la noblesse.",
                                )}
                            </p>
                        </StaggerItem>

                        {/* Box 4 */}
                        <StaggerItem className="space-y-3 rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="bg-alidade-navy text-alidade-gold flex h-10 w-10 items-center justify-center rounded-full">
                                <Star size={20} />
                            </div>
                            <h4 className="text-alidade-navy text-xs font-bold tracking-wider uppercase">{t('Accompagnement')}</h4>
                            <p className="text-xs leading-relaxed font-light text-gray-500">
                                {t(
                                    "Un conducteur de travaux dédié suit l'avancement de votre chantier, de la pose du premier tasseau jusqu'aux finitions de vernis finales.",
                                )}
                            </p>
                        </StaggerItem>
                    </Stagger>

                    {/* Advice Callout Banner at the bottom of Screenshot 5 Right */}
                    <Reveal className="from-alidade-navy to-alidade-dark border-alidade-gold/15 flex flex-col items-center justify-between gap-6 rounded-2xl border bg-gradient-to-r p-6 text-white shadow-lg sm:p-8 md:flex-row">
                        <div className="space-y-1.5 text-center md:text-left">
                            <span className="text-alidade-gold block text-xs font-bold tracking-widest uppercase">
                                {t("Besoin d'un conseil technique ?")}
                            </span>
                            <p className="max-w-xl text-sm font-light text-gray-300">
                                {t(
                                    'Nos experts sont à votre entière disposition pour vous guider, étudier vos esquisses et clarifier vos questions réglementaires ou thermiques.',
                                )}
                            </p>
                        </div>
                        <button
                            onClick={onNavigateToContact}
                            className="hover:bg-alidade-gold text-alidade-dark flex shrink-0 cursor-pointer items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-xs font-bold tracking-widest uppercase shadow-md transition-all duration-300 hover:text-white"
                            id="devis-contact-btn"
                        >
                            <span>{t('NOUS CONTACTER')}</span>
                            <ArrowRight size={13} />
                        </button>
                    </Reveal>
                </div>
            </section>
        </div>
    );
}
