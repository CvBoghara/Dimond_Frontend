export interface Employee {
  _id: string;
  name: string;
  department: string;
  salary: number;
}

export interface Diamond {
  _id: string;
  stoneId: string;
  carat: number;
  cut: string;
  color: string;
  clarity: string;
}

export interface WorkEntry {
  _id: string;
  employeeId: Employee;
  diamondId: Diamond;
  workType: string;
  quantity: number;
  ratePerPiece: number;
  date: string;
}

export interface SalaryData {
  employeeId: string;
  employeeName: string;
  totalEntries: number;
  totalSalary: number;
}

export interface DashboardStats {
  totalEmployees: number;
  totalDiamonds: number;
  totalWorkEntries: number;
  totalSalary: number;
}
