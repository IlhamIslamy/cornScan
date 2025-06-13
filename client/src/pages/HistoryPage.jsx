import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Trash2, Download, X, AlertTriangle, History, Search, ArrowDownUp } from 'lucide-react';
import jsPDF from 'jspdf';
import LoadingSpinner from '../components/LoadingSpinner';
import { getRecommendation } from '../utils/recommendations'; // Pastikan path ini benar
import { API_ENDPOINTS } from '../config'; // Pastikan path ini benar dan berisi API_ENDPOINTS

const HistoryPage = () => {
    const navigate = useNavigate();
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State untuk mengelola modal
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // State untuk fungsionalitas pencarian dan pengurutan
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest', 'oldest', 'disease', 'accuracy'

    // Fungsi untuk mengambil data riwayat dari backend
    const fetchHistory = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Anda harus login untuk melihat riwayat.');
            setIsLoading(false);
            // navigate('/login'); // Uncomment if you want to redirect immediately
            return;
        }

        try {
            const response = await fetch(API_ENDPOINTS.history, { // Menggunakan API_ENDPOINTS
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                return;
            }

            // Check if response.ok is true before parsing JSON
            if (!response.ok) {
                const errorData = await response.json(); // Try to parse error message from body
                throw new Error(errorData.message || `Gagal mengambil data riwayat: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setHistoryData(data);
        } catch (err) {
            console.error("Fetch history error:", err);
            setError(`Gagal memuat riwayat: ${err.message}. Pastikan server berjalan dan koneksi internet stabil.`);
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    // Panggil fetchHistory saat komponen pertama kali dimuat
    useEffect(() => {
        fetchHistory();
    }, [fetchHistory]);

    // Memoized filtering dan sorting untuk performa lebih baik
    const filteredAndSortedData = useMemo(() => {
        let currentData = [...historyData]; // Buat salinan untuk menghindari mutasi langsung

        // Filtering
        if (searchTerm) {
            currentData = currentData.filter(item =>
                item.detection_result.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sorting
        currentData.sort((a, b) => {
            switch (sortOrder) {
                case 'oldest':
                    return new Date(a.scanned_at) - new Date(b.scanned_at);
                case 'disease':
                    return a.detection_result.localeCompare(b.detection_result);
                case 'accuracy':
                    return b.accuracy - a.accuracy; // Highest accuracy first
                case 'newest':
                default:
                    return new Date(b.scanned_at) - new Date(a.scanned_at); // Newest first
            }
        });
        return currentData;
    }, [historyData, searchTerm, sortOrder]);

    // Fungsi kontrol modal
    const openDeleteModal = (item) => { setItemToDelete(item); setShowDeleteModal(true); };
    const closeDeleteModal = () => { setItemToDelete(null); setShowDeleteModal(false); };
    const openDetailModal = (item) => { setSelectedItem(item); setShowDetailModal(true); };
    const closeDetailModal = () => { setSelectedItem(null); setShowDetailModal(false); };

    // **FUNGSI HAPUS DENGAN OPTIMISTIC UI DAN ROLLBACK**
    const handleDelete = async () => {
        if (!itemToDelete) return;

        setIsDeleting(true);
        setError(null);

        const originalHistoryData = [...historyData]; // Simpan data asli untuk rollback

        // Optimistic UI update: hapus item dari UI segera
        setHistoryData(prevData => prevData.filter(item => item.id !== itemToDelete.id));
        closeDeleteModal(); // Tutup modal setelah update UI optimis

        const token = localStorage.getItem('token');

        try {
            const response = await fetch(API_ENDPOINTS.historyItem(itemToDelete.id), { // Menggunakan API_ENDPOINTS.historyItem
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Gagal menghapus data di server.');
            }
            // Jika berhasil, tidak perlu melakukan apa-apa lagi karena UI sudah diupdate
        } catch (err) {
            setError(`Gagal menghapus riwayat: ${err.message}. Item telah dikembalikan, silakan coba lagi.`);
            setHistoryData(originalHistoryData); // Rollback: kembalikan data asli
            console.error("Delete failed:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    // **FUNGSI UNDUH PDF**
    const downloadPdfFromHistory = async (item) => {
        if (!item) {
            alert("Tidak ada data riwayat untuk diunduh.");
            return;
        }

        const doc = new jsPDF();
        const detectionDateTime = new Date(item.scanned_at);

        const recommendationObj = getRecommendation(item.detection_result);

        const recommendationList = recommendationObj && Array.isArray(recommendationObj.actions)
            ? recommendationObj.actions
            : ['Tidak ada rekomendasi penanganan yang tersedia.'];

        const detectedTitle = recommendationObj.title || item.detection_result;
        const detectedDescription = recommendationObj.description || "Tidak ada deskripsi tersedia.";
        const detectedIcon = recommendationObj.icon || "";

        doc.setFontSize(22);
        doc.text("Laporan Deteksi Penyakit Daun Jagung", 10, 20);
        doc.setFontSize(10);
        doc.text("Aplikasi Scanner Daun Jagung - Riwayat", 10, 27);
        doc.setLineWidth(0.5);
        doc.line(10, 30, 200, 30);

        doc.setFontSize(12);
        doc.text(`Tanggal Deteksi: ${detectionDateTime.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}`, 10, 40);
        doc.text(`Waktu Deteksi: ${detectionDateTime.toLocaleTimeString('id-ID')}`, 10, 47);
        doc.text(`Sumber Gambar: Riwayat Pindai`, 10, 54);

        const startYImage = 63;
        doc.setFontSize(14);
        doc.text("Gambar yang Dideteksi:", 10, startYImage);

        if (item.image_data) {
            const img = new Image();
            img.src = item.image_data;
            img.onload = () => {
                const imgWidth = 80;
                const imgHeight = (img.height * imgWidth) / img.width;
                const imgX = 10;
                const imgY = startYImage + 7;
                doc.addImage(item.image_data, 'JPEG', imgX, imgY, imgWidth, imgHeight);

                let currentY = imgY + imgHeight + 10;
                doc.setFontSize(14);
                doc.text("Hasil Deteksi:", 10, currentY);
                currentY += 10;
                doc.setFontSize(12);
                doc.text(`Penyakit Teridentifikasi: ${detectedIcon} ${detectedTitle}`, 10, currentY);
                currentY += 7;

                const splitDesc = doc.splitTextToSize(`Deskripsi: ${detectedDescription}`, 180);
                doc.text(splitDesc, 10, currentY);
                currentY += (splitDesc.length * 5) + 3;

                doc.text(`Tingkat Keyakinan: ${(item.accuracy * 100).toFixed(2)}%`, 10, currentY);
                currentY += 17;

                doc.setFontSize(14);
                doc.text("Rekomendasi Penanganan:", 10, currentY);
                currentY += 10;
                doc.setFontSize(12);

                recommendationList.forEach((action, index) => {
                    const listItemText = `${index + 1}. ${action}`;
                    const splitText = doc.splitTextToSize(listItemText, 180);
                    doc.text(splitText, 10, currentY);
                    currentY += (splitText.length * 5) + 3;
                });

                currentY = Math.max(currentY, doc.internal.pageSize.height - 30);
                const disclaimerText = "Catatan: Hasil deteksi ini dihasilkan oleh model AI dan ditujukan sebagai panduan awal. Untuk diagnosis dan penanganan yang lebih akurat, sangat disarankan untuk berkonsultasi dengan ahli pertanian atau agronomis.";
                const splitDisclaimer = doc.splitTextToSize(disclaimerText, 180);
                doc.setFontSize(8);
                doc.setTextColor(100);
                doc.text(splitDisclaimer, 10, currentY);

                doc.save(`Riwayat_Deteksi_${item.detection_result}_${detectionDateTime.toISOString().slice(0, 10)}.pdf`);
            };
            img.onerror = () => {
                alert("Gagal memuat gambar untuk PDF.");
            };
        } else {
            alert("Data gambar tidak ditemukan untuk membuat PDF.");
            // Optionally, still generate PDF without image or log to console
            console.warn("No image data found for PDF generation for item:", item);
        }
    };

    // Fungsi utilitas untuk styling dan format
    const formatDate = (dateString) => new Date(dateString).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    const getStatusClass = (result) => {
        // Menggunakan "Sehat" atau "Healthy" karena ada kemungkinan data dari backend berbahasa Inggris
        if (result === 'Sehat' || result === 'Healthy') {
            return 'bg-green-100 text-green-800';
        }
        // Asumsikan penyakit lain memerlukan tindakan
        return 'bg-yellow-100 text-yellow-800';
    };
    const getStatusText = (result) => result === 'Sehat' || result === 'Healthy' ? 'Sehat' : 'Tindakan Diperlukan';

    if (isLoading) {
        return <LoadingSpinner text="Memuat riwayat Anda..." />;
    }

    return (
        <>
            <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-green-50 to-blue-50">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <History className="w-12 h-12 mx-auto text-green-600 mb-4" />
                        <h1 className="text-4xl sm:text-5xl py-2 font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Riwayat Pindai
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Tinjau, unduh, dan kelola semua deteksi penyakit daun jagung Anda sebelumnya.
                        </p>
                    </div>

                    {/* Pesan Error */}
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert">
                            <p className="font-bold">Error</p>
                            <p>{error}</p>
                        </div>
                    )}

                    {/* Kontrol Pencarian dan Pengurutan */}
                    <div className="mb-8 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-md">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Cari berdasarkan nama penyakit..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition"
                                />
                            </div>
                            <div className="relative">
                                <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500 transition appearance-none"
                                >
                                    <option value="newest">Urutkan: Terbaru</option>
                                    <option value="oldest">Urutkan: Terlama</option>
                                    <option value="disease">Urutkan: Nama Penyakit</option>
                                    <option value="accuracy">Urutkan: Akurasi Tertinggi</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Grid Kartu Riwayat */}
                    {filteredAndSortedData.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredAndSortedData.map((item) => (
                                <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-1">
                                    <img src={item.image_data} alt={item.detection_result} className="w-full h-48 object-cover" />
                                    <div className="p-5 flex flex-col flex-grow">
                                        <p className="text-sm text-gray-500 mb-1">{formatDate(item.scanned_at).split(',')[0]}</p>
                                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.detection_result}</h3>
                                        <div className="flex justify-between items-center mt-2 mb-4">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(item.detection_result)}`}>
                                                {getStatusText(item.detection_result)}
                                            </span>
                                            <span className="font-semibold text-gray-700">{(item.accuracy * 100).toFixed(1)}% Akurasi</span>
                                        </div>
                                        <div className="mt-auto border-t pt-4 flex justify-around items-center">
                                            <button onClick={() => openDetailModal(item)} className="flex flex-col items-center text-blue-600 hover:text-blue-900 transition-colors" title="Lihat Detail">
                                                <Eye size={20} /> <span className="text-xs mt-1">Detail</span>
                                            </button>
                                            <button onClick={() => downloadPdfFromHistory(item)} className="flex flex-col items-center text-green-600 hover:text-green-900 transition-colors" title="Unduh PDF">
                                                <Download size={20} /> <span className="text-xs mt-1">Unduh</span>
                                            </button>
                                            <button onClick={() => openDeleteModal(item)} className="flex flex-col items-center text-red-600 hover:text-red-900 transition-colors" title="Hapus">
                                                <Trash2 size={20} /> <span className="text-xs mt-1">Hapus</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                            <Search className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700">Tidak Ada Hasil</h3>
                            <p className="text-gray-500 mt-2">
                                {historyData.length === 0 ? "Anda belum memiliki riwayat pemindaian." : "Tidak ada riwayat yang cocok dengan pencarian Anda."}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Konfirmasi Hapus */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity animate-fade-in">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 transform transition-all animate-scale-up">
                        <div className="flex items-start">
                            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                <AlertTriangle className="h-6 w-6 text-red-600" aria-hidden="true" />
                            </div>
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-gray-900">Hapus Riwayat Pindai</h3>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-500">Apakah Anda yakin ingin menghapus riwayat ini secara permanen? Tindakan ini tidak dapat diurungkan.</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                            <button onClick={handleDelete} disabled={isDeleting} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50">
                                {isDeleting ? 'Menghapus...' : 'Ya, Hapus'}
                            </button>
                            <button onClick={closeDeleteModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm" disabled={isDeleting}>
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Detail Penyakit */}
            {showDetailModal && selectedItem && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 animate-fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all animate-scale-up">
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-2xl font-bold text-gray-900">Detail Hasil Pindai</h3>
                                <button onClick={closeDetailModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Kolom Kiri: Gambar dan Info Dasar */}
                                <div>
                                    <img src={selectedItem.image_data} alt="Hasil Pindai" className="w-full h-auto object-cover rounded-lg shadow-md mb-4" />
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p><strong>Tanggal:</strong> {formatDate(selectedItem.scanned_at)}</p>
                                        <p><strong>Akurasi:</strong> <span className="font-bold text-gray-800">{(selectedItem.accuracy * 100).toFixed(1)}%</span></p>
                                    </div>
                                </div>

                                {/* Kolom Kanan: Detail dan Rekomendasi */}
                                <div className="space-y-4">
                                    {(() => {
                                        const recommendation = getRecommendation(selectedItem.detection_result);
                                        return (
                                            <>
                                                <div>
                                                    <h4 className="font-bold text-lg text-gray-800">Penyakit Teridentifikasi:</h4>
                                                    <div className="flex items-center mt-1">
                                                        <p className="text-xl font-bold text-gray-800">{recommendation.icon} {recommendation.title || selectedItem.detection_result}</p>
                                                        <span className={`ml-3 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(selectedItem.detection_result)}`}>
                                                            {getStatusText(selectedItem.detection_result)}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-600 mt-2">{recommendation.description}</p>
                                                </div>

                                                <div>
                                                    <h4 className="font-bold text-lg text-gray-800 mt-4">Rekomendasi Penanganan:</h4>
                                                    <ul className="list-disc list-inside text-gray-600 space-y-2 mt-2 pl-2">
                                                        {recommendation.actions.map((action, index) => (
                                                            <li key={index}>{action}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                        <div className="px-6 md:px-8 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row-reverse sm:items-center">
                            <button onClick={() => downloadPdfFromHistory(selectedItem)} className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                                <Download size={18} className="mr-2" /> Unduh Laporan PDF
                            </button>
                            <button onClick={closeDetailModal} className="mt-3 sm:mt-0 sm:mr-3 w-full sm:w-auto inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HistoryPage;