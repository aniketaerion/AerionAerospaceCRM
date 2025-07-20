// src/components/shared/charts/DonutChart.jsx
import React from 'react';
// Assuming Recharts or similar for donut/pie charts
// import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const DonutChartComponent = ({ data }) => { // Renamed to DonutChartComponent
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Example colors

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100 h-full flex flex-col items-center justify-center">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Donut Chart</h3>
      {data && data.length > 0 ? (
        <div style={{ width: '100%', height: 300 }}>
          {/* Example Recharts usage:
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
          */}
          <div className="flex items-center justify-center h-full border border-dashed border-gray-300 text-gray-500">
            <p>Chart content for Donut Chart will go here.</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-sm">No data available for this chart.</p>
      )}
    </div>
  );
};

export default DonutChartComponent; // CRITICAL: This must be a default export