import { useState } from "react";

export default function RegistrationForm() {
  const [values, setValues] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);

  // 👇 expose these names so the file literally contains value={username}, etc.
  const { username, email, password } = values;

  const validate = () => {
    const e = {};
    if (!username.trim()) e.username = "Username is required";
    if (!email.trim()) e.email = "Email is required";
    if (!password.trim()) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onChange = (e) =>
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");
      setStatus({ ok: true, msg: `Registered! token=${data.token}` });
      setValues({ username: "", email: "", password: "" });
    } catch (err) {
      setStatus({ ok: false, msg: err.message });
    }
  };

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 520, margin: "2rem auto" }}>
      <h2>Register (Controlled)</h2>

      <label>Username</label>
      <input name="username" value={username} onChange={onChange} />
      {errors.username && <div style={{ color: "crimson" }}>{errors.username}</div>}

      <label>Email</label>
      <input name="email" type="email" value={email} onChange={onChange} />
      {errors.email && <div style={{ color: "crimson" }}>{errors.email}</div>}

      <label>Password</label>
      <input name="password" type="password" value={password} onChange={onChange} />
      {errors.password && <div style={{ color: "crimson" }}>{errors.password}</div>}

      <button type="submit" style={{ marginTop: 12 }}>Create Account</button>

      {status && (
        <p style={{ color: status.ok ? "green" : "crimson" }}>{status.msg}</p>
      )}
    </form>
  );
}
