// src/components/shared/navigation/DateRangeSelector.jsx
import React from 'react';

// Defines the available date range options
const dateRanges = [
  { key: 'today', label: 'Today' },
  { key: 'this_week', label: 'This Week' },
  { key: 'this_month', label: 'This Month' },
  { key: 'this_quarter', label: 'This Quarter' },
  { key: 'this_year', label: 'This Year' },
  { key: 'last_month', label: 'Last Month' },
  { key: 'all_time', label: 'All Time' }, // Added for a broader view
];

/**
 * A dedicated component for selecting predefined date ranges.
 * @param {object} props - The component props.
 * @param {string} props.selectedRange - The currently selected date range key.
 * @param {function} props.onRangeChange - Callback function when date range changes.
 */
export function DateRangeSelector({ selectedRange, onRangeChange }) {
  return (
    <div className="relative inline-block text-left">
      <select
        value={selectedRange}
        onChange={(e) => onRangeChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 pl-3 pr-10 appearance-none bg-white bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.5rem_1.5rem] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0iY3VycmVudENvbG9yIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjI5MyA3LjI5M2ExIDEgMCAwMSAxLjQxNCAwTDEwIDEwLjU4NmwzLjI5My0zLjI5M2ExIDEgMCAxMTAgMS40MTRsLTMuNSAzLjVhMSAxIDAgMDEtMS40MTRsLTMuNS0zLjVhMSAxIDAgMDExLjQxNCAwWiIgY2xpcC1ydWxlPSJldmVub2RkIiAvPjwvc3ZnPg==')]"
        aria-label="Select date range"
      >
        {dateRanges.map((range) => (
          <option key={range.key} value={range.key}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
}