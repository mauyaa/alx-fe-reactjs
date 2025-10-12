import { useState } from 'react';

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const submit = (e) => {
    e.preventDefault();
    const v = text.trim();
    if (!v) return;
    onAdd(v);
    setText('');
  };
  return (
    <form onSubmit={submit} aria-label="add-todo-form">
      <label htmlFor="new-todo">Add a todo</label>
      <input
        id="new-todo"
        placeholder="e.g., Read a chapter"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}
