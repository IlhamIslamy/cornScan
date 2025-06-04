import { Camera } from "lucide-react";

const AboutPage = () => (
    <div className="min-h-96 py-12 px-6">
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-5xl py-2 font-bold text-gray-800 mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                    Tentang CornLeaf AI
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-blue-500 mx-auto mb-8"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Teknologi Terdepan</h2>
                    <p className="text-gray-600 leading-relaxed mb-6">
                        Aplikasi ini menggunakan teknologi machine learning dan computer vision terdepan untuk mendeteksi
                        berbagai penyakit pada daun jagung dengan akurasi tinggi.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-gray-700">Deteksi real-time</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span className="text-gray-700">Akurasi tinggi 95%+</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                            <span className="text-gray-700">Interface yang mudah digunakan</span>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-br from-green-100 to-blue-100 p-8 rounded-2xl">
                    <Camera className="w-16 h-16 text-green-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Cara Kerja</h3>
                    <p className="text-gray-600">
                        Cukup upload foto daun jagung, AI kami akan menganalisis dan memberikan
                        diagnosis serta rekomendasi perawatan dalam hitungan detik.
                    </p>
                </div>
            </div>
        </div>
    </div>
);

export default AboutPage;