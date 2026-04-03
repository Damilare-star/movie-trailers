import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay, FaPlus, FaCheck } from 'react-icons/fa';
import { getPosterUrl } from '../services/api';
import { useMovieContext } from '../context/MovieContext';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isInList = isFavorite(movie.id);

  const handleListToggle = (e) => {
    e.stopPropagation();
    if (isInList) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div
      className="relative group cursor-pointer w-full transition-all duration-300"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
    >
      {/* Movie Poster */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        {!imageLoaded && (
          <div className="w-full aspect-[2/3] bg-netflix-gray skeleton" />
        )}
        <img
          src={getPosterUrl(movie.poster_path)}
          alt={movie.title}
          className={`w-full aspect-[2/3] object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
            {/* Title */}
            <h3 className="text-white font-semibold text-sm md:text-base line-clamp-2">
              {movie.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center space-x-2 text-xs">
              <span className="text-green-500">⭐ {movie.vote_average?.toFixed(1)}</span>
              <span className="text-gray-300">
                {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleClick}
                className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors"
                title="View Details"
              >
                <FaPlay className="text-xs" />
              </button>
              <button
                onClick={handleListToggle}
                className="bg-gray-700/80 text-white p-2 rounded-full hover:bg-gray-600 transition-colors backdrop-blur-sm"
                title={isInList ? 'Remove from List' : 'Add to List'}
              >
                {isInList ? <FaCheck className="text-xs" /> : <FaPlus className="text-xs" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Tilt Effect (subtle) */}
      <style jsx>{`
        .group:hover {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default MovieCard;
