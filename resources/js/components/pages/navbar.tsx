import WhatsAppButton from '@/components/pages/whatsapp-button';
import { site } from '@/data/site';
import { Link } from '@inertiajs/react';
import { Calculator, FileText, Mail, Menu, Phone, X } from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/apropos', label: 'À Propos' },
    { href: '/services', label: 'services' },
    { href: '/contact', label: 'Contact' },
];

function isActive(href: string, currentPath: string) {
    if (href === '/') return currentPath === '/';
    if (href === '/services' || href === '/savoir-faire') {
        return (
            currentPath === '/savoir-faire' ||
            currentPath === '/services' ||
            currentPath.startsWith('/savoir-faire/') ||
            currentPath.startsWith('/services/')
        );
    }
    return currentPath === href || currentPath.startsWith(`${href}/`);
}

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <header className="max-w-8xl relative z-50">
            {/* Top Contact Bar */}
            <div className="bg-alidade-dark border-alidade-gold/20 border-b px-4 py-2 text-sm text-white sm:text-lg">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:justify-start">
                        <a href={site.phoneHref} className="hover:text-alidade-gold flex items-center gap-1.5 font-medium transition-colors">
                            <Phone size={13} className="text-alidade-gold" />
                            <span>{site.phone}</span>
                        </a>
                        <span className="text-alidade-gold/30 hidden sm:inline">|</span>
                        <a href={`mailto:${site.email}`} className="hover:text-alidade-gold flex items-center gap-1.5 transition-colors">
                            <Mail size={13} className="text-alidade-gold" />
                            <span>{site.email}</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Main Navigation Bar */}
            <div className="border-b border-gray-100 bg-white">
                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:h-24 sm:px-6 lg:px-8">
                    {/* Logo */}
                    <Link href="/" className="flex items-center" aria-label="Alidade — Accueil">
                        <img
                            src="/images/logo-alidade-traveaux-de-renovation-alimunium.png"
                            alt="Logo Alidade"
                            className="h-16 sm:h-14"
                        />
                    </Link>

                    {/* Desktop Nav Items */}
                    <nav className="hidden items-center gap-8 lg:flex">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`text-md relative py-2 font-medium tracking-wide uppercase transition-all duration-300 lg:text-lg ${
                                    isActive(item.href, currentPath)
                                        ? 'text-alidade-gold font-semibold'
                                        : 'text-alidade-navy hover:text-alidade-gold'
                                }`}
                                id={`nav-link-${item.href.replace('/', '') || 'accueil'}`}
                            >
                                {item.label}
                                {isActive(item.href, currentPath) && (
                                    <span className="bg-alidade-gold absolute right-0 bottom-0 left-0 h-0.5 rounded-full" />
                                )}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden items-center gap-3 sm:flex">
                        <Link
                            href="/devis"
                            className={`flex items-center gap-2 rounded px-5 py-2.5 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                                isActive('/devis', currentPath)
                                    ? 'bg-alidade-navy text-white shadow-md'
                                    : 'bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy hover:shadow-lg'
                            }`}
                            id="devis-btn-nav"
                        >
                            <FileText size={15} />
                            Demander un Devis
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-alidade-navy hover:text-alidade-gold rounded-md p-2 transition-colors"
                            aria-label="Toggle Menu"
                            id="mobile-menu-toggle"
                        >
                            {isOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="animate-in fade-in slide-in-from-top-4 absolute top-full right-0 left-0 z-50 border-t border-gray-100 bg-white shadow-xl duration-300 lg:hidden">
                    <div className="space-y-2 px-4 pt-4 pb-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`block w-full rounded-md px-4 py-3 text-left text-sm font-medium tracking-wider uppercase transition-colors ${
                                    isActive(item.href, currentPath)
                                        ? 'bg-alidade-navy text-white'
                                        : 'text-alidade-navy hover:text-alidade-gold hover:bg-gray-50'
                                }`}
                                id={`mobile-nav-link-${item.href.replace('/', '') || 'accueil'}`}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <div className="mt-4 flex flex-col gap-2 border-t border-gray-100 pt-4">
                            <Link
                                href="/devis"
                                onClick={() => setIsOpen(false)}
                                className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy flex w-full items-center justify-center gap-2 rounded py-3 text-sm font-semibold tracking-wider uppercase transition-colors"
                                id="mobile-nav-devis"
                            >
                                <FileText size={16} />
                                Devis Gratuit
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating vertical "DEVIS GRATUIT" tab */}
            <div className="fixed top-1/3 right-0 z-40 hidden md:block">
                <Link
                    href="/devis"
                    className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy flex origin-right cursor-pointer items-center justify-center gap-2 rounded-l-lg px-3 py-6 text-xs font-bold tracking-widest uppercase shadow-2xl transition-all duration-300 hover:-translate-x-1"
                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                    id="floating-devis-tab"
                >
                    <span className="flex items-center gap-1.5">
                        <Calculator size={14} className="rotate-90 text-white" />
                        DEVIS GRATUIT
                    </span>
                </Link>
            </div>

            {/* Bouton WhatsApp flottant */}
            <WhatsAppButton />
        </header>
    );
}
