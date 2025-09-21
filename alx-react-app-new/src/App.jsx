import Header from './components/Header.jsx';
import MainContent from './components/MainContent.jsx';
import UserProfile from './components/UserProfile.jsx';
import Footer from './components/Footer.jsx';
import Counter from './components/Counter.jsx';

export default function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Jane Doe" age={28} bio="Traveler & foodie." />
      <Counter />
      <MainContent />
      <Footer />
    </div>
  );
}
