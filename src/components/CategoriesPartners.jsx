import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTrips } from '../hooks/useTrips';

const fallbackCategories = [
    { id: 1, name: 'Playas y Sol', count: 0, image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' },
    { id: 2, name: 'Montaña', count: 0, image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, name: 'Escapadas Europeas', count: 0, image: 'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=1170&auto=format&fit=crop' },
    { id: 4, name: 'Tours de Compras', count: 0, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop' }
];

const partners = [
    "Freeway", "Mahal Tour Operador", "King Midas SRL", 
    "Tower Travel", "MSC Cruceros", "AssistCard", 
    "Avis", "Amichi Turismo", "Contrastes SRL"
];
const duplicatedPartners = [...partners, ...partners];

const CategoriesPartners = () => {
    const { trips } = useTrips();

    const categories = useMemo(() => {
        if (!trips || trips.length === 0) return [];
        
        const typeMap = {};
        trips.forEach(trip => {
            if (trip.type) {
                if (!typeMap[trip.type]) {
                    typeMap[trip.type] = {
                        id: trip.type,
                        name: trip.type,
                        image: trip.categoryImageUrl || trip.imageUrl || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80',
                        count: 1,
                        hasExplicitImage: !!trip.categoryImageUrl
                    };
                } else {
                    typeMap[trip.type].count += 1;
                    if (!typeMap[trip.type].hasExplicitImage && trip.categoryImageUrl) {
                        typeMap[trip.type].image = trip.categoryImageUrl;
                        typeMap[trip.type].hasExplicitImage = true;
                    }
                }
            }
        });

        return Object.values(typeMap).slice(0, 8);
    }, [trips]);

    const displayCategories = categories.length > 0 ? categories : fallbackCategories;

    return (
        <section className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                {/* Categories Grid */}
                <div className="mb-20">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-2">
                                Descubre por Categoría
                            </h2>
                            <div className="h-1 bg-secondary rounded-full w-24"></div>
                        </div>
                        <Link to="/destinos" className="hidden md:block font-sans font-semibold text-secondary hover:text-primary transition-colors">
                            Ver todas las categorías &rarr;
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {displayCategories.map((cat, i) => (
                            <Link
                                key={cat.id}
                                to={`/destinos?type=${encodeURIComponent(cat.name)}`}
                                className="block"
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    className="relative rounded-2xl overflow-hidden group cursor-pointer h-48 md:h-64 shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent"></div>
                                    <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                                        {cat.count > 0 && (
                                            <span className="text-white/80 text-xs font-bold uppercase tracking-wider mb-1">
                                                {cat.count} {cat.count === 1 ? 'viaje' : 'viajes'}
                                            </span>
                                        )}
                                        <h3 className="font-serif font-bold text-white leading-tight text-lg md:text-xl">
                                            {cat.name}
                                        </h3>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                    <Link to="/destinos" className="md:hidden mt-6 w-full font-sans font-semibold text-secondary text-center block">
                        Ver todas las categorías &rarr;
                    </Link>
                </div>

                {/* Partners Strip */}
                <div id="partners" className="border-t border-gray-200 pt-16 overflow-hidden">
                    <p className="text-center font-sans font-semibold text-gray-400 uppercase tracking-widest text-xs mb-8">
                        Con la confianza de nuestros partners
                    </p>
                    <div className="relative w-full overflow-hidden flex items-center">
                        <motion.div
                            className="flex items-center gap-12 md:gap-24 w-max pr-12 md:pr-24"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
                        >
                            {duplicatedPartners.map((partner, i) => (
                                <div
                                    key={i}
                                    className="font-serif font-black text-2xl md:text-3xl text-gray-400 opacity-50 hover:opacity-100 hover:text-primary transition-all duration-300 py-4 cursor-default whitespace-nowrap"
                                >
                                    {partner}
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesPartners;
