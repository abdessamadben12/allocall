import { useLocale } from '@/lib/i18n';
import { Link } from '@inertiajs/react';

export default function LanguageSwitcher() {
    const { locale, switchHref } = useLocale();
    return (
        <nav aria-label={locale === 'fr' ? 'Langue du site' : 'Website language'} className="flex shrink-0 items-center gap-1 text-sm font-semibold">
            {(['fr', 'en'] as const).map((language) => (
                <Link
                    key={language}
                    href={switchHref(language)}
                    hrefLang={language === 'fr' ? 'fr-CA' : 'en-CA'}
                    lang={language}
                    aria-label={language === 'fr' ? 'Français' : 'English'}
                    aria-current={language === locale ? 'page' : undefined}
                    className={`flex h-10 w-10 items-center justify-center border-b-2 ${language === locale ? 'border-[#74B946] text-[#487e2e]' : 'border-transparent text-gray-500 hover:text-[#487e2e]'}`}
                    preserveScroll
                >
                    {language.toUpperCase()}
                </Link>
            ))}
        </nav>
    );
}
