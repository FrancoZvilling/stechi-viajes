import React from 'react';
import { Facebook, Instagram, Twitter, Linkedin, Heart } from 'lucide-react';
import logoImg from '../assets/logo-navbar.jpg';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-20 pb-10 border-t-4 border-secondary">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col">
                        <a href="#" className="flex items-center gap-2 mb-6 group">
                            <div className="w-16 h-auto md:w-20 transition-transform hover:scale-105 flex items-center justify-center shrink-0 bg-white p-1 rounded-xl">
                                <img src={logoImg} alt="Stechi Tours Logo" className="w-full h-auto object-contain block rounded-lg" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold leading-none text-white tracking-wider">
                                    Stechi Tours
                                </span>
                                <span className="font-sans tracking-[0.3em] text-[0.6rem] font-bold leading-none text-secondary">
                                    VIAJES Y TURISMO
                                </span>
                            </div>
                        </a>
                        <p className="font-sans text-white/70 text-sm leading-relaxed mb-6">
                            Hacemos realidad tus sueños de viaje con experiencias únicas y personalizadas. Tu próxima aventura comienza aquí.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors">
                                <Linkedin size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="font-serif font-bold text-xl mb-6 relative inline-block">
                            Navegación
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
                        </h4>
                        <ul className="space-y-3 font-sans text-white/80">
                            <li><a href="#" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Inicio</a></li>
                            <li><a href="#destinos" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Destinos Destacados</a></li>
                            <li><a href="#promociones" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Promociones</a></li>
                            <li><a href="#eventos" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Eventos Globales</a></li>
                            <li><a href="#contacto" className="hover:text-secondary hover:translate-x-1 inline-block transition-all">Contacto</a></li>
                        </ul>
                    </div>

                    {/* Useful Links Column */}
                    <div>
                        <h4 className="font-serif font-bold text-xl mb-6 relative inline-block">
                            Enlaces Útiles
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
                        </h4>
                        <ul className="space-y-3 font-sans text-white/80">
                            <li><a href="#" className="hover:text-secondary inline-block transition-colors">Asistencia al Viajero</a></li>
                            <li><a href="#" className="hover:text-secondary inline-block transition-colors">Medios de Pago</a></li>
                            <li><a href="#" className="hover:text-secondary inline-block transition-colors">Preguntas Frecuentes</a></li>
                            <li><a href="#" className="hover:text-secondary inline-block transition-colors">Términos y Condiciones</a></li>
                            <li><a href="#" className="hover:text-secondary inline-block transition-colors">Políticas de Privacidad</a></li>
                        </ul>
                    </div>

                    {/* Newsletter Column */}
                    <div>
                        <h4 className="font-serif font-bold text-xl mb-6 relative inline-block">
                            Newsletter
                            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-secondary rounded-full"></span>
                        </h4>
                        <p className="font-sans text-white/70 text-sm mb-4">
                            Suscríbete para recibir las mejores ofertas y promociones exclusivas.
                        </p>
                        <form className="flex flex-col gap-3">
                            <input
                                type="email"
                                placeholder="Tu correo electrónico"
                                className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-sans"
                            />
                            <button className="bg-secondary hover:bg-white hover:text-primary font-bold py-3 rounded-xl transition-colors font-sans w-full">
                                Suscribirme
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="font-sans text-white/50 text-xs text-center w-full">
                        &copy; {new Date().getFullYear()} Stechi Tours Viajes y Turismo. Legajo N° 12345. Todos los derechos reservados.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
