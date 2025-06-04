import React, { useState } from 'react';

import { Leaf, Home, Info, Menu, X, History } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = ({ currentPage, setCurrentPage }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'Beranda', icon: Home },
        { path: '/cornLeafScanner', label: 'Scanner', icon: Leaf },
        { path: '/about', label: 'Tentang', icon: Info },
    ];

    const isActive = (id) => currentPage === id;

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-[#039b62]">
                        <Leaf className="w-8 h-8" />
                        <span className="bg-[#039b62] bg-clip-text text-transparent">
                            CornLeaf AI
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${isActive(path)
                                    ? 'bg-green-100 text-green-700 shadow-sm'
                                    : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{label}</span>
                            </Link>
                        ))}
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
                            {navItems.map(({ path, label, icon: Icon }) => (
                                <Link
                                    key={path}
                                    to={path}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive(path)
                                        ? 'bg-green-100 text-green-700 shadow-sm'
                                        : 'text-gray-600 hover:text-green-600 hover:bg-white'
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    <span>{label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navigation;