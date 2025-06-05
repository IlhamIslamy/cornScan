import React, { useState, useEffect, useRef, useCallback } from "react";
import * as tf from "@tensorflow/tfjs";
import { labels } from "../utils/labels";
import ErrorDisplay from "../components/ErrorDisplay";
import FileInput from "../components/FileInput";
import ImagePreview from "../components/ImagePreview";
import PredictionResult from "../components/PredictionResult";
import LoadingSpinner from "../components/LoadingSpinner";
import ModelStatus from "../components/ModelStatus";
import {
  loadModel,
  preprocessImage,
  makePrediction,
  findBestPrediction
} from "../services/predictionService";
import { Leaf, Camera, Upload, X } from "lucide-react";

const THRESHOLD = 0.5;

const isLikelyLeaf = (img) => {
  const w = 100;
  const h = 100;
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const ctx = off.getContext("2d");
  ctx.drawImage(img, 0, 0, w, h);
  const data = ctx.getImageData(0, 0, w, h).data;
  let leafPixels = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (g > r + 20 && g > b + 20) {
      leafPixels++;
    }
  }
  return leafPixels / (w * h) > 0.10; // lebih dari 10% → anggap hijau (daun)
};

// Device checking
const isMobileDevice = () => {
  const ua = navigator.userAgent || "";
  const isiOS = /iPhone|iPad|iPod/.test(ua);
  const isAndroid = /Android/.test(ua);
  const isPortrait = window.innerWidth < window.innerHeight;
  return (isiOS || isAndroid || isPortrait);
};

const CornLeafDetection = () => {
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [model, setModel] = useState(null);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [error, setError] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

  const CLASS_NAMES = labels;

  // Initialize model
  useEffect(() => {
    const initializeModel = async () => {
      setIsLoadingModel(true);
      setError(null);

      const { model: loadedModel, error: loadError } = await loadModel();
      if (loadedModel) {
        setModel(loadedModel);
      } else {
        setError(loadError);
      }

      setIsLoadingModel(false);
    };
    initializeModel();
  }, []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (!isCameraOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      return;
    }
    // isCameraOpen === true, get function getUserMedia
        (async () => {
      try {
        // Select orientation by device
        const mobile = isMobileDevice();

        let videoConstraints;
        if (mobile) {
          // Potrait mode for mobile
          videoConstraints = {
            width: { ideal: 480, min: 320 },
            height: { ideal: 640, min: 480 },
            aspectRatio: { ideal: 3 / 4 }, // rasio portrait 3:4
            facingMode: { ideal: "environment" },
            frameRate: { ideal: 30, min: 15, max: 60 },
          };
        } else {
          // Lanskap mode for desktop
          videoConstraints = {
            width: { ideal: 1280, min: 640 },
            height: { ideal: 720, min: 360 },
            aspectRatio: { ideal: 16 / 9 }, // rasio landscape 16:9
            facingMode: { ideal: "environment" },
            frameRate: { ideal: 30, min: 15, max: 60 },
          };
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: videoConstraints,
          audio: false, // don't need audio
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setError(null);
          await videoRef.current.play().catch((e) => {
            console.warn("⚠️ play() error:", e);
          });
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        // Handle specific errors with user-friendly messages
        let message;
        switch (err.name) {
          case "NotAllowedError":
          case "PermissionDeniedError":
            message = "Akses kamera ditolak. Mohon izinkan izin kamera di pengaturan browser.";
            break;
          case "NotFoundError":
          case "OverconstrainedError":
            message = "Tidak menemukan kamera yang mendukung resolusi atau orientasi yang diminta.";
            break;
          default:
            message = `Terjadi kesalahan saat mengakses kamera: ${err.message}`;
        }
        setError(message);
        setIsCameraOpen(false);
      }
    })();
  }, [isCameraOpen]);

  const openCamera = useCallback(() => {
    setError(null);
    setIsCameraOpen(true);
  }, []);

  const closeCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsCameraOpen(false);
  }, []);

  const performPrediction = async (img) => {
    if (!model) {
      setError("Model belum siap. Mohon tunggu hingga model selesai dimuat.");
      return;
    }

    // Heuristik green leaf
    if (!isLikelyLeaf(img)) {
      setError("Foto yang diunggah bukan daun jagung.");
      setResult(null);
      return;
    }

    try {
      setIsPredicting(true);
      const tensor = preprocessImage(img);
      const data = await makePrediction(model, tensor);
      const predictionResult = findBestPrediction(data, CLASS_NAMES);

      // Check low threshold confidence 
      if (predictionResult.confidence < THRESHOLD) {
        setError("Foto yang diunggah bukan daun jagung.");
        setResult(null);
        tf.dispose(tensor);
        return;
      }

      setResult(predictionResult);
      tf.dispose(tensor);
    } catch (err) {
      setError("Error saat prediksi: " + err.message);
    } finally {
      setIsPredicting(false);
    }
  };

  const processImageFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      setPreview(reader.result);

      img.onload = () => callback(img);
      img.onerror = () => setError("Gagal memuat pratinjau gambar.");
    };

    reader.onerror = () => setError("Gagal membaca file gambar.");
    reader.readAsDataURL(file);
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      setPreview(null);
      setResult(null);
      setError(null);
      return;
    }
    if (!model) {
      setError("Model belum siap. Mohon tunggu atau periksa error pemuatan model.");
      return;
    }
    setPreview(null);
    setResult(null);
    setError(null);
    processImageFile(file, performPrediction);
  };

  const capturePhoto = useCallback(() => {
    if (!model) {
      setError("Model belum siap. Mohon tunggu hingga model selesai dimuat.");
      return;
    }

    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], `corn-leaf-${Date.now()}.jpg`, { type: 'image/jpeg' });
          processImageFile(file, performPrediction);
          closeCamera();
          setActiveTab('upload');
        }
      }, 'image/jpeg', 0.9);
    }
  }, [closeCamera, model]);

  const resetAll = () => {
    setPreview(null);
    setResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (isLoadingModel) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Leaf className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Scanner Daun Jagung</h1>
        <p className="text-gray-600 mb-8">Upload foto atau gunakan kamera untuk analisis AI</p>

        {/* Tab Navigation */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden mb-8">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('upload');
                closeCamera();
              }}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'upload'
                  ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Upload className="w-5 h-5 inline mr-2" />
              Upload Gambar
            </button>
            <button
              onClick={() => setActiveTab('camera')}
              className={`flex-1 py-4 px-6 font-medium transition-colors ${
                activeTab === 'camera'
                  ? 'bg-green-50 text-green-600 border-b-2 border-green-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <Camera className="w-5 h-5 inline mr-2" />
              Gunakan Kamera
            </button>
          </div>

          <div className="p-6">
            {/* Upload Tab */}
            {activeTab === 'upload' && (
              <div>
                <ErrorDisplay error={error} />

                <FileInput
                  onFileChange={handleImageUpload}
                  disabled={!model}
                  ref={fileInputRef}
                />

                {isPredicting && <LoadingSpinner />}

                <ImagePreview preview={preview} onReset={resetAll} />

                <PredictionResult result={result} error={error} />
              </div>
            )}

            {/* Camera Tab */}
            {activeTab === 'camera' && (
              <div>
                <ErrorDisplay error={error} />

                {!isCameraOpen ? (
                  <div className="text-center py-12">
                    <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">
                      Gunakan Kamera
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Ambil foto daun jagung langsung dengan kamera
                    </p>
                    <button
                      onClick={openCamera}
                      disabled={!model}
                      className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <Camera className="w-5 h-5 inline mr-2" />
                      Buka Kamera
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full rounded-lg"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-4">
                      <button
                        onClick={closeCamera}
                        className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors shadow-lg"
                        title="Tutup Kamera"
                      >
                        <X className="w-6 h-6" />
                      </button>
                      <button
                        onClick={capturePhoto}
                        disabled={!model || isPredicting}
                        className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-green-600 p-4 rounded-full transition-colors shadow-lg border-4 border-green-500"
                        title="Ambil Foto"
                      >
                        <Camera className="w-8 h-8" />
                      </button>
                    </div>

                    {/* Rules open camera */}
                    <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg text-sm">
                      <p>📸 Arahkan kamera ke daun jagung</p>
                      <p>💡 Pastikan pencahayaan cukup</p>
                    </div>

                    {/* Loading overlay prediction */}
                    {isPredicting && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                        <div className="bg-white p-4 rounded-lg">
                          <LoadingSpinner />
                          <p className="text-gray-600 mt-2">Menganalisis foto...</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'camera' && !isCameraOpen && (
                  <>
                    <ImagePreview preview={preview} onReset={resetAll} />
                    <PredictionResult result={result} error={error} />
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <ModelStatus
          model={model}
          isLoadingModel={isLoadingModel}
          error={error}
        />

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default CornLeafDetection;
