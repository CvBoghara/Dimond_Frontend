import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { token, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 p-4 shadow-lg flex flex-col md:flex-row items-center justify-between">
      <h2 className="text-white text-xl font-bold mb-4 md:mb-0">Diamond Management</h2>

      <div className="flex flex-wrap justify-center gap-4">
        <Link to="/" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Dashboard</Link>
        <Link to="/employee-list" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Employee List</Link>
        <Link to="/work-entry" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Work Entry</Link>
        <Link to="/salary" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Salary Report</Link>
        {token ? (
          <button onClick={handleLogout} className="text-white underline hover:text-gray-300 ml-2">Logout</button>
        ) : (
          <Link to="/login" className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition">Login</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;