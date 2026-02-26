import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player/youtube';
import { FaTimes } from 'react-icons/fa';
import { fetchMovieVideos } from '../services/api';

const TrailerModal = ({ movieId, onClose }) => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrailer = async () => {
      try {
        const videos = await fetchMovieVideos(movieId);
        // Find official trailer or first video
        const trailer = videos.find(
          (video) => video.type === 'Trailer' && video.site === 'YouTube'
        ) || videos.find((video) => video.site === 'YouTube');
        
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error('Error loading trailer:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTrailer();
  }, [movieId]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl mx-4 animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
          aria-label="Close modal"
        >
          <FaTimes className="text-3xl" />
        </button>

        {/* Video Player or Loading/Error State */}
        <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl">
          {loading ? (
            <div className="aspect-video flex items-center justify-center bg-netflix-gray">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-netflix-red"></div>
            </div>
          ) : trailerKey ? (
            <div className="aspect-video">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                width="100%"
                height="100%"
                playing
                controls
                config={{
                  youtube: {
                    playerVars: {
                      autoplay: 1,
                      modestbranding: 1,
                      rel: 0,
                    },
                  },
                }}
              />
            </div>
          ) : (
            <div className="aspect-video flex items-center justify-center bg-netflix-gray">
              <p className="text-white text-xl">No trailer available</p>
            </div>
          )}
        </div>

        {/* Glassmorphism effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-lg" />
      </div>
    </div>
  );
};

export default TrailerModal;
