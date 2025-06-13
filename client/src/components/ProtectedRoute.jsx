import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

/**
 * Komponen ProtectedRoute
 * @desc Komponen ini berfungsi sebagai pembungkus untuk rute yang memerlukan autentikasi.
 * Ia memeriksa apakah ada token di localStorage.
 * - Jika ada, ia akan merender komponen anak (menggunakan <Outlet />).
 * - Jika tidak ada, ia akan mengarahkan pengguna ke halaman login.
 */
const ProtectedRoute = () => {
  // Cek apakah token ada di localStorage
  const token = localStorage.getItem('token');

  // Jika token ada, izinkan akses ke rute. Jika tidak, arahkan ke /login.
  // `replace` digunakan agar pengguna tidak bisa kembali ke halaman sebelumnya (yang dilindungi) dengan tombol "back" di browser.
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
