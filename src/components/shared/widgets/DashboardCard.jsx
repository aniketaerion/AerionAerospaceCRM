// src/components/shared/widgets/DashboardCard.jsx

import React from 'react';

export default function DashboardCard({
  title,
  value,
  icon = null,
  color = 'primary', // primary | accent | neutral | success | warning
}) {
  const colorClasses = {
    primary: 'text-primary',
    accent: 'text-accent',
    neutral: 'text-neutral',
    success: 'text-green-600',
    warning: 'text-orange-500',
  };

  return (
    <div className="bg-white border rounded shadow-sm p-4 flex items-center justify-between space-x-4">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h2 className={`text-xl font-bold ${colorClasses[color]}`}>{value}</h2>
      </div>
      {icon && <div className="text-3xl text-gray-300">{icon}</div>}
    </div>
  );
}
