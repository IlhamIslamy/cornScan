import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { KeyRound, Save, AlertCircle, CheckCircle } from 'lucide-react';
import '../css/AuthPage.css';

const ResetPasswordPage = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Kata sandi tidak cocok.' });
            return;
        }
        setIsLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await fetch('http://localhost:3001/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message);
            setMessage({ type: 'success', text: data.message });
            setTimeout(() => navigate('/login'), 2000);
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
                    <h2 className="text-center">Atur Ulang Kata Sandi</h2>
                    <p className="text-center mb-4">Masukkan kata sandi baru Anda.</p>
                    
                    {message.text && (
                        <p className={`message ${message.type === 'success' ? 'success' : 'error'}`}>
                             {message.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            {message.text}
                        </p>
                    )}

                    <div className="form-group">
                        <label htmlFor="password">Kata Sandi Baru</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Konfirmasi Kata Sandi</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        <Save size={18} />
                        <span>{isLoading ? 'Menyimpan...' : 'Simpan Kata Sandi'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
