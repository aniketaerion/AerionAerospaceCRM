// src/components/shared/widgets/Pagination.jsx
import React from 'react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(
      <button
        key={i}
        onClick={() => onPageChange(i)}
        className={`px-3 py-1 border rounded ${
          i === currentPage ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
        }`}
      >
        {i}
      </button>
    );
  }

  return (
    <div className="flex gap-2 items-center justify-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 border rounded bg-white text-gray-700 disabled:opacity-50"
      >
        Prev
      </button>
      {pages}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 border rounded bg-white text-gray-700 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
