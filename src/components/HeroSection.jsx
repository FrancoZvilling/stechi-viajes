import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useTrips } from '../hooks/useTrips';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HeroSection = () => {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const { trips, isLoading } = useTrips();

    // Filter states
    const [selectedCountry, setSelectedCountry] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);
    const [startDate, endDate] = dateRange;
    const [selectedPassengers, setSelectedPassengers] = useState('Cualquiera');

    // Get unique countries for the dropdown
    const countries = [...new Set(trips.map(t => t.country).filter(Boolean))].sort();
    
    // Get trips marked for Hero and format them
    const slides = trips
        .filter(trip => trip.isHero)
        .map(pkg => ({
            id: pkg.id,
            image: pkg.image || 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop',
            title: pkg.title,
            subtitle: pkg.shortDescription || pkg.description,
            discount: pkg.originalPrice ? 'OFERTA ESPECIAL' : 'DESTACADO'
        }));

    useEffect(() => {
        if (slides.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [currentSlide, slides.length]);

    const nextSlide = () => { if (slides.length > 0) setCurrentSlide((prev) => (prev + 1) % slides.length) };
    const prevSlide = () => { if (slides.length > 0) setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1)) };

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (selectedCountry) params.append('country', selectedCountry);
        if (startDate) params.append('start', startDate.toISOString());
        if (endDate) params.append('end', endDate.toISOString());
        if (selectedPassengers !== 'Cualquiera') params.append('passengers', selectedPassengers);
        
        navigate(`/destinos?${params.toString()}`);
    };

    return (
        <section className="relative h-[85vh] min-h-[650px] w-full flex items-center justify-center overflow-visible">
            {/* Carousel Backgrounds & Text */}
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-b-[40px] shadow-xl">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-primary flex items-center justify-center flex-col text-white z-10"
                        >
                           <div className="w-16 h-16 border-4 border-white/20 border-t-secondary rounded-full animate-spin mb-6 shadow-lg"></div>
                           <h2 className="font-serif text-2xl md:text-3xl font-bold tracking-wide animate-pulse">Cargando destinos destacados...</h2>
                           <p className="font-sans text-sm text-white/60 mt-2">Preparando tu próxima aventura</p>
                        </motion.div>
                    ) : slides.length > 0 ? (
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 1.05 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute inset-0"
                        >
                            {/* Gradients to ensure text is readable */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
                            <img
                                src={slides[currentSlide].image}
                                alt={slides[currentSlide].title}
                                className="w-full h-full object-cover"
                            />

                            {/* Hero Text Content */}
                            <div className="absolute inset-0 z-20 flex items-center">
                                <div className="container mx-auto px-6 md:px-12 w-full">
                                    <div className="max-w-2xl">
                                        <motion.span
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="inline-block px-5 py-1.5 bg-secondary text-white font-sans font-bold text-sm md:text-base rounded-full mb-6 shadow-[0_4px_14px_0_rgba(0,0,0,0.39)] uppercase tracking-[0.2em]"
                                        >
                                            {slides[currentSlide].discount}
                                        </motion.span>
                                        <motion.h1
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                        >
                                            {slides[currentSlide].title}
                                        </motion.h1>
                                        <motion.p
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.7 }}
                                            className="text-xl md:text-2xl text-white/95 font-sans mb-10 max-w-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-medium line-clamp-2 md:line-clamp-none"
                                        >
                                            {slides[currentSlide].subtitle}
                                        </motion.p>
                                        {/* Botón y Controles Móviles integrados */}
                                        <div className="flex items-center gap-4">
                                            <button onClick={prevSlide} className="md:hidden bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-all">
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>

                                            <motion.div
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.9 }}
                                            >
                                                <Link 
                                                    to={`/paquete/${slides[currentSlide].id}`}
                                                    className="bg-white/20 hover:bg-white text-white hover:text-primary backdrop-blur-md border border-white/40 font-sans font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg flex items-center gap-2 group w-max"
                                                >
                                                    Ver Viaje
                                                    <ChevronRight size={18} className="hidden md:block group-hover:translate-x-1 transition-transform" />
                                                </Link>
                                            </motion.div>

                                            <button onClick={nextSlide} className="md:hidden bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 rounded-full transition-all">
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="empty"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-primary flex items-center justify-center flex-col text-white/50 z-10"
                        >
                           <ImageIcon size={64} className="mb-4 opacity-50" />
                           <p className="font-sans text-xl font-medium tracking-wide">Agrega viajes marcados "En Hero" desde tu panel</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Carousel Controls - ONLY DESKTOP */}
                <button onClick={prevSlide} className="hidden md:block absolute left-4 md:left-8 top-1/2 md:-translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all">
                    <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                <button onClick={nextSlide} className="hidden md:block absolute right-4 md:right-8 top-1/2 md:-translate-y-1/2 z-30 bg-white/10 hover:bg-white/30 backdrop-blur-md text-white p-2 md:p-3 rounded-full transition-all">
                    <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 flex gap-2 w-max">
                    {slides.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentSlide(i)}
                            className={`h-2 rounded-full transition-all ${currentSlide === i ? 'w-10 bg-secondary' : 'w-3 bg-white/50'}`}
                        />
                    ))}
                </div>
            </div>

            {/* Travel Search Component moved to the boundary */}
            <div className="absolute bottom-0 left-0 w-full translate-y-1/2 z-40 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="bg-white/90 backdrop-blur-xl rounded-2xl md:rounded-full p-3 md:p-4 max-w-5xl mx-auto shadow-2xl border border-white/50"
                >
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
                        {/* Destination Input */}
                        <div className="flex-1 w-full bg-transparent flex items-center px-4 py-2 transition-all">
                            <MapPin className="text-secondary mr-3" size={24} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Destino</label>
                                <select 
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    className="bg-transparent border-none outline-none text-primary font-serif font-bold text-lg w-full appearance-none cursor-pointer"
                                >
                                    <option value="">¿A dónde quieres ir?</option>
                                    {countries.map(country => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                        {/* Date Input */}
                        <div className="flex-1 w-full bg-transparent flex items-center px-4 py-2 transition-all">
                            <Calendar className="text-secondary mr-3" size={24} />
                            <div className="flex flex-col text-left w-full relative z-[60]">
                                <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Fechas</label>
                                <DatePicker
                                    selectsRange={true}
                                    startDate={startDate}
                                    endDate={endDate}
                                    onChange={(update) => setDateRange(update)}
                                    isClearable={true}
                                    placeholderText="Check in - Check out"
                                    className="bg-transparent border-none outline-none text-primary font-serif font-bold text-lg w-full placeholder-gray-400 cursor-pointer"
                                    dateFormat="dd/MM/yyyy"
                                />
                            </div>
                        </div>

                        <div className="hidden md:block w-px h-10 bg-gray-200"></div>

                        {/* Travelers Input */}
                        <div className="flex-1 w-full bg-transparent flex items-center px-4 py-2 transition-all">
                            <Users className="text-secondary mr-3" size={24} />
                            <div className="flex flex-col text-left w-full">
                                <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider">Viajeros</label>
                                <select 
                                    value={selectedPassengers}
                                    onChange={(e) => setSelectedPassengers(e.target.value)}
                                    className="bg-transparent border-none outline-none text-primary font-serif font-bold text-lg w-full appearance-none cursor-pointer"
                                >
                                    <option value="Cualquiera">Cualquiera</option>
                                    <option value="1 Adulto">1 Adulto</option>
                                    <option value="2 Adultos">2 Adultos</option>
                                    <option value="2 Adultos, 1 Niño">2 Adultos, 1 Niño</option>
                                    <option value="2 Adultos, 2 Niños">2 Adultos, 2 Niños</option>
                                    <option value="Familia Numerosa">Familia Numerosa</option>
                                    <option value="Solo Adultos">Solo Adultos</option>
                                </select>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button type="submit" className="w-full md:w-auto bg-primary hover:bg-secondary text-white py-4 px-8 md:p-5 md:aspect-square rounded-xl md:rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center transform hover:-translate-y-1">
                            <Search size={24} className="md:mr-0 mr-2" />
                            <span className="md:hidden block">Buscar Viajes</span>
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSection;
