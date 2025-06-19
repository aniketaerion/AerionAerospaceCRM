// src/pages/dealer/crm/leads/Contacts.jsx
import React, { useState } from 'react';

export default function Contacts() {
  const initialContacts = [
    {
      id: 1,
      name: 'Akash Rana',
      phone: '9876543210',
      email: 'akash@example.com',
      type: 'Farmer',
      lastInteraction: 'Phone call on 2025-06-01',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Neha Singh',
      phone: '9123456780',
      email: 'neha@example.com',
      type: 'Dealer',
      lastInteraction: 'Visited on 2025-05-20',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Rahul Patel',
      phone: '9988776655',
      email: 'rahul@example.com',
      type: 'Farmer',
      lastInteraction: 'No contact yet',
      status: 'Inactive',
    },
    {
      id: 4,
      name: 'Manoj Kumar',
      phone: '9765432100',
      email: 'manoj@example.com',
      type: 'Dealer',
      lastInteraction: 'Emailed on 2025-04-15',
      status: 'Inactive',
    },
  ];

  const [contacts, setContacts] = useState(initialContacts);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    phone: '',
    email: '',
    type: 'Farmer',
    status: 'Active',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewContact((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: contacts.length + 1,
      ...newContact,
      lastInteraction: 'No interactions yet',
    };
    setContacts([...contacts, newEntry]);
    setNewContact({
      name: '',
      phone: '',
      email: '',
      type: 'Farmer',
      status: 'Active',
    });
    setShowForm(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📇 Contacts</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ New Contact
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Contact</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={newContact.name}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={newContact.phone}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={newContact.email}
                  onChange={handleChange}
                  required
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Type</label>
                <select
                  name="type"
                  value={newContact.type}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Farmer</option>
                  <option>Dealer</option>
                  <option>Partner</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Status</label>
                <select
                  name="status"
                  value={newContact.status}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option>Active</option>
                  <option>Inactive</option>
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
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border shadow rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Type</th>
              <th className="p-3">Last Interaction</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.phone}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.type}</td>
                  <td className="p-3">{c.lastInteraction}</td>
                  <td className="p-3">{c.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-3 text-center text-gray-500">
                  No contacts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
