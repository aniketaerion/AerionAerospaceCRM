// src/components/shared/charts/BarChart.jsx
import React from 'react';
// Assuming you have a bar chart library like Recharts installed
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const BarChartComponent = ({ data }) => { // Renamed to BarChartComponent to avoid conflict with import name
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Bar Chart</h3>
      {data && data.length > 0 ? (
        // Placeholder for bar chart
        <div style={{ width: '100%', height: 300 }}>
          {/* Example Recharts usage:
          <ResponsiveContainer>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          */}
          <div className="flex items-center justify-center h-full border border-dashed border-gray-300 text-gray-500">
            <p>Chart content for Bar Chart will go here.</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No data available for this chart.</p>
      )}
    </div>
  );
};

export default BarChartComponent; // CRITICAL: This must be a default export