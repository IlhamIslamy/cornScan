import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Camera, Save, KeyRound, AlertCircle, CheckCircle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { API_ENDPOINTS } from '../config'; // Ensure this path is correct

const ProfilePage = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    // State
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [profilePictureFile, setProfilePictureFile] = useState(null); // Stores Base64 string for new image

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(true);
    const [isSavingDetails, setIsSavingDetails] = useState(false);
    const [isSavingPassword, setIsSavingPassword] = useState(false);

    const [message, setMessage] = useState({ type: '', text: '' });

    // Function to set message and clear it after a delay
    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 5000); // Clear message after 5 seconds
    };

    // Fetch user profile data on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch(API_ENDPOINTS.profile, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.status === 401 || response.status === 403) {
                    localStorage.clear();
                    navigate('/login');
                    showMessage('error', 'Sesi Anda telah berakhir, silakan login kembali.');
                    return;
                }

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({ message: 'Server error.' }));
                    throw new Error(errorData.message || 'Gagal memuat profil.');
                }

                const data = await response.json();
                setUser(data);
                // Ensure full_name is set from fetched data (assuming backend returns full_name)
                setFullName(data.full_name || '');
                // Set image preview from fetched data or default placeholder
                setImagePreview(data.profile_picture || 'https://placehold.co/128x128/E2E8F0/4A5568?text=User');
            } catch (error) {
                console.error('Error fetching profile:', error);
                showMessage('error', `Gagal memuat profil: ${error.message}.`);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, [navigate]);

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setProfilePictureFile(reader.result); // Store Base64
            };
            reader.readAsDataURL(file);
        }
    };

    // Handle saving profile details (full name & picture)
    const handleDetailsSubmit = async (e) => {
        e.preventDefault();
        setIsSavingDetails(true);
        setMessage({ type: '', text: '' }); // Clear previous messages
        const token = localStorage.getItem('token');

        // --- THE KEY CHANGE IS HERE ---
        const payload = {
            fullName: fullName, // CHANGED from full_name to fullName
            profilePicture: profilePictureFile // CHANGED from profile_picture to profilePicture (if your backend expects camelCase)
        };
        console.log('Sending payload for profile details update:', payload);
        // --- END KEY CHANGE ---

        try {
            const response = await fetch(API_ENDPOINTS.profileDetails, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Server error.' }));
                throw new Error(errorData.message || 'Gagal memperbarui detail profil.');
            }

            const data = await response.json();
            if (data.token) localStorage.setItem('token', data.token);
            if (data.user) {
                localStorage.setItem('user', JSON.stringify(data.user));
                // Update local 'user' state with the potentially new data from backend
                setUser(data.user);
                // Important: Update fullName state from data.user's potentially new value
                // Use data.user.full_name or data.user.fullName based on what backend returns
                setFullName(data.user.full_name || data.user.fullName || '');
            }

            window.dispatchEvent(new Event('storage'));

            showMessage('success', 'Detail profil berhasil diperbarui!');
            setProfilePictureFile(null); // Clear file after successful upload
        } catch (error) {
            console.error('Error saving details:', error);
            showMessage('error', `Gagal memperbarui profil: ${error.message}.`);
        } finally {
            setIsSavingDetails(false);
        }
    };

    // Handle changing password
    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            showMessage('error', 'Konfirmasi kata sandi baru tidak cocok.');
            return;
        }
        if (newPassword.length < 6) {
            showMessage('error', 'Kata sandi baru minimal harus 6 karakter.');
            return;
        }
        setIsSavingPassword(true);
        setMessage({ type: '', text: '' }); // Clear previous messages
        const token = localStorage.getItem('token');

        try {
            const response = await fetch(API_ENDPOINTS.profilePassword, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ currentPassword, newPassword }),
            });

            if (response.status === 401 || response.status === 403) {
                localStorage.clear();
                navigate('/login');
                showMessage('error', 'Sesi Anda telah berakhir, silakan login kembali.');
                return;
            }

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Server error.' }));
                throw new Error(errorData.message || 'Gagal mengubah kata sandi.');
            }

            const data = await response.json();
            showMessage('success', data.message || 'Kata sandi berhasil diubah!');

            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error changing password:', error);
            showMessage('error', `Gagal mengubah kata sandi: ${error.message}.`);
        } finally {
            setIsSavingPassword(false);
        }
    };

    if (isLoading) return <LoadingSpinner text="Memuat Profil..." />;

    return (
        <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-green-50 to-blue-50">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl py-2 font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Pengaturan Profil
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto"></div>
                </div>

                {message.text && (
                    <div className={`rounded-lg p-4 mb-8 flex items-center space-x-3 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {message.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                        <span className="font-medium">{message.text}</span>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Kartu Detail Profil */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Detail Profil</h3>
                        <form onSubmit={handleDetailsSubmit}>
                            <div className="flex flex-col items-center mb-6">
                                <img
                                    src={imagePreview}
                                    alt="Avatar"
                                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-gray-200"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://placehold.co/128x128/E2E8F0/4A5568?text=User';
                                    }}
                                />
                                <button type="button" className="flex items-center space-x-2 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors text-sm" onClick={() => fileInputRef.current.click()}>
                                    <Camera size={16} />
                                    <span>Ubah Foto</span>
                                </button>
                                <input type="file" ref={fileInputRef} onChange={handleImageChange} style={{ display: 'none' }} accept="image/*" />
                            </div>

                            <div className="mb-6">
                                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="pl-3 text-gray-400"><User size={18} /></span>
                                    <input type="text" id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="w-full p-2 border-none focus:ring-0" />
                                </div>
                            </div>

                            <div className="mb-8">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-gray-100">
                                    <span className="pl-3 text-gray-400"><Mail size={18} /></span>
                                    <input type="email" id="email" value={user?.email || ''} disabled className="w-full p-2 border-none bg-gray-100 text-gray-500 cursor-not-allowed focus:ring-0" />
                                </div>
                            </div>

                            <button type="submit" className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSavingDetails}>
                                <Save size={20} />
                                <span>{isSavingDetails ? 'Menyimpan...' : 'Simpan Perubahan'}</span>
                            </button>
                        </form>
                    </div>

                    {/* Kartu Ganti Password */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Ubah Kata Sandi</h3>
                        <form onSubmit={handlePasswordSubmit}>
                            <div className="mb-6">
                                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Saat Ini</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="pl-3 text-gray-400"><KeyRound size={18} /></span>
                                    <input type="password" id="currentPassword" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} required className="w-full p-2 border-none focus:ring-0" />
                                </div>
                            </div>
                            <div className="mb-6">
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi Baru</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="pl-3 text-gray-400"><KeyRound size={18} /></span>
                                    <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength="6" className="w-full p-2 border-none focus:ring-0" />
                                </div>
                            </div>
                            <div className="mb-8">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">Konfirmasi Kata Sandi Baru</label>
                                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-green-500">
                                    <span className="pl-3 text-gray-400"><KeyRound size={18} /></span>
                                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full p-2 border-none focus:ring-0" />
                                </div>
                            </div>
                            <button type="submit" className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed" disabled={isSavingPassword}>
                                <Save size={20} />
                                <span>{isSavingPassword ? 'Menyimpan...' : 'Ubah Kata Sandi'}</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;