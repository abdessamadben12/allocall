import { Reveal } from '@/components/motion';
import { useState } from 'react';

const locations = [
    {
        id: 'canada',
        label: 'Canada',
        sites: '1 site',
        people: 'Equipe commerciale et support client',
        position: 'left-[24%] top-[31%]',
        cardPosition:
            'left-[27%] top-[35%] -translate-y-1/2',
    },
    {
        id: 'maroc',
        label: 'Maroc',
        sites: '1 site',
        people: 'Agents francophones et bilingues',
        position: 'left-[47%] top-[48%]',
        cardPosition:
            'left-[50%] top-[52%] -translate-y-1/2',
    },
    {
        id: 'france',
        label: 'France',
        sites: 'Partenaires',
        people: 'Operations et accompagnement client',
        position: 'left-[49%] top-[31%]',
        cardPosition:
            'left-[52%] top-[34%] -translate-y-1/2',
    },
];

export default function GlobalPresenceSection() {
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
                        Presence internationale
                    </h2>

                    <p className="
                            mx-auto
                            mt-5
                            max-w-2xl
                            text-sm
                            leading-7
                            text-gray-500
                            sm:text-base
                            lg:text-lg
                        ">
                        Une organisation connectee entre l Amerique
                        du Nord, l Europe et l Afrique pour offrir un
                        service client fluide, rapide et adapte a vos
                        marches.
                    </p>
                </Reveal>

                <Reveal
                    className="relative mt-12"
                    delay={0.12}
                    y={18}
                >
                    <div className="relative mx-auto max-w-6xl">
                        <img
                            src="/images/maps.svg"
                            alt="Carte des implantations AlloCall"
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
                                    setActiveLocation(location)
                                }}
                                onMouseEnter={() =>
                                    setActiveLocation(location)
                                }
                                className={`absolute hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-white bg-[#74B946] shadow-lg shadow-[#74B946]/30 transition-all duration-300 hover:scale-125 focus:ring-4 focus:ring-[#74B946]/30 focus:outline-none md:block ${
                                    activeLocation?.id ===
                                    location.id
                                        ? 'scale-125'
                                        : ''
                                } ${location.position}`}
                                aria-label={`Afficher ${location.label}`}
                            >
                                <span className="absolute inset-[-10px] rounded-full bg-[#74B946]/20" />
                            </button>
                        ))}

                        {activeLocation && (
                            <div
                                onClick={(event) =>
                                    event.stopPropagation()
                                }
                                className={`absolute hidden w-[220px] bg-gradient-to-br from-[#111827] to-[#74B946] p-5 text-white shadow-xl transition-all duration-300 md:block lg:w-[270px] ${activeLocation.cardPosition}`}
                            >
                                <h3 className="text-xl font-extrabold uppercase lg:text-2xl">
                                    {activeLocation.label}
                                </h3>

                                <p className="mt-4 text-xs leading-5 font-medium lg:text-sm lg:leading-6">
                                    Sites: {activeLocation.sites}
                                    <br />
                                    {activeLocation.people}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="mt-8 grid gap-4 md:hidden">
                        {locations.map((location) => (
                            <div
                                key={location.label}
                                className="border-l-4 border-[#74B946] bg-[#111827] p-5 text-white"
                            >
                                <h3 className="text-lg font-extrabold uppercase">
                                    {location.label}
                                </h3>

                                <p className="mt-2 text-sm text-white/80">
                                    {location.sites} -{' '}
                                    {location.people}
                                </p>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
