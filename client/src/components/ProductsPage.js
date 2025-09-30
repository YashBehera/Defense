import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

// Custom hook for document title and meta tags
const useDocumentMeta = ({ title, description }) => {
    useEffect(() => {
        // Update document title
        const previousTitle = document.title;
        document.title = title;

        // Update meta description
        const metaDescription = document.querySelector('meta[name="description"]');
        const previousDescription = metaDescription?.getAttribute('content');

        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        } else {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = description;
            document.head.appendChild(meta);
        }

        // Cleanup function
        return () => {
            document.title = previousTitle;
            if (metaDescription && previousDescription) {
                metaDescription.setAttribute('content', previousDescription);
            }
        };
    }, [title, description]);
};

// Constants
const ANIMATION_DURATION = 0.5;
const ANIMATION_DELAY = 0.1;

// Icon components
const ChevronRightIcon = () => (
    <svg className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
);

const CloseIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ShareIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a3 3 0 10-2.684 0m2.684 0a3 3 0 00-2.684 0M6.316 10.658a3 3 0 00-2.684 0" />
    </svg>
);

const DownloadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

const ZoomIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
);

// Tab component for content organization
const TabButton = ({ active, onClick, children, count }) => (
    <button
        onClick={onClick}
        className={`relative px-6 py-3 font-medium transition-all duration-300 ${active
            ? 'text-white'
            : 'text-gray-400 hover:text-white'
            }`}
    >
        {children}
        {count && (
            <span className="ml-2 text-xs opacity-60">({count})</span>
        )}
        {active && (
            <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-600 to-orange-500"
            />
        )}
    </button>
);

TabButton.propTypes = {
    active: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    count: PropTypes.number
};

// Image Gallery Component
const ImageGallery = ({ images, productName }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden group">
                {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-pulse bg-gray-800 w-full h-full" />
                    </div>
                )}
                <img
                    src={images[selectedImage]}
                    alt={`${productName} - View ${selectedImage + 1}`}
                    className={`w-full h-full object-cover transition-transform duration-500 ${isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                        }`}
                    onClick={() => setIsZoomed(!isZoomed)}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                        e.target.src = '/fallback-image.jpg';
                        setImageLoading(false);
                    }}
                />

                {/* Zoom indicator */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIcon />
                    <span className="text-xs text-white">Click to zoom</span>
                </div>

                {/* Image counter */}
                <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <span className="text-xs text-white">{selectedImage + 1} / {images.length}</span>
                </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
                <div className="flex space-x-2 overflow-x-auto pb-2">
                    {images.map((img, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedImage(idx)}
                            className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all ${selectedImage === idx
                                ? 'ring-2 ring-orange-500 ring-offset-2 ring-offset-gray-900'
                                : 'opacity-60 hover:opacity-100'
                                }`}
                        >
                            <img
                                src={img}
                                alt={`Thumbnail ${idx + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    productName: PropTypes.string.isRequired
};

// Product Card Component
const ProductCard = ({ product, index, onClick }) => (
    <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: ANIMATION_DURATION, delay: index * ANIMATION_DELAY }}
        viewport={{ once: true }}
        onClick={() => onClick(product)}
        className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-lg overflow-hidden cursor-pointer group hover:border-gray-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(product);
            }
        }}
        aria-label={`View details for ${product.name}`}
    >
        <div className="aspect-video bg-gray-900 overflow-hidden">
            <img
                src={product.image}
                alt={`${product.name} - ${product.model}`}
                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                    e.target.src = '/fallback-image.jpg';
                    e.target.alt = 'Product image unavailable';
                }}
            />
        </div>

        <div className="p-6">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                        {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">Model: {product.model}</p>
                </div>
                <span className="px-3 py-1 bg-green-900/50 text-green-400 text-xs rounded-full whitespace-nowrap">
                    OPERATIONAL
                </span>
            </div>

            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                {product.overview}
            </p>

            <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs text-gray-600">
                            • {feature}
                        </span>
                    ))}
                </div>
                <ChevronRightIcon />
            </div>
        </div>
    </motion.article>
);

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
};

// Enhanced Product Detail Modal
const ProductDetailModal = ({ product, onClose }) => {
    const [activeTab, setActiveTab] = useState('overview');
    const [showContactForm, setShowContactForm] = useState(false);
    const [copied, setCopied] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const modalRef = useRef(null);
    const touchStartY = useRef(null);

    // Multiple images for gallery
    const productImages = [
        product.image,
        '/api/placeholder/800/600',
        '/api/placeholder/800/600',
        '/api/placeholder/800/600'
    ];

    // Detect mobile device
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Lock body scroll
    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';

        // For iOS Safari
        const scrollY = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = '100%';

        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollY);
        };
    }, []);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyboard = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft' && selectedImageIndex > 0) {
                setSelectedImageIndex(prev => prev - 1);
            }
            if (e.key === 'ArrowRight' && selectedImageIndex < productImages.length - 1) {
                setSelectedImageIndex(prev => prev + 1);
            }
        };
        window.addEventListener('keydown', handleKeyboard);
        return () => window.removeEventListener('keydown', handleKeyboard);
    }, [onClose, selectedImageIndex, productImages.length]);

    // Touch handling for mobile swipe down to close
    const handleTouchStart = (e) => {
        touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        if (!touchStartY.current) return;

        const currentY = e.touches[0].clientY;
        const diff = currentY - touchStartY.current;

        // If swiped down more than 100px, close modal
        if (diff > 100 && window.scrollY === 0) {
            onClose();
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: product.name,
            text: product.overview,
            url: `${window.location.origin}/products/${product.id}`
        };

        try {
            if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.title}\n${shareData.text}\n${shareData.url}`);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleDownloadSpecs = () => {
        const specs = Object.entries(product.specifications)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');

        const content = `
${product.name}
Model: ${product.model}

TECHNICAL SPECIFICATIONS
${specs}

FEATURES
${product.features.join('\n• ')}

APPLICATIONS
${product.applications.join('\n• ')}

For more information, contact our sales team.
        `.trim();

        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${product.model}-specifications.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-3 md:space-y-4"
                    >
                        <div>
                            <h3 className="text-sm md:text-base font-semibold text-white mb-2 flex items-center">
                                <span className="w-0.5 h-4 bg-orange-500 mr-2 rounded-full" />
                                Overview
                            </h3>
                            <p className="text-gray-300 text-xs md:text-sm leading-relaxed">{product.overview}</p>
                        </div>

                        <div>
                            <h3 className="text-sm md:text-base font-semibold text-white mb-2 md:mb-3 flex items-center">
                                <span className="w-0.5 h-4 bg-orange-500 mr-2 rounded-full" />
                                Key Features
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {product.features.map((feature, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="flex items-start space-x-2 p-2 bg-gray-800/30 rounded"
                                    >
                                        <CheckIcon />
                                        <span className="text-xs text-gray-300">{feature}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="text-sm md:text-base font-semibold text-white mb-2 md:mb-3 flex items-center">
                                <span className="w-0.5 h-4 bg-orange-500 mr-2 rounded-full" />
                                Applications
                            </h3>
                            <div className="flex flex-wrap gap-1.5 md:gap-2">
                                {product.applications.map((app, idx) => (
                                    <span
                                        key={idx}
                                        className="px-2 md:px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-xs border border-gray-700"
                                    >
                                        {app}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                );

            case 'specifications':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="bg-gray-800/30 rounded-lg p-3 md:p-4 border border-gray-700">
                            <h3 className="text-sm md:text-base font-semibold text-white mb-3 flex items-center justify-between">
                                <span className="flex items-center">
                                    <span className="w-0.5 h-4 bg-orange-500 mr-2 rounded-full" />
                                    Technical Specifications
                                </span>
                                <button
                                    onClick={handleDownloadSpecs}
                                    className="text-xs text-orange-500 hover:text-orange-400 flex items-center space-x-1"
                                >
                                    <DownloadIcon />
                                    <span className="hidden sm:inline">Download</span>
                                </button>
                            </h3>
                            <dl className="space-y-1.5 md:space-y-2">
                                {Object.entries(product.specifications).map(([key, value], idx) => (
                                    <motion.div
                                        key={key}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: idx * 0.02 }}
                                        className="flex justify-between items-center py-1.5 border-b border-gray-700/50 last:border-0 text-xs md:text-sm"
                                    >
                                        <dt className="text-gray-400 pr-2">{key}</dt>
                                        <dd className="text-white font-medium text-right">{value}</dd>
                                    </motion.div>
                                ))}
                            </dl>
                        </div>
                    </motion.div>
                );

            case 'support':
                return (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3"
                    >
                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
                            <h4 className="font-semibold text-white text-xs md:text-sm mb-2 flex items-center">
                                <span className="w-5 md:w-6 h-5 md:h-6 bg-orange-500/20 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                    <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </span>
                                24/7 Support
                            </h4>
                            <p className="text-gray-400 text-xs mb-2">Round-the-clock assistance</p>
                            <button className="text-orange-500 hover:text-orange-400 text-xs font-medium">
                                Contact →
                            </button>
                        </div>

                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
                            <h4 className="font-semibold text-white text-xs md:text-sm mb-2 flex items-center">
                                <span className="w-5 md:w-6 h-5 md:h-6 bg-blue-500/20 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                    <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </span>
                                Documentation
                            </h4>
                            <p className="text-gray-400 text-xs mb-2">Comprehensive guides</p>
                            <button className="text-blue-500 hover:text-blue-400 text-xs font-medium">
                                View →
                            </button>
                        </div>

                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
                            <h4 className="font-semibold text-white text-xs md:text-sm mb-2 flex items-center">
                                <span className="w-5 md:w-6 h-5 md:h-6 bg-green-500/20 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                    <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </span>
                                Warranty
                            </h4>
                            <p className="text-gray-400 text-xs mb-2">2-year coverage</p>
                            <button className="text-green-500 hover:text-green-400 text-xs font-medium">
                                Details →
                            </button>
                        </div>

                        <div className="bg-gray-800/30 rounded-lg p-3 border border-gray-700">
                            <h4 className="font-semibold text-white text-xs md:text-sm mb-2 flex items-center">
                                <span className="w-5 md:w-6 h-5 md:h-6 bg-purple-500/20 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                                    <svg className="w-2.5 md:w-3 h-2.5 md:h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                                    </svg>
                                </span>
                                Training
                            </h4>
                            <p className="text-gray-400 text-xs mb-2">Professional programs</p>
                            <button className="text-purple-500 hover:text-purple-400 text-xs font-medium">
                                Learn →
                            </button>
                        </div>
                    </motion.div>
                );

            default:
                return null;
        }
    };

    const ContactForm = () => (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setShowContactForm(false)}
        >
            <motion.div
                className="bg-gray-900 border border-gray-800 rounded-lg max-w-md w-full p-4 md:p-6 max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="text-lg md:text-xl font-bold text-white mb-4">Request Information</h3>
                <form className="space-y-3" onSubmit={(e) => {
                    e.preventDefault();
                    console.log('Form submitted');
                    // Add your form submission logic here
                    setShowContactForm(false);
                }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Name *</label>
                            <input
                                type="text"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Email *</label>
                            <input
                                type="email"
                                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Organization</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                        <input
                            type="tel"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Message</label>
                        <textarea
                            rows={3}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                            placeholder={`I'm interested in the ${product.name}...`}
                        />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all text-sm"
                        >
                            Send Request
                        </button>
                        <button
                            type="button"
                            onClick={() => setShowContactForm(false)}
                            className="px-4 py-2 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all text-sm"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );

    // Mobile Layout
    if (isMobile) {
        return (
            <>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black z-50"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    {/* Mobile Header */}
                    <div className="sticky top-0 bg-gray-900 border-b border-gray-800 px-4 py-3 z-10">
                        <div className="flex justify-between items-center">
                            <div className="flex-1">
                                <h2 className="text-lg font-bold text-white">{product.name}</h2>
                                <p className="text-xs text-gray-500">Model: {product.model}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleShare}
                                    className="p-2 text-gray-400 hover:text-white"
                                    aria-label="Share"
                                >
                                    <ShareIcon />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-white"
                                    aria-label="Close"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Content */}
                    <div className="h-full overflow-y-auto pb-20">
                        {/* Image */}
                        <div className="relative aspect-video bg-gray-900">
                            <img
                                src={productImages[selectedImageIndex]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                                onLoad={() => setImageLoading(false)}
                                onError={(e) => {
                                    e.target.src = '/fallback-image.jpg';
                                    setImageLoading(false);
                                }}
                            />
                            {imageLoading && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="animate-pulse bg-gray-800 w-full h-full" />
                                </div>
                            )}
                        </div>

                        {/* Image Dots */}
                        <div className="flex justify-center gap-1.5 py-3">
                            {productImages.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImageIndex(idx)}
                                    className={`w-2 h-2 rounded-full transition-all ${selectedImageIndex === idx ? 'bg-orange-500 w-6' : 'bg-gray-600'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3 px-4 mb-4">
                            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                <p className="text-gray-400 text-xs">Range</p>
                                <p className="text-base font-bold text-white">
                                    {product.specifications['Operational Range'] || 'N/A'}
                                </p>
                            </div>
                            <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
                                <p className="text-gray-400 text-xs">Flight Time</p>
                                <p className="text-base font-bold text-white">
                                    {product.specifications['Flight Time'] || 'N/A'}
                                </p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="px-4">
                            <div className="flex border-b border-gray-800 mb-4">
                                {['overview', 'specifications', 'support'].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-2 text-sm font-medium capitalize transition-colors ${activeTab === tab
                                                ? 'text-white border-b-2 border-orange-500'
                                                : 'text-gray-400'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            {/* Tab Content */}
                            <div className="pb-4">
                                {renderTabContent()}
                            </div>
                        </div>
                    </div>

                    {/* Mobile CTA */}
                    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 p-4">
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowContactForm(true)}
                                className="px-4 py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg text-sm"
                            >
                                Contact Sales
                            </button>
                            <button
                                onClick={handleDownloadSpecs}
                                className="px-4 py-2.5 border border-gray-700 text-white font-semibold rounded-lg text-sm flex items-center justify-center gap-1"
                            >
                                <DownloadIcon />
                                <span>Specs</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* Contact Form Modal */}
                <AnimatePresence>
                    {showContactForm && <ContactForm />}
                </AnimatePresence>
            </>
        );
    }

    // Desktop/Tablet Layout
    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="bg-gray-900 border border-gray-800 rounded-xl w-full max-w-6xl shadow-2xl flex flex-col"
                    style={{ maxHeight: '90vh' }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Desktop Header */}
                    <div className="bg-gray-900 border-b border-gray-800 px-4 md:px-6 py-3 md:py-4 rounded-t-xl flex-shrink-0">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-xl md:text-2xl font-bold text-white">{product.name}</h2>
                                    <span className="px-2 py-0.5 bg-green-900/50 text-green-400 text-xs rounded-full">
                                        OPERATIONAL
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500">Model: {product.model}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleShare}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all relative"
                                    aria-label="Share product"
                                >
                                    <ShareIcon />
                                    {copied && (
                                        <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs bg-gray-800 text-white px-2 py-1 rounded whitespace-nowrap">
                                            Copied!
                                        </span>
                                    )}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-all"
                                    aria-label="Close modal"
                                >
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex space-x-4 mt-3 md:mt-4 -mb-px overflow-x-auto">
                            <TabButton
                                active={activeTab === 'overview'}
                                onClick={() => setActiveTab('overview')}
                            >
                                Overview
                            </TabButton>
                            <TabButton
                                active={activeTab === 'specifications'}
                                onClick={() => setActiveTab('specifications')}
                                count={Object.keys(product.specifications).length}
                            >
                                Specs
                            </TabButton>
                            <TabButton
                                active={activeTab === 'support'}
                                onClick={() => setActiveTab('support')}
                            >
                                Support
                            </TabButton>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden">
                        <div className="grid lg:grid-cols-2 gap-4 md:gap-6 h-full p-4 md:p-6">
                            {/* Left Column - Image Gallery */}
                            <div className="flex flex-col h-full">
                                <div className="flex-1 min-h-0">
                                    <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden h-full">
                                        {imageLoading && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="animate-pulse bg-gray-800 w-full h-full" />
                                            </div>
                                        )}
                                        <img
                                            src={productImages[selectedImageIndex]}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onLoad={() => setImageLoading(false)}
                                            onError={(e) => {
                                                e.target.src = '/fallback-image.jpg';
                                                setImageLoading(false);
                                            }}
                                        />
                                        {/* Image navigation arrows */}
                                        {productImages.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setSelectedImageIndex(Math.max(0, selectedImageIndex - 1))}
                                                    className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all ${selectedImageIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                    disabled={selectedImageIndex === 0}
                                                    aria-label="Previous image"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => setSelectedImageIndex(Math.min(productImages.length - 1, selectedImageIndex + 1))}
                                                    className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-all ${selectedImageIndex === productImages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                                                        }`}
                                                    disabled={selectedImageIndex === productImages.length - 1}
                                                    aria-label="Next image"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>

                                {/* Thumbnails */}
                                {productImages.length > 1 && (
                                    <div className="flex space-x-2 mt-3">
                                        {productImages.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedImageIndex(idx);
                                                    setImageLoading(true);
                                                }}
                                                className={`relative w-16 h-12 rounded overflow-hidden transition-all ${selectedImageIndex === idx
                                                        ? 'ring-2 ring-orange-500 opacity-100'
                                                        : 'opacity-60 hover:opacity-80'
                                                    }`}
                                                aria-label={`View image ${idx + 1}`}
                                            >
                                                <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-3 mt-4">
                                    <div className="bg-gray-800/30 rounded-lg p-2.5 md:p-3 border border-gray-700">
                                        <p className="text-gray-400 text-xs mb-1">Range</p>
                                        <p className="text-base md:text-lg font-bold text-white">
                                            {product.specifications['Operational Range'] || 'N/A'}
                                        </p>
                                    </div>
                                    <div className="bg-gray-800/30 rounded-lg p-2.5 md:p-3 border border-gray-700">
                                        <p className="text-gray-400 text-xs mb-1">Flight Time</p>
                                        <p className="text-base md:text-lg font-bold text-white">
                                            {product.specifications['Flight Time'] || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Tab Content */}
                            <div className="flex flex-col h-full">
                                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                                    {renderTabContent()}
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-800">
                                    <button
                                        onClick={() => setShowContactForm(true)}
                                        className="flex-1 px-4 py-2 md:py-2.5 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    >
                                        Contact Sales
                                    </button>
                                    <button
                                        onClick={handleDownloadSpecs}
                                        className="px-4 py-2 md:py-2.5 border border-gray-700 text-white font-semibold rounded-lg hover:bg-gray-800 transition-all text-sm flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                                    >
                                        <DownloadIcon />
                                        <span className="hidden sm:inline">Download</span>
                                        <span className="sm:hidden">Specs</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Contact Form Modal */}
            <AnimatePresence>
                {showContactForm && <ContactForm />}
            </AnimatePresence>

            {/* Custom Scrollbar Styles */}
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(31, 41, 55, 0.5);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(107, 114, 128, 0.5);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(107, 114, 128, 0.7);
                }
            `}</style>
        </>
    );
};

ProductDetailModal.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        model: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        overview: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        specifications: PropTypes.object.isRequired,
        features: PropTypes.arrayOf(PropTypes.string).isRequired,
        applications: PropTypes.arrayOf(PropTypes.string).isRequired,
        relatedProducts: PropTypes.arrayOf(PropTypes.object)
    }).isRequired,
    onClose: PropTypes.func.isRequired
};

// Main component
const ProductsPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Set page meta
    useDocumentMeta({
        title: 'Defense Systems - Advanced Autonomous Platforms',
        description: 'Explore our cutting-edge defense systems including kamikaze drones, surveillance platforms, and VTOL systems for modern warfare.'
    });

    // These would typically come from an API or context
    const categories = useMemo(() => [
        { id: 'all', label: 'All Systems', count: 4 },
        { id: 'kamikaze', label: 'Kamikaze Drones', count: 2 },
        { id: 'surveillance', label: 'Surveillance', count: 1 },
        { id: 'vtol', label: 'VTOL Systems', count: 1 }
    ], []);

    // Product data would typically come from an API
    const products = useMemo(() => [
        {
            id: 1,
            category: 'kamikaze',
            name: 'FPV Kamikaze Drone',
            model: 'BDK-X1',
            image: '/api/placeholder/800/600',
            overview: 'High-speed precision strike drone with AI-powered target acquisition',
            specifications: {
                'Maximum Speed': '180 km/h',
                'Operational Range': '50 km',
                'Flight Time': '45 minutes',
                'Payload Capacity': '5 kg',
                'Operating Altitude': '500-3000m',
                'Communication': 'Encrypted RF/4G/5G',
                'Navigation': 'GPS/GLONASS/INS',
                'Camera': '4K EO/IR Gimbal'
            },
            features: [
                'AI-powered autonomous targeting',
                'Man-in-the-loop capability',
                'All-weather operation',
                'Swarm coordination ready',
                'Low acoustic signature',
                'Anti-jamming technology'
            ],
            applications: [
                'Border surveillance',
                'Anti-terror operations',
                'Strategic strikes',
                'Force protection'
            ]
        },
        {
            id: 2,
            category: 'vtol',
            name: 'Long Range Fixed Wing VTOL',
            model: 'BDV-LR200',
            image: '/api/placeholder/800/600',
            overview: 'Hybrid VTOL platform combining vertical takeoff with fixed-wing efficiency',
            specifications: {
                'Maximum Speed': '150 km/h',
                'Operational Range': '500 km',
                'Flight Time': '12 hours',
                'Payload Capacity': '25 kg',
                'Operating Altitude': '6000m',
                'Communication': 'SATCOM/LOS',
                'Navigation': 'Triple Redundant',
                'Sensors': 'Multi-spectral Suite'
            },
            features: [
                'Vertical takeoff and landing',
                'Extended endurance',
                'Beyond visual range ops',
                'Real-time intelligence relay',
                'Modular payload system',
                'Autonomous mission planning'
            ],
            applications: [
                'Long-range reconnaissance',
                'Maritime patrol',
                'Pipeline monitoring',
                'Disaster assessment'
            ]
        },
        {
            id: 3,
            category: 'kamikaze',
            name: 'Fixed Wing Kamikaze',
            model: 'BDF-K100',
            image: '/api/placeholder/800/600',
            overview: 'Loitering munition with extended flight time and precision strike capability',
            specifications: {
                'Maximum Speed': '250 km/h',
                'Operational Range': '150 km',
                'Loiter Time': '2 hours',
                'Warhead': '10 kg HE',
                'Operating Altitude': '100-4000m',
                'Launch Method': 'Catapult/RATO',
                'Guidance': 'GPS/INS/Terminal',
                'CEP': '<5 meters'
            },
            features: [
                'Wave-off capability',
                'Multiple target engagement',
                'Low RCS design',
                'Network-centric warfare',
                'Fire-and-forget mode',
                'Battle damage assessment'
            ],
            applications: [
                'High-value target elimination',
                'SEAD operations',
                'Area denial',
                'Force multiplication'
            ]
        },
        {
            id: 4,
            category: 'surveillance',
            name: 'FPV Tiny Whoop Drone',
            model: 'BDT-MICRO',
            image: '/api/placeholder/800/600',
            overview: 'Micro reconnaissance drone for close-quarter and indoor operations',
            specifications: {
                'Dimensions': '65 x 65 x 30mm',
                'Weight': '25 grams',
                'Flight Time': '8 minutes',
                'Range': '500 meters',
                'Speed': '40 km/h',
                'Camera': '1080p/60fps',
                'Communication': '5.8GHz',
                'Battery': 'Quick-swap LiPo'
            },
            features: [
                'Ultra-compact design',
                'Silent operation',
                'Obstacle avoidance',
                'Low light capability',
                'Encrypted video feed',
                'Crash resistant'
            ],
            applications: [
                'Room clearing',
                'Hostage situations',
                'Urban warfare',
                'Covert surveillance'
            ]
        }
    ], []);

    // Memoized filtered products
    const filteredProducts = useMemo(() => {
        return selectedCategory === 'all'
            ? products
            : products.filter(p => p.category === selectedCategory);
    }, [selectedCategory, products]);

    // Handlers
    const handleCategoryChange = useCallback((categoryId) => {
        setSelectedCategory(categoryId);
    }, []);

    const handleProductSelect = useCallback((product) => {
        setSelectedProduct(product);
        // Track product view
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'view_item', {
                currency: 'USD',
                value: 0,
                items: [{
                    item_id: product.id,
                    item_name: product.name,
                    item_category: product.category,
                    item_variant: product.model
                }]
            });
        }
    }, []);

    const handleCloseModal = useCallback(() => {
        setSelectedProduct(null);
    }, []);

    // Simulate API call (remove in production)
    useEffect(() => {
        const loadProducts = async () => {
            setIsLoading(true);
            try {
                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));
                // In production, replace with actual API call
                // const response = await api.getProducts();
                // setProducts(response.data);
            } catch (err) {
                setError('Failed to load products. Please try again later.');
                console.error('Error loading products:', err);
            } finally {
                setIsLoading(false);
            }
        };

        loadProducts();
    }, []);

    // Handle URL state for direct product links
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');

        if (productId && products.length > 0) {
            const product = products.find(p => p.id === parseInt(productId));
            if (product) {
                setSelectedProduct(product);
            }
        }
    }, [products]);

    // Update URL when product is selected
    useEffect(() => {
        if (selectedProduct) {
            const newUrl = `${window.location.pathname}?product=${selectedProduct.id}`;
            window.history.pushState({ product: selectedProduct.id }, '', newUrl);
        } else {
            window.history.pushState({}, '', window.location.pathname);
        }
    }, [selectedProduct]);

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Error</h2>
                    <p className="text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
                    >
                        Reload Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center overflow-hidden" role="banner">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" aria-hidden="true"></div>
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                    poster="/video-poster.jpg"
                    aria-hidden="true"
                >
                    <source src="/drone-footage.mp4" type="video/mp4" />
                    <source src="/drone-footage.webm" type="video/webm" />
                </video>

                <div className="relative z-10 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4"
                    >
                        DEFENSE <span className="text-gray-500">SYSTEMS</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto"
                    >
                        Advanced Autonomous Platforms for Modern Defense
                    </motion.p>
                </div>
            </section>

            {/* Category Filter */}
            <section className="border-y border-gray-900 bg-gray-950/50 sticky top-0 z-40" aria-label="Product categories">
                <div className="container mx-auto px-6 py-6">
                    <nav
                        className="flex flex-wrap gap-3 justify-center"
                        role="navigation"
                        aria-label="Product category filter"
                    >
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                onClick={() => handleCategoryChange(category.id)}
                                className={`px-6 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black ${selectedCategory === category.id
                                    ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white'
                                    : 'bg-gray-900 text-gray-400 hover:text-white hover:bg-gray-800'
                                    }`}
                                aria-pressed={selectedCategory === category.id}
                                aria-label={`Show ${category.label} (${category.count} items)`}
                            >
                                {category.label}
                                <span className="ml-2 text-xs opacity-70">({category.count})</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </section>

            {/* Products Grid */}
            <main className="py-20">
                <div className="container mx-auto px-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                                <h2 className="text-2xl font-bold">
                                    {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.label}
                                </h2>
                                <div className="flex items-center gap-4">
                                    <p className="text-gray-400">
                                        Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                                    </p>
                                    {/* Sort/Filter Options */}
                                    <select
                                        className="bg-gray-900 border border-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                                        aria-label="Sort products"
                                    >
                                        <option value="name">Sort by Name</option>
                                        <option value="range">Sort by Range</option>
                                        <option value="speed">Sort by Speed</option>
                                    </select>
                                </div>
                            </div>

                            {filteredProducts.length === 0 ? (
                                <div className="text-center py-20">
                                    <p className="text-gray-400 text-lg mb-4">No products found in this category.</p>
                                    <button
                                        onClick={() => setSelectedCategory('all')}
                                        className="text-orange-500 hover:text-orange-400"
                                    >
                                        View all products
                                    </button>
                                </div>
                            ) : (
                                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {filteredProducts.map((product, index) => (
                                        <ProductCard
                                            key={product.id}
                                            product={product}
                                            index={index}
                                            onClick={handleProductSelect}
                                        />
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </main>

            {/* Product Detail Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDetailModal
                        product={selectedProduct}
                        onClose={handleCloseModal}
                    />
                )}
            </AnimatePresence>

            {/* CTA Section */}
            <section className="py-20 border-t border-gray-900 bg-gradient-to-br from-gray-900/50 to-black">
                <div className="container mx-auto px-6">
                    <motion.div
                        className="max-w-4xl mx-auto text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Ready to Enhance Your Defense Capabilities?
                        </h2>
                        <p className="text-gray-400 mb-8 text-lg">
                            Contact our experts to discuss your specific requirements and get a customized solution.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => console.log('Schedule consultation')}
                                className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded hover:from-orange-700 hover:to-orange-600 transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black transform hover:scale-105"
                            >
                                Schedule Consultation
                            </button>
                            <button
                                onClick={() => console.log('Download catalog')}
                                className="px-8 py-3 border border-gray-700 text-white font-semibold rounded hover:bg-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-black transform hover:scale-105"
                            >
                                Download Catalog
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Indicators */}
            <section className="py-12 border-t border-gray-900">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { value: '50+', label: 'Defense Contracts', icon: '🛡️' },
                            { value: '99.9%', label: 'Mission Success Rate', icon: '🎯' },
                            { value: '24/7', label: 'Technical Support', icon: '💬' },
                            { value: '15+', label: 'Years Experience', icon: '🏆' }
                        ].map((stat, idx) => (
                            <motion.div
                                key={idx}
                                className="text-center"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-4xl mb-3">{stat.icon}</div>
                                <h3 className="text-3xl font-bold text-orange-500 mb-2">{stat.value}</h3>
                                <p className="text-gray-400">{stat.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter Section */}
            <section className="py-16 bg-gray-900/50 border-t border-gray-800">
                <div className="container mx-auto px-6 max-w-4xl text-center">
                    <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
                    <p className="text-gray-400 mb-8">Get the latest updates on our defense systems and technologies</p>
                    <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                            type="submit"
                            className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-orange-600 transition-all"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </section>
        </div>
    );
};

export default ProductsPage;