import { useEffect, useState } from "react";
import { api } from "../services/api";

function SalaryReport() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [salaryData, setSalaryData] = useState<any>(null);

  useEffect(() => {
    api
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getSalary = async () => {
    try {
      const res = await api.get(`/salary/${employeeId}`);
      setSalaryData(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch salary report");
    }
  };

  return (
    <div className="container">
      <h1>Salary Report</h1>

      <select
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
      >
        <option value="">Select Employee</option>

        {employees.map((emp) => (
          <option key={emp._id} value={emp._id}>
            {emp.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <button onClick={getSalary}>
        Get Salary Report
      </button>

      {salaryData && (
        <div className="salary-card">
          <h2>Salary Summary</h2>

          <h3>
            Employee Name: {salaryData.employeeName}
          </h3>

          <h3>
            Total Entries: {salaryData.totalEntries}
          </h3>

          <h3>
            Total Salary: ₹{salaryData.totalSalary}
          </h3>
        </div>
      )}
    </div>
  );
}

export default SalaryReport;