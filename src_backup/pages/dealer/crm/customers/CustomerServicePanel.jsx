// src/pages/dealer/crm/customers/CustomerServicePanel.jsx

import React from 'react';
import { WrenchScrewdriverIcon, ClipboardDocumentListIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function CustomerServicePanel({ serviceData }) {
  const {
    amcStatus = 'Active',
    amcExpiry = '2026-03-31',
    parts = [],
    complaints = [],
    serviceHistory = []
  } = serviceData || {};

  return (
    <div className="bg-white shadow rounded p-6 space-y-6">
      <h2 className="text-xl font-semibold flex items-center gap-2 text-indigo-800">
        <WrenchScrewdriverIcon className="w-6 h-6" />
        Service & AMC Panel
      </h2>

      {/* AMC Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="bg-blue-50 p-4 border border-blue-200 rounded shadow-sm">
          <p><strong>AMC Status:</strong> <span className="text-blue-700">{amcStatus}</span></p>
          <p><strong>AMC Expiry:</strong> {amcExpiry}</p>
        </div>
        <div className="bg-yellow-50 p-4 border border-yellow-200 rounded shadow-sm">
          <p className="font-medium">🛠️ Parts Purchased</p>
          <ul className="list-disc list-inside text-gray-700">
            {parts.length > 0 ? (
              parts.map((p, i) => (
                <li key={i}>{p.date} – {p.partName} – {p.amount}</li>
              ))
            ) : (
              <li>No parts purchase records</li>
            )}
          </ul>
        </div>
      </div>

      {/* Complaint History */}
      <div className="bg-red-50 p-4 border border-red-200 rounded shadow-sm">
        <h3 className="font-medium text-red-800 flex items-center gap-1 mb-2">
          <ExclamationCircleIcon className="w-4 h-4" /> Complaint Tickets
        </h3>
        <ul className="divide-y divide-gray-300 text-sm">
          {complaints.length > 0 ? complaints.map((c, i) => (
            <li key={i} className="py-2">
              <p><strong>#{c.ticketId}</strong> – {c.issue}</p>
              <p className="text-xs text-gray-500">Status: {c.status} • Date: {c.date}</p>
            </li>
          )) : (
            <li className="text-gray-600">No complaint records</li>
          )}
        </ul>
      </div>

      {/* Service History */}
      <div className="bg-green-50 p-4 border border-green-200 rounded shadow-sm">
        <h3 className="font-medium text-green-800 flex items-center gap-1 mb-2">
          <ClipboardDocumentListIcon className="w-4 h-4" /> Service History
        </h3>
        <ul className="list-disc ml-5 text-sm">
          {serviceHistory.length > 0 ? (
            serviceHistory.map((s, i) => (
              <li key={i}>{s.date} – {s.description}</li>
            ))
          ) : (
            <li>No service history available</li>
          )}
        </ul>
      </div>
    </div>
  );
}
