// src/components/shared/charts/ProgressMeter.jsx
import React from 'react';

const ProgressMeter = ({ value, max, label }) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const progressColor = percentage > 80 ? 'bg-green-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-red-500';

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full flex flex-col items-center justify-center text-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Progress Meter</h3>
      <div className="w-24 h-24 rounded-full border-4 border-gray-200 flex items-center justify-center relative my-2">
        <div
          className={`absolute inset-0 rounded-full ${progressColor}`}
          style={{ clipPath: `inset(${100 - percentage}% 0 0 0)` }}
        ></div>
        <div className="relative text-gray-800 text-2xl font-bold z-10">{value}</div>
      </div>
      <p className="text-sm text-gray-500 mt-1">{label}</p>
      <p className="text-xs text-gray-600 mt-1">{percentage.toFixed(0)}% Complete</p>
    </div>
  );
};

export {ProgressMeter} ; // CRITICAL: This must be a default export