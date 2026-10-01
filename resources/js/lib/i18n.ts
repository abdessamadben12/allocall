import canada from '@/locales/canada.json';
import english from '@/locales/en.json';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';
import ecommerce from '../../content/ecommerce.json';
import { logicalPath, publicLanguagePath } from './public-paths';

export type Locale = 'fr' | 'en';

const messages: Record<string, string> = english;
const canadianMessages: Record<string, { fr: string; en: string }> = { ...canada };

// Keep the e-commerce page and its translation editable in a single content file.
function addBilingualContent(source: unknown, englishValue: unknown): void {
    if (typeof source === 'string' && typeof englishValue === 'string') {
        canadianMessages[source.replace(/\s+/g, ' ').trim()] = { fr: source, en: englishValue };
    } else if (source && typeof source === 'object' && englishValue && typeof englishValue === 'object') {
        for (const [key, value] of Object.entries(source)) {
            addBilingualContent(value, (englishValue as Record<string, unknown>)[key]);
        }
    }
}
addBilingualContent(ecommerce.fr, ecommerce.en);

/* =========================================================
   TRANSLATION
========================================================= */

export function translate(source: string, locale: Locale, values: (string | number)[] = []): string {
    /**
     * Version d'affichage du texte source.
     * On conserve les retours à la ligne.
     */
    const normalizedSource = source
        .split('\n')
        .map((line) => line.replace(/[ \t]+/g, ' ').trim())
        .join('\n')
        .trim();

    /**
     * Clé utilisée pour chercher dans en.json.
     *
     * Les espaces, tabulations et retours à la ligne
     * deviennent un seul espace.
     *
     * Exemple :
     *
     * RÉPONDEZ À CHAQUE APPEL.
     * NE PERDEZ PLUS UN SEUL CLIENT.
     *
     * devient :
     *
     * RÉPONDEZ À CHAQUE APPEL. NE PERDEZ PLUS UN SEUL CLIENT.
     */
    const key = normalizedSource.replace(/\s+/g, ' ').trim();

    /**
     * Français :
     * conserver le texte avec ses retours à la ligne.
     *
     * Anglais :
     * chercher la clé normalisée dans en.json.
     *
     * La valeur anglaise peut elle-même contenir \n.
     */
    let result = canadianMessages[key]?.[locale] ?? (locale === 'en' ? (messages[key] ?? normalizedSource) : normalizedSource);

    /**
     * Remplacement des variables {0}, {1}, etc.
     */
    values.forEach((value, index) => {
        result = result.replaceAll(`{${index}}`, String(value));
    });

    return result;
}

/* =========================================================
   LANGUAGE PATH
========================================================= */

export function languagePath(href: string, locale: Locale, origin?: string): string {
    return publicLanguagePath(href, locale, origin);
}

export function useLocale() {
    const { props, url } = usePage<SharedData>();

    /*
     * Locale actuelle
     */
    const locale: Locale = props.locale === 'en' ? 'en' : 'fr';

    /*
     * Fonction de traduction
     *
     * Exemple :
     * t('Contact')
     *
     * ou
     *
     * t('Afficher le slide {0}', [1])
     */
    const t = useCallback(
        (source: string, values?: (string | number)[]) => {
            return translate(source, locale, values ?? []);
        },
        [locale],
    );

    /*
     * Générer une URL selon la langue.
     */
    const href = useCallback(
        (path: string) => {
            return publicLanguagePath(path, locale, props.appUrl, props.publicPaths);
        },
        [locale, props.appUrl, props.publicPaths],
    );

    /*
     * URL pour changer de langue.
     */
    const switchHref = useCallback(
        (target: Locale) => {
            return publicLanguagePath(url, target, props.appUrl, props.publicPaths);
        },
        [url, props.appUrl, props.publicPaths],
    );

    return {
        locale,
        url,
        path: logicalPath(url.split(/[?#]/)[0], props.publicPaths),
        t,
        href,
        switchHref,
    };
}
