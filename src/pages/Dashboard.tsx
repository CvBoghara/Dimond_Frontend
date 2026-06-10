import { useEffect, useState } from "react";
import { FiUsers, FiClipboard } from "react-icons/fi";
import { GiCutDiamond, GiTakeMyMoney } from "react-icons/gi";
import { api } from "../services/api";

interface Stats {
  totalEmployees: number;
  totalDiamonds: number;
  totalWorkEntries: number;
  totalSalary: number;
}

function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    api
      .get("/dashboard/stats")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));
  }, []);

  const cards = stats
    ? [
        {
          label: "Employees",
          value: stats.totalEmployees,
          icon: <FiUsers />,
          accent: "text-blue-400",
        },
        {
          label: "Diamonds",
          value: stats.totalDiamonds,
          icon: <GiCutDiamond />,
          accent: "text-cyan-400",
        },
        {
          label: "Work Entries",
          value: stats.totalWorkEntries,
          icon: <FiClipboard />,
          accent: "text-violet-400",
        },
        {
          label: "Total Salary",
          value: `₹${stats.totalSalary}`,
          icon: <GiTakeMyMoney />,
          accent: "text-emerald-400",
        },
      ]
    : [];

  return (
    <div>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-slate-400">
        Overview of your diamond business at a glance.
      </p>

      {stats ? (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-slate-800 bg-slate-800/60 p-5 shadow-lg transition-transform hover:-translate-y-1 hover:border-slate-700"
            >
              <div className={`text-3xl ${card.accent}`}>{card.icon}</div>
              <p className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                {card.value}
              </p>
              <p className="mt-1 text-sm text-slate-400">{card.label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl border border-slate-800 bg-slate-800/40"
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
