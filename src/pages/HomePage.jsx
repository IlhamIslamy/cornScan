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
      <div className="absolute top-32 right-32 w-20 h-20 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full opacity-30 animate-pulse"></div>
      
    </div>

    <div className="relative min-h-screen z-10 container mx-auto px-4">
      <div className="lg:mt-4 grid lg:grid-cols-2 gap-48 mx-auto items-center py-24">
        {/* ---------------- Left Content ---------------- */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full">
              <Sparkles className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">AI Technology</span>
            </div>
          </div>
          
          <h1 className="text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Deteksi
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 lg:py-2">
              Penyakit Daun
            </span>
            <span className="block">Jagung</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Diagnosis cepat dan akurat menggunakan teknologi AI untuk 
            menjaga kesehatan tanaman jagung Anda
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              to="/cornLeafScanner" 
              className="group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Scan className="w-5 h-5" />
              Mulai Scanner
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <Link 
              to="/about" 
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 text-center"
            >
              Pelajari Lebih Lanjut
            </Link>
          </div>
        </div>

        {/* ---------------- Right Visual ---------------- */}
        <div className="relative">
          {/* Main Illustration Container */}
          <div className="relative w-full h-80 mb-48 lg:mb-0 lg:h-[500px]">
            {/* Phone Mockup */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-64 h-[500px] bg-gradient-to-br from-gray-900 to-gray-700 rounded-[3rem] p-2 shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500">
                  <div className="w-full h-full bg-gradient-to-br from-green-400 to-emerald-500 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden">
                    {/* Screen Content */}
                    <div className="text-center text-white p-6">
                      <Leaf className="w-16 h-16 mx-auto mb-4 animate-pulse" />
                      <div className="text-lg font-semibold mb-2">CornLeaf AI</div>
                      <div className="text-sm opacity-90 mb-6">Scanning...</div>
                      <div className="w-32 h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Floating Elements around Phone */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-100"></div>
                    <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-blue-400 rounded-full animate-bounce delay-300"></div>
                  </div>
                </div>
                
                {/* Corn Leaf Illustrations */}
                <div className="absolute -top-8 -left-8 transform -rotate-12">
                  <div className="w-24 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full opacity-80 blur-sm"></div>
                </div>
                <div className="absolute -bottom-8 -right-8 transform rotate-12">
                  <div className="w-20 h-28 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full opacity-70 blur-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <AboutSection />
  </div>
);

export default HomePage;
