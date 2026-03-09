import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        subtitle: 'Cultura ancestral y colores vibrantes',
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

const HeroSection = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSlide]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <section className="relative h-[85vh] min-h-[650px] w-full flex items-center justify-center overflow-visible">
            {/* Carousel Backgrounds & Text */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[40px] shadow-xl">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute inset-0"
                    >
                        {/* Gradients to ensure text is readable */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
                        <img
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].title}
                            className="w-full h-full object-cover"
                        />

                        {/* Hero Text Content */}
                        <div className="absolute inset-0 z-20 flex items-center">
                            <div className="container mx-auto px-6 md:px-12 w-full">
                                <div className="max-w-2xl">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="inline-block px-5 py-1.5 bg-secondary text-white font-sans font-bold text-sm md:text-base rounded-full mb-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] uppercase tracking-[0.2em]"
                                    >
                                        {slides[currentSlide].discount}
                                    </motion.span>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                    >
                                        {slides[currentSlide].title}
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.7 }}
                                        className="text-xl md:text-2xl text-white/95 font-sans mb-10 max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium"
                                    >
                                        {slides[currentSlide].subtitle}
                                    </motion.p>
                                    {/* Botón y Controles Móviles integrados */}
                                    <div className="flex items-center gap-4">
                                        <button onClick={prevSlide} className="md:hidden bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-all">
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        <motion.button
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.9 }}
                                            className="bg-white/20 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/40 font-sans font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 group"
                                        >
                                            Ver Viaje
                                            <ChevronRight size={18} className="hidden md:block group-hover:translate-x-1 transition-transform" />
                                        </motion.button>

                                        <button onClick={nextSlide} className="md:hidden bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-all">
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Carousel Controls - ONLY DESKTOP */}
                <button onClick={prevSlide} className="hidden md:block absolute left-4 md:left-8 top-1/2 md:-translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all">
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button onClick={nextSlide} className="hidden md:block absolute right-4 md:right-8 top-1/2 md:-translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all">
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-2 w-max">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-10 bg-secondary' : 'w-3 bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Travel Search Component moved to the boundary */}
            <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-40 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-full p-3 md:p-4 max-w-5xl mx-auto shadow-2xl border border-white/50"
                >
                    <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                        {/* Destination Input */}
                        <div className="flex-1 w-full bg-transparent flex items-center px-4 py-2 transition-all">
                            <MapPin className="text-secondary mr-3" size={24} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Destino</label>
                                <input
                                    type="text"
                                    placeholder="¿A dónde quieres ir?"
                                    className="bg-transparent border-none outline-none text-primary font-serif font-bold text-lg w-full placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                        {/* Date Input */}
                        <div className="flex-1 w-full bg-transparent flex items-center px-4 py-2 transition-all">
                            <Calendar className="text-secondary mr-3" size={24} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Fechas</label>
                                <input
                                    type="text"
                                    placeholder="Check in - Check out"
                                    className="bg-transparent border-none outline-none text-primary font-serif font-bold text-lg w-full placeholder-gray-400"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                        {/* Travelers Input */}
                        <div className="flex-1 w-full bg-transparent flex items-center px-4 py-2 transition-all">
                            <Users className="text-secondary mr-3" size={24} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Viajeros</label>
                                <select className="bg-transparent border-none outline-none text-primary font-serif font-bold text-lg w-full appearance-none cursor-pointer">
                                    <option>2 Adultos, 0 Niños</option>
                                    <option>1 Adulto, 0 Niños</option>
                                    <option>2 Adultos, 2 Niños</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <Link to="/destinos" className="w-full md:w-auto bg-primary hover:bg-secondary text-white py-4 px-8 md:p-5 md:aspect-square rounded-xl md:rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-1">
                            <Search size={24} className="md:mr-0 mr-2" />
                            <span className="md:hidden block">Buscar Viajes</span>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
