// src/components/SearchBar.jsx
import React from 'react';
import useRecipeStore from './recipeStore';

const SearchBar = () => {
  const searchTerm = useRecipeStore((s) => s.searchTerm);
  const setSearchTerm = useRecipeStore((s) => s.setSearchTerm);

  return (
    <input
      type="text"
      value={searchTerm}
      placeholder='Search recipes… (e.g. "pasta", "ing:tomato")'
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: '8px 12px', width: '100%', maxWidth: 480, margin: '0.5rem 0' }}
      aria-label="Search recipes"
    />
  );
};

export default SearchBar;
