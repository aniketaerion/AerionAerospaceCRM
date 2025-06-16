// src/pages/dealer/crm/customers/CustomerStatusBadge.jsx
import React from 'react';

const badgeStyles = {
  Prime: 'bg-green-100 text-green-700',
  Active: 'bg-yellow-100 text-yellow-700',
  Loyal: 'bg-blue-100 text-blue-700',
  Dormant: 'bg-gray-200 text-gray-600',
  Rent: 'bg-blue-100 text-blue-700',
  Own: 'bg-gray-100 text-gray-800',
  Both: 'bg-purple-100 text-purple-700'
};

export function CustomerStatusBadge({ status }) {
  if (!status) return null;
  return (
    <span className={`px-2 py-0.5 text-xs rounded font-medium ${badgeStyles[status] || 'bg-gray-100 text-gray-700'}`}>
      {status}
    </span>
  );
}
