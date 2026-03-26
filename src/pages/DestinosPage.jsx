import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Calendar, Users, Filter, Plane, X, Hotel, Coffee, Map, Umbrella, Mountain, Camera, Sun, Snowflake, Bus, Ship, Utensils } from 'lucide-react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

import { useTrips } from '../hooks/useTrips';

const iconMap = {
    Plane: <Plane size={14} />,
    Hotel: <Hotel size={14} />,
    Coffee: <Coffee size={14} />,
    Map: <Map size={14} />,
    Umbrella: <Umbrella size={14} />,
    Mountain: <Mountain size={14} />,
    Camera: <Camera size={14} />,
    Sun: <Sun size={14} />,
    Snowflake: <Snowflake size={14} />,
    Bus: <Bus size={14} />,
    Ship: <Ship size={14} />,
    Utensils: <Utensils size={14} />,
    Users: <Users size={14} />
};

const DestinosPage = () => {
    const { trips: allDestinations, isLoading } = useTrips();

    // State for filters
    const [selectedContinent, setSelectedContinent] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedPassengers, setSelectedPassengers] = useState('');
    const [dateRange, setDateRange] = useState([null, null]);
    const [filterStartDate, filterEndDate] = dateRange;

    // Extract dynamic filter options
    const continents = useMemo(() => ['Todos', ...new Set(allDestinations.map(d => d.continent))], [allDestinations]);

    // Countries react to the selected continent
    const availableCountries = useMemo(() => {
        let filtered = allDestinations;
        if (selectedContinent && selectedContinent !== 'Todos') {
            filtered = filtered.filter(d => d.continent === selectedContinent);
        }
        return ['Todos', ...new Set(filtered.map(d => d.country))];
    }, [selectedContinent, allDestinations]);

    const types = useMemo(() => ['Todos', ...new Set(allDestinations.map(d => d.type))], [allDestinations]);

    // Filter the trips based on selected filters
    const filteredTrips = useMemo(() => {
        return allDestinations.filter(trip => {
            const matchContinent = !selectedContinent || selectedContinent === 'Todos' || trip.continent === selectedContinent;
            const matchCountry = !selectedCountry || selectedCountry === 'Todos' || trip.country === selectedCountry;
            const matchType = !selectedType || selectedType === 'Todos' || trip.type === selectedType;
            // Si el viaje no tiene cupo (trip.passengers === null), se muestra para cualquier filtro. Si lo tiene, debe hacer match.
            const matchPassengers = !selectedPassengers || selectedPassengers === 'Cualquiera' || !trip.passengers || trip.passengers === selectedPassengers;
            
            let matchDate = true;
            if (filterStartDate) {
                if (!trip.startDate || !trip.endDate) {
                    matchDate = true; // Flexible viajes always match
                } else {
                    const tripStart = new Date(trip.startDate);
                    const tripEnd = new Date(trip.endDate);
                    if (filterStartDate && !filterEndDate) {
                        matchDate = tripEnd >= filterStartDate;
                    } else if (filterStartDate && filterEndDate) {
                        matchDate = tripStart <= filterEndDate && tripEnd >= filterStartDate;
                    }
                }
            }

            return matchContinent && matchCountry && matchType && matchPassengers && matchDate;
        });
    }, [selectedContinent, selectedCountry, selectedType, selectedPassengers, dateRange, allDestinations]);

    // Reset dependent filters if parent filter changes
    const handleContinentChange = (e) => {
        setSelectedContinent(e.target.value);
        setSelectedCountry('Todos'); // Reset country when continent changes
    };

    const clearFilters = () => {
        setSelectedContinent('Todos');
        setSelectedCountry('Todos');
        setSelectedType('Todos');
        setSelectedPassengers('Cualquiera');
        setDateRange([null, null]);
    };

    const activeFiltersCount = [
        selectedContinent && selectedContinent !== 'Todos',
        selectedCountry && selectedCountry !== 'Todos',
        selectedType && selectedType !== 'Todos',
        selectedPassengers && selectedPassengers !== 'Cualquiera',
        filterStartDate !== null
    ].filter(Boolean).length;

    const formatTripDates = (startIso, endIso) => {
        if (!startIso || !endIso) return 'Fechas Flexibles';
        const start = new Date(startIso);
        const end = new Date(endIso);
        return `${format(start, 'dd MMM', { locale: es })} - ${format(end, 'dd MMM', { locale: es })}`;
    };

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

                    {isLoading ? (
                        <div className="py-10 text-center flex flex-col items-center">
                             <div className="animate-spin rounded-full h-8 w-8 border-2 border-secondary border-t-transparent mb-2"></div>
                             <p className="text-gray-500">Cargando destinos...</p>
                        </div>
                    ) : allDestinations.length === 0 ? (
                        <div className="py-10 text-center">
                            <p className="text-gray-500 font-sans font-semibold">Cargando catálogo... si demoramos, revisa el modo Administrador.</p>
                        </div>
                    ) : (
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

                        {/* dynamic: Dates */}
                        <div className="flex flex-col relative z-20">
                            <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider mb-2">Fechas</label>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2 group cursor-pointer hover:bg-gray-100 transition-colors w-full h-[46px]">
                                <Calendar size={18} className="text-secondary shrink-0" />
                                <DatePicker
                                    selectsRange={true}
                                    startDate={filterStartDate}
                                    endDate={filterEndDate}
                                    onChange={(update) => setDateRange(update)}
                                    isClearable={true}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Ida y Vuelta"
                                    className="bg-transparent border-none outline-none w-full text-primary font-sans font-semibold placeholder-gray-400 cursor-pointer h-full"
                                    calendarClassName="shadow-2xl border-none rounded-2xl"
                                />
                            </div>
                        </div>

                        {/* dynamic: Passengers */}
                        <div className="flex flex-col">
                            <label className="text-[0.65rem] font-bold text-gray-500 uppercase tracking-wider mb-2">Pasajeros</label>
                            <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                                <Users size={18} className="text-secondary" />
                                <select 
                                    value={selectedPassengers}
                                    onChange={(e) => setSelectedPassengers(e.target.value)}
                                    className="bg-transparent border-none outline-none text-primary font-sans font-semibold w-full cursor-pointer"
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

                    </div>
                    )}
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
                                        <p className="text-gray-500 text-sm mb-4 flex-grow font-sans line-clamp-3">
                                            {pkg.shortDescription || pkg.description}
                                        </p>

                                        {/* Tags */}
                                        {pkg.tags && pkg.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {pkg.tags.map((tag, i) => (
                                                    <span key={i} className="bg-blue-50 text-secondary text-xs font-semibold px-2.5 py-1 rounded-md flex items-center gap-1">
                                                        {iconMap[tag.iconName] || <Plane size={14} />} {tag.text}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        <div className="flex flex-wrap items-center gap-3 text-primary font-sans text-xs font-semibold mb-6">
                                            <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                                                <Calendar size={14} className="text-secondary" />
                                                <span>{(pkg.startDate && pkg.endDate) ? formatTripDates(pkg.startDate, pkg.endDate) : (pkg.dates || 'Fechas Flexibles')}</span>
                                            </div>
                                            {pkg.passengers && (
                                                <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1.5 rounded-lg border border-gray-100">
                                                    <Users size={14} className="text-secondary" />
                                                    <span>{pkg.passengers}</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-end justify-between mt-auto">
                                            <div>
                                                {pkg.price && !pkg.price.toLowerCase().includes('consultar') && (
                                                    <span className="text-xs text-gray-400 block font-semibold uppercase tracking-wider">Desde</span>
                                                )}
                                                <div className="flex items-center gap-2">
                                                    <span className={`font-bold text-primary font-sans ${pkg.price && pkg.price.toLowerCase().includes('consultar') ? 'text-lg max-w-[120px] leading-tight' : 'text-2xl'}`}>{pkg.price}</span>
                                                    {pkg.originalPrice && (!pkg.price || !pkg.price.toLowerCase().includes('consultar')) && (
                                                        <span className="text-sm text-gray-400 line-through font-medium">{pkg.originalPrice}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <Link to={`/paquete/${pkg.id}`} className="bg-primary hover:bg-secondary text-white p-3 rounded-full transition-colors shadow-lg group-hover:shadow-xl group-hover:scale-105 transform inline-block">
                                                <Search size={20} />
                                            </Link>
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

                {/* Empty State when there are no trips AT ALL in the DB */}
                {!isLoading && allDestinations.length === 0 && (
                    <div className="text-center py-20">
                        <Plane size={64} className="mx-auto text-gray-200 mb-6 group-hover:-translate-y-2 transition-transform opacity-50" />
                        <h2 className="text-3xl font-serif text-primary font-bold mb-4">Aún no hay destinos disponibles</h2>
                        <p className="text-gray-500 max-w-lg mx-auto mb-8 font-sans">
                            La agencia está preparando nuevos e increíbles paquetes para ti. ¡Vuelve pronto a revisar las novedades!
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default DestinosPage;
