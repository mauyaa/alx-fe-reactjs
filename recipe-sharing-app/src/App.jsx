import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import EditRecipeForm from './components/EditRecipeForm';
import DeleteRecipeButton from './components/DeleteRecipeButton';

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Helvetica Neue, Arial', padding: 20 }}>
        <header style={{ textAlign: 'center', marginBottom: 16 }}>
          <h1 style={{ margin: 0 }}>Recipe Sharing App</h1>
          <p style={{ color: '#4b5563', marginTop: 4 }}>Add your favorite recipes and share them with the world.</p>
          
          {/* Navigation Links */}
          <nav style={{ marginTop: '16px' }}>
            <Link 
              to="/" 
              style={{ 
                marginRight: '16px', 
                textDecoration: 'none', 
                color: '#3b82f6',
                fontWeight: '500'
              }}
            >
              Home
            </Link>
            <Link 
              to="/add" 
              style={{ 
                textDecoration: 'none', 
                color: '#3b82f6',
                fontWeight: '500'
              }}
            >
              Add Recipe
            </Link>
          </nav>
        </header>

        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/add" element={<AddRecipeForm />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/edit/:id" element={<EditRecipeForm />} />
          <Route path="/delete/:id" element={<DeleteRecipeButton />} />
        </Routes>

        <footer style={{ textAlign: 'center', marginTop: 24, color: '#6b7280' }}>
          <small>&copy; {new Date().getFullYear()} Recipe Sharing App</small>
        </footer>
      </div>
    </Router>
  );
}
