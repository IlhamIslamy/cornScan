import React from 'react';
import { Camera, X } from 'lucide-react';
import ErrorDisplay from './ErrorDisplay';
import LoadingSpinner from './LoadingSpinner';

const CameraTab = ({
  videoRef,
  isCameraOpen,
  cameraError,
  openCamera,
  closeCamera,
  capturePhoto,
  isPredicting,
  modelReady,
}) => {
  return (
    <div>
      <ErrorDisplay error={cameraError} />
      {!isCameraOpen ? (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Gunakan Kamera</h3>
          <p className="text-gray-600 mb-6">Ambil foto daun jagung langsung dengan kamera</p>
          <button
            onClick={openCamera}
            disabled={!modelReady}
            className="bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Camera className="w-5 h-5 inline mr-2" />
            Buka Kamera
          </button>
        </div>
      ) : (
        <div className="relative">
          <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
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
              disabled={isPredicting}
              className="bg-white hover:bg-gray-100 disabled:bg-gray-300 text-green-600 p-4 rounded-full transition-colors shadow-lg border-4 border-green-500"
              title="Ambil Foto"
            >
              <Camera className="w-8 h-8" />
            </button>
          </div>
          <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-3 py-2 rounded-lg text-sm">
            <p>📸 Arahkan kamera ke daun jagung</p>
            <p>💡 Pastikan pencahayaan cukup</p>
          </div>
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
    </div>
  );
};

export default CameraTab;