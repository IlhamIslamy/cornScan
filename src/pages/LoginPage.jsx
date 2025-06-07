import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import '../css/AuthPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Tambahkan state loading

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true); // Nonaktifkan tombol saat request

     try {
       const res = await fetch('http://localhost:3001/api/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ email, password }),
       });

       const data = await res.json();

       if (!res.ok) {
         throw new Error(data.message || 'Something went wrong');
       }
       
       // Jika sukses: simpan token dan data user, lalu arahkan
       setIsError(false);
       setMessage(data.message);
       
       localStorage.setItem('token', data.token);
       localStorage.setItem('user', JSON.stringify(data.user));

       // Arahkan ke dashboard setelah 1.5 detik
       setTimeout(() => {
           navigate('/dashboard');
       }, 1500);


     } catch (err) {
       setIsError(true);
       setMessage(err.message);
     } finally {
        setIsLoading(false); // Aktifkan kembali tombol setelah selesai
     }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <form onSubmit={onSubmit}>
          <h2 className="text-center">Selamat Datang Kembali!</h2>
          <p className="text-center mb-3">Silakan masuk untuk melanjutkan.</p>

          <div className="form-group">
            <label htmlFor="email">Alamat Email</label>
            <input
              type="email"
              id="email"
              placeholder="contoh@email.com"
              value={email}
              onChange={onChange}
              required
            />
          </div>

          <div className="form-group">
            {/* --- BAGIAN YANG DIPERBARUI --- */}
            <div className="label-group">
                <label htmlFor="password">Kata Sandi</label>
                <Link to="/forgot-password" className="link-forgot-password">
                    Lupa Kata Sandi?
                </Link>
            </div>
            {/* --- AKHIR PEMBARUAN --- */}
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={onChange}
              required
            />
          </div>

           {message && (
            <p className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
           )}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            <LogIn size={18} />
            <span>{isLoading ? 'Memproses...' : 'Login'}</span>
          </button>

          <p className="text-center mt-3">
            Belum punya akun?{' '}
            <Link to="/register" className="link-primary">
              Daftar di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
