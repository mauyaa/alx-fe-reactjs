import React from 'react';

export default function MainContent() {
  const cities = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru'];

  return (
    <main
      style={{
        padding: 20,
        maxWidth: 900,
        margin: '0 auto',
        lineHeight: 1.6
      }}
    >
      <h2 style={{ marginTop: 0 }}>Top Cities</h2>
      <ul style={{ paddingLeft: 20 }}>
        {cities.map((c) => (
          <li key={c} style={{ margin: '6px 0' }}>
            {c}
          </li>
        ))}
      </ul>
      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderLeft: '4px solid #34d399',
          background: '#ecfdf5',
          borderRadius: 6
        }}
      >
        I love to visit New York, Paris, and Tokyo.
      </div>
    </main>
  );
}
