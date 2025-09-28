import React, { useState } from "react";

const LoginPage = () => {
  const [role, setRole] = useState("admin"); // Default role
  const [identifier, setIdentifier] = useState(""); // username or email
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Logging in...");

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier, password, role }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      // Handle success (e.g., save token, redirect)
      setMessage(`Success! Welcome, ${role}.`);
    } catch (err) {
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div style={{
      maxWidth: 350, 
      margin: "50px auto", 
      padding: 24, 
      border: "1px solid #ddd", 
      borderRadius: 8, 
      fontFamily: "sans-serif"
    }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Login as:
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{ marginLeft: 8, marginBottom: 16 }}
          >
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>
        </label>
        <div style={{ marginBottom: 16 }}>
          <input
            type="text"
            placeholder="Username or Email"
            value={identifier}
            onChange={e => setIdentifier(e.target.value)}
            required
            style={{ width: "100%", padding: 8, marginTop: 8 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: 4,
            fontWeight: "bold"
          }}
        >
          Login
        </button>
        {message && (
          <div style={{ marginTop: 16, color: message.startsWith("Success") ? "green" : "red" }}>
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
