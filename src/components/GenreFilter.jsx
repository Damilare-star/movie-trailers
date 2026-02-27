import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGenres } from '../services/api';

const GenreFilter = () => {
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error('Error loading genres:', error);
      }
    };
    loadGenres();
  }, []);

  const handleGenreClick = (genreId) => {
    navigate(`/genre/${genreId}`);
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mb-2 animate-fade-in">
      <h2 className="text-xl md:text-2xl font-bold mb-3">Browse by Genre</h2>
      <div className="flex flex-wrap gap-3">
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => handleGenreClick(genre.id)}
            className="px-4 py-2 bg-netflix-gray hover:bg-netflix-red text-white rounded-full transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
          >
            {genre.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
