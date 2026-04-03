import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaImdb, FaInstagram, FaTwitter, FaBirthdayCake, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { fetchPersonDetails, getPosterUrl, getImageUrl } from '../services/api';
import MovieCard from '../components/MovieCard';

// Calculate age from birthday string
const calculateAge = (birthday, deathday = null) => {
  if (!birthday) return null;
  const end = deathday ? new Date(deathday) : new Date();
  const birth = new Date(birthday);
  let age = end.getFullYear() - birth.getFullYear();
  const m = end.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && end.getDate() < birth.getDate())) age--;
  return age;
};

// TMDB doesn't have awards data — we surface popularity + vote info as a proxy
const getDepartmentLabel = (dept) => {
  const map = {
    Acting: '🎭 Actor / Actress',
    Directing: '🎬 Director',
    Writing: '✍️ Writer',
    Production: '🎥 Producer',
    'Sound': '🎵 Sound',
    'Crew': '🛠️ Crew',
  };
  return map[dept] || dept;
};

const ActorProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bioExpanded, setBioExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState('movies'); // 'movies' | 'info'

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchPersonDetails(id);
        setPerson(data);
      } catch (err) {
        console.error('Error loading person:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-netflix-red" />
      </div>
    );
  }

  if (!person) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-xl">Person not found</p>
      </div>
    );
  }

  const age = calculateAge(person.birthday, person.deathday);

  // Sort movies by popularity, remove duplicates, filter out ones without posters
  const movies = person.movie_credits?.cast
    ? [...person.movie_credits.cast]
        .filter((m, i, arr) => arr.findIndex((x) => x.id === m.id) === i)
        .sort((a, b) => b.popularity - a.popularity)
    : [];

  // Top notable movies (high vote count = well-known)
  const notableMovies = movies.filter((m) => m.vote_count > 500).slice(0, 6);

  // Popularity tier label
  const popularityLabel = () => {
    if (person.popularity > 100) return { label: 'Global Superstar', color: 'text-yellow-400' };
    if (person.popularity > 50) return { label: 'Highly Popular', color: 'text-green-400' };
    if (person.popularity > 20) return { label: 'Well Known', color: 'text-blue-400' };
    return { label: 'Rising Star', color: 'text-gray-400' };
  };

  const { label: popLabel, color: popColor } = popularityLabel();

  const bio = person.biography || 'No biography available.';
  const bioShort = bio.length > 400 ? bio.slice(0, 400) + '...' : bio;

  const externalIds = person.external_ids || {};

  return (
    <div className="min-h-screen pt-20 pb-16 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors mb-6"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Profile Header */}
        <div className="flex flex-col md:flex-row gap-8 mb-10">
          {/* Photo */}
          <div className="flex-shrink-0">
            <img
              src={
                person.profile_path
                  ? getImageUrl(person.profile_path, 'w500')
                  : 'https://via.placeholder.com/300x450?text=No+Photo'
              }
              alt={person.name}
              className="w-48 md:w-64 rounded-xl shadow-2xl object-cover"
            />

            {/* Social Links */}
            <div className="flex items-center gap-4 mt-4">
              {externalIds.imdb_id && (
                <a
                  href={`https://www.imdb.com/name/${externalIds.imdb_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 text-2xl transition-colors"
                  title="IMDb"
                >
                  <FaImdb />
                </a>
              )}
              {externalIds.instagram_id && (
                <a
                  href={`https://instagram.com/${externalIds.instagram_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-300 text-2xl transition-colors"
                  title="Instagram"
                >
                  <FaInstagram />
                </a>
              )}
              {externalIds.twitter_id && (
                <a
                  href={`https://twitter.com/${externalIds.twitter_id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:text-sky-300 text-2xl transition-colors"
                  title="Twitter"
                >
                  <FaTwitter />
                </a>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-4">
            {/* Name & Department */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">{person.name}</h1>
              <p className="text-netflix-red font-semibold mt-1">
                {getDepartmentLabel(person.known_for_department)}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-4">
              {age !== null && (
                <div className="flex items-center space-x-2 bg-netflix-gray px-4 py-2 rounded-lg">
                  <FaBirthdayCake className="text-netflix-red" />
                  <div>
                    <p className="text-xs text-gray-400">Age</p>
                    <p className="font-bold text-white">
                      {age} years old
                      {person.deathday && <span className="text-gray-400 text-xs ml-1">(deceased)</span>}
                    </p>
                  </div>
                </div>
              )}

              {person.birthday && (
                <div className="flex items-center space-x-2 bg-netflix-gray px-4 py-2 rounded-lg">
                  <FaBirthdayCake className="text-gray-400" />
                  <div>
                    <p className="text-xs text-gray-400">Born</p>
                    <p className="font-bold text-white">
                      {new Date(person.birthday).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              )}

              {person.place_of_birth && (
                <div className="flex items-center space-x-2 bg-netflix-gray px-4 py-2 rounded-lg">
                  <FaMapMarkerAlt className="text-netflix-red" />
                  <div>
                    <p className="text-xs text-gray-400">Birthplace</p>
                    <p className="font-bold text-white text-sm">{person.place_of_birth}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2 bg-netflix-gray px-4 py-2 rounded-lg">
                <FaStar className="text-yellow-400" />
                <div>
                  <p className="text-xs text-gray-400">Popularity</p>
                  <p className={`font-bold ${popColor}`}>{popLabel}</p>
                </div>
              </div>
            </div>

            {/* Biography */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Biography</h2>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {bioExpanded ? bio : bioShort}
              </p>
              {bio.length > 400 && (
                <button
                  onClick={() => setBioExpanded(!bioExpanded)}
                  className="text-netflix-red hover:text-red-400 text-sm mt-2 transition-colors"
                >
                  {bioExpanded ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>

            {/* Notable Movies */}
            {notableMovies.length > 0 && (
              <div>
                <h2 className="text-lg font-semibold mb-2">Known For</h2>
                <div className="flex flex-wrap gap-2">
                  {notableMovies.map((m) => (
                    <span
                      key={m.id}
                      onClick={() => navigate(`/movie/${m.id}`)}
                      className="px-3 py-1 bg-netflix-gray hover:bg-netflix-red rounded-full text-sm cursor-pointer transition-colors"
                    >
                      {m.title}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Awards Note */}
        <div className="bg-netflix-gray/50 border border-gray-700 rounded-xl p-4 mb-8 flex items-start gap-3">
          <span className="text-2xl">🏆</span>
          <div>
            <p className="font-semibold text-white">Awards & Nominations</p>
            <p className="text-gray-400 text-sm mt-1">
              Detailed awards data (Oscars, Golden Globes, etc.) is not available via TMDB.
              Check their{' '}
              {externalIds.imdb_id ? (
                <a
                  href={`https://www.imdb.com/name/${externalIds.imdb_id}/awards`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  IMDb Awards page
                </a>
              ) : (
                <span className="text-yellow-400">IMDb profile</span>
              )}{' '}
              for full awards history.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 border-b border-gray-700 mb-6">
          <button
            onClick={() => setActiveTab('movies')}
            className={`pb-3 px-2 font-semibold transition-colors ${
              activeTab === 'movies'
                ? 'text-white border-b-2 border-netflix-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            All Movies ({movies.length})
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`pb-3 px-2 font-semibold transition-colors ${
              activeTab === 'info'
                ? 'text-white border-b-2 border-netflix-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Personal Info
          </button>
        </div>

        {/* Tab: All Movies */}
        {activeTab === 'movies' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
            {movies.length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-8">No movies found.</p>
            )}
          </div>
        )}

        {/* Tab: Personal Info */}
        {activeTab === 'info' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
            {[
              { label: 'Full Name', value: person.name },
              { label: 'Also Known As', value: person.also_known_as?.join(', ') || '—' },
              { label: 'Date of Birth', value: person.birthday ? new Date(person.birthday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
              { label: 'Age', value: age ? `${age} years old` : '—' },
              { label: 'Place of Birth', value: person.place_of_birth || '—' },
              { label: 'Date of Death', value: person.deathday ? new Date(person.deathday).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '—' },
              { label: 'Known For', value: getDepartmentLabel(person.known_for_department) },
              { label: 'Total Movies', value: movies.length ? `${movies.length} movies` : '—' },
              { label: 'Popularity Score', value: person.popularity?.toFixed(1) || '—' },
              { label: 'Gender', value: person.gender === 1 ? 'Female' : person.gender === 2 ? 'Male' : 'Not specified' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-netflix-gray/40 rounded-lg p-4">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">{label}</p>
                <p className="text-white font-semibold">{value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorProfile;
