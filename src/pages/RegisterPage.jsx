import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';
import '../css/AuthPage.css';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const { fullName, email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);

    try {
      const res = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        // Handle server-side validation errors (e.g., user exists)
        throw new Error(data.message || 'Something went wrong');
      }
      
      // On success
      setIsError(false);
      setMessage(data.message);
      // Redirect to login page after a short delay
      setTimeout(() => {
          navigate('/login');
      }, 2000);

    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="card auth-card">
        <form onSubmit={onSubmit}>
          <h2 className="text-center">Buat Akun Baru</h2>
          <p className="text-center mb-3">Isi form di bawah untuk mendaftar.</p>

          <div className="form-group">
            <label htmlFor="fullName">Nama Lengkap</label>
            <input
              type="text"
              id="fullName"
              placeholder="Masukkan nama lengkap Anda"
              value={fullName}
              onChange={onChange}
              required
            />
          </div>

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
            <label htmlFor="password">Buat Kata Sandi</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          
          {message && (
            <p className={`message ${isError ? 'error' : 'success'}`}>
              {message}
            </p>
          )}

          <button type="submit" className="btn-primary">
            <UserPlus size={18} />
            <span>Daftar</span>
          </button>

          <p className="text-center mt-3">
            Sudah punya akun?{' '}
            <Link to="/login" className="link-primary">
              Login di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
