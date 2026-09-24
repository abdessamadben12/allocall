import english from '@/locales/en.json';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';

export type Locale = 'fr' | 'en';

const messages: Record<string, string> = english;

/* =========================================================
   TRANSLATION
========================================================= */

export function translate(
    source: string,
    locale: Locale,
    values: (string | number)[] = [],
): string {
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
    const key = normalizedSource
        .replace(/\s+/g, ' ')
        .trim();

    /**
     * Français :
     * conserver le texte avec ses retours à la ligne.
     *
     * Anglais :
     * chercher la clé normalisée dans en.json.
     *
     * La valeur anglaise peut elle-même contenir \n.
     */
    let result =
        locale === 'en'
            ? (messages[key] ?? normalizedSource)
            : normalizedSource;

    /**
     * Remplacement des variables {0}, {1}, etc.
     */
    values.forEach((value, index) => {
        result = result.replaceAll(
            `{${index}}`,
            String(value),
        );
    });

    return result;
}

/* =========================================================
   LANGUAGE PATH
========================================================= */

export function languagePath(
    href: string,
    locale: Locale,
    origin?: string,
): string {
    /*
     * Ne pas modifier :
     * - ancres
     * - mailto
     * - tel
     * - WhatsApp
     */
    if (
        !href ||
        href.startsWith('#') ||
        /^(mailto:|tel:|https?:\/\/wa\.)/.test(href)
    ) {
        return href;
    }

    let path = href;

    /*
     * URL absolue
     */
    if (/^https?:\/\//.test(href)) {
        if (!origin) {
            return href;
        }

        const target = new URL(href);
        const currentOrigin = new URL(origin);

        /*
         * URL externe :
         * ne pas ajouter /en
         */
        if (target.origin !== currentOrigin.origin) {
            return href;
        }

        path =
            target.pathname +
            target.search +
            target.hash;
    }

    /*
     * Seulement les chemins internes
     */
    if (!path.startsWith('/') || path.startsWith('//')) {
        return href;
    }

    /*
     * Supprimer /en existant
     *
     * Exemple :
     * /en/contact
     * =>
     * /contact
     */
    const unprefixed =
        path.replace(/^\/en(?=\/|\?|#|$)/, '') || '/';

    const normalized = unprefixed.startsWith('/')
        ? unprefixed
        : `/${unprefixed}`;

    const [pathname] = normalized.split(/[?#]/);

    /*
     * Routes traduisibles
     */
    const isTranslatableRoute =
        /^\/(?:services(?:\/[^/]+)?|industries(?:\/[^/]+)?|solutions-ia|apropos|contact|devis|savoir-faire(?:\/[^/]+)?)?$/.test(
            pathname,
        );

    /*
     * Si la route n'est pas dans la liste,
     * garder l'URL originale.
     */
    if (!isTranslatableRoute) {
        return href;
    }

    /*
     * Anglais :
     * /contact
     * =>
     * /en/contact
     */
    if (locale === 'en') {
        return (
            '/en' +
            normalized.replace(/^\/(?=[?#]|$)/, '')
        );
    }

    /*
     * Français :
     * pas de préfixe
     */
    return normalized;
}

/* =========================================================
   HOOK
========================================================= */

export function useLocale() {
    const { props, url } = usePage<SharedData>();

    /*
     * Locale actuelle
     */
    const locale: Locale =
        props.locale === 'en' ? 'en' : 'fr';

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
        (
            source: string,
            values?: (string | number)[],
        ) => {
            return translate(
                source,
                locale,
                values ?? [],
            );
        },
        [locale],
    );

    /*
     * Générer une URL selon la langue.
     */
    const href = useCallback(
        (path: string) => {
            return languagePath(
                path,
                locale,
                props.appUrl,
            );
        },
        [locale, props.appUrl],
    );

    /*
     * URL pour changer de langue.
     */
    const switchHref = useCallback(
        (target: Locale) => {
            return languagePath(
                url,
                target,
                props.appUrl,
            );
        },
        [url, props.appUrl],
    );

    return {
        locale,
        url,
        t,
        href,
        switchHref,
    };
}