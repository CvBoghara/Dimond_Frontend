import { useEffect, useState } from "react";
import { api } from "../services/api";

function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    api.get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
  <div className="container">
    <h1>Dashboard</h1>

    {stats && (
      <div className="card-grid">
        <div className="card">
          <h2>{stats.totalEmployees}</h2>
          <p>Employees</p>
        </div>

        <div className="card">
          <h2>{stats.totalDiamonds}</h2>
          <p>Diamonds</p>
        </div>

        <div className="card">
          <h2>{stats.totalWorkEntries}</h2>
          <p>Work Entries</p>
        </div>

        <div className="card">
          <h2>₹{stats.totalSalary}</h2>
          <p>Total Salary</p>
        </div>
      </div>
    )}
  </div>
);
}

export default Dashboard;