import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { searchMovies } from '../services/api';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';

const Search = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Debounced search
  const performSearch = useCallback(async (searchQuery, pageNum) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    try {
      setLoading(true);
      const data = await searchMovies(searchQuery, pageNum);
      
      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
      
      setHasMore(pageNum < data.total_pages);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setPage(1);
    setMovies([]);
    
    // Debounce search
    const timer = setTimeout(() => {
      performSearch(query, 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, performSearch]);

  const loadMore = () => {
    if (hasMore && !loading) {
      const nextPage = page + 1;
      setPage(nextPage);
      performSearch(query, nextPage);
    }
  };

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
        <h1 className="text-3xl md:text-4xl font-bold">
          {query ? `Search Results for "${query}"` : 'Search Movies'}
        </h1>
        {movies.length > 0 && (
          <p className="text-gray-400 mt-2">Found {movies.length} results</p>
        )}
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto">
        {loading && page === 1 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : movies.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-5 gap-y-8">
              {movies.map((movie) => (
                <div key={movie.id} className="flex flex-col">
                  <MovieCard movie={movie} />
                  <div className="mt-2 px-1">
                    <p className="text-white text-sm font-medium leading-snug line-clamp-2">{movie.title}</p>
                    {movie.release_date && (
                      <p className="text-gray-400 text-xs mt-0.5">{new Date(movie.release_date).getFullYear()}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={loadMore}
                  disabled={loading}
                  className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded transition-colors font-semibold disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More'}
                </button>
              </div>
            )}
          </>
        ) : query ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">No results found for "{query}"</p>
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl">Start typing to search for movies</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
