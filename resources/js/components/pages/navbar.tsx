import LanguageSwitcher from '@/components/language-switcher';
import { Link } from '@/components/localized-link';
import WhatsAppButton from '@/components/pages/whatsapp-button';
import { useLocale } from '@/lib/i18n';

import { FileText, Mail, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    {
        href: '/',
        label: 'Accueil',
    },
    {
        href: '/services',
        label: 'Services',
    },
    {
        href: '/industries',
        label: 'Industries',
    },
    {
        href: '/solutions-ia',
        label: 'Solutions IA',
    },
    {
        href: '/apropos',
        label: 'Pourquoi AlloCall',
    },

    {
        href: '/contact',
        label: 'Contact',
    },
];

const topContacts = [
    {
        label: 'Maroc',
        value: '+212 5 22 48 44 25',
        href: 'tel:+212522484425',
        icon: Phone,
    },
    {
        label: 'Canada',
        value: '+1 (514) 850-9092',
        href: 'tel:+15148509092',
        icon: Phone,
    },
    {
        label: null,
        value: 'contact@allocall.ma',
        href: 'mailto:contact@allocall.ma',
        icon: Mail,
    },
];

function isActive(href: string, currentPath: string) {
    if (href === '/') {
        return currentPath === '/';
    }

    if (href === '/services') {
        return currentPath === '/services' || currentPath.startsWith('/services/');
    }

    return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function Navbar() {
    const { t, url } = useLocale();

    const [isOpen, setIsOpen] = useState(false);

    const currentPath = url.split(/[?#]/)[0].replace(/^\/en(?=\/|$)/, '') || '/';

    return (
        <header className="relative z-50 w-full">
            {/* ============================= */}
            {/* TOP CONTACT BAR */}
            {/* ============================= */}

            <div className="border-b border-white/10 bg-[#111827] px-4 py-2 text-xs text-white sm:text-sm">
                <div className="mx-auto flex max-w-7xl items-center justify-center">
                    <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
                        {/* PHONE */}
                        <a
                            href={topContacts[0].href}
                            className="flex items-center gap-2 font-medium transition-colors duration-300 hover:text-[#74B946]"
                        >
                            <Phone size={14} className="text-[#74B946]" />

                            <span>
                                <strong>{t('Maroc :')}</strong> {topContacts[0].value}
                            </span>
                        </a>

                        <span className="hidden text-white/20 sm:inline">{t('|')}</span>

                        <a
                            href={topContacts[1].href}
                            className="flex items-center gap-2 font-medium transition-colors duration-300 hover:text-[#74B946]"
                        >
                            <Phone size={14} className="text-[#74B946]" />

                            <span>
                                <strong>{t('Canada :')}</strong> {topContacts[1].value}
                            </span>
                        </a>

                        <span className="hidden text-white/20 sm:inline">{t('|')}</span>

                        {/* EMAIL */}
                        <a href={topContacts[2].href} className="flex items-center gap-2 transition-colors duration-300 hover:text-[#74B946]">
                            <Mail size={14} className="text-[#74B946]" />

                            <span>{topContacts[2].value}</span>
                        </a>
                    </div>

                    {/* LOCATIONS */}
                    <div className="hidden">{t('MONTRÉAL · CASABLANCA · PARIS')}</div>
                </div>
            </div>

            {/* ============================= */}
            {/* MAIN NAVBAR */}
            {/* ============================= */}

            <div className="border-b border-gray-100 bg-white shadow-sm">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    {/* LOGO */}
                    <Link href="/" className="flex shrink-0 items-center" aria-label={t('AlloCall — Accueil')}>
                        <img src="/images/logo-allocall.png" alt={t('AlloCall')} className="h-12 w-auto object-contain sm:h-14" />
                    </Link>

                    {/* ============================= */}
                    {/* DESKTOP NAV */}
                    {/* ============================= */}

                    <nav className="hidden items-center gap-5 xl:flex">
                        {navItems.map((item) => {
                            const active = isActive(item.href, currentPath);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`text-md relative py-2 font-semibold whitespace-nowrap transition-all duration-300 ${
                                        active ? 'text-[#74B946]' : 'text-[#1F2937] hover:text-[#74B946]'
                                    }`}
                                >
                                    {t(item.label)}

                                    {/* ACTIVE LINE */}
                                    {active && <span className="absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[#74B946]" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* ============================= */}
                    {/* CTA BUTTON */}
                    {/* ============================= */}

                    <div className="hidden items-center xl:flex">
                        <Link
                            href="/contact"
                            className="flex items-center gap-2 rounded-md bg-[#74B946] px-5 py-3 text-xs font-bold tracking-wide text-white uppercase shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#659F3B] hover:shadow-lg"
                        >
                            <FileText size={16} />

                            {t('Demander une soumission')}
                        </Link>
                    </div>

                    {/* ============================= */}
                    {/* MOBILE MENU BUTTON */}
                    {/* ============================= */}

                    <LanguageSwitcher />
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className="rounded-md p-2 text-[#1F2937] transition-all duration-300 hover:bg-[#F1F8EC] hover:text-[#74B946] xl:hidden"
                        aria-label={isOpen ? t('Fermer le menu') : t('Ouvrir le menu')}
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* ============================= */}
            {/* MOBILE MENU */}
            {/* ============================= */}

            {isOpen && (
                <div className="absolute top-full right-0 left-0 z-50 border-t border-gray-100 bg-white shadow-xl xl:hidden">
                    <div className="space-y-1 px-4 py-5">
                        {navItems.map((item) => {
                            const active = isActive(item.href, currentPath);

                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsOpen(false)}
                                    className={`block rounded-md px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                                        active ? 'bg-[#74B946] text-white' : 'text-[#1F2937] hover:bg-[#F1F8EC] hover:text-[#74B946]'
                                    }`}
                                >
                                    {t(item.label)}
                                </Link>
                            );
                        })}

                        {/* MOBILE CTA */}
                        <div className="mt-4 border-t border-gray-100 pt-4">
                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="flex w-full items-center justify-center gap-2 rounded-md bg-[#74B946] px-5 py-3.5 text-sm font-bold text-white uppercase transition-all duration-300 hover:bg-[#659F3B]"
                            >
                                <FileText size={17} />

                                {t('Soumission gratuite')}
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* WHATSAPP */}
            <WhatsAppButton />
        </header>
    );
}
