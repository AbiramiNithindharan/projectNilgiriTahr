"use client";
import { useRouter } from "next/navigation";
import "./admin.css"; // Import plain CSS

export default function AdminPage() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  };

  return (
    <div className="admin-container">
      <div className="admin-box">
        <h1>Admin Dashboard</h1>
        <p>Welcome! You are logged in ✅</p>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
}
