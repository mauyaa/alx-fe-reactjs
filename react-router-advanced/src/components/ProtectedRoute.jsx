// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ authed, redirect = "/login" }) {
  return authed ? <Outlet /> : <Navigate to={redirect} replace />;
}
