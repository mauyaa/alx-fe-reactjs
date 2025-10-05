import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="group block">
      <article className="bg-white rounded-2xl shadow-card hover:shadow-xl transition-shadow overflow-hidden">
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{recipe.title}</h3>
          <p className="text-slate-600 line-clamp-2">{recipe.summary}</p>
          <div className="mt-3 inline-flex items-center text-sm font-medium text-indigo-600">{'View details ->'}</div>
        </div>
      </article>
    </Link>
  );
}