//src/components/shared/inputs/FilterBar.jsx
import React from 'react';

export default function FilterBar({
  searchValue,
  onSearchChange,
  statusOptions = [],
  selectedStatus,
  onStatusChange,
  tags = [],
  selectedTags = [],
  onTagToggle,
}) {
  return (
    <div className="flex flex-wrap items-center gap-3 bg-white border px-4 py-3 rounded shadow-sm">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search leads, names, or tags..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        className="border px-3 py-2 rounded w-full md:w-60"
      />

      {/* ⬇️ Status Dropdown */}
      {statusOptions.length > 0 && (
        <select
          value={selectedStatus}
          onChange={(e) => onStatusChange(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      )}

      {/* 🏷️ Tags (multi-select) */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagToggle(tag)}
            className={`text-xs px-2 py-1 rounded border ${
              selectedTags.includes(tag)
                ? 'bg-blue-100 border-blue-600 text-blue-700'
                : 'bg-gray-100 border-gray-300 text-gray-600'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}
