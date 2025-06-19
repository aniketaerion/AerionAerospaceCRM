// src/pages/dealer/service/dashboard/index.jsx
import { WidgetCard } from '@/components/common/WidgetCard';

export default function ServiceDashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Service Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Open Tickets" value="26" icon="🔧" />
        <WidgetCard title="Resolved Tickets" value="102" icon="✅" />
        <WidgetCard title="Avg. Resolution Time" value="2.5d" icon="⏱️" />
        <WidgetCard title="Warranty Cases" value="14" icon="🛡️" />
      </div>
    </div>
  );
}
