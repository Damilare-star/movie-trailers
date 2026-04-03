import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const Genre = lazy(() => import('./pages/Genre'));
const Search = lazy(() => import('./pages/Search'));
const NotFound = lazy(() => import('./pages/NotFound'));
const MyList = lazy(() => import('./pages/MyList'));
const ActorProfile = lazy(() => import('./pages/ActorProfile'));

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/genre/:id" element={<Genre />} />
            <Route path="/search" element={<Search />} />
            <Route path="/my-list" element={<MyList />} />
            <Route path="/actor/:id" element={<ActorProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
