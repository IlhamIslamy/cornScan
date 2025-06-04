import React from 'react';
const ImagePreview = ({ preview }) => {
    if (!preview) return null;

    return (
        <div className="my-8 mx-5 text-center animate-fade-in-up">
            <h3 className="text-gray-800 font-semibold text-xl mb-5">Pratinjau Gambar:</h3>
            <img
                src={preview}
                alt="Preview"
                className="max-w-full max-h-[400px] mx-auto rounded-xl object-contain shadow-lg hover:scale-[1.02] transition-transform duration-300"
            />
        </div>
    );
};

export default ImagePreview;
