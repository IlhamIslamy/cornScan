import React, { useRef } from 'react';
import FileInput from "./FileInput";
import ImagePreview from "./ImagePreview";
import PredictionResult from "./PredictionResult";
import ErrorDisplay from "./ErrorDisplay";
import LoadingSpinner from './LoadingSpinner';

const UploadTab = ({ model, isPredicting, error, result, preview, onImageUpload, onReset }) => {
  const fileInputRef = useRef(null);

  const handleReset = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onReset();
  };

  return (
    <div>
      <ErrorDisplay error={error} />
      <FileInput
        onFileChange={onImageUpload}
        disabled={!model || isPredicting}
        ref={fileInputRef}
      />
      {isPredicting && <LoadingSpinner />}
      <ImagePreview preview={preview} onReset={handleReset} />
      <PredictionResult result={result} error={error} />
    </div>
  );
};

export default UploadTab;