import { useState, useEffect } from "react";
import { loadModel } from "../services/predictionService";

// Declare a variable outside the hook to cache the loaded model
let cachedModel = null;
let modelLoadingPromise = null;

export const useTensorFlowModel = () => {
  const [model, setModel] = useState(cachedModel);
  const [isLoadingModel, setIsLoadingModel] = useState(!cachedModel);
  const [modelError, setModelError] = useState(null);

  useEffect(() => {
    const initializeModel = async () => {
      // If the model is already cached, no need to load it again
      if (cachedModel) {
        setIsLoadingModel(false);
        return;
      }

      // If a loading operation is already in progress, wait for it
      if (modelLoadingPromise) {
        setIsLoadingModel(true);
        try {
          const loadedModel = await modelLoadingPromise;
          setModel(loadedModel);
          setModelError(null);
        } catch (error) {
          setModelError(error);
        } finally {
          setIsLoadingModel(false);
        }
        return;
      }

      // Start loading the model and store the promise
      setIsLoadingModel(true);
      setModelError(null);
      modelLoadingPromise = loadModel(); // Assuming loadModel returns a promise that resolves to { model, error }

      try {
        const { model: loadedModel, error: loadError } = await modelLoadingPromise;
        if (loadedModel) {
          setModel(loadedModel);
          cachedModel = loadedModel; // Cache the loaded model
          setModelError(null);
        } else {
          setModelError(loadError);
        }
      } catch (error) {
        setModelError(error);
      } finally {
        setIsLoadingModel(false);
        modelLoadingPromise = null; // Clear the promise once loading is complete
      }
    };

    initializeModel();
  }, []);

  return { model, isLoadingModel, modelError };
};