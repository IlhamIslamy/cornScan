import React from 'react';
import { Camera, Brain } from "lucide-react";

const TechnologySection = ({ techFeatures }) => {
  return (
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
  );
};

export default TechnologySection;