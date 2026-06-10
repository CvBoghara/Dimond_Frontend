import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import WorkEntry from "./pages/WorkEntry";
import SalaryReport from "./pages/SalaryReport";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <Navbar />
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/work-entry" element={<WorkEntry />} />
            <Route path="/salary" element={<SalaryReport />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
