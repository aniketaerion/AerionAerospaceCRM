// src/pages/dealer/finance/dashboard/index.jsx
import { WidgetCard } from '@/components/WidgetCard';

export default function FinanceDashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Finance Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Total Invoices" value="238" icon="🧾" />
        <WidgetCard title="Outstanding" value="₹3.4L" icon="⏳" />
        <WidgetCard title="Overdue" value="₹1.1L" icon="⚠️" />
        <WidgetCard title="Payments Received" value="₹14.8L" icon="✅" />
      </div>
    </div>
  );
}
