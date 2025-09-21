import React, { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecommendationList = () => {
  const recommendations = useRecipeStore((s) => s.recommendations);
  const recipes = useRecipeStore((s) => s.recipes);
  const favorites = useRecipeStore((s) => s.favorites);
  const generateRecommendations = useRecipeStore((s) => s.generateRecommendations);

  useEffect(() => {
    generateRecommendations();
  }, [recipes, favorites, generateRecommendations]);

  return (
    <div>
      <h2>Recommended for You</h2>
      {!recommendations.length ? (
        <p>No recommendations yet. Add a few favourites to get started.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {recommendations.map((r) => (
            <li key={r.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
              <strong>{r.title}</strong>
              {r.ingredients && <div><em>Ingredients:</em> {r.ingredients}</div>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecommendationList;
