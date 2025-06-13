// server.js (Versi Final dengan Health Check)

require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const app = express();

// --- Middleware ---
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10mb' }));

// --- Konstanta & Konfigurasi ---
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-key-that-is-long-and-secure';
const PORT = process.env.PORT || 3001;

// --- Koneksi Database (MENGGUNAKAN CONNECTION POOL) ---
const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cornleafai',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
};

let pool;
try {
    pool = mysql.createPool(dbConfig);
    console.log('Successfully created MySQL connection pool.');
} catch (err) {
    console.error('Database pool creation failed:', err.stack);
    process.exit(1);
}

// --- Konfigurasi Nodemailer ---
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP Error:', error);
    } else {
        console.log('SMTP Server ready');
    }
});

// --- Middleware Verifikasi JWT ---
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') return res.status(401).json({ message: 'Sesi telah berakhir, silakan login kembali.' });
        return res.status(403).json({ message: 'Token tidak valid.' });
    }
};

// --- Rute API (Direfaktor dengan Async/Await) ---

// ==========================================================
// PERBAIKAN DI SINI: Rute untuk Health Check Railway
// ==========================================================
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Backend API is running and healthy.'
    });
});


// --- Rute Autentikasi ---
app.post('/api/register', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password || password.length < 6) {
            return res.status(400).json({ message: 'Harap isi semua kolom. Kata sandi minimal 6 karakter.' });
        }
        const [users] = await pool.query('SELECT email FROM users WHERE email = ?', [email]);
        if (users.length > 0) {
            return res.status(400).json({ message: 'Email ini sudah terdaftar.' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query('INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)', [fullName, email, hashedPassword]);
        res.status(201).json({ message: 'Registrasi berhasil! Silakan login.' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Harap masukkan email dan password.' });
        }
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Email atau kata sandi salah.' });
        }
        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email atau kata sandi salah.' });
        }
        const payload = { user: { id: user.id, email: user.email, fullName: user.full_name } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: 'Login berhasil!', token, user: payload.user });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
    }
});

// --- Rute Lupa & Reset Kata Sandi ---
app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: 'Email harus diisi.' });
        const [users] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(200).json({ message: 'Jika email terdaftar, link pemulihan telah dikirim.' });
        }
        const user = users[0];
        const resetToken = crypto.randomBytes(32).toString('hex');
        const expiryDate = new Date(Date.now() + 3600000); // 1 jam
        await pool.query('UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE id = ?', [resetToken, expiryDate, user.id]);

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        const mailOptions = {
            from: `"CornLeaf AI" <${process.env.GMAIL_USER}>`,
            to: user.email,
            subject: 'Pemulihan Kata Sandi Akun Anda',
            html: `<p>Halo ${user.full_name},</p><p>Klik link berikut untuk mereset kata sandi Anda: <a href="${resetLink}" style="background-color:#16a34a;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">Reset Kata Sandi</a></p><p>Link ini akan kedaluwarsa dalam 1 jam. Jika Anda tidak meminta ini, abaikan email ini.</p>`
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Jika email terdaftar, link pemulihan telah dikirim.' });
    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Gagal memproses permintaan.' });
    }
});

app.post('/api/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        if (!token || !newPassword || newPassword.length < 6) {
            return res.status(400).json({ message: 'Token dan kata sandi baru (minimal 6 karakter) diperlukan.' });
        }
        const [users] = await pool.query('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > NOW()', [token]);
        if (users.length === 0) {
            return res.status(400).json({ message: 'Token tidak valid atau telah kedaluwarsa.' });
        }
        const user = users[0];
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [hashedPassword, user.id]);
        res.status(200).json({ message: 'Kata sandi berhasil diatur ulang.' });
    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Gagal mereset kata sandi.' });
    }
});

// --- Rute Riwayat ---
app.post('/api/history/save', verifyToken, async (req, res) => {
    try {
        const { detection_result, accuracy, recommendation, image_data } = req.body;
        if (!detection_result || !image_data) return res.status(400).json({ message: 'Data tidak lengkap.' });
        await pool.query('INSERT INTO scan_history (user_id, image_data, detection_result, accuracy, recommendation) VALUES (?, ?, ?, ?, ?)', [req.user.id, image_data, detection_result, accuracy, JSON.stringify(recommendation)]);
        res.status(201).json({ message: 'Riwayat berhasil disimpan.' });
    } catch (error) {
        console.error('Save history error:', error);
        res.status(500).json({ message: 'Gagal menyimpan riwayat.' });
    }
});

app.get('/api/history', verifyToken, async (req, res) => {
    try {
        const [history] = await pool.query('SELECT id, image_data, detection_result, accuracy, scanned_at FROM scan_history WHERE user_id = ? ORDER BY scanned_at DESC', [req.user.id]);
        res.json(history);
    } catch (error) {
        console.error('Fetch history error:', error);
        res.status(500).json({ message: 'Gagal mengambil data riwayat.' });
    }
});

app.delete('/api/history/:id', verifyToken, async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM scan_history WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: 'Riwayat tidak ditemukan.' });
        res.status(200).json({ message: 'Riwayat berhasil dihapus.' });
    } catch (error) {
        console.error('Delete history error:', error);
        res.status(500).json({ message: 'Gagal menghapus riwayat.' });
    }
});

// --- Rute Profil ---
app.get('/api/profile', verifyToken, async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT id, full_name, email, profile_picture FROM users WHERE id = ?', [req.user.id]);
        if (rows.length === 0) return res.status(404).json({ message: 'User tidak ditemukan.' });
        res.json(rows[0]);
    } catch (error) {
        console.error('Fetch profile error:', error);
        res.status(500).json({ message: 'Gagal mengambil profil.' });
    }
});

app.put('/api/profile/details', verifyToken, async (req, res) => {
    try {
        const { fullName, profilePicture } = req.body;
        if (!fullName) return res.status(400).json({ message: 'Nama lengkap tidak boleh kosong.' });
        await pool.query('UPDATE users SET full_name = ?, profile_picture = ? WHERE id = ?', [fullName, profilePicture, req.user.id]);
        
        const [users] = await pool.query('SELECT id, full_name, email FROM users WHERE id = ?', [req.user.id]);
        const user = users[0];
        const payload = { user: { id: user.id, email: user.email, fullName: user.full_name } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        
        res.json({ message: 'Profil berhasil diperbarui.', user: payload.user, token });
    } catch (error) {
        console.error('Update profile error:', error);
        res.status(500).json({ message: 'Gagal memperbarui profil.' });
    }
});

app.put('/api/profile/password', verifyToken, async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        if (!currentPassword || !newPassword) return res.status(400).json({ message: 'Harap isi semua kolom.' });
        if (newPassword.length < 6) return res.status(400).json({ message: 'Kata sandi baru minimal 6 karakter.' });
        
        const [users] = await pool.query('SELECT password FROM users WHERE id = ?', [req.user.id]);
        const isMatch = await bcrypt.compare(currentPassword, users[0].password);
        if (!isMatch) return res.status(400).json({ message: 'Kata sandi saat ini salah.' });
        
        const newHashedPassword = await bcrypt.hash(newPassword, 10);
        await pool.query('UPDATE users SET password = ? WHERE id = ?', [newHashedPassword, req.user.id]);
        
        res.status(200).json({ message: 'Kata sandi berhasil diubah.' });
    } catch (error) {
        console.error('Change password error:', error);
        res.status(500).json({ message: 'Gagal mengubah kata sandi.' });
    }
});

// --- Rute Statistik ---
app.get('/api/stats', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const queries = [
            pool.query('SELECT COUNT(*) as totalScans FROM scan_history WHERE user_id = ?', [userId]),
            pool.query("SELECT COUNT(*) as diseasesDetected FROM scan_history WHERE user_id = ? AND detection_result != 'Sehat'", [userId]),
            pool.query('SELECT AVG(accuracy) as averageAccuracy FROM scan_history WHERE user_id = ?', [userId]),
            pool.query('SELECT COUNT(*) as scansThisMonth FROM scan_history WHERE user_id = ? AND MONTH(scanned_at) = MONTH(CURRENT_DATE()) AND YEAR(scanned_at) = YEAR(CURRENT_DATE())', [userId])
        ];
        const results = await Promise.all(queries.map(p => p.then(res => res[0][0])));
        res.json({
            totalScans: results[0].totalScans,
            diseasesDetected: results[1].diseasesDetected,
            averageAccuracy: results[2].averageAccuracy || 0,
            scansThisMonth: results[3].scansThisMonth
        });
    } catch (error) {
        console.error('Error fetching stats:', error);
        res.status(500).json({ message: 'Gagal memuat statistik.' });
    }
});

// --- Start the Server ---
app.listen(PORT, () => {
    console.log(`Backend API is running on http://localhost:${PORT}`);
});