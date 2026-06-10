import { useEffect, useState } from "react";
import { api } from "../services/api";

function WorkEntry() {
  const [employees, setEmployees] = useState<any[]>([]);
  const [diamonds, setDiamonds] = useState<any[]>([]);

  const [employeeId, setEmployeeId] = useState("");
  const [diamondId, setDiamondId] = useState("");
  const [workType, setWorkType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ratePerPiece, setRatePerPiece] = useState("");

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

    try {
      await api.post("/work-entries", {
        employeeId,
        diamondId,
        workType,
        quantity: Number(quantity),
        ratePerPiece: Number(ratePerPiece),
        date: new Date(),
      });

      alert("Work Entry Added Successfully");

      setEmployeeId("");
      setDiamondId("");
      setWorkType("");
      setQuantity("");
      setRatePerPiece("");
    } catch (error) {
      console.error(error);
      alert("Failed to add work entry");
    }
  };

  return (
    <div className="container">
      <h1>Work Entry</h1>

      <div className="salary-card">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Employee</label>
            <br />
            <select
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            >
              <option value="">Select Employee</option>

              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.name}
                </option>
              ))}
            </select>
          </div>

          <br />

          <div>
            <label>Diamond</label>
            <br />
            <select
              value={diamondId}
              onChange={(e) => setDiamondId(e.target.value)}
              required
            >
              <option value="">Select Diamond</option>

              {diamonds.map((diamond) => (
                <option key={diamond._id} value={diamond._id}>
                  {diamond.diamondCode}
                </option>
              ))}
            </select>
          </div>

          <br />

          <div>
            <label>Work Type</label>
            <br />
            <select
              value={workType}
              onChange={(e) => setWorkType(e.target.value)}
              required
            >
              <option value="">Select Work Type</option>
              <option value="Cutting">Cutting</option>
              <option value="Polishing">Polishing</option>
              <option value="Grading">Grading</option>
            </select>
          </div>

          <br />

          <div>
            <label>Quantity</label>
            <br />
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <br />

          <div>
            <label>Rate Per Piece</label>
            <br />
            <input
              type="number"
              value={ratePerPiece}
              onChange={(e) => setRatePerPiece(e.target.value)}
              required
            />
          </div>

          <br />

          <button type="submit">
            Save Work Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkEntry;