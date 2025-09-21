import { Routes, Route, Link } from 'react-router-dom'; // Import routing components :cite[3]
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetail from './components/RecipeDetail';
import EditRecipeForm from './components/EditRecipeForm';
import DeleteRecipeButton from './components/DeleteRecipeButton
export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Helvetica Neue, Arial', padding: 20 }}>
      <header style={{ textAlign: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>Recipe Sharing App</h1>
        <p style={{ color: '#4b5563', marginTop: 4 }}>Add your favorite recipes and share them with the world.</p>
      </header>

      <AddRecipeForm />
      <RecipeList />

      <footer style={{ textAlign: 'center', marginTop: 24, color: '#6b7280' }}>
        <small>&copy; {new Date().getFullYear()} Recipe Sharing App</small>
      </footer>
    </div>
  );
}
