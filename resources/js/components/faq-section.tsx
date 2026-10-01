import { Link } from '@/components/localized-link';
import { useLocale } from '@/lib/i18n';
import { usePage } from '@inertiajs/react';

export interface Faq {
    question: string;
    answer: string;
}

export default function FaqSection() {
    const { faqs = [] } = usePage<{ faqs?: Faq[] }>().props;
    const { locale, path } = useLocale();
    if (!faqs.length) return null;
    const english = locale === 'en';
    return (
        <section id="faq" aria-labelledby="faq-heading" className="border-t border-gray-100 bg-[#fafafa] px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl">
                <p className="mb-3 text-xs font-bold tracking-widest text-[#487e2e] uppercase">{english ? 'Your questions' : 'Vos questions'}</p>
                <h2 id="faq-heading" className="mb-8 text-3xl font-extrabold text-[#111827]">
                    {english ? 'Clear answers for your business' : 'Des réponses claires pour votre entreprise'}
                </h2>
                <div className="divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white px-6">
                    {faqs.map((faq) => (
                        <details key={faq.question} className="group py-5">
                            <summary className="cursor-pointer text-base leading-7 font-semibold text-[#111827] marker:text-[#487e2e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#487e2e]">
                                {faq.question}
                            </summary>
                            <p className="mt-4 max-w-3xl text-base leading-8 text-gray-600">{faq.answer}</p>
                        </details>
                    ))}
                </div>
                {path !== '/faq' && (
                    <Link href="/faq" className="mt-6 inline-block font-semibold text-[#487e2e] underline underline-offset-4">
                        {english ? 'See all frequently asked questions' : 'Voir toutes les questions fréquentes'}
                    </Link>
                )}
                <p className="mt-6 text-sm leading-7 text-gray-600">
                    {english ? 'Need an answer specific to your business? ' : 'Une question propre à votre entreprise? '}
                    <Link href="/contact" className="font-semibold text-[#487e2e] underline underline-offset-4">
                        {english ? 'Contact our team.' : 'Communiquez avec notre équipe.'}
                    </Link>
                </p>
            </div>
        </section>
    );
}
