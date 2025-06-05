import React from 'react';
import { Camera, Target, Brain, Leaf, CheckCircle, Users, Globe, HelpCircle, ChevronDown, ChevronUp, Shield, Clock, TrendingUp, Award, Zap, Database, Sprout,Droplet,CircleDot, ZapOff } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Data untuk FAQ
  const faqs = [
    {
      question: "Apakah saya perlu instal aplikasi?",
      answer: "Tidak. Cukup buka website CornScan dan upload foto daun jagung."
    },
    {
      question: "Apakah harus ada koneksi internet?",
      answer: "Ya, karena sistem berbasis web dan menggunakan model AI di sisi browser."
    },
    {
      question: "Seberapa akurat hasil deteksi?",
      answer: "Sistem kami mencapai akurasi lebih dari 90% pada data uji, dan terus dikembangkan."
    },
    {
      question: "Apakah sistem ini gratis?",
      answer: "Ya, platform ini dapat digunakan secara gratis oleh petani dan masyarakat umum."
    },
    {
      question: "Bagaimana jika gambar tidak jelas?",
      answer: "Pastikan gambar diambil dalam kondisi terang dan fokus agar hasil lebih akurat."
    }
  ];

  // Data untuk benefits/manfaat
  const benefits = [
    {
      icon: Zap,
      title: "Deteksi Otomatis & Cepat",
      description: "Deteksi penyakit secara otomatis dan cepat dalam hitungan detik",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      icon: Shield,
      title: "Akurasi Tinggi",
      description: "Mengurangi risiko kesalahan diagnosis manual dengan AI",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Clock,
      title: "Hemat Waktu & Biaya",
      description: "Menghemat waktu dan biaya perawatan dengan deteksi dini",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: TrendingUp,
      title: "Produktivitas Meningkat",
      description: "Meningkatkan produktivitas dan hasil panen yang optimal",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: Globe,
      title: "Ketahanan Pangan",
      description: "Mendukung upaya ketahanan pangan nasional Indonesia",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    },
    {
      icon: Award,
      title: "Mudah Digunakan",
      description: "Interface yang user-friendly tanpa perlu training khusus",
      color: "text-red-600",
      bgColor: "bg-red-50"
    }
  ];

  // Data untuk jenis penyakit
  const diseases = [
    { 
      name: "Sehat", 
      color: "text-green-600", 
      bgColor: "bg-green-100", 
      borderColor: "border-green-300",
      icon: <Sprout className="text-green-600 w-8 h-8 mx-auto" />,
      description: "Daun jagung dalam kondisi sehat dan normal"
    },
    { 
      name: "Hawar Daun", 
      color: "text-orange-600", 
      bgColor: "bg-orange-100",
      icon: <Droplet className="text-orange-600 w-8 h-8 mx-auto" />, 
      borderColor: "border-orange-300",
      description: "Penyakit yang menyebabkan bercak coklat pada daun"
    },
    { 
      name: "Karat Daun", 
      color: "text-red-600", 
      bgColor: "bg-red-100",
      icon: <CircleDot className="text-red-600 w-8 h-8 mx-auto" />, 
      borderColor: "border-red-300",
      description: "Penyakit jamur yang menimbulkan bintik karat"
    },
    { 
      name: "Layu Daun", 
      color: "text-amber-600", 
      bgColor: "bg-amber-100",
      icon: <ZapOff className="text-amber-600 w-8 h-8 mx-auto" />, 
      borderColor: "border-amber-300",
      description: "Penyakit jamur yang menimbulkan bintik karat"
    }
  ];

  // Data untuk teknologi features
  const techFeatures = [
    {
      icon: Brain,
      title: "Machine Learning",
      description: "Menggunakan algoritma CNN untuk analisis gambar",
      stat: "Deep Learning"
    },
    {
      icon: Database,
      title: "Dataset Kaggle",
      description: "Dilatih dengan ribuan gambar daun jagung",
      stat: "10K+ Images"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Pemrosesan gambar secara real-time di browser",
      stat: "< 3 Seconds"
    }
  ];

  // Data untuk misi
  const missions = [
    {
      icon: Users,
      title: "Mempermudah Petani",
      description: "Dalam mendeteksi penyakit tanaman dengan teknologi yang mudah diakses",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: Globe,
      title: "Platform Inklusif",
      description: "Menyediakan platform yang mudah diakses dan digunakan oleh semua kalangan",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Leaf,
      title: "Edukasi Berkelanjutan",
      description: "Mengedukasi petani tentang gejala penyakit tanaman dan cara penanganannya",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    }
  ];

  // Data untuk statistik
  const stats = [
    { label: "Tingkat Akurasi", value: "85%+", icon: Target },
    { label: "Waktu Deteksi", value: "< 3 Detik", icon: Clock },
    { label: "Jenis Penyakit", value: "4 Kategori", icon: Leaf },
    { label: "User Experience", value: "Gratis", icon: CheckCircle }
  ];

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

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <IconComponent className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Background Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-6">
              <div className="text-2xl mr-3">📌</div>
              <h2 className="text-3xl font-bold text-gray-800">Latar Belakang</h2>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              Indonesia adalah negara agraris yang sangat bergantung pada hasil pertanian seperti jagung. 
              Namun, banyak petani mengalami kesulitan dalam mendeteksi penyakit tanaman jagung secara dini 
              karena keterbatasan pengetahuan dan alat. Hal ini menyebabkan penanganan sering terlambat, 
              biaya meningkat, dan hasil panen menurun.
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
              CornScan hadir untuk membantu petani dalam <strong>mendeteksi dini penyakit pada daun jagung</strong> 
              menggunakan teknologi kecerdasan buatan (AI), sehingga mereka bisa mengambil tindakan cepat dan tepat.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-2xl font-bold text-gray-800">Visi Kami</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Mewujudkan sistem pertanian yang cerdas, inklusif, dan berkelanjutan dengan teknologi AI 
              untuk mendukung kesejahteraan petani Indonesia.
            </p>
          </div>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <Brain className="w-8 h-8 text-purple-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">Teknologi di Balik CornScan</h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {techFeatures.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <div key={index} className="bg-gradient-to-br from-purple-50 to-blue-50 p-6 rounded-xl text-center">
                    <IconComponent className="w-12 h-12 text-purple-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                    <div className="text-purple-600 font-bold">{feature.stat}</div>
                  </div>
                );
              })}
            </div>

            <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-8 rounded-2xl">
              <Camera className="w-16 h-16 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Cara Kerja</h3>
              <p className="text-gray-600">
                Cukup upload foto daun jagung, AI kami akan menganalisis dan memberikan 
                diagnosis serta rekomendasi perawatan dalam hitungan detik.
              </p>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <div className="text-2xl mr-3">🌱</div>
              <h2 className="text-3xl font-bold text-gray-800">Manfaat yang Dirasakan Petani</h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div key={index} className={`${benefit.bgColor} p-6 rounded-xl hover:shadow-lg transition-shadow`}>
                    <IconComponent className={`w-8 h-8 ${benefit.color} mb-4`} />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Disease Detection Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <div className="text-2xl mr-3">🦠</div>
              <h2 className="text-3xl font-bold text-gray-800">Jenis Penyakit yang Dapat Dideteksi</h2>
            </div>
            <p className="text-gray-600 text-lg mb-8">
              CornScan mampu mendeteksi dan membedakan tiga kategori kondisi daun jagung:
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {diseases.map((disease, index) => (
                <div key={index} className={`${disease.bgColor} border-2 ${disease.borderColor} p-6 rounded-xl text-center hover:scale-105 transition-transform`}>
                  <div className="text-4xl mb-3">{disease.icon}</div>
                  <h3 className={`text-xl font-semibold ${disease.color} mb-2`}>{disease.name}</h3>
                  <p className="text-gray-600 text-sm">{disease.description}</p>
                </div>
              ))}
            </div>
          </div>
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
              Akurasi deteksi lebih dari 90% untuk dataset uji, dengan pengujian real-time berbasis browser.
            </p>
          </div>
        </div>

        {/* Mission Points */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Misi Kami</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {missions.map((mission, index) => {
                const IconComponent = mission.icon;
                return (
                  <div key={index} className={`${mission.bgColor} p-6 rounded-xl text-center hover:shadow-lg transition-shadow`}>
                    <IconComponent className={`w-12 h-12 ${mission.color} mx-auto mb-4`} />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{mission.title}</h3>
                    <p className="text-gray-600">{mission.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <HelpCircle className="w-8 h-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-800">FAQ (Pertanyaan Umum)</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <span className="font-semibold text-gray-800">{faq.question}</span>
                    {expandedFaq === index ? 
                      <ChevronUp className="w-5 h-5 text-gray-500" /> : 
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    }
                  </button>
                  {expandedFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-4">Siap Memulai?</h2>
            <p className="text-xl mb-6">
              Gunakan CornScan sekarang dan rasakan kemudahan deteksi penyakit jagung dengan AI
            </p>
            <Link to="/cornLeafScanner" className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Mulai Deteksi Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;