import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
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
  removeRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((r) => r.id !== id),
    })),
  clearRecipes: () => set({ recipes: [] }),
}));

export default useRecipeStore;
