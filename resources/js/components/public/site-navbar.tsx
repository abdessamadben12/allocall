import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Menu, User, X } from 'lucide-react';
import { useState } from 'react';

const navigationItems = [
    ['ABOUT', 'about'],
    ['ONLINE COURSE', 'online-course'],
    ['DESIGN SERVICES', '/design-services'],
    ['WOWHOUSE', '/wowhouse'],
    ['GALLERY', 'gallery'],
    ['PRODUCTS', 'products'],
    ['NEWS', 'news'],
    ['CONTACT', '/contact'],
] as const;

function HeaderLink({ label, href }: { label: string; href: string }) {
    if (href.startsWith('/')) {
        return (
            <Link href={href} className="nav-link py-1 transition-colors duration-300 hover:text-[#c5a880]">
                {label}
            </Link>
        );
    }

    return (
        <a href={href} className="nav-link py-1 transition-colors duration-300 hover:text-[#c5a880]">
            {label}
        </a>
    );
}

export function SiteNavbar() {
    const { auth } = usePage<SharedData>().props;
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <header className="relative z-30 flex items-center justify-between border-b border-white/15 px-6 py-5 backdrop-blur-sm lg:px-12 xl:px-16">
                <Link href="/" className="group relative flex h-20 w-20 flex-col items-center justify-center">
                    <img
                        src="https://images.squarespace-cdn.com/content/v1/59a04bd7ccc5c57774dca178/b2556410-4668-41e5-9c31-1b8ee9e16109/alidad+logo+edit.jpg?format=750w"
                        alt="Logo Alidad"
                        className="h-full w-full object-contain transition-opacity duration-300 group-hover:opacity-75"
                    />
                </Link>

                <nav className="hidden items-center gap-7 text-[12px] font-medium tracking-[0.2em] text-white/85 xl:flex">
                    {navigationItems.map(([label, href]) => (
                        <HeaderLink key={label} label={label} href={href} />
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    {auth.user && (
                        <Link
                            href={route('dashboard')}
                            className="hidden items-center gap-2 border border-white/20 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-white/85 transition-all duration-300 hover:border-[#c5a880] hover:text-[#c5a880] md:flex"
                        >
                            <User className="h-3.5 w-3.5" />
                            DASHBOARD
                        </Link>
                    )}
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="p-1 text-white transition-colors hover:text-[#c5a880] xl:hidden"
                        type="button"
                    >
                        <Menu className="h-6 w-6 stroke-[1.5]" />
                    </button>
                </div>
            </header>

            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
                    <div className="relative z-10 flex h-full w-full max-w-sm flex-col justify-between border-l border-white/10 bg-[#0e0e0d] p-8">
                        <div>
                            <div className="mb-8 flex items-center justify-between border-b border-white/10 pb-8">
                                <div className="flex h-12 w-12 items-center justify-center border border-[#c5a880] p-2">
                                    <span className="text-xl font-light text-[#c5a880]">A</span>
                                </div>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="rounded-full p-1 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
                                    type="button"
                                >
                                    <X className="h-6 w-6 stroke-[1.5]" />
                                </button>
                            </div>
                            <nav className="flex flex-col gap-6 text-[13px] font-medium tracking-[0.25em] text-white/90">
                                {navigationItems.map(([label, href]) =>
                                    href.startsWith('/') ? (
                                        <Link
                                            key={label}
                                            href={href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="border-b border-white/5 py-1 transition-colors hover:text-[#c5a880]"
                                        >
                                            {label}
                                        </Link>
                                    ) : (
                                        <a
                                            key={label}
                                            href={href}
                                            onClick={() => setMobileMenuOpen(false)}
                                            className="border-b border-white/5 py-1 transition-colors hover:text-[#c5a880]"
                                        >
                                            {label}
                                        </a>
                                    ),
                                )}
                            </nav>
                        </div>
                        {/* <div className="flex flex-col gap-4 pt-8 border-t border-white/10">
                            {auth.user ? (
                                <Link href={route('dashboard')} onClick={() => setMobileMenuOpen(false)} className="w-full bg-[#c5a880] text-black text-center text-[11px] tracking-[0.2em] font-bold py-3 uppercase hover:bg-white transition-all">
                                    DASHBOARD
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('login')} onClick={() => setMobileMenuOpen(false)} className="w-full border border-white/20 text-white text-center text-[11px] tracking-[0.2em] font-semibold py-3 uppercase hover:border-[#c5a880] hover:text-[#c5a880] transition-all">
                                        CLIENT LOGIN
                                    </Link>
                                    <Link href={route('register')} onClick={() => setMobileMenuOpen(false)} className="w-full bg-[#c5a880] text-black text-center text-[11px] tracking-[0.2em] font-bold py-3 uppercase hover:bg-white transition-all">
                                        REGISTER
                                    </Link>
                                </>
                            )}
                        </div> */}
                    </div>
                </div>
            )}
        </>
    );
}
