import * as tf from "@tensorflow/tfjs";

// Import TensorFlow.js for GraphModel support
export const loadModel = async () => {
    try {
        await tf.ready();
        const modelPath = "/model/model.json";
        const loadedModel = await tf.loadGraphModel(modelPath);
        return { model: loadedModel, error: null };
    } catch (err) {
        return {
            model: null,
            error: err.message
        };
    }
};

// Preprocess the image to match the input requirements of the model
export const preprocessImage = (img) => {
    return tf.tidy(() => {
        const pixels = tf.browser.fromPixels(img);
        const resized = tf.image.resizeBilinear(pixels, [224, 224]);
        const toFloat = resized.toFloat();
        const normalized = toFloat.sub(tf.scalar(127.5)).div(tf.scalar(127.5));
        return normalized.expandDims();
    });
};

// Make a prediction using the loaded GraphModel
export const makePrediction = async (model, tensor) => {
    try {
        console.log("Melakukan prediksi dengan GraphModel...");

        const prediction = model.predict(tensor);
        let data;

        if (prediction instanceof tf.Tensor) {
            data = await prediction.data();
            tf.dispose(prediction);
        } else if (Array.isArray(prediction) && prediction[0] instanceof tf.Tensor) {
            data = await prediction[0].data();
            tf.dispose(prediction);
        } else {
            console.error("Format output prediksi tidak terduga:", prediction);
            throw new Error("Format output prediksi dari GraphModel tidak dikenali.");
        }

        return data;
    } catch (err) {
        console.error("Error saat prediksi dengan GraphModel:", err);
        throw new Error(`Error saat prediksi: ${err.message}`);
    }
};


// Find the class with the highest probability from the prediction data
export const findBestPrediction = (data, classNames) => {
    let maxProb = -1;
    let predictedClassIndex = -1;

    for (let i = 0; i < data.length; i++) {
        if (data[i] > maxProb) {
            maxProb = data[i];
            predictedClassIndex = i;
        }
    }

    if (predictedClassIndex !== -1 && classNames && classNames[predictedClassIndex]) {
        return {
            className: classNames[predictedClassIndex],
            probability: maxProb,
        };
    } else {
        throw new Error("Gagal memproses hasil prediksi (indeks atau nama kelas tidak valid).");
    }
};