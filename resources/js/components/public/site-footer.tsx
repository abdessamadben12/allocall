import { logoImage } from '@/image';
import { Link } from '@inertiajs/react';
import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';

const footerColumns = [
    {
        title: 'Company',
        links: [
            ['About Us', '#about-us'],
            ['Heritage', '#heritage'],
            ['Our Story', '#story'],
            ['Press', '#press'],
        ],
    },
    {
        title: 'Services',
        links: [
            ['Design Services', '#services'],
            ['Wow!House', '#wowhouse'],
            ['Consultation', '#consultation'],
            ['Bespoke Projects', '#bespoke'],
        ],
    },
    {
        title: 'Collections',
        links: [
            ['Furniture', '#furniture'],
            ['Lighting', '#lighting'],
            ['Decor & Objects', '#decor-objects'],
            ['Textiles', '#textiles'],
        ],
    },
    {
        title: 'Information',
        links: [
            ['News', '#news'],
            ['Events', '#events'],
            ['Careers', '#careers'],
            ['Contact', '/contact'],
        ],
    },
];

export function SiteFooter() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [subscribeSuccess, setSubscribeSuccess] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail) {
            return;
        }

        setSubscribeSuccess(true);
        setNewsletterEmail('');
        setTimeout(() => setSubscribeSuccess(false), 5000);
    };

    return (
        <footer className="relative z-10 border-t border-white/5 bg-[#0b0b0a] px-6 py-16 text-white/70 lg:px-12 lg:py-20 xl:px-16">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-8">
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/"
                            className="flex h-14 w-14 shrink-0 flex-col items-center justify-center transition-colors duration-300 hover:bg-[#c5a880]/10"
                        >
                            <img src={logoImage} alt="logo" />
                        </Link>
                    </div>

                    {footerColumns.map((col) => (
                        <div key={col.title}>
                            <h5 className="mb-6 text-[11px] font-bold tracking-[0.25em] text-white uppercase">{col.title}</h5>
                            <ul className="flex flex-col gap-3.5 text-[11px] tracking-wider text-white/50">
                                {col.links.map(([label, href]) => (
                                    <li key={label}>
                                        <a href={href} className="transition-colors duration-200 hover:text-[#c5a880]">
                                            {label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <div className="flex flex-col gap-4">
                        <h5 className="mb-2 text-[11px] font-bold tracking-[0.25em] text-white uppercase">Stay Inspired</h5>
                        <p className="text-[11px] leading-relaxed font-light tracking-wider text-white/50">
                            Subscribe to receive our latest news and exclusive invitations.
                        </p>
                        <form onSubmit={handleSubscribe} className="mt-1 flex w-full flex-col sm:flex-row">
                            <input
                                type="email"
                                required
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                placeholder="Your email address"
                                className="flex-grow border border-white/10 bg-[#141413] px-4 py-3.5 text-xs text-white placeholder-white/30 outline-none focus:border-[#c5a880]"
                            />
                            <button
                                type="submit"
                                className="bg-alidade-gold text-alidade-navy hover:bg-alidade-gold-light mt-2 shrink-0 px-5 py-3.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all sm:mt-0 sm:ml-px"
                            >
                                →
                            </button>
                        </form>
                        {subscribeSuccess && (
                            <span className="mt-1 animate-pulse text-[11px] font-semibold text-[#c5a880]">Merci pour votre inscription !</span>
                        )}
                    </div>
                </div>

                <div className="flex flex-col items-start justify-between gap-10 pt-12 xl:flex-row xl:items-center">
                    <div className="flex flex-col gap-8 text-[11px] font-light tracking-wider text-white/50 sm:flex-row xl:gap-12">
                        <div className="flex max-w-[280px] items-start gap-3">
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#c5a880]" />
                            <span>
                                314-316 Harbour Yard, Chelsea Harbour,
                                <br />
                                London SW10 0XD, United Kingdom
                            </span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <Phone className="h-4 w-4 shrink-0 text-[#c5a880]" />
                                <span>+44 (0) 207 384 0121</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 shrink-0 text-[#c5a880]" />
                                <a href="mailto:info@alidad.com" className="transition-colors hover:text-[#c5a880]">
                                    info@alidad.com
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-8 sm:gap-12">
                        <div className="flex items-center gap-3">
                            {[
                                { href: 'https://instagram.com', icon: <Instagram className="h-3.5 w-3.5" /> },
                                { href: 'https://linkedin.com', icon: <Linkedin className="h-3.5 w-3.5" /> },
                            ].map((social) => (
                                <a
                                    key={social.href}
                                    href={social.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-300 hover:scale-110 hover:border-[#c5a880] hover:text-[#c5a880]"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                        <div className="flex items-center gap-4 text-[8px] font-semibold tracking-wider text-white/30 uppercase sm:gap-6">
                            <div className="flex h-10 w-24 flex-col items-center justify-center border border-white/10 px-2.5 py-1 text-center transition-colors hover:border-[#c5a880]/30">
                                <span className="text-[11px] font-bold tracking-tight text-white/80">I I D A</span>
                                <span className="mt-0.5 text-[5px] opacity-50">INTERNATIONAL</span>
                            </div>
                            <div className="flex h-10 w-24 flex-col items-center justify-center border border-white/10 px-2 py-1 transition-colors hover:border-[#c5a880]/30">
                                <span className="text-[11px] font-bold tracking-tight text-white/80">A C I D</span>
                                <span className="text-[4px] opacity-50">ANTI COPYING IN DESIGN</span>
                            </div>
                            <div className="flex h-10 w-24 flex-col items-center justify-center border border-white/10 px-2.5 py-1 text-center transition-colors hover:border-[#c5a880]/30">
                                <span className="text-[10px] leading-none font-bold text-[#c5a880]">BIID</span>
                                <span className="mt-0.5 text-[4px] opacity-40">BRITISH INSTITUTE</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[11px] tracking-wider text-white/35 md:flex-row">
                    <div>&copy; {new Date().getFullYear()} Alidad Ltd. All Rights Reserved.</div>
                    <div className="flex gap-6">
                        <a href="#privacy" className="transition-colors hover:text-[#c5a880]">
                            Privacy Policy
                        </a>
                        <a href="#terms" className="transition-colors hover:text-[#c5a880]">
                            Terms & Conditions
                        </a>
                        <a href="#cookies" className="transition-colors hover:text-[#c5a880]">
                            Cookies Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
