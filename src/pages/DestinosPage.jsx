import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Filter, Plane, X } from 'lucide-react';

// Hardcoded data with 15 destinations
const allDestinations = [
    { id: 1, title: 'Escapada a Ibiza', price: 'USD 1,500', originalPrice: 'USD 1,800', continent: 'Europa', country: 'España', type: 'Playa', image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?q=80&w=2069&auto=format&fit=crop', description: 'Disfruta de las mejores fiestas y playas del Mediterráneo.' },
    { id: 2, title: 'Paraíso en Cancún', price: 'USD 890', originalPrice: 'USD 1,100', continent: 'América', country: 'México', type: 'Playa', image: 'https://images.unsplash.com/photo-1552074284-5e88ef1aef18?q=80&w=1974&auto=format&fit=crop', description: 'Aguas cristalinas y resorts all-inclusive te esperan.' },
    { id: 3, title: 'Aventura en Bariloche', price: 'USD 450', originalPrice: null, continent: 'América', country: 'Argentina', type: 'Montaña', image: 'https://images.unsplash.com/photo-1598162480222-b2c3d92548d5?q=80&w=1170&auto=format&fit=crop', description: 'Nieve, lagos y el mejor chocolate artesanal del sur.' },
    { id: 4, title: 'Roma Histórica', price: 'USD 1,200', originalPrice: 'USD 1,400', continent: 'Europa', country: 'Italia', type: 'Ciudad', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop', description: 'Camina por las calles del Imperio Romano y degusta la mejor pasta.' },
    { id: 5, title: 'Compras en Miami', price: 'USD 950', originalPrice: null, continent: 'América', country: 'Estados Unidos', type: 'Playa', image: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?q=80&w=2070&auto=format&fit=crop', description: 'Sol, arena y los mejores shoppings en Florida.' },
    { id: 6, title: 'Misterio de Machu Picchu', price: 'USD 780', originalPrice: 'USD 900', continent: 'América', country: 'Perú', type: 'Montaña', image: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?q=80&w=2076&auto=format&fit=crop', description: 'Explora una de las maravillas del mundo antiguo.' },
    { id: 7, title: 'Luces de Tokio', price: 'USD 2,100', originalPrice: 'USD 2,500', continent: 'Asia', country: 'Japón', type: 'Ciudad', image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1974&auto=format&fit=crop', description: 'La mezcla perfecta entre tecnología futurista y tradición milenaria.' },
    { id: 8, title: 'Relax en Maldivas', price: 'USD 3,200', originalPrice: 'USD 3,800', continent: 'Asia', country: 'Maldivas', type: 'Playa', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop', description: 'Villas privadas sobre el agua cristalina del océano Índico.' },
    { id: 9, title: 'Nueva York en Invierno', price: 'USD 1,300', originalPrice: null, continent: 'América', country: 'Estados Unidos', type: 'Ciudad', image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop', description: 'Vive la magia de la gran manzana nevada y sus rascacielos.' },
    { id: 10, title: 'Romance en París', price: 'USD 1,600', originalPrice: 'USD 1,900', continent: 'Europa', country: 'Francia', type: 'Ciudad', image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop', description: 'La ciudad del amor, la Torre Eiffel y una gastronomía única.' },
    { id: 11, title: 'Lujo en Dubai', price: 'USD 2,500', originalPrice: 'USD 2,800', continent: 'Asia', country: 'EAU', type: 'Ciudad', image: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop', description: 'Descubre los rascacielos más altos y el encanto del desierto.' },
    { id: 12, title: 'Punta Cana All Inclusive', price: 'USD 850', originalPrice: 'USD 1,000', continent: 'América', country: 'Rep. Dominicana', type: 'Playa', image: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=2070&auto=format&fit=crop', description: 'Bebidas tropicales y arenas blancas en el Caribe.' },
    { id: 13, title: 'Atardeceres en Santorini', price: 'USD 1,800', originalPrice: 'USD 2,200', continent: 'Europa', country: 'Grecia', type: 'Playa', image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?q=80&w=1964&auto=format&fit=crop', description: 'Mar azul profundo y casas blancas en los acantilados griegos.' },
    { id: 14, title: 'Esquí en Mont Blanc', price: 'USD 1,900', originalPrice: null, continent: 'Europa', country: 'Francia', type: 'Montaña', image: 'https://images.unsplash.com/photo-1605128005752-d1714260611e?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', description: 'Las mejores pistas de esquí en los Alpes franceses.' },
    { id: 15, title: 'Espiritualidad en Bali', price: 'USD 1,400', originalPrice: 'USD 1,600', continent: 'Asia', country: 'Indonesia', type: 'Playa', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop', description: 'Templo, arrozales y playas paradisíacas te aguardan.' }
];

const DestinosPage = () => {
    // State for filters
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedType, setSelectedType] = useState('');

    // Extract dynamic filter options
    const continents = useMemo(() => ['Todos', ...new Set(allDestinations.map(d => d.continent))], []);

    // Countries react to the selected continent
    const availableCountries = useMemo(() => {
        let filtered = allDestinations;
        if (selectedContinent && selectedContinent !== 'Todos') {
            filtered = filtered.filter(d => d.continent === selectedContinent);
        }
        return ['Todos', ...new Set(filtered.map(d => d.country))];
    }, [selectedContinent]);

    const types = useMemo(() => ['Todos', ...new Set(allDestinations.map(d => d.type))], []);

    // Filter the trips based on selected filters
    const filteredTrips = useMemo(() => {
        return allDestinations.filter(trip => {
            const matchContinent = !selectedContinent || selectedContinent === 'Todos' || trip.continent === selectedContinent;
            const matchCountry = !selectedCountry || selectedCountry === 'Todos' || trip.country === selectedCountry;
            const matchType = !selectedType || selectedType === 'Todos' || trip.type === selectedType;
            return matchContinent && matchCountry && matchType;
        });
    }, [selectedContinent, selectedCountry, selectedType]);

    // Reset dependent filters if parent filter changes
    const handleContinentChange = (e) => {
        setSelectedContinent(e.target.value);
        setSelectedCountry('Todos'); // Reset country when continent changes
    };

    const clearFilters = () => {
        setSelectedContinent('Todos');
        setSelectedCountry('Todos');
        setSelectedType('Todos');
    };

    const activeFiltersCount = [
        selectedContinent && selectedContinent !== 'Todos',
        selectedCountry && selectedCountry !== 'Todos',
        selectedType && selectedType !== 'Todos'
    ].filter(Boolean).length;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20">
            {/* Hero Header for Destinos */}
            <div className="relative h-[400px] w-full flex items-center justify-center overflow-hidden bg-primary mb-12">
                {/* Animated Clouds inside Hero */}
                <div className="absolute top-10 left-10 opacity-30 pointer-events-none animate-[float_10s_ease-in-out_infinite]">
                    <svg width="120" height="80" viewBox="0 0 24 24" fill="currentColor" className="text-secondary drop-shadow-md">
                        <path d="M17.5 19c2.48 0 4.5-2.02 4.5-4.5S19.98 10 17.5 10c-.3 0-.58.05-.85.11C15.82 7.74 13.56 6 11 6c-3.31 0-6 2.69-6 6 0 .28.02.55.06.81C2.73 13.25 1 15.42 1 18c0 2.76 2.24 5 5 5h11.5z" />
                    </svg>
                </div>
                <div className="absolute bottom-10 right-20 opacity-20 pointer-events-none animate-[float_14s_ease-in-out_infinite_reverse]">
                    <svg width="200" height="130" viewBox="0 0 24 24" fill="currentColor" className="text-secondary drop-shadow-lg">
                        <path d="M17.5 19c2.48 0 4.5-2.02 4.5-4.5S19.98 10 17.5 10c-.3 0-.58.05-.85.11C15.82 7.74 13.56 6 11 6c-3.31 0-6 2.69-6 6 0 .28.02.55.06.81C2.73 13.25 1 15.42 1 18c0 2.76 2.24 5 5 5h11.5z" />
                    </svg>
                </div>
                {/* Animated Plane passing by */}
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: "1000%", opacity: 1 }}
                    transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatDelay: 5 }}
                    className="absolute top-1/3 left-0 text-white/50"
                >
                    <Plane size={48} className="transform rotate-45" />
                </motion.div>

                <div className="relative z-10 text-center px-4 mt-8">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-md"
                    >
                        Explora el Mundo
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/80 font-sans max-w-2xl mx-auto"
                    >
                        Filtra y encuentra tu viaje soñado con Stechi Tours.
                    </motion.p>
                </div>
            </div>

            <div className="container mx-auto px-6">

                {/* Filter Bar (Glassmorphism inspired) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-6 md:p-8 mb-16 relative -mt-24 z-20 border border-gray-100"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 border-b border-gray-100 pb-4 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-blue-50 text-secondary p-3 rounded-full">
                                <Filter size={24} />
                            </div>
                            <h2 className="text-2xl font-serif font-bold text-primary">Buscar Destinos</h2>
                        </div>

                        {activeFiltersCount > 0 && (
                            <button onClick={clearFilters} className="text-sm font-sans font-semibold text-gray-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                                <X size={16} /> Borrar Filtros
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">

                        {/* dynamic: Continent */}
                        <div className="flex flex-col">
                            <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider mb-2">Continente</label>
                            <select
                                value={selectedContinent}
                                onChange={handleContinentChange}
                                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary font-sans font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all cursor-pointer"
                            >
                                {continents.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* dynamic: Country */}
                        <div className="flex flex-col">
                            <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider mb-2">País</label>
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary font-sans font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all cursor-pointer"
                            >
                                {availableCountries.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>

                        {/* dynamic: Type */}
                        <div className="flex flex-col">
                            <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo de Viaje</label>
                            <select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                                className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary font-sans font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all cursor-pointer"
                            >
                                {types.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        {/* static: Dates */}
                        <div className="flex flex-col">
                            <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider mb-2">Fechas</label>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2 group cursor-pointer hover:bg-gray-100 transition-colors">
                                <Calendar size={18} className="text-secondary" />
                                <input type="text" placeholder="Ida y Vuelta" className="bg-transparent border-none outline-none w-full text-primary font-sans font-semibold placeholder-gray-400 cursor-pointer" readOnly />
                            </div>
                        </div>

                        {/* static: Passengers */}
                        <div className="flex flex-col">
                            <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider mb-2">Pasajeros</label>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                                <Users size={18} className="text-secondary" />
                                <select className="bg-transparent border-none outline-none text-primary font-sans font-semibold w-full cursor-pointer">
                                    <option>1 Adulto</option>
                                    <option>2 Adultos</option>
                                    <option>2 Adultos, 1 Niño</option>
                                    <option>2 Adultos, 2 Niños</option>
                                    <option>Familia Numerosa</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </motion.div>

                {/* Results Counter */}
                <div className="mb-8 flex items-center justify-between">
                    <h3 className="font-serif text-2xl font-bold text-primary">Viajes Disponibles</h3>
                    <span className="bg-blue-50 text-secondary px-4 py-1.5 rounded-full font-bold text-sm shadow-sm">{filteredTrips.length} resultados</span>
                </div>

                {/* Grid of trips */}
                {filteredTrips.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        <AnimatePresence>
                            {filteredTrips.map((pkg, index) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3 }}
                                    key={pkg.id}
                                    className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group cursor-pointer"
                                >
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={pkg.image}
                                            alt={pkg.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                                        />
                                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                                            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-primary w-max">
                                                {pkg.continent}
                                            </span>
                                            <span className="bg-secondary/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-white w-max">
                                                {pkg.country}
                                            </span>
                                        </div>
                                        <div className="absolute top-4 right-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-white">
                                            {pkg.type}
                                        </div>
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold font-serif text-primary mb-2 group-hover:text-secondary transition-colors">
                                            {pkg.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-6 flex-grow font-sans">
                                            {pkg.description}
                                        </p>

                                        <div className="flex items-end justify-between mt-auto">
                                            <div>
                                                <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Desde</span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-2xl font-bold text-primary font-sans">{pkg.price}</span>
                                                    {pkg.originalPrice && (
                                                        <span className="text-sm text-gray-400 line-through font-medium">{pkg.originalPrice}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <button className="bg-primary hover:bg-secondary text-white p-3 rounded-full transition-colors shadow-lg group-hover:shadow-xl group-hover:scale-105 transform">
                                                <Search size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="bg-white p-20 rounded-3xl shadow-sm border border-gray-100 text-center">
                        <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
                        <h3 className="text-2xl font-serif text-primary font-bold mb-2">No encontramos viajes</h3>
                        <p className="text-gray-500 font-sans">Prueba eliminando algunos filtros para ver más opciones.</p>
                        <button onClick={clearFilters} className="mt-6 bg-secondary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition-all">
                            Mostrar Todos los Destinos
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DestinosPage;
