import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import type { Employee } from '../types';

interface EmployeeSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const EmployeeSelect: React.FC<EmployeeSelectProps> = ({ value, onChange, label = "Employee" }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await api.get('/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Employee</option>
        {employees.map(emp => (
          <option key={emp._id} value={emp._id}>{emp.name} - {emp.department}</option>
        ))}
      </select>
    </div>
  );
};

export default EmployeeSelect;
