// ✅ src/components/shared/navigation/Tabs.jsx
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export function Tabs({ tabs, activeTab, onTabChange, basePath }) { // Added activeTab and onTabChange props
  const location = useLocation(); // To help with active class if needed, though direct activeTab is better here

  return (
    <div className="flex gap-6 border-b mb-6">
      {tabs.map((tab) => ( // Destructure the tab object directly
        <NavLink
          key={tab.key} // Use tab.key for the key prop
          // Construct the 'to' prop to include the 'tab' query parameter
          to={`${basePath}?tab=${tab.key}`}
          // Use onClick to call the onTabChange prop from the parent
          // This updates the activeTab state in LeadsPanel.jsx, which in turn
          // updates the URL search params.
          onClick={() => onTabChange(tab.key)}
          // Manually apply active styles based on the activeTab prop from parent
          className={`pb-2 ${
            activeTab === tab.key // Compare with the activeTab prop
              ? 'border-b-2 border-blue-600 font-semibold text-blue-600'
              : 'text-gray-600 hover:text-blue-600'
          }`}
        >
          {tab.label}
        </NavLink>
      ))}
    </div>
  );
}