import React, { useState } from 'react';

const dummyLeads = [
  {
    id: 'LD001',
    name: 'Ramesh Patil',
    type: 'Farmer',
    location: 'Nashik',
    source: 'Aerion Marketing',
    product: 'Spraying Drone',
    status: 'New',
    acreage: '5 acres',
    date: '2025-06-12',
  },
  {
    id: 'LD002',
    name: 'Sunita Reddy',
    type: 'Institution',
    location: 'Guntur',
    source: 'Dealer Campaign',
    product: 'Recon-X',
    status: 'In Progress',
    acreage: '-',
    date: '2025-06-11',
  },
];

export default function LeadsList() {
  const [filter, setFilter] = useState('');

  const filteredLeads = dummyLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(filter.toLowerCase()) ||
      lead.location.toLowerCase().includes(filter.toLowerCase()) ||
      lead.status.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Lead List</h2>

      <input
        type="text"
        placeholder="Search by name, location, or status..."
        className="input mb-4 w-full max-w-md"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs font-semibold uppercase">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Acreage</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Source</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t">
                  <td className="px-4 py-2">{lead.id}</td>
                  <td className="px-4 py-2">{lead.name}</td>
                  <td className="px-4 py-2">{lead.type}</td>
                  <td className="px-4 py-2">{lead.location}</td>
                  <td className="px-4 py-2">{lead.product}</td>
                  <td className="px-4 py-2">{lead.acreage}</td>
                  <td className="px-4 py-2">{lead.status}</td>
                  <td className="px-4 py-2">{lead.source}</td>
                  <td className="px-4 py-2">{lead.date}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-4 text-center" colSpan="9">
                  No leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
