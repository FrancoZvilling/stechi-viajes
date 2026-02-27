import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';

const contactInfo = {
    address: 'Av. Corrientes 1234, CABA, Argentina',
    phone: '+54 11 4321-5678',
    email: 'contacto@stechitours.com',
    hours: 'Lun a Vie: 9:00 - 18:00 hs',
    whatsapp: '+54 9 11 1234-5678',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3283.9936886915243!2d-58.38450168477026!3d-34.603738865008535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac813f28205%3A0xc47b9ee3f0407a56!2sObelisco!5e0!3m2!1ses-419!2sar!4v1655385621482!5m2!1ses-419!2sar'
};

const LocationsSection = () => {
    return (
        <section id="contacto" className="py-24 bg-gray-50 relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4"
                    >
                        Contáctanos
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
                        Estamos aquí para ayudarte a planificar tu próximo gran viaje. Déjanos un mensaje o visítanos en nuestra oficina central.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                    {/* Columna Izquierda: Información de Contacto */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100"
                    >
                        <h3 className="text-2xl font-serif font-bold text-primary mb-8 border-b border-gray-100 pb-4">
                            Nuestra Oficina
                        </h3>

                        <ul className="space-y-6 font-sans text-gray-600 mb-10">
                            <li className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <MapPin size={22} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-1">Dirección</h4>
                                    <span>{contactInfo.address}</span>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <Phone size={22} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-1">Teléfono</h4>
                                    <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-secondary transition-colors">
                                        {contactInfo.phone}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <Mail size={22} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-1">Correo Electrónico</h4>
                                    <a href={`mailto:${contactInfo.email}`} className="hover:text-secondary transition-colors">
                                        {contactInfo.email}
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-4">
                                <div className="bg-blue-50 p-3 rounded-full text-secondary">
                                    <Clock size={22} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-primary mb-1">Horarios de Atención</h4>
                                    <span>{contactInfo.hours}</span>
                                </div>
                            </li>
                        </ul>

                        <div className="border-t border-gray-100 pt-8">
                            <h4 className="font-sans font-bold text-primary mb-4 uppercase tracking-wider text-sm">
                                Síguenos en nuestras redes
                            </h4>
                            <div className="flex gap-4">
                                <a href="#" className="bg-primary/5 hover:bg-primary text-primary hover:text-white p-3 rounded-full transition-all shadow-sm">
                                    <Facebook size={22} />
                                </a>
                                <a href="#" className="bg-primary/5 hover:bg-primary text-primary hover:text-white p-3 rounded-full transition-all shadow-sm">
                                    <Instagram size={22} />
                                </a>
                                <a href="#" className="bg-primary/5 hover:bg-primary text-primary hover:text-white p-3 rounded-full transition-all shadow-sm">
                                    <Twitter size={22} />
                                </a>
                            </div>
                        </div>

                        <button className="mt-8 w-full bg-[#25D366] hover:bg-[#1ebd5b] text-white font-sans font-bold py-4 px-6 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 group">
                            <MessageCircle size={24} className="group-hover:scale-110 transition-transform" />
                            Chatear por WhatsApp
                        </button>
                    </motion.div>

                    {/* Columna Derecha: Mapa */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="h-[500px] lg:h-full w-full bg-gray-200 rounded-3xl overflow-hidden shadow-xl border border-gray-100 relative group"
                    >
                        <iframe
                            src={contactInfo.mapUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out hover:grayscale-0 absolute inset-0"
                            title="Mapa de la Oficina Central"
                        ></iframe>

                        {/* Overlay sutil que se desvanece en hover */}
                        <div className="absolute inset-0 bg-primary/10 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default LocationsSection;
