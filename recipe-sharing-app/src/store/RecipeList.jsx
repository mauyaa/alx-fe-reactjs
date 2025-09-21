import useRecipeStore from './recipeStore';

const RecipeList = () => {
  const { recipes, removeRecipe } = useRecipeStore();

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
          <p><strong>Instructions:</strong> {recipe.instructions}</p>
          <button onClick={() => removeRecipe(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
