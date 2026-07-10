import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Calendar, Eye, FileText, Mail, Paperclip, Trash2, User, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface ContactMessage {
    id: number;
    request_type: 'contact' | 'quote';
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    project_type?: string | null;
    attachment_original_name?: string | null;
    attachment_url?: string | null;
    attachment_size_label?: string | null;
    message: string;
    created_at: string;
}

interface Filters {
    type: string;
    date_from: string;
    date_to: string;
}

const emptyFilters: Filters = { type: '', date_from: '', date_to: '' };

export default function Dashboard({
    contactMessages = [],
    filters = emptyFilters,
}: {
    contactMessages?: ContactMessage[];
    filters?: Filters;
}) {
    const totalSubmissions = contactMessages.length;
    const uniqueSenders = new Set(contactMessages.map((m) => m.email)).size;
    const quoteCount = contactMessages.filter((m) => m.request_type === 'quote').length;
    const hasActiveFilters = Boolean(filters.type || filters.date_from || filters.date_to);

    const applyFilters = (next: Partial<Filters>) => {
        const merged = { ...filters, ...next };
        const params = Object.fromEntries(Object.entries(merged).filter(([, value]) => value !== ''));
        router.get('/dashboard', params, { preserveState: true, preserveScroll: true, replace: true });
    };

    const deleteMessage = (msg: ContactMessage) => {
        if (confirm(`Supprimer le message de ${msg.first_name} ${msg.last_name} ?`)) {
            router.delete(`/messages/${msg.id}`, { preserveScroll: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl bg-neutral-900 p-6 text-white">
                <div className="grid auto-rows-min gap-6 md:grid-cols-3">
                    <StatCard label="Messages recus" value={totalSubmissions} icon={<Mail className="h-6 w-6" />} />
                    <StatCard label="Contacts uniques" value={uniqueSenders} icon={<User className="h-6 w-6" />} />
                    <StatCard label="Demandes de devis" value={quoteCount} icon={<FileText className="h-6 w-6" />} />
                </div>

                <div className="flex min-h-[50vh] flex-1 flex-col gap-4 rounded-xl border border-neutral-700/50 bg-neutral-800 p-6 shadow-sm">
                    <div className="flex flex-col justify-between gap-2 border-b border-neutral-700 pb-4 sm:flex-row sm:items-center">
                        <div>
                            <h2 className="text-lg font-bold tracking-wide text-white">Messages et devis</h2>
                            <p className="mt-1 text-xs text-neutral-400">Derniers messages envoyes via contact et demande de devis</p>
                        </div>
                        <span className="self-start rounded-full bg-neutral-700 px-3 py-1.5 text-[10px] font-semibold tracking-wider text-white uppercase sm:self-auto">
                            {totalSubmissions} message{totalSubmissions !== 1 ? 's' : ''}
                        </span>
                    </div>

                    <div className="flex flex-wrap items-end gap-3">
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">Type</span>
                            <select
                                value={filters.type}
                                onChange={(e) => applyFilters({ type: e.target.value })}
                                className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-2 text-xs text-white focus:border-[#c5a880] focus:outline-none"
                            >
                                <option value="">Tous</option>
                                <option value="contact">Contact</option>
                                <option value="quote">Devis</option>
                            </select>
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">Du</span>
                            <input
                                type="date"
                                value={filters.date_from}
                                onChange={(e) => applyFilters({ date_from: e.target.value })}
                                className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-white [color-scheme:dark] focus:border-[#c5a880] focus:outline-none"
                            />
                        </label>
                        <label className="flex flex-col gap-1.5">
                            <span className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">Au</span>
                            <input
                                type="date"
                                value={filters.date_to}
                                min={filters.date_from || undefined}
                                onChange={(e) => applyFilters({ date_to: e.target.value })}
                                className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-xs text-white [color-scheme:dark] focus:border-[#c5a880] focus:outline-none"
                            />
                        </label>
                        {hasActiveFilters && (
                            <button
                                type="button"
                                onClick={() => applyFilters(emptyFilters)}
                                className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
                            >
                                <X className="h-3.5 w-3.5" />
                                Reinitialiser
                            </button>
                        )}
                    </div>

                    {contactMessages.length > 0 ? (
                        <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse text-left">
                                <thead>
                                    <tr className="border-b border-neutral-700 text-[10px] font-bold tracking-[0.15em] text-neutral-400 uppercase">
                                        <th className="px-4 py-4 font-semibold">Nom complet</th>
                                        <th className="px-4 py-4 font-semibold">Type</th>
                                        <th className="px-4 py-4 font-semibold">Contact</th>
                                        <th className="px-4 py-4 font-semibold">Projet</th>
                                        <th className="px-4 py-4 font-semibold">Message</th>
                                        <th className="px-4 py-4 font-semibold">Fichier</th>
                                        <th className="px-4 py-4 font-semibold">Date d'envoi</th>
                                        <th className="px-4 py-4 font-semibold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-700/50 text-xs font-light text-neutral-300">
                                    {contactMessages.map((msg) => (
                                        <tr key={msg.id} className="transition-colors hover:bg-neutral-700/20">
                                            <td className="px-4 py-4 font-semibold text-white">
                                                {msg.first_name} {msg.last_name}
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                                                        msg.request_type === 'quote'
                                                            ? 'bg-[#c5a880]/15 text-[#c5a880]'
                                                            : 'bg-blue-500/10 text-blue-300'
                                                    }`}
                                                >
                                                    {msg.request_type === 'quote' ? 'Devis' : 'Contact'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <a href={`mailto:${msg.email}`} className="text-[#c5a880] hover:underline">
                                                    {msg.email}
                                                </a>
                                                {msg.phone && <div className="mt-1 text-neutral-500">{msg.phone}</div>}
                                            </td>
                                            <td className="px-4 py-4 text-neutral-400">{msg.project_type || '-'}</td>
                                            <td className="max-w-sm break-words px-4 py-4 pr-8 leading-relaxed whitespace-pre-wrap xl:max-w-md">
                                                {msg.message}
                                            </td>
                                            <td className="px-4 py-4">
                                                {msg.attachment_url ? (
                                                    <a href={msg.attachment_url} className="inline-flex max-w-[180px] items-center gap-2 text-[#c5a880] hover:underline">
                                                        <Paperclip className="h-3.5 w-3.5 shrink-0" />
                                                        <span className="truncate">{msg.attachment_original_name || 'Piece jointe'}</span>
                                                        {msg.attachment_size_label && <span className="shrink-0 text-neutral-500">({msg.attachment_size_label})</span>}
                                                    </a>
                                                ) : (
                                                    <span className="text-neutral-600">-</span>
                                                )}
                                            </td>
                                            <td className="px-4 py-4 text-neutral-400">
                                                <span className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5 text-neutral-500" />
                                                    {new Date(msg.created_at).toLocaleDateString('fr-FR', {
                                                        day: '2-digit',
                                                        month: '2-digit',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    })}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/messages/${msg.id}`}
                                                        title="Voir le detail"
                                                        className="rounded-lg border border-neutral-700 p-2 text-neutral-300 transition-colors hover:border-[#c5a880] hover:text-[#c5a880]"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteMessage(msg)}
                                                        title="Supprimer"
                                                        className="rounded-lg border border-neutral-700 p-2 text-neutral-300 transition-colors hover:border-red-500 hover:text-red-400"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-3 py-16 text-center">
                            <Mail className="h-12 w-12 text-neutral-600" strokeWidth={1.5} />
                            <h4 className="text-sm font-semibold text-neutral-400">Aucun message</h4>
                            <p className="max-w-xs text-xs leading-relaxed text-neutral-500">
                                {hasActiveFilters
                                    ? 'Aucun message ne correspond aux filtres selectionnes.'
                                    : "Les contacts et demandes de devis s'afficheront ici."}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}

function StatCard({ label, value, icon }: { label: string; value: number; icon: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-xl border border-neutral-700/50 bg-neutral-800 p-6 shadow-sm">
            <div className="flex flex-col gap-1">
                <span className="text-xs font-medium tracking-wider text-neutral-400 uppercase">{label}</span>
                <span className="mt-1 text-3xl font-bold text-white">{value}</span>
            </div>
            <div className="rounded-lg bg-[#c5a880]/10 p-3 text-[#c5a880]">{icon}</div>
        </div>
    );
}
