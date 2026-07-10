import BeforeAfter from '@/components/pages/before-after';
import { Reveal, Stagger, StaggerItem } from '@/components/motion';
import { galleryCategories, galleryItems, type GalleryItem } from '@/data/gallery';
import { Link } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { useState } from 'react';

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = galleryCategories;

    const filteredItems = activeCategory === 'all' ? galleryItems : galleryItems.filter((item) => item.category === activeCategory);

    return (
        <div className="w-full bg-[#FDFCFA] text-alidade-navy">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-alidade-navy py-20 text-white sm:py-28">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-alidade-navy/50 via-alidade-navy/70 to-alidade-navy" />
                </div>
                <Stagger className="relative mx-auto max-w-6xl space-y-6 px-4 text-center sm:px-6 lg:px-8" amount={0.3}>
                    <StaggerItem className="inline-block">
                        <span className="text-[11px] font-bold tracking-[0.3em] text-alidade-gold uppercase">Galerie</span>
                    </StaggerItem>
                    <StaggerItem>
                        <h1 className="serif-display text-4xl leading-[1.1] font-bold text-white sm:text-6xl lg:text-7xl">Nos Réalisations</h1>
                    </StaggerItem>
                    <StaggerItem>
                        <p className="mx-auto max-w-2xl text-base leading-relaxed font-light text-white/75 sm:text-lg">
                            Découvrez une sélection de nos projets réalisés. Des cuisines modernes aux aménagements commerciaux, explorez la diversité
                            de notre savoir-faire.
                        </p>
                    </StaggerItem>
                </Stagger>
            </section>

            {/* Filter Section */}
            <section className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
                    <Reveal className="flex flex-wrap justify-center gap-3" y={16}>
                        {categories.map((cat) => (
                            <motion.button
                                key={cat.value}
                                onClick={() => setActiveCategory(cat.value)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                                    activeCategory === cat.value
                                        ? 'bg-alidade-muted text-white shadow-md'
                                        : 'bg-[#F9F7F3] text-alidade-navy hover:bg-[#F3EDE4]'
                                }`}
                            >
                                {cat.label}
                            </motion.button>
                        ))}
                    </Reveal>
                </div>
            </section>

            {/* Gallery Grid */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <motion.div layout className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                            onClick={() => setSelectedImage(item)}
                            className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl bg-gray-200 shadow-md transition-shadow duration-300 hover:shadow-xl"
                        >
                            <img
                                src={item.image}
                                alt={item.title}
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                                decoding="async"
                            />
                            {item.beforeAfter && (
                                <span className="text-alidade-navy absolute top-4 left-4 z-10 rounded-full bg-alidade-gold px-3 py-1 text-[10px] font-bold tracking-widest uppercase shadow-md">
                                    Avant / Après
                                </span>
                            )}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-alidade-navy/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="space-y-2">
                                    <span className="block text-[10px] font-bold tracking-[0.2em] text-alidade-gold uppercase">{item.category}</span>
                                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                    {item.location && (
                                        <p className="text-xs text-white/75">
                                            {item.location} • {item.year}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    </AnimatePresence>
                </motion.div>

                {filteredItems.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-alidade-muted">Aucun projet trouvé dans cette catégorie.</p>
                    </div>
                )}
            </section>

            {/* Lightbox Modal */}
            <AnimatePresence>
            {selectedImage && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92, y: 24 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 12 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                        className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 rounded-full bg-alidade-navy/80 p-2 text-white transition-colors hover:bg-alidade-gold"
                            aria-label="Fermer"
                        >
                            <X size={24} />
                        </button>

                        {/* Image ou slider avant/après */}
                        <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
                            {selectedImage.beforeAfter ? (
                                <BeforeAfter
                                    before={selectedImage.beforeAfter.before}
                                    after={selectedImage.beforeAfter.after}
                                    alt={selectedImage.title}
                                />
                            ) : (
                                <img src={selectedImage.image} alt={selectedImage.title} className="h-full w-full object-cover" decoding="async" />
                            )}
                        </div>

                        {/* Content */}
                        <div className="space-y-4 p-8">
                            <div className="space-y-2">
                                <span className="text-[11px] font-bold tracking-[0.3em] text-alidade-gold uppercase">{selectedImage.category}</span>
                                <h2 className="serif-display text-4xl font-bold text-alidade-navy">{selectedImage.title}</h2>
                                {selectedImage.location && (
                                    <p className="text-sm text-alidade-muted">
                                        {selectedImage.location} • {selectedImage.year}
                                    </p>
                                )}
                            </div>

                            <p className="text-base leading-relaxed text-alidade-muted">{selectedImage.description}</p>

                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => {
                                            const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id);
                                            if (currentIndex > 0) {
                                                setSelectedImage(filteredItems[currentIndex - 1]);
                                            }
                                        }}
                                        disabled={filteredItems.findIndex((item) => item.id === selectedImage.id) === 0}
                                        className="rounded-lg px-4 py-2 text-sm font-semibold text-alidade-navy transition-colors hover:bg-[#F9F7F3] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        ← Précédent
                                    </button>
                                    <button
                                        onClick={() => {
                                            const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id);
                                            if (currentIndex < filteredItems.length - 1) {
                                                setSelectedImage(filteredItems[currentIndex + 1]);
                                            }
                                        }}
                                        disabled={filteredItems.findIndex((item) => item.id === selectedImage.id) === filteredItems.length - 1}
                                        className="rounded-lg px-4 py-2 text-sm font-semibold text-alidade-navy transition-colors hover:bg-[#F9F7F3] disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        Suivant →
                                    </button>
                                </div>
                                <button
                                    onClick={() => setSelectedImage(null)}
                                    className="text-alidade-navy bg-alidade-gold hover:bg-alidade-gold-light rounded-lg px-6 py-2 text-sm font-semibold transition-colors"
                                >
                                    Fermer
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
            </AnimatePresence>

            {/* CTA Section */}
            <section className="bg-alidade-navy text-white">
                <Stagger className="mx-auto max-w-6xl space-y-8 px-4 py-20 text-center sm:px-6 lg:px-8" amount={0.3}>
                    <StaggerItem className="space-y-4">
                        <span className="text-[11px] font-bold tracking-[0.3em] text-alidade-gold uppercase">Projet similaire?</span>
                        <h2 className="serif-display text-4xl font-bold sm:text-5xl">Parlons de votre projet</h2>
                    </StaggerItem>
                    <StaggerItem>
                    <Link
                        href="/devis"
                        className="bg-alidade-gold hover:bg-alidade-gold-light text-alidade-navy inline-flex items-center gap-2 rounded-lg px-8 py-4 text-sm font-bold tracking-wider uppercase transition-colors"
                    >
                        <span>Obtenir un devis gratuit</span>
                        <ArrowRight size={16} />
                    </Link>
                    </StaggerItem>
                </Stagger>
            </section>
        </div>
    );
}
