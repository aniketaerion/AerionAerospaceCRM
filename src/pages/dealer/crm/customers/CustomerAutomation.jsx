// src/pages/dealer/crm/customers/CustomerAutomation.jsx
import React, { useState, useEffect } from 'react';
import { ToggleSwitch } from '@/components/common/inputs/ToggleSwitch';
import { DateRangePicker } from '@/components/common/inputs/DateRangePicker';
import  FilterBar from '@/components/common/inputs/FilterBar';
import StatusBadge  from '@/components/shared/widgets/StatusBadge';
import  ExportButton  from '@/components/shared/widgets/ExportButton';

const mockAutomations = [
  {
    id: 1,
    name: '🎂 Birthday Wishes',
    description: 'Send personalized messages on customer birthdays via WhatsApp.',
    active: true,
    trigger: 'Date of Birth',
    segment: 'All customers with DOB',
    channel: 'WhatsApp',
    createdAt: '2024-03-01',
  },
  {
    id: 2,
    name: '🌾 Seasonal Upsell - Kharif',
    description: 'Promote spraying rentals & input kits for Kharif season.',
    active: true,
    trigger: 'Date Range',
    segment: 'Prime + Active Customers',
    channel: 'SMS & WhatsApp',
    createdAt: '2024-06-10',
  },
  {
    id: 3,
    name: '📉 Re-engage Dormant',
    description: 'Auto-reminder every 30 days to dormant customers.',
    active: false,
    trigger: 'Last Purchase > 30 days',
    segment: 'Dormant',
    channel: 'Email + WhatsApp',
    createdAt: '2024-01-15',
  },
  {
    id: 4,
    name: '📬 Feedback Loop',
    description: 'Ask for NPS feedback 3 days after delivery.',
    active: true,
    trigger: 'Order Delivered + 3 days',
    segment: 'All Buyers',
    channel: 'WhatsApp',
    createdAt: '2024-05-02',
  },
];

export default function CustomerAutomation() {
  const [automations, setAutomations] = useState(mockAutomations);

  const toggleAutomation = (id) => {
    const updated = automations.map(a =>
      a.id === id ? { ...a, active: !a.active } : a
    );
    setAutomations(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">⚙️ Automation Center</h2>
        <ExportButton label="Export List" />
      </div>

      <p className="text-gray-500 text-sm">Automate greetings, upsells, reminders & follow-ups using customer attributes and activity triggers.</p>

      <FilterBar
        filters={[
          { label: 'Channel', options: ['All', 'WhatsApp', 'Email', 'SMS'] },
          { label: 'Status', options: ['Active', 'Inactive'] },
          { label: 'Segment', options: ['All', 'Prime', 'Dormant', 'Seasonal'] },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automations.map(auto => (
          <div
            key={auto.id}
            className="p-4 bg-white rounded shadow hover:shadow-md transition border"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{auto.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{auto.description}</p>
                <div className="text-xs space-y-1">
                  <div><b>Trigger:</b> {auto.trigger}</div>
                  <div><b>Segment:</b> {auto.segment}</div>
                  <div><b>Channel:</b> {auto.channel}</div>
                  <div><b>Created:</b> {auto.createdAt}</div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <ToggleSwitch
                  checked={auto.active}
                  onChange={() => toggleAutomation(auto.id)}
                />
                <StatusBadge status={auto.active ? 'Active' : 'Inactive'} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
