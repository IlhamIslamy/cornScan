import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Globe } from 'lucide-react';

// 1. Impor semua data terpusat
import { stats, missions, techFeatures, benefits, diseases, faqs } from '../data/aboutPageData.jsx';
// 2. Impor semua komponen bagian
import StatisticsSection from '../components/about/StatisticsSection';
import TechnologySection from '../components/about/TechnologySection';
import BenefitsSection from '../components/about/BenefitsSection';
import DiseaseSection from '../components/about/DiseaseSection';
import MissionPointsSection from '../components/about/MissionPointsSection';
import FaqSection from '../components/about/FaqSection';

const AboutPage = () => {
  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-4">🌽</div>
          <h1 className="text-5xl py-2 font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Tentang CornScan
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solusi cerdas berbasis AI untuk deteksi dini penyakit tanaman jagung
          </p>
        </div>

        {/* 3. Render komponen bagian dengan data yang sesuai */}
        <StatisticsSection stats={stats} />

        {/* Background Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="text-2xl mr-3">📌</div>
              <h2 className="text-3xl font-bold text-gray-800">
                Latar Belakang
              </h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Indonesia adalah negara agraris yang sangat bergantung pada hasil
              pertanian seperti jagung. Namun, banyak petani mengalami
              kesulitan dalam mendeteksi penyakit tanaman jagung secara dini
              karena keterbatasan pengetahuan dan alat. Hal ini menyebabkan
              penanganan sering terlambat, biaya meningkat, dan hasil panen
              menurun.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Tujuan Kami</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              CornScan hadir untuk membantu petani dalam{' '}
              <strong>mendeteksi dini penyakit pada daun jagung</strong>{' '}
              menggunakan teknologi kecerdasan buatan (AI), sehingga mereka bisa
              mengambil tindakan cepat dan tepat.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Visi Kami</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Mewujudkan sistem pertanian yang cerdas, inklusif, dan
              berkelanjutan dengan teknologi AI untuk mendukung kesejahteraan
              petani Indonesia.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <TechnologySection techFeatures={techFeatures} />
        </div>

        <div className="mb-16">
          <BenefitsSection benefits={benefits} />
        </div>

        <div className="mb-16">
          <DiseaseSection diseases={diseases} />
        </div>

        {/* Accuracy Section */}
        <div className="mb-16">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="text-2xl mb-4">📊</div>
            <h2 className="text-3xl font-bold mb-6">Tingkat Akurasi Sistem</h2>
            <p className="text-xl mb-4">
              Model AI kami telah melalui berbagai tahap validasi dan pelatihan.
            </p>
            <div className="text-4xl font-bold mb-2">🎯 90%+</div>
            <p className="text-lg">
              Akurasi deteksi lebih dari 90% untuk dataset uji, dengan
              pengujian real-time berbasis browser.
            </p>
          </div>
        </div>

        <div className="mb-16">
          <MissionPointsSection missions={missions} />
        </div>

        <div className="mb-16">
          <FaqSection faqs={faqs} />
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Siap Memulai?</h2>
            <p className="text-xl mb-6">
              Gunakan CornScan sekarang dan rasakan kemudahan deteksi penyakit
              jagung dengan AI
            </p>
            <Link
              to="/cornLeafScanner"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Mulai Deteksi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;