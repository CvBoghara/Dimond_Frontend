import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Diamond Management</h2>

      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/work-entry">Work Entry</Link>
        <Link to="/salary">Salary Report</Link>
      </div>
    </nav>
  );
}

export default Navbar;