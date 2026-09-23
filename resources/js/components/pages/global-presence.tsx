import { useLocale } from '@/lib/i18n';
import { Reveal } from '@/components/motion';
import { useState } from 'react';

const locations = [
    {
        id: 'canada',
        label: 'Canada',
        sites: '1 site',
        people: 'Equipe commerciale et support client',

        // Montréal
        position: 'left-[29.6%] top-[24.7%]',

        cardPosition:
            'left-[31.5%] top-[24.7%] -translate-y-1/2',
    },
    {
        id: 'maroc',
        label: 'Maroc',
        sites: '1 site',
        people: 'Agents francophones et bilingues',

        // Casablanca
        position: 'left-[47.9%] top-[37%]',

        cardPosition:
            'left-[50%] top-[39%] -translate-y-1/2',
    },
    {
        id: 'france',
        label: 'France',
        sites: 'Partenaires',
        people: 'Operations et accompagnement client',

        // Paris
        position: 'left-[50.7%] top-[20.8%]',

        cardPosition:
            'left-[30.5%] top-[27.8%] -translate-y-1/2',
    },
];

export default function GlobalPresenceSection() {
const { t } = useLocale();

    const [activeLocation, setActiveLocation] = useState<
        (typeof locations)[number] | null
    >(null);

    return (
        <section
            className="overflow-hidden bg-white py-20 lg:py-24"
            onClick={() => setActiveLocation(null)}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <Reveal className="mx-auto max-w-4xl text-center">
                    <h2 className="text-4xl font-extrabold tracking-normal text-[#111827] uppercase sm:text-5xl">
                        {t("Presence internationale")}</h2>

                    <p
                        className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-7
                            text-gray-500
                            sm:text-base
                            lg:text-lg
                        "
                    >
                        {t("Une organisation connectee entre l Amerique du Nord, l Europe et l Afrique pour offrir un service client fluide, rapide et adapte a vos marches.")}</p>
                </Reveal>

                <Reveal
                    className="relative mt-12"
                    delay={0.12}
                    y={18}
                >
                    <div className="relative mx-auto max-w-6xl">
                        <img
                            src="/images/maps.svg"
                            alt={t("Carte des implantations AlloCall")}
                            className="w-full"
                            loading="lazy"
                            decoding="async"
                        />

                        {locations.map((location) => (
                            <button
                                key={location.label}
                                type="button"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    setActiveLocation(location);
                                }}
                                onMouseEnter={() =>
                                    setActiveLocation(location)
                                }
                                className={`absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#74B946] shadow-lg shadow-[#74B946]/30 transition-all duration-300 hover:scale-125 focus:ring-4 focus:ring-[#74B946]/30 focus:outline-none sm:h-5 sm:w-5 sm:border-4 ${
                                    activeLocation?.id ===
                                    location.id
                                        ? 'scale-125'
                                        : ''
                                } ${location.position}`}
                                aria-label={t("Afficher {0}", [location.label])}
                            >
                                <span className="absolute inset-[-10px] rounded-full bg-[#74B946]/20" />
                            </button>
                        ))}

                        {activeLocation && (
                            <div
                                onClick={(event) =>
                                    event.stopPropagation()
                                }
                                className={`absolute w-[150px] bg-gradient-to-br from-[#111827] to-[#74B946] p-3 text-white shadow-xl transition-all duration-300 sm:w-[220px] sm:p-5 lg:w-[270px] ${activeLocation.cardPosition}`}
                            >
                                <h3 className="text-sm font-extrabold uppercase sm:text-xl lg:text-2xl">
                                    {t(activeLocation.label)}
                                </h3>

                                <p className="mt-2 text-[10px] leading-4 font-medium sm:mt-4 sm:text-xs sm:leading-5 lg:text-sm lg:leading-6">
                                    {t("Sites: ")}{t(activeLocation.sites)}
                                    <br />
                                    {t(activeLocation.people)}
                                </p>
                            </div>
                        )}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}