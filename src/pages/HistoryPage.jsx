import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, AlertTriangle, Trash2 } from 'lucide-react';
import '../css/HistoryPage.css';
import LoadingSpinner from '../components/LoadingSpinner';

const HistoryPage = () => {
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk mengelola modal konfirmasi hapus
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Fungsi untuk mengambil data riwayat dari backend
    const fetchHistory = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        // Jika tidak ada token, pengguna belum login
        if (!token) {
            setError('Anda harus login untuk melihat riwayat.');
            setIsLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:3001/api/history', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            // Jika token ditolak (kadaluwarsa/tidak valid), logout otomatis
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                return;
            }
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Gagal mengambil data riwayat.');
            }
            setHistoryData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // Panggil fetchHistory saat komponen pertama kali dimuat
    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);
    
    // Fungsi untuk membuka modal konfirmasi
    const openDeleteModal = (item) => {
        setItemToDelete(item);
        setShowDeleteModal(true);
    };

    // Fungsi untuk menutup modal konfirmasi
    const closeDeleteModal = () => {
        setItemToDelete(null);
        setShowDeleteModal(false);
    };

    // Fungsi untuk menjalankan proses penghapusan
    const handleDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);
        setError(null); // Bersihkan error sebelumnya
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(`http://localhost:3001/api/history/${itemToDelete.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Gagal menghapus riwayat.');
            }
            
            // Perbarui UI secara langsung dengan menghapus item dari state
            setHistoryData(prevData => prevData.filter(item => item.id !== itemToDelete.id));

        } catch (err) {
            setError(err.message);
        } finally {
            setIsDeleting(false);
            closeDeleteModal();
        }
    };

    // Fungsi utilitas untuk format tanggal
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('id-ID', options);
    };

    // Fungsi utilitas untuk styling status
    const getStatusClass = (result) => {
        if (result === 'Sehat') return 'status-sehat';
        if (result === 'Karat' || result === 'Hawar') return 'status-sedang';
        return 'status-diperlukan';
    };
    
    const getStatusText = (result) => {
        if (result === 'Sehat') return 'Sehat';
        return 'Tindakan Diperlukan';
    };

    if (isLoading) {
        return <LoadingSpinner text="Memuat riwayat Anda..." />;
    }
    
    return (
        <>
            <div className="content-area">
                <h2 className="text-left">Riwayat Pindai</h2>
                {error && <div className="error-message">{error}</div>}
                <div className="card">
                    <div className="table-container">
                        {historyData.length > 0 ? (
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>Gambar</th>
                                        <th>Tanggal</th>
                                        <th>Hasil Deteksi</th>
                                        <th>Akurasi</th>
                                        <th className="text-center">Status</th>
                                        <th className="text-center">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historyData.map((item) => (
                                        <tr key={item.id}>
                                            <td>
                                                <img src={item.image_data} alt={item.detection_result} className="history-image" />
                                            </td>
                                            <td>{formatDate(item.scanned_at)}</td>
                                            <td className="font-medium">{item.detection_result}</td>
                                            <td className="font-medium">{(item.accuracy * 100).toFixed(1)}%</td>
                                            <td className="text-center">
                                                <span className={`status-badge ${getStatusClass(item.detection_result)}`}>
                                                    {getStatusText(item.detection_result)}
                                                </span>
                                            </td>
                                            <td className="text-center action-buttons">
                                                <button className="btn-icon" title="Lihat Detail"><Eye size={18} /></button>
                                                <button onClick={() => openDeleteModal(item)} className="btn-icon btn-delete" title="Hapus"><Trash2 size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                             <div className="text-center py-12">
                                <p className="text-gray-500">Anda belum memiliki riwayat pemindaian.</p>
                             </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h3 className="modal-title">Konfirmasi Hapus</h3>
                        <p className="modal-body">Apakah Anda yakin ingin menghapus riwayat pindai ini secara permanen?</p>
                        <div className="modal-actions">
                            <button onClick={closeDeleteModal} className="btn-secondary" disabled={isDeleting}>Batal</button>
                            <button onClick={handleDelete} disabled={isDeleting} className="btn-danger">
                                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HistoryPage;
