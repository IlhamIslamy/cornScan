import React from 'react';

const BenefitsSection = ({ benefits }) => {
  return (
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
  );
};

export default BenefitsSection;