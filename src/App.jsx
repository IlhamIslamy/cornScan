import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Import Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Team from './pages/Team';
import CornLeafDetection from './pages/CornLeafDetectionPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage'; // <-- 1. Import halaman baru
import ResetPasswordPage from './pages/ResetPasswordPage';   // <-- 2. Import halaman baru

// Import Components
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="bg-white flex flex-col min-h-screen">
        <Navigation />

        {/* Main Content */}
        <main className="mx-auto flex-grow w-full">
            <Routes>
              {/* Rute Publik */}
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cornLeafScanner" element={<CornLeafDetection />} />
              <Route path="/team" element={<Team/>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} /> {/* <-- 3. Tambahkan rute */}
              <Route path="/reset-password/:token" element={<ResetPasswordPage />} /> {/* <-- 4. Tambahkan rute dengan parameter */}

              {/* Rute yang Dilindungi */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/riwayat" element={<HistoryPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
              
            </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              CornLeaf AI
            </span>
            <p className="text-gray-400 mt-2">
              Teknologi AI terdepan untuk deteksi penyakit daun jagung.
            </p>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} CornLeaf AI. Teknologi AI untuk pertanian yang lebih baik.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
