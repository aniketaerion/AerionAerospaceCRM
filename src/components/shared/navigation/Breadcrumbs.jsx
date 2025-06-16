// src/components/shared/navigation/Breadcrumbs.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <ol className="list-reset flex space-x-1">
        <li>
          <Link to="/" className="hover:underline text-blue-600">Home</Link>
          <span className="mx-1">/</span>
        </li>
        {segments.map((seg, i) => {
          const to = '/' + segments.slice(0, i + 1).join('/');
          const label = decodeURIComponent(seg.replace(/-/g, ' '));
          const isLast = i === segments.length - 1;

          return (
            <li key={to}>
              {isLast ? (
                <span className="text-gray-800 font-medium capitalize">{label}</span>
              ) : (
                <>
                  <Link to={to} className="hover:underline capitalize text-blue-600">{label}</Link>
                  <span className="mx-1">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
