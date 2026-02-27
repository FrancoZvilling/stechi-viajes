import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, CreditCard, ThumbsUp, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
    {
        id: 1,
        image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop',
        title: 'Dubái Inolvidable',
        subtitle: 'Lujo y vanguardia en el desierto',
        discount: '25% OFF'
    },
    {
        id: 2,
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop',
        title: 'Misterios de la India',
        subtitle: 'Nultura ancestral y colores vibrantes',
        discount: 'Vuelo + Hotel'
    },
    {
        id: 3,
        image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?q=80&w=2070&auto=format&fit=crop',
        title: 'Paraísos Asiáticos',
        subtitle: 'Tailandia, Bali y Vietnam',
        discount: 'Cuotas Sin Interés'
    }
];

const features = [
    { icon: <ShieldCheck size={32} />, title: 'Viaja Seguro', desc: 'Asistencia al viajero 24/7 en todo el mundo.' },
    { icon: <CreditCard size={32} />, title: 'Flexibilidad de Pago', desc: 'Múltiples medios de pago y financiación.' },
    { icon: <Clock size={32} />, title: 'Atención Personalizada', desc: 'Armamos tu viaje a medida sin demoras.' },
    { icon: <ThumbsUp size={32} />, title: 'Mejor Precio Garantizado', desc: 'Acuerdos exclusivos con los mejores operadores.' }
];

const PromoSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <section id="promociones" className="bg-white overflow-hidden">
            {/* Full Width Carousel */}
            <div className="relative h-[60vh] min-h-[500px] w-full group">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover"
                        />

                        <div className="absolute inset-0 z-20 flex items-center">
                            <div className="container mx-auto px-6 md:px-12">
                                <div className="max-w-xl">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="inline-block px-4 py-1.5 bg-secondary text-white font-sans font-bold text-sm rounded-full mb-4 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] uppercase tracking-wider"
                                    >
                                        {slides[currentSlide].discount}
                                    </motion.span>
                                    <motion.h2
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                    >
                                        {slides[currentSlide].title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="text-lg md:text-xl text-white/95 font-sans mb-8 max-w-md drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium"
                                    >
                                        {slides[currentSlide].subtitle}
                                    </motion.p>
                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.9 }}
                                        className="bg-white text-primary hover:bg-secondary hover:text-white font-sans font-bold py-3 px-8 rounded-full transition-all shadow-xl hover:shadow-2xl"
                                    >
                                        Descubrir Oferta
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Controls */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/50 backdrop-blur-md text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/50 backdrop-blur-md text-white p-3 rounded-full transition-all opacity-0 group-hover:opacity-100">
                    <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-secondary' : 'w-2 bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Features Row */}
            <div className="bg-primary text-white py-16 relative z-40 -mt-8 mx-4 md:mx-12 rounded-3xl shadow-2xl">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="flex flex-col items-center text-center px-4"
                            >
                                <div className="text-secondary mb-4 bg-white/10 p-4 rounded-full">
                                    {feat.icon}
                                </div>
                                <h3 className="font-serif font-bold text-xl mb-2">{feat.title}</h3>
                                <p className="font-sans text-white/70 text-sm leading-relaxed">{feat.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoSection;
