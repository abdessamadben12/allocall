/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Reveal } from '@/components/motion';
import { Check, Layout, Save, Sliders, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface ConfiguratorProps {
    onSendToQuote: (configSummary: string, calculatedCost: number) => void;
}

export default function Configurator({ onSendToQuote }: ConfiguratorProps) {
    const [projectType, setProjectType] = useState<'kitchen' | 'wardrobe' | 'cladding'>('kitchen');
    const [material, setMaterial] = useState('Chêne Massif');
    const [finish, setFinish] = useState('Vernis Mat Satiné');
    const [width, setWidth] = useState(3.5); // meters
    const [height, setHeight] = useState(2.4); // meters
    const [depth, setDepth] = useState(0.6); // meters
    const [ledLighting, setLedLighting] = useState(true);
    const [pushToOpen, setPushToOpen] = useState(false);
    const [premiumFittings, setPremiumFittings] = useState(true);
    const [savedSelection, setSavedSelection] = useState<string | null>(null);

    const materials = [
        { name: 'Chêne Massif', factor: 1.5, desc: 'Authentique, chaleureux et extrêmement durable.', colorClass: 'bg-amber-100 border-amber-300' },
        { name: 'Noyer Noir', factor: 1.9, desc: "Bois d'ébénisterie sombre, élégant et prestigieux.", colorClass: 'bg-amber-900 border-amber-950' },
        {
            name: 'Fenix NTM / Fénix',
            factor: 1.3,
            desc: 'Résine mate anti-traces, toucher soyeux haut de gamme.',
            colorClass: 'bg-gray-800 border-gray-900',
        },
        {
            name: 'MDF Laqué Premium',
            factor: 1.2,
            desc: 'Finition ultra-lisse, idéale pour les laques de couleur.',
            colorClass: 'bg-white border-gray-300',
        },
        {
            name: 'Mélaminé Structuré',
            factor: 0.8,
            desc: 'Solution moderne, résistante aux rayures et économique.',
            colorClass: 'bg-yellow-50 border-amber-200',
        },
    ];

    const finishes = [
        { name: 'Vernis Mat Satiné', factor: 1.0 },
        { name: 'Laque Haute Brillance', factor: 1.25 },
        { name: 'Huile Naturelle Bio', factor: 1.1 },
        { name: 'Teintée sur-mesure (Gris, Noir, etc.)', factor: 1.15 },
    ];

    // Base costs per linear meter (width)
    const baseCostPerMeter = {
        kitchen: 3500, // MAD / meter
        wardrobe: 2500, // MAD / meter
        cladding: 1500, // MAD / meter
    };

    // Calculate price estimate
    const materialObj = materials.find((m) => m.name === material) || materials[0];
    const finishObj = finishes.find((f) => f.name === finish) || finishes[0];

    const baseCost = width * baseCostPerMeter[projectType];
    const dimensionMultiplier = height / 2.2; // normal height is 2.2m
    let finalCost = baseCost * materialObj.factor * finishObj.factor * dimensionMultiplier;

    // Add options cost
    if (ledLighting) finalCost += width * 450; // LED costs 450 MAD per meter
    if (pushToOpen) finalCost += 800; // Flat cost
    if (premiumFittings) finalCost += width * 600; // Blum hinges etc.

    const finalCostFormatted = Math.round(finalCost).toLocaleString('fr-FR');

    const handleExportToQuote = () => {
        const optionsList = [];
        if (ledLighting) optionsList.push('Éclairage ruban LED intégré');
        if (pushToOpen) optionsList.push('Mécanisme Push-to-Open sans poignées');
        if (premiumFittings) optionsList.push('Charnières amorties haut de gamme Blum');

        const summary = `Configurateur Alidade :
• Projet : ${projectType === 'kitchen' ? 'Cuisine Moderne' : projectType === 'wardrobe' ? 'Dressing/Placard' : 'Habillage Mural'}
• Matériau : ${material} (${materialObj.desc})
• Finition : ${finish}
• Dimensions : Largeur ${width}m, Hauteur ${height}m, Profondeur ${depth}m
• Options sélectionnées : ${optionsList.join(', ') || 'Aucune'}
• Estimation budgétaire calculée : ${finalCostFormatted} MAD`;

        onSendToQuote(summary, Math.round(finalCost));
        setSavedSelection("Ajouté avec succès ! Naviguez vers l'onglet 'Demande de Devis' pour soumettre votre dossier final.");
        setTimeout(() => setSavedSelection(null), 8000);
    };

    return (
        <section className="wood-pattern bg-gray-50 py-20" id="configurator-section">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <Reveal className="mb-16 space-y-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                        <span className="bg-alidade-gold h-[1.5px] w-6" />
                        <span className="text-alidade-gold text-xs font-bold tracking-[0.2em] uppercase">Outil Intelligent Alidade</span>
                        <span className="bg-alidade-gold h-[1.5px] w-6" />
                    </div>
                    <h2 className="text-alidade-navy font-serif text-3xl font-bold tracking-tight uppercase sm:text-4xl lg:text-5xl">
                        Configurateur de Menuiserie 3D
                    </h2>
                    <p className="mx-auto max-w-xl text-sm font-light text-gray-400">
                        Sélectionnez vos bois nobles, vos finitions d'art, ajustez vos dimensions au millimètre et obtenez une estimation budgétaire
                        en temps réel.
                    </p>
                    <div className="flex items-center justify-center py-2">
                        <span className="via-alidade-gold h-[1.5px] w-24 bg-gradient-to-r from-transparent to-transparent" />
                        <span className="text-alidade-gold mx-2 text-xs">◆</span>
                        <span className="via-alidade-gold h-[1.5px] w-24 bg-gradient-to-r from-transparent to-transparent" />
                    </div>
                </Reveal>

                {/* Configurator Split Layout */}
                <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
                    {/* Left panel: Control variables (Form inputs) */}
                    <Reveal
                        className="flex flex-col justify-between space-y-8 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8 lg:col-span-7"
                        amount={0.1}
                    >
                        <div className="space-y-6">
                            {/* Step 1: Project Type */}
                            <div className="space-y-3">
                                <label className="text-alidade-navy flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                                    <Layout size={14} className="text-alidade-gold" />
                                    1. Type de Projet :
                                </label>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        onClick={() => {
                                            setProjectType('kitchen');
                                            setDepth(0.6);
                                        }}
                                        className={`flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-3 text-xs font-bold tracking-wider uppercase transition-all sm:px-4 ${
                                            projectType === 'kitchen'
                                                ? 'border-alidade-gold bg-alidade-navy text-white shadow-md'
                                                : 'hover:border-alidade-gold/30 text-alidade-navy border-gray-100 hover:bg-gray-50'
                                        }`}
                                        id="config-type-kitchen"
                                    >
                                        <span>Cuisine</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setProjectType('wardrobe');
                                            setDepth(0.6);
                                        }}
                                        className={`flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-3 text-xs font-bold tracking-wider uppercase transition-all sm:px-4 ${
                                            projectType === 'wardrobe'
                                                ? 'border-alidade-gold bg-alidade-navy text-white shadow-md'
                                                : 'hover:border-alidade-gold/30 text-alidade-navy border-gray-100 hover:bg-gray-50'
                                        }`}
                                        id="config-type-wardrobe"
                                    >
                                        <span>Dressing</span>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setProjectType('cladding');
                                            setDepth(0.05);
                                        }}
                                        className={`flex flex-col items-center gap-2 rounded-xl border-2 px-2 py-3 text-xs font-bold tracking-wider uppercase transition-all sm:px-4 ${
                                            projectType === 'cladding'
                                                ? 'border-alidade-gold bg-alidade-navy text-white shadow-md'
                                                : 'hover:border-alidade-gold/30 text-alidade-navy border-gray-100 hover:bg-gray-50'
                                        }`}
                                        id="config-type-cladding"
                                    >
                                        <span>Habillage</span>
                                    </button>
                                </div>
                            </div>

                            {/* Step 2: Wood Species / Materials */}
                            <div className="space-y-3">
                                <label className="text-alidade-navy flex items-center gap-2 text-xs font-bold tracking-wider uppercase">
                                    <Sliders size={14} className="text-alidade-gold" />
                                    2. Essence ou Matériau Principal :
                                </label>
                                <div className="space-y-2">
                                    {materials.map((m) => (
                                        <button
                                            key={m.name}
                                            onClick={() => setMaterial(m.name)}
                                            className={`flex w-full items-center justify-between gap-4 rounded-xl border-2 p-3.5 text-left transition-all ${
                                                material === m.name
                                                    ? 'border-alidade-gold bg-alidade-navy/5 shadow-sm'
                                                    : 'border-gray-100 bg-white hover:border-gray-200'
                                            }`}
                                            id={`config-material-${m.name.replace(/\s+/g, '-').toLowerCase()}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`h-6 w-6 rounded-full border border-gray-300 ${m.colorClass}`} />
                                                <div>
                                                    <span className="text-alidade-navy block text-xs font-bold tracking-wider uppercase">
                                                        {m.name}
                                                    </span>
                                                    <span className="block text-[11px] font-light text-gray-400">{m.desc}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-alidade-gold text-xs font-semibold">x{m.factor}</span>
                                                {material === m.name && (
                                                    <div className="bg-alidade-gold flex h-5 w-5 items-center justify-center rounded-full text-white">
                                                        <Check size={12} />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Finish options */}
                            <div className="space-y-3">
                                <label className="text-alidade-navy text-xs font-bold tracking-wider uppercase">3. Finitions d'Art :</label>
                                <div className="grid grid-cols-2 gap-3">
                                    {finishes.map((f) => (
                                        <button
                                            key={f.name}
                                            onClick={() => setFinish(f.name)}
                                            className={`flex items-center justify-between rounded-xl border-2 p-3 text-left text-xs transition-all ${
                                                finish === f.name
                                                    ? 'border-alidade-gold bg-alidade-navy/5 text-alidade-navy font-bold'
                                                    : 'border-gray-100 text-gray-500 hover:border-gray-200'
                                            }`}
                                            id={`config-finish-${f.name.replace(/\s+/g, '-').toLowerCase()}`}
                                        >
                                            <span>{f.name}</span>
                                            {finish === f.name && <Check size={12} className="text-alidade-gold" />}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Step 4: Dimensions Adjustable Sliders */}
                            <div className="space-y-4">
                                <label className="text-alidade-navy text-xs font-bold tracking-wider uppercase">4. Dimensions de l'Espace :</label>
                                <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                                    {/* Width slider */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-alidade-navy font-bold uppercase">Largeur (Longueur)</span>
                                            <span className="text-alidade-gold font-mono font-bold">{width.toFixed(2)} m</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1.0"
                                            max="10.0"
                                            step="0.1"
                                            value={width}
                                            onChange={(e) => setWidth(parseFloat(e.target.value))}
                                            className="accent-alidade-gold h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                            id="config-range-width"
                                        />
                                    </div>

                                    {/* Height slider */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs">
                                            <span className="text-alidade-navy font-bold uppercase">Hauteur</span>
                                            <span className="text-alidade-gold font-mono font-bold">{height.toFixed(2)} m</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="1.5"
                                            max="3.5"
                                            step="0.05"
                                            value={height}
                                            onChange={(e) => setHeight(parseFloat(e.target.value))}
                                            className="accent-alidade-gold h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                                            id="config-range-height"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Step 5: Option checklist */}
                            <div className="space-y-3">
                                <label className="text-alidade-navy text-xs font-bold tracking-wider uppercase">
                                    5. Équipements & Confort Optionnels :
                                </label>
                                <div className="space-y-2">
                                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 p-3 text-xs hover:bg-gray-50">
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={ledLighting}
                                                onChange={(e) => setLedLighting(e.target.checked)}
                                                className="text-alidade-gold focus:ring-alidade-gold h-4 w-4 rounded border-gray-300"
                                                id="config-opt-led"
                                            />
                                            <div>
                                                <span className="text-alidade-navy block font-bold uppercase">Éclairage LED d'Ambiance</span>
                                                <span className="block text-[10px] font-light text-gray-400">
                                                    Rubans LED encastrés avec variateur tactile
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-alidade-gold font-mono font-bold">+450 DH/m</span>
                                    </label>

                                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 p-3 text-xs hover:bg-gray-50">
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={pushToOpen}
                                                onChange={(e) => setPushToOpen(e.target.checked)}
                                                className="text-alidade-gold focus:ring-alidade-gold h-4 w-4 rounded border-gray-300"
                                                id="config-opt-push"
                                            />
                                            <div>
                                                <span className="text-alidade-navy block font-bold uppercase">Système Push-To-Open</span>
                                                <span className="block text-[10px] font-light text-gray-400">
                                                    Façades épurées sans poignées apparentes
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-alidade-gold font-mono font-bold">+800 DH</span>
                                    </label>

                                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-100 p-3 text-xs hover:bg-gray-50">
                                        <div className="flex items-center gap-2.5">
                                            <input
                                                type="checkbox"
                                                checked={premiumFittings}
                                                onChange={(e) => setPremiumFittings(e.target.checked)}
                                                className="text-alidade-gold focus:ring-alidade-gold h-4 w-4 rounded border-gray-300"
                                                id="config-opt-blum"
                                            />
                                            <div>
                                                <span className="text-alidade-navy block font-bold uppercase">Quincaillerie Autrichienne Blum</span>
                                                <span className="block text-[10px] font-light text-gray-400">
                                                    Charnières à amortisseurs hydrauliques intégrés
                                                </span>
                                            </div>
                                        </div>
                                        <span className="text-alidade-gold font-mono font-bold">+600 DH/m</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </Reveal>

                    {/* Right panel: Visual interactive rendering and Pricing engine */}
                    <Reveal className="flex flex-col gap-6 lg:col-span-5" delay={0.15} amount={0.1}>
                        {/* Visualizer viewport */}
                        <div className="bg-alidade-navy border-alidade-gold/15 relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl border p-6 text-white shadow-xl">
                            {/* Overlay LED glow effect */}
                            {ledLighting && (
                                <div className="from-alidade-gold-light/40 pointer-events-none absolute top-0 right-0 left-0 h-4 animate-pulse bg-gradient-to-b to-transparent blur-md" />
                            )}

                            <div className="relative z-10 flex items-center justify-between">
                                <span className="bg-alidade-gold/20 text-alidade-gold-light rounded px-2.5 py-1 text-[10px] font-bold tracking-widest uppercase">
                                    Aperçu Technique 2D
                                </span>
                                <span className="font-mono text-[11px] text-gray-400">Scale: 1m ≈ 40px</span>
                            </div>

                            {/* Dynamic canvas drawing of woodwork cabinetry based on selections */}
                            <div className="relative flex flex-grow items-center justify-center p-4">
                                <div className="bg-alidade-dark/50 border-alidade-gold/10 relative flex min-h-[160px] w-full max-w-xs items-end justify-center rounded-lg border p-3">
                                    {/* Dynamic LED line */}
                                    {ledLighting && (
                                        <div className="bg-alidade-gold absolute top-2 right-3 left-3 h-[2px] animate-pulse shadow-[0_0_12px_#e6cb95]" />
                                    )}

                                    {/* Dynamic Rendered Cabinet */}
                                    <div
                                        className={`relative flex w-full flex-col rounded border transition-all duration-500 ${
                                            material === 'Chêne Massif'
                                                ? 'border-amber-300/40 bg-amber-100/25 text-amber-200'
                                                : material === 'Noyer Noir'
                                                  ? 'border-amber-950/40 bg-amber-900/25 text-amber-500'
                                                  : material === 'Fenix NTM / Fénix'
                                                    ? 'border-gray-950/40 bg-gray-800/30 text-gray-300'
                                                    : material === 'MDF Laqué Premium'
                                                      ? 'border-gray-400/20 bg-white/10 text-white'
                                                      : 'border-amber-200/20 bg-yellow-50/10 text-yellow-100'
                                        }`}
                                        style={{
                                            height: `${Math.min(180, height * 50)}px`,
                                            width: `${Math.min(260, width * 40)}px`,
                                        }}
                                    >
                                        {/* Partition divisions */}
                                        <div className="absolute inset-0 grid grid-cols-4 divide-x divide-white/10">
                                            <div className="relative flex h-full flex-col justify-between p-1.5">
                                                <span className="font-mono text-[7px]">P1</span>
                                                {pushToOpen ? null : <div className="h-3 w-1 self-center rounded-full bg-gray-400/50" />}
                                                <span className="text-center font-mono text-[6px]">0.6m</span>
                                            </div>
                                            <div className="relative flex h-full flex-col justify-between p-1.5">
                                                <span className="font-mono text-[7px]">P2</span>
                                                {pushToOpen ? null : <div className="h-3 w-1 self-center rounded-full bg-gray-400/50" />}
                                                <span className="text-center font-mono text-[6px]">0.6m</span>
                                            </div>
                                            <div className="relative flex h-full flex-col justify-between p-1.5">
                                                <span className="font-mono text-[7px]">P3</span>
                                                {pushToOpen ? null : <div className="h-3 w-1 self-center rounded-full bg-gray-400/50" />}
                                                <span className="text-center font-mono text-[6px]">0.6m</span>
                                            </div>
                                            <div className="relative flex h-full flex-col justify-between p-1.5">
                                                <span className="font-mono text-[7px]">P4</span>
                                                {pushToOpen ? null : <div className="h-3 w-1 self-center rounded-full bg-gray-400/50" />}
                                                <span className="text-center font-mono text-[6px]">0.6m</span>
                                            </div>
                                        </div>

                                        {/* Dimensions Watermark indicators */}
                                        <div className="text-alidade-gold absolute right-0 -bottom-5 left-0 text-center font-mono text-[9px]">
                                            L: {width.toFixed(2)}m
                                        </div>
                                        <div className="text-alidade-gold absolute top-1/2 -right-14 origin-left -translate-y-1/2 font-mono text-[9px]">
                                            H: {height.toFixed(2)}m
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Specs pill indicators */}
                            <div className="relative z-10 mt-2 flex flex-wrap gap-1.5 text-[9px]">
                                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5">{material}</span>
                                <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5">{finish}</span>
                                {ledLighting && (
                                    <span className="bg-alidade-gold/10 text-alidade-gold border-alidade-gold/20 rounded border px-2 py-0.5">
                                        LED ON
                                    </span>
                                )}
                                {pushToOpen && <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5">Push-To-Open</span>}
                                {premiumFittings && <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5">Amortisseurs Blum</span>}
                            </div>
                        </div>

                        {/* Pricing Summary Engine */}
                        <div className="flex flex-col justify-between space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                            <div className="space-y-4">
                                <h4 className="text-xs font-bold tracking-wider text-gray-400 uppercase">Estimation de Prix Provisoire :</h4>

                                {/* Real-time Pricing display */}
                                <div className="space-y-1">
                                    <span className="text-alidade-navy block font-mono text-4xl font-bold">
                                        {finalCostFormatted} <span className="text-alidade-gold text-lg font-bold">MAD</span>
                                    </span>
                                    <span className="block text-[10px] font-light text-gray-400 italic">
                                        * Estimation hors pose et livraison à Casablanca, Maroc. Soumis à validation technique finale.
                                    </span>
                                </div>

                                {/* Quick checklist visual of values */}
                                <ul className="space-y-1.5 border-t border-gray-100 pt-2 text-xs text-gray-500">
                                    <li className="flex items-center gap-2">
                                        <span className="bg-alidade-gold h-1.5 w-1.5 shrink-0 rounded-full" />
                                        <span>Conforme à la charte Alidade d'excellence artisanale</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="bg-alidade-gold h-1.5 w-1.5 shrink-0 rounded-full" />
                                        <span>Inclus la conception 3D photoréaliste de votre projet</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Action buttons to send to quote form */}
                            <div className="space-y-3">
                                <button
                                    onClick={handleExportToQuote}
                                    className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy flex w-full items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-colors"
                                    id="config-export-btn"
                                >
                                    <Save size={14} />
                                    Injecter dans ma Demande de Devis
                                </button>

                                {savedSelection && (
                                    <div className="animate-in fade-in flex items-start gap-2 rounded border border-emerald-100 bg-emerald-50 p-3 text-[11px] text-emerald-800 duration-300">
                                        <Sparkles size={14} className="mt-0.5 shrink-0 animate-bounce text-emerald-500" />
                                        <span>{savedSelection}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
