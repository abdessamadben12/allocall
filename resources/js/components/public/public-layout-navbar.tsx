import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/pages/navbar';

export interface NavigationItem {
    label: string;
    href: string;
}

interface PublicLayoutNavbarProps {
    navigation: NavigationItem[];
    activeHref?: string;
    showAuthButton?: boolean;
}



export function PublicLayoutNavbar({ navigation, activeHref, showAuthButton = true }: PublicLayoutNavbarProps) {

    return (
        <>
           <Navbar/>
           
        </>
    );
}
