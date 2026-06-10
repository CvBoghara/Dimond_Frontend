import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import WorkEntry from "./pages/WorkEntry";
import SalaryReport from "./pages/SalaryReport";
import Navbar from "./components/Navbar";
import EmployeeList from "./pages/EmployeeList";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route 
          path="/work-entry" 
          element={
            <ProtectedRoute>
              <WorkEntry />
            </ProtectedRoute>
          } 
        />
        <Route path="/salary" element={<SalaryReport />} />
        <Route path="/employee-list" element={<EmployeeList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;