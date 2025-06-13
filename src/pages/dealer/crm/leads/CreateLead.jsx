//src/pages/dealer/crm/leads/CreateLead.jsx //


import React, { useState } from 'react';

export default function CreateLead() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    type: 'Farmer',
    location: '',
    status: 'New',
    assignedTo: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Lead Submitted:', formData);
    alert('Lead created successfully!');
    // Reset form
    setFormData({
      name: '',
      contact: '',
      type: 'Farmer',
      location: '',
      status: 'New',
      assignedTo: ''
    });
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Create New Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Contact Number</label>
          <input
            type="text"
            name="contact"
            required
            value={formData.contact}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option>Farmer</option>
            <option>FPO</option>
            <option>Institution</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Location</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          >
            <option>New</option>
            <option>In Progress</option>
            <option>Converted</option>
            <option>Not Interested</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Assigned To</label>
          <input
            type="text"
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Submit Lead
        </button>
      </form>
    </div>
  );
}
