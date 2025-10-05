import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage.jsx";
import RecipeDetail from "./components/RecipeDetail.jsx";
import AddRecipeForm from "./components/AddRecipeForm.jsx";
import Layout from "./components/Layout.jsx";
import seedData from "./data.json";

export default function App() {
  const [recipes, setRecipes] = useState([]);

  // Initialize from mock JSON (simulating fetch on mount)
  useEffect(() => {
    setRecipes(seedData);
  }, []);

  const addRecipe = (recipe) => {
    const nextId = recipes.length ? Math.max(...recipes.map((r) => Number(r.id))) + 1 : 1;
    const withId = { ...recipe, id: nextId };
    setRecipes((prev) => [withId, ...prev]);
  };

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage recipes={recipes} />} />
        <Route path="/recipe/:id" element={<RecipeDetail recipes={recipes} />} />
        <Route path="/add" element={<AddRecipeForm onAdd={addRecipe} />} />
        <Route path="*" element={<div className="container-responsive py-12">Page not found.</div>} />
      </Routes>
    </Layout>
  );
}