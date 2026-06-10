import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Employee {
  _id: string;
  name: string;
}

interface SalaryData {
  totalEntries: number;
  totalSalary: number;
}

function SalaryReport() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeId, setEmployeeId] = useState("");
  const [salaryData, setSalaryData] = useState<SalaryData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));
  }, []);

  const getSalary = async () => {
    if (!employeeId) {
      alert("Please select an employee");
      return;
    }
    setLoading(true);
    try {
      const res = await api.get(`/salary/${employeeId}`);
      setSalaryData(res.data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch salary report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Salary Report</h1>
      <p className="mt-2 text-sm text-slate-400">
        Select an employee to view their salary summary.
      </p>

      <div className="mx-auto mt-8 w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-800/60 p-6 shadow-lg sm:p-8">
        <label className="block text-sm font-medium text-slate-300">
          Employee
        </label>
        <div className="mt-1.5 flex flex-col gap-3 sm:flex-row">
          <select
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
          >
            <option value="">Select Employee</option>
            {employees.map((emp) => (
              <option key={emp._id} value={emp._id}>
                {emp.name}
              </option>
            ))}
          </select>

          <button
            onClick={getSalary}
            disabled={loading}
            className="shrink-0 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Loading..." : "Get Report"}
          </button>
        </div>

        {salaryData && (
          <div className="mt-6 rounded-xl border border-slate-700 bg-slate-900/70 p-5">
            <h2 className="text-lg font-semibold text-white">Salary Summary</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-slate-800/70 p-4 text-center">
                <p className="text-2xl font-bold text-blue-400">
                  {salaryData.totalEntries}
                </p>
                <p className="mt-1 text-xs text-slate-400">Total Entries</p>
              </div>
              <div className="rounded-lg bg-slate-800/70 p-4 text-center">
                <p className="text-2xl font-bold text-emerald-400">
                  ₹{salaryData.totalSalary}
                </p>
                <p className="mt-1 text-xs text-slate-400">Total Salary</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SalaryReport;
