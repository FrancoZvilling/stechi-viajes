import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Hotel, Coffee, Map } from 'lucide-react';
import { Link } from 'react-router-dom';

const packages = [
    {
        id: 1,
        title: 'Escapada a Bariloche',
        image: 'https://images.unsplash.com/photo-1598162480222-b2c3d92548d5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: [{ icon: <Plane size={14} />, text: 'Vuelo' }, { icon: <Hotel size={14} />, text: 'Hotel' }],
        price: '$45,000',
        originalPrice: '$55,000',
        description: 'Disfruta de la magia del sur argentino con estadía de 5 noches y aéreos incluidos.',
    },
    {
        id: 2,
        title: 'Playas de Buzios',
        image: 'https://images.unsplash.com/photo-1576721804094-1dbcdb671711?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: [{ icon: <Plane size={14} />, text: 'Vuelo' }, { icon: <Hotel size={14} />, text: 'Hotel' }, { icon: <Coffee size={14} />, text: 'Desayuno' }],
        price: '$85,000',
        originalPrice: '$100,000',
        description: 'Relájate en las cálidas playas de Brasil. Paquete completo para 7 días.',
    },
    {
        id: 3,
        title: 'Aventura en Mendoza',
        image: 'https://images.unsplash.com/photo-1546863340-7e4e97e46f42?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: [{ icon: <Hotel size={14} />, text: 'Hotel' }, { icon: <Map size={14} />, text: 'Excursiones' }],
        price: '$60,000',
        originalPrice: null,
        description: 'Explora la ruta del vino y los Andes con este paquete exclusivo de 4 noches.',
    },
    {
        id: 4,
        title: 'Tour por Europa Clásica',
        image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
        tags: [{ icon: <Plane size={14} />, text: 'Vuelo' }, { icon: <Hotel size={14} />, text: 'Hotel' }, { icon: <Map size={14} />, text: 'Tour' }],
        price: 'USD 1,200',
        originalPrice: 'USD 1,500',
        description: 'Madrid, París y Roma en 15 días inolvidables con guías en español.',
    },
    {
        id: 5,
        title: 'Caribe All Inclusive',
        image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop',
        tags: [{ icon: <Plane size={14} />, text: 'Vuelo' }, { icon: <Hotel size={14} />, text: 'Resort' }, { icon: <Coffee size={14} />, text: 'Todo Incluido' }],
        price: 'USD 890',
        originalPrice: null,
        description: 'Punta Cana espectacular. Disfruta sin preocupaciones con todo pagado.',
    },
    {
        id: 6,
        title: 'Cataratas del Iguazú',
        image: 'https://images.unsplash.com/photo-1538703012804-b74999aa11b9?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        tags: [{ icon: <Plane size={14} />, text: 'Vuelo' }, { icon: <Hotel size={14} />, text: 'Hotel' }],
        price: '$50,000',
        originalPrice: '$58,000',
        description: 'Siente la fuerza de la naturaleza. Aéreos y alojamiento por 3 noches.',
    }
];

const ProductGrid = () => {
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {packages.map((pkg, index) => (
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
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {pkg.tags.map((tag, i) => (
                                        <span key={i} className="bg-blue-50 text-secondary text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                                            {tag.icon} {tag.text}
                                        </span>
                                    ))}
                                </div>

                                <h3 className="text-xl font-bold font-serif text-primary mb-2 group-hover:text-secondary transition-colors">
                                    {pkg.title}
                                </h3>

                                <p className="text-gray-500 text-sm mb-6 flex-grow font-sans">
                                    {pkg.description}
                                </p>

                                <div className="flex items-end justify-between mt-auto">
                                    <div>
                                        <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Desde</span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl font-bold text-primary font-sans">{pkg.price}</span>
                                            {pkg.originalPrice && (
                                                <span className="text-sm text-gray-400 line-through font-medium">{pkg.originalPrice}</span>
                                            )}
                                        </div>
                                    </div>
                                    <button className="bg-primary hover:bg-secondary text-white p-3 rounded-full transition-colors shadow-lg group-hover:shadow-xl group-hover:scale-105 transform">
                                        <Plane size={20} className="transform rotate-45" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

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
