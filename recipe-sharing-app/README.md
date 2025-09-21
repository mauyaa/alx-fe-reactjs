# Recipe Sharing App (with Zustand)

This app demonstrates a minimal recipe-sharing UI using **Zustand** for state management.

## Scripts
```bash
npm install
npm run dev
```

## Structure
- `src/store/recipeStore.js` — zustand store with `recipes`, `addRecipe`, `removeRecipe`
- `src/components/AddRecipeForm.jsx` — form to add a recipe
- `src/components/RecipeList.jsx` — lists and deletes recipes
- `src/App.jsx` — imports and renders both components
