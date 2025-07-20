// src/pages/dealer/crm/customers/CustomerTimeline.jsx
import React, { useState, useMemo } from 'react';
import { CalendarIcon, PhoneIcon, EnvelopeIcon, WrenchScrewdriverIcon, UserGroupIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';

const ICON_MAP = {
  Call: <PhoneIcon className="h-5 w-5 text-blue-500" />,
  Email: <EnvelopeIcon className="h-5 w-5 text-green-500" />,
  Meeting: <UserGroupIcon className="h-5 w-5 text-purple-500" />,
  Purchase: <ShoppingBagIcon className="h-5 w-5 text-yellow-600" />,
  Complaint: <WrenchScrewdriverIcon className="h-5 w-5 text-red-500" />,
  Birthday: <CalendarIcon className="h-5 w-5 text-pink-500" />,
};

const mockTimeline = [
  { id: 1, type: 'Purchase', date: '2025-06-01', time: '14:30', detail: 'Purchased DJI Agras 120 • ₹14.8L • Invoice #INV-08413', by: 'Sales Team', tags: ['Repeat Buyer'] },
  { id: 2, type: 'Call', date: '2025-05-20', time: '11:00', detail: 'Follow-up call to discuss accessories package', by: 'Sales Exec 2', tags: ['Follow-Up'] },
  { id: 3, type: 'Email', date: '2025-05-15', time: '17:45', detail: 'Sent AMC pricing & renewal reminder', by: 'Automation Engine', tags: ['Automated'] },
  { id: 4, type: 'Complaint', date: '2025-05-10', time: '09:10', detail: 'Complaint raised for GPS issue - Resolved same day', by: 'Service Agent', tags: ['Resolved'] },
  { id: 5, type: 'Birthday', date: '2025-01-10', time: '00:00', detail: '🎉 Birthday message sent via WhatsApp', by: 'Automation Engine', tags: ['Auto'] },
];

export default function CustomerTimeline() {
  const [filters, setFilters] = useState({});

  const filteredTimeline = useMemo(() => {
    return mockTimeline.filter(entry => {
      return (!filters.type || entry.type === filters.type)
        && (!filters.tag || entry.tags.includes(filters.tag));
    });
  }, [filters]);

  return (
    <div className="p-6 bg-white rounded shadow-md space-y-6 max-h-[80vh] overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">🕒 Customer Interaction Timeline</h2>
        <FilterPanel
          filtersConfig={[
            {
              id: 'type',
              label: 'Activity Type',
              type: 'select',
              options: ['Call', 'Email', 'Meeting', 'Purchase', 'Complaint', 'Birthday']
            },
            {
              id: 'tag',
              label: 'Tag',
              type: 'select',
              options: ['Repeat Buyer', 'Follow-Up', 'Automated', 'Resolved', 'Auto']
            }
          ]}
          onFilterChange={setFilters}
          currentFilters={filters}
        />
      </div>

      <div className="space-y-6 relative border-l-2 border-gray-200 pl-6">
        {filteredTimeline.map((entry) => (
          <div key={entry.id} className="relative">
            <div className="absolute -left-3.5 top-1">{ICON_MAP[entry.type] || <CalendarIcon className="h-5 w-5 text-gray-400" />}</div>
            <div className="bg-gray-50 border rounded p-4 space-y-1 shadow-sm hover:shadow transition-all">
              <div className="flex justify-between items-center text-sm text-gray-700">
                <span className="font-semibold">{entry.type}</span>
                <span className="text-xs text-gray-500">{entry.date} @ {entry.time}</span>
              </div>
              <p className="text-sm text-gray-800">{entry.detail}</p>
              <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
                <span>By: {entry.by}</span>
                <div className="flex gap-2">
                  {entry.tags.map((tag, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredTimeline.length === 0 && (
          <div className="text-center text-gray-500 text-sm">No activity found for selected filters.</div>
        )}
      </div>
    </div>
  );
}
