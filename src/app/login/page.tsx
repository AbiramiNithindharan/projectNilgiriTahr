"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css"; // Import plain CSS

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  // ✅ Explicit type for event
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // ✅ important for API
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      const data = await res.json();
      setError(data.error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Username"
          value={form.username}
          // ✅ Explicit type for input change
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, username: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setForm({ ...form, password: e.target.value })
          }
          required
        />

        <button type="submit">Login</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}
