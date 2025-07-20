// src/components/common/inputs/TextInput.jsx
import React from 'react';

export const TextInput = ({ value, onChange, placeholder, className, ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className || ''}`}
      {...props}
    />
  );
}; 