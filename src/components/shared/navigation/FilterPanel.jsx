// src/components/shared/navigation/FilterPanel.jsx
import React from 'react';
import { debounce } from 'lodash'; // npm install lodash.debounce (or just debounce)
import { XCircleIcon } from '@heroicons/react/24/outline'; // For clear button

/**
 * A dynamic filter panel component.
 * @param {object} props - The component props.
 * @param {Array<object>} props.filtersConfig - Configuration for filters: [{ id, label, type, options }]
 * @param {function} props.onFilterChange - Callback function when a filter value changes.
 * @param {object} props.currentFilters - The current filter values state.
 */
export function FilterPanel({ filtersConfig, onFilterChange, currentFilters }) {
  const handleTextChange = debounce((e) => {
    onFilterChange({ [e.target.name]: e.target.value });
  }, 300); // Debounce text input for performance

  const handleChange = (e) => {
    if (e.target.type === 'text') {
      // Use debounced handler for text inputs
      handleTextChange(e);
    } else {
      // Immediate update for selects and other inputs
      onFilterChange({ [e.target.name]: e.target.value });
    }
  };

  const handleClearFilter = (filterId) => {
    onFilterChange({ [filterId]: '' });
  };

  const hasActiveFilters = Object.values(currentFilters).some(val => val !== '' && val !== null && val !== undefined);

  return (
    <div className="bg-gray-50 p-4 rounded-lg flex flex-wrap items-center gap-4 border border-gray-200">
      <h3 className="text-md font-semibold text-gray-700 mr-2">Filters:</h3>
      {filtersConfig.map((filter) => (
        <div key={filter.id} className="relative">
          <label htmlFor={filter.id} className="sr-only">{filter.label}</label>
          {filter.type === 'select' && (
            <select
              id={filter.id}
              name={filter.id}
              className="block w-full min-w-[120px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 pl-3 pr-8"
              value={currentFilters[filter.id] || ''}
              onChange={handleChange}
            >
              <option value="">{`All ${filter.label.replace('Lead ', '').replace('Assignment Status', 'Status')}`}</option>
              {filter.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}
          {filter.type === 'text' && (
            <input
              type="text"
              id={filter.id}
              name={filter.id}
              placeholder={filter.label}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 pr-8"
              defaultValue={currentFilters[filter.id] || ''} // Use defaultValue with debounce
              onChange={handleChange}
            />
          )}
          {/* Add a clear button for active filters */}
          {(currentFilters[filter.id] && currentFilters[filter.id] !== '') && (
            <button
              onClick={() => handleClearFilter(filter.id)}
              className="absolute inset-y-0 right-0 pr-2 flex items-center text-gray-400 hover:text-gray-600"
              aria-label={`Clear ${filter.label} filter`}
            >
              <XCircleIcon className="h-5 w-5" />
            </button>
          )}
        </div>
      ))}
      {hasActiveFilters && (
        <button
          onClick={() => onFilterChange({})} // Clear all filters
          className="ml-auto px-3 py-1 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}