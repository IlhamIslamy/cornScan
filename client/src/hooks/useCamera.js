import { useState, useRef, useEffect, useCallback } from 'react';
import { isMobileDevice } from '../utils/detectionUtils';

export const useCamera = (onCapture) => {
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [cameraError, setCameraError] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const openCamera = useCallback(() => {
    setCameraError(null);
    setIsCameraOpen(true);
  }, []);

  const closeCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOpen(false);
  }, []);

  // Effect untuk mengelola stream kamera (tidak berubah)
  useEffect(() => {
    if (!isCameraOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      return;
    }

    const startCamera = async () => {
      try {
        const mobile = isMobileDevice();
        const videoConstraints = mobile
          ? { width: { ideal: 480 }, height: { ideal: 640 }, aspectRatio: { ideal: 3 / 4 }, facingMode: { ideal: "environment" }, frameRate: { ideal: 30 } }
          : { width: { ideal: 1280 }, height: { ideal: 720 }, aspectRatio: { ideal: 16 / 9 }, facingMode: { ideal: "environment" }, frameRate: { ideal: 30 } };
        const stream = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          streamRef.current = stream;
          setCameraError(null);
          await videoRef.current.play().catch(console.warn);
        }
      } catch (err) {
        let message;
        switch (err.name) {
          case "NotAllowedError": message = "Akses kamera ditolak. Mohon izinkan di pengaturan browser."; break;
          case "NotFoundError": message = "Tidak ada kamera yang ditemukan di perangkat ini."; break;
          case "NotReadableError": message = "Kamera sedang digunakan oleh aplikasi lain."; break;
          case "OverconstrainedError": message = "Kamera tidak mendukung resolusi yang diminta."; break;
          default: message = `Error mengakses kamera: ${err.message}`;
        }
        setCameraError(message);
        setIsCameraOpen(false);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [isCameraOpen]);


  // --- BAGIAN YANG DIPERBAIKI ---
  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // 1. Gunakan canvas.toBlob() untuk mendapatkan data gambar asli
      canvas.toBlob((blob) => {
        if (blob) {
          // 2. Buat File dari Blob yang valid
          const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
          
          // 3. Kirim File yang valid ke callback
          if (onCapture) {
            onCapture(file);
          }
        }
      }, 'image/jpeg', 0.9); // Tentukan tipe dan kualitas gambar
      
      closeCamera(); // Tutup kamera setelah foto diambil
    }
  }, [onCapture, closeCamera]);
  // --- AKHIR BAGIAN YANG DIPERBAIKI ---


  return { videoRef, canvasRef, isCameraOpen, cameraError, openCamera, closeCamera, capturePhoto };
};