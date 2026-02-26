import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaPlay, FaStar, FaClock, FaCalendar, FaPlus, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { fetchMovieDetails, getBackdropUrl, getPosterUrl } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import TrailerModal from '../components/TrailerModal';
import MovieRow from '../components/MovieRow';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [similarMovies, setSimilarMovies] = useState([]);
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();

  const isInList = movie ? isFavorite(movie.id) : false;

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
        
        // Get similar movies (you can add this endpoint to api.js)
        // For now, we'll skip it or you can implement it
      } catch (error) {
        console.error('Error loading movie:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovie();
  }, [id]);

  const handleListToggle = () => {
    if (isInList) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Movie not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[80vh] w-full overflow-hidden">
        {/* Background */}
        <img
          src={getBackdropUrl(movie.backdrop_path)}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-20 left-4 md:left-8 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full backdrop-blur-sm transition-all z-10"
        >
          <FaArrowLeft />
        </button>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Poster */}
              <img
                src={getPosterUrl(movie.poster_path)}
                alt={movie.title}
                className="w-48 md:w-64 rounded-lg shadow-2xl hidden md:block"
              />

              {/* Info */}
              <div className="flex-1 space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm md:text-base">
                  <span className="flex items-center space-x-2 text-green-500 font-semibold">
                    <FaStar />
                    <span>{movie.vote_average?.toFixed(1)}/10</span>
                  </span>
                  <span className="flex items-center space-x-2">
                    <FaCalendar />
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                  </span>
                  {movie.runtime && (
                    <span className="flex items-center space-x-2">
                      <FaClock />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </span>
                  )}
                </div>

                {/* Genres */}
                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-3 py-1 bg-netflix-gray rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>

                {/* Overview */}
                <p className="text-gray-300 text-base md:text-lg max-w-3xl">
                  {movie.overview}
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="flex items-center space-x-2 bg-white text-black px-6 py-3 rounded hover:bg-gray-200 transition-all transform hover:scale-105 font-semibold"
                  >
                    <FaPlay />
                    <span>Play Trailer</span>
                  </button>
                  <button
                    onClick={handleListToggle}
                    className="flex items-center space-x-2 bg-gray-500/70 text-white px-6 py-3 rounded hover:bg-gray-500 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm"
                  >
                    {isInList ? <FaCheck /> : <FaPlus />}
                    <span>{isInList ? 'In My List' : 'Add to List'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {movie.credits?.cast && movie.credits.cast.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold mb-6">Cast</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {movie.credits.cast.slice(0, 12).map((person) => (
              <div key={person.id} className="text-center">
                <img
                  src={
                    person.profile_path
                      ? getPosterUrl(person.profile_path)
                      : 'https://via.placeholder.com/200x300?text=No+Image'
                  }
                  alt={person.name}
                  className="w-full aspect-[2/3] object-cover rounded-lg mb-2"
                />
                <p className="text-white font-semibold text-sm">{person.name}</p>
                <p className="text-gray-400 text-xs">{person.character}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trailer Modal */}
      {showTrailer && (
        <TrailerModal movieId={movie.id} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  );
};

export default MovieDetails;
