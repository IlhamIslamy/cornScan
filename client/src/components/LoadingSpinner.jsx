import React from 'react';

const LoadingSpinner = ({ message = "Memuat model, mohon tunggu..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
  );
};

export default LoadingSpinner;
