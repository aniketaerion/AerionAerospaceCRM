// src/pages/dealer/crm/customers/CustomerAnalytics.jsx
import React, { useState, useMemo } from 'react';
import { FilterPanel } from '@/components/shared/navigation/FilterPanel';
import ForecastCard from '@/components/shared/widgets/ForecastCard';
import DonutChart from '@/components/shared/charts/DonutChart';
import BarChart from '@/components/shared/charts/BarChart';
import TrendLineChart from '@/components/shared/charts/TrendLineChart';
import {
  UsersIcon,
  ChartBarIcon,
  ArrowPathIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const mockCustomers = [
  {
    id: 'C001',
    crop: 'Wheat',
    status: 'Active',
    repeat: true,
    ltv: 580000,
    created_at: '2024-01-10',
    region: 'North',
    segment: 'Farmer',
    product: 'Mule VTOL',
  },
  {
    id: 'C002',
    crop: 'Rice',
    status: 'Repeat',
    repeat: true,
    ltv: 300000,
    created_at: '2024-02-12',
    region: 'South',
    segment: 'Rental',
    product: 'Scout-VTOL',
  },
  {
    id: 'C003',
    crop: 'Wheat',
    status: 'Dormant',
    repeat: false,
    ltv: 150000,
    created_at: '2023-10-20',
    region: 'East',
    segment: 'Dealer',
    product: 'Recon-X',
  },
];

export default function CustomerAnalytics({ customers = mockCustomers }) {
  const [filters, setFilters] = useState({});

  const filtered = useMemo(() => {
    return customers.filter(
      (c) =>
        (!filters.status || c.status === filters.status) &&
        (!filters.segment || c.segment === filters.segment) &&
        (!filters.region || c.region === filters.region) &&
        (!filters.product || c.product === filters.product)
    );
  }, [customers, filters]);

  const total = filtered.length;
  const repeat = filtered.filter((c) => c.repeat).length;
  const totalLTV = filtered.reduce((sum, c) => sum + c.ltv, 0);
  const avgLTV = total ? totalLTV / total : 0;

  const segmentData = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      map[c.segment] = (map[c.segment] || 0) + 1;
    });
    return Object.entries(map).map(([label, value]) => ({ label, value }));
  }, [filtered]);

  const productData = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      map[c.product] = (map[c.product] || 0) + 1;
    });
    return Object.entries(map).map(([label, value]) => ({ label, value }));
  }, [filtered]);

  const repeatBuyerData = [
    { label: 'Repeat', value: repeat },
    { label: 'New', value: total - repeat },
  ];

  const createdOverTime = useMemo(() => {
    const map = {};
    filtered.forEach((c) => {
      const key = c.created_at.slice(0, 7);
      map[key] = (map[key] || 0) + 1;
    });
    return Object.entries(map).map(([month, count]) => ({
      month,
      ltv: count,
    }));
  }, [filtered]);

  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📊 Customer Analytics Dashboard</h2>
        <FilterPanel
          filtersConfig={[
            {
              id: 'segment',
              label: 'Segment',
              type: 'select',
              options: ['Farmer', 'Dealer', 'Rental'],
            },
            {
              id: 'region',
              label: 'Region',
              type: 'select',
              options: ['North', 'South', 'East', 'West'],
            },
            {
              id: 'product',
              label: 'Product',
              type: 'select',
              options: ['Mule VTOL', 'Scout-VTOL', 'Recon-X'],
            },
            {
              id: 'status',
              label: 'Status',
              type: 'select',
              options: ['Active', 'Repeat', 'Dormant'],
            },
          ]}
          onFilterChange={setFilters}
          currentFilters={filters}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <ForecastCard
          title="Total Customers"
          value={total.toLocaleString()}
          growth="+6.2%"
          icon={UsersIcon}
        />
        <ForecastCard
          title="Avg LTV (₹)"
          value={`₹${avgLTV.toLocaleString()}`}
          growth="+4.1%"
          icon={ClockIcon}
        />
        <ForecastCard
          title="Top Segment"
          value={segmentData[0]?.label || '-'}
          growth="+9.5%"
          icon={ChartBarIcon}
        />
        <ForecastCard
          title="Repeat Buyers"
          value={repeat.toLocaleString()}
          growth="+13.4%"
          icon={ArrowPathIcon}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Customer Segmentation</h3>
          <DonutChart data={segmentData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">
            Product Purchase Distribution
          </h3>
          <BarChart data={productData} xKey="label" yKey="value" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">Repeat Buyer Insights</h3>
          <DonutChart data={repeatBuyerData} />
        </div>
        <div className="bg-white rounded shadow p-4">
          <h3 className="text-lg font-semibold mb-4">LTV Trend (Onboarding)</h3>
          <TrendLineChart data={createdOverTime} xKey="month" yKey="ltv" />
        </div>
      </div>
    </div>
  );
}
