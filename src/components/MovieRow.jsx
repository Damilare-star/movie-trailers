import { useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import MovieCard from './MovieCard';

const MovieRow = ({ title, movies }) => {
  const rowRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      
      // Update arrow visibility after scroll
      setTimeout(() => {
        checkArrows();
      }, 300);
    }
  };

  const checkArrows = () => {
    if (rowRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = rowRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="relative group mb-2 animate-fade-in">
      {/* Title */}
      <h2 className="text-xl md:text-2xl font-bold mb-3 px-4 sm:px-6 lg:px-8">
        {title}
      </h2>

      {/* Scroll Container */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        {/* Left Arrow */}
        {showLeftArrow && (
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-r-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="text-2xl" />
          </button>
        )}

        {/* Right Arrow */}
        {showRightArrow && (
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white p-3 rounded-l-lg opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <FaChevronRight className="text-2xl" />
          </button>
        )}

        {/* Movies Container */}
        <div
          ref={rowRef}
          onScroll={checkArrows}
          className="flex space-x-3 md:space-x-4 overflow-x-scroll scrollbar-hide scroll-smooth"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="flex-shrink-0 w-[150px] sm:w-[180px] md:w-[200px]">
              <MovieCard movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default MovieRow;
