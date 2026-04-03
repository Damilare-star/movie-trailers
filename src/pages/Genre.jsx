import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { fetchMoviesByGenre, fetchGenres } from '../services/api';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';

const Genre = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadGenreName = async () => {
      try {
        const genres = await fetchGenres();
        const genre = genres.find((g) => g.id === parseInt(id));
        if (genre) {
          setGenreName(genre.name);
        }
      } catch (error) {
        console.error('Error loading genre name:', error);
      }
    };

    loadGenreName();
    // Reset page to 1 when genre changes
    setPage(1);
    setMovies([]);
  }, [id]);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        const data = await fetchMoviesByGenre(id, page);
        
        if (page === 1) {
          setMovies(data.results);
        } else {
          setMovies((prev) => [...prev, ...data.results]);
        }
        
        setHasMore(page < data.total_pages);
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, [id, page]);

  const loadMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
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
        <h1 className="text-3xl md:text-4xl font-bold">{genreName} Movies</h1>
      </div>

      {/* Movies Grid */}
      <div className="max-w-7xl mx-auto">
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
          
          {loading &&
            Array.from({ length: 10 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>

        {/* Load More Button */}
        {hasMore && !loading && (
          <div className="flex justify-center mt-8">
            <button
              onClick={loadMore}
              className="bg-netflix-red hover:bg-red-700 text-white px-8 py-3 rounded transition-colors font-semibold"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Genre;
