// src/components/shared/navigation/TopHeaderBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function TopHeaderBar({ title, showBack = false, backTo = -1 }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-4 border-b">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => navigate(backTo)}
            className="text-sm text-gray-600 hover:text-blue-600"
          >
            ← Back
          </button>
        )}
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
    </div>
  );
}
