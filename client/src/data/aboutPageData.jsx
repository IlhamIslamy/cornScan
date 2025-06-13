import React from 'react';
import { Camera, Target, Brain, Leaf, CheckCircle, Users, Globe, HelpCircle, Shield, Clock, TrendingUp, Award, Zap, Database, Sprout, Droplet, CircleDot, ZapOff } from "lucide-react";

// Data untuk statistik
export const stats = [
  { label: "Tingkat Akurasi", value: "85%+", icon: Target },
  { label: "Waktu Deteksi", value: "< 3 Detik", icon: Clock },
  { label: "Jenis Penyakit", value: "4 Kategori", icon: Leaf },
  { label: "User Experience", value: "Gratis", icon: CheckCircle }
];

// Data untuk misi
export const missions = [
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

// Data untuk teknologi features
export const techFeatures = [
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

// Data untuk benefits/manfaat
export const benefits = [
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
export const diseases = [
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
    description: "Penyakit yang menyebabkan daun layu dan menguning"
  }
];

// Data untuk FAQ
export const faqs = [
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