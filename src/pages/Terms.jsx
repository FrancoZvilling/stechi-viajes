import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const Terms = () => {
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
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-8 border-b pb-6">Términos y Condiciones</h1>
                    
                    <div className="space-y-8 text-lg leading-relaxed">
                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">1. Aspectos Generales</h2>
                            <p>
                                Las presentes condiciones generales rigen las relaciones entre Stechi Tours (en adelante "la Agencia") y los pasajeros que contratan nuestros servicios. La solicitud de reserva implica el conocimiento y aceptación de estos términos y condiciones.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">2. Reservas y Pagos</h2>
                            <p>
                                Toda reserva quedará confirmada únicamente tras el pago de la seña o pago total estipulado en la cotización. Los precios indicados no incluyen gastos bancarios, impuestos adicionales en destino ni tasas turísticas locales no especificadas. En caso de variaciones cambiales significativas o subida de tarifas de los prestadores de servicio, la Agencia se reserva el derecho de ajustar los precios hasta la cancelación total del viaje.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">3. Alteraciones y Cancelaciones</h2>
                            <p>
                                <strong>Por parte del pasajero:</strong> En caso de desistimiento, el pasajero deberá abonar los gastos de gestión de la Agencia más los gastos de anulación aplicados por los proveedores finales (aerolíneas, hoteles, mayoristas). En casos de tarifas "No Reembolsables", se perderá el 100% de lo abonado.
                                <br/><br/>
                                <strong>Por parte de la Agencia:</strong> La Agencia podrá alterar itinerarios, hoteles o servicios si razones de fuerza mayor, seguridad o climáticas lo exigen, buscando siempre el mayor beneficio para el pasajero.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">4. Documentación y Trámites</h2>
                            <p>
                                Es responsabilidad exclusiva y absoluta de cada pasajero contar con la documentación personal vigente, visas, vacunas o requisitos migratorios exigidos por el país de destino o tránsito. La Agencia provee asesoramiento comercial pero no se responsabiliza por rechazos migratorios o gastos derivados de la falta de documentación adecuada.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-serif font-bold text-primary mb-4">5. Responsabilidad</h2>
                            <p>
                                Stechi Tours actúa como intermediario entre los pasajeros y las entidades prestadoras de servicios (compañías aéreas, hoteles, transportistas). Por consiguiente, declinamos toda responsabilidad por accidentes, daños, pérdidas, retrasos o imprevistos derivados del accionar de terceros, fenómenos climáticos, huelgas u otros eventos de fuerza mayor ajenos al control de la Agencia.
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

export default Terms;
