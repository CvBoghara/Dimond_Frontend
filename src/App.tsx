import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import WorkEntry from "./pages/WorkEntry";
import SalaryReport from "./pages/SalaryReport";
import Navbar from "./components/Navbar";
import EmployeeList from "./pages/EmployeeList";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/work-entry" element={<ProtectedRoute><WorkEntry /></ProtectedRoute>} />
        <Route path="/salary" element={<ProtectedRoute><SalaryReport /></ProtectedRoute>} />
        <Route path="/employee-list" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;