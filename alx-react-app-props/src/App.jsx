import ProfilePage from './ProfilePage.jsx';
import UserContext from './UserContext.js';

export default function App() {
  const userData = { name: 'Jane Doe', email: 'jane.doe@example.com' };

  return (
    <UserContext.Provider value={userData}>
      <ProfilePage />
    </UserContext.Provider>
  );
}
