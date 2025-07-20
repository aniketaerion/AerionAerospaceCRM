// src/components/shared/charts/LeadConversionFunnel.jsx
import React from 'react';
// Assuming you have a funnel chart library or custom implementation
// import { FunnelChart, Funnel, LabelList, ResponsiveContainer, Tooltip } from 'recharts';

const LeadConversionFunnel = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Lead Conversion Funnel</h3>
      {data && data.length > 0 ? (
        // Placeholder for funnel chart
        <div style={{ width: '100%', height: 300 }}>
          {/* Example Recharts Funnel usage:
          <ResponsiveContainer>
            <FunnelChart margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
              <Tooltip />
              <Funnel
                dataKey="count"
                data={data}
                isAnimationActive
                labelLine={false}
                label={({ name, count }) => `${name}: ${count}`}
                stroke="#fff"
                outerRadius={120}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Funnel>
            </FunnelChart>
          </ResponsiveContainer>
          */}
          <div className="flex items-center justify-center h-full border border-dashed border-gray-300 text-gray-500">
            <p>Chart content for Lead Conversion Funnel will go here.</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No data available for this chart.</p>
      )}
    </div>
  );
};

export default LeadConversionFunnel; // CRITICAL: This must be a default export