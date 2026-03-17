import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, Coffee, Map, Umbrella, Mountain, Camera, Calendar, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTrips } from '../hooks/useTrips';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const iconMap = {
    Plane: <Plane size={14} />,
    Hotel: <Hotel size={14} />,
    Coffee: <Coffee size={14} />,
    Map: <Map size={14} />,
    Umbrella: <Umbrella size={14} />,
    Mountain: <Mountain size={14} />,
    Camera: <Camera size={14} />
};

const ProductGrid = () => {
    const { trips, isLoading } = useTrips();
    
    // Get trips marked as Featured
    const featuredPackages = trips.filter(trip => trip.isFeatured).slice(0, 6); // Max 6 para la grilla

    const formatTripDates = (startIso, endIso) => {
        if (!startIso || !endIso) return 'Fechas Flexibles';
        const start = new Date(startIso);
        const end = new Date(endIso);
        return `${format(start, 'dd MMM', { locale: es })} - ${format(end, 'dd MMM', { locale: es })}`;
    };

    return (
        <section id="destinos" className="py-24 bg-gray-50">
            <div className="container mx-auto px-6 md:px-12">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4"
                    >
                        Paquetes Destacados
                    </motion.h2>
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "80px" }}
                        viewport={{ once: true }}
                        className="h-1 bg-secondary mx-auto rounded-full mb-6"
                    ></motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-gray-600 font-sans max-w-2xl mx-auto"
                    >
                        Encuentra tu próximo destino al mejor precio. Tenemos ofertas exclusivas seleccionadas especialmente para ti.
                    </motion.p>
                </div>

                {isLoading ? (
                    <div className="py-20 text-center flex flex-col items-center">
                         <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mb-2"></div>
                         <p className="text-gray-500">Cargando paquetes destacados...</p>
                    </div>
                ) : featuredPackages.length === 0 ? (
                    <div className="py-20 text-center bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
                        <Map size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-2xl font-serif text-primary font-bold mb-2">Próximamente nuevas ofertas</h3>
                        <p className="text-gray-500 font-sans">En este momento estamos preparando los mejores paquetes para ti.</p>
                    </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {featuredPackages.map((pkg, index) => (
                        <motion.div
                            key={pkg.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-primary">
                                    DESTACADO
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-grow">
                                {/* Tags */}
                                {pkg.tags && pkg.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {pkg.tags.map((tag, i) => (
                                            <span key={i} className="bg-blue-50 text-secondary text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                                                {iconMap[tag.icon] || <Plane size={14} />} {tag.text}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                <h3 className="text-xl font-bold font-serif text-primary mb-2 group-hover:text-secondary transition-colors">
                                    {pkg.title}
                                </h3>

                                <p className="text-gray-500 text-sm mb-4 flex-grow font-sans line-clamp-3">
                                    {pkg.shortDescription || pkg.description}
                                </p>

                                <div className="flex flex-wrap items-center gap-3 text-primary font-sans text-xs font-semibold mb-6">
                                    <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                                        <Calendar size={14} className="text-secondary" />
                                        <span>{(pkg.startDate && pkg.endDate) ? formatTripDates(pkg.startDate, pkg.endDate) : (pkg.dates || 'Fechas Flexibles')}</span>
                                    </div>
                                    {pkg.passengers && (
                                        <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                                            <Users size={14} className="text-secondary" />
                                            <span>{pkg.passengers}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-end justify-between mt-auto">
                                            <div>
                                                {pkg.price && !pkg.price.toLowerCase().includes('consultar') && (
                                                    <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Desde</span>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-bold text-primary font-sans ${pkg.price && pkg.price.toLowerCase().includes('consultar') ? 'text-lg max-w-[120px] leading-tight' : 'text-2xl'}`}>{pkg.price}</span>
                                                    {pkg.originalPrice && (!pkg.price || !pkg.price.toLowerCase().includes('consultar')) && (
                                                        <span className="text-sm text-gray-400 line-through font-medium">{pkg.originalPrice}</span>
                                                    )}
                                                </div>
                                            </div>
                                    <Link to={`/paquete/${pkg.id}`} className="bg-primary hover:bg-secondary text-white p-3 rounded-full transition-colors shadow-lg group-hover:shadow-xl group-hover:scale-105 transform inline-block">
                                        <Plane size={20} className="transform rotate-45" />
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                )}

                <div className="text-center mt-16">
                    <Link to="/destinos" className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-sans font-bold py-3 px-10 rounded-full transition-all shadow-sm hover:shadow-md">
                        Ver Todos los Destinos
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ProductGrid;
