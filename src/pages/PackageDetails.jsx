import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, ArrowLeft, Download, Check, Star, Info, FileText, File, Plane, Hotel, Coffee, Map, Umbrella, Mountain, Camera, Sun, Snowflake, Bus, Ship, Utensils } from 'lucide-react';
import { useTrips } from '../hooks/useTrips';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ItineraryPDF from '../components/ItineraryPDF';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

const PackageDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { trips, isLoading } = useTrips();
    const [pkg, setPkg] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (trips.length > 0) {
            const foundPkg = trips.find(p => p.id === id);
            if (foundPkg) {
                setPkg(foundPkg);
            }
        }
    }, [id, trips]);

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center flex-col gap-4">
                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent mb-2"></div>
                <h2 className="text-xl font-serif text-primary">Cargando detalles del viaje...</h2>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center flex-col gap-4">
                <h2 className="text-2xl font-serif font-bold text-primary">Viaje no encontrado</h2>
                <button onClick={() => navigate('/destinos')} className="bg-secondary text-white px-6 py-2 rounded-full font-bold">Volver a los destinos</button>
            </div>
        );
    }

    const formatTripDates = (startIso, endIso) => {
        if (!startIso || !endIso) return 'Fechas Flexibles';
        const start = new Date(startIso);
        const end = new Date(endIso);
        return `${format(start, 'dd MMM', { locale: es })} - ${format(end, 'dd MMM', { locale: es })}`;
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-20 pb-20 overflow-x-hidden">
            {/* Hero Section of the Package */}
            <div className="relative h-[50vh] min-h-[400px] w-full bg-primary/90">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover mix-blend-overlay opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 via-gray-50/20 to-transparent"></div>
                
                {/* Animated Birds (Gulls) */}
                <div className="absolute top-1/4 left-0 w-full overflow-hidden pointer-events-none z-10">
                    <motion.div
                        className="flex gap-8 text-white/40"
                        initial={{ x: "110vw", y: 20 }}
                        animate={{ x: "-20vw", y: -40 }}
                        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
                    >
                        {/* Simple SVG Birds */}
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -scale-x-100">
                            <path d="M22 12c-4 0-7-4-10-4S5 12 2 12" />
                            <path d="M22 12c-4 0-7 4-10 4S5 12 2 12" />
                        </svg>
                        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -scale-x-100 mt-4">
                            <path d="M22 12c-4 0-7-4-10-4S5 12 2 12" />
                            <path d="M22 12c-4 0-7 4-10 4S5 12 2 12" />
                        </svg>
                        <svg width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -scale-x-100 -mt-2">
                            <path d="M22 12c-4 0-7-4-10-4S5 12 2 12" />
                            <path d="M22 12c-4 0-7 4-10 4S5 12 2 12" />
                        </svg>
                    </motion.div>
                </div>

                <div className="absolute bottom-10 left-0 w-full px-6 z-20">
                    <div className="container mx-auto">
                        <Link to="/destinos" className="inline-flex items-center gap-2 text-primary bg-white/80 hover:bg-white backdrop-blur-md px-4 py-2 rounded-full font-sans font-bold text-sm mb-6 transition-colors shadow-sm">
                            <ArrowLeft size={16} /> Volver a Destinos
                        </Link>
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-wrap gap-3 mb-4">
                            <span className="bg-primary text-white font-bold text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wide">{pkg.continent}</span>
                            <span className="bg-secondary text-white font-bold text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wide">{pkg.country}</span>
                            <span className="bg-white text-primary font-bold text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wide">{pkg.type}</span>
                        </motion.div>
                        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary drop-shadow-[0_2px_4px_rgba(255,255,255,0.8)] leading-tight mb-4">
                            {pkg.title}
                        </motion.h1>

                        {/* Visual Tags */}
                        {pkg.tags && pkg.tags.length > 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="flex flex-wrap gap-2">
                                {pkg.tags.map((tag, i) => (
                                    <span key={i} className="bg-white/90 backdrop-blur-sm text-secondary text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm border border-white">
                                        {iconMap[tag.iconName] || <Plane size={14} />} {tag.text}
                                    </span>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 -mt-4 relative z-30">
                <div className="flex flex-col lg:flex-row gap-8">
                    
                    {/* Main Content Column */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-8">
                        {/* Quick Info Bar */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/40 border border-gray-100 flex flex-wrap gap-6 justify-between items-center">
                            <div className="flex flex-col">
                                <span className="text-gray-400 font-bold uppercase text-[0.65rem] tracking-wider flex items-center gap-1 mb-1"><Calendar size={12} /> Fechas Disponibles</span>
                                <span className="font-sans font-bold text-primary">{(pkg.startDate && pkg.endDate) ? formatTripDates(pkg.startDate, pkg.endDate) : (pkg.dates || 'Fechas Flexibles')}</span>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-gray-100"></div>
                            <div className="flex flex-col">
                                <span className="text-gray-400 font-bold uppercase text-[0.65rem] tracking-wider flex items-center gap-1 mb-1"><Users size={12} /> Pasajeros</span>
                                <span className="font-sans font-bold text-primary">{pkg.passengers || 'Sin restricciones (Apto todo público)'}</span>
                            </div>
                            <div className="hidden md:block w-px h-10 bg-gray-100"></div>
                            <div className="flex flex-col">
                                <span className="text-gray-400 font-bold uppercase text-[0.65rem] tracking-wider flex items-center gap-1 mb-1"><Star size={12} className="text-yellow-400" /> Valoración</span>
                                <span className="font-sans font-bold text-primary">
                                    {pkg.rating || '5.0'} / 5 {(!pkg.rating || parseFloat(pkg.rating) >= 4.8) ? 'Excelente' : parseFloat(pkg.rating) >= 4.0 ? 'Muy Bueno' : 'Recomendado'}
                                </span>
                            </div>
                        </motion.div>

                        {/* Description & Details */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-serif font-bold text-primary mb-6 flex items-center gap-2"><Info className="text-secondary" /> Acerca del viaje</h3>
                            <p className="text-gray-600 font-sans leading-relaxed mb-8 text-lg whitespace-pre-line">
                                {pkg.longDescription || pkg.description}
                            </p>
                            
                            <h4 className="text-xl font-serif font-bold text-primary mb-4">¿Qué incluye este paquete?</h4>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {(pkg.includes && Array.isArray(pkg.includes) && pkg.includes.filter(i => typeof i === 'string' && i.trim() !== '').length > 0 
                                    ? pkg.includes.filter(i => typeof i === 'string' && i.trim() !== '') 
                                    : ['Vuelos ida y vuelta', 'Traslados aeropuerto-hotel', 'Alojamiento con desayuno', 'Seguro de asistencia médica', 'Excursiones principales', 'Asistencia 24/7 en destino']
                                ).map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-gray-700 font-sans font-medium">
                                        <div className="bg-green-100 text-green-600 p-1 rounded-full"><Check size={14} strokeWidth={3} /></div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        
                        {/* Downloads Section */}
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-8 shadow-sm border border-blue-100">
                            <h3 className="text-2xl font-serif font-bold text-primary mb-2">Documentos del Viaje</h3>
                            <p className="text-gray-500 font-sans mb-6 text-sm">Descarga toda la información oficial para revisarla cómodamente.</p>
                            
                            <div className="flex flex-col gap-4">
                                
                                {/* Botón Itinerario Dinámico */}
                                {pkg.itineraryText ? (
                                    <PDFDownloadLink
                                        document={<ItineraryPDF pkg={pkg} />}
                                        fileName={`Itinerario_${pkg.title.replace(/\s+/g, '_')}.pdf`}
                                        className="w-full bg-white border border-gray-200 hover:border-secondary hover:bg-blue-50/50 text-primary font-bold py-4 px-6 rounded-2xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-3 group"
                                    >
                                        {({ blob, url, loading, error }) => (
                                            <>
                                                <div className="bg-blue-100 text-secondary p-2 rounded-xl group-hover:scale-110 transition-transform">
                                                    {loading ? <div className="animate-spin rounded-full h-5 w-5 border-2 border-secondary border-t-transparent"></div> : <MapPin size={20} />}
                                                </div>
                                                <div className="flex flex-col items-start leading-tight">
                                                    <span className="text-sm">
                                                        {loading ? 'Generando Itinerario...' : 'Descargar Itinerario Oficial'}
                                                    </span>
                                                    <span className="text-[0.65rem] text-gray-400 font-normal">
                                                        {loading ? 'Preparando diseño' : 'PDF Dinámico'}
                                                    </span>
                                                </div>
                                                <Download size={18} className="ml-auto text-gray-400 group-hover:text-secondary group-hover:translate-y-1 transition-all" />
                                            </>
                                        )}
                                    </PDFDownloadLink>
                                ) : (
                                    <div className="w-full bg-gray-50 border border-gray-200 text-gray-400 font-bold py-4 px-6 rounded-2xl flex items-center gap-3 opacity-60 grayscale cursor-not-allowed">
                                        <div className="bg-gray-200 text-gray-400 p-2 rounded-xl"><MapPin size={20} /></div>
                                        <div className="flex flex-col items-start leading-tight">
                                            <span className="text-sm">Itinerario en preparación</span>
                                            <span className="text-[0.65rem] font-normal">Próximamente disponible</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>

                    {/* Sidebar Pricing & CTA */}
                    <div className="w-full lg:w-1/3">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="bg-white rounded-3xl p-8 shadow-2xl shadow-gray-200/50 border border-gray-100 sticky top-28">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex flex-col">
                                    <span className="text-gray-400 font-bold uppercase text-xs tracking-wider mb-1">Desde</span>
                                    <div className="flex items-end gap-3">
                                        <span className={`font-sans font-bold text-primary leading-none ${pkg.price === 'Consultar Tarifa' ? 'text-2xl pt-2' : 'text-4xl'}`}>
                                            {pkg.price}
                                        </span>
                                        {pkg.originalPrice && pkg.price !== 'Consultar Tarifa' && (
                                            <span className="text-lg text-gray-400 line-through font-medium mb-1">{pkg.originalPrice}</span>
                                        )}
                                    </div>
                                </div>
                                {pkg.originalPrice && pkg.price !== 'Consultar Tarifa' && (
                                    <div className="bg-red-500 text-white text-[0.65rem] font-bold px-2 py-1 rounded-lg uppercase tracking-wider animate-pulse mt-1">
                                        Oferta
                                    </div>
                                )}
                            </div>
                            
                            <hr className="border-gray-100 mb-6" />
                            
                            <p className="font-sans text-sm text-gray-500 mb-6 font-medium text-center">
                                Los precios incluyen impuestos y cargos. Valores sujetos a disponibilidad al momento de reservar.
                            </p>

                            <button className="w-full bg-secondary hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all transform mb-4 text-lg">
                                Reservar Ahora
                            </button>
                            <a href={`https://wa.me/5493412517677?text=Hola,%20me%20interesa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20el%20viaje:%20${encodeURIComponent(pkg.title)}`} target="_blank" rel="noopener noreferrer" className="w-full bg-green-50 hover:bg-green-500 text-green-600 hover:text-white font-bold py-4 px-8 rounded-full transition-all transform flex items-center justify-center gap-2 border border-green-200 hover:border-green-500">
                                Consultar por Asesor
                            </a>
                        </motion.div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default PackageDetails;
