import { useEffect, useState } from "react";
import { api } from "../services/api";
import StatCard from "../components/StatCard";
import type { DashboardStats } from "../types";

function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);

  useEffect(() => {
    api.get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1>Dashboard</h1>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          <StatCard title="Employees" value={stats.totalEmployees} linkTo="/employee-list" linkText="View Employees" />
          <StatCard title="Diamonds" value={stats.totalDiamonds} linkTo="/employee-list" linkText="View Diamonds" />
          <StatCard title="Work Entries" value={stats.totalWorkEntries} linkTo="/work-entry" linkText="Add Entry" />
          <StatCard title="Total Salary" value={`₹${stats.totalSalary}`} linkTo="/salary" linkText="View Report" />
        </div>
      )}
    </div>
  );
}

export default Dashboard;