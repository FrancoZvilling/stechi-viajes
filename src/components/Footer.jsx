import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Heart } from 'lucide-react';
import logoImg from '../assets/logo-navbar.jpg';

const Footer = () => {
    return (
        <footer className="bg-primary text-white pt-20 pb-10 border-t-4 border-secondary">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="flex flex-col items-center text-center">
                        <a href="#" className="flex flex-col items-center gap-3 mb-6 group">
                            <div className="w-16 h-auto md:w-20 transition-transform hover:scale-105 flex items-center justify-center shrink-0 bg-white p-1 rounded-xl">
                                <img src={logoImg} alt="Stechi Tours Logo" className="w-full h-auto object-contain block rounded-lg" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif text-2xl font-bold leading-none text-white tracking-wider">
                                    Stechi Tours
                                </span>
                                <span className="font-sans tracking-[0.3em] text-[0.6rem] font-bold leading-none text-secondary mt-1">
                                    VIAJES Y TURISMO
                                </span>
                            </div>
                        </a>
                        <p className="font-sans text-white/70 text-sm leading-relaxed mb-6">
                            Hacemos realidad tus sueños de viaje con experiencias únicas y personalizadas. Tu próxima aventura comienza aquí.
                        </p>
                        <div className="flex justify-center gap-4">
                            <a href="#" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
                                <Facebook size={20} />
                            </a>
                            <a href="https://www.instagram.com/stechitours?igsh=MXcyZjVlN2hubjBsbA==" target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-secondary p-2 rounded-full transition-colors cursor-pointer">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Links Column */}
                    <div className="flex flex-col items-center text-center">
                        <h4 className="font-serif font-bold text-xl mb-6 relative inline-block">
                            Navegación
                            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-secondary rounded-full"></span>
                        </h4>
                        <ul className="space-y-3 font-sans text-white/80">
                            <li><Link to="/" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Inicio</Link></li>
                            <li><Link to="/#destinos" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Destinos Destacados</Link></li>
                            <li><Link to="/#partners" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Nuestros Partners</Link></li>
                            <li><Link to="/#eventos" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Experiencias y Eventos Globales</Link></li>
                            <li><Link to="/#contacto" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Contacto</Link></li>
                        </ul>
                    </div>

                    {/* Useful Links Column */}
                    <div className="flex flex-col items-center text-center">
                        <h4 className="font-serif font-bold text-xl mb-6 relative inline-block">
                            Enlaces Útiles
                            <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-secondary rounded-full"></span>
                        </h4>
                        <ul className="space-y-3 font-sans text-white/80">
                            <li><Link to="/faq" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Preguntas Frecuentes</Link></li>
                            <li><Link to="/terminos" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Términos y Condiciones</Link></li>
                            <li><Link to="/privacidad" className="hover:text-secondary hover:-translate-y-0.5 inline-block transition-all cursor-pointer">Políticas de Privacidad</Link></li>
                        </ul>
                    </div>


                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <p className="font-sans text-white/50 text-xs">
                        &copy; {new Date().getFullYear()} Stechi Tours Viajes y Turismo. Legajo: 18672. Todos los derechos reservados.
                    </p>
                    <a
                        href="https://wa.me/5493541315119"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-white/50 text-xs hover:text-white transition-colors flex items-center gap-1 group"
                    >
                        Desarrollado por <span className="text-secondary font-semibold">Franco Zvilling</span>
                        <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">🚀</span>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
