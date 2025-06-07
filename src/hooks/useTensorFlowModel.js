import { useState, useEffect } from "react";
import { loadModel } from "../services/predictionService";

export const useTensorFlowModel = () => {
  const [model, setModel] = useState(null);
  const [isLoadingModel, setIsLoadingModel] = useState(true);
  const [modelError, setModelError] = useState(null);

  useEffect(() => {
    const initializeModel = async () => {
      setIsLoadingModel(true);
      setModelError(null);

      const { model: loadedModel, error: loadError } = await loadModel();
      if (loadedModel) {
        setModel(loadedModel);
      } else {
        setModelError(loadError);
      }

      setIsLoadingModel(false);
    };
    initializeModel();
  }, []);

  return { model, isLoadingModel, modelError };
};