import { useEffect, useState } from 'react';
import Hero from '../components/Hero';
import MovieRow from '../components/MovieRow';
import GenreFilter from '../components/GenreFilter';
import ScrollProgress from '../components/ScrollProgress';
import {
  fetchTrending,
  fetchTopRated,
  fetchPopular,
  fetchUpcoming,
  fetchNowPlaying,
} from '../services/api';

const Home = () => {
  const [heroMovie, setHeroMovie] = useState(null);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        
        // Fetch all movie categories in parallel
        const [
          trendingData,
          topRatedData,
          popularData,
          upcomingData,
          nowPlayingData,
        ] = await Promise.all([
          fetchTrending(),
          fetchTopRated(),
          fetchPopular(),
          fetchUpcoming(),
          fetchNowPlaying(),
        ]);

        setTrending(trendingData);
        setTopRated(topRatedData);
        setPopular(popularData);
        setUpcoming(upcomingData);
        setNowPlaying(nowPlayingData);

        // Set random trending movie as hero
        if (trendingData.length > 0) {
          const randomIndex = Math.floor(Math.random() * Math.min(5, trendingData.length));
          setHeroMovie(trendingData[randomIndex]);
        }
      } catch (error) {
        console.error('Error loading movies:', error);
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      
      {/* Hero Section */}
      <Hero movie={heroMovie} />

      {/* Movie Rows - All sections with consistent closer spacing */}
      <div className="relative -mt-20 z-10 space-y-4">
        <MovieRow title="Trending Now" movies={trending} />
        <MovieRow title="Top Rated" movies={topRated} />
        <MovieRow title="Popular" movies={popular} />
        
        {/* Genre Filter */}
        <GenreFilter />
        
        <MovieRow title="Upcoming" movies={upcoming} />
        <MovieRow title="Now Playing" movies={nowPlaying} />
      </div>
    </div>
  );
};

export default Home;
