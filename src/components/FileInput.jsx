import React from 'react';
import { useRef, useState } from 'react';
import { Upload,  } from 'lucide-react';

const FileInput = ({ onFileChange, disabled }) => {
    const fileInputRef = useRef(null);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleClick = () => {
        if (!disabled) {
            fileInputRef.current.click();
        }
    };

    const handleChange = (event) => {
        onFileChange(event);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        if (!disabled) {
            setIsDragOver(true);
        }
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        
        if (!disabled && e.dataTransfer.files.length > 0) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('image/')) {
                // Create a synthetic event to match the onChange format
                const syntheticEvent = {
                    target: {
                        files: [file]
                    }
                };
                onFileChange(syntheticEvent);
            }
        }
    };

    return (
        <div
            className={`border-2 border-dashed border-gray-300 rounded-2xl p-8 transition-all duration-200 cursor-pointer min-h-[200px] flex items-center justify-center ${
                disabled 
                    ? 'opacity-50 cursor-not-allowed pointer-events-none' 
                    : isDragOver 
                        ? 'border-green-500 bg-green-50' 
                        : 'hover:border-green-400 hover:bg-green-50'
            }`}
            onClick={handleClick}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <div className="text-center">
                <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 mb-2">Drag & drop foto daun jagung di sini</p>
                <p className="text-sm text-gray-400 mb-4">atau</p>
                <button 
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                    type="button"
                >
                    Pilih File
                </button>
                <div className="mt-4 text-xs text-gray-500">
                    Format: JPG, PNG (max 5MB)
                </div>
            </div>
            
            <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                ref={fileInputRef}
                className="hidden"
                disabled={disabled}
            />
        </div>
    );
};

export default FileInput;