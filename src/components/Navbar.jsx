import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logoImg from '../assets/logo-navbar.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', href: '#' },
        { name: 'Destinos', href: '#destinos' },
        { name: 'Promociones', href: '#promociones' },
        { name: 'Eventos', href: '#eventos' },
        { name: 'Contacto', href: '#contacto' },
    ];

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
                }`}
        >
            {/* Added -mt-1 to manually offset the content slightly upwards */}
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center -mt-1">
                {/* Logo Area */}
                <a href="#" className="flex items-center gap-2 group">
                    <div className="w-16 h-auto md:w-20 transition-transform hover:scale-105 flex items-center justify-center shrink-0">
                        <img src={logoImg} alt="Stechi Tours Logo" className="w-full h-auto object-contain block" />
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-serif text-2xl font-bold leading-none ${isScrolled ? 'text-primary' : 'text-primary drop-shadow-sm'}`}>
                            Stechi Tours
                        </span>
                        <span className={`font-sans tracking-widest text-[0.65rem] font-semibold leading-none ${isScrolled ? 'text-secondary' : 'text-secondary drop-shadow-sm'}`}>
                            VIAJES Y TURISMO
                        </span>
                    </div>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className={`font-sans font-medium text-sm transition-colors hover:text-secondary ${isScrolled ? 'text-gray-700' : 'text-gray-900'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                    <button className="bg-primary hover:bg-secondary text-white font-sans font-semibold py-2 px-6 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        Reservar
                    </button>
                </nav>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden text-primary"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.nav
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 gap-6 md:hidden border-t border-gray-100"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="font-sans font-semibold text-gray-800 text-lg hover:text-secondary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        <button className="bg-primary text-white font-sans font-bold py-3 px-8 rounded-full mt-2 shadow-lg">
                            Reservar Ahora
                        </button>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
