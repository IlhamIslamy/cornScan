import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Team from './pages/Team';
import CornLeafDetection from './pages/CornLeafDetectionPage';
import './index.css';
import Navigation from './components/Navigation';

function App() {
  return (
    <Router>
      <div className="bg-white">
        <Navigation />

        {/* Main Content */}
        <main className="mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cornLeafScanner" element={<CornLeafDetection />} />
              <Route path="/team" element={<Team/>} />
            </Routes>
        </main>

        {/* Footer */}
      </div>
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12">
          <div className="container mx-auto px-4 text-center">
            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              CornLeaf AI
            </span>
            <p className="text-gray-400">
              Teknologi AI terdepan untuk deteksi penyakit daun jagung.
            </p>

            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-400">
                © 2025 CornLeaf AI. Teknologi AI untuk pertanian yang lebih baik.
              </p>
            </div>
          </div>
        </footer>
    </Router>
  );
}
export default App;