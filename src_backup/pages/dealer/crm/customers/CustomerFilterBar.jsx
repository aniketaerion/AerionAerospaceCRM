// src/pages/dealer/crm/customers/CustomerFilterBar.jsx

import React from 'react';

export default function CustomerFilterBar({ filters, onChange }) {
  const handleChange = (e) => {
    onChange({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-50 p-4 rounded flex flex-wrap gap-4 items-end">
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">LTV</label>
        <select name="ltv" value={filters.ltv} onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">All</option>
          <option value="low">Below ₹1L</option>
          <option value="medium">₹1L - ₹5L</option>
          <option value="high">Above ₹5L</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">Crop</label>
        <select name="crop" value={filters.crop} onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">All</option>
          <option value="wheat">Wheat</option>
          <option value="rice">Rice</option>
          <option value="sugarcane">Sugarcane</option>
          <option value="cotton">Cotton</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">Status</label>
        <select name="status" value={filters.status} onChange={handleChange} className="border px-3 py-2 rounded">
          <option value="">All</option>
          <option value="Prime">Prime</option>
          <option value="Active">Active</option>
          <option value="Dormant">Dormant</option>
          <option value="Loyal">Loyal</option>
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-600">Location</label>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          className="border px-3 py-2 rounded"
          placeholder="Enter district / region"
        />
      </div>
    </div>
  );
}
