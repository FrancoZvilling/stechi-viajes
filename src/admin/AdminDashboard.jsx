import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';
import { LogOut, Plus, MapPin, Edit, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [user, setUser] = useState(null);
    const [trips, setTrips] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Verify Auth & Load Trips
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                navigate('/admin'); // Redirect to login
            } else {
                setUser(currentUser);
                // Load Trips from Firestore
                const q = query(collection(db, 'trips'), orderBy('createdAt', 'desc'));
                const unsubscribeTrips = onSnapshot(q, (snapshot) => {
                    const tripsData = snapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setTrips(tripsData);
                    setIsLoading(false);
                });
                return () => unsubscribeTrips();
            }
        });
        return () => unsubscribeAuth();
    }, [navigate]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/admin');
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };

    const handleDelete = async (tripId, imageUrl) => {
        if (window.confirm("¿Estás súper seguro de que deseas eliminar este viaje? Esta acción borrará todos sus datos y no se puede deshacer.")) {
            try {
                // Borrar documento de Firestore
                await deleteDoc(doc(db, 'trips', tripId));
                
                // Borrar imagen de Storage si existe
                if (imageUrl && !imageUrl.includes('placeholder')) {
                    const imageRef = ref(storage, imageUrl);
                    await deleteObject(imageRef).catch(e => console.log('Error borrando imagen (puede que ya no exista):', e));
                }
            } catch (error) {
                console.error("Error al borrar el viaje:", error);
                alert("Hubo un error al intentar borrar el viaje. Revisa la consola.");
            }
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50"><div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent"></div></div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 relative">
            {/* Topbar */}
            <div className="bg-primary text-white p-4 shadow-md sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <span className="font-serif font-bold text-xl tracking-wider">Stechi Tours <span className="text-secondary">Admin</span></span>
                    </div>
                    <div className="flex items-center gap-6">
                        <span className="hidden md:block text-sm text-white/70">{user?.email}</span>
                        <button onClick={handleLogout} className="flex items-center gap-2 hover:text-red-400 transition-colors text-sm font-bold">
                            <LogOut size={18} /> Salir
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">Viajes Cargados</h1>
                        <p className="text-gray-500 font-sans mt-1">Gestiona los paquetes disponibles en tu web.</p>
                    </div>
                    <Link 
                        to="/admin/nuevo-viaje" 
                        className="bg-secondary hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                    >
                        <Plus size={20} /> Agregar Viaje
                    </Link>
                </div>

                {/* Trips List */}
                {trips.length === 0 ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-3xl p-16 text-center shadow-sm border border-gray-100 flex flex-col items-center">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex flex-col items-center justify-center text-gray-300 mb-6">
                            <MapPin size={40} />
                        </div>
                        <h3 className="text-2xl font-serif font-bold text-primary mb-2">Por el momento no hay viajes cargados</h3>
                        <p className="text-gray-500 font-sans max-w-md mx-auto mb-8">Comienza a nutrir tu web creando tu primer paquete de viaje. Podrás subir imágenes, precios y toda la info.</p>
                        <Link to="/admin/nuevo-viaje" className="bg-primary hover:bg-secondary text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all">
                            Crear mi primer viaje
                        </Link>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {trips.map(trip => (
                            <div key={trip.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative group">
                                <div className="h-40 relative">
                                    <img src={trip.imageUrl || 'https://via.placeholder.com/400x300'} alt={trip.title} className="w-full h-full object-cover" />
                                    {trip.isFeatured && <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[0.65rem] font-bold px-2 py-1 rounded-md uppercase">Destacado</span>}
                                    {trip.isHero && <span className="absolute top-2 right-2 bg-purple-500 text-white text-[0.65rem] font-bold px-2 py-1 rounded-md uppercase">En Hero</span>}
                                </div>
                                <div className="p-4">
                                    <div className="flex gap-2 mb-2">
                                        <span className="text-xs font-bold text-secondary bg-blue-50 px-2 py-1 rounded-md">{trip.continent}</span>
                                        <span className="text-xs font-bold text-primary bg-gray-50 px-2 py-1 rounded-md">{trip.country}</span>
                                    </div>
                                    <h3 className="font-serif font-bold text-primary text-lg truncate mb-1">{trip.title}</h3>
                                    <p className="text-gray-500 font-sans text-sm font-bold mb-4">{trip.consultPrice ? 'Consultar Tarifa' : trip.price}</p>
                                    
                                    <div className="flex gap-2 pt-4 border-t border-gray-100 mt-auto">
                                        <Link to={`/admin/editar-viaje/${trip.id}`} className="flex-1 bg-gray-50 hover:bg-gray-100 text-primary font-bold text-sm py-2 rounded-lg flex justify-center items-center gap-2 transition-colors">
                                            <Edit size={16} /> Editar
                                        </Link>
                                        <button onClick={() => handleDelete(trip.id, trip.imageUrl)} className="flex-1 bg-red-50 hover:bg-red-500 text-red-600 hover:text-white font-bold text-sm py-2 rounded-lg flex justify-center items-center gap-2 transition-colors">
                                            <Trash2 size={16} /> Borrar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
