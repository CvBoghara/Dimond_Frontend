import { useEffect, useState } from "react";
import { api } from "../services/api";
import EmployeeSelect from "../components/EmployeeSelect";
import { InputField, SelectField } from "../components/FormFields";

function WorkEntry() {
  const [diamonds, setDiamonds] = useState<any[]>([]);

  const [employeeId, setEmployeeId] = useState("");
  const [diamondId, setDiamondId] = useState("");
  const [workType, setWorkType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [ratePerPiece, setRatePerPiece] = useState("");

  useEffect(() => {
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

      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-6">
        <form onSubmit={handleSubmit}>
          <EmployeeSelect value={employeeId} onChange={setEmployeeId} />

          <SelectField 
            label="Diamond" 
            value={diamondId} 
            onChange={(e) => setDiamondId(e.target.value)} 
            required 
            options={diamonds.map(d => ({ label: d.diamondCode, value: d._id }))} 
          />

          <SelectField 
            label="Work Type" 
            value={workType} 
            onChange={(e) => setWorkType(e.target.value)} 
            required 
            options={[
              { label: "Cutting", value: "Cutting" },
              { label: "Polishing", value: "Polishing" },
              { label: "Grading", value: "Grading" }
            ]} 
          />

          <InputField 
            label="Quantity" 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
          />

          <InputField 
            label="Rate Per Piece" 
            type="number" 
            value={ratePerPiece} 
            onChange={(e) => setRatePerPiece(e.target.value)} 
            required 
          />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors mt-4">
            Save Work Entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default WorkEntry;