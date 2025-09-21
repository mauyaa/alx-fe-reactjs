// src/components/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  // REQUIRED by checks:
  searchTerm: '',
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    // keep filtered results in sync
    const { filterRecipes } = get();
    filterRecipes();
  },
  filteredRecipes: [],

  // Add recipe
  addRecipe: (recipe) =>
    set((state) => {
      const newRecipes = [
        ...state.recipes,
        {
          id: crypto.randomUUID?.() || Date.now().toString(),
          title: recipe.title?.trim() || 'Untitled Recipe',
          ingredients: recipe.ingredients?.trim() || '',
          instructions: recipe.instructions?.trim() || '',
          // optionally: time: recipe.time ?? null
        },
      ];
      return { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
    }),

  // Update recipe
  updateRecipe: (id, updatedRecipe) =>
    set((state) => {
      const newRecipes = state.recipes.map((recipe) =>
        recipe.id === id
          ? {
              ...recipe,
              title: updatedRecipe.title?.trim() || recipe.title,
              ingredients: updatedRecipe.ingredients?.trim() || recipe.ingredients,
              instructions: updatedRecipe.instructions?.trim() || recipe.instructions,
              // time: updatedRecipe.time ?? recipe.time,
            }
          : recipe
      );
      return { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
    }),

  // Delete / Remove (alias)
  deleteRecipe: (id) =>
    set((state) => {
      const newRecipes = state.recipes.filter((r) => r.id !== id);
      return { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
    }),
  removeRecipe: (id) =>
    set((state) => {
      const newRecipes = state.recipes.filter((r) => r.id !== id);
      return { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
    }),

  // Clear all
  clearRecipes: () => set({ recipes: [], filteredRecipes: [] }),

  // Filter action (called when searchTerm or recipes change)
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: applyFilter(state.recipes, state.searchTerm),
    })),
}));

function applyFilter(recipes, term) {
  const q = term?.toLowerCase().trim() || '';
  if (!q) return recipes;

  // Basic advanced search:
  // - match title OR ingredients OR instructions
  // - support simple "ing:tomato" or "title:pasta" prefixes
  // - (optional) support time:<=30 if you add a `time` field later
  return recipes.filter((r) => {
    const title = r.title?.toLowerCase() || '';
    const ingredients = r.ingredients?.toLowerCase() || '';
    const instructions = r.instructions?.toLowerCase() || '';

    // handle simple key:value tokens
    const tokens = q.split(/\s+/);
    let passes = true;
    for (const t of tokens) {
      if (t.startsWith('title:')) {
        const v = t.slice(6);
        passes = passes && title.includes(v);
      } else if (t.startsWith('ing:') || t.startsWith('ingredient:')) {
        const v = t.replace(/^ing:|^ingredient:/, '');
        passes = passes && ingredients.includes(v);
      } else {
        // generic token: match anywhere
        const v = t;
        passes = passes && (title.includes(v) || ingredients.includes(v) || instructions.includes(v));
      }
      if (!passes) break;
    }
    return passes;
  });
}

export default useRecipeStore;
