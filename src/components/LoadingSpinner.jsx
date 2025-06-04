import React from 'react';
const LoadingSpinner = ({ message = "Memuat model, mohon tunggu..." }) => {
    return (
        <div className="flex flex-col items-center justify-center text-black text-lg font-medium">
            {message}
            <div className="w-10 h-10 border-4 border-gray-300 border-t-white rounded-full animate-spin mt-5"></div>
        </div>
    );
};

export default LoadingSpinner;
