import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Employee {
  _id: string;
  name: string;
}

interface Diamond {
  _id: string;
  diamondCode: string;
}

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

const labelClass = "block text-sm font-medium text-slate-300";

function WorkEntry() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [diamonds, setDiamonds] = useState<Diamond[]>([]);

  const [employeeId, setEmployeeId] = useState("");
  const [diamondId, setDiamondId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ratePerPiece, setRatePerPiece] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.log(err));

    api
      .get("/diamonds")
      .then((res) => setDiamonds(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await api.post("/work-entries", {
        employeeId,
        diamondId,
        quantity: Number(quantity),
        ratePerPiece: Number(ratePerPiece),
        date: new Date(),
      });

      alert("Work Entry Added Successfully");

      setEmployeeId("");
      setDiamondId("");
      setQuantity("");
      setRatePerPiece("");
    } catch (error) {
      console.error(error);
      alert("Failed to add work entry");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-white sm:text-4xl">Work Entry</h1>
      <p className="mt-2 text-sm text-slate-400">
        Record a new diamond work entry for an employee.
      </p>

      <div className="mx-auto mt-8 w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-800/60 p-6 shadow-lg sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={labelClass}>Employee</label>
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
              className={fieldClass}
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Diamond</label>
            <select
              value={diamondId}
              onChange={(e) => setDiamondId(e.target.value)}
              required
              className={fieldClass}
            >
              <option value="">Select Diamond</option>
              {diamonds.map((diamond) => (
                <option key={diamond._id} value={diamond._id}>
                  {diamond.diamondCode}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Quantity</label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className={fieldClass}
              />
            </div>

            <div>
              <label className={labelClass}>Rate Per Piece</label>
              <input
                type="number"
                value={ratePerPiece}
                onChange={(e) => setRatePerPiece(e.target.value)}
                required
                className={fieldClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save Work Entry"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkEntry;
