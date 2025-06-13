import { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { preprocessImage, makePrediction, findBestPrediction } from "../services/predictionService";
import { isLikelyLeaf } from '../utils/detectionUtils';
import { labels } from "../utils/labels";

const THRESHOLD = 0.5;

export const usePrediction = () => {
  const [result, setResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionError, setPredictionError] = useState(null);

  const performPrediction = async (model, img) => {
    if (!model) {
      setPredictionError("Model belum siap. Mohon tunggu.");
      return;
    }

    setPredictionError(null);
    setResult(null);

    // Heuristik untuk cek apakah gambar adalah daun
    if (!isLikelyLeaf(img)) {
      setPredictionError("Gambar yang diunggah sepertinya bukan daun jagung.");
      return;
    }

    try {
      setIsPredicting(true);
      const tensor = preprocessImage(img);
      const data = await makePrediction(model, tensor);
      const predictionResult = findBestPrediction(data, labels);

      if (predictionResult.confidence < THRESHOLD) {
        setPredictionError("Gambar tidak dapat dikenali sebagai salah satu kategori penyakit jagung.");
        setResult(null);
      } else {
        setResult(predictionResult);
      }
      
      tf.dispose(tensor);
    } catch (err) {
      setPredictionError("Terjadi error saat prediksi: " + err.message);
    } finally {
      setIsPredicting(false);
    }
  };

  const resetPrediction = () => {
    setResult(null);
    setPredictionError(null);
  };

  return { result, isPredicting, predictionError, performPrediction, resetPrediction };
};