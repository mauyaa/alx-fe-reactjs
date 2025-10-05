import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";
import seedData from "../data.json";

export default function HomePage({ recipes = [] }) {
  const [list, setList] = useState(recipes.length ? recipes : seedData);
  useEffect(() => {
    setList(recipes.length ? recipes : seedData);
  }, [recipes]);

  return (
    <section className="relative min-h-screen overflow-hidden py-16">
      {/* two-tone background */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: "linear-gradient(to bottom, #1f4d3a 0 50%, #f2e6d8 50% 100%)",
        }}
      />
      {/* seam shadow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 h-16 -z-10 -translate-y-1/2"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.0) 70%)",
          filter: "blur(6px)",
          opacity: 0.35,
        }}
      />

      {/* decorative imagery */}
      <span
        aria-hidden
        className="pointer-events-none absolute -z-10 left-[-60px] top-[-80px] hidden h-[520px] w-[520px] rounded-[48px] md:block"
        style={{
          backgroundImage: "url('/bg-left.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "rotate(-6deg)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 50% 50%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(70% 70% at 50% 50%, #000 60%, transparent 100%)",
          opacity: 0.9,
          filter: "drop-shadow(0 24px 48px rgba(0,0,0,0.28))",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -z-10 right-[-80px] bottom-[-120px] hidden h-[620px] w-[620px] rounded-[56px] lg:block"
        style={{
          backgroundImage: "url('/bg-right.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: "rotate(8deg)",
          WebkitMaskImage:
            "radial-gradient(70% 70% at 50% 50%, #000 60%, transparent 100%)",
          maskImage:
            "radial-gradient(70% 70% at 50% 50%, #000 60%, transparent 100%)",
          opacity: 0.55,
          filter: "drop-shadow(0 26px 52px rgba(0,0,0,0.28))",
        }}
      />

      {/* content */}
      <div className="container-responsive relative z-10">
        <h1 className="text-4xl font-bold tracking-tight text-forest">Discover Recipes</h1>
        <p className="mt-3 text-lg text-forest opacity-80">
          Browse community favorites and add your own!
        </p>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((r) => (
            <Link
              key={r.id}
              to={`/recipe/${r.id}`}
              className="group block h-full transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.01]"
            >
              <RecipeCard recipe={r} />
            </Link>
          ))}
          {!list.length && (
            <div className="col-span-full py-20 text-center text-forest opacity-70">
              No recipes yet. Add one!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}