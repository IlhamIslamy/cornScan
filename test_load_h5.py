import tensorflow as tf
import sys
import os

model_path = '/home/ahmadhaziq/Documents/Coding/corn-detection/model.h5'
# Tentukan path untuk menyimpan format SavedModel TensorFlow
# Mari kita beri nama yang jelas, misal: 'tf_keras_saved_model'
saved_model_dir = '/home/ahmadhaziq/Documents/Coding/corn-detection/tf_keras_saved_model' 

print(f"Mencoba memuat model dari: {model_path}")
try:
    model = tf.keras.models.load_model(model_path)
    model.summary() 
    print("\n[BERHASIL] Model H5 berhasil dimuat dengan arsitektur lengkap di Keras!")

    print(f"\nMenyimpan model ke format TensorFlow SavedModel di: {saved_model_dir}")
    
    if not os.path.exists(saved_model_dir):
        os.makedirs(saved_model_dir)
        print(f"Direktori {saved_model_dir} berhasil dibuat.")
        
    tf.saved_model.save(model, saved_model_dir)
    print(f"[BERHASIL] Model telah disimpan sebagai TensorFlow SavedModel di {saved_model_dir}")

except Exception as e:
    print(f"\n[ERROR] Gagal memuat atau menyimpan model H5 di Keras: {e}")
    sys.exit(1)