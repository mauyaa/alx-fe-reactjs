import React from 'react';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import UserContext from './UserContext';

function App() {
  const userData = {
    name: "John Doe",
    age: 28,
    bio: "Travel enthusiast and food lover"
  };

  return (
    <UserContext.Provider value={userData}>
      <div className="App">
        <UserProfile />
        <MainContent />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
