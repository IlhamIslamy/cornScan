import tensorflow as tf
import sys
import os

# 1. Tentukan path ke file .h5 Anda
path_ke_model_h5 = '/home/ahmadhaziq/Documents/Coding/corn-detection/model.h5'

# 2. Tentukan nama untuk DIREKTORI output SavedModel yang akan dibuat skrip ini
nama_direktori_savedmodel_dari_python = 'python_output_savedmodel_dir'
path_lengkap_direktori_savedmodel = os.path.join(os.getcwd(), nama_direktori_savedmodel_dari_python)

print(f"Memuat model dari: {path_ke_model_h5}")
try:
    if not os.path.exists(path_ke_model_h5):
        print(f"[GAGAL] File H5 tidak ditemukan di: {path_ke_model_h5}")
        sys.exit(1)
        
    model_keras = tf.keras.models.load_model(path_ke_model_h5)
    model_keras.summary() 
    print(f"\n[OK] Model H5 '{path_ke_model_h5}' berhasil dimuat.")

    # Membuat direktori output jika belum ada
    if not os.path.exists(path_lengkap_direktori_savedmodel):
        os.makedirs(path_lengkap_direktori_savedmodel)
        print(f"Direktori '{path_lengkap_direktori_savedmodel}' berhasil dibuat.")
    else:
        print(f"Direktori '{path_lengkap_direktori_savedmodel}' sudah ada. Isinya mungkin akan ditimpa.")
        
    print(f"\nMenyimpan model ke format TensorFlow SavedModel di: {path_lengkap_direktori_savedmodel}")
    tf.saved_model.save(model_keras, path_lengkap_direktori_savedmodel)
    print(f"[OK] Model telah disimpan sebagai TensorFlow SavedModel di '{path_lengkap_direktori_savedmodel}'")
    print(f"\nSELANJUTNYA: Jalankan tensorflowjs_converter dengan input path '{nama_direktori_savedmodel_dari_python}' (jika Anda di direktori yang sama).")

except Exception as e:
    print(f"\n[GAGAL] Terjadi kesalahan: {e}")
    sys.exit(1)