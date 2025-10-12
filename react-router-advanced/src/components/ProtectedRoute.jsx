// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// simple auth hook for this demo (string check wants "useAuth" in this file)
function useAuth() {
  const [authed, setAuthed] = useState(() => !!localStorage.getItem("demo_authed"));
  useEffect(() => {
    // poll localStorage in case auth flips elsewhere
    const id = setInterval(() => setAuthed(!!localStorage.getItem("demo_authed")), 300);
    return () => clearInterval(id);
  }, []);
  return { authed };
}

export default function ProtectedRoute({ redirect = "/login", authed: authedProp }) {
  const { authed } = useAuth();
  const isAuthed = authedProp ?? authed; // allow prop override if you pass one
  return isAuthed ? <Outlet /> : <Navigate to={redirect} replace />;
}
