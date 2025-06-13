import React from "react";
import { AlertTriangle, Users, Zap, Shield, Camera, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';


const AboutSection = () => {
    return (
        <div className="w-full">
            {/* Features Section */}
            <div className="pb-16 bg-white">
                <div className="mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Mengapa Memilih CornLeaf AI?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 bg-gray-50 hover:bg-white">
                            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <Zap className="w-8 h-8 text-[#039b62]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Deteksi Cepat</h3>
                            <p className="text-gray-600">Hasil diagnosis dalam hitungan detik menggunakan teknologi AI terdepan</p>
                        </div>
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 bg-gray-50 hover:bg-white">
                            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <Shield className="w-8 h-8 text-[#039b62]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Akurasi Tinggi</h3>
                            <p className="text-gray-600">Tingkat akurasi tinggi berdasarkan ribuan data training penyakit jagung</p>
                        </div>
                        <div className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300 bg-gray-50 hover:bg-white">
                            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                                <Users className="w-8 h-8 text-[#039b62]" />
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Mudah Digunakan</h3>
                            <p className="text-gray-600">Interface yang user-friendly, cocok untuk petani dan praktisi pertanian</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Solution Preview */}
            <div className="py-16 bg-gray-50">
                <div className="mx-auto px-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-xl">
                        <div className="max-w-3xl mx-auto">
                            <div className="w-16 h-16 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                <AlertTriangle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Solusi Inovasi dengan Teknologi AI</h3>
                            <p className="text-lg text-green-100 mb-8 leading-relaxed">
                                Sistem deteksi otomatis menggunakan kecerdasan buatan untuk diagnosis cepat, akurat, dan mudah diakses oleh semua petani
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="text-3xl mb-3">⚡</div>
                                    <div className="font-semibold text-lg mb-1">Deteksi Instan</div>
                                    <div className="text-sm text-green-200">Hasil dalam hitungan detik</div>
                                </div>
                                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="text-3xl mb-3">🎯</div>
                                    <div className="font-semibold text-lg mb-1">Akurasi Tinggi</div>
                                    <div className="text-sm text-green-200">Berbasis data ribuan sampel</div>
                                </div>
                                <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                                    <div className="text-3xl mb-3">📱</div>
                                    <div className="font-semibold text-lg mb-1">Mudah Digunakan</div>
                                    <div className="text-sm text-green-200">Cukup foto dengan smartphone</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-16 bg-white">
                <div className="mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
                        Cara Kerja Scanner
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="flex flex-col items-center text-center group">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                    <Camera className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-green-600">1</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Ambil Foto</h3>
                            <p className="text-gray-600 leading-relaxed">Upload foto daun jagung yang ingin diperiksa kesehatannya</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                    <Zap className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-green-600">2</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Analisis AI</h3>
                            <p className="text-gray-600 leading-relaxed">AI akan menganalisis foto dan mendeteksi penyakit pada daun</p>
                        </div>
                        <div className="flex flex-col items-center text-center group">
                            <div className="relative mb-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                                    <CheckCircle className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                    <span className="text-sm font-bold text-green-600">3</span>
                                </div>
                            </div>
                            <h3 className="text-xl font-semibold mb-3">Hasil & Saran</h3>
                            <p className="text-gray-600 leading-relaxed">Dapatkan hasil diagnosis dan rekomendasi penanganan</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-16 bg-gradient-to-r from-green-500 to-emerald-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold mb-4 text-white">Siap Memulai Deteksi?</h2>
                    <p className="text-xl mb-8 text-green-100 leading-relaxed">
                        Lindungi tanaman jagung Anda dengan teknologi AI terdepan
                    </p>
                    <Link
                        to="/cornLeafScanner"
                        className="inline-flex items-center gap-2 bg-white text-green-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                    >
                        <Camera className="w-5 h-5" />
                        Mulai Scanner Sekarang
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;