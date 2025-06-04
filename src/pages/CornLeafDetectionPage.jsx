import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { labels } from "../utils/labels";
import ErrorDisplay from "../components/ErrorDisplay";
import FileInput from "../components/FileInput";
import ImagePreview from "../components/ImagePreview";
import PredictionResult from "../components/PredictionResult";
import LoadingSpinner from "../components/LoadingSpinner";
import ModelStatus from "../components/ModelStatus";
import {
  loadModel,
  preprocessImage,
  makePrediction,
  findBestPrediction
} from "../services/predictionService";
import { Leaf } from "lucide-react";
const CornLeafDetection = () => {
  const [result, setResult] = useState(null);
  const [preview, setPreview] = useState(null);
  const [model, setModel] = useState(null);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [error, setError] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);


  const CLASS_NAMES = labels;

  useEffect(() => {
    const initializeModel = async () => {
      setIsLoadingModel(true);
      setError(null);

      const { model: loadedModel, error: loadError } = await loadModel();

      if (loadedModel) {
        setModel(loadedModel);
      } else {
        setError(loadError);
      }

      setIsLoadingModel(false);
    };

    initializeModel();
  }, []);

  const processImageFile = (file, callback) => {
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      setPreview(reader.result);

      img.onload = () => callback(img);
      img.onerror = () => setError("Gagal memuat pratinjau gambar.");
    };

    reader.onerror = () => setError("Gagal membaca file gambar.");
    reader.readAsDataURL(file);
  };

  const performPrediction = async (img) => {
    try {
      setIsPredicting(true); // Mulai prediksi
      const tensor = preprocessImage(img);
      const data = await makePrediction(model, tensor);
      const predictionResult = findBestPrediction(data, CLASS_NAMES);

      setResult(predictionResult);
      tf.dispose(tensor);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPredicting(false); 
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      setPreview(null);
      setResult(null);
      setError(null);
      return;
    }

    if (!model) {
      setError("Model belum siap. Mohon tunggu atau periksa error pemuatan model.");
      return;
    }

    setPreview(null);
    setResult(null);
    setError(null);

    processImageFile(file, performPrediction);
  };


  if (isLoadingModel) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen  py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <Leaf className="w-16 h-16 mx-auto text-green-500 mb-4" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Scanner Daun Jagung</h1>
        <p className="text-gray-600 mb-12">Upload foto daun jagung untuk analisis AI</p>


      <ErrorDisplay error={error} />

      <FileInput
        onFileChange={handleImageUpload}
        disabled={!model}
      />

      {isPredicting && <LoadingSpinner />}

      <ImagePreview preview={preview} />

      <PredictionResult result={result} error={error} />

      <ModelStatus
        model={model}
        isLoadingModel={isLoadingModel}
        error={error}
      />
    </div>
    </div>
  );
};

export default CornLeafDetection;