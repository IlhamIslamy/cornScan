import React from "react";
import { Leaf, Sparkles, Scan, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import AboutSection from "../components/AboutSection";

const HomePage = () => (
  <div className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">
    <div className="absolute inset-0">
      {/* Floating Leaves */}
      <div className="absolute top-20 left-10 animate-bounce delay-100">
        <Leaf className="w-8 h-8 text-green-300 opacity-60" />
      </div>
      <div className="absolute top-40 right-20 animate-bounce delay-300">
        <Leaf className="w-6 h-6 text-emerald-300 opacity-40" />
      </div>

      {/* Geometric Shapes */}
      <div className="absolute top-32 right-32 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-30 animate-pulse" />
    </div>

    <div className="relative z-10 w-full container mx-auto px-4">
      <div className="py-16 md:py-24 flex flex-col lg:grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="flex justify-center lg:justify-start mb-6">
            <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">AI Technology</span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Deteksi
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 py-2">
              Penyakit Daun
            </span>
            <span className="block">Jagung</span>
          </h1>

          <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-lg mx-auto lg:mx-0">
            Diagnosis cepat dan akurat menggunakan teknologi AI untuk 
            menjaga kesehatan tanaman jagung Anda
          </p>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
            <Link 
              to="/cornLeafScanner" 
              className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Scan className="w-5 h-5" />
              Mulai Scanner
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link 
              to="/about" 
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold transition-all duration-300 text-center"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        {/* Right Visual */}
        <div className="relative w-full h-[400px] sm:h-[500px] flex justify-center">
          <div className="relative w-64 h-full">
            <div className="w-full h-full bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] p-2 shadow-2xl transform rotate-6 hover:rotate-3 transition-transform duration-500">
              <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden">
                {/* Screen Content */}
                <div className="text-center text-white p-4">
                  <Leaf className="w-14 h-14 mx-auto mb-4 animate-pulse" />
                  <div className="text-lg font-semibold mb-2">CornLeaf AI</div>
                  <div className="text-sm opacity-90 mb-6">Scanning...</div>
                  <div className="w-28 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                    <div className="w-3/4 h-full bg-white rounded-full animate-pulse"></div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full animate-bounce delay-100" />
                <div className="absolute -bottom-6 -left-6 w-5 h-5 bg-blue-400 rounded-full animate-bounce delay-300" />
              </div>
            </div>

            {/* Corn Leaf Backgrounds */}
            <div className="absolute -top-8 -left-8 transform -rotate-12">
              <div className="w-20 h-28 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-70 blur-sm" />
            </div>
            <div className="absolute -bottom-8 -right-8 transform rotate-12">
              <div className="w-16 h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-60 blur-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <AboutSection />
  </div>
);

export default HomePage;
