import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useMovieContext } from '../context/MovieContext';
import MovieCard from '../components/MovieCard';

const MyList = () => {
  const navigate = useNavigate();
  const { favorites } = useMovieContext();

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors mb-4"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-bold">My List</h1>
        {favorites.length > 0 && (
          <p className="text-gray-400 mt-2">{favorites.length} movies in your list</p>
        )}
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl mb-4">Your list is empty</p>
            <button
              onClick={() => navigate('/')}
              className="bg-netflix-red hover:bg-red-700 text-white px-6 py-3 rounded transition-colors font-semibold"
            >
              Browse Movies
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
