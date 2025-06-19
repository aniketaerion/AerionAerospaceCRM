// src/pages/dealer/crm/customers/CustomerAnalytics.jsx

import React from 'react';
import DonutChart from '@/components/shared/charts/DonutChart';
import BarChart from '@/components/shared/charts/BarChart';
import TrendLineChart from '@/components/shared/charts/TrendLineChart';
import ForecastCard from '@/components/shared/widgets/ForecastCard';
import FilterBar from '@/components/shared/inputs/FilterBar';

export default function CustomerAnalytics() {
  const filters = [
    { label: 'Segment', key: 'segment', options: ['Farmer', 'Dealer', 'Rental'] },
    { label: 'Region', key: 'region', options: ['North', 'South', 'East', 'West'] },
    { label: 'Product', key: 'product', options: ['Agras T30', 'Mule VTOL', 'Scout-VTOL', 'Recon-X'] },
    { label: 'Classification', key: 'classification', options: ['Prime', 'Loyal', 'Dormant'] }
  ];

  const segmentData = [
    { label: 'Farmer', value: 510 },
    { label: 'Dealer', value: 210 },
    { label: 'Rental', value: 145 },
    { label: 'Service Only', value: 87 },
  ];

  const productData = [
    { label: 'Agras T30', value: 240 },
    { label: 'Mule VTOL 50', value: 180 },
    { label: 'Scout-VTOL', value: 105 },
    { label: 'Recon-X', value: 65 },
    { label: 'Parts & Accessories', value: 330 },
  ];

  const repeatBuyerData = [
    { label: '1x Buyer', value: 420 },
    { label: '2x Buyer', value: 210 },
    { label: '3x+ Buyer', value: 85 },
  ];

  const campaignResponseData = [
    { label: 'WhatsApp', value: 240 },
    { label: 'SMS', value: 120 },
    { label: 'Email', value: 90 },
    { label: 'Phone Call', value: 150 },
    { label: 'Referral', value: 85 },
  ];

  const ltvTrend = [
    { month: 'Jan', ltv: 1.2 },
    { month: 'Feb', ltv: 1.5 },
    { month: 'Mar', ltv: 2.2 },
    { month: 'Apr', ltv: 2.7 },
    { month: 'May', ltv: 3.5 },
    { month: 'Jun', ltv: 4.1 },
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📊 Customer Analytics Dashboard</h2>
        <FilterBar filters={filters} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ForecastCard title="Total Customers" value="1,248" growth="+6.2%" />
        <ForecastCard title="Avg LTV (₹)" value="₹2.8L" growth="+4.1%" />
        <ForecastCard title="Top Product" value="Parts & Accessories" growth="+9.5%" />
        <ForecastCard title="Repeat Buyers" value="295" growth="+13.4%" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Customer Segmentation</h3>
          <DonutChart data={segmentData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Product Purchase Distribution</h3>
          <BarChart data={productData} xKey="label" yKey="value" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Repeat Buyer Insights</h3>
          <DonutChart data={repeatBuyerData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Campaign Response (Last 30 Days)</h3>
          <BarChart data={campaignResponseData} xKey="label" yKey="value" />
        </div>
      </div>

      <div className="bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-4">Lifetime Value Trend</h3>
        <TrendLineChart data={ltvTrend} xKey="month" yKey="ltv" />
      </div>
    </div>
  );
}
