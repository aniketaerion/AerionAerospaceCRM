// src/components/shared/inputs/SmartFormField.jsx
import React from 'react';

export function SmartFormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  required = false,
  options = [],
  multiline = false,
  rows = 3
}) {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        >
          <option value="">-- Select --</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          rows={rows}
          required={required}
          placeholder={placeholder}
          className="w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className="w-full border rounded px-3 py-2 shadow-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      )}
    </div>
  );
}

export default SmartFormField;
