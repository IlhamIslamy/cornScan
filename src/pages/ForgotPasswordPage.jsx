import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, AlertCircle, CheckCircle } from 'lucide-react';
import '../css/AuthPage.css'; // Gunakan style yang sama

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('http://localhost:3001/api/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setMessage({ type: 'success', text: data.message });
        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="card auth-card">
                <form onSubmit={onSubmit}>
                    <h2 className="text-center">Lupa Kata Sandi</h2>
                    <p className="text-center mb-4">Masukkan email Anda untuk menerima link pemulihan.</p>

                    {message.text && (
                        <p className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
                            {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            {message.text}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Alamat Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="contoh@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        <Mail size={18} />
                        <span>{isLoading ? 'Mengirim...' : 'Kirim Link Pemulihan'}</span>
                    </button>

                    <p className="text-center mt-3">
                        Kembali ke halaman{' '}
                        <Link to="/login" className="link-primary">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
