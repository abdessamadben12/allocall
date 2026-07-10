import Footer from '@/components/pages/Footer';
import Navbar from '@/components/pages/navbar';
import { PublicLayoutFooter } from '@/components/public/public-layout-footer';
import { PublicLayoutNavbar, type NavigationItem } from '@/components/public/public-layout-navbar';
import type { ReactNode } from 'react';

interface PublicLayoutProps {
    children: ReactNode;
    navigation: NavigationItem[];
    activeHref?: string;
    showAuthButton?: boolean;
}

export default function PublicLayout({ children, navigation, activeHref, showAuthButton = true }: PublicLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col overflow-x-hidden bg-[#0d0c08] font-sans text-white">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer/>
        </div>
    );
}
