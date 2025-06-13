import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Dapatkan path absolut dari direktori tempat file vite.config.js ini berada.
// Ini seharusnya adalah '.../JAGUNG/client/' berdasarkan struktur yang Anda tunjukkan.
const currentDir = path.resolve(__dirname);

export default defineConfig({
  plugins: [react()],
  
  // Menentukan root proyek Vite secara eksplisit.
  // Ini adalah direktori tempat 'index.html' Anda berada dan dari mana Vite akan memuat dependensi.
  // Jika vite.config.js Anda berada di 'client/', maka root-nya adalah 'client/'.
  root: currentDir,

  // Menentukan direktori aset publik. Vite akan menyalin file-file dari sini ke 'dist'.
  publicDir: path.resolve(currentDir, 'public'),

  server: {
    port: 3000, // Port untuk server pengembangan lokal ('npm run dev')
    // Mengizinkan server diakses dari jaringan lokal (misalnya dari IP lain)
    host: true, // atau '0.0.0.0'
  },
  resolve: {
    alias: {
      // Menentukan alias '@' untuk menunjuk ke folder 'src' di dalam root proyek.
      // Ini akan menyelesaikan import '@/components/Navigation' ke 'client/src/components/Navigation'.
      '@': path.resolve(currentDir, 'src'),
    },
  },
  build: {
    // Direktori output untuk hasil build produksi.
    outDir: path.resolve(currentDir, 'dist'), 
    
    // Direktori di dalam 'outDir' tempat aset yang dihasilkan (CSS, JS, gambar) akan ditempatkan.
    assetsDir: 'assets',

    // Konfigurasi 'base' sangat penting untuk deployment SPA.
    // Jika aplikasi di-deploy di root domain (misalnya: https://domain.com/), gunakan '/'.
    // Jika di-deploy di sub-direktori (misalnya: https://domain.com/aplikasi-saya/),
    // Anda HARUS mengubahnya menjadi, misalnya: base: '/aplikasi-saya/',
    // Pastikan nilai ini sesuai dengan path deployment Anda di server.
    base: '/', 
  },
});
