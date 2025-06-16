// src/components/shared/widgets/StatusBadge.jsx
import React from 'react';

const statusColors = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-yellow-100 text-yellow-700',
  Interested: 'bg-green-100 text-green-700',
  Closed: 'bg-gray-200 text-gray-600',
  Rejected: 'bg-red-100 text-red-600',
};

export default function StatusBadge({ status = 'New' }) {
  const style = statusColors[status] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`px-3 py-1 text-xs rounded-full font-medium ${style}`}>
      {status}
    </span>
  );
}
