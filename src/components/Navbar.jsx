import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logoImg from '../assets/logo-navbar.jpg';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onOpenModal }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (location.hash) {
            const element = document.querySelector(location.hash);
            if (element) {
                // Pequeño timeout para dar tiempo a que la página Home renderice si viene de Otra pagina
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'smooth' });
                }, 100);
            }
        } else if (location.pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
    }, [location]);

    const navLinks = [
        { name: 'Inicio', href: '/' },
        { name: 'Nosotros', href: '/nosotros' },
        { name: 'Destinos', href: '/#destinos' },
        { name: 'Promociones', href: '/#promociones' },
        { name: 'Eventos', href: '/#eventos' },
        { name: 'Contacto', href: '/#contacto' },
    ];

    const isCurrentPage = (href) => {
        if (href === '/') return location.pathname === '/' && !location.hash;
        if (href.startsWith('/#')) return location.hash === href.substring(1);
        return location.pathname === href;
    };

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white py-3 ${isScrolled ? 'shadow-md' : ''}`}
        >
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                {/* Logo Area */}
                <Link to="/" className="flex items-center group">
                    <div className="h-12 md:h-16 transition-transform hover:scale-105 flex items-center justify-center shrink-0">
                        <img src={logoImg} alt="Stechi Tours Logo" className="h-full w-auto object-contain block" />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => {
                        const active = isCurrentPage(link.href);
                        return (
                            <Link
                                key={link.name}
                                to={link.href}
                                className={`font-sans font-medium text-sm transition-colors ${active ? 'text-secondary font-bold' : 'text-gray-700 hover:text-secondary'}`}
                            >
                                {link.name}
                            </Link>
                        );
                    })}
                    <button
                        onClick={onOpenModal}
                        className="bg-primary hover:bg-secondary text-white font-sans font-semibold py-2 px-6 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
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
                        {navLinks.map((link) => {
                            const active = isCurrentPage(link.href);
                            return (
                                <Link
                                    key={link.name}
                                    to={link.href}
                                    className={`font-sans font-semibold text-lg hover:text-secondary transition-colors ${active ? 'text-secondary' : 'text-gray-800'}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                        <button
                            onClick={() => {
                                setMobileMenuOpen(false);
                                onOpenModal();
                            }}
                            className="bg-primary text-white font-sans font-bold py-3 px-8 rounded-full mt-2 shadow-lg"
                        >
                            Reservar Ahora
                        </button>
                    </motion.nav>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
