// src/components/Profile.jsx
import { Link, Routes, Route } from "react-router-dom";

export default function Profile() {
  return (
    <div>
      <h2>Profile</h2>
      <nav style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <Link to="">Overview</Link>
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      {/* Nested routes live here */}
      <Routes>
        <Route index element={<ProfileDetails />} />
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
        <Route path="*" element={<p>Select a section.</p>} />
      </Routes>
    </div>
  );
}

export function ProfileDetails() {
  return <p>Profile details here</p>;
}

export function ProfileSettings() {
  return <p>Profile settings here</p>;
}
