// src/components/ChartCard.jsx
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function ChartCard({ title, data, dataKey, labelKey }) {
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h3 className="text-md font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey={labelKey} />
          <YAxis />
          <Tooltip />
          <Bar dataKey={dataKey} fill="#004AAD" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ChartCard;
