// src/pages/dealer/crm/customers/Promotions.jsx

import React, { useState } from 'react';

// Corrected: Import as default exports (no curly braces) for these components
import DonutChart from '@/components/shared/charts/DonutChart';
import TrendLineChart from '@/components/shared/charts/TrendLineChart';
import FilterBar from '@/components/common/inputs/FilterBar';
import ExportButton from '@/components/shared/widgets/ExportButton';
import StatusBadge from '@/components/shared/widgets/StatusBadge';

// Corrected: Import ToggleSwitch as a NAMED export (with curly braces)
// The error indicates it's not a default export.
import { ToggleSwitch } from '@/components/common/inputs/ToggleSwitch';


const dummyPromotions = [
  {
    id: 'promo001',
    title: 'Summer Spraying Discount',
    target: 'Farmers with >10 acres',
    type: 'Seasonal Offer',
    product: 'Trident Sprayer X1',
    engagementRate: 42,
    conversionRate: 18,
    validity: '01 May – 30 June',
    status: 'Active'
  },
  {
    id: 'promo002',
    title: 'Repeat Buyer Loyalty Bonus',
    target: 'Returning customers',
    type: 'Loyalty Program',
    product: 'Annual Drone AMC',
    engagementRate: 61,
    conversionRate: 32,
    validity: 'Ongoing',
    status: 'Ongoing'
  },
  {
    id: 'promo003',
    title: 'Festive Season Combo Offer',
    target: 'All new leads in Q3',
    type: 'Combo Pack',
    product: 'Recon-X + AMC',
    engagementRate: 34,
    conversionRate: 14,
    validity: 'Oct – Nov',
    status: 'Upcoming'
  },
];

export default function Promotions() {
  const [filters, setFilters] = useState({ status: 'All', type: 'All' });

  const filteredPromotions = dummyPromotions.filter(promo => {
    return (
      (filters.status === 'All' || promo.status === filters.status) &&
      (filters.type === 'All' || promo.type === filters.type)
    );
  });

  // Prepare data for DonutChart
  const promotionTypeConversion = dummyPromotions.reduce((acc, promo) => {
    acc[promo.type] = (acc[promo.type] || 0) + promo.conversionRate;
    return acc;
  }, {});

  const donutChartLabels = Object.keys(promotionTypeConversion);
  const donutChartData = Object.values(promotionTypeConversion);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-800">🎁 Promotional Campaigns & Upselling</h2>
        <ExportButton data={filteredPromotions} filename="promotions_report.csv" />
      </div>

      <FilterBar
        filters={[
          { key: 'status', label: 'Status', options: ['All', 'Active', 'Ongoing', 'Upcoming'] },
          { key: 'type', label: 'Type', options: ['All', 'Seasonal Offer', 'Loyalty Program', 'Combo Pack'] }
        ]}
        onFilterChange={setFilters}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonutChart
          title="Conversion by Promotion Type"
          labels={donutChartLabels}
          data={donutChartData}
        />
        <TrendLineChart
          title="Engagement Over Time"
          data={{
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            values: [20, 45, 60, 72],
          }}
        />
      </div>

      {/* Example usage of ToggleSwitch (uncomment if you need it) */}
      {/* <div className="mt-4">
        <ToggleSwitch label="Enable Feature" initialChecked={true} onToggle={() => console.log('Toggled')} />
      </div> */}

      <div className="bg-white shadow rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-2">Campaign</th>
              <th className="px-4 py-2">Target</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Engagement</th>
              <th className="px-4 py-2">Conversion</th>
              <th className="px-4 py-2">Validity</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPromotions.map((promo) => (
              <tr key={promo.id} className="border-t">
                <td className="px-4 py-2 font-medium">{promo.title}</td>
                <td className="px-4 py-2">{promo.target}</td>
                <td className="px-4 py-2">{promo.product}</td>
                <td className="px-4 py-2">{promo.engagementRate}%</td>
                <td className="px-4 py-2">{promo.conversionRate}%</td>
                <td className="px-4 py-2">{promo.validity}</td>
                <td className="px-4 py-2">
                  <StatusBadge status={promo.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}