// src/pages/dealer/crm/leads/CrmDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function CrmDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">CRM Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link to="/dealer/crm/leads/list" className="bg-white shadow rounded p-4 hover:shadow-md">
          <h2 className="text-sm font-semibold text-gray-500">Total Customers</h2>
          <p className="text-2xl font-bold">960</p>
        </Link>
        <Link to="/dealer/crm/leads/create" className="bg-white shadow rounded p-4 hover:shadow-md">
          <h2 className="text-sm font-semibold text-gray-500">New Leads</h2>
          <p className="text-2xl font-bold">128</p>
        </Link>
        <Link to="/dealer/crm/leads/tasks" className="bg-white shadow rounded p-4 hover:shadow-md">
          <h2 className="text-sm font-semibold text-gray-500">Follow-Ups Today</h2>
          <p className="text-2xl font-bold">34</p>
        </Link>
        <Link to="/dealer/crm/leads/analytics" className="bg-white shadow rounded p-4 hover:shadow-md">
          <h2 className="text-sm font-semibold text-gray-500">Customer LTV</h2>
          <p className="text-2xl font-bold">₹2.1L</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/dealer/crm/leads/list" className="bg-white border rounded p-4 hover:bg-gray-50">
          <h3 className="text-base font-medium">Total Leads</h3>
          <p className="text-xl font-bold">187</p>
        </Link>
        <Link to="/dealer/crm/leads/analytics" className="bg-white border rounded p-4 hover:bg-gray-50">
          <h3 className="text-base font-medium">Converted</h3>
          <p className="text-xl font-bold">64</p>
        </Link>
        <Link to="/dealer/crm/leads/list" className="bg-white border rounded p-4 hover:bg-gray-50">
          <h3 className="text-base font-medium">In Progress</h3>
          <p className="text-xl font-bold">102</p>
        </Link>
      </div>

      <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 text-center">
        <Link to="/dealer/crm/leads/list" className="text-sm text-blue-600 hover:underline">View Leads</Link>
        <Link to="/dealer/crm/leads/create" className="text-sm text-blue-600 hover:underline">Create / Import Lead</Link>
        <Link to="/dealer/crm/leads/analytics" className="text-sm text-blue-600 hover:underline">Lead Analytics</Link>
        <Link to="/dealer/crm/leads/campaigns" className="text-sm text-blue-600 hover:underline">Campaigns</Link>
        <Link to="/dealer/crm/leads/contacts" className="text-sm text-blue-600 hover:underline">Contacts</Link>
        <Link to="/dealer/crm/leads/tasks" className="text-sm text-blue-600 hover:underline">Tasks</Link>
        <Link to="/dealer/crm/leads/reminders" className="text-sm text-blue-600 hover:underline">Reminders</Link>
        <Link to="/dealer/crm/leads/bulk" className="text-sm text-blue-600 hover:underline">Bulk Assignments</Link>
      </div>
    </div>
  );
}
