import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import seedData from "../data.json";

export default function RecipeDetail({ recipes = [] }) {
  const { id } = useParams();
  const [resolvedRecipes, setResolvedRecipes] = useState(recipes.length ? recipes : seedData);

  useEffect(() => {
    setResolvedRecipes(recipes.length ? recipes : seedData);
  }, [recipes]);

  const recipe = resolvedRecipes.find((r) => String(r.id) === String(id));

  if (!recipe) {
    return (
      <section className="container-responsive py-10">
        <p className="text-slate-500">Recipe not found.</p>
        <Link to="/" className="text-indigo-600 font-medium">Back to home</Link>
      </section>
    );
  }

  return (
    <section className="container-responsive py-10">
      <Link to="/" className="text-indigo-600 font-medium">Back</Link>
      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <img src={recipe.image} alt={recipe.title} className="h-full w-full object-cover" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold tracking-tight text-forest">{recipe.title}</h1>
          <p className="mt-2 text-slate-600">{recipe.summary}</p>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-forest">Ingredients</h2>
            <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-700">
              {recipe.ingredients?.map((ing, idx) => (
                <li key={idx}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold text-forest">Instructions</h2>
            <ol className="mt-2 list-decimal space-y-2 pl-6 text-slate-700">
              {recipe.steps?.map((step, idx) => (
                <li key={idx}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}