import { EASE, Reveal } from '@/components/motion';
import { services, type ServiceDetail } from '@/data/services';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// Métiers mis en avant sur l'accueil — les autres sont sur /savoir-faire.
const FEATURED_SLUGS = ['menuiserie-bois', 'renovation', 'aluminium', 'peinture'];

const featured = FEATURED_SLUGS.map((slug) => services.find((s) => s.slug === slug)).filter((s): s is ServiceDetail => s !== undefined);

// Carte métier : la description est masquée et se révèle quand la carte entre à l'écran.
function MetierCard({ service, index }: { service: ServiceDetail; index: number }) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={{
                hidden: { opacity: 0, y: 48 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
            }}
        >
            <Link
                href={`/services/${service.slug}`}
                className="group flex min-h-[7.5rem] items-stretch overflow-hidden rounded-2xl bg-gray-50 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[8.5rem]"
            >
                {/* Numéro */}
                <span className="serif-display group-hover:text-alidade-gold flex w-20 shrink-0 items-center justify-center text-4xl font-bold text-gray-300 transition-colors duration-300 sm:w-28 sm:text-5xl">
                    {String(index + 1).padStart(2, '0')}
                </span>

                {/* Titre + description révélée au scroll */}
                <div className="flex min-w-0 flex-grow flex-col justify-center py-5 pr-4">
                    <h4 className="text-alidade-navy text-lg font-bold tracking-wide uppercase sm:text-2xl">{service.title}</h4>
                    <motion.div
                        className="overflow-hidden"
                        variants={{
                            hidden: { height: 0, opacity: 0, marginTop: 0 },
                            visible: { height: 'auto', opacity: 1, marginTop: 4, transition: { duration: 0.7, delay: 0.3, ease: EASE } },
                        }}
                    >
                        <p className="line-clamp-2 text-xs font-light text-gray-500 sm:line-clamp-1 sm:text-sm lg:text-base">
                            {service.description}
                        </p>
                    </motion.div>
                </div>

                {/* Image à droite, pleine hauteur de la carte */}
                <div className="relative hidden w-2/5 max-w-xs shrink-0 overflow-hidden sm:block">
                    <img
                        src={service.imageUrl}
                        alt={service.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        decoding="async"
                    />
                    <div className="to-gray-50/40 absolute inset-0 bg-gradient-to-l from-transparent via-transparent" />

                    {/* Flèche */}
                    <span className="group-hover:bg-alidade-gold group-hover:text-alidade-navy text-alidade-navy absolute top-1/2 right-4 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 group-hover:scale-110">
                        <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </span>
                </div>

                {/* Flèche mobile (sans image) */}
                <span className="text-alidade-navy mr-4 flex items-center self-center sm:hidden">
                    <ArrowRight size={18} />
                </span>
            </Link>
        </motion.div>
    );
}

// Section « Nos métiers » : cartes numérotées, description dévoilée carte par carte au scroll.
export default function MetiersSection() {
    return (
        <section className="border-t border-gray-100 bg-white py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <Reveal className="space-y-3 text-center">
                    <h3 className="text-alidade-navy serif-display text-3xl font-bold uppercase sm:text-4xl">
                        Un savoir-faire complet du second œuvre
                    </h3>
                </Reveal>

                {/* Cartes */}
                <div className="mt-12 space-y-6">
                    {featured.map((service, index) => (
                        <MetierCard key={service.slug} service={service} index={index} />
                    ))}
                </div>

                {/* CTA vers tous les métiers */}
                <Reveal className="mt-12 text-center" delay={0.15}>
                    <Link
                        href="/savoir-faire"
                        className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy inline-flex items-center gap-2.5 rounded px-8 py-4 text-xs font-bold tracking-widest uppercase shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                        <span>Voir tous nos métiers</span>
                        <ArrowRight size={15} />
                    </Link>
                </Reveal>
            </div>
        </section>
    );
}
