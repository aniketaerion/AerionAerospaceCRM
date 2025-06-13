// src/pages/dealer/crm/leads/index.jsx
import React from 'react';
import { Routes, Route, NavLink, Navigate, useLocation } from 'react-router-dom';
import LeadsList from './LeadsList';
import LeadDetail from './LeadDetail';
import LeadTimeline from './LeadTimeline';
import LeadHistory from './LeadHistory';

export default function LeadModule() {
  const location = useLocation();
  const activePath = location.pathname.split('/').pop();

  const tabs = [
    { name: 'Leads List', path: 'list' },
    { name: 'Lead Timeline', path: 'timeline' },
    { name: 'Lead History', path: 'history' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">🚀 Lead Management</h1>
        <span className="text-sm text-gray-500">Track, assign, and convert leads</span>
      </div>

      <div className="flex gap-6 border-b pb-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            className={({ isActive }) =>
              isActive || activePath === tab.path
                ? 'pb-2 border-b-2 border-blue-600 font-semibold text-blue-600'
                : 'pb-2 text-gray-600 hover:text-blue-600'
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>

      <div className="mt-4">
        <Routes>
          <Route path="/" element={<Navigate to="list" replace />} />
          <Route path="list" element={<LeadsList />} />
          <Route path="timeline" element={<LeadTimeline />} />
          <Route path="history" element={<LeadHistory />} />
          <Route path="detail/:leadId" element={<LeadDetail />} />
          <Route path="*" element={<div className="text-red-600">🚫 Page not found</div>} />
        </Routes>
      </div>
    </div>
  );
}
