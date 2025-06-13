import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, Leaf } from 'lucide-react';
import { API_ENDPOINTS } from '../config';
const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

   try {
      // Perubahan di sini: Menggunakan API_ENDPOINTS.login
      const res = await fetch(API_ENDPOINTS.login, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Terjadi kesalahan');
      }
      
      setIsError(false);
      setMessage(data.message || "Login berhasil!");
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);

    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // --- CONTAINER UTAMA ---
    // Menggunakan Flexbox untuk memusatkan kartu login di tengah layar
    // Latar belakang abu-abu muda untuk kontras
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Elemen Dekoratif Latar Belakang (konsisten dengan HomePage) */}
        <div className="absolute top-20 left-10 animate-bounce delay-100">
            <Leaf className="w-8 h-8 text-green-300 opacity-60" />
        </div>
        <div className="absolute bottom-10 right-20 animate-bounce delay-300">
            <Leaf className="w-10 h-10 text-emerald-300 opacity-50" />
        </div>
        <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-30 animate-pulse" />
        
        {/* --- KARTU LOGIN --- */}
        <div className="relative z-10 w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900">
                    Selamat Datang Kembali!
                </h2>
                <p className="mt-2 text-gray-600">
                    Silakan masuk untuk melanjutkan.
                </p>
            </div>
      
            <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                {/* --- INPUT EMAIL --- */}
                <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Alamat Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="contoh@email.com"
                        value={email}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                </div>

                {/* --- INPUT PASSWORD --- */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Kata Sandi
                        </label>
                        {/* <Link to="/forgot-password" className="text-sm font-medium text-green-600 hover:text-green-500 hover:underline">
                            Lupa Kata Sandi?
                        </Link> */}
                    </div>
                    <input
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={onChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                    />
                </div>

                {/* --- PESAN ERROR/SUCCESS --- */}
                {message && (
                    <p className={`text-center text-sm font-medium ${isError ? 'text-red-600' : 'text-green-600'}`}>
                        {message}
                    </p>
                )}

                {/* --- TOMBOL SUBMIT --- */}
                <button 
                    type="submit" 
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <LogIn className="h-5 w-5 text-green-300 group-hover:text-green-200" />
                    </span>
                    <span>{isLoading ? 'Memproses...' : 'Login'}</span>
                </button>

                <p className="text-center text-sm text-gray-600">
                    Belum punya akun?{' '}
                    <Link to="/register" className="font-medium text-green-600 hover:text-green-500 hover:underline">
                        Daftar di sini
                    </Link>
                </p>
            </form>
        </div>
    </div>
  );
};

export default LoginPage;