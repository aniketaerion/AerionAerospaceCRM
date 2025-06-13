// src/pages/dealer/crm/leads/LeadHistory.jsx
import React from 'react';

const historyLogs = [
  { id: 1, timestamp: '2025-06-01 09:15', field: 'Created', change: 'New lead added', by: 'System' },
  { id: 2, timestamp: '2025-06-03 02:00', field: 'Assigned To', change: 'Assigned to Alice', by: 'Manager' },
  { id: 3, timestamp: '2025-06-04 10:45', field: 'Status', change: 'New → Contacted', by: 'Alice' },
  { id: 4, timestamp: '2025-06-05 01:20', field: 'LTV', change: '₹0 → ₹1.4L', by: 'Carlos' }
];

export default function LeadHistory() {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📊 Lead Change History</h2>
      <table className="min-w-full bg-white border shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Timestamp</th>
            <th className="p-3 text-left">Field</th>
            <th className="p-3 text-left">Change</th>
            <th className="p-3 text-left">By</th>
          </tr>
        </thead>
        <tbody>
          {historyLogs.map(log => (
            <tr key={log.id} className="border-t">
              <td className="p-3">{log.timestamp}</td>
              <td className="p-3">{log.field}</td>
              <td className="p-3">{log.change}</td>
              <td className="p-3">{log.by}</td>
            </tr>
          ))}
          {historyLogs.length === 0 && (
            <tr>
              <td colSpan="4" className="p-3 text-center text-gray-500">No history available.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
