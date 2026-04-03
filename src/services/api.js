import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Image URL helpers
export const getImageUrl = (path, size = 'original') => {
  if (!path) return '/placeholder.jpg';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export const getPosterUrl = (path) => getImageUrl(path, 'w500');
export const getBackdropUrl = (path) => getImageUrl(path, 'original');

// Movie endpoints
export const fetchTrending = async (timeWindow = 'week') => {
  const response = await api.get(`/trending/movie/${timeWindow}`);
  return response.data.results;
};

export const fetchTopRated = async () => {
  const response = await api.get('/movie/top_rated');
  return response.data.results;
};

export const fetchPopular = async () => {
  const response = await api.get('/movie/popular');
  return response.data.results;
};

export const fetchUpcoming = async () => {
  const response = await api.get('/movie/upcoming');
  return response.data.results;
};

export const fetchNowPlaying = async () => {
  const response = await api.get('/movie/now_playing');
  return response.data.results;
};

// Movie details
export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'credits,videos',
    },
  });
  return response.data;
};

// Genres
export const fetchGenres = async () => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await api.get('/discover/movie', {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data;
};

// Search
export const searchMovies = async (query, page = 1) => {
  if (!query) return { results: [], total_pages: 0 };
  const response = await api.get('/search/movie', {
    params: {
      query,
      page,
    },
  });
  return response.data;
};

// Videos/Trailers
export const fetchMovieVideos = async (movieId) => {
  const response = await api.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

// Person/Actor endpoints
export const fetchPersonDetails = async (personId) => {
  const response = await api.get(`/person/${personId}`, {
    params: {
      append_to_response: 'movie_credits,external_ids',
    },
  });
  return response.data;
};

export default api;
