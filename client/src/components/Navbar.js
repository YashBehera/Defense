import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleNavigation = (href, e) => {
    e.preventDefault();
    
    // Handle navigation based on href
    switch(href) {
      case '/':
      case '/home':
        navigate('/');
        break;
      case '/products':
        navigate('/products');
        break;
      case '/news':
        navigate('/news');
        break;
      case '/about':
        navigate('/about');
        break;
      case '/contact':
        navigate('/contact');
        break;
      default:
        // Handle section navigation (for dropdown items)
        if (href.startsWith('#')) {
          // Navigate to products page with section hash
          navigate('/products' + href);
        }
    }
    
    // Scroll to top after navigation
    window.scrollTo(0, 0);
  };

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/products',label: 'PRODUCTS'},
    { href: '/news', label: 'NEWS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/contact', label: 'CONTACT' }
  ];

  // Highlight active nav item
  const isActiveLink = (href) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`sticky top-0 w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-gray-950/98 backdrop-blur-xl shadow-2xl py-3' 
          : 'bg-gradient-to-b from-black via-gray-950 to-gray-900 py-4'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center">
            {/* Logo Section - Also clickable to go home */}
            <div 
              className="flex items-center space-x-4 cursor-pointer"
              onClick={() => {
                navigate('/');
                window.scrollTo(0, 0);
              }}
            >
              {/* Professional Shield Logo */}
              <div className="relative group">
                <div className="w-14 h-14 relative">
                  {/* Outer Ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                  {/* Inner Shield */}
                  <div className="absolute inset-1 bg-black rounded-xl rotate-45 flex items-center justify-center">
                    <div className="rotate-[-45deg] flex items-center justify-center">
                      {/* Tricolor accent */}
                      <div className="flex flex-col space-y-0.5">
                        <div className="w-6 h-1 bg-orange-600"></div>
                        <div className="w-6 h-1 bg-white"></div>
                        <div className="w-6 h-1 bg-green-600"></div>
                      </div>
                    </div>
                  </div>
                  {/* Radar Animation */}
                  <div className="absolute inset-0 rounded-full border border-gray-700 animate-ping opacity-20"></div>
                </div>
              </div>
              
              <div className="border-l border-gray-800 pl-4">
                <h1 className="text-xl font-bold tracking-wider">
                  <span className="text-white">BHARATH</span>
                  <span className="text-gray-400 font-light ml-1">DEFENCE</span>
                </h1>
                <p className="text-[10px] text-gray-500 tracking-[0.3em] uppercase">
                  Aerospace & Defense Systems
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              <div className="flex items-center space-x-1">
                {navLinks.map((link) => (
                  <div 
                    key={link.href} 
                    className="relative"
                    onMouseEnter={() => setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleNavigation(link.href, e)}
                      className={`px-5 py-3 text-[13px] font-medium tracking-wider transition-all duration-300 flex items-center space-x-2 relative group ${
                        isActiveLink(link.href) 
                          ? 'text-white' 
                          : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover:rotate-180" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      )}
                      {/* Hover Line */}
                      <span className={`absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-orange-600 via-white to-green-600 transform transition-transform duration-300 ${
                        isActiveLink(link.href) 
                          ? 'scale-x-100' 
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}></span>
                    </a>
                    
                    {/* Professional Dropdown */}
                    {link.dropdown && activeDropdown === link.label && (
                      <div className="absolute left-0 mt-0 w-80 bg-gray-900 border border-gray-800 shadow-2xl transform transition-all duration-300">
                        <div className="p-1">
                          {link.dropdown.map((item, index) => (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={(e) => handleNavigation(item.href, e)}
                              className="block p-4 hover:bg-gray-800 transition-all duration-200 group"
                            >
                              <div className="flex items-start space-x-4">
                                <span className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity">
                                  {item.icon}
                                </span>
                                <div>
                                  <h3 className="text-white font-semibold text-sm tracking-wide">
                                    {item.label}
                                  </h3>
                                  <p className="text-gray-500 text-xs mt-1">
                                    {item.description}
                                  </p>
                                </div>
                              </div>
                              {index < link.dropdown.length - 1 && (
                                <div className="border-b border-gray-800 mt-4"></div>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* CTA Section */}
              <div className="ml-8 flex items-center space-x-4 border-l border-gray-800 pl-8">
                <button className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white p-2 focus:outline-none"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block w-full h-0.5 bg-white transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-y-0.5' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-full h-0.5 bg-white transition-all duration-300 origin-left ${isOpen ? '-rotate-45 -translate-y-0.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div className={`lg:hidden transition-all duration-500 ${
            isOpen ? 'max-h-screen opacity-100 mt-4' : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <div className="bg-gray-900 border border-gray-800 rounded-lg">
              {navLinks.map((link, index) => (
                <div key={link.href}>
                  <a
                    href={link.href}
                    className={`block px-6 py-4 text-sm font-medium tracking-wider transition-colors duration-200 ${
                      isActiveLink(link.href)
                        ? 'text-white bg-gray-800'
                        : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }`}
                    onClick={(e) => {
                      if (!link.dropdown) {
                        handleNavigation(link.href, e);
                        setIsOpen(false);
                      } else {
                        e.preventDefault();
                        // Toggle dropdown in mobile
                        setActiveDropdown(activeDropdown === link.label ? null : link.label);
                      }
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span>{link.label}</span>
                      {link.dropdown && (
                        <svg className={`w-4 h-4 transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                      )}
                    </div>
                  </a>
                  {link.dropdown && activeDropdown === link.label && (
                    <div className="bg-black/30">
                      {link.dropdown.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="block px-8 py-3 text-xs text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
                          onClick={(e) => {
                            handleNavigation(item.href, e);
                            setIsOpen(false);
                          }}
                        >
                          <span className="mr-2">{item.icon}</span>
                          {item.label}
                        </a>
                      ))}
                    </div>
                  )}
                  {index < navLinks.length - 1 && <div className="border-b border-gray-800"></div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Tech Line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
      </nav>
    </>
  );
};

export default Navbar;