import english from '@/locales/en.json';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { useCallback } from 'react';

export type Locale = 'fr' | 'en';
const messages: Record<string, string> = english;

export function translate(source: string, locale: Locale, values: (string | number)[] = []): string {
    const key = source.replace(/\s+/g, ' ').trim();
    let result = locale === 'en' ? (messages[key] ?? key) : key;
    values.forEach((value, index) => {
        result = result.replaceAll(`{${index}}`, String(value));
    });
    return `${/^\s/.test(source) ? ' ' : ''}${result}${/\s$/.test(source) ? ' ' : ''}`;
}

export function languagePath(href: string, locale: Locale, origin?: string): string {
    if (!href || href.startsWith('#') || /^(mailto:|tel:|https?:\/\/wa\.)/.test(href)) return href;
    let path = href;
    if (/^https?:\/\//.test(href)) {
        if (!origin) return href;
        const target = new URL(href);
        if (target.origin !== new URL(origin).origin) return href;
        path = target.pathname + target.search + target.hash;
    }
    if (!path.startsWith('/') || path.startsWith('//')) return href;
    const unprefixed = path.replace(/^\/en(?=\/|\?|#|$)/, '') || '/';
    const normalized = unprefixed.startsWith('/') ? unprefixed : '/' + unprefixed;
    const [pathname] = normalized.split(/[?#]/);
    if (!/^\/(?:services(?:\/[^/]+)?|industries(?:\/[^/]+)?|solutions-ia|apropos|contact|devis|savoir-faire(?:\/[^/]+)?)?$/.test(pathname)) return href;
    return locale === 'en' ? '/en' + normalized.replace(/^\/(?=[?#]|$)/, '') : normalized;
}

export function useLocale() {
    const { props, url } = usePage<SharedData>();
    const locale: Locale = props.locale === 'en' ? 'en' : 'fr';
    const t = useCallback((source: string, values?: (string | number)[]) => translate(source, locale, values), [locale]);
    const href = useCallback((path: string) => languagePath(path, locale, props.appUrl), [locale, props.appUrl]);
    return {
        locale,
        url,
        t,
        href,
        switchHref: (target: Locale) => languagePath(url, target, props.appUrl),
    };
}
