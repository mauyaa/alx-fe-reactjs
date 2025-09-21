import { useContext } from 'react';
import UserContext from './UserContext.js';

export default function UserDetails() {
  const userData = useContext(UserContext);

  return (
    <div style={{ padding: 16 }}>
      <p>Name: {userData?.name}</p>
      <p>Email: {userData?.email}</p>
    </div>
  );
}
