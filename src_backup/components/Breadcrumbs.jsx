// src/components/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';

const Breadcrumbs = () => {
  const location = useLocation();
  // Filter out empty strings and the base "dealer" segment
  const pathnames = location.pathname.split('/').filter((x) => x && x !== 'dealer');

  // Helper function to get a readable display name for path segments
  const getDisplayName = (pathSegment, index, allPathnames) => {
    // Handle specific route names for clarity
    if (pathSegment === 'crm') return 'CRM Overview';
    if (pathSegment === 'leads') return 'Leads';
    if (pathSegment === 'customers') return 'Customers';
    if (pathSegment === 'dashboard') return 'Dashboard'; // For the main dashboard
    if (pathSegment === 'panel') return 'Panel'; // For Customers Panel
    
    // Special handling for IDs in paths (e.g., /detail/:id)
    if (pathSegment === 'detail' && index + 1 < allPathnames.length) {
        // You might fetch the actual name for the ID here if needed from context/data
        return `Detail: ${allPathnames[index + 1]}`; 
    }
    // Generic capitalization and hyphen removal
    return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1).replace(/-/g, ' ');
  };

  return (
    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center space-x-2 flex-wrap"> {/* flex-wrap for long breadcrumbs */}
        <li className="flex items-center">
          <Link to="/dealer/dashboard" className="text-aerion-blue hover:text-aerion-yellow flex items-center transition-colors duration-200">
            <HomeIcon className="h-4 w-4 mr-1" /> Dashboard
          </Link>
        </li>
        {pathnames.map((value, index) => {
          // Construct the path for the breadcrumb link
          const to = `/dealer/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = getDisplayName(value, index, pathnames);

          // If the display name is empty or a duplicate segment we want to hide (e.g., 'dashboard' if already in 'dashboard')
          if (!displayName || (index > 0 && pathnames[index - 1] === value)) {
              return null;
          }

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span> {/* Separator */}
              {isLast ? (
                <span className="text-neutral-dark whitespace-nowrap">{displayName}</span> // Current page in dark neutral, prevent wrap
              ) : (
                <Link to={to} className="text-gray-600 hover:text-aerion-blue whitespace-nowrap">
                  {displayName}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
