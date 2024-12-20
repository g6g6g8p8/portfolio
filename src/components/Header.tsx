import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 right-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-site mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link 
            to="/" 
            className="text-xl font-medium text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            Giulio Pinotti
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                location.pathname === '/' ? 'font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                location.pathname === '/about' ? 'font-medium' : ''
              }`}
            >
              About
            </Link>
            <Link 
              to="/projects" 
              className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                location.pathname === '/projects' ? 'font-medium' : ''
              }`}
            >
              Projects
            </Link>
            <Link 
              to="/admin" 
              className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                location.pathname === '/admin' ? 'font-medium' : ''
              }`}
            >
              Admin
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                  location.pathname === '/' ? 'font-medium' : ''
                }`}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                  location.pathname === '/about' ? 'font-medium' : ''
                }`}
              >
                About
              </Link>
              <Link 
                to="/projects" 
                className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                  location.pathname === '/projects' ? 'font-medium' : ''
                }`}
              >
                Projects
              </Link>
              <Link 
                to="/admin" 
                className={`text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-300 ${
                  location.pathname === '/admin' ? 'font-medium' : ''
                }`}
              >
                Admin
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
