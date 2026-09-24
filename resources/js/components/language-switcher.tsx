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
                    title={language === 'fr' ? 'Français' : 'English'}
                    aria-current={language === locale ? 'page' : undefined}
                    className={`flex h-10 w-10 items-center justify-center border-b-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#487e2e] ${language === locale ? 'border-[#74B946] bg-[#f2f7ed]' : 'border-transparent hover:bg-gray-100'}`}
                    preserveScroll
                >
                    <img
                        src={language === 'fr' ? '/images/flags/fr.png' : '/images/flags/gb.png'}
                        alt=""
                        width={30}
                        height={20}
                        className="h-5 w-[30px] object-contain"
                    />
                </Link>
            ))}
        </nav>
    );
}
