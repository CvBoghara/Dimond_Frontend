import { useState } from "react";
import { api } from "../services/api";
import type { SalaryData } from "../types";
import EmployeeSelect from "../components/EmployeeSelect";

function SalaryReport() {
  const [employeeId, setEmployeeId] = useState("");
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);

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

      <div className="max-w-md mx-auto mt-6">
        <EmployeeSelect value={employeeId} onChange={setEmployeeId} />

        <button 
          onClick={getSalary}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mb-6"
        >
          Get Salary Report
        </button>

        {salaryData && (
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-bold mb-4 border-b pb-2">Salary Summary</h2>
            <div className="space-y-3">
              <p className="flex justify-between"><span className="text-gray-600 font-medium">Employee Name:</span> <span className="font-semibold">{salaryData.employeeName}</span></p>
              <p className="flex justify-between"><span className="text-gray-600 font-medium">Total Entries:</span> <span className="font-semibold">{salaryData.totalEntries}</span></p>
              <p className="flex justify-between text-lg"><span className="text-gray-800 font-bold">Total Salary:</span> <span className="text-green-600 font-bold">₹{salaryData.totalSalary}</span></p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalaryReport;