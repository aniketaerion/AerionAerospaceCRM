// src/pages/dealer/dashboard/index.jsx
import { WidgetCard } from '@/components/WidgetCard';
import { ChartCard } from '@/components/ChartCard';

const salesData = [
  { month: 'Jan', revenue: 120000 },
  { month: 'Feb', revenue: 90000 },
  { month: 'Mar', revenue: 150000 }
];

export default function DealerDashboard() {
  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Total Orders" value="320" icon="📦" />
        <WidgetCard title="Revenue" value="₹12.5L" icon="💰" />
        <WidgetCard title="New Customers" value="89" icon="👤" />
        <WidgetCard title="Pending Repairs" value="5" icon="🛠️" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard title="Monthly Revenue" data={salesData} dataKey="revenue" labelKey="month" />
      </div>
    </div>
  );
}
