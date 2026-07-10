import { Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react';

export function PublicLayoutFooter() {
    return (
        <footer className="bg-[#080807] border-t border-white/5 py-10 px-6 lg:px-12 xl:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col sm:flex-row flex-wrap gap-5 text-[11px] text-white/38 font-light tracking-wider">
                    <div className="flex items-center gap-2.5">
                        <MapPin className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <span>314-316 Harbour Yard, Chelsea Harbour, London SW10 0XD</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Phone className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <span>+44 (0) 207 384 0121</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                        <Mail className="w-4 h-4 text-[#c5a880] shrink-0" />
                        <a href="mailto:info@alidad.com" className="hover:text-[#c5a880] transition-colors">
                            info@alidad.com
                        </a>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-[#c5a880] hover:text-[#c5a880] flex items-center justify-center text-white/38 transition-all duration-300 hover:scale-110">
                        <Instagram className="w-3.5 h-3.5" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full border border-white/10 hover:border-[#c5a880] hover:text-[#c5a880] flex items-center justify-center text-white/38 transition-all duration-300 hover:scale-110">
                        <Linkedin className="w-3.5 h-3.5" />
                    </a>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] text-white/28 tracking-wider">
                <span>&copy; {new Date().getFullYear()} Alidad Ltd. All Rights Reserved.</span>
                <div className="flex gap-5">
                    <a href="#" className="hover:text-[#c5a880] transition-colors">
                        Privacy Policy
                    </a>
                    <a href="#" className="hover:text-[#c5a880] transition-colors">
                        Terms &amp; Conditions
                    </a>
                </div>
            </div>
        </footer>
    );
}
