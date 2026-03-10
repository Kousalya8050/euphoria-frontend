import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; 

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (username === "admin" && password === "Pass,1234") {
      localStorage.setItem("admin_logged_in", true);
      navigate("/create-blog");
    } else {
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="admin-login-container">
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default AdminLogin;
