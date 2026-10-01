import catalog from '../../content/paths.json';

type Locale = 'fr' | 'en';
const paths: Record<string, Record<Locale, string>> = catalog;

export function logicalPath(pathname: string, availablePaths = paths): string {
    const normalized = pathname.replace(/\/$/, '') || '/';
    const match = Object.entries(availablePaths).find(([, languages]) => Object.values(languages).includes(normalized));
    if (match) return match[0];
    const legacy = normalized.replace(/^\/en(?=\/|$)/, '') || '/';
    return legacy.replace(/^\/savoir-faire(?=\/|$)/, '/services');
}

export function publicLanguagePath(href: string, locale: Locale, origin?: string, availablePaths = paths): string {
    if (!href || href.startsWith('#') || /^(mailto:|tel:)/.test(href)) return href;
    let path = href;
    if (/^https?:\/\//.test(href)) {
        if (!origin) return href;
        try {
            const target = new URL(href);
            if (target.origin !== new URL(origin).origin) return href;
            path = target.pathname + target.search + target.hash;
        } catch {
            return href;
        }
    }
    if (!path.startsWith('/') || path.startsWith('//')) return href;
    const boundary = path.search(/[?#]/);
    const pathname = boundary < 0 ? path : path.slice(0, boundary);
    const suffix = boundary < 0 ? '' : path.slice(boundary);
    const localized = availablePaths[logicalPath(pathname, availablePaths)]?.[locale];
    return localized ? localized + suffix : href;
}
