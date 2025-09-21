import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  const container = {
    margin: '16px auto',
    padding: 16,
    maxWidth: 380,
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    background: '#ffffff',
    textAlign: 'center'
  };

  const btn = {
    margin: '0 6px',
    padding: '8px 12px',
    borderRadius: 6,
    border: '1px solid #d1d5db',
    cursor: 'pointer'
  };

  return (
    <div style={container}>
      <p style={{ fontSize: 18, marginBottom: 12 }}>Current Count: {count}</p>
      <div>
        <button style={btn} onClick={() => setCount(count + 1)}>Increment</button>
        <button style={btn} onClick={() => setCount(count - 1)}>Decrement</button>
        <button style={btn} onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
}
