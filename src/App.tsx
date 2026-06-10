import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import WorkEntry from "./pages/WorkEntry";
import SalaryReport from "./pages/SalaryReport";
import Navbar from "./components/Navbar";
import EmployeeList from "./pages/EmployeeList";

function App() {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/work-entry" element={<WorkEntry />} />
        <Route path="/salary" element={<SalaryReport />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;