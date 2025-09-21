import React from 'react';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 24,
        padding: 16,
        textAlign: 'center',
        color: '#374151',
        background: '#f3f4f6',
        borderTop: '1px solid #e5e7eb'
      }}
    >
      <small>&copy; {new Date().getFullYear()} My Favorite Cities</small>
    </footer>
  );
}
