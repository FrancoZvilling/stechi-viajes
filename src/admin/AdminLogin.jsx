import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { Lock, Mail, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Redirigir si ya está logueado
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                navigate('/admin/dashboard');
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin/dashboard');
        } catch (err) {
            console.error(err);
            setError('Credenciales incorrectas o problema de conexión.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-6 relative">
            <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-primary transition-colors font-sans font-semibold">
                <ArrowLeft size={20} /> Volver a la web
            </Link>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl p-10 shadow-2xl shadow-gray-200/50 w-full max-w-md border border-gray-100"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-blue-50 text-primary rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-100">
                        <Lock size={32} />
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-primary">Panel de Control</h2>
                    <p className="text-gray-500 font-sans mt-2">Ingresa tus credenciales para administrar Stechi Tours.</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl flex items-center gap-3 mb-6 border border-red-100 font-sans text-sm">
                        <AlertCircle size={20} className="shrink-0" />
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider">Correo Electrónico</label>
                        <div className="relative">
                            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="email" 
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-primary font-sans focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                placeholder="tucorreo@ejemplo.com"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[0.7rem] font-bold text-gray-500 uppercase tracking-wider">Contraseña</label>
                        <div className="relative">
                            <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input 
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 pl-11 pr-4 text-primary font-sans focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className="w-full bg-primary hover:bg-secondary text-white font-bold py-4 rounded-xl mt-4 transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Iniciando sesión...' : 'Entrar al Panel'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
