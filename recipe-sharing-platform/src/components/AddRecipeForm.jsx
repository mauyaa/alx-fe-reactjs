import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddRecipeForm({ onAdd }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = "Title is required";
    if (!summary.trim()) e.summary = "Summary is required";
    if (!ingredients.trim()) e.ingredients = "Ingredients are required";
    if (!steps.trim()) e.steps = "Preparation steps are required";
    const ingList = ingredients
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (ingList.length < 2) e.ingredients = "Please list at least two ingredients";
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    const recipe = {
      title: title.trim(),
      summary: summary.trim(),
      image: image.trim() || "https://images.unsplash.com/photo-1498579150354-977475b7ea0b?q=80&w=1200&auto=format&fit=crop",
      ingredients: ingredients
        .split(/\n|,/)
        .map((s) => s.trim())
        .filter(Boolean),
      steps: steps
        .split(/\n\d*\.?\s*|\n/)
        .map((s) => s.trim())
        .filter(Boolean),
    };

    onAdd?.(recipe);
    navigate("/");
  };

  const fieldClass = (hasError) =>
    `mt-1 w-full rounded-xl border ${hasError ? "border-red-400" : "border-slate-300"} bg-white p-3 outline-none focus:ring-2 focus:ring-indigo-500`;

  return (
    <section className="container-responsive py-10">
      <h1 className="text-3xl font-bold tracking-tight">Add a New Recipe</h1>
      <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} noValidate>
        <div className="md:col-span-2">
          <label className="font-medium">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={fieldClass(errors.title)}
            placeholder="e.g., Creamy Mushroom Pasta"
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="font-medium">Summary</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={fieldClass(errors.summary)}
            rows={2}
            placeholder="A short description of the dish"
          />
          {errors.summary && <p className="text-red-600 text-sm mt-1">{errors.summary}</p>}
        </div>

        <div>
          <label className="font-medium">Image URL (optional)</label>
          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={fieldClass(false)}
            placeholder="https://..."
          />
        </div>

        <div>
          <label className="font-medium">Ingredients (comma or newline separated)</label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className={fieldClass(errors.ingredients)}
            rows={6}
            placeholder={"e.g.\n2 cups flour\n1 tsp salt"}
          />
          {errors.ingredients && <p className="text-red-600 text-sm mt-1">{errors.ingredients}</p>}
        </div>

        <div className="md:col-span-2">
          <label className="font-medium">Steps (one per line or numbered)</label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className={fieldClass(errors.steps)}
            rows={6}
            placeholder={"1. Prep ingredients\n2. Cook according to instructions"}
          />
          {errors.steps && <p className="text-red-600 text-sm mt-1">{errors.steps}</p>}
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center rounded-xl bg-indigo-600 text-white font-medium px-5 py-2.5 shadow-card hover:bg-indigo-700 transition"
          >
            Save Recipe
          </button>
        </div>
      </form>
    </section>
  );
}
