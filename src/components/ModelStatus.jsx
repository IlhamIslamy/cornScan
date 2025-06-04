import React from 'react';
const ModelStatus = ({ model, isLoadingModel, error }) => {
    if (model || isLoadingModel || error) return null;

    return (
        <div className="text-amber-500 text-center my-5 px-4 py-3 bg-amber-100/40 rounded-md italic border-l-4 border-amber-500">
            Model belum siap atau gagal dimuat tanpa error eksplisit. Periksa konsol untuk detail.
        </div>
    );
};

export default ModelStatus;
