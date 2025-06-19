// src/components/shared/widgets/ExportButton.jsx
import React from 'react';
import { FaFileExport } from 'react-icons/fa';

export default function ExportButton({ onClick, label = 'Export', disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50"
    >
      <FaFileExport />
      {label}
    </button>
  );
}
