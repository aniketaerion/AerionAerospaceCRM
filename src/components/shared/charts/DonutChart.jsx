// src/components/shared/charts/DonutChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';


ChartJS.register(ArcElement, Tooltip, Legend);

export default function DonutChart({ labels, data, title }) {
  const chartData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor: ['#0047AB', '#FFF000', '#FFB703', '#219EBC'],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: '60%',
    plugins: {
      legend: {
        position: 'right',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-center mb-3">{title}</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
}
