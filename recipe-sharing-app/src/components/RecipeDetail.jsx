import { useParams, Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';

const RecipeDetail = () => {
  const { id } = useParams();
  const { recipes } = useRecipeStore();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    return (
      <div>
        <h2>Recipe Not Found</h2>
        <Link to="/">Back to Recipes</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/" style={{ marginBottom: '20px', display: 'block' }}>
        ← Back to Recipes
      </Link>
      
      <h1>{recipe.title}</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Ingredients</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.ingredients}</p>
      </div>
      
      <div>
        <h2>Instructions</h2>
        <p style={{ whiteSpace: 'pre-wrap' }}>{recipe.instructions}</p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <Link 
          to={`/edit/${recipe.id}`} 
          style={{ 
            marginRight: '10px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Edit Recipe
        </Link>
        <Link 
          to={`/delete/${recipe.id}`}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Delete Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeDetail;
