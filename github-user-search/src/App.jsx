import Search from './components/Search.jsx';

export default function App() {
  return (
    <div className="min-h-screen">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 py-5">
          <h1 className="text-2xl font-bold">GitHub User Search</h1>
          <p className="text-sm text-gray-600 mt-1">
            Find GitHub users by username, or use advanced filters like location and repository count.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        <Search />
      </main>

      <footer className="py-8">
        <div className="max-w-5xl mx-auto px-4 text-xs text-gray-500">
          © 2025 ALX. Built with React, Tailwind CSS, and the GitHub REST API.
        </div>
      </footer>
    </div>
  );
}
