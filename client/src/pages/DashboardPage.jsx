// src/pages/DashboardPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ScanLine, Leaf, BarChart2, FileClock, PlusCircle, User, Settings, AlertTriangle } from 'lucide-react';
import { API_ENDPOINTS } from '../config'; // <--- TAMBAHKAN BARIS INI

// Asumsi Anda memiliki komponen LoadingSpinner, jika tidak, ganti dengan div sederhana.
const LoadingSpinner = ({ text }) => (
    <div className="flex flex-col items-center justify-center h-full">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent border-solid rounded-full animate-spin"></div>
        {text && <p className="mt-4 text-lg text-gray-600">{text}</p>}
    </div>
);


const DashboardPage = () => {
    const [userName, setUserName] = useState('');
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Ambil nama pengguna
        const userData = localStorage.getItem('user');
        if (userData) {
            const user = JSON.parse(userData);
            setUserName(user.fullName || 'Pengguna');
        }

        // Fungsi untuk mengambil data statistik
        const fetchStats = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                // GANTI BARIS INI
                const response = await fetch(API_ENDPOINTS.stats, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.status === 401 || response.status === 403) {
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    navigate('/login');
                    return;
                }

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Gagal memuat statistik.');
                }
                
                const data = await response.json();
                setStats(data);

            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [navigate]);

    // Container utama dengan padding dan latar belakang gradien
    const PageContainer = ({ children }) => (
        <div className="flex-grow p-6 sm:p-8 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                {children}
            </div>
        </div>
    );

    // Tampilan saat loading
    if (isLoading) {
        return (
            <PageContainer>
                <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
                    <LoadingSpinner text="Memuat Statistik..." />
                </div>
            </PageContainer>
        );
    }

    // Tampilan jika terjadi error
    if (error) {
        return (
            <PageContainer>
                <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
                    <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                    <h3 className="text-xl font-semibold text-red-600">Terjadi Kesalahan</h3>
                    <p className="text-gray-600 mt-2">{error}</p>
                </div>
            </PageContainer>
        );
    }

    // Tampilan utama
    return (
        <PageContainer>
            {/* --- HEADER --- */}
            <div className="mb-10">
                <h2 className="text-4xl font-bold text-gray-800">
                    Selamat Datang, <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">{userName}!</span>
                </h2>
                <p className="text-gray-600 mt-2 text-lg">Ringkasan aktivitas CornLeaf AI Anda.</p>
            </div>

            {/* --- GRID STATISTIK --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {/* Kartu Statistik Individual */}
                <StatCard icon={<ScanLine size={32}/>} title="Total Pindai" value={stats.totalScans} />
                <StatCard icon={<Leaf size={32}/>} title="Penyakit Terdeteksi" value={stats.diseasesDetected} />
                <StatCard icon={<BarChart2 size={32}/>} title="Akurasi Rata-rata" value={stats.totalScans > 0 ? `${(stats.averageAccuracy * 100).toFixed(1)}%` : 'N/A'} />
                <StatCard icon={<FileClock size={32}/>} title="Pindai Bulan Ini" value={stats.scansThisMonth} />
            </div>

            {/* --- KARTU AKSI CEPAT --- */}
            <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Aksi Cepat</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickActionButton icon={<PlusCircle size={28}/>} label="Mulai Pindai Baru" to="/cornLeafScanner" />
                    <QuickActionButton icon={<FileClock size={28}/>} label="Lihat Riwayat" to="/riwayat" />
                    <QuickActionButton icon={<User size={28}/>} label="Profil Tim" to="/team" />
                    <QuickActionButton icon={<Settings size={28}/>} label="Tentang Aplikasi" to="/about" />
                </div>
            </div>
        </PageContainer>
    );
};

// Komponen untuk kartu statistik
const StatCard = ({ icon, title, value }) => (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 flex items-center space-x-4 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
        <div className="bg-gradient-to-br from-green-100 to-blue-200 text-green-700 p-4 rounded-full">
            {icon}
        </div>
        <div>
            <h3 className="text-sm font-medium text-gray-600">{title}</h3>
            <div className="text-2xl lg:text-3xl font-bold text-gray-800">
                {typeof value === 'number' ? value.toLocaleString('id-ID') : value}
            </div>
        </div>
    </div>
);

// Komponen untuk tombol aksi cepat
const QuickActionButton = ({ icon, label, to }) => (
    <Link to={to} className="group flex flex-col items-center justify-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-green-50 transition-all duration-300 text-gray-700 hover:text-green-700 text-center border border-gray-200 hover:border-green-300 hover:-translate-y-1">
        <div className="mb-3 text-gray-500 group-hover:text-green-600 transition-colors duration-300">
            {icon}
        </div>
        <span className="text-sm font-semibold">{label}</span>
    </Link>
);


export default DashboardPage;