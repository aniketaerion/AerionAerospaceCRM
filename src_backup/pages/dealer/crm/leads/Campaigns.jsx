// src/pages/dealer/crm/leads/Campaigns.jsx

import React, { useState } from 'react';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'New Year Promo',
      channel: 'WhatsApp',
      audience: 'All Farmers',
      schedule: '2025-12-30 10:00',
      template: 'Get 10% off drones this new year!',
      open: 0,
      clicks: 0,
      responses: 0,
    },
    {
      id: 2,
      name: 'Spring Sale',
      channel: 'Email',
      audience: 'All Dealers',
      schedule: '2025-04-01 09:00',
      template: 'Upgrade your fleet this spring. Big discounts await!',
      open: 150,
      clicks: 45,
      responses: 20,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: '',
    channel: 'WhatsApp',
    audience: '',
    schedule: '',
    template: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCampaign((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let scheduleStr = newCampaign.schedule.includes('T')
      ? newCampaign.schedule.replace('T', ' ')
      : newCampaign.schedule;

    const newEntry = {
      id: campaigns.length + 1,
      ...newCampaign,
      schedule: scheduleStr,
      open: 0,
      clicks: 0,
      responses: 0,
    };

    setCampaigns([...campaigns, newEntry]);
    setNewCampaign({
      name: '',
      channel: 'WhatsApp',
      audience: '',
      schedule: '',
      template: '',
    });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📢 Campaign Manager</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ New Campaign
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Create Campaign</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Campaign Name</label>
                <input
                  type="text"
                  name="name"
                  value={newCampaign.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Channel</label>
                <select
                  name="channel"
                  value={newCampaign.channel}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>WhatsApp</option>
                  <option>SMS</option>
                  <option>Email</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Audience</label>
                <input
                  type="text"
                  name="audience"
                  value={newCampaign.audience}
                  onChange={handleChange}
                  placeholder="e.g. All Dealers"
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Schedule</label>
                <input
                  type="datetime-local"
                  name="schedule"
                  value={newCampaign.schedule}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Message Template</label>
                <textarea
                  name="template"
                  value={newCampaign.template}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Campaign Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Campaign Name</th>
              <th className="p-3">Channel</th>
              <th className="p-3">Audience</th>
              <th className="p-3">Schedule</th>
              <th className="p-3">Open</th>
              <th className="p-3">Clicks</th>
              <th className="p-3">Responses</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((c) => (
              <tr key={c.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{c.name}</td>
                <td className="p-3">{c.channel}</td>
                <td className="p-3">{c.audience}</td>
                <td className="p-3">{c.schedule}</td>
                <td className="p-3">{c.open}</td>
                <td className="p-3">{c.clicks}</td>
                <td className="p-3">{c.responses}</td>
              </tr>
            ))}
            {campaigns.length === 0 && (
              <tr>
                <td colSpan="7" className="p-3 text-center text-gray-500">
                  No campaigns found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
