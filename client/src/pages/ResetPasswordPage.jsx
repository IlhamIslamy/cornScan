import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { KeyRound, Save, AlertCircle, CheckCircle, Leaf } from 'lucide-react';
import { API_ENDPOINTS } from '../config';
const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setMessage({ type: 'error', text: 'Kata sandi minimal harus 6 karakter.' });
            return;
        }
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Konfirmasi kata sandi tidak cocok.' });
            return;
        }
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            // GANTI BARIS INI
            const res = await fetch(API_ENDPOINTS.resetPassword, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Token tidak valid atau telah kedaluwarsa.');
            
            setMessage({ type: 'success', text: `${data.message} Anda akan dialihkan ke halaman login...` });
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
             {/* Elemen Dekoratif */}
            <div className="absolute top-20 left-10 animate-bounce delay-100">
                <Leaf className="w-8 h-8 text-green-300 opacity-60" />
            </div>
            <div className="absolute bottom-10 right-20 animate-bounce delay-300">
                <Leaf className="w-10 h-10 text-emerald-300 opacity-50" />
            </div>

            {/* Kartu Reset Password */}
            <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Atur Ulang Kata Sandi
                    </h2>
                    <p className="mt-2 text-gray-600">
                        Buat kata sandi baru yang kuat dan mudah Anda ingat.
                    </p>
                </div>
                
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    {message.text && (
                        <div className={`p-4 rounded-md flex items-start space-x-3 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                           {message.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
                           <span className="text-sm font-medium">{message.text}</span>
                        </div>
                    )}
                    
                    {/* Input Password Baru */}
                    <div className="space-y-2">
                        <label htmlFor="password"  className="text-sm font-medium text-gray-700">
                            Kata Sandi Baru
                        </label>
                        <div className="relative">
                           <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                             <KeyRound size={18} />
                           </span>
                           <input
                               type="password"
                               id="password"
                               placeholder="••••••••"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               required
                               className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                           />
                        </div>
                    </div>

                    {/* Input Konfirmasi Password */}
                     <div className="space-y-2">
                        <label htmlFor="confirmPassword"  className="text-sm font-medium text-gray-700">
                           Konfirmasi Kata Sandi Baru
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <KeyRound size={18} />
                            </span>
                            <input
                                type="password"
                                id="confirmPassword"
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                            />
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading || message.type === 'success'}
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <Save className="h-5 w-5 text-green-300 group-hover:text-green-200" />
                        </span>
                        <span>{isLoading ? 'Memproses...' : 'Simpan Kata Sandi'}</span>
                    </button>

                     <p className="text-center text-sm text-gray-600">
                        Ingat kata sandi Anda?{' '}
                        <Link to="/login" className="font-medium text-green-600 hover:text-green-500 hover:underline">
                            Kembali ke Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;