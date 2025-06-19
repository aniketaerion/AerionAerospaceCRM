// src/pages/dealer/crm/leads/LeadDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LeadConversionMeter from '@/components/shared/widgets/LeadConversionMeter.jsx';
import { SmartFormField } from '@/components/common/inputs/SmartFormField';

// Inline mock data instead of importing mockLeads
const mockLeads = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    mobile: '1234567890',
    status: 'New',
    stage: 'Contacted',
    interestLevel: 'High',
    assignedTo: 'Agent A',
    productInterest: 'Product X',
    location: 'City A',
    language: 'English',
    pinCode: '12345',
    customerType: 'Individual',
    acreage: null,
    source: 'Website',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    mobile: '9876543210',
    status: 'In Progress',
    stage: 'Qualified',
    interestLevel: 'Medium',
    assignedTo: 'Agent B',
    productInterest: 'Product Y',
    location: 'City B',
    language: 'Spanish',
    pinCode: '54321',
    customerType: 'Business',
    acreage: 5,
    source: 'Referral',
  },
  // Add more mock leads if needed
];

export default function LeadDetail() {
  const { leadId } = useParams();
  const navigate = useNavigate();

  const [lead, setLead] = useState(null);
  const [interactions, setInteractions] = useState([]);
  const [newInteraction, setNewInteraction] = useState({ type: 'Call', date: '', notes: '' });

  useEffect(() => {
    const found = mockLeads.find(l => l.id.toString() === leadId);
    if (found) setLead(found);
    else setLead(null);
  }, [leadId]);

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

  const convertToCustomer = () => {
    if (!lead) return;
    // This would typically update backend
    navigate(`/dealer/crm/customers/detail/${lead.id}`);
  };

  if (!lead) return <div className="p-6">Loading lead data...</div>;

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">📇 Lead Detail - ID #{lead.id}</h2>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">👤 Lead Information</h3>
          <button
            onClick={convertToCustomer}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Convert to Customer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p><strong>Name:</strong> {lead.firstName} {lead.lastName}</p>
          <p><strong>Phone:</strong> {lead.mobile}</p>
          <p><strong>Status:</strong> {lead.status}</p>
          <p><strong>Stage:</strong> {lead.stage}</p>
          <p><strong>Interest Level:</strong> {lead.interestLevel}</p>
          <p><strong>Assigned To:</strong> {lead.assignedTo}</p>
          <p><strong>Product Interest:</strong> {lead.productInterest}</p>
          <p><strong>Location:</strong> {lead.location}</p>
          <p><strong>Language:</strong> {lead.language}</p>
          <p><strong>Pin Code:</strong> {lead.pinCode}</p>
          <p><strong>Customer Type:</strong> {lead.customerType}</p>
          <p><strong>Acreage:</strong> {lead.acreage || '-'}</p>
          <p><strong>Source:</strong> {lead.source}</p>
          <div className="md:col-span-2">
            <LeadConversionMeter stage={lead.stage} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold">📝 Interaction Timeline</h3>
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
          <SmartFormField
            name="date"
            label="Date"
            type="date"
            value={newInteraction.date}
            onChange={handleInteractionChange}
            required
          />
          <SmartFormField
            name="notes"
            label="Notes"
            multiline
            value={newInteraction.notes}
            onChange={handleInteractionChange}
            required
          />
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
