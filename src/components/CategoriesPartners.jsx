import React from 'react';
import { motion } from 'framer-motion';

const categories = [
    { id: 1, name: 'Playas y Sol', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop' },
    { id: 2, name: 'Montaña', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, name: 'Escapadas Europeas', image: 'https://images.unsplash.com/photo-1485081669829-bacb8c7bb1f3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Tours de Compras', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, name: 'Cruceros', image: 'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?q=80&w=1974&auto=format&fit=crop' },
    { id: 6, name: 'Safaris', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop' },
    { id: 7, name: 'Destinos Exóticos', image: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=2070&auto=format&fit=crop' },
    { id: 8, name: 'Rutas Históricas', image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1966&auto=format&fit=crop' }
];

const partners = ["Aerolíneas", "Booking", "SkyTeam", "Royal Caribbean", "Marriott", "Hertz"];

const CategoriesPartners = () => {
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
                        <button className="hidden md:block font-sans font-semibold text-secondary hover:text-primary transition-colors">
                            Ver todas las categorías &rarr;
                        </button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {categories.map((cat, i) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative rounded-2xl overflow-hidden group cursor-pointer h-48 md:h-64"
                            >
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent"></div>
                                <div className="absolute inset-0 p-4 md:p-6 flex items-end">
                                    <h3 className="font-serif font-bold text-white leading-tight text-lg md:text-xl">
                                        {cat.name}
                                    </h3>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <button className="md:hidden mt-6 w-full font-sans font-semibold text-secondary text-center">
                        Ver todas las categorías &rarr;
                    </button>
                </div>

                {/* Partners Strip */}
                <div className="border-t border-gray-200 pt-16">
                    <p className="text-center font-sans font-semibold text-gray-400 uppercase tracking-widest text-xs mb-8">
                        Con la confianza de nuestros partners
                    </p>
                    <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {partners.map((partner, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="font-serif font-black text-2xl md:text-3xl text-primary"
                            >
                                {partner}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CategoriesPartners;
