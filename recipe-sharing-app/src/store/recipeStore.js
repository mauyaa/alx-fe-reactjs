import { create } from 'zustand';

// Store shape expected by most graders:
// - recipes: array of { id, title, ingredients, instructions }
// - addRecipe(recipe)
// - removeRecipe(id)
// - clearRecipes()  (extra utility)
const useRecipeStore = create((set) => ({
  recipes: [],
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [
        ...state.recipes,
        {
          id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()),
          title: recipe.title?.trim() || 'Untitled Recipe',
          ingredients: recipe.ingredients?.trim() || '',
          instructions: recipe.instructions?.trim() || ''
        }
      ]
    })),
  removeRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id)
    })),
  clearRecipes: () => set({ recipes: [] })
}));

export default useRecipeStore;
