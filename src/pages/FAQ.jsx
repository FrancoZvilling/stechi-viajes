import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const faqs = [
    { q: "✈️ ¿Cómo empiezo a organizar mi viaje?", a: "Podés contactarnos a través del formulario, WhatsApp o redes. A partir de ahí, te hacemos algunas preguntas para entender lo que buscás y empezamos a diseñar tu viaje a medida." },
    { q: "🌍 ¿Los viajes son personalizados?", a: "Todos nuestros viajes se adaptan a cada cliente. Nos enfocamos en tus gustos, presupuesto y tiempos para crear una experiencia única." },
    { q: "💳 ¿Qué formas de pago aceptan?", a: "Trabajamos con diferentes medios de pago: transferencias, tarjetas y opciones de financiación según el servicio. Te asesoramos en cada caso para que elijas la mejor opción." },
    { q: "🧳 ¿Qué incluye el servicio de la agencia?", a: "Nos encargamos de todo: vuelos, alojamiento, traslados, asistencia al viajero y asesoramiento completo antes, durante y después del viaje." },
    { q: "🛫 ¿Puedo comprar solo vuelos o solo hotel?", a: "Sí, podés contratar servicios individuales o paquetes completos, según lo que necesites." },
    { q: "🧾 ¿El precio final incluye todos los impuestos?", a: "Sí, siempre te informamos el precio final con todos los impuestos incluidos, sin sorpresas." },
    { q: "📞 ¿Tengo asistencia durante el viaje?", a: "Sí, estamos disponibles para acompañarte también durante tu viaje ante cualquier duda o imprevisto." },
    { q: "🌎 ¿Trabajan con destinos nacionales e internacionales?", a: "Sí, organizamos viajes dentro de Argentina y a destinos internacionales." },
    { q: "👨‍👩‍👧 ¿Organizan viajes para familias o grupos?", a: "Sí, diseñamos viajes para familias, parejas, amigos o grupos, adaptándonos a cada necesidad." }
];

const FAQ = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-24">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-6">Preguntas Frecuentes</h1>
                    <p className="text-lg text-gray-600 font-sans">
                        Resolvemos tus dudas principales para que empieces a planificar tu próxima aventura con total tranquilidad.
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                            className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                        >
                            <h3 className="text-xl font-serif font-bold text-primary mb-3">
                                {faq.q}
                            </h3>
                            <p className="text-gray-600 font-sans leading-relaxed">
                                {faq.a}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center bg-blue-50 rounded-3xl p-8 border border-blue-100"
                >
                    <h4 className="text-xl font-serif font-bold text-primary mb-2">¿Tenés alguna otra duda?</h4>
                    <p className="text-gray-600 font-sans mb-6">Estamos a un mensaje de distancia para ayudarte.</p>
                    <a href="https://wa.me/5493412517677?text=Hola,%20tengo%20una%20duda%20sobre%20un%20viaje" target="_blank" rel="noopener noreferrer" className="inline-block bg-secondary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:-translate-y-1">
                        Contactate
                    </a>
                </motion.div>
            </div>
        </div>
    );
};

export default FAQ;
