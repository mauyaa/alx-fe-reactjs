import { useState } from 'react';
import useRecipeStore from './recipeStore';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!title.trim() || !ingredients.trim() || !instructions.trim()) {
      alert('Please fill in all fields');
      return;
    }

    // Add recipe to store
    addRecipe({ title, ingredients, instructions });
    
    // Reset form fields
    setTitle('');
    setIngredients('');
    setInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem', 
      maxWidth: '500px', 
      margin: '2rem auto',
      padding: '1.5rem',
      border: '1px solid #ddd',
      borderRadius: '8px'
    }}>
      <h2>Add New Recipe</h2>
      
      <div>
        <label htmlFor="title" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Recipe Title:
        </label>
        <input
          type="text"
          id="title"
          placeholder="Enter recipe title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      <div>
        <label htmlFor="ingredients" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Ingredients:
        </label>
        <textarea
          id="ingredients"
          placeholder="List ingredients (separate with commas or new lines)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          required
          rows={4}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
      </div>

      <div>
        <label htmlFor="instructions" style={{ display: 'block', marginBottom: '0.5rem' }}>
          Instructions:
        </label>
        <textarea
          id="instructions"
          placeholder="Enter step-by-step instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          required
          rows={6}
          style={{
            width: '100%',
            padding: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            resize: 'vertical'
          }}
        />
      </div>

      <button 
        type="submit"
        style={{
          padding: '0.75rem 1.5rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '1rem'
        }}
      >
        Add Recipe
      </button>
    </form>
  );
};

export default AddRecipeForm;
