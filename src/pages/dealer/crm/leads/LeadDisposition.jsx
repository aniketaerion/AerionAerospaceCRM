// src/pages/dealer/crm/leads/LeadDisposition.jsx
import React, { useState } from 'react';
import { SmartFormField } from '@/components/common/inputs/SmartFormField';

export default function LeadDisposition({ onSave }) {
  const [disposition, setDisposition] = useState('');
  const [remarks, setRemarks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!disposition) return;
    onSave({ disposition, remarks });
    setDisposition('');
    setRemarks('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Call Disposition *</label>
        <select
          value={disposition}
          onChange={(e) => setDisposition(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">-- Select Outcome --</option>
          <option>Interested - Follow Up</option>
          <option>Not Interested</option>
          <option>Call Later</option>
          <option>Switched Off / Not Reachable</option>
          <option>Wrong Number</option>
          <option>Converted</option>
        </select>
      </div>

      <SmartFormField
        name="remarks"
        label="Remarks / Notes"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
        multiline
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        ✅ Save Disposition
      </button>
    </form>
  );
}
