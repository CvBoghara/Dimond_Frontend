import { useState, useEffect } from "react";
import { api } from "../services/api";

interface Employee {
  _id: string;
  employeeId: string;
  name: string;
  department: string;
  joiningDate: string;
}

function EmployeeList() {
  const [employees, setEmployees] = useState<Employee[]>([]);
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(employees.length / itemsPerPage);

  return (
    <div className="container">
      <h1>Employee List</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="data-table" style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
            <thead>
              <tr
                style={{
                  backgroundColor: "#f4f4f4",
                  textAlign: "center",
                  color: "#000",
                }}
              >
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Employee ID
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Name
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Department
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ddd" }}>
                  Joining Date
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((emp) => (
                <tr key={emp._id || emp.employeeId} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "12px" }}>{emp.employeeId}</td>
                  <td style={{ padding: "12px" }}>{emp.name}</td>
                  <td style={{ padding: "12px" }}>{emp.department}</td>
                  <td style={{ padding: "12px" }}>{new Date(emp.joiningDate).toLocaleDateString()}</td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ padding: "12px", textAlign: "center" }}>No employees found in the database.</td>
                </tr>
              )}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className="pagination" style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                style={{ padding: "8px 12px", cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    backgroundColor: currentPage === page ? "#007bff" : "#fff",
                    color: currentPage === page ? "#fff" : "#000",
                    border: "1px solid #ccc",
                    borderRadius: "4px"
                  }}
                >
                  {page}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                style={{ padding: "8px 12px", cursor: currentPage === totalPages ? "not-allowed" : "pointer" }}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EmployeeList;
