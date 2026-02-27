import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Plane, Cloud } from 'lucide-react';

const testimonials = [
    {
        id: 1,
        name: 'Martina Rossi',
        role: 'Viaje a Europa Clásica',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
        content: 'Una experiencia inolvidable. Desde el momento en que contactamos a Stechi Tours, la organización fue impecable. Los hoteles y guías en París y Roma superaron nuestras expectativas. ¡Volveremos a viajar con ellos sin duda!',
        rating: 5,
    },
    {
        id: 2,
        name: 'Carlos Mendoza',
        role: 'Aventura en la Patagonia',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
        content: 'Atención personalizada de verdad. Me ayudaron a reprogramar un vuelo de forma rápida y sin estrés. El recorrido por los glaciares fue mágico y el nivel de detalle en el itinerario muestra el profesionalismo de la agencia.',
        rating: 5,
    },
    {
        id: 3,
        name: 'Familia Gómez',
        role: 'Caribe All Inclusive',
        image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop',
        content: 'Viajar con niños siempre es un desafío, pero gracias a las recomendaciones de Stechi Tours encontramos el resort perfecto. Descanso absoluto, tarifas transparentes y un soporte constante. Totalmente recomendables.',
        rating: 5,
    }
];

const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decorative Elements */}
            {/* Animated Clouds */}
            <motion.div
                className="absolute top-16 left-[20%] text-secondary z-0 opacity-20"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Cloud size={60} />
            </motion.div>
            <motion.div
                className="absolute top-32 left-[50%] text-secondary z-0 opacity-15"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
                <Cloud size={80} />
            </motion.div>
            <motion.div
                className="absolute top-10 right-[15%] text-secondary z-0 opacity-20 hidden md:block"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            >
                <Cloud size={70} />
            </motion.div>

            <div className="absolute top-20 left-10 text-primary/5">
                <Quote size={120} />
            </div>
            <motion.div
                className="absolute top-24 text-secondary z-0 opacity-50 flex items-center gap-2"
                initial={{ x: '-20vw' }}
                animate={{ x: '120vw' }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            >
                <div className="w-12 h-1 bg-secondary/30 rounded-full blur-sm"></div>
                <div className="w-24 h-1 bg-secondary/20 rounded-full blur-md"></div>
                <Plane size={80} className="transform rotate-45" />
            </motion.div>
            <div className="absolute bottom-20 right-10 text-secondary/5 rotate-180">
                <Quote size={120} />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4"
                    >
                        Historias que Inspiran
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
                        La mejor garantía de nuestro servicio es la de aquellos que ya vivieron su viaje soñado con Stechi Tours. Descubre lo que dicen nuestros clientes.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                    {testimonials.map((testimonial, i) => (
                        <motion.div
                            key={testimonial.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            className="bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 relative group"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(testimonial.rating)].map((_, index) => (
                                    <Star key={index} size={18} className="fill-secondary text-secondary" />
                                ))}
                            </div>

                            {/* Content */}
                            <p className="font-sans text-gray-600 italic leading-relaxed mb-8 relative z-10">
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-4 mt-auto">
                                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                                    <img
                                        src={testimonial.image}
                                        alt={`Foto de ${testimonial.name}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-serif font-bold text-primary">{testimonial.name}</h4>
                                    <span className="font-sans text-xs text-secondary font-semibold uppercase tracking-wider">{testimonial.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
