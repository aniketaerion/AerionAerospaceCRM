// src/components/shared/charts/TrendLineChart.jsx
import React from 'react';
// Assuming Recharts or similar for line charts
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TrendLineChart = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Trend Line Chart</h3>
      {data && data.length > 0 ? (
        <div style={{ width: '100%', height: 300 }}>
          {/* Example Recharts usage:
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
          */}
          <div className="flex items-center justify-center h-full border border-dashed border-gray-300 text-gray-500">
            <p>Chart content for Trend Line Chart will go here.</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No data available for this chart.</p>
      )}
    </div>
  );
};

export default TrendLineChart; // CRITICAL: This must be a default export