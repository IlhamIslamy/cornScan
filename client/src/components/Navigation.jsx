import React, { useState, useEffect } from 'react';
import {
  Leaf, Home, Info, Menu, X, User, BarChart2,
  FileClock, LogIn, UserPlus, LogOut, UserCircle
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Effect to check login status whenever the location changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  // Public navigation items accessible to everyone
  const publicNavItems = [
    { path: '/', label: 'Beranda', icon: Home },
    { path: '/cornLeafScanner', label: 'Scanner', icon: Leaf },
    { path: '/team', label: 'Team', icon: User },
    { path: '/about', label: 'Tentang', icon: Info },
  ];

  // Private navigation items only for logged-in users
  const privateNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart2 },
    { path: '/riwayat', label: 'Riwayat', icon: FileClock },
    { path: '/profile', label: 'Profil', icon: UserCircle },
  ];

  // Authentication related items for non-logged-in users
  const authItems = [
    { path: '/login', label: 'Login', icon: LogIn },
    { path: '/register', label: 'Register', icon: UserPlus, isPrimary: true }, // Highlight register button
  ];

  // Determine which navigation items to show based on login status
  const navItemsToShow = isLoggedIn ? [...publicNavItems, ...privateNavItems] : publicNavItems;

  // Handles user logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsMenuOpen(false); // Close mobile menu on logout
    navigate('/login'); // Redirect to login page
  };

  // Helper function to check if a link is active
  const isActive = (path) => location.pathname === path;

  // Reusable NavLink component for both desktop and mobile
  const NavLink = ({ path, label, icon: Icon, isPrimary = false, isMobileLink = false }) => (
    <Link
      to={path}
      onClick={() => setIsMenuOpen(false)}
      className={`flex items-center space-x-2 rounded-lg font-medium transition duration-200
        ${isMobileLink ? 'px-4 py-3' : 'px-4 py-2'}
        ${isPrimary
          ? 'bg-green-600 text-white hover:bg-green-700 shadow-md'
          : isActive(path)
            ? 'bg-green-100 text-green-700 shadow-sm'
            : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
        }
      `}
    >
      <Icon className="w-5 h-5" />
      <span>{label}</span>
    </Link>
  );

  // Reusable LogoutButton component
  const LogoutButton = ({ isMobile = false }) => (
    <button
      onClick={handleLogout}
      className={`flex items-center w-full rounded-lg font-medium transition duration-200
        ${isMobile ? 'px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50' : 'px-3 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50'}
      `}
    >
      <LogOut className="w-5 h-5" />
      <span>Logout</span>
    </button>
  );

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-[#039b62]">
            <Leaf className="w-7 h-7" />
            <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent">
              CornLeaf AI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItemsToShow.map(item => (
              <NavLink key={item.path} {...item} />
            ))}

            <div className="h-6 border-l border-gray-200 mx-2" aria-hidden="true"></div>

            {isLoggedIn ? (
              <LogoutButton />
            ) : (
              authItems.map(item => <NavLink key={item.path} {...item} />)
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 transition"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu (Conditionally rendered) */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-gray-50 px-4 pb-4 overflow-hidden
                     animate-in slide-in-from-top fade-in duration-200 ease-out-quart
                     rounded-b-lg shadow-inner"
        >
          <div className="flex flex-col space-y-2 pt-2 pb-4">
            {navItemsToShow.map(item => (
              <NavLink key={item.path} {...item} isMobileLink={true} />
            ))}

            <hr className="my-2 border-gray-200" />

            {isLoggedIn ? (
              <LogoutButton isMobile={true} />
            ) : (
              authItems.map(item => (
                <NavLink key={item.path} {...item} isMobileLink={true} />
              ))
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;