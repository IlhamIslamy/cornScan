// postcss.config.js (Setelah Diperbaiki)
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // Perubahan di sini
    // Pastikan plugin lain seperti autoprefixer masih ada jika Anda menggunakannya
    // 'autoprefixer': {}, // Contoh
  },
};