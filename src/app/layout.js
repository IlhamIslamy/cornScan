import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'CornScan App',
  description: 'Aplikasi deteksi penyakit tanaman',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="app-container">
        <aside className="sidebar">
          <div className="logo">CornScan 🌽</div>
          <nav className="nav-menu">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/penyakit">Data Penyakit</Link>
            <Link href="/riwayat">Riwayat</Link>
          </nav>
        </aside>
        <div className="main-content">
          <header className="topbar">
            <h1>CornScan</h1>
          </header>
          <main className="content-area">{children}</main>
          <footer className="footer">
            © 2025, made with CornScan by Tim ..... | Creative Tim
          </footer>
        </div>
      </body>
    </html>
  );
}