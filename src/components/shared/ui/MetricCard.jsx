// src/components/shared/ui/MetricCard.jsx
import React from 'react';

/**
 * A reusable card component for displaying a single metric with a title and optional trend.
 * @param {object} props - The component props.
 * @param {string} props.title - The title of the metric.
 * @param {string|number} props.value - The value of the metric.
 * @param {string} [props.trend] - An optional trend indicator (e.g., "+5% last month").
 * @param {boolean} [props.loading=false] - If true, shows a loading skeleton.
 * @param {React.ElementType} [props.icon] - An optional icon component (e.g., from @heroicons/react).
 */
export function MetricCard({ title, value, trend, loading = false, icon: Icon }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <p className="text-base font-semibold text-gray-500">{title}</p>
        {Icon && (
          <div className="p-2 bg-blue-100 rounded-full">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
        )}
      </div>
      {loading ? (
        <div className="h-10 w-24 bg-gray-200 rounded-md animate-pulse mt-2"></div>
      ) : (
        <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
      )}
      {trend && !loading && (
        <p className="text-sm text-green-500 mt-2">{trend}</p>
      )}
    </div>
  );
}