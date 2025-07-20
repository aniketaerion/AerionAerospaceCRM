// src/pages/dealer/crm/customers/CustomerKanbanView.jsx
import React from 'react';
import { UserIcon } from '@heroicons/react/24/outline';
import CustomerStatusBadge from './CustomerStatusBadge';

const STAGE_COLUMNS = [
  { id: 'New', label: '🆕 New' },
  { id: 'Active', label: '✅ Active' },
  { id: 'Repeat', label: '🔁 Repeat' },
  { id: 'Dormant', label: '💤 Dormant' }
];

export default function CustomerKanbanView({ data = [] }) {
  const grouped = STAGE_COLUMNS.reduce((acc, col) => {
    acc[col.id] = data.filter(c => c.status === col.id);
    return acc;
  }, {});

  return (
    <div className="overflow-x-auto w-full pb-4">
      <div className="min-w-[1200px] grid grid-cols-4 gap-6">
        {STAGE_COLUMNS.map((col) => (
          <div key={col.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{col.label}</h3>
            <div className="space-y-3 min-h-[150px]">
              {grouped[col.id].length === 0 && (
                <p className="text-sm text-gray-400 italic">No customers</p>
              )}
              {grouped[col.id].map((cust) => (
                <div
                  key={cust.id}
                  className="bg-gray-50 border rounded p-3 space-y-1 shadow-sm hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-blue-600" />
                    <span className="font-medium text-sm text-gray-800 truncate max-w-[180px]">{cust.name}</span>
                  </div>
                  <CustomerStatusBadge status={cust.status} />
                  <p className="text-xs text-gray-600">{cust.crop_type} • {cust.acreage} acres</p>
                  {cust.pincode && <p className="text-xs text-gray-400">📍 {cust.pincode}</p>}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(cust.tags || []).map((tag, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
