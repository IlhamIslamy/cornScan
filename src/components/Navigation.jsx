import React, { useState, useEffect } from 'react';
import { Leaf, Home, Info, Menu, X, User, BarChart2, FileClock, LogIn, UserPlus, LogOut, UserCircle } from 'lucide-react'; // 1. Import UserCircle
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Memeriksa status login setiap kali lokasi (halaman) berubah
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, [location]);

    // Mendefinisikan item menu berdasarkan status login
    const publicNavItems = [
        { path: '/', label: 'Beranda', icon: Home },
        { path: '/cornLeafScanner', label: 'Scanner', icon: Leaf },
        { path: '/team', label: 'Team', icon: User },
        { path: '/about', label: 'Tentang', icon: Info },
    ];

    // 2. Tambahkan item "Profil" ke daftar menu pribadi
    const privateNavItems = [
        { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
        { path: '/riwayat', label: 'Riwayat', icon: FileClock },
        { path: '/profile', label: 'Profil', icon: UserCircle }, 
    ];
    
    const authItems = [
        { path: '/login', label: 'Login', icon: LogIn },
        { path: '/register', label: 'Register', icon: UserPlus, isPrimary: true },
    ];

    // Menggabungkan item menu yang akan ditampilkan
    const navItemsToShow = isLoggedIn ? [...publicNavItems, ...privateNavItems] : publicNavItems;

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsLoggedIn(false);
        setIsMenuOpen(false); // Tutup menu mobile jika terbuka
        navigate('/login'); // Arahkan ke halaman login
    };

    const isActive = (path) => location.pathname === path;

    // Komponen kecil untuk Link agar tidak duplikasi kode
    const NavLink = ({ path, label, icon: Icon, isPrimary = false }) => (
        <Link
            to={path}
            onClick={() => setIsMenuOpen(false)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                isPrimary 
                ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
                : isActive(path)
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </Link>
    );

    // Komponen kecil untuk tombol Logout
    const LogoutButton = ({ isMobile = false }) => (
         <button
            onClick={handleLogout}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 text-gray-600 hover:text-red-600 hover:bg-red-50 w-full text-left ${isMobile ? 'space-x-3 px-4 py-3' : ''}`}
        >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
        </button>
    );

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-[#039b62]">
                        <Leaf className="w-8 h-8" />
                        <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
                            CornLeaf AI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {navItemsToShow.map(item => <NavLink key={item.path} {...item} />)}
                        
                        <div className="w-px h-6 bg-gray-200 mx-2"></div>

                        {isLoggedIn ? (
                           <LogoutButton />
                        ) : (
                           authItems.map(item => <NavLink key={item.path} {...item} />)
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pb-4 animate-in slide-in-from-top duration-200">
                        <div className="flex flex-col space-y-2 bg-gray-50 rounded-lg p-4">
                           {navItemsToShow.map(item => (
                                <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive(item.path) ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-600 hover:text-green-600 hover:bg-white'}`}>
                                    <item.icon className="w-5 h-5" />
                                    <span>{item.label}</span>
                                </Link>
                           ))}
                           <hr className="my-2" />
                           {isLoggedIn ? (
                                <LogoutButton isMobile={true} />
                           ) : (
                                authItems.map(item => (
                                    <Link key={item.path} to={item.path} onClick={() => setIsMenuOpen(false)} className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive(item.path) ? 'bg-green-100 text-green-700 shadow-sm' : 'text-gray-600 hover:text-green-600 hover:bg-white'}`}>
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))
                           )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;
