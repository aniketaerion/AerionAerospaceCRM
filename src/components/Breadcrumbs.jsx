// src/components/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon } from '@heroicons/react/24/solid';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Helper function to get a readable display name for path segments
  const getDisplayName = (pathSegment, index, allPathnames) => {
    // Custom display names for specific routes or IDs
    if (pathSegment === 'detail' && allPathnames[index + 1]) {
      // Example for detail pages: /crm/leads/detail/123 -> "Lead Detail: 123"
      return `Detail: ${allPathnames[index + 1]}`;
    }
    if (pathSegment === 'crm') return 'CRM';
    if (pathSegment === 'leads') return 'Leads';
    if (pathSegment === 'customers') return 'Customers';
    if (pathSegment === 'dashboard') return 'Dashboard';
    // Add more custom mappings as needed for clear breadcrumbs
    
    // Default: Capitalize first letter and replace hyphens with spaces
    return pathSegment.charAt(0).toUpperCase() + pathSegment.slice(1).replace(/-/g, ' ');
  };

  return (
    <nav className="text-sm font-medium text-gray-500 mb-6 flex items-center" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex items-center space-x-2">
        <li className="flex items-center">
          <Link to="/dealer/dashboard" className="text-aerion-blue hover:text-aerion-yellow flex items-center transition-colors duration-200">
            <HomeIcon className="h-4 w-4 mr-1" /> Dashboard
          </Link>
        </li>
        {pathnames.map((value, index) => {
          // Skip "dealer" segment as it's the base for all private routes
          if (value === 'dealer') {
            return null;
          }

          const to = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const displayName = getDisplayName(value, index, pathnames);

          // Render only if displayName is not empty after processing
          if (!displayName) return null;

          return (
            <li key={to} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span> {/* Separator */}
              {isLast ? (
                <span className="text-neutral-dark">{displayName}</span> // Current page in dark neutral
              ) : (
                <Link to={to} className="text-gray-600 hover:text-aerion-blue transition-colors duration-200">
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
