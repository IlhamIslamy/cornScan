import React from 'react';
import { Briefcase, Building } from 'lucide-react';

// --- Data Anggota Tim ---
// Mengembalikan path foto ke aset lokal.
const teamMembers = [
    {
        photo: '../assets/ygs.jpg',
        name: 'Wahyu Bagas Prastyo',
        role: 'Machine Learning',
        institution: 'Politeknik Negeri Jember',
    },
    {
        photo: '../assets/siti.jpg',
        name: 'Siti Septiyah Agustin',
        role: 'Machine Learning',
        institution: 'Politeknik Negeri Jember',
    },
    {
        photo: '../assets/eva.jpg',
        name: 'Eva Yuliana',
        role: 'Machine Learning',
        institution: 'Politeknik Negeri Jember',
    },
    {
        photo: '../assets/ilhm.jpg',
        name: 'Mohammad Ilham Islamy',
        role: 'Frontend Developer',
        institution: 'Politeknik Negeri Jember',
    },
    {
        photo: '../assets/frd.jpg',
        name: 'Farid Kurniawan',
        role: 'Frontend Developer & Backend Developer',
        institution: 'Politeknik Negeri Jember',
    },
    {
        photo: '../assets/reza.jpg',
        name: 'Muhammad Reza Fadlillah',
        role: 'Backend Developer',
        institution: 'Politeknik Negeri Jember',
    },
];

// --- Komponen Kartu Anggota Tim ---
// Didesain ulang agar sesuai dengan tema dashboard
const TeamCard = ({ photo, name, role, institution }) => (
    <div className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-200 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300">
        <img 
            src={photo} 
            alt={`Foto ${name}`}
            className="w-28 h-28 rounded-full object-cover shadow-md border-4 border-white"
            onError={(e) => { e.currentTarget.src = 'https://placehold.co/150x150/e0e0e0/ffffff?text=Error'; }} // Fallback jika gambar gagal dimuat
        />
        <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-800">{name}</h3>
            
            <div className="flex items-center justify-center sm:justify-start text-green-700 font-semibold mt-1">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{role}</span>
            </div>

            <div className="flex items-center justify-center sm:justify-start text-gray-500 text-sm mt-2">
                <Building className="w-4 h-4 mr-2" />
                <span>{institution}</span>
            </div>
        </div>
    </div>
);


// --- Komponen Halaman Tim ---
const TeamPage = () => {
    return (
        // Menggunakan container yang sama dengan dashboard untuk konsistensi
        <div className="flex-grow p-6 sm:p-8 bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
            <div className="max-w-6xl mx-auto">
                {/* Header Halaman */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl py-2 font-bold text-gray-800 mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                        Tim Kami
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Orang-orang hebat di balik pengembangan CornLeaf AI.
                    </p>
                </div>
                
                {/* Grid untuk Kartu Anggota Tim */}
                <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
                    {teamMembers.map((member, idx) => (
                        <TeamCard key={idx} {...member} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TeamPage;
