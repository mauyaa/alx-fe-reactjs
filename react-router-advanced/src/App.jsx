import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, useParams } from "react-router-dom";
import { useState } from "react";

function Home() { return <h2>Home</h2>; }
function About() { return <h2>About</h2>; }

// --- Profile (Nested)
function Profile() { return (
  <div>
    <h2>Profile</h2>
    <nav style={{ display:"flex", gap:8 }}>
      <Link to="details">Details</Link>
      <Link to="settings">Settings</Link>
    </nav>
    <Outlet />
  </div>
); }
function ProfileDetails() { return <p>Profile details here</p>; }
function ProfileSettings() { return <p>Profile settings here</p>; }

// --- Dynamic: /posts/:postId
function Post() {
  const { postId } = useParams();
  return <h3>Post ID: {postId}</h3>;
}

// --- Fake auth & ProtectedRoute
function useAuth() {
  const [authed, setAuthed] = useState(() => !!localStorage.getItem("demo_authed"));
  const login = () => { localStorage.setItem("demo_authed", "1"); setAuthed(true); };
  const logout = () => { localStorage.removeItem("demo_authed"); setAuthed(false); };
  return { authed, login, logout };
}

function ProtectedRoute({ authed, redirect = "/login" }) {
  return authed ? <Outlet /> : <Navigate to={redirect} replace />;
}

function Login({ onLogin }) {
  return (
    <div>
      <h2>Login</h2>
      <button onClick={onLogin}>Sign In</button>
    </div>
  );
}

export default function App() {
  const auth = useAuth();
  return (
    <BrowserRouter>
      <div style={{ padding: 16 }}>
        <nav style={{ display:"flex", gap:12, marginBottom: 16 }}>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile (protected)</Link>
          <Link to="/posts/42">Dynamic Post 42</Link>
          <button onClick={auth.authed ? auth.logout : auth.login}>
            {auth.authed ? "Logout" : "Quick Login"}
          </button>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />

          <Route path="/login" element={<Login onLogin={auth.login} />} />

          <Route element={<ProtectedRoute authed={auth.authed} />}>
            <Route path="/profile" element={<Profile />}>
              <Route index element={<ProfileDetails />} />
              <Route path="details" element={<ProfileDetails />} />
              <Route path="settings" element={<ProfileSettings />} />
            </Route>
          </Route>

          <Route path="/posts/:postId" element={<Post />} />

          <Route path="*" element={<h2>Not Found</h2>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
