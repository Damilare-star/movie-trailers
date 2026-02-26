import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6 animate-fade-in">
        {/* 404 Text */}
        <h1 className="text-9xl font-bold text-netflix-red">404</h1>
        
        {/* Message */}
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Lost in the Movies?
          </h2>
          <p className="text-gray-400 text-lg">
            The page you're looking for doesn't exist.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center justify-center space-x-2 bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded transition-all transform hover:scale-105 font-semibold"
          >
            <FaHome />
            <span>Go Home</span>
          </button>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center space-x-2 bg-gray-700 hover:bg-gray-600 text-white px-8 py-3 rounded transition-all transform hover:scale-105 font-semibold"
          >
            <span>Go Back</span>
          </button>
        </div>

        {/* Decorative Element */}
        <div className="pt-8">
          <p className="text-gray-600 text-sm">
            🎬 Maybe try searching for a movie instead?
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
