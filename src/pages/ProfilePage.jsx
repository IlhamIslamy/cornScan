import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Save, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import '../css/ProfilePage.css';

const ProfilePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // State
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isSavingDetails, setIsSavingDetails] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);
    
    const [message, setMessage] = useState({ type: '', text: '' });

    // Fetch data profil saat halaman dimuat
    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://localhost:3001/api/profile', {
                    headers: { 'Authorization': `Bearer ${token}` },
                });
                
                // Jika token ditolak, logout pengguna
                if (response.status === 401 || response.status === 403) {
                    localStorage.clear(); // Hapus semua data dari local storage
                    navigate('/login');
                    return;
                }

                if (!response.ok) throw new Error('Gagal memuat profil.');
                
                const data = await response.json();
                setUser(data);
                setFullName(data.full_name);
                // Sediakan gambar avatar default jika pengguna tidak punya
                setImagePreview(data.profile_picture || 'https://placehold.co/120x120/E2E8F0/4A5568?text=User'); 
            } catch (error) {
                setMessage({ type: 'error', text: error.message });
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    // Handle pemilihan gambar
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setProfilePictureFile(reader.result); // Simpan Base64
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle simpan detail (nama & foto)
    const handleDetailsSubmit = async (e) => {
        e.preventDefault();
        setIsSavingDetails(true);
        setMessage({ type: '', text: '' });
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/profile/details', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    fullName: fullName,
                    // Kirim gambar baru jika ada, jika tidak kirim yang lama
                    profilePicture: profilePictureFile || user.profile_picture,
                }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            
            // Update localStorage dengan token & data user baru yang diterima dari backend
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Kirim sinyal bahwa data di local storage telah berubah
            window.dispatchEvent(new Event('storage'));

            setMessage({ type: 'success', text: 'Detail profil berhasil diperbarui!' });
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSavingDetails(false);
        }
    };
    
    // Handle ganti password
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage({ type: 'error', text: 'Konfirmasi kata sandi baru tidak cocok.' });
            return;
        }
        if (newPassword.length < 6) {
             setMessage({ type: 'error', text: 'Kata sandi baru minimal harus 6 karakter.' });
            return;
        }
        setIsSavingPassword(true);
        setMessage({ type: '', text: '' });
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:3001/api/profile/password', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword, newPassword }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setMessage({ type: 'success', text: 'Kata sandi berhasil diubah!' });
            
            // Kosongkan field password setelah berhasil
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setIsSavingPassword(false);
        }
    };

    if (isLoading) return <LoadingSpinner text="Memuat Profil..." />;

    return (
        <div className="profile-container">
            <h2 className="profile-header">Pengaturan Profil</h2>
            
            {message.text && (
                <div className={`message-banner ${message.type === 'success' ? 'success' : 'error'}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{message.text}</span>
                </div>
            )}

            <div className="profile-grid">
                {/* Kartu Detail Profil */}
                <div className="profile-card">
                    <h3>Detail Profil</h3>
                    <form onSubmit={handleDetailsSubmit}>
                        <div className="avatar-section">
                            <img src={imagePreview} alt="Avatar" className="avatar-preview" onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/120x120/E2E8F0/4A5568?text=User'; }}/>
                            <button type="button" className="btn-change-avatar" onClick={() => fileInputRef.current.click()}>
                                <Camera size={16} /> Ubah Foto
                            </button>
                            <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="fullName">Nama Lengkap</label>
                            <div className="input-with-icon">
                                <User size={18} />
                                <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label htmlFor="email">Email</label>
                            <div className="input-with-icon">
                                <Mail size={18} />
                                <input type="email" id="email" value={user?.email || ''} disabled />
                            </div>
                        </div>

                        <button type="submit" className="btn-save" disabled={isSavingDetails}>
                            <Save size={18} />
                            {isSavingDetails ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </button>
                    </form>
                </div>

                {/* Kartu Ganti Password */}
                <div className="profile-card">
                    <h3>Ubah Kata Sandi</h3>
                    <form onSubmit={handlePasswordSubmit}>
                        <div className="input-group">
                            <label htmlFor="currentPassword">Kata Sandi Saat Ini</label>
                            <div className="input-with-icon">
                                <KeyRound size={18} />
                                <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="newPassword">Kata Sandi Baru</label>
                            <div className="input-with-icon">
                                <KeyRound size={18} />
                                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength="6" />
                            </div>
                        </div>
                        <div className="input-group">
                            <label htmlFor="confirmPassword">Konfirmasi Kata Sandi Baru</label>
                            <div className="input-with-icon">
                                <KeyRound size={18} />
                                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                            </div>
                        </div>
                        <button type="submit" className="btn-save" disabled={isSavingPassword}>
                            <Save size={18} />
                            {isSavingPassword ? 'Menyimpan...' : 'Ubah Kata Sandi'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
