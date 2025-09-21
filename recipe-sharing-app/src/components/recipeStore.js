import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  // Add recipe
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [
        ...state.recipes,
        {
          id: crypto.randomUUID?.() || Date.now().toString(),
          title: recipe.title?.trim() || 'Untitled Recipe',
          ingredients: recipe.ingredients?.trim() || '',
          instructions: recipe.instructions?.trim() || '',
        },
      ],
    })),
  // Update recipe
  updateRecipe: (id, updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              title: updatedRecipe.title?.trim() || recipe.title,
              ingredients: updatedRecipe.ingredients?.trim() || recipe.ingredients,
              instructions: updatedRecipe.instructions?.trim() || recipe.instructions,
            }
          : recipe
      ),
    })),
  // Delete recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  // Remove recipe (alias for delete)
  removeRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
  // Clear all recipes
  clearRecipes: () => set({ recipes: [] }),
}));

export default useRecipeStore;
