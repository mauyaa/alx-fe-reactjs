import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function UserProfile() {
  const user = useContext(UserContext);

  return (
    <div
      style={{
        border: '1px solid blue',
        padding: '10px',
        margin: '12px auto',
        maxWidth: 480,
        borderRadius: 8,
        background: '#f9fafb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
      }}
    >
      <h2 style={{ color: '#1d4ed8', margin: '0 0 8px' }}>{user.name}</h2>
      <p style={{ margin: '4px 0' }}>
        Age:{' '}
        <span style={{ fontWeight: 'bold', color: '#111827' }}>{user.age}</span>
      </p>
      <p style={{ margin: '4px 0', color: '#374151' }}>Bio: {user.bio}</p>
    </div>
  );
}
