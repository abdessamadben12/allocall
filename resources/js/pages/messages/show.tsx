import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Calendar, CheckCircle2, Download, FileText, Mail, Paperclip, Phone, Trash2, User, XCircle } from 'lucide-react';

interface MessageDetail {
    id: number;
    request_type: 'contact' | 'quote';
    first_name: string;
    last_name: string;
    email: string;
    phone?: string | null;
    project_type?: string | null;
    attachment_path?: string | null;
    attachment_original_name?: string | null;
    attachment_url?: string | null;
    attachment_size_label?: string | null;
    attachment_exists: boolean;
    message: string;
    created_at: string;
}

export default function MessageShow({ message }: { message: MessageDetail }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: `Message #${message.id}`, href: `/messages/${message.id}` },
    ];

    const deleteMessage = () => {
        if (confirm(`Supprimer le message de ${message.first_name} ${message.last_name} ?`)) {
            router.delete(`/messages/${message.id}`);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Message de ${message.first_name} ${message.last_name}`} />
            <div className="flex h-full flex-1 flex-col gap-6 rounded-xl bg-neutral-900 p-6 text-white">
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-700 px-3 py-2 text-xs text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
                        >
                            <ArrowLeft className="h-3.5 w-3.5" />
                            Retour
                        </Link>
                        <h1 className="text-lg font-bold tracking-wide">
                            {message.first_name} {message.last_name}
                        </h1>
                        <span
                            className={`rounded-full px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase ${
                                message.request_type === 'quote' ? 'bg-[#c5a880]/15 text-[#c5a880]' : 'bg-blue-500/10 text-blue-300'
                            }`}
                        >
                            {message.request_type === 'quote' ? 'Devis' : 'Contact'}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={deleteMessage}
                        className="inline-flex items-center gap-1.5 self-start rounded-lg border border-red-500/40 px-3 py-2 text-xs text-red-400 transition-colors hover:border-red-500 hover:bg-red-500/10 sm:self-auto"
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Supprimer
                    </button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="flex flex-col gap-4 rounded-xl border border-neutral-700/50 bg-neutral-800 p-6 shadow-sm lg:col-span-2">
                        <h2 className="border-b border-neutral-700 pb-3 text-sm font-bold tracking-wide text-white">Message</h2>
                        <p className="text-sm leading-relaxed break-words whitespace-pre-wrap text-neutral-300">{message.message}</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-4 rounded-xl border border-neutral-700/50 bg-neutral-800 p-6 shadow-sm">
                            <h2 className="border-b border-neutral-700 pb-3 text-sm font-bold tracking-wide text-white">Informations</h2>
                            <InfoRow icon={<User className="h-4 w-4" />} label="Nom complet" value={`${message.first_name} ${message.last_name}`} />
                            <InfoRow
                                icon={<Mail className="h-4 w-4" />}
                                label="Email"
                                value={
                                    <a href={`mailto:${message.email}`} className="text-[#c5a880] hover:underline">
                                        {message.email}
                                    </a>
                                }
                            />
                            <InfoRow icon={<Phone className="h-4 w-4" />} label="Telephone" value={message.phone || '-'} />
                            <InfoRow icon={<FileText className="h-4 w-4" />} label="Type de projet" value={message.project_type || '-'} />
                            <InfoRow
                                icon={<Calendar className="h-4 w-4" />}
                                label="Date d'envoi"
                                value={new Date(message.created_at).toLocaleDateString('fr-FR', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit',
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-4 rounded-xl border border-neutral-700/50 bg-neutral-800 p-6 shadow-sm">
                            <h2 className="flex items-center gap-2 border-b border-neutral-700 pb-3 text-sm font-bold tracking-wide text-white">
                                <Paperclip className="h-4 w-4 text-[#c5a880]" />
                                Document joint
                            </h2>
                            {message.attachment_path ? (
                                message.attachment_exists ? (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2 text-xs text-emerald-400">
                                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                                            Le document existe
                                        </div>
                                        <div className="rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-xs">
                                            <div className="truncate font-semibold text-white">
                                                {message.attachment_original_name || 'Piece jointe'}
                                            </div>
                                            {message.attachment_size_label && (
                                                <div className="mt-1 text-neutral-500">{message.attachment_size_label}</div>
                                            )}
                                        </div>
                                        {message.attachment_url && (
                                            <a
                                                href={message.attachment_url}
                                                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#c5a880] px-4 py-2.5 text-xs font-bold tracking-wider text-neutral-900 uppercase transition-opacity hover:opacity-90"
                                            >
                                                <Download className="h-4 w-4" />
                                                Telecharger
                                            </a>
                                        )}
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-xs text-red-400">
                                        <XCircle className="h-4 w-4 shrink-0" />
                                        Le fichier « {message.attachment_original_name || message.attachment_path} » est introuvable sur le serveur.
                                    </div>
                                )
                            ) : (
                                <p className="text-xs text-neutral-500">Aucun document joint a ce message.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-lg bg-[#c5a880]/10 p-2 text-[#c5a880]">{icon}</div>
            <div className="min-w-0 flex-1">
                <div className="text-[10px] font-semibold tracking-wider text-neutral-400 uppercase">{label}</div>
                <div className="mt-0.5 text-xs break-words text-neutral-200">{value}</div>
            </div>
        </div>
    );
}
