// src/components/shared/charts/FunnelChart.jsx
import React from 'react';
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function FunnelChart({ title, stages }) {
  const labels = stages.map(s => s.label);
  const dataValues = stages.map(s => s.value);
  const colors = ['#0047AB', '#005BBB', '#0077CC', '#219EBC', '#8ECAE6'];

  const data = {
    labels,
    datasets: [
      {
        label: 'Leads Funnel',
        data: dataValues,
        backgroundColor: colors.slice(0, stages.length),
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: { beginAtZero: true },
      y: {
        ticks: { mirror: true },
        grid: { display: false },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (ctx) {
            return `${ctx.label}: ${ctx.raw}`;
          },
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="w-full max-w-3xl h-80 mx-auto bg-white p-4 rounded shadow">
      <h3 className="text-lg font-semibold text-center mb-4">{title}</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
