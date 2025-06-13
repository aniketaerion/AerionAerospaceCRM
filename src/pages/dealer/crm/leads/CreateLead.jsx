// src/pages/dealer/crm/leads/CreateLead.jsx
import React, { useState } from 'react';

export default function CreateLead() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    product: '',
    customerType: '',
    acreage: '',
    source: 'Dealer',
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    alert('Lead Created: ' + JSON.stringify(form, null, 2));
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Create New Lead</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
        <input type="text" name="name" placeholder="Name" onChange={handleChange} className="input w-full" required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} className="input w-full" required />
        <input type="text" name="product" placeholder="Product Interest" onChange={handleChange} className="input w-full" />
        <select name="customerType" onChange={handleChange} className="input w-full">
          <option value="">Select Customer Type</option>
          <option value="Farmer">Farmer</option>
          <option value="FPO">FPO</option>
        </select>
        {form.customerType === 'Farmer' && (
          <input type="number" name="acreage" placeholder="Acreage" onChange={handleChange} className="input w-full" />
        )}
        <select name="source" onChange={handleChange} className="input w-full">
          <option value="Dealer">Dealer</option>
          <option value="Aerion Marketing">Aerion Marketing</option>
        </select>
        <button type="submit" className="btn-primary w-full">Submit</button>
      </form>
    </div>
  );
}
