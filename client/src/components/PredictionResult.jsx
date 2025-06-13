import React from 'react';
import { CheckCircle, AlertTriangle, XCircle, Leaf, Shield, AlertCircle } from 'lucide-react';
import { getRecommendation } from '../utils/recommendations';

const PredictionResult = ({ result, error }) => {
    if (!result || error) return null;

    const confidencePercentage = (result.probability * 100).toFixed(2);
    const recommendation = getRecommendation(result.className);
    
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

    // Get colors for recommendation based on severity
    const getRecommendationColors = (severity) => {
        switch (severity) {
            case 'low':
                return {
                    bgGradient: 'from-green-50 to-emerald-50',
                    borderColor: 'border-green-200',
                    iconColor: 'text-green-600',
                    titleColor: 'text-green-800',
                    RecommendationIcon: Shield
                };
            case 'medium':
                return {
                    bgGradient: 'from-orange-50 to-yellow-50',
                    borderColor: 'border-orange-200',
                    iconColor: 'text-orange-600',
                    titleColor: 'text-orange-800',
                    RecommendationIcon: AlertTriangle
                };
            case 'high':
                return {
                    bgGradient: 'from-red-50 to-pink-50',
                    borderColor: 'border-red-200',
                    iconColor: 'text-red-600',
                    titleColor: 'text-red-800',
                    RecommendationIcon: AlertCircle
                };
            default:
                return {
                    bgGradient: 'from-gray-50 to-slate-50',
                    borderColor: 'border-gray-200',
                    iconColor: 'text-gray-600',
                    titleColor: 'text-gray-800',
                    RecommendationIcon: AlertTriangle
                };
        }
    };

    const recColors = getRecommendationColors(recommendation.severity);

    return (
        <div className="my-6 p-4 sm:my-8 sm:p-8 bg-white rounded-3xl shadow-xl border border-gray-100 transform transition-all duration-500 hover:shadow-2xl"> {/* Kurangi margin-y dan padding di HP */}
            {/* Header */}
            <div className="flex items-center justify-center mb-4 sm:mb-8"> {/* Kurangi margin-bottom di HP */}
                <div className="flex items-center space-x-2 sm:space-x-3">
                    <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-[#039b62]" /> {/* Kurangi ukuran icon di HP */}
                    <h3 className="text-lg sm:text-2xl font-bold text-[#039b62]"> {/* Kurangi ukuran font di HP */}
                        Hasil Analisis Daun
                    </h3>
                </div>
            </div>

            <div className="space-y-4 sm:space-y-6"> {/* Kurangi space-y di HP */}
                {/* Class Detection Card */}
                <div className={`p-4 sm:p-6 bg-gradient-to-br ${bgColor} rounded-2xl border border-gray-200 shadow-sm`}> {/* Kurangi padding di HP */}
                    <div className="flex items-center justify-between mb-2 sm:mb-4"> {/* Kurangi margin-bottom di HP */}
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600">
                            Kondisi Terdeteksi
                        </span>
                        <StatusIcon className={`w-4 h-4 sm:w-6 sm:h-6 ${iconColor}`} /> {/* Kurangi ukuran icon di HP */}
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                        <span className="text-xl sm:text-3xl mr-1 sm:mr-2">{recommendation.icon}</span> {/* Kurangi ukuran icon di HP */}
                        <span className="text-xl sm:text-2xl font-bold text-gray-800">
                            {result.className}
                        </span>
                    </div>
                </div>

                {/* Confidence Level Card */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-gray-200 shadow-sm"> {/* Kurangi padding di HP */}
                    <div className="flex items-center justify-between mb-2 sm:mb-4"> {/* Kurangi margin-bottom di HP */}
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600">
                            Akurasi Deteksi
                        </span>
                        <span className={`text-xs sm:text-sm font-bold px-2 sm:px-3 py-1 rounded-full ${
                            result.probability >= 0.7 ? 'bg-green-100 text-green-700' :
                            result.probability >= 0.4 ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                        }`}>
                            {statusText}
                        </span>
                    </div>
                    
                    <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-xl sm:text-3xl font-bold text-gray-800"> {/* Kurangi ukuran font di HP */}
                                {confidencePercentage}%
                            </span>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="relative bg-gray-200 rounded-full h-2 sm:h-4 shadow-inner overflow-hidden"> {/* Kurangi tinggi di HP */}
                            <div
                                className={`h-full ${barColor} transition-all duration-1000 ease-out shadow-lg`}
                                style={{ width: `${confidencePercentage}%` }}
                            >
                                <div className="absolute inset-0 bg-white bg-opacity-20 animate-pulse"></div>
                            </div>
                        </div>
                        
                        {/* Scale indicators */}
                        <div className="flex justify-between text-xs text-gray-500 mt-1 sm:mt-2">
                            <span>0%</span>
                            <span>25%</span>
                            <span>50%</span>
                            <span>75%</span>
                            <span>100%</span>
                        </div>
                    </div>
                </div>

                {/* Disease Information Card */}
                <div className={`p-4 sm:p-6 bg-gradient-to-br ${recColors.bgGradient} rounded-2xl border ${recColors.borderColor} shadow-sm`}> {/* Kurangi padding di HP */}
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4"> {/* Kurangi margin-bottom di HP */}
                        <recColors.RecommendationIcon className={`w-5 h-5 sm:w-6 sm:h-6 ${recColors.iconColor}`} /> {/* Kurangi ukuran icon di HP */}
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600">
                            Informasi Kondisi
                        </span>
                    </div>
                    <h4 className={`text-base sm:text-xl font-bold ${recColors.titleColor} mb-2`}> {/* Kurangi ukuran font di HP */}
                        {recommendation.title}
                    </h4>
                    <p className="text-sm text-gray-700 leading-normal sm:leading-relaxed"> {/* KUNCI PERBAIKAN: text-sm, leading-normal di HP, leading-relaxed di SM+ */}
                        {recommendation.description}
                    </p>
                </div>

                {/* Treatment Recommendations Card */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 shadow-sm"> {/* Kurangi padding di HP */}
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-4"> {/* Kurangi margin-bottom di HP */}
                        <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" /> {/* Kurangi ukuran icon di HP */}
                        <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600">
                            Rekomendasi Tindakan
                        </span>
                    </div>
                    <div className="space-y-3"> {/* Jarak antar item rekomendasi */}
                        {recommendation.actions.map((action, index) => (
                            <div key={index} className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center mt-0.5 sm:w-6 sm:h-6"> {/* KUNCI PERBAIKAN: Kurangi ukuran lingkaran nomor di HP */}
                                    <span className="text-blue-600 text-xs font-bold sm:text-sm">{index + 1}</span> {/* Kurangi ukuran font nomor di HP */}
                                </div>
                                <p className="text-gray-700 text-sm leading-normal sm:leading-relaxed text-left flex-1 break-words"> {/* KUNCI PERBAIKAN: text-sm, leading-normal di HP, leading-relaxed di SM+, break-words */}
                                    {action.split('**').map((part, i) => 
                                        i % 2 === 1 ? <strong key={i} className="font-semibold text-gray-800">{part}</strong> : part
                                    )}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* General Recommendation Card */}
                <div className="p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 shadow-sm"> {/* Kurangi padding di HP */}
                    <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-600 block mb-2 sm:mb-3"> {/* Kurangi margin-bottom di HP */}
                        Catatan Akurasi
                    </span>
                    <p className="text-sm text-gray-700 leading-normal sm:leading-relaxed"> {/* KUNCI PERBAIKAN: leading-normal di HP, leading-relaxed di SM+ */}
                        {result.probability >= 0.7 
                            ? "Hasil deteksi sangat akurat. Kondisi daun telah teridentifikasi dengan baik. Lakukan tindakan sesuai rekomendasi di atas."
                            : result.probability >= 0.4
                                ? "Hasil deteksi cukup baik. Disarankan untuk mengambil foto dengan pencahayaan lebih baik untuk konfirmasi yang lebih akurat."
                                : "Hasil deteksi kurang akurat. Silakan ambil foto ulang dengan kualitas yang lebih baik. Jika masalah berlanjut, konsultasikan dengan ahli pertanian."
                        }
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PredictionResult;