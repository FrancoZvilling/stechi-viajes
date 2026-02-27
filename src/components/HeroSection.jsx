import React from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const HeroSection = () => {
    return (
        <section className="relative h-screen min-h-[600px] flex items-center justify-center pt-20">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                    alt="Travel Destination"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-transparent"></div>
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 text-center w-full max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="text-secondary font-sans font-bold tracking-[0.2em] uppercase text-sm md:text-base drop-shadow-md">
                        Descubre el mundo con nosotros
                    </span>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mt-4 mb-8 leading-tight drop-shadow-lg">
                        Viaja más allá <br className="hidden md:block" /> de tus sueños
                    </h1>
                </motion.div>

                {/* Travel Search Component (Glassmorphism) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="glass rounded-3xl p-4 md:p-6 mt-10 max-w-4xl mx-auto shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row gap-4 items-center">

                        {/* Destination Input */}
                        <div className="flex-1 w-full bg-white/60 rounded-xl flex items-center px-4 py-3 border border-white/40 focus-within:ring-2 focus-within:ring-secondary transition-all">
                            <MapPin className="text-primary mr-3" size={20} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-primary uppercase tracking-wider">Destino</label>
                                <input
                                    type="text"
                                    placeholder="¿A dónde quieres ir?"
                                    className="bg-transparent border-none outline-none text-gray-800 font-sans font-medium w-full placeholder-gray-500"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-gray-300"></div>

                        {/* Date Input */}
                        <div className="flex-1 w-full bg-white/60 rounded-xl flex items-center px-4 py-3 border border-white/40 focus-within:ring-2 focus-within:ring-secondary transition-all">
                            <Calendar className="text-primary mr-3" size={20} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-primary uppercase tracking-wider">Fechas</label>
                                <input
                                    type="text"
                                    placeholder="Check in - Check out"
                                    className="bg-transparent border-none outline-none text-gray-800 font-sans font-medium w-full placeholder-gray-500"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-12 bg-gray-300"></div>

                        {/* Travelers Input */}
                        <div className="flex-1 w-full bg-white/60 rounded-xl flex items-center px-4 py-3 border border-white/40 focus-within:ring-2 focus-within:ring-secondary transition-all">
                            <Users className="text-primary mr-3" size={20} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-primary uppercase tracking-wider">Viajeros</label>
                                <select className="bg-transparent border-none outline-none text-gray-800 font-sans font-medium w-full appearance-none">
                                    <option>2 Adultos, 0 Niños</option>
                                    <option>1 Adulto, 0 Niños</option>
                                    <option>2 Adultos, 2 Niños</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button className="w-full md:w-auto bg-primary hover:bg-secondary text-white p-4 rounded-xl font-bold transition-colors shadow-lg flex items-center justify-center">
                            <Search size={24} />
                        </button>

                    </div>
                </motion.div>
            </div>

        </section>
    );
};

export default HeroSection;
