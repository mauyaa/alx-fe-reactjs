import { Link, NavLink } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white/80 backdrop-blur sticky top-0 z-10 border-b">
        <nav className="container-responsive h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold tracking-tight">Recipes</Link>
          <div className="flex items-center gap-4">
            <NavLink
              to="/"
              className={({ isActive }) => `px-3 py-1.5 rounded-full hover:bg-slate-100 ${isActive ? "font-semibold" : ""}`}
            >
              Home
            </NavLink>
            <NavLink
              to="/add"
              className={({ isActive }) => `px-3 py-1.5 rounded-full hover:bg-slate-100 ${isActive ? "font-semibold" : ""}`}
            >
              Add Recipe
            </NavLink>
            <a href="https://github.com/mauyaa" target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full hover:bg-slate-100">
              GitHub
            </a>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t">
        <div className="container-responsive py-6 text-sm text-slate-500">Copyright {new Date().getFullYear()} Recipe Sharing Platform by Mauyaa</div>
      </footer>
    </div>
  );
}