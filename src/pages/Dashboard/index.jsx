// src/pages/dealer/dashboard/index.jsx
import React from "react";

export default function DealerDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-4">Dealer Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-lg shadow">📦 Orders Overview</div>
        <div className="p-6 bg-white rounded-lg shadow">🛠️ Repair Tickets</div>
        <div className="p-6 bg-white rounded-lg shadow">📊 Inventory Status</div>
        <div className="p-6 bg-white rounded-lg shadow">💼 Financial Summary</div>
        <div className="p-6 bg-white rounded-lg shadow">📣 Marketing Claims</div>
        <div className="p-6 bg-white rounded-lg shadow">👥 Customer Insights</div>
      </div>
    </div>
  );
}
