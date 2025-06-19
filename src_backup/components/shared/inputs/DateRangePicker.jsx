// src/components/shared/inputs/DateRangePicker.jsx
import React, { useState } from 'react';

export function DateRangePicker({ onChange, label = 'Select Date Range' }) {
  const [range, setRange] = useState({ from: '', to: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...range, [name]: value };
    setRange(updated);
    if (onChange) onChange(updated);
  };

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="flex gap-3">
        <input
          type="date"
          name="from"
          value={range.from}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        />
        <input
          type="date"
          name="to"
          value={range.to}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-full"
        />
      </div>
    </div>
  );
}
