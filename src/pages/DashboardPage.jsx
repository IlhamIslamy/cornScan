import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ScanLine, Leaf, BarChart2, FileClock, PlusCircle, User, Settings, AlertTriangle } from 'lucide-react';
import '../css/DashboardPage.css';
import LoadingSpinner from '../components/LoadingSpinner'; // Pastikan komponen ini ada

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
                const response = await fetch('http://localhost:3001/api/stats', {
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

    // Tampilan saat loading
    if (isLoading) {
        return <div className="content-area"><LoadingSpinner text="Memuat Statistik..." /></div>;
    }

    // Tampilan jika terjadi error
    if (error) {
        return (
            <div className="content-area text-center">
                <AlertTriangle className="w-12 h-12 mx-auto text-red-500 mb-4" />
                <h3 className="text-xl font-semibold text-red-600">Terjadi Kesalahan</h3>
                <p className="text-gray-600 mt-2">{error}</p>
            </div>
        );
    }

    // Tampilan utama
    return (
        <div className="content-area">
            <h2 style={{ textAlign: 'left', background: 'none', WebkitBackgroundClip: 'unset', WebkitTextFillColor: 'unset', paddingBottom: 0 }}>
                Selamat Datang, {userName}!
            </h2>
            <p style={{ textAlign: 'left', marginTop: 0, marginBottom: '2rem' }}>Ringkasan aktivitas CornLeaf AI Anda.</p>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon"><ScanLine size={32}/></div>
                    <div className="stat-content">
                        <h3>Total Pindai</h3>
                        <div className="stat-number">{stats.totalScans.toLocaleString('id-ID')}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><Leaf size={32}/></div>
                    <div className="stat-content">
                        <h3>Penyakit Terdeteksi</h3>
                        <div className="stat-number">{stats.diseasesDetected.toLocaleString('id-ID')}</div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><BarChart2 size={32}/></div>
                    <div className="stat-content">
                        <h3>Akurasi Rata-rata</h3>
                        <div className="stat-number">
                            {/* Tampilkan N/A jika belum ada data pindai */}
                            {stats.totalScans > 0 ? `${(stats.averageAccuracy * 100).toFixed(1)}%` : 'N/A'}
                        </div>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon"><FileClock size={32}/></div>
                    <div className="stat-content">
                        <h3>Pindai Bulan Ini</h3>
                        <div className="stat-number">{stats.scansThisMonth.toLocaleString('id-ID')}</div>
                    </div>
                </div>
            </div>

            <div className="card">
                <h3 style={{ fontWeight: 600, color: 'var(--text-color)', marginBottom: '1.5rem', fontSize: '1.2rem'}}>Aksi Cepat</h3>
                <div className="quick-actions">
                    <Link to="/cornLeafScanner" className="action-button">
                        <div className="action-icon"><PlusCircle size={24}/></div>
                        <span>Mulai Pindai Baru</span>
                    </Link>
                    <Link to="/riwayat" className="action-button">
                        <div className="action-icon"><FileClock size={24}/></div>
                        <span>Lihat Riwayat</span>
                    </Link>
                    <Link to="/team" className="action-button">
                        <div className="action-icon"><User size={24}/></div>
                        <span>Profil Tim</span>
                    </Link>
                    <Link to="/about" className="action-button">
                        <div className="action-icon"><Settings size={24}/></div>
                        <span>Tentang Aplikasi</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
