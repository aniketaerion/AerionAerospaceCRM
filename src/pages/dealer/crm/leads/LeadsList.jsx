// src/pages/dealer/crm/leads/LeadsList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const dummyLeads = [
  {
    id: 1,
    name: 'Rajesh Kumar',
    status: 'New',
    location: 'Haryana',
    customerType: 'Farmer',
    acreage: 12,
    source: 'Aerion Campaign',
    ltv: '₹1.4L',
    assignedTo: 'Sales Executive 3',
    language: 'Hindi',
    pincode: '123456',
    tags: ['Sprayer', 'High Value']
  },
  {
    id: 2,
    name: 'Dealer One',
    status: 'Contacted',
    location: 'Punjab',
    customerType: 'Dealer',
    acreage: null,
    source: 'Referral',
    ltv: '₹3.8L',
    assignedTo: 'Sales Executive 1',
    language: 'Punjabi',
    pincode: '140301',
    tags: ['Bulk Buyer']
  }
];

export default function LeadsList() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const navigate = useNavigate();

  const statusOptions = ['All', 'New', 'Contacted', 'Interested', 'Closed'];

  const filteredLeads = dummyLeads.filter((lead) => {
    const matchesSearch = Object.values(lead).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    );
    const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-2xl font-bold">📋 Leads List</h2>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="🔍 Search by name, location, tags, pincode..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-4 py-2 rounded w-64"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border px-3 py-2 rounded"
          >
            {statusOptions.map((status) => (
              <option key={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto rounded shadow border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Type</th>
              <th className="p-3">Acreage</th>
              <th className="p-3">Status</th>
              <th className="p-3">Language</th>
              <th className="p-3">Pincode</th>
              <th className="p-3">Source</th>
              <th className="p-3">LTV</th>
              <th className="p-3">Assigned</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{lead.name}</td>
                  <td className="p-3">{lead.location}</td>
                  <td className="p-3">{lead.customerType}</td>
                  <td className="p-3">{lead.acreage || '-'}</td>
                  <td className="p-3">
                    <span className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded">{lead.status}</span>
                  </td>
                  <td className="p-3">{lead.language}</td>
                  <td className="p-3">{lead.pincode}</td>
                  <td className="p-3">{lead.source}</td>
                  <td className="p-3">{lead.ltv}</td>
                  <td className="p-3">{lead.assignedTo}</td>
                  <td className="p-3">
                    {lead.tags?.map((tag) => (
                      <span key={tag} className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-0.5 rounded mr-1">{tag}</span>
                    ))}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => navigate(`/dealer/crm/leads/detail/${lead.id}`)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="12" className="p-4 text-center text-gray-500">No matching leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
