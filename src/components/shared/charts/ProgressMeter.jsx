// src/components/shared/charts/ProgressMeter.jsx
import React from 'react';

export default function ProgressMeter({ value = 0, label = '', color = 'primary' }) {
  const getColor = () => {
    switch (color) {
      case 'accent': return 'bg-accent';
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-orange-500';
      case 'neutral': return 'bg-neutral';
      default: return 'bg-primary';
    }
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>{label}</span>
          <span>{value}%</span>
        </div>
      )}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getColor()} transition-all`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

