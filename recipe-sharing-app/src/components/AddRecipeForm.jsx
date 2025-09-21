import { useState } from 'react';
import useRecipeStore from '../store/recipeStore.js';

export default function AddRecipeForm() {
  const addRecipe = useRecipeStore((s) => s.addRecipe);

  const [form, setForm] = useState({
    title: '',
    ingredients: '',
    instructions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title && !form.ingredients && !form.instructions) return;
    addRecipe(form);
    setForm({ title: '', ingredients: '', instructions: '' });
  };

  const field = { display: 'block', width: '100%', maxWidth: 540, padding: 8, margin: '6px 0' };
  const label = { fontWeight: 600, marginTop: 8 };
  const card = { border: '1px solid #e5e7eb', padding: 16, borderRadius: 8, margin: '0 auto 16px', maxWidth: 600, background: '#fff' };

  return (
    <section style={card}>
      <h2 style={{ marginTop: 0 }}>Add Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label style={label}>Title</label>
        <input
          type="text"
          name="title"
          placeholder="e.g., Spaghetti Bolognese"
          value={form.title}
          onChange={handleChange}
          style={field}
          required
        />

        <label style={label}>Ingredients</label>
        <textarea
          name="ingredients"
          placeholder="List the ingredients (comma or line separated)"
          value={form.ingredients}
          onChange={handleChange}
          style={{ ...field, height: 100, resize: 'vertical' }}
          required
        />

        <label style={label}>Instructions</label>
        <textarea
          name="instructions"
          placeholder="Describe the steps"
          value={form.instructions}
          onChange={handleChange}
          style={{ ...field, height: 140, resize: 'vertical' }}
          required
        />

        <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, cursor: 'pointer' }}>
          Add Recipe
        </button>
      </form>
    </section>
  );
}
