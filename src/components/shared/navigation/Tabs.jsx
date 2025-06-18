// ✅ src/components/shared/navigation/Tabs.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

export function Tabs({ tabs, basePath }) {
  return (
    <div className="flex gap-6 border-b mb-6">
      {tabs.map(({ label, path }) => (
        <NavLink
          key={path}
          to={`${basePath}/${path}`}
          className={({ isActive }) =>
            isActive
              ? 'pb-2 border-b-2 border-blue-600 font-semibold text-blue-600'
              : 'pb-2 text-gray-600 hover:text-blue-600'
          }
        >
          {label}
        </NavLink>
      ))}
    </div>
  );
}
