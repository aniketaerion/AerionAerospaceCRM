// src/pages/dealer/crm/sales/SalesDashboard.jsx
import React, { useState } from 'react';
import TopHeaderBar from '@/components/shared/navigation/TopHeaderBar';
import { DateRangeSelector } from '@/components/shared/navigation/DateRangeSelector';

export default function SalesDashboard() {
  const [dateRange, setDateRange] = useState('this_month');

  return (
    <div className="p-6 space-y-6">
      {/* Top Bar with Date Filter */}
      <div className="flex justify-between items-center mb-4">
        <TopHeaderBar title="Sales Overview" />
        <DateRangeSelector selectedRange={dateRange} onRangeChange={setDateRange} />
      </div>

      {/* Placeholder Content */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Sales Dashboard - Coming Soon</h2>
        <p className="text-gray-600">
          This dashboard will show performance metrics like revenue, order volume, sales trends,
          and salesperson productivity.
        </p>
        <p className="mt-2 text-gray-600">
          It will integrate with the Quote, Customer, and Order modules to give a full picture of sales health.
        </p>
      </div>
    </div>
  );
}
