import { useState, useEffect } from 'react';
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { getBackdropUrl } from '../services/api';
import { useMovieContext } from '../context/MovieContext';
import TrailerModal from './TrailerModal';

const Hero = ({ movie }) => {
  const [showTrailer, setShowTrailer] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const isInList = isFavorite(movie?.id);

  useEffect(() => {
    setImageLoaded(false);
  }, [movie]);

  if (!movie) return null;

  const handleListToggle = () => {
    if (isInList) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <>
      <div className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        {/* Background Image with lazy loading */}
        <div className="absolute inset-0">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-netflix-gray skeleton" />
          )}
          <img
            src={getBackdropUrl(movie.backdrop_path)}
            alt={movie.title}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />
        </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-2xl space-y-4 md:space-y-6 animate-fade-in">
              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                {movie.title}
              </h1>

              {/* Rating & Release Year */}
              <div className="flex items-center space-x-4 text-sm md:text-base">
                <span className="text-green-500 font-semibold">
                  ⭐ {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-gray-300">
                  {new Date(movie.release_date).getFullYear()}
                </span>
              </div>

              {/* Overview */}
              <p className="text-sm md:text-lg text-gray-300 line-clamp-3 md:line-clamp-4 max-w-xl">
                {movie.overview}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => setShowTrailer(true)}
                  className="flex items-center space-x-2 bg-white text-black px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-200 transition-all transform hover:scale-105 font-semibold"
                >
                  <FaPlay />
                  <span>Play Trailer</span>
                </button>
                <button
                  onClick={handleListToggle}
                  className="flex items-center space-x-2 bg-gray-500/70 text-white px-6 md:px-8 py-2 md:py-3 rounded hover:bg-gray-500 transition-all transform hover:scale-105 font-semibold backdrop-blur-sm"
                >
                  {isInList ? <FaCheck /> : <FaPlus />}
                  <span>{isInList ? 'In My List' : 'Add to List'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {showTrailer && (
        <TrailerModal
          movieId={movie.id}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
};

export default Hero;
