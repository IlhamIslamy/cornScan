import React from 'react';
const ErrorDisplay = ({ error }) => {
    if (!error) return null;

    return (
        <div className="mx-5 my-5 px-5 py-4 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-xl shadow-lg font-medium animate-slide-in-down">
            Error: {error}
        </div>
    );
};

export default ErrorDisplay;
