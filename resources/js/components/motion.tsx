import { motion, useReducedMotion, type Variants } from 'framer-motion';
import type { ReactNode } from 'react';

// Primitives d'animation partagées pour les sections publiques.
// Toutes respectent `prefers-reduced-motion` et ne jouent qu'une fois à l'entrée dans le viewport.

export const EASE = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

export const staggerContainer = (stagger = 0.12, delayChildren = 0): Variants => ({
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren } },
});

interface RevealProps {
    children: ReactNode;
    className?: string;
    /** Délai avant le démarrage (secondes). */
    delay?: number;
    /** Décalage vertical initial en px (0 = simple fondu). */
    y?: number;
    /** Portion visible avant déclenchement (0–1). */
    amount?: number;
    as?: 'div' | 'section' | 'span';
}

/** Fondu + translation vers le haut quand l'élément entre à l'écran. */
export function Reveal({ children, className, delay = 0, y = 28, amount = 0.2, as = 'div' }: RevealProps) {
    const reduce = useReducedMotion();
    const Tag = motion[as];

    return (
        <Tag
            className={className}
            initial={{ opacity: 0, y: reduce ? 0 : y }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.7, delay, ease: EASE }}
        >
            {children}
        </Tag>
    );
}

interface StaggerProps {
    children: ReactNode;
    className?: string;
    /** Intervalle entre chaque enfant (secondes). */
    stagger?: number;
    delay?: number;
    amount?: number;
}

/** Conteneur qui anime ses <StaggerItem> en cascade à l'entrée dans le viewport. */
export function Stagger({ children, className, stagger = 0.12, delay = 0, amount = 0.15 }: StaggerProps) {
    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
            variants={staggerContainer(stagger, delay)}
        >
            {children}
        </motion.div>
    );
}

/** Élément enfant d'un <Stagger>. */
export function StaggerItem({ children, className, y = 28 }: { children: ReactNode; className?: string; y?: number }) {
    const reduce = useReducedMotion();
    const variants: Variants = {
        hidden: { opacity: 0, y: reduce ? 0 : y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
    };
    return (
        <motion.div className={className} variants={variants}>
            {children}
        </motion.div>
    );
}
