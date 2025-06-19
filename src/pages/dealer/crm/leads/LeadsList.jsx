// src/pages/dealer/crm/leads/LeadsList.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterBar from '@/components/common/inputs/FilterBar';
import StatusBadge from '@/components/shared/widgets/StatusBadge';
import LeadConversionMeter from '@/components/shared/widgets/LeadConversionMeter.jsx';

const dummyLeads = [
  {
    id: 1,
    firstName: 'Rajesh',
    lastName: 'Kumar',
    status: 'New',
    location: 'Haryana',
    customerType: 'Farmer',
    acreage: 12,
    source: 'Aerion Campaign',
    assignedTo: 'Sales Executive 3',
    language: 'Hindi',
    pinCode: '123456',
    tags: ['Sprayer', 'High Value'],
    productInterest: 'Spraying Drone',
    interestLevel: 'Hot',
    stage: 'Call',
    mobile: '9876543210'
  },
  {
    id: 2,
    firstName: 'Dealer',
    lastName: 'One',
    status: 'Contacted',
    location: 'Punjab',
    customerType: 'Dealer',
    acreage: null,
    source: 'Referral',
    assignedTo: 'Sales Executive 1',
    language: 'Punjabi',
    pinCode: '140301',
    tags: ['Bulk Buyer'],
    productInterest: 'Agri Drone',
    interestLevel: 'Warm',
    stage: 'Demo',
    mobile: '9876500000'
  }
];

export default function LeadsList() {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    interestLevel: '',
    region: '',
    assignedTo: ''
  });
  const navigate = useNavigate();

  const filteredLeads = dummyLeads.filter((lead) => {
    const matchesSearch = Object.values(lead).some(value =>
      value?.toString().toLowerCase().includes(search.toLowerCase())
    );
    const matchesStatus = !filters.status || lead.status === filters.status;
    const matchesInterest = !filters.interestLevel || lead.interestLevel === filters.interestLevel;
    const matchesRegion = !filters.region || lead.pinCode?.startsWith(filters.region);
    const matchesAssignee = !filters.assignedTo || lead.assignedTo === filters.assignedTo;
    return matchesSearch && matchesStatus && matchesInterest && matchesRegion && matchesAssignee;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-wrap gap-4 justify-between items-center">
        <h2 className="text-2xl font-bold">📋 Leads List</h2>
        <div className="space-x-2">
          <button onClick={() => navigate('/dealer/crm/leads/create')} className="bg-blue-600 text-white px-4 py-2 rounded">+ New Lead</button>
          <button onClick={() => navigate('/dealer/crm/leads/bulk-import')} className="bg-gray-700 text-white px-4 py-2 rounded">⬆️ Bulk Import</button>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <input
          type="text"
          placeholder="🔍 Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded w-64"
        />
        <FilterBar filters={filters} setFilters={setFilters} fields={["status", "interestLevel", "region", "assignedTo"]} />
      </div>

      <div className="overflow-x-auto rounded shadow border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Location</th>
              <th className="p-3">Type</th>
              <th className="p-3">Acreage</th>
              <th className="p-3">Stage</th>
              <th className="p-3">Conversion</th>
              <th className="p-3">Status</th>
              <th className="p-3">Interest</th>
              <th className="p-3">Language</th>
              <th className="p-3">Pincode</th>
              <th className="p-3">Product</th>
              <th className="p-3">Source</th>
              <th className="p-3">Assigned</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.length > 0 ? (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{lead.firstName} {lead.lastName}</td>
                  <td className="p-3">{lead.location}</td>
                  <td className="p-3">{lead.customerType}</td>
                  <td className="p-3">{lead.acreage || '-'}</td>
                  <td className="p-3">{lead.stage}</td>
                  <td className="p-3"><LeadConversionMeter stage={lead.stage} /></td>
                  <td className="p-3"><StatusBadge status={lead.status} /></td>
                  <td className="p-3">{lead.interestLevel}</td>
                  <td className="p-3">{lead.language}</td>
                  <td className="p-3">{lead.pinCode}</td>
                  <td className="p-3">{lead.productInterest}</td>
                  <td className="p-3">{lead.source}</td>
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
                <td colSpan="15" className="p-4 text-center text-gray-500">No matching leads found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
