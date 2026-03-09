import React from 'react';
import { motion } from 'framer-motion';
import { Users, Globe, Award, Sparkles } from 'lucide-react';

const Nosotros = () => {
    return (
        <div className="relative min-h-screen bg-gray-50 pt-24 pb-20 overflow-hidden">
            {/* Decorative Floating Clouds */}
            <div className="absolute top-40 left-10 opacity-40 pointer-events-none animate-[float_8s_ease-in-out_infinite]">
                <svg width="120" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-secondary drop-shadow-lg">
                    <path d="M17.5 19c2.48 0 4.5-2.02 4.5-4.5S19.98 10 17.5 10c-.3 0-.58.05-.85.11C15.82 7.74 13.56 6 11 6c-3.31 0-6 2.69-6 6 0 .28.02.55.06.81C2.73 13.25 1 15.42 1 18c0 2.76 2.24 5 5 5h11.5z" />
                </svg>
            </div>
            <div className="absolute top-20 right-20 opacity-30 pointer-events-none animate-[float_10s_ease-in-out_infinite_reverse]">
                <svg width="160" height="100" viewBox="0 0 24 24" fill="currentColor" className="text-secondary drop-shadow-xl">
                    <path d="M17.5 19c2.48 0 4.5-2.02 4.5-4.5S19.98 10 17.5 10c-.3 0-.58.05-.85.11C15.82 7.74 13.56 6 11 6c-3.31 0-6 2.69-6 6 0 .28.02.55.06.81C2.73 13.25 1 15.42 1 18c0 2.76 2.24 5 5 5h11.5z" />
                </svg>
            </div>
            <div className="absolute bottom-40 left-1/4 opacity-20 pointer-events-none animate-[float_12s_ease-in-out_infinite]">
                <svg width="200" height="130" viewBox="0 0 24 24" fill="currentColor" className="text-secondary drop-shadow-md">
                    <path d="M17.5 19c2.48 0 4.5-2.02 4.5-4.5S19.98 10 17.5 10c-.3 0-.58.05-.85.11C15.82 7.74 13.56 6 11 6c-3.31 0-6 2.69-6 6 0 .28.02.55.06.81C2.73 13.25 1 15.42 1 18c0 2.76 2.24 5 5 5h11.5z" />
                </svg>
            </div>

            <div className="container mx-auto px-6 relative z-10">

                {/* Header Section */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-block px-5 py-1.5 bg-blue-50 text-secondary font-sans font-bold text-sm rounded-full mb-6 uppercase tracking-[0.2em] shadow-sm border border-blue-100"
                    >
                        Nuestra Historia
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-primary mb-6 drop-shadow-sm"
                    >
                        Conoce a <span className="text-secondary">Stechi Tours</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-gray-600 font-sans max-w-3xl mx-auto leading-relaxed"
                    >
                        Más que una agencia de viajes, somos diseñadores de experiencias. Transformamos tus sueños en itinerarios perfectos para que solo te preocupes por disfrutar.
                    </motion.p>
                </div>

                {/* Content Section with Glassmorphism */}
                <div className="flex flex-col lg:flex-row gap-12 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute inset-0 bg-secondary rounded-[3rem] transform rotate-3 scale-105 opacity-20"></div>
                        <img
                            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop"
                            alt="Equipo de Stechi Tours"
                            className="relative w-full h-[500px] object-cover rounded-[3rem] shadow-2xl border-4 border-white z-10"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                        className="lg:w-1/2 space-y-8"
                    >
                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white">
                            <h3 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-3">
                                <Sparkles className="text-secondary" /> ¿Quiénes Somos?
                            </h3>
                            <p className="text-gray-600 font-sans leading-relaxed">
                                Nacimos con la pasión de explorar el mundo y la vocación de compartirlo. En Stechi Tours estamos formados por viajeros expertos que recorren el globo buscando los mejores destinos y alojamientos, garantizando que cada ruta propuesta tiene el sello de calidad que tú mereces.
                            </p>
                        </div>

                        <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-white">
                            <h3 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-3">
                                <Award className="text-secondary" /> ¿Por qué Elegirnos?
                            </h3>
                            <p className="text-gray-600 font-sans leading-relaxed">
                                A diferencia de las plataformas automatizadas, nosotros te ofrecemos soporte humano, real y dedicado. Estudiamos tus gustos, gestionamos la logística pesada y te acompañamos desde que consultas la disponibilidad hasta que regresas felizmente a casa.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Stats Section */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
                >
                    <div className="bg-primary text-white text-center p-8 rounded-3xl shadow-xl transform transition-transform hover:-translate-y-2">
                        <Users size={40} className="mx-auto mb-4 text-secondary" />
                        <h4 className="text-4xl font-black font-sans mb-2">+5,000</h4>
                        <p className="font-serif text-white/80">Viajeros Felices</p>
                    </div>
                    <div className="bg-primary text-white text-center p-8 rounded-3xl shadow-xl transform transition-transform hover:-translate-y-2">
                        <Globe size={40} className="mx-auto mb-4 text-secondary" />
                        <h4 className="text-4xl font-black font-sans mb-2">+50</h4>
                        <p className="font-serif text-white/80">Destinos Globales</p>
                    </div>
                    <div className="bg-primary text-white text-center p-8 rounded-3xl shadow-xl transform transition-transform hover:-translate-y-2">
                        <Award size={40} className="mx-auto mb-4 text-secondary" />
                        <h4 className="text-4xl font-black font-sans mb-2">10</h4>
                        <p className="font-serif text-white/80">Años de Trayectoria</p>
                    </div>
                </motion.div>

            </div>
        </div>
    );
};

export default Nosotros;
