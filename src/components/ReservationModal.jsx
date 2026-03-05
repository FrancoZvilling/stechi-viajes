import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send } from 'lucide-react';
import logoImg from '../assets/logo-navbar.jpg';

const ReservationModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                ></motion.div>

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ duration: 0.3, type: "spring", bounce: 0.2 }}
                    className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative z-10 border border-gray-100"
                >
                    {/* Decorative Watermark / Stamp */}
                    <div className="absolute -top-10 -right-10 opacity-[0.03] pointer-events-none rotate-12">
                        <img src={logoImg} alt="" className="w-64 h-64 object-contain" />
                    </div>

                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary to-secondary"></div>

                    <div className="p-8 relative">
                        {/* Header */}
                        <div className="flex justify-between items-start mb-8 relative z-10">
                            <div>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="w-24 md:w-32 mb-6"
                                >
                                    <img src={logoImg} alt="Stechi Tours Logo" className="w-full h-auto object-contain block" />
                                </motion.div>
                                <h3 className="text-2xl font-serif font-bold text-primary">Solicitar Reserva</h3>
                                <p className="text-sm font-sans text-gray-500 mt-1">Déjanos tus datos y nos pondremos en contacto a la brevedad.</p>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
                                aria-label="Cerrar modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Form */}
                        <form className="space-y-5 relative z-10" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                            <div>
                                <label className="block text-xs font-bold font-sans text-primary uppercase tracking-wider mb-2">Correo Electrónico</label>
                                <input
                                    type="email"
                                    required
                                    placeholder="ejemplo@correo.com"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-sans"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold font-sans text-primary uppercase tracking-wider mb-2">Teléfono</label>
                                <input
                                    type="tel"
                                    required
                                    placeholder="+54 9 11 1234-5678"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-sans"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold font-sans text-primary uppercase tracking-wider mb-2">Consulta</label>
                                <textarea
                                    required
                                    rows="4"
                                    placeholder="Ej: Hola, me interesa recibir más información y presupuesto sobre el viaje a [Destino / Promoción] para la fecha [DD/MM/AAAA] para [X] personas. ¿Podrían confirmarme si hay disponibilidad?"
                                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-sans resize-none"
                                    defaultValue="Hola, me interesa recibir más información y presupuesto sobre el viaje a [Destino] para la fecha [DD/MM/AAAA]. ¿Podrían confirmarme si hay disponibilidad?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary hover:bg-secondary text-white font-sans font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group mt-8"
                            >
                                <span>Enviar Solicitud</span>
                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ReservationModal;
