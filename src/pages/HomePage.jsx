import { Leaf } from 'lucide-react';
const HomePage = () => (
    <div className="min-h-96 flex items-center justify-center">
        <div className="text-center">
            <div className="mb-8">
                <Leaf className="w-20 h-20 mx-auto text-[#039b62] mb-4 animate-pulse" />
                <h1 className="text-5xl font-bold text-gray-800 mb-4 text-[#039b62] bg-clip-text">
                    Selamat Datang
                </h1>
                <p className="text-xl text-gray-600 mb-8">Aplikasi deteksi daun jagung menggunakan AI</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Mulai Scanner
                    </button>
                    <button className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg font-medium transition-all duration-200">
                        Pelajari Lebih Lanjut
                    </button>
                </div>
            </div>
        </div>
    </div>
);

export default HomePage;