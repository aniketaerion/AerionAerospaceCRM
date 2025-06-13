// src/pages/dealer/crm/leads/BulkAssignments.jsx
import React, { useState } from 'react';

export default function BulkAssignments() {
  const initialLeads = [
    { id: 1, name: 'John Doe', status: 'New', location: 'Mumbai', tags: ['Farmer', 'High Value'], assignedTo: '' },
    { id: 2, name: 'Priya Singh', status: 'Contacted', location: 'Pune', tags: ['Dealer'], assignedTo: '' },
    { id: 3, name: 'Aakash Kumar', status: 'New', location: 'Delhi', tags: ['Farmer'], assignedTo: 'Alice Smith' },
    { id: 4, name: 'Green Acres Farm', status: 'Interested', location: 'Mumbai', tags: ['Farmer', 'Organic'], assignedTo: '' },
    { id: 5, name: 'Local Supply Co.', status: 'Contacted', location: 'Delhi', tags: ['Dealer', 'Reseller'], assignedTo: 'Bob Johnson' }
  ];
  const teamMembers = ['Alice Smith', 'Bob Johnson', 'Carlos Gomez'];

  const [leads, setLeads] = useState(initialLeads);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterLocation, setFilterLocation] = useState('All');
  const [filterTags, setFilterTags] = useState([]);
  const [selectedLeads, setSelectedLeads] = useState([]);
  const [assignmentStrategy, setAssignmentStrategy] = useState('manual');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [message, setMessage] = useState('');

  const statusOptions = ['All', ...Array.from(new Set(leads.map(l => l.status)))];
  const locationOptions = ['All', ...Array.from(new Set(leads.map(l => l.location)))];
  const allTags = Array.from(new Set(leads.flatMap(l => l.tags)));

  const filteredLeads = leads.filter(l =>
    (filterStatus === 'All' || l.status === filterStatus) &&
    (filterLocation === 'All' || l.location === filterLocation) &&
    (filterTags.length === 0 || filterTags.some(tag => l.tags.includes(tag)))
  );

  const handleLeadSelect = (id, checked) => {
    setSelectedLeads(prev => checked ? [...prev, id] : prev.filter(x => x !== id));
  };

  const handleTagChange = (tag, checked) => {
    setFilterTags(prev => checked ? [...prev, tag] : prev.filter(t => t !== tag));
  };

  const handleAssign = () => {
    setMessage('');
    if (selectedLeads.length === 0) return alert('Please select leads to assign.');

    let updatedLeads = [...leads];
    if (assignmentStrategy === 'manual') {
      if (!selectedAssignee) return alert('Select assignee for manual assignment.');
      updatedLeads = leads.map(l => selectedLeads.includes(l.id) ? { ...l, assignedTo: selectedAssignee } : l);
      setMessage(`Assigned ${selectedLeads.length} leads to ${selectedAssignee}.`);
    } else {
      if (selectedTeamMembers.length === 0) return alert('Select team members for round-robin.');
      const assignments = {};
      selectedLeads.forEach((id, idx) => {
        assignments[id] = selectedTeamMembers[idx % selectedTeamMembers.length];
      });
      updatedLeads = leads.map(l => assignments[l.id] ? { ...l, assignedTo: assignments[l.id] } : l);
      setMessage(`Assigned ${selectedLeads.length} leads among ${selectedTeamMembers.length} team members.`);
    }

    setLeads(updatedLeads);
    setSelectedLeads([]);
    setSelectedAssignee('');
    setSelectedTeamMembers([]);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📦 Bulk Lead Assignment</h2>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="border p-2 rounded">
            {statusOptions.map(status => <option key={status}>{status}</option>)}
          </select>
          <select value={filterLocation} onChange={e => setFilterLocation(e.target.value)} className="border p-2 rounded">
            {locationOptions.map(loc => <option key={loc}>{loc}</option>)}
          </select>
          <div className="flex flex-wrap items-center gap-2">
            {allTags.map(tag => (
              <label key={tag} className="text-sm">
                <input
                  type="checkbox"
                  className="mr-1"
                  checked={filterTags.includes(tag)}
                  onChange={e => handleTagChange(tag, e.target.checked)}
                />
                {tag}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Lead Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100 text-sm">
            <tr>
              <th className="p-3">Select</th>
              <th className="p-3">Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Location</th>
              <th className="p-3">Tags</th>
              <th className="p-3">Assigned To</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map(lead => (
              <tr key={lead.id} className="border-t hover:bg-gray-50">
                <td className="p-2 text-center">
                  <input
                    type="checkbox"
                    checked={selectedLeads.includes(lead.id)}
                    onChange={e => handleLeadSelect(lead.id, e.target.checked)}
                  />
                </td>
                <td className="p-2">{lead.name}</td>
                <td className="p-2">{lead.status}</td>
                <td className="p-2">{lead.location}</td>
                <td className="p-2">{lead.tags.join(', ')}</td>
                <td className="p-2">{lead.assignedTo || '-'}</td>
              </tr>
            ))}
            {filteredLeads.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">No leads match the selected filters.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Assignment Settings */}
      <div className="bg-white p-4 rounded shadow space-y-4">
        <h3 className="text-lg font-semibold">Assignment Settings</h3>
        <div className="space-x-4">
          <label>
            <input
              type="radio"
              value="manual"
              checked={assignmentStrategy === 'manual'}
              onChange={e => setAssignmentStrategy(e.target.value)}
              className="mr-1"
            />
            Manual
          </label>
          <label>
            <input
              type="radio"
              value="roundRobin"
              checked={assignmentStrategy === 'roundRobin'}
              onChange={e => setAssignmentStrategy(e.target.value)}
              className="mr-1"
            />
            Round-Robin
          </label>
        </div>

        {assignmentStrategy === 'manual' && (
          <div>
            <label className="block mb-2">Assign to:</label>
            <select value={selectedAssignee} onChange={e => setSelectedAssignee(e.target.value)} className="border p-2 rounded w-full max-w-sm">
              <option value="">-- Select Team Member --</option>
              {teamMembers.map(member => (
                <option key={member} value={member}>{member}</option>
              ))}
            </select>
          </div>
        )}

        {assignmentStrategy === 'roundRobin' && (
          <div>
            <label className="block mb-2">Assign among team members:</label>
            <div className="flex flex-wrap gap-4">
              {teamMembers.map(member => (
                <label key={member}>
                  <input
                    type="checkbox"
                    checked={selectedTeamMembers.includes(member)}
                    onChange={e => {
                      const checked = e.target.checked;
                      setSelectedTeamMembers(prev =>
                        checked ? [...prev, member] : prev.filter(m => m !== member)
                      );
                    }}
                    className="mr-1"
                  />
                  {member}
                </label>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleAssign}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Assign Leads
        </button>
        {message && <p className="text-green-600 mt-2">{message}</p>}
      </div>
    </div>
  );
}
