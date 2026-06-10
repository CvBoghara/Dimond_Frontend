import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("token", "mock-jwt-token");
      const from = location.state?.from?.pathname || "/";
      // To force navbar to update, we can reload or just navigate
      navigate(from, { replace: true });
      window.location.reload(); // Simple way to ensure token state is updated everywhere
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", marginTop: "100px",alignSelf: "center"}}>
      <h1>Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "20px" }}>
        {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
            required
          />
        </div>
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", boxSizing: "border-box" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", marginTop: "10px" }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
