// src/pages/dealer/crm/leads/LeadDetail.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

export default function LeadDetail() {
  const { leadId } = useParams();

  const [lead, setLead] = useState({
    id: leadId,
    name: 'John Doe',
    status: 'New',
    location: 'Haryana',
    customerType: 'Farmer',
    acreage: '12 acres',
    source: 'Aerion Marketing',
    ltv: '₹1.4L',
    assignedTo: 'Sales Executive 3',
    contact: '9876543210',
    email: 'john@example.com',
  });

  const [interactions, setInteractions] = useState([
    { id: 1, date: '2025-06-10', type: 'Phone Call', notes: 'Discussed drone package and financing.' },
    { id: 2, date: '2025-06-12', type: 'WhatsApp', notes: 'Sent product brochure and demo link.' }
  ]);

  const [newInteraction, setNewInteraction] = useState({ type: 'Call', date: '', notes: '' });

  const handleInteractionChange = (e) => {
    const { name, value } = e.target;
    setNewInteraction(prev => ({ ...prev, [name]: value }));
  };

  const addInteraction = (e) => {
    e.preventDefault();
    if (!newInteraction.date || !newInteraction.notes) return;
    const newEntry = {
      id: interactions.length + 1,
      ...newInteraction
    };
    setInteractions([newEntry, ...interactions]);
    setNewInteraction({ type: 'Call', date: '', notes: '' });
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📇 Lead Detail - ID #{lead.id}</h2>

      <div className="bg-white rounded shadow p-6 space-y-3">
        <h3 className="text-lg font-semibold">👤 Lead Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {lead.name}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Location:</strong> {lead.location}</p>
          <p><strong>Customer Type:</strong> {lead.customerType}</p>
          <p><strong>Acreage:</strong> {lead.acreage}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <p><strong>LTV:</strong> {lead.ltv}</p>
          <p><strong>Assigned To:</strong> {lead.assignedTo}</p>
          <p><strong>Phone:</strong> {lead.contact}</p>
          <p><strong>Email:</strong> {lead.email}</p>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold">🕓 Interaction Timeline</h3>
        <form onSubmit={addInteraction} className="grid md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-sm font-medium">Type</label>
            <select
              name="type"
              value={newInteraction.type}
              onChange={handleInteractionChange}
              className="w-full border px-3 py-2 rounded"
            >
              <option>Call</option>
              <option>Email</option>
              <option>WhatsApp</option>
              <option>Meeting</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Date</label>
            <input
              type="date"
              name="date"
              value={newInteraction.date}
              onChange={handleInteractionChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
          <div className="col-span-2 md:col-span-1">
            <label className="block text-sm font-medium">Notes</label>
            <textarea
              name="notes"
              value={newInteraction.notes}
              onChange={handleInteractionChange}
              className="w-full border px-3 py-2 rounded"
              rows={2}
              required
            />
          </div>
          <button
            type="submit"
            className="md:col-span-3 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            ➕ Add Interaction
          </button>
        </form>

        <ul className="divide-y divide-gray-200">
          {interactions.map((entry) => (
            <li key={entry.id} className="py-3">
              <p className="text-sm text-gray-600">
                <strong>{entry.date}</strong> — <em>{entry.type}</em>
              </p>
              <p className="text-sm">{entry.notes}</p>
            </li>
          ))}
          {interactions.length === 0 && (
            <li className="text-gray-500 text-sm py-2">No interactions yet.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
