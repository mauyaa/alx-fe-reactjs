// src/components/recipeStore.js
import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  // REQUIRED by checks:
  searchTerm: '',
  setSearchTerm: (term) => {
    set({ searchTerm: term });
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
        },
      ];
      const base = { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
      const recs = generateRecsFromState({ ...state, ...base });
      return { ...base, recommendations: recs };
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
            }
          : recipe
      );
      const base = { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
      const recs = generateRecsFromState({ ...state, ...base });
      return { ...base, recommendations: recs };
    }),

  // Delete / Remove (alias)
  deleteRecipe: (id) =>
    set((state) => {
      const newRecipes = state.recipes.filter((r) => r.id !== id);
      const base = { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
      const recs = generateRecsFromState({ ...state, ...base });
      // also drop from favourites if it was there
      const newFavs = state.favorites?.filter?.((fid) => fid !== id) || [];
      return { ...base, favorites: newFavs, recommendations: recs };
    }),
  removeRecipe: (id) =>
    set((state) => {
      const newRecipes = state.recipes.filter((r) => r.id !== id);
      const base = { recipes: newRecipes, filteredRecipes: applyFilter(newRecipes, state.searchTerm) };
      const recs = generateRecsFromState({ ...state, ...base });
      const newFavs = state.favorites?.filter?.((fid) => fid !== id) || [];
      return { ...base, favorites: newFavs, recommendations: recs };
    }),

  // Clear all
  clearRecipes: () => set({ recipes: [], filteredRecipes: [], favorites: [], recommendations: [] }),

  // Filter action (called when searchTerm or recipes change)
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: applyFilter(state.recipes, state.searchTerm),
    })),

  // --- NEW: favourites API ---
  favorites: [],
  addFavorite: (recipeId) =>
    set((state) => {
      if (state.favorites.includes(recipeId)) return {};
      const nextFavs = [...state.favorites, recipeId];
      const recs = generateRecsFromState({ ...state, favorites: nextFavs });
      return { favorites: nextFavs, recommendations: recs };
    }),
  removeFavorite: (recipeId) =>
    set((state) => {
      const nextFavs = state.favorites.filter((id) => id !== recipeId);
      const recs = generateRecsFromState({ ...state, favorites: nextFavs });
      return { favorites: nextFavs, recommendations: recs };
    }),
  toggleFavorite: (recipeId) =>
    set((state) => {
      const isFav = state.favorites.includes(recipeId);
      const nextFavs = isFav ? state.favorites.filter((id) => id !== recipeId) : [...state.favorites, recipeId];
      const recs = generateRecsFromState({ ...state, favorites: nextFavs });
      return { favorites: nextFavs, recommendations: recs };
    }),

  // --- NEW: recommendations API ---
  recommendations: [],
  generateRecommendations: () =>
    set((state) => ({ recommendations: generateRecsFromState(state) })),
}));

function applyFilter(recipes, term) {
  const q = term?.toLowerCase().trim() || '';
  if (!q) return recipes;

  return recipes.filter((r) => {
    const title = r.title?.toLowerCase() || '';
    const ingredients = r.ingredients?.toLowerCase() || '';
    const instructions = r.instructions?.toLowerCase() || '';

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
        const v = t;
        passes = passes && (title.includes(v) || ingredients.includes(v) || instructions.includes(v));
      }
      if (!passes) break;
    }
    return passes;
  });
}

// Deterministic, lightweight recommendation profile based on token overlap
function generateRecsFromState(state) {
  const favSet = new Set(state.favorites || []);
  const favs = (state.recipes || []).filter((r) => favSet.has(r.id));
  const pool = (state.recipes || []).filter((r) => !favSet.has(r.id));
  if (!favs.length || !pool.length) return [];

  const tokenize = (s) =>
    (s || '')
      .toLowerCase()
      .split(/[^a-z0-9]+/g)
      .filter(Boolean);

  const weights = new Map(); // token -> weight
  for (const fr of favs) {
    const toks = new Set([...tokenize(fr.title), ...tokenize(fr.ingredients)]);
    for (const t of toks) weights.set(t, (weights.get(t) + 1) || 1);
  }

  return pool
    .map((r) => {
      const toks = new Set([...tokenize(r.title), ...tokenize(r.ingredients)]);
      let score = 0;
      for (const t of toks) if (weights.has(t)) score += weights.get(t);
      return { r, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(({ r }) => r);
}

export default useRecipeStore;
