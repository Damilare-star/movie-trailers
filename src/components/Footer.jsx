import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-netflix-black border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-netflix-red text-xl font-bold mb-4">NETFLIX</h3>
            <p className="text-gray-400 text-sm">
              A modern movie browsing app built with React, Vite, and TMDB API.
              Discover trending movies, watch trailers, and create your personal watchlist.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/my-list" className="hover:text-white transition-colors">
                  My List
                </a>
              </li>
              <li>
                <a
                  href="https://www.themoviedb.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TMDB API
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-2xl"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p className="flex items-center justify-center space-x-2">
            <span>Made with</span>
            <FaHeart className="text-netflix-red" />
            <span>using React & TMDB API</span>
          </p>
          <p className="mt-2">© {new Date().getFullYear()} Netflix Movie App. Educational Project.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
