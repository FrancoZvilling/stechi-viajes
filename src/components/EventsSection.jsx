import React from 'react';
import { motion } from 'framer-motion';

const events = [
    { id: 1, name: 'Conciertos Imborrables', image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, name: 'Eventos Deportivos', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1905&auto=format&fit=crop' },
    { id: 3, name: 'Festivales de Cultura', image: 'https://images.unsplash.com/photo-1463592177119-bab2a00f3ccb?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'Convenciones y Congresos', image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop' },
    { id: 5, name: 'Retiros VIP', image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2120&auto=format&fit=crop' },
    { id: 6, name: 'Carnavales del Mundo', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1974&auto=format&fit=crop' },
];

const EventsSection = () => {
    return (
        <section id="eventos" className="py-24 bg-white relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4"
                    >
                        Experiencias y Eventos Globales
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
                        Viaja para vivir tu pasión. Organizamos paquetes completos para los eventos más exclusivos alrededor del planeta.
                    </motion.p>
                </div>

                {/* Horizontal List of Circular Items */}
                <div className="flex overflow-x-auto pb-8 pt-4 gap-8 md:gap-12 snap-x snap-mandatory hide-scrollbar justify-start lg:justify-center">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5, type: "spring", bounce: 0.4 }}
                            className="flex flex-col items-center flex-shrink-0 snap-center group cursor-pointer"
                        >
                            <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden p-1 bg-gradient-to-tr from-primary to-secondary mb-6 shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-white">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                    />
                                </div>
                            </div>
                            <h3 className="font-serif font-bold text-lg md:text-xl text-primary text-center group-hover:text-secondary transition-colors w-40 md:w-48">
                                {event.name}
                            </h3>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Hide scrollbar styles */}
            <style dangerouslySetInnerHTML={{
                __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
        </section>
    );
};

export default EventsSection;
