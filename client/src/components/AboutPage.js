import { motion } from 'framer-motion';

const AboutPage = () => {
    const milestones = [
        { year: '2018', event: 'Company Founded', description: 'Started with a vision to revolutionize Indian defense technology' },
        { year: '2019', event: 'First UAV Prototype', description: 'Successfully tested our first autonomous drone system' },
        { year: '2020', event: 'Defense Contract', description: 'Secured first major contract with Indian Armed Forces' },
        { year: '2021', event: 'R&D Expansion', description: 'Established advanced research facility in Bangalore' },
        { year: '2022', event: 'International Recognition', description: 'Awarded Best Defense Innovation at DefExpo' },
        { year: '2023', event: 'Production Scale-up', description: 'Launched mass production facility with 1000+ units capacity' }
    ];

    const leadership = [
        {
            name: 'Dr. Rajesh Kumar',
            position: 'Founder & CEO',
            image: '/api/placeholder/300/300',
            bio: 'Former DRDO scientist with 20+ years in aerospace',
            linkedin: '#'
        },
        {
            name: 'Col. Vikram Singh (Retd.)',
            position: 'Chief Defense Advisor',
            image: '/api/placeholder/300/300',
            bio: 'Ex-Indian Army with expertise in tactical operations',
            linkedin: '#'
        },
        {
            name: 'Dr. Priya Sharma',
            position: 'CTO',
            image: '/api/placeholder/300/300',
            bio: 'AI/ML expert from IIT Delhi, specializing in autonomous systems',
            linkedin: '#'
        },
        {
            name: 'Wing Cdr. Arun Patel (Retd.)',
            position: 'Head of Operations',
            image: '/api/placeholder/300/300',
            bio: 'Former IAF pilot with 15+ years of aerial operations experience',
            linkedin: '#'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black"></div>
                    <div className="absolute top-20 left-10 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-bold mb-6"
                    >
                        DEFENDING THE NATION'S
                        <span className="block text-transparent bg-gradient-to-r from-orange-500 to-green-500 bg-clip-text">
                            SOVEREIGNTY
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl text-gray-400 mb-8"
                    >
                        Pioneering indigenous defense technology for a self-reliant India
                    </motion.p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <div>
                                <h2 className="text-4xl font-bold mb-4">
                                    OUR <span className="text-gray-500">MISSION</span>
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    To develop and deliver cutting-edge autonomous defense systems that enhance
                                    India's strategic capabilities while maintaining the highest standards of
                                    reliability, innovation, and operational excellence.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-4xl font-bold mb-4">
                                    OUR <span className="text-gray-500">VISION</span>
                                </h2>
                                <p className="text-gray-400 text-lg">
                                    To be the leading indigenous defense technology company, making India
                                    self-reliant in critical defense systems and establishing our nation as
                                    a global leader in autonomous military platforms.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-8"
                        >
                            <h3 className="text-2xl font-bold mb-6">Core Values</h3>
                            <div className="space-y-4">
                                {[
                                    { icon: '🛡️', title: 'National Security First', desc: 'Unwavering commitment to India\'s defense' },
                                    { icon: '🚀', title: 'Innovation', desc: 'Pushing boundaries of technology' },
                                    { icon: '⚡', title: 'Excellence', desc: 'Zero compromise on quality and reliability' },
                                    { icon: '🤝', title: 'Integrity', desc: 'Transparent and ethical business practices' }
                                ].map((value, idx) => (
                                    <div key={idx} className="flex items-start space-x-4">
                                        <span className="text-2xl">{value.icon}</span>
                                        <div>
                                            <h4 className="text-white font-semibold">{value.title}</h4>
                                            <p className="text-gray-500 text-sm">{value.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Journey Timeline */}
            <section className="py-20 bg-gradient-to-b from-transparent via-gray-950 to-transparent">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        OUR <span className="text-gray-500">JOURNEY</span>
                    </motion.h2>

                    <div className="relative">
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-orange-600 via-white to-green-600"></div>

                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'
                                    }`}
                            >
                                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                                    <div className={`inline-block ${index % 2 === 0 ? 'text-right' : ''}`}>
                                        <span className="text-3xl font-bold text-orange-500">{milestone.year}</span>
                                        <h3 className="text-xl font-semibold mt-2 mb-2">{milestone.event}</h3>
                                        <p className="text-gray-400">{milestone.description}</p>
                                    </div>
                                </div>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full border-4 border-black"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl font-bold text-center mb-16"
                    >
                        LEADERSHIP <span className="text-gray-500">TEAM</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {leadership.map((leader, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg p-6 text-center"
                            >
                                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-800">
                                    <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-1">{leader.name}</h3>
                                <p className="text-orange-500 text-sm mb-3">{leader.position}</p>
                                <p className="text-gray-400 text-sm mb-4">{leader.bio}</p>
                                <a href={leader.linkedin} className="text-gray-500 hover:text-white transition-colors">
                                    <svg className="w-5 h-5 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 border-t border-gray-900">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold mb-8">
                        Join Us in Building India's Defense Future
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a href="#careers" className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold hover:from-orange-700 hover:to-orange-600 transition-all">
                            View Careers
                        </a>
                        <a href="/contact" className="px-8 py-3 border border-gray-700 text-white font-semibold hover:bg-gray-800 transition-all">
                            Partner With Us
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;