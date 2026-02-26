# 🎬 Netflix Movie App

A modern, Netflix-inspired movie browsing application built with React, Vite, Tailwind CSS, and The Movie Database (TMDB) API.

![Netflix Movie App](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-5.0.8-purple)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.3.6-cyan)

## ✨ Features

### 🏠 Homepage
- **Hero Banner** with featured movie backdrop, title, overview, and action buttons
- **Multiple Movie Rows**: Trending, Top Rated, Popular, Upcoming, Now Playing
- **Horizontal Scrolling** with smooth animations
- **Genre Filter** for easy browsing

### 🎥 Trailer System
- Click "Play Trailer" to open a glassmorphism modal
- Fetches official trailers from TMDB
- Embedded YouTube player with React Player
- Close on background click or ESC key

### 🎭 Genre System
- Browse movies by genre
- Dynamic genre filtering
- Dedicated genre pages with infinite scroll

### 📄 Movie Details Page
- Large backdrop and poster
- Complete movie information (title, rating, release date, runtime, genres)
- Cast list with photos
- Trailer playback
- Add to favorites

### 🔍 Search Functionality
- Live search with debouncing
- Search results page
- Infinite scroll for results

### ❤️ My List Feature
- Add/remove movies from favorites
- Persistent storage with localStorage
- Dedicated "My List" page

### 🎨 Design & Animations
- Dark Netflix-inspired theme
- Smooth hover effects and transitions
- Horizontal scrolling movie rows
- Blur gradient overlays
- Glassmorphism modal design
- Sticky navbar with scroll effect
- Loading skeleton animations
- Scroll progress indicator
- 3D hover tilt effects on cards
- Fade-in and slide-up animations

### 📱 Responsive Design
- Mobile-friendly
- Tablet optimized
- Desktop enhanced
- Adaptive layouts

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps

1. **Clone or download the project**
   ```bash
   cd netflix-movie-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   The `.env` file is already created with your API key:
   ```
   VITE_TMDB_API_KEY=f7ab8b2f3ed2e9d96f0e439550c967cb
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Player** - YouTube video player
- **React Icons** - Icon library
- **TMDB API** - Movie database

## 📁 Project Structure

```
netflix-movie-app/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx           # Navigation with search
│   │   ├── Hero.jsx             # Hero banner component
│   │   ├── MovieRow.jsx         # Horizontal scrolling row
│   │   ├── MovieCard.jsx        # Individual movie card
│   │   ├── GenreFilter.jsx      # Genre selection
│   │   ├── TrailerModal.jsx     # Video player modal
│   │   ├── Footer.jsx           # Footer component
│   │   ├── ScrollProgress.jsx   # Scroll indicator
│   │   ├── SkeletonCard.jsx     # Loading skeleton
│   │   └── LoadingSpinner.jsx   # Loading spinner
│   ├── pages/
│   │   ├── Home.jsx             # Homepage
│   │   ├── MovieDetails.jsx     # Movie details page
│   │   ├── Genre.jsx            # Genre filter page
│   │   ├── Search.jsx           # Search results page
│   │   ├── MyList.jsx           # Favorites page
│   │   └── NotFound.jsx         # 404 page
│   ├── context/
│   │   └── MovieContext.jsx     # Global state management
│   ├── services/
│   │   └── api.js               # API calls centralized
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # Entry point
│   └── index.css                # Global styles
├── .env                         # Environment variables
├── tailwind.config.js           # Tailwind configuration
├── vite.config.js               # Vite configuration
└── package.json                 # Dependencies
```

## 🎯 Key Features Implemented

✅ Netflix-inspired dark theme  
✅ Smooth animations and transitions  
✅ Horizontal scrolling movie rows  
✅ Hero banner with backdrop  
✅ Trailer modal with YouTube player  
✅ Genre filtering system  
✅ Movie details page with cast  
✅ Search with debouncing  
✅ My List feature with localStorage  
✅ Responsive design (mobile/tablet/desktop)  
✅ Loading skeletons  
✅ Scroll progress indicator  
✅ 3D hover effects  
✅ Custom 404 page  
✅ Lazy loading images  
✅ Code splitting with React.lazy  
✅ Sticky navbar with blur effect  
✅ Star ratings display  
✅ Infinite scroll on genre/search pages  

## 🎨 Design Highlights

- **Cinematic Typography**: Large, bold hero text
- **Glassmorphism**: Modern modal design with backdrop blur
- **Smooth Transitions**: Page transitions and hover effects
- **Netflix Color Scheme**: Red (#E50914) and Black (#141414)
- **Gradient Overlays**: Beautiful backdrop gradients
- **Card Animations**: Scale and hover effects

## 🔑 API Integration

All API calls are centralized in `src/services/api.js`:

- `fetchTrending()` - Get trending movies
- `fetchTopRated()` - Get top rated movies
- `fetchPopular()` - Get popular movies
- `fetchUpcoming()` - Get upcoming movies
- `fetchNowPlaying()` - Get now playing movies
- `fetchMovieDetails(id)` - Get movie details with cast and videos
- `fetchGenres()` - Get all genres
- `fetchMoviesByGenre(id)` - Get movies by genre
- `searchMovies(query)` - Search movies
- `fetchMovieVideos(id)` - Get movie trailers

## 🎓 Learning Outcomes

This project demonstrates:
- Modern React patterns (hooks, context, lazy loading)
- API integration and data fetching
- Responsive design with Tailwind CSS
- State management with Context API
- Client-side routing with React Router
- Performance optimization (lazy loading, code splitting)
- User experience enhancements (animations, loading states)
- localStorage for data persistence

## 📝 Notes

- The app uses TMDB API for all movie data
- Images are lazy-loaded for better performance
- Favorites are stored in browser localStorage
- Search has 500ms debounce for better UX
- All components are fully responsive

## 🤝 Contributing

Feel free to fork this project and make it your own!

## 📄 License

This is an educational project. Movie data and images are provided by TMDB.

---

**Made with ❤️ using React & TMDB API**
