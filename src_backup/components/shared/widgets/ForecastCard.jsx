// src/components/shared/widgets/ForecastCard.jsx
import React from 'react';
import { FaChartLine } from 'react-icons/fa';

export default function ForecastCard({
  title = 'Sales Forecast',
  amount = '₹12.5L',
  growth = '+18%',
  period = 'Next 3 Months',
}) {
  const isPositive = growth.startsWith('+');

  return (
    <div className="bg-white rounded shadow p-4 w-full max-w-sm border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
        <FaChartLine className="text-blue-600" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{amount}</div>
      <div className="text-sm text-gray-500">{period}</div>
      <div
        className={`mt-2 text-sm font-medium ${
          isPositive ? 'text-green-600' : 'text-red-600'
        }`}
      >
        {growth} {isPositive ? '↑' : '↓'}
      </div>
    </div>
  );
}
