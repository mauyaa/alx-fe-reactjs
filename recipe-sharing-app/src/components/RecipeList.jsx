import useRecipeStore from '../store/recipeStore.js';

export default function RecipeList() {
  const recipes = useRecipeStore((s) => s.recipes);
  const removeRecipe = useRecipeStore((s) => s.removeRecipe);

  if (!recipes.length) {
    return (
      <section style={{ textAlign: 'center', color: '#6b7280' }}>
        <p>No recipes yet. Add one above!</p>
      </section>
    );
  }

  const card = { border: '1px solid #e5e7eb', padding: 16, borderRadius: 8, background: '#fff' };
  const container = { display: 'grid', gap: 12, maxWidth: 900, margin: '0 auto' };

  return (
    <section style={{ marginTop: 8 }}>
      <h2 style={{ textAlign: 'center' }}>Recipes</h2>
      <div style={container}>
        {recipes.map((r) => (
          <article key={r.id} style={card}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0 }}>{r.title}</h3>
              <button
                onClick={() => removeRecipe(r.id)}
                style={{ padding: '6px 10px', borderRadius: 6, cursor: 'pointer' }}
                aria-label={`Delete ${r.title}`}
              >
                Delete
              </button>
            </header>

            <section style={{ marginTop: 8 }}>
              <strong>Ingredients</strong>
              <div style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>{r.ingredients}</div>
            </section>

            <section style={{ marginTop: 8 }}>
              <strong>Instructions</strong>
              <div style={{ whiteSpace: 'pre-wrap', marginTop: 4 }}>{r.instructions}</div>
            </section>
          </article>
        ))}
      </div>
    </section>
  );
}
