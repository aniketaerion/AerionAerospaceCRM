// src/pages/dealer/crm/leads/Reminders.jsx
import React, { useState } from 'react';
export default function Reminders() {
  const [reminders, setReminders] = useState([
    {
      id: 1,
      title: 'Follow up with Sam',
      related: 'Samrat K',
      dateTime: '2025-07-01 09:00',
      method: 'Email',
    },
    {
      id: 2,
      title: 'Demo at K Farm',
      related: 'K Farm',
      dateTime: '2025-06-25 14:00',
      method: 'Dashboard',
    },
    {
      id: 3,
      title: 'Renew contract with Dealer Z',
      related: 'Dealer Z',
      dateTime: '2025-06-10 10:00',
      method: 'Email',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    related: '',
    dateTime: '',
    method: 'Email',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReminder((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let dateTimeStr = newReminder.dateTime;
    if (dateTimeStr.includes('T')) {
      dateTimeStr = dateTimeStr.replace('T', ' ');
    }

    const newEntry = {
      id: reminders.length + 1,
      ...newReminder,
      dateTime: dateTimeStr,
    };

    setReminders([...reminders, newEntry]);
    setNewReminder({
      title: '',
      related: '',
      dateTime: '',
      method: 'Email',
    });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">⏰ Lead Reminders</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ New Reminder
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Create Reminder</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={newReminder.title}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Related Lead/Contact</label>
                <input
                  type="text"
                  name="related"
                  value={newReminder.related}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Date & Time</label>
                <input
                  type="datetime-local"
                  name="dateTime"
                  value={newReminder.dateTime}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Delivery Method</label>
                <select
                  name="method"
                  value={newReminder.method}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Email</option>
                  <option>Dashboard</option>
                </select>
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
                  Add Reminder
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reminder Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Title</th>
              <th className="p-3">Related To</th>
              <th className="p-3">Date & Time</th>
              <th className="p-3">Method</th>
            </tr>
          </thead>
          <tbody>
            {reminders.length > 0 ? (
              reminders.map((r) => (
                <tr key={r.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{r.title}</td>
                  <td className="p-3">{r.related}</td>
                  <td className="p-3">{r.dateTime}</td>
                  <td className="p-3">{r.method}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-3 text-center text-gray-500">
                  No reminders set.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

