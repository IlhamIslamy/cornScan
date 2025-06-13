// config.js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ENDPOINTS = {
    login: `${API_BASE_URL}/api/login`,
    register: `${API_BASE_URL}/api/register`,
    forgotPassword: `${API_BASE_URL}/api/forgot-password`,
    resetPassword: `${API_BASE_URL}/api/reset-password`,
    profile: `${API_BASE_URL}/api/profile`,
    profileDetails: `${API_BASE_URL}/api/profile/details`, // NEW: For updating full_name and profile_picture
    profilePassword: `${API_BASE_URL}/api/profile/password`, // Existing: For updating password
    history: `${API_BASE_URL}/api/history`,
    historyItem: (id) => `${API_BASE_URL}/api/history/${id}`,
    historySave: `${API_BASE_URL}/api/history/save`,
    stats: `${API_BASE_URL}/api/stats`,
};