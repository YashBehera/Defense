// App.js
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProductsPage from './components/ProductsPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        {/* Global Footer */}
        <footer className="bg-gray-950 border-t border-gray-900 py-8">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <p className="text-gray-500 text-sm">
                  © 2024 Bharath Defence Systems. All rights reserved.
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  An ISO 9001:2015 Certified Company
                </p>
              </div>
              <div className="flex space-x-6 mt-4 lg:mt-0">
                <a href="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <a href="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
                <a href="/security" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Security
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;