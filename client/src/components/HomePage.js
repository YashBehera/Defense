import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
    const [activeProduct, setActiveProduct] = useState(0);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const products = [
        {
            id: 1,
            title: "FPV Kamikaze Drones",
            subtitle: "Precision Strike Technology",
            description: "High-speed, first-person view drones designed for tactical precision strikes with minimal collateral damage.",
            image: "/api/placeholder/600/400",
            specs: [
                { label: "Range", value: "50+ km" },
                { label: "Speed", value: "180 km/h" },
                { label: "Payload", value: "5 kg" },
                { label: "Endurance", value: "45 min" }
            ],
            features: ["AI Target Recognition", "Encrypted Communication", "Night Vision", "EMP Resistant"]
        },
        {
            id: 2,
            title: "Long Range Fixed Wing VTOL",
            subtitle: "Strategic Surveillance Platform",
            description: "Vertical take-off and landing capability combined with fixed-wing efficiency for extended surveillance missions.",
            image: "/api/placeholder/600/400",
            specs: [
                { label: "Range", value: "500+ km" },
                { label: "Altitude", value: "6,000 m" },
                { label: "Endurance", value: "12 hours" },
                { label: "Payload", value: "25 kg" }
            ],
            features: ["VTOL Capability", "Autonomous Navigation", "Multi-Sensor Payload", "Real-time Data Link"]
        },
        {
            id: 3,
            title: "Fixed Wing Kamikaze",
            subtitle: "Loitering Munition System",
            description: "Advanced loitering munition with extended flight time for strategic target engagement.",
            image: "/api/placeholder/600/400",
            specs: [
                { label: "Range", value: "150 km" },
                { label: "Speed", value: "250 km/h" },
                { label: "Warhead", value: "10 kg" },
                { label: "Loiter Time", value: "2 hours" }
            ],
            features: ["Man-in-the-Loop", "Abort Capability", "Multi-Target", "Swarm Compatible"]
        },
        {
            id: 4,
            title: "FPV Tiny Whoop Drones",
            subtitle: "Indoor Reconnaissance",
            description: "Micro-sized drones for close-quarters reconnaissance and indoor tactical operations.",
            image: "/api/placeholder/600/400",
            specs: [
                { label: "Size", value: "65mm" },
                { label: "Weight", value: "25g" },
                { label: "Flight Time", value: "8 min" },
                { label: "Range", value: "500m" }
            ],
            features: ["Ultra Compact", "Silent Operation", "HD Video Feed", "Obstacle Avoidance"]
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">            
            {/* Background Grid Effect */}
            <div className="fixed inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1) 0%, transparent 50%)`,
                }}></div>
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center">
                {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-orange-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                <div className="relative z-10 text-center px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-6"
                    >
                        <span className="inline-block px-4 py-2 bg-gradient-to-r from-orange-600/20 to-green-600/20 border border-gray-800 rounded-full text-sm tracking-wider">
                            DEFENDING THE NATION'S SKIES
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-6xl md:text-8xl font-bold mb-6"
                    >
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            BHARATH
                        </span>
                        <br />
                        <span className="text-3xl md:text-5xl font-light text-gray-500">
                            DEFENCE SYSTEMS
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
                    >
                        Advanced Autonomous Aerial Systems for Modern Warfare
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="flex flex-wrap gap-4 justify-center"
                    >
                        <a href="#products" className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 transition-all duration-300 font-medium tracking-wider">
                            EXPLORE SYSTEMS
                        </a>
                        <a href="#capabilities" className="px-8 py-3 border border-gray-700 hover:border-gray-500 transition-all duration-300 font-medium tracking-wider">
                            CAPABILITIES
                        </a>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative py-20 border-y border-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: "500+", label: "Successful Deployments" },
                            { value: "99.8%", label: "Mission Success Rate" },
                            { value: "24/7", label: "Operational Support" },
                            { value: "50+", label: "Defense Partners" }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="text-center"
                            >
                                <h3 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text text-transparent">
                                    {stat.value}
                                </h3>
                                <p className="text-gray-500 text-sm mt-2">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section id="products" className="relative py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-bold mb-4">
                            DEFENSE <span className="text-gray-500">SYSTEMS</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Cutting-edge autonomous aerial platforms designed for modern asymmetric warfare
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Product Showcase */}
                        <div className="relative">
                            <div className="sticky top-32">
                                <motion.div
                                    key={activeProduct}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8"
                                >
                                    <div className="aspect-video bg-gray-900 rounded-lg mb-6 overflow-hidden relative group">
                                        <img
                                            src={products[activeProduct].image}
                                            alt={products[activeProduct].title}
                                            className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    </div>

                                    <h3 className="text-3xl font-bold mb-2">{products[activeProduct].title}</h3>
                                    <p className="text-orange-500 mb-4">{products[activeProduct].subtitle}</p>
                                    <p className="text-gray-400 mb-6">{products[activeProduct].description}</p>

                                    {/* Specifications */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {products[activeProduct].specs.map((spec, index) => (
                                            <div key={index} className="bg-black/50 border border-gray-800 rounded p-3">
                                                <p className="text-gray-500 text-xs">{spec.label}</p>
                                                <p className="text-xl font-bold text-white">{spec.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {products[activeProduct].features.map((feature, index) => (
                                            <span key={index} className="px-3 py-1 bg-gray-900 border border-gray-800 rounded-full text-xs text-gray-400">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Product List */}
                        <div className="space-y-4">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    onClick={() => setActiveProduct(index)}
                                    className={`cursor-pointer border rounded-lg p-6 transition-all duration-300 ${
                                        activeProduct === index
                                            ? 'bg-gradient-to-r from-orange-600/20 to-green-600/20 border-orange-600'
                                            : 'bg-gray-900/50 border-gray-800 hover:border-gray-700'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h4 className="text-xl font-semibold mb-1">{product.title}</h4>
                                            <p className="text-sm text-gray-500">{product.subtitle}</p>
                                        </div>
                                        <svg className={`w-6 h-6 transition-transform duration-300 ${activeProduct === index ? 'rotate-90 text-orange-500' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Technology Section */}
            <section className="relative py-20 bg-gradient-to-b from-transparent via-gray-950 to-transparent">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-bold mb-4">
                            ADVANCED <span className="text-gray-500">TECHNOLOGIES</span>
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Leveraging cutting-edge innovations for superior defense capabilities
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "🛰️",
                                title: "AI-Powered Autonomy",
                                description: "Advanced neural networks for real-time decision making and target identification"
                            },
                            {
                                icon: "🔐",
                                title: "Quantum Encryption",
                                description: "Military-grade quantum-resistant communication protocols for secure operations"
                            },
                            {
                                icon: "⚡",
                                title: "Swarm Intelligence",
                                description: "Coordinated multi-unit operations with distributed decision-making capabilities"
                            }
                        ].map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8 hover:border-gray-700 transition-all duration-300"
                            >
                                <div className="text-4xl mb-4">{tech.icon}</div>
                                <h3 className="text-xl font-semibold mb-3">{tech.title}</h3>
                                <p className="text-gray-400 text-sm">{tech.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Critical Features */}
            <section id="capabilities" className="relative py-20">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold mb-6">
                                MISSION-CRITICAL
                                <br />
                                <span className="text-gray-500">CAPABILITIES</span>
                            </h2>
                            <p className="text-gray-400 mb-8">
                                Our systems are designed to operate in the most challenging environments,
                                delivering consistent performance when it matters most.
                            </p>

                            <div className="space-y-6">
                                {[
                                    {
                                        title: "All-Weather Operations",
                                        description: "Operational in extreme weather conditions from -40°C to +60°C"
                                    },
                                    {
                                        title: "Electronic Warfare Resistant",
                                        description: "Advanced frequency hopping and anti-jamming capabilities"
                                    },
                                    {
                                        title: "Real-time Intelligence",
                                        description: "Live HD video feed with AI-powered threat detection"
                                    },
                                    {
                                        title: "Rapid Deployment",
                                        description: "From storage to operational in under 5 minutes"
                                    }
                                ].map((capability, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        className="flex items-start space-x-4"
                                    >
                                        <div className="w-2 h-2 bg-gradient-to-r from-orange-500 to-green-500 rounded-full mt-2"></div>
                                        <div>
                                            <h4 className="text-white font-semibold mb-1">{capability.title}</h4>
                                            <p className="text-gray-500 text-sm">{capability.description}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="aspect-square bg-gradient-to-br from-gray-900 to-black rounded-lg border border-gray-800 p-8">
                                <div className="w-full h-full bg-gray-900 rounded-lg relative overflow-hidden">
                                    {/* Animated Radar Display */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative w-64 h-64">
                                            {[...Array(4)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute inset-0 border border-green-500/20 rounded-full"
                                                    style={{ transform: `scale(${1 - i * 0.25})` }}
                                                ></div>
                                            ))}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                            </div>
                                            <div className="absolute inset-0 animate-spin-slow">
                                                <div className="h-full w-0.5 bg-gradient-to-b from-green-500 to-transparent mx-auto"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 to-green-600/10"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            READY TO SECURE YOUR
                            <span className="block text-transparent bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text">
                                AIRSPACE?
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-8">
                            Contact our defense specialists for a confidential consultation
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <a href="#contact" className="px-8 py-3 bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-300">
                                REQUEST DEMONSTR disapproval
                            </a>
                            <a href="#download" className="px-8 py-3 border border-white hover:bg-white hover:text-black font-semibold transition-all duration-300">
                                DOWNLOAD BROCHURE
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Partners Section */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <p className="text-gray-500 text-sm tracking-wider mb-4">TRUSTED BY</p>
                        <div className="flex flex-wrap items-center justify-center gap-12 opacity-50">
                            {["INDIAN ARMY", "INDIAN NAVY", "INDIAN AIR FORCE", "DRDO", "HAL", "BDL"].map((partner, index) => (
                                <div key={index} className="text-gray-400 font-semibold tracking-wider">
                                    {partner}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;