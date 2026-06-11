import React from 'react';
import { Link } from 'react-router-dom';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ title, value, linkTo, linkText }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2 text-gray-700">{title}</h2>
      <p className="text-3xl font-bold text-blue-600 mb-4">{value}</p>
      <Link to={linkTo} className="text-blue-500 hover:text-blue-700 font-medium">
        {linkText} &rarr;
      </Link>
    </div>
  );
};

export default StatCard;
