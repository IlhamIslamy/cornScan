import React, { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Camera, Upload, Save, LogIn } from "lucide-react";

// Import hooks dan komponen lain (tidak berubah)
import { useTensorFlowModel } from "../hooks/useTensorFlowModel";
import { usePrediction } from "../hooks/usePrediction";
import { useCamera } from "../hooks/useCamera";
import LoadingSpinner from "../components/LoadingSpinner";
import ModelStatus from "../components/ModelStatus";
import UploadTab from '../components/UploadTab';
import CameraTab from '../components/CameraTab';
import ImagePreview from "../components/ImagePreview";
import PredictionResult from "../components/PredictionResult";
import { getRecommendation } from '../utils/recommendations';

const CornLeafDetectionPage = () => {
    const navigate = useNavigate();
    const { model, isLoadingModel, modelError } = useTensorFlowModel();
    const { result, isPredicting, predictionError, performPrediction, resetPrediction } = usePrediction();
    
    // State `preview` akan menyimpan data gambar Base64 dari kamera atau upload
    const [preview, setPreview] = useState(null);
    const [activeTab, setActiveTab] = useState('upload');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    // --- FUNGSI UTAMA YANG DIPERBARUI ---
    const saveHistory = async () => {
        // Guard clause: pastikan ada hasil, pengguna login, DAN ada gambar di preview
        if (!result || !isLoggedIn || !preview) return; 
        
        const token = localStorage.getItem('token');
        setIsSaving(true);
        setSaveMessage('');
        const recommendationData = getRecommendation(result.className);
        
        try {
            const response = await fetch('http://localhost:3001/api/history/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    detection_result: result.className,
                    accuracy: result.probability,
                    recommendation: recommendationData,
                    image_data: preview // <-- KIRIM DATA GAMBAR DARI STATE PREVIEW
                })
            });

            // Cek jika token ditolak (kadaluwarsa atau tidak valid)
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
                return;
            }

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Gagal menyimpan.');
            setSaveMessage(data.message);

        } catch (error) {
            setSaveMessage(error.message);
        } finally {
            setIsSaving(false);
        }
    };
    // --- AKHIR FUNGSI YANG DIPERBARUI ---

    // Fungsi ini sudah benar, ia menyimpan data gambar Base64 ke state `preview`
    const processFile = useCallback((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            setPreview(e.target.result); // e.target.result adalah string Base64
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                performPrediction(model, img);
            };
        };
        reader.readAsDataURL(file);
    }, [model, performPrediction]);

    // Hook useCamera sudah benar, ia memanggil `processFile` setelah foto diambil
    const { videoRef, canvasRef, isCameraOpen, cameraError, openCamera, closeCamera, capturePhoto } = useCamera((file) => {
        processFile(file);
        setActiveTab('upload');
    });

    const resetAll = useCallback(() => {
        setPreview(null);
        resetPrediction();
        setSaveMessage('');
    }, [resetPrediction]);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (!file) { resetAll(); return; }
        resetAll();
        processFile(file);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        if (isCameraOpen) closeCamera();
        if (tab !== activeTab) {
            resetAll();
            setPreview(null);
        }
    };

    if (isLoadingModel) {
        return <LoadingSpinner text="Memuat model AI, mohon tunggu..." />;
    }

    const showCameraResult = activeTab === 'camera' && !isCameraOpen && preview;

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-4xl mx-auto text-center">
                <Leaf className="w-16 h-16 mx-auto text-green-500 mb-4" />
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Scanner Daun Jagung</h1>
                <p className="text-gray-600 mb-8">Unggah gambar atau gunakan kamera untuk analisis penyakit secara instan.</p>

                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
                    <div className="flex border-b border-gray-200">
                        <button onClick={() => handleTabChange('upload')} className={`flex-1 py-4 px-6 font-medium transition-colors ${ activeTab === 'upload' ? 'bg-green-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:text-gray-800' }`}>
                            <Upload className="w-5 h-5 inline mr-2" /> Unggah Gambar
                        </button>
                        <button onClick={() => handleTabChange('camera')} className={`flex-1 py-4 px-6 font-medium transition-colors ${ activeTab === 'camera' ? 'bg-green-50 text-green-600 border-b-2 border-green-500' : 'text-gray-600 hover:text-gray-800' }`}>
                            <Camera className="w-5 h-5 inline mr-2" /> Gunakan Kamera
                        </button>
                    </div>

                    <div className="p-6">
                        {activeTab === 'upload' && (
                           <UploadTab model={model} isPredicting={isPredicting} error={predictionError || modelError} result={result} preview={preview} onImageUpload={handleImageUpload} onReset={resetAll}/>
                        )}
                        {activeTab === 'camera' && (
                            <>
                                <CameraTab videoRef={videoRef} isCameraOpen={isCameraOpen} cameraError={cameraError || modelError} openCamera={openCamera} closeCamera={closeCamera} capturePhoto={capturePhoto} isPredicting={isPredicting} modelReady={!!model} />
                                {showCameraResult && (
                                    <>
                                        <ImagePreview preview={preview} onReset={resetAll} />
                                        <PredictionResult result={result} error={predictionError} />
                                    </>
                                )}
                            </>
                        )}

                        {result && !predictionError && (
                            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
                                {isLoggedIn ? (
                                    <>
                                        <button
                                            onClick={saveHistory}
                                            disabled={isSaving || !!saveMessage}
                                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                        >
                                            <Save className="w-5 h-5 mr-2" />
                                            {isSaving ? 'Menyimpan...' : 'Simpan Hasil ke Riwayat'}
                                        </button>
                                        {saveMessage && (
                                            <p className={`mt-4 text-sm font-medium ${saveMessage.includes('berhasil') ? 'text-green-600' : 'text-red-600'}`}>
                                                {saveMessage}
                                            </p>
                                        )}
                                    </>
                                ) : (
                                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex items-center justify-center">
                                            <LogIn className="w-6 h-6 mr-3 text-blue-600" />
                                            <p className="text-gray-700">
                                                Silakan{' '}
                                                <Link to="/login" className="font-bold text-blue-600 hover:underline">
                                                    login
                                                </Link>
                                                {' '}untuk menyimpan hasil pindai ini.
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <ModelStatus model={model} isLoadingModel={isLoadingModel} error={modelError} />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
            </div>
        </div>
    );
};

export default CornLeafDetectionPage;
