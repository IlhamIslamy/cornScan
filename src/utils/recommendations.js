export const recommendations = {
    "Sehat": {
        icon: "🌿",
        title: "Sehat",
        description: "Daun jagung dalam kondisi sehat dan optimal.",
        actions: [
            "Lanjutkan pemantauan rutin daun dan kondisi tanaman secara berkala.",
            "Jaga kelembaban dan nutrisi tanah tetap optimal.",
            "Lakukan rotasi tanaman secara berkala untuk mencegah penumpukan patogen."
        ],
        color: "green",
        severity: "low"
    },
    "Hawar": {
        icon: "🟠",
        title: "Hawar Daun (Leaf Blight)",
        description: "Bercak kecoklatan memanjang, cepat menyebar di permukaan daun.",
        actions: [
            "Gunakan fungisida berbahan aktif seperti **mancozeb**, **chlorothalonil**, atau **azoxystrobin**.",
            "Pangkas daun yang sudah parah agar tidak menyebar.",
            "Tingkatkan sirkulasi udara antar tanaman dengan jarak tanam yang baik.",
            "Hindari penyiraman dari atas (basahi tanah, bukan daun)."
        ],
        color: "orange",
        severity: "medium"
    },
    "Karat": {
        icon: "🧡",
        title: "Karat Daun (Common Rust)",
        description: "Bintik kecil berwarna oranye atau kecoklatan seperti serbuk di permukaan daun.",
        actions: [
            "Aplikasikan fungisida sistemik seperti **propiconazole** atau **tebuconazole**.",
            "Gunakan varietas jagung yang tahan karat bila tersedia.",
            "Lakukan sanitasi lahan: bersihkan sisa tanaman dan gulma yang bisa jadi inang penyakit."
        ],
        color: "orange",
        severity: "medium"
    },
    "Layu": {
        icon: "🔴",
        title: "Layu (Wilt)",
        description: "Daun menguning lalu layu meskipun tanah cukup air, batang kadang membusuk.",
        actions: [
            "Periksa kemungkinan serangan jamur seperti *Fusarium* atau bakteri penyebab layu.",
            "Gunakan fungisida seperti **carbendazim** untuk infeksi jamur.",
            "Tingkatkan drainase lahan jika terlalu becek.",
            "Cabut tanaman yang sudah parah untuk mencegah penyebaran ke tanaman sehat."
        ],
        color: "red",
        severity: "high"
    }
};

export const getRecommendation = (className) => {
    return recommendations[className] || {
        icon: "❓",
        title: "Tidak Diketahui",
        description: "Kondisi daun tidak dapat diidentifikasi dengan pasti.",
        actions: [
            "Silakan ambil foto ulang dengan kualitas yang lebih baik.",
            "Pastikan pencahayaan cukup dan foto tidak blur.",
            "Konsultasikan dengan ahli pertanian jika masalah berlanjut."
        ],
        color: "gray",
        severity: "unknown"
    };
};