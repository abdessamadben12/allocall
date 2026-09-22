/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Footer from '@/components/pages/Footer';
import GlobalPresenceSection from '@/components/pages/global-presence';
import HeroSlider from '@/components/pages/Hero';
import IndustriesSection from '@/components/pages/industries';
import Navbar from '@/components/pages/navbar';
import MetiersSection from '@/components/pages/metiers';
import { router } from '@inertiajs/react';
import { useEffect } from 'react';
import { EngagementSection } from './featchuresection';

/** Old tab-based URLs (/?tab=...) now redirect to their dedicated routes. */
const legacyTabRoutes: Record<string, string> = {
    apropos: '/apropos',
    services: '/savoir-faire',
    gallery: '/galerie',
    configurator: '/configurateur',
    devis: '/devis',
    contact: '/contact',
};

export default function App() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tabParam = params.get('tab');
        if (tabParam && legacyTabRoutes[tabParam]) {
            router.visit(legacyTabRoutes[tabParam], { replace: true });
        }
    }, []);

    return (
        <div className="text-alidade-navy flex min-h-screen flex-col bg-[#fafafa]">
            <Navbar />

            <main className="animate-in fade-in flex-grow duration-500">
                {/* 1. Hero */}
                <HeroSlider onDiscoverClick={() => router.visit('/savoir-faire')} />

                {/* 2. Engagements */}
                <EngagementSection />

                {/* 3. Nos métiers */}
                <MetiersSection />

                <IndustriesSection />

                <GlobalPresenceSection />

              
            </main>

            <Footer />
        </div>
    );
}
