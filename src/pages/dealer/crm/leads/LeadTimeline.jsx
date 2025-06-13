// src/pages/dealer/crm/leads/LeadTimeline.jsx
import React from 'react';

const timelineData = [
  { id: 1, date: '2025-06-01', time: '10:00 AM', type: 'Note', content: 'Initial interest in drone spraying', by: 'Alice' },
  { id: 2, date: '2025-06-03', time: '03:30 PM', type: 'Call', content: 'Phone discussion about acreage and demo', by: 'Bob' },
  { id: 3, date: '2025-06-05', time: '11:15 AM', type: 'Meeting', content: 'On-field demo scheduled and completed', by: 'Carlos' },
  { id: 4, date: '2025-06-07', time: '04:45 PM', type: 'Status Update', content: 'Lead moved to "Interested"', by: 'Alice' }
];

export default function LeadTimeline() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📜 Lead Activity Timeline</h2>
      <ul className="space-y-4">
        {timelineData.map(event => (
          <li key={event.id} className="border-l-4 border-blue-600 pl-4">
            <div className="text-sm text-gray-600">{event.date} at {event.time}</div>
            <div className="font-medium text-blue-700">{event.type} by {event.by}</div>
            <div className="text-gray-800">{event.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
