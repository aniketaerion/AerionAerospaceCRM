// src/pages/dealer/reports/dashboard/index.jsx
import { WidgetCard } from '@/components/common/WidgetCard';

export default function ReportsDashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Reports Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Sales Report" value="View" icon="📊" />
        <WidgetCard title="Inventory Report" value="View" icon="📦" />
        <WidgetCard title="CRM Report" value="View" icon="👥" />
        <WidgetCard title="Finance Report" value="View" icon="💹" />
      </div>
    </div>
  );
}
