import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, doc, updateDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ArrowLeft, UploadCloud, Save, Loader2, Image as ImageIcon, FileText } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useTrips } from '../hooks/useTrips';

// Icon library for tags
import * as LucideIcons from 'lucide-react';

const availableIcons = [
    { name: 'Plane', label: 'Avión' },
    { name: 'Hotel', label: 'Hotel' },
    { name: 'Coffee', label: 'Desayuno' },
    { name: 'Map', label: 'Mapa / Tour' },
    { name: 'Camera', label: 'Fotos' },
    { name: 'Sun', label: 'Clima Cálido' },
    { name: 'Snowflake', label: 'Nieve' },
    { name: 'Bus', label: 'Traslado' },
    { name: 'Ship', label: 'Crucero' },
    { name: 'Utensils', label: 'Comida' },
    { name: 'Users', label: 'Salidas Grupales' }
];

const AdminTripForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = !!id;

    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        longDescription: '',
        continent: '',
        country: '',
        type: '',
        categoryImageUrl: '',
        price: '',
        originalPrice: '',
        consultPrice: false,
        passengers: '', // empty means no limit
        startDate: null,
        endDate: null,
        rating: '5.0',
        isFeatured: false,
        isHero: false,
        tags: [], // { iconName: '', text: '' }
        includes: ['Vuelos ida y vuelta', 'Alojamiento con desayuno', 'Asistencia 24/7 en destino'],
        itineraryText: ''
    });

    // File States
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [categoryFile, setCategoryFile] = useState(null);
    const [categoryPreview, setCategoryPreview] = useState('');

    // Current Tag State
    const [currentTagIcon, setCurrentTagIcon] = useState('Plane');
    const [currentTagText, setCurrentTagText] = useState('');

    // Combobox Lists
    const { trips } = useTrips();
    const [uniqueContinents, setUniqueContinents] = useState([]);
    const [uniqueCountries, setUniqueCountries] = useState([]);
    const [uniqueTypes, setUniqueTypes] = useState([]);

    useEffect(() => {
        if (trips && trips.length > 0) {
            const continents = [...new Set(trips.map(t => t.continent).filter(Boolean))];
            const countries = [...new Set(trips.map(t => t.country).filter(Boolean))];
            
            const typesMap = {};
            trips.forEach(t => {
                if (t.type && !typesMap[t.type] && t.categoryImageUrl) {
                    typesMap[t.type] = t.categoryImageUrl;
                } else if (t.type && !typesMap[t.type]) {
                    typesMap[t.type] = '';
                }
            });
            
            setUniqueContinents(continents);
            setUniqueCountries(countries);
            setUniqueTypes(Object.keys(typesMap).map(k => ({ name: k, image: typesMap[k] })));
        }
    }, [trips]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) navigate('/admin');
            else setUser(currentUser);
        });
        return () => unsubscribe();
    }, [navigate]);

    useEffect(() => {
        if (isEditing) {
            const fetchTrip = async () => {
                setIsLoading(true);
                try {
                    const docRef = doc(db, 'trips', id);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setFormData({
                            title: data.title || '',
                            shortDescription: data.shortDescription || '',
                            longDescription: data.longDescription || '',
                            continent: data.continent || '',
                            country: data.country || '',
                            type: data.type || '',
                            categoryImageUrl: data.categoryImageUrl || '',
                            price: data.price || '',
                            originalPrice: data.originalPrice || '',
                            consultPrice: data.consultPrice || false,
                            passengers: data.passengers || '',
                            startDate: data.startDate ? new Date(data.startDate) : null,
                            endDate: data.endDate ? new Date(data.endDate) : null,
                            rating: data.rating || '5.0',
                            isFeatured: data.isFeatured || false,
                            isHero: data.isHero || false,
                            tags: data.tags || [],
                            includes: data.includes && data.includes.length > 0 ? data.includes : ['Vuelos ida y vuelta', 'Alojamiento con desayuno', 'Asistencia 24/7 en destino'],
                            itineraryText: data.itineraryText || '',
                            imageUrl: data.imageUrl || ''
                        });
                        if (data.imageUrl) {
                            setImagePreview(data.imageUrl);
                        }
                        if (data.categoryImageUrl) {
                            setCategoryPreview(data.categoryImageUrl);
                        }
                    } else {
                        alert("El viaje no existe.");
                        navigate('/admin/dashboard');
                    }
                } catch (error) {
                    console.error("Error fetching trip:", error);
                    alert("Error al cargar los datos del viaje.");
                } finally {
                    setIsLoading(false);
                }
            };
            fetchTrip();
        }
    }, [id, isEditing, navigate]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleTypeChange = (e) => {
        const val = e.target.value;
        setFormData(prev => ({ ...prev, type: val }));
        
        const existingType = uniqueTypes.find(t => t.name.toLowerCase() === val.toLowerCase());
        if (existingType && existingType.image) {
            setFormData(prev => ({ ...prev, categoryImageUrl: existingType.image }));
            setCategoryPreview(existingType.image);
        } else if (!isEditing || (isEditing && formData.type !== val)) {
            setFormData(prev => ({ ...prev, categoryImageUrl: '' }));
            setCategoryPreview('');
        }
    };

    const handleImageChange = (e) => {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImagePreview(URL.createObjectURL(e.target.files[0]));
        }
    };

    const addTag = () => {
        if (currentTagText.trim() === '') return;
        setFormData(prev => ({
            ...prev,
            tags: [...prev.tags, { iconName: currentTagIcon, text: currentTagText }]
        }));
        setCurrentTagText('');
    };

    const removeTag = (index) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    const handleIncludeChange = (index, value) => {
        const newIncludes = [...formData.includes];
        newIncludes[index] = value;
        setFormData(prev => ({ ...prev, includes: newIncludes }));
    };

    const addInclude = () => {
        if (formData.includes.length < 6) {
            setFormData(prev => ({ ...prev, includes: [...prev.includes, ''] }));
        } else {
            alert('Puedes agregar un máximo de 6 elementos.');
        }
    };

    const removeInclude = (index) => {
        if (formData.includes.length > 1) {
            setFormData(prev => ({
                ...prev,
                includes: prev.includes.filter((_, i) => i !== index)
            }));
        } else {
            alert('Debe haber al menos 1 elemento incluido en el viaje.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSaving(true);
        
        try {
            let imageUrl = formData.imageUrl || '';
            let categoryImageUrl = formData.categoryImageUrl || '';

            // Upload Image
            if (imageFile) {
                const imageRef = ref(storage, `trips/images/${Date.now()}_${imageFile.name}`);
                await uploadBytes(imageRef, imageFile);
                imageUrl = await getDownloadURL(imageRef);
            }

            // Upload Category Image
            if (categoryFile) {
                const catRef = ref(storage, `trips/categories/${Date.now()}_${categoryFile.name}`);
                await uploadBytes(catRef, categoryFile);
                categoryImageUrl = await getDownloadURL(catRef);
            }

            const tripData = {
                ...formData,
                includes: formData.includes ? formData.includes.filter(i => typeof i === 'string' && i.trim() !== '') : [],
                startDate: formData.startDate ? formData.startDate.toISOString() : null,
                endDate: formData.endDate ? formData.endDate.toISOString() : null,
                imageUrl,
                categoryImageUrl,
                updatedAt: serverTimestamp()
            };

            if (isEditing) {
                const docRef = doc(db, 'trips', id);
                await updateDoc(docRef, tripData);
            } else {
                tripData.createdAt = serverTimestamp();
                await addDoc(collection(db, 'trips'), tripData);
            }

            navigate('/admin/dashboard');

        } catch (error) {
            console.error("Error saving trip:", error);
            alert("Hubo un error al guardar el viaje. Revisa la consola.");
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen pt-32 pb-20 flex items-center justify-center flex-col gap-4">
                 <div className="animate-spin rounded-full h-12 w-12 border-4 border-secondary border-t-transparent mb-2"></div>
                <h2 className="text-xl font-serif text-primary">Cargando datos del viaje...</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-20 pt-10 px-4">
            <div className="container mx-auto max-w-5xl">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link to="/admin/dashboard" className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-100 transition-colors text-primary">
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-serif font-bold text-primary">
                                {isEditing ? 'Editar Viaje' : 'Nuevo Viaje'}
                            </h1>
                            <p className="text-gray-500 font-sans mt-1">Completa todos los detalles del paquete.</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleSubmit} 
                        disabled={isSaving}
                        className="bg-secondary hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow-md flex items-center gap-2 transition-all disabled:opacity-50"
                    >
                        {isSaving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                        {isSaving ? 'Guardando...' : 'Guardar Viaje'}
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Main Form) */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* Basic Info */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Información Básica</h3>
                            
                            <div className="space-y-5">
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Título del Viaje *</label>
                                    <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary font-sans focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="Ej: Escapada a Ibiza" />
                                </div>
                                
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Descripción Corta (Para la tarjeta) *</label>
                                    <textarea required rows="2" name="shortDescription" value={formData.shortDescription} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary font-sans focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="Resumen atrapante en 1-2 líneas." />
                                </div>
                                
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Descripción Larga (Página de detalle) *</label>
                                    <textarea required rows="6" name="longDescription" value={formData.longDescription} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary font-sans focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" placeholder="Detalla todo el itinerario, la experiencia, el hotel, etc." />
                                </div>
                                
                                <div className="pt-4 border-t border-gray-100">
                                    <div className="flex justify-between items-center mb-4">
                                        <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block">¿Qué incluye el paquete? (Mín 1, Máx 6)</label>
                                        <button 
                                            type="button" 
                                            onClick={addInclude} 
                                            disabled={formData.includes.length >= 6}
                                            className="text-xs font-bold text-secondary bg-blue-50 px-3 py-1 rounded-full hover:bg-blue-100 disabled:opacity-50"
                                        >
                                            + Agregar Item
                                        </button>
                                    </div>
                                    <div className="space-y-3">
                                        {formData.includes.map((item, idx) => (
                                            <div key={idx} className="flex gap-2">
                                                <input 
                                                    type="text" 
                                                    required 
                                                    value={item} 
                                                    onChange={(e) => handleIncludeChange(idx, e.target.value)} 
                                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm text-primary focus:outline-none focus:border-secondary" 
                                                    placeholder="Ej: Alojamiento con desayuno"
                                                />
                                                <button 
                                                    type="button" 
                                                    onClick={() => removeInclude(idx)} 
                                                    className="text-red-400 hover:text-red-600 font-bold px-2 rounded hover:bg-red-50"
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Categories & Price */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Categorías y Precios</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Continente *</label>
                                    <input required list="continents-list" type="text" name="continent" value={formData.continent} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary" placeholder="Ej: Europa" />
                                    <datalist id="continents-list">
                                        {uniqueContinents.map(c => <option key={c} value={c} />)}
                                    </datalist>
                                </div>
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">País *</label>
                                    <input required list="countries-list" type="text" name="country" value={formData.country} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary" placeholder="Ej: España" />
                                    <datalist id="countries-list">
                                        {uniqueCountries.map(c => <option key={c} value={c} />)}
                                    </datalist>
                                </div>
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Tipo de Viaje *</label>
                                    <input required list="types-list" type="text" name="type" value={formData.type} onChange={handleTypeChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary" placeholder="Ej: Playas y Sol" />
                                    <datalist id="types-list">
                                        {uniqueTypes.map(t => <option key={t.name} value={t.name} />)}
                                    </datalist>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-end">
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Precio (Ej: USD 1,500)</label>
                                    <input type="text" name="price" value={formData.price} onChange={handleChange} disabled={formData.consultPrice} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary disabled:opacity-50" placeholder="USD 0" />
                                </div>
                                <div>
                                    <label className="flex items-center gap-3 cursor-pointer p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
                                        <input type="checkbox" name="consultPrice" checked={formData.consultPrice} onChange={handleChange} className="w-5 h-5 text-secondary rounded focus:ring-secondary" />
                                        <span className="font-sans font-bold text-primary text-sm">Consultar Tarifa (Ocultar Precio)</span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Optional Filters */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Filtros Opcionales</h3>
                            <p className="text-sm text-gray-500 mb-6">Si dejas estos campos vacíos, el viaje aparecerá para cualquier búsqueda.</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="z-10 relative">
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Fechas Disponibles (Inicio y Fin)</label>
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={formData.startDate}
                                        endDate={formData.endDate}
                                        onChange={(update) => {
                                            const [start, end] = update;
                                            setFormData(prev => ({ ...prev, startDate: start, endDate: end }));
                                        }}
                                        isClearable={true}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Seleccionar fechas..."
                                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Pasajeros</label>
                                    <select name="passengers" value={formData.passengers} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary">
                                        <option value="">Sin límite (Cualquiera)</option>
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

                        {/* Tags */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Etiquetas Visuales</h3>
                            
                            <div className="mb-4 bg-gray-50 border border-gray-200 p-3 rounded-xl flex flex-wrap gap-2 items-center">
                                <span className="text-xs font-bold text-gray-400 uppercase mr-2 block w-full mb-1">Elige un icono:</span>
                                {availableIcons.map(icon => {
                                    const IconComp = LucideIcons[icon.name];
                                    return (
                                        <button
                                            key={icon.name}
                                            type="button"
                                            title={icon.label}
                                            onClick={() => setCurrentTagIcon(icon.name)}
                                            className={`p-2 rounded-lg transition-all flex items-center justify-center ${currentTagIcon === icon.name ? 'bg-secondary text-white shadow-md scale-110' : 'text-gray-400 hover:bg-white hover:text-primary hover:shadow-sm'}`}
                                        >
                                            <IconComp size={20} />
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex gap-4 mb-6">
                                <div className="flex items-center justify-center bg-gray-50 border border-gray-200 w-12 rounded-xl text-secondary">
                                    {React.createElement(LucideIcons[currentTagIcon] || LucideIcons.Plane, { size: 24 })}
                                </div>
                                <input 
                                    type="text" 
                                    value={currentTagText} 
                                    onChange={(e) => setCurrentTagText(e.target.value)} 
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-secondary" 
                                    placeholder="Texto etiqueta (Ej: Vuelo Directo, Salida Grupal)"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                                />
                                <button type="button" onClick={addTag} className="bg-primary hover:bg-secondary text-white font-bold px-6 rounded-xl transition-colors">Añadir</button>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {formData.tags.map((tag, idx) => {
                                    const IconComponent = LucideIcons[tag.iconName];
                                    return (
                                        <div key={idx} className="bg-blue-50 border border-blue-100 text-secondary text-sm font-bold px-3 py-1.5 rounded-lg flex items-center gap-2">
                                            {IconComponent && <IconComponent size={14} />}
                                            {tag.text}
                                            <button type="button" onClick={() => removeTag(idx)} className="ml-2 hover:text-red-500 font-bold">&times;</button>
                                        </div>
                                    );
                                })}
                                {formData.tags.length === 0 && <span className="text-gray-400 text-sm">No hay etiquetas.</span>}
                            </div>
                        </div>

                    </div>

                    {/* Right Column (Media & Settings) */}
                    <div className="space-y-8">
                        
                        {/* Status / Toggles */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Ajustes Web</h3>
                            
                            <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 mb-4 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-sans font-bold text-primary">Destacado</span>
                                    <span className="text-xs text-gray-500">Mostrar en el inicio</span>
                                </div>
                                <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="w-5 h-5 text-secondary rounded" />
                            </label>

                            <label className="flex items-center justify-between cursor-pointer p-4 border border-gray-200 rounded-xl hover:bg-gray-50 mb-4 transition-colors">
                                <div className="flex flex-col">
                                    <span className="font-sans font-bold text-primary text-sm">En Hero (Carrusel)</span>
                                    <span className="text-xs text-gray-500">Imagen grande arriba de todo</span>
                                </div>
                                <input type="checkbox" name="isHero" checked={formData.isHero} onChange={handleChange} className="w-5 h-5 text-secondary rounded" />
                            </label>

                            <div className="mt-6">
                                <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider block mb-2">Valoración (Estrellas)</label>
                                <input type="text" name="rating" value={formData.rating} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary" placeholder="Ej: 4.8" />
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Foto Principal</h3>
                            
                            <div className="relative border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden hover:border-secondary hover:bg-blue-50 transition-all group">
                                <input type="file" required={!isEditing && !formData.imageUrl} accept="image/*" onChange={handleImageChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                
                                {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                                ) : (
                                    <div className="h-48 flex flex-col items-center justify-center text-gray-400 group-hover:text-secondary group-hover:scale-105 transition-all">
                                        <ImageIcon size={48} className="mb-2" />
                                        <span className="font-bold font-sans text-sm">Clic para subir foto espectacular</span>
                                        <span className="text-xs mt-1">(Ideal: 1920x1080px)</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Category Image Upload */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Foto de Categoría (Tipo de Viaje)</h3>
                            <p className="text-xs text-gray-400 mb-4">Se usará en la sección "Descubre por Categoría". Si elegiste un Tipo existente, esta foto ya se auto-completó.</p>

                            <div className="relative border-2 border-dashed border-gray-300 rounded-2xl overflow-hidden hover:border-secondary hover:bg-blue-50 transition-all group">
                                <input type="file" accept="image/*" onChange={(e) => {
                                    if(e.target.files[0]) {
                                        setCategoryFile(e.target.files[0]);
                                        setCategoryPreview(URL.createObjectURL(e.target.files[0]));
                                    }
                                }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                                
                                {categoryPreview ? (
                                    <img src={categoryPreview} alt="Preview Categoría" className="w-full h-32 object-cover" />
                                ) : (
                                    <div className="h-32 flex flex-col items-center justify-center text-gray-400 group-hover:text-secondary group-hover:scale-105 transition-all">
                                        <ImageIcon size={32} className="mb-2" />
                                        <span className="font-bold font-sans text-xs flex text-center max-w-[80%] mx-auto mt-2">Clic para subir foto única para la categoría</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Dynamic Itinerary Editor */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h3 className="text-xl font-serif font-bold text-primary mb-6 border-b pb-4">Itinerario Dinámico a PDF</h3>
                            <p className="text-xs text-gray-400 mb-4">Escribe el día a día aquí. Nuestro sistema lo transformará automáticamente en un elegante PDF corporativo cuando el cliente pulse Descargar Itinerario.</p>
                            
                            <textarea 
                                name="itineraryText" 
                                value={formData.itineraryText} 
                                onChange={handleChange} 
                                rows="15" 
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-primary font-sans focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary whitespace-pre-line" 
                                placeholder="Día 1: Vuelo internacional a destino...
Día 2: Desayuno buffet y city tour...
Día 3: Día libre para conocer la ciudad..." 
                            />
                        </div>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AdminTripForm;
