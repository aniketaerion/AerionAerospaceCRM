// src/components/shared/charts/TrendLineChart.jsx
import React from 'react';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function TrendLineChart({ title, labels, datasetLabel, data }) {
  const chartData = {
    labels,
    datasets: [
      {
        label: datasetLabel,
        data,
        fill: false,
        borderColor: '#0047AB',
        backgroundColor: '#0047AB',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-center mb-4">{title}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}
