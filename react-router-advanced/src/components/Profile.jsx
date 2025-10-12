// src/components/Profile.jsx
import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <nav style={{ display: "flex", gap: 8 }}>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>
      {/* Nested routes render here */}
      <Outlet />
    </div>
  );
}

export function ProfileDetails() {
  return <p>Profile details here</p>;
}

export function ProfileSettings() {
  return <p>Profile settings here</p>;
}
