// src/components/shared/charts/FunnelChart.jsx
import React from 'react';
// Assuming this is a separate Funnel Chart component if not integrated with Recharts' FunnelChart
// If your LeadConversionFunnel.jsx is the actual FunnelChart, then this file might be redundant or for generic funnel charts.

const FunnelChartComponent = ({ data }) => { // Renamed to FunnelChartComponent
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Generic Funnel Chart</h3>
      {data && data.length > 0 ? (
        <div className="flex items-center justify-center h-full border border-dashed border-gray-300 text-gray-500">
          <p>Chart content for Generic Funnel Chart will go here.</p>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No data available for this chart.</p>
      )}
    </div>
  );
};

export default FunnelChartComponent; // CRITICAL: This must be a default export