// src/components/RecipeList.jsx
import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore((s) => s.recipes);
  const filtered = useRecipeStore((s) => s.filteredRecipes);
  const filterRecipes = useRecipeStore((s) => s.filterRecipes);
  const favorites = useRecipeStore((s) => s.favorites);
  const toggleFavorite = useRecipeStore((s) => s.toggleFavorite);

  useEffect(() => {
    filterRecipes();
  }, [recipes, filterRecipes]);

  if (recipes.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <h2>No recipes yet!</h2>
        <p>Get started by adding your first recipe.</p>
        <Link
          to="/add"
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Add Your First Recipe
        </Link>
      </div>
    );
  }

  if (filtered.length === 0) {
    return <p>No recipes match your search.</p>;
  }

  const isFav = (id) => favorites.includes(id);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Your Recipes</h2>
        <Link
          to="/add"
          style={{
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px'
          }}
        >
          Add New Recipe
        </Link>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {filtered.map((recipe) => (
          <div key={recipe.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0 }}>{recipe.title}</h3>
              <button onClick={() => toggleFavorite(recipe.id)} aria-label="Toggle favourite">
                {isFav(recipe.id) ? '★ Unfavourite' : '☆ Favourite'}
              </button>
            </div>

            <p style={{ marginBottom: '15px' }}>
              <strong>Ingredients:</strong> {recipe.ingredients.substring(0, 100)}...
            </p>
            <div>
              <Link
                to={`/recipe/${recipe.id}`}
                style={{
                  marginRight: '10px',
                  padding: '6px 12px',
                  backgroundColor: '#2196F3',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                View Details
              </Link>
              <Link
                to={`/edit/${recipe.id}`}
                style={{
                  marginRight: '10px',
                  padding: '6px 12px',
                  backgroundColor: '#FF9800',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                Edit
              </Link>
              <Link
                to={`/delete/${recipe.id}`}
                style={{
                  padding: '6px 12px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '4px'
                }}
              >
                Delete
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
