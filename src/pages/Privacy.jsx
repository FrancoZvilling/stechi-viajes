import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Privacy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-white pt-32 pb-24 font-sans text-gray-700">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 border-b pb-6">Políticas de Privacidad</h1>
                    
                    <div className="space-y-8 text-lg leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">1. Recopilación de Información</h2>
                            <p>
                                En Stechi Tours estamos comprometidos con proteger tu privacidad. Recopilamos información personal (como nombre, número de documento, fecha de nacimiento, correo electrónico y teléfono) únicamente cuando es proporcionada por los usuarios a través de formularios de contacto, reservas o suscripciones a nuestro newsletter.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">2. Uso de la Información</h2>
                            <p>
                                Los datos recopilados son utilizados exclusivamente para la cotización, emisión y prestación de los servicios turísticos solicitados. Eventualmente, podremos utilizar tu correo electrónico para enviar notificaciones sobre viajes, ofertas especiales o novedades importantes vinculadas a tus reservas.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">3. Compartición con Terceros</h2>
                            <p>
                                La información personal recabada no será vendida ni alquilada a terceros. Únicamente se compartirá la información estrictamente necesaria con los proveedores de servicios (aerolíneas, hoteles, seguros de viaje u operadores mayoristas) al momento de emitir un boleto o reserva a tu nombre, como lo exigen las leyes de transporte internacionales.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">4. Seguridad y Protección de Datos</h2>
                            <p>
                                Aplicamos medidas de seguridad administrativas y técnicas para proteger su información personal frente a accesos no autorizados, pérdidas o alteraciones. Sin embargo, ninguna transmisión por Internet es 100% segura; por lo tanto, no podemos garantizar la seguridad absoluta en la red.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">5. Derechos del Usuario</h2>
                            <p>
                                Tienes derecho a solicitar el acceso, rectificación, actualización o eliminación de tus datos personales alojados en nuestras bases de contacto en cualquier momento, enviándonos una solicitud a través de nuestros canales oficiales de comunicación.
                            </p>
                        </section>
                        
                        <p className="text-sm text-gray-500 mt-12 bg-gray-50 p-4 rounded-xl">
                            Última actualización: {new Date().toLocaleDateString('es-AR')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Privacy;
