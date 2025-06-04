import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Leaf } from 'lucide-react';

const PredictionResult = ({ result, error }) => {
    if (!result || error) return null;

    const confidencePercentage = (result.probability * 100).toFixed(2);
    
    // Determine status and colors based on confidence
    let barColor = 'bg-gradient-to-r from-green-400 to-green-600';
    let bgColor = 'from-green-50 to-emerald-50';
    let iconColor = 'text-green-600';
    let statusText = 'Sangat Baik';
    let StatusIcon = CheckCircle;

    if (result.probability < 0.7 && result.probability >= 0.4) {
        barColor = 'bg-gradient-to-r from-yellow-400 to-orange-500';
        bgColor = 'from-yellow-50 to-orange-50';
        iconColor = 'text-yellow-600';
        statusText = 'Cukup Yakin';
        StatusIcon = AlertTriangle;
    } else if (result.probability < 0.4) {
        barColor = 'bg-gradient-to-r from-red-400 to-red-600';
        bgColor = 'from-red-50 to-pink-50';
        iconColor = 'text-red-600';
        statusText = 'Kurang Yakin';
        StatusIcon = XCircle;
    }

    return (
        <div className="my-8 p-8 bg-white rounded-3xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center space-x-3">
                    <Leaf className="w-8 h-8 text-[#039b62]" />
                    <h3 className="text-2xl font-bold text-[#039b62] bg-clip-text text-transparent">
                        Hasil Analisis Daun
                    </h3>
                </div>
            </div>

            <div className="space-y-6">
                {/* Class Detection Card */}
                <div className={`p-6 bg-gradient-to-br ${bgColor} rounded-2xl border border-gray-200 shadow-sm`}>
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                            Kondisi Terdeteksi
                        </span>
                        <StatusIcon className={`w-6 h-6 ${iconColor}`} />
                    </div>
                    <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-gray-800">
                            {result.className}
                        </span>
                    </div>
                </div>

                {/* Confidence Level Card */}
                <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-600">
                            Tingkat Kepercayaan
                        </span>
                        <span className={`text-sm font-bold px-3 py-1 rounded-full ${
                            result.probability >= 0.7 ? 'bg-green-100 text-green-700' :
                            result.probability >= 0.4 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {statusText}
                        </span>
                    </div>
                    
                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-3xl font-bold text-gray-800">
                                {confidencePercentage}%
                            </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative bg-gray-200 rounded-full h-4 shadow-inner overflow-hidden">
                            <div
                                className={`h-full ${barColor} transition-all duration-1000 ease-out shadow-lg`}
                                style={{ width: `${confidencePercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                        
                        {/* Scale indicators */}
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>

                {/* Recommendation Card */}
                <div className="p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 shadow-sm">
                    <span className="text-sm font-semibold uppercase tracking-wider text-gray-600 block mb-3">
                        Rekomendasi
                    </span>
                    <p className="text-gray-700 leading-relaxed">
                        {result.probability >= 0.7 
                            ? "Hasil deteksi sangat akurat. Kondisi daun telah teridentifikasi dengan baik."
                            : result.probability >= 0.4
                                ? "Hasil deteksi cukup baik. Disarankan untuk mengambil foto dengan pencahayaan lebih baik."
                                : "Hasil deteksi kurang akurat. Silakan ambil foto ulang dengan kualitas yang lebih baik."
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PredictionResult;