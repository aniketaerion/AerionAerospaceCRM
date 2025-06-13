import React from 'react';
import { Link } from 'react-router-dom';
import { WidgetCard } from '@/components/WidgetCard';

export default function CrmDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">CRM Dashboard</h2>

      {/* Summary Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <WidgetCard title="Total Customers" value="960" icon="👥" />
        <WidgetCard title="New Leads" value="128" icon="📥" />
        <WidgetCard title="Follow-Ups Today" value="34" icon="📞" />
        <WidgetCard title="Customer LTV" value="₹2.1L" icon="📈" />
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4 border-l-4 border-blue-500">
          <h4 className="text-lg font-semibold">Total Leads</h4>
          <p className="text-2xl">187</p>
        </div>
        <div className="bg-white rounded shadow p-4 border-l-4 border-green-500">
          <h4 className="text-lg font-semibold">Converted</h4>
          <p className="text-2xl">64</p>
        </div>
        <div className="bg-white rounded shadow p-4 border-l-4 border-yellow-500">
          <h4 className="text-lg font-semibold">In Progress</h4>
          <p className="text-2xl">102</p>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <Link to="/crm/leads/list" className="btn-primary text-center">📋 View Leads</Link>
        <Link to="/crm/leads/add" className="btn-secondary text-center">➕ Create / Import Lead</Link>
        <Link to="/crm/leads/analytics" className="btn-secondary text-center">📊 Lead Analytics</Link>
        <Link to="/crm/leads/campaigns" className="btn-secondary text-center">📣 Campaigns</Link>
        <Link to="/crm/leads/contacts" className="btn-secondary text-center">👤 Contacts</Link>
        <Link to="/crm/leads/tasks" className="btn-secondary text-center">📝 Tasks</Link>
        <Link to="/crm/leads/reminders" className="btn-secondary text-center">⏰ Reminders</Link>
        <Link to="/crm/leads/bulkassignments" className="btn-secondary text-center">📦 Bulk Assignments</Link>
      </div>
    </div>
  );
}
