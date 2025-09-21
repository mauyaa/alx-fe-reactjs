import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import EditRecipeForm from './components/EditRecipeForm';
import DeleteRecipeButton from './components/DeleteRecipeButton';
import FavouritesList from './components/FavouritesList';
import RecommendationList from './components/RecommendationList';
import SearchBar from './components/SearchBar';

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Helvetica Neue, Arial', padding: 20 }}>
        <header style={{ textAlign: 'center', marginBottom: 16 }}>
          <h1 style={{ margin: 0 }}>Recipe Sharing App</h1>
          <p style={{ color: '#4b5563', marginTop: 4 }}>Add your favorite recipes and share them with the world.</p>

          {/* Navigation Links */}
          <nav style={{ marginTop: '16px' }}>
            <Link to="/" style={{ marginRight: '16px', textDecoration: 'none', color: '#3b82f6', fontWeight: '500' }}>Home</Link>
            <Link to="/add" style={{ marginRight: '16px', textDecoration: 'none', color: '#3b82f6', fontWeight: '500' }}>Add Recipe</Link>
            <Link to="/favourites" style={{ marginRight: '16px', textDecoration: 'none', color: '#3b82f6', fontWeight: '500' }}>Favourites</Link>
            <Link to="/recommendations" style={{ textDecoration: 'none', color: '#3b82f6', fontWeight: '500' }}>Recommendations</Link>
          </nav>

          {/* Global search */}
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center' }}>
            <SearchBar />
          </div>
        </header>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/edit/:id" element={<EditRecipeForm />} />
          <Route path="/delete/:id" element={<DeleteRecipeButton />} />
          <Route path="/favourites" element={<FavouritesList />} />
          <Route path="/recommendations" element={<RecommendationList />} />
        </Routes>

        <footer style={{ textAlign: 'center', marginTop: 24, color: '#6b7280' }}>
          <small>&copy; {new Date().getFullYear()} Recipe Sharing App</small>
        </footer>
      </div>
    </Router>
  );
}
