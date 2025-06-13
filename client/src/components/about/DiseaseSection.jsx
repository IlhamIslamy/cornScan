import React from 'react';

const DiseaseSection = ({ diseases }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
      <div className="flex items-center mb-8">
        <div className="text-2xl mr-3">🦠</div>
        <h2 className="text-3xl font-bold text-gray-800">Jenis Penyakit yang Dapat Dideteksi</h2>
      </div>
      <p className="text-gray-600 text-lg mb-8">
        CornScan mampu mendeteksi dan membedakan beberapa kategori kondisi daun jagung:
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
  );
};

export default DiseaseSection;