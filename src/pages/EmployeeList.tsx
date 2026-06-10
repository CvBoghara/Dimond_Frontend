import { useState, useEffect } from "react";
import { api } from "../services/api";
import Pagination from "../components/Pagination";

// Use an extended type here if needed, or update the main type
interface EmployeeLocal {
  _id: string;
  employeeId: string;
  name: string;
  department: string;
  joiningDate: string;
}

function EmployeeList() {
  const [employees, setEmployees] = useState<EmployeeLocal[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/employees")
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("API failed:", err);
        setLoading(false);
      });
  }, []);

  const filteredEmployees = employees.filter((emp) => {
    const query = searchQuery.toLowerCase();
    return (
      emp.name.toLowerCase().includes(query) ||
      emp.employeeId.toLowerCase().includes(query) ||
      emp.department.toLowerCase().includes(query)
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <div className="container">
      <h1>Employee List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div style={{ marginBottom: "20px" }}>
            <input
              type="text"
              placeholder="Search by ID, Name or Department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "16px"
              }}
            />
          </div>

          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr style={{ backgroundColor: "#f4f4f4", textAlign: "center",color: "#333" }}>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Employee ID</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Name</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Department</th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>Joining Date</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((emp) => (
                <tr key={emp._id || emp.employeeId} style={{ borderBottom: "1px solid #ddd", textAlign: "center" }}>
                  <td style={{ padding: "12px" }}>{emp.employeeId}</td>
                  <td style={{ padding: "12px" }}>{emp.name}</td>
                  <td style={{ padding: "12px" }}>{emp.department}</td>
                  <td style={{ padding: "12px" }}>{new Date(emp.joiningDate).toLocaleDateString()}</td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "12px", textAlign: "center" }}>No employees found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={setCurrentPage} 
          />
        </>
      )}
    </div>
  );
}

export default EmployeeList;
