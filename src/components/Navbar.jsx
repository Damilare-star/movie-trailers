import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-netflix-black/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-netflix-red text-3xl font-bold tracking-tight hover:scale-105 transition-transform">
              NETFLIX
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-white hover:text-gray-300 transition-colors">
              Home
            </Link>
            <Link to="/my-list" className="text-white hover:text-gray-300 transition-colors">
              My List
            </Link>
          </div>

          {/* Search & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search movies..."
                    className="bg-black/70 text-white px-4 py-2 rounded-l border border-white/30 focus:outline-none focus:border-netflix-red w-48 sm:w-64"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="bg-netflix-red px-4 py-2 rounded-r hover:bg-red-700 transition-colors"
                  >
                    <FaSearch />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="ml-2 text-white hover:text-gray-300"
                  >
                    <FaTimes />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-white hover:text-gray-300 text-xl transition-colors"
                >
                  <FaSearch />
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white text-xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-netflix-black/95 backdrop-blur-md py-4 space-y-4 animate-slide-up">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/my-list"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white hover:text-gray-300 transition-colors"
            >
              My List
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
