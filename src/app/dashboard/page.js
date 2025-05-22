'use client';
import Link from 'next/link';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

// Data untuk chart
const detectionData = [
    { month: 'Jan', deteksi: 45, akurat: 42 },
    { month: 'Feb', deteksi: 52, akurat: 48 },
    { month: 'Mar', deteksi: 38, akurat: 35 },
    { month: 'Apr', deteksi: 64, akurat: 58 },
    { month: 'May', deteksi: 71, akurat: 65 },
    { month: 'Jun', deteksi: 83, akurat: 77 }
];

const diseaseData = [
    { name: 'Blight', value: 35, color: '#ff6b6b' },
    { name: 'Rust', value: 28, color: '#4ecdc4' },
    { name: 'Smut', value: 22, color: '#45b7d1' },
    { name: 'Sehat', value: 15, color: '#96ceb4' }
];

const monthlyStats = [
    { month: 'Jan', total: 120 },
    { month: 'Feb', total: 150 },
    { month: 'Mar', total: 180 },
    { month: 'Apr', total: 200 },
    { month: 'May', total: 250 },
    { month: 'Jun', total: 300 }
];

export default function Dashboard() {
    return (
        <div className="content-area">
            {/* Header Stats */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                        <h3>Total Deteksi</h3>
                        <p className="stat-number">1,247</p>
                        <span className="stat-change positive">+12% dari bulan lalu</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🎯</div>
                    <div className="stat-content">
                        <h3>Akurasi</h3>
                        <p className="stat-number">92.5%</p>
                        <span className="stat-change positive">+3.2% dari bulan lalu</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">🌽</div>
                    <div className="stat-content">
                        <h3>Tanaman Sehat</h3>
                        <p className="stat-number">856</p>
                        <span className="stat-change positive">+8% dari bulan lalu</span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">⚠️</div>
                    <div className="stat-content">
                        <h3>Penyakit Terdeteksi</h3>
                        <p className="stat-number">391</p>
                        <span className="stat-change negative">-5% dari bulan lalu</span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                {/* Line Chart */}
                <div className="card chart-card">
                    <h3>Tren Deteksi Bulanan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={detectionData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="deteksi"
                                stroke="#4caf50"
                                strokeWidth={3}
                                dot={{ fill: '#4caf50', strokeWidth: 2, r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="akurat"
                                stroke="#2196f3"
                                strokeWidth={3}
                                dot={{ fill: '#2196f3', strokeWidth: 2, r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="card chart-card">
                    <h3>Distribusi Penyakit</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={diseaseData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {diseaseData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="card chart-card full-width">
                    <h3>Statistik Bulanan</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={monthlyStats}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="total" fill="#4caf50" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="card">
                <h3>Aksi Cepat</h3>
                <div className="quick-actions">
                    <Link href="/deteksi" className="action-button">
                        <div className="action-icon">🔍</div>
                        <span>Deteksi Baru</span>
                    </Link>
                    <Link href="/penyakit" className="action-button">
                        <div className="action-icon">📋</div>
                        <span>Lihat Penyakit</span>
                    </Link>
                    <Link href="/riwayat" className="action-button">
                        <div className="action-icon">📈</div>
                        <span>Riwayat</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}