// src/components/shared/navigation/TopHeaderBar.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

/**
 * A reusable top header bar with optional back navigation.
 * @param {object} props
 * @param {string} props.title - The header title
 * @param {boolean} [props.showBack=false] - Toggle back button
 * @param {string|number} [props.backTo=-1] - Path or -1 for browser back
 */
export default function TopHeaderBar({ title, showBack = false, backTo = -1 }) {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (backTo === -1) {
      navigate(-1);
    } else {
      navigate(backTo);
    }
  };

  return (
    <div className="flex flex-wrap justify-between items-center bg-primary text-white shadow-md px-6 py-4 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {showBack && (
          <button
            onClick={handleBackClick}
            className="flex items-center text-sm font-medium text-white hover:text-secondary transition-colors duration-200"
            aria-label="Go back"
          >
            <ArrowLeftIcon className="h-5 w-5 mr-1" />
            Back
          </button>
        )}
        <h1 className="text-2xl font-bold text-white">{title}</h1>
      </div>
    </div>
  );
}
