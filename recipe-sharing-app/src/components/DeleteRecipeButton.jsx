import { useParams, useNavigate } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const DeleteRecipeButton = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { recipes, deleteRecipe } = useRecipeStore();
  const recipe = recipes.find((r) => r.id === id);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
      navigate('/');
    }
  };

  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <button onClick={() => navigate('/')}>Back to Recipes</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Delete Recipe</h1>
      <div style={{ marginBottom: '20px' }}>
        <h2>Are you sure you want to delete "{recipe.title}"?</h2>
        <p>This action cannot be undone.</p>
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={handleDelete}
          style={{
            padding: '10px 20px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Yes, Delete Recipe
        </button>
        <button 
          onClick={() => navigate(`/recipe/${id}`)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default DeleteRecipeButton;
