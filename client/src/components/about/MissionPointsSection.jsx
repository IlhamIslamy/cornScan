import React from 'react';

const MissionPointsSection = ({ missions }) => {
  return (
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
  );
};

export default MissionPointsSection;