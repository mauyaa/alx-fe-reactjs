import React from 'react';
import useRecipeStore from './recipeStore';

const FavouritesList = () => {
  const recipes = useRecipeStore((s) => s.recipes);
  const favorites = useRecipeStore((s) => s.favorites);
  const removeFavorite = useRecipeStore((s) => s.removeFavorite);

  const favRecipes = favorites.map((id) => recipes.find((r) => r.id === id)).filter(Boolean);

  return (
    <div>
      <h2>My Favourites</h2>
      {!favRecipes.length ? (
        <p>You have no favourites yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {favRecipes.map((r) => (
            <li key={r.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>{r.title}</strong>
              {r.ingredients && <div><em>Ingredients:</em> {r.ingredients}</div>}
              <button onClick={() => removeFavorite(r.id)} style={{ marginTop: 6 }}>
                Remove from Favourites
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavouritesList;
