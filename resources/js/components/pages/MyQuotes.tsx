/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calendar, FileText, RefreshCw, Trash2, UserCheck } from 'lucide-react';
import { useEffect, useState } from 'react';
import { QuoteRequest } from '../types';

interface MyQuotesProps {
    onNavigateToRequest: () => void;
}

export default function MyQuotes({ onNavigateToRequest }: MyQuotesProps) {
    const [quotes, setQuotes] = useState<QuoteRequest[]>([]);

    // Load quotes from local storage
    const loadQuotes = () => {
        const existingQuotesJson = localStorage.getItem('alidade_quotes');
        let existingQuotes: QuoteRequest[] = existingQuotesJson ? JSON.parse(existingQuotesJson) : [];

        // Seed with a default historical quote if empty, so the page is never blank and showcases beautiful styling!
        if (existingQuotes.length === 0) {
            const defaultQuote: QuoteRequest = {
                id: 'QT-829140',
                fullName: 'Yasmine Benjelloun',
                email: 'yasmine.b@gmail.com',
                phone: '06 61 22 33 44',
                projectType: 'Menuiserie Bois & Cuisine Moderne',
                description:
                    "Agencement complet d'une cuisine ouverte de 12m². Installation d'un îlot central en Noyer d'ébéniste, façades laquées noir mat anti-traces, éclairage LED périphérique intégré sous meubles hauts. Quincaillerie Blum requise.",
                budget: '85 000 MAD',
                date: '25 Juin 2026 à 14:32',
                status: "En cours d'étude",
                estimatedCostMin: 78000,
                estimatedCostMax: 89000,
            };
            existingQuotes = [defaultQuote];
            localStorage.setItem('alidade_quotes', JSON.stringify(existingQuotes));
        }

        setQuotes(existingQuotes);
    };

    useEffect(() => {
        loadQuotes();
    }, []);

    const handleDelete = (id: string) => {
        if (confirm('Voulez-vous vraiment supprimer cette demande de devis ?')) {
            const updated = quotes.filter((q) => q.id !== id);
            setQuotes(updated);
            localStorage.setItem('alidade_quotes', JSON.stringify(updated));
        }
    };

    const handleRefresh = () => {
        loadQuotes();
    };

    return (
        <div className="relative min-h-[500px] w-full bg-white">
            <section className="bg-gray-50/50 py-12">
                <div className="mx-auto max-w-4xl px-4 sm:px-6">
                    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <div className="flex items-center gap-2">
                                <span className="bg-alidade-gold h-[1.5px] w-6" />
                                <span className="text-alidade-gold text-xs font-bold tracking-[0.2em] uppercase">Suivi de dossier</span>
                            </div>
                            <h2 className="text-alidade-navy  text-2xl font-bold sm:text-3xl">Mes Demandes de Devis</h2>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={handleRefresh}
                                className="hover:text-alidade-gold flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-gray-400 transition-colors"
                                title="Actualiser les données"
                                id="refresh-quotes-btn"
                            >
                                <RefreshCw size={15} />
                            </button>
                            <button
                                onClick={onNavigateToRequest}
                                className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-xs font-bold tracking-wider uppercase shadow transition-colors"
                                id="request-new-quote-btn"
                            >
                                Nouvelle demande
                            </button>
                        </div>
                    </div>

                    {quotes.length === 0 ? (
                        <div className="space-y-4 rounded-2xl border border-gray-100 bg-white p-8 py-16 text-center">
                            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-50 text-gray-300">
                                <FileText size={24} />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-alidade-navy text-sm font-bold uppercase">Aucun devis enregistré</h3>
                                <p className="text-xs font-light text-gray-400">
                                    Vous n'avez pas encore soumis de demande de devis ou de projet via nos formulaires.
                                </p>
                            </div>
                            <button
                                onClick={onNavigateToRequest}
                                className="bg-alidade-navy hover:bg-alidade-gold rounded-xl px-5 py-3 text-xs font-bold tracking-wider text-white uppercase transition-colors"
                                id="empty-state-quote-btn"
                            >
                                Demander un devis maintenant
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {quotes.map((quote) => {
                                const isPending = quote.status === 'En attente';
                                const isStudying = quote.status === "En cours d'étude";
                                const isApproved = quote.status === 'Approuvé';

                                let statusBadge = 'bg-amber-50 text-amber-800 border-amber-100';
                                if (isStudying) statusBadge = 'bg-blue-50 text-blue-800 border-blue-100';
                                if (isApproved) statusBadge = 'bg-emerald-50 text-emerald-800 border-emerald-100';

                                return (
                                    <div
                                        key={quote.id}
                                        className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md"
                                        id={`quote-card-${quote.id}`}
                                    >
                                        {/* Header bar */}
                                        <div className="flex flex-col items-start justify-between gap-3 border-b border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center">
                                            <div className="flex items-center gap-3">
                                                <span className="text-alidade-gold bg-alidade-navy rounded px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-white">
                                                    {quote.id}
                                                </span>
                                                <div className="flex items-center gap-1 text-[11px] text-gray-400">
                                                    <Calendar size={12} />
                                                    <span>Soumis le {quote.date}</span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span
                                                    className={`rounded border px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${statusBadge}`}
                                                >
                                                    {quote.status}
                                                </span>
                                                <button
                                                    onClick={() => handleDelete(quote.id)}
                                                    className="rounded p-1.5 text-gray-300 transition-colors hover:text-red-500"
                                                    title="Supprimer cette demande"
                                                    id={`delete-quote-${quote.id}`}
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Main content body */}
                                        <div className="space-y-5 p-6">
                                            <div className="space-y-2">
                                                <span className="block text-[10px] font-bold tracking-widest text-gray-400 uppercase">
                                                    Détails du projet
                                                </span>
                                                <h4 className="text-alidade-navy font-sans text-base font-bold tracking-wide uppercase">
                                                    {quote.projectType}
                                                </h4>
                                                <p className="rounded-xl border border-gray-100 bg-gray-50/50 p-4 text-xs leading-relaxed font-light whitespace-pre-line text-gray-500">
                                                    {quote.description}
                                                </p>
                                            </div>

                                            {/* Client Coordinates Summary */}
                                            <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4 text-xs sm:grid-cols-3">
                                                <div>
                                                    <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">Client</span>
                                                    <span className="text-alidade-navy mt-0.5 block font-medium">{quote.fullName}</span>
                                                </div>
                                                <div>
                                                    <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                                        Téléphone
                                                    </span>
                                                    <span className="text-alidade-navy mt-0.5 block font-mono font-medium">{quote.phone}</span>
                                                </div>
                                                <div className="col-span-2 sm:col-span-1">
                                                    <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
                                                        Budget estimatif
                                                    </span>
                                                    <span className="text-alidade-navy mt-0.5 block font-medium">{quote.budget || 'Non défini'}</span>
                                                </div>
                                            </div>

                                            {/* File attachment preview */}
                                            {quote.fileName && (
                                                <div className="bg-alidade-navy/5 flex w-fit items-center gap-2 rounded-lg px-3 py-2 text-xs">
                                                    <FileText size={14} className="text-alidade-gold" />
                                                    <span className="text-alidade-navy font-medium">{quote.fileName}</span>
                                                    <span className="text-[10px] text-gray-400">({quote.fileSize})</span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Dynamic Simulated Response Banner from Alidade Engineers */}
                                        <div className="from-alidade-navy/5 flex items-start gap-3 border-t border-gray-100 bg-gradient-to-r to-transparent px-6 py-4">
                                            <div className="bg-alidade-gold/10 text-alidade-gold mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                                                <UserCheck size={14} />
                                            </div>
                                            <div className="space-y-1">
                                                <div className="text-alidade-navy flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase">
                                                    <span>Étude Technique par : Youssef El Alami</span>
                                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" title="Chargé d'affaire en ligne" />
                                                </div>
                                                <p className="text-[11px] leading-relaxed font-light text-gray-500">
                                                    {isPending
                                                        ? "Votre dossier est en cours de répartition au bureau d'étude technique. Un de nos menuisiers/conducteurs d'agencement sera désigné d'ici 12 heures."
                                                        : "Dossier pris en charge. Nous étudions l'épaisseur de bois et la quincaillerie Blum à préconiser. Une visite sur site à Casablanca est recommandée pour finaliser les cotes."}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
