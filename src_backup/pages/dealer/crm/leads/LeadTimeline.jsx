// src/pages/dealer/crm/leads/LeadTimeline.jsx
import React from 'react';

export default function LeadTimeline({ interactions = [] }) {
  if (!interactions.length) {
    return <p className="text-sm text-gray-500">No interactions available.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {interactions.map((entry) => (
        <li key={entry.id} className="py-3">
          <p className="text-sm text-gray-600">
            <strong>{entry.date}</strong> — <em>{entry.type}</em>
          </p>
          <p className="text-sm">{entry.notes}</p>
        </li>
      ))}
    </ul>
  );
}
