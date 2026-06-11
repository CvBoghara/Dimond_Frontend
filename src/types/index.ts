import React from 'react';

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

export interface EmployeeSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { label: string; value: string }[];
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  linkTo: string;
  linkText: string;
}
