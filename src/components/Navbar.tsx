import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <h2>Diamond Management</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/employee-list">Employee List</Link>
        <Link to="/work-entry">Work Entry</Link>
        <Link to="/salary">Salary Report</Link>
        {token ? (
          <button onClick={handleLogout} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "16px", marginLeft: "10px", textDecoration: "underline" }}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;