// src/pages/dealer/sales/dashboard/index.jsx
import { WidgetCard } from '@/components/common/WidgetCard';

export default function SalesDashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Sales Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Total Orders" value="215" icon="🧾" />
        <WidgetCard title="Quotation Requests" value="58" icon="📑" />
        <WidgetCard title="Order Conversion" value="27%" icon="📊" />
        <WidgetCard title="Avg. Order Value" value="₹54,000" icon="💸" />
      </div>
    </div>
  );
}
