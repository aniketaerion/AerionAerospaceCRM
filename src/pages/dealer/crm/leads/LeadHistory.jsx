import React from 'react';

// This is a dummy data set. In a real application,
// this data would be fetched from a database table (e.g., 'lead_audit_logs')
// filtered by the `leadId` passed as a prop.
const dummyHistoryLogs = [
  { id: 1, timestamp: '2025-06-01T09:15:00Z', field: 'Status', oldValue: 'New', newValue: 'Created', changedBy: 'System' },
  { id: 2, timestamp: '2025-06-03T02:00:00Z', field: 'Assigned To', oldValue: 'Unassigned', newValue: 'Alice', changedBy: 'Manager' },
  { id: 3, timestamp: '2025-06-04T10:45:00Z', field: 'Status', oldValue: 'New', newValue: 'Contacted', changedBy: 'Alice' },
  { id: 4, timestamp: '2025-06-05T01:20:00Z', field: 'LTV', oldValue: '₹0', newValue: '₹1.4L', changedBy: 'Carlos' },
  { id: 5, timestamp: '2025-06-05T15:30:00Z', field: 'Interest Level', oldValue: 'Warm', newValue: 'Hot', changedBy: 'Alice' },
];

export default function LeadHistory({ leadId }) { // Now accepts leadId as a prop
  // In a real app, you'd fetch history data here based on leadId
  // For now, we'll just use dummy data, assuming it's pre-filtered or for demonstration
  const historyLogs = dummyHistoryLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by most recent first

  if (historyLogs.length === 0) {
    return (
      <div className="p-4 text-center text-neutral-medium bg-neutral-light/30 rounded-lg">
        No history available for this lead yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm bg-white">
        <thead className="bg-gray-100 text-left text-neutral-dark">
          <tr>
            <th className="p-3 font-semibold">Timestamp</th>
            <th className="p-3 font-semibold">Field</th>
            <th className="p-3 font-semibold">Change</th>
            <th className="p-3 font-semibold">By</th>
          </tr>
        </thead>
        <tbody>
          {historyLogs.map(log => (
            <tr key={log.id} className="border-t border-gray-200 hover:bg-gray-50">
              <td className="p-3 text-neutral-dark">
                {new Date(log.timestamp).toLocaleString()}
              </td>
              <td className="p-3 text-neutral-dark font-medium">{log.field}</td>
              <td className="p-3 text-neutral-dark">
                {log.oldValue && log.newValue && log.oldValue !== log.newValue ? (
                  <>
                    <span className="text-red-600 line-through mr-1">{log.oldValue}</span>
                    <span className="text-green-600">{log.newValue}</span>
                  </>
                ) : (
                  <span className="italic text-neutral-medium">{log.newValue || log.change || 'N/A'}</span>
                )}
              </td>
              <td className="p-3 text-neutral-dark">{log.changedBy || log.by}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}