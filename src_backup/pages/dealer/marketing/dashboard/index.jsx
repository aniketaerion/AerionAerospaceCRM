// src/pages/dealer/marketing/dashboard/index.jsx
import { WidgetCard } from '@/components/WidgetCard';

export default function MarketingDashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">Marketing Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Claims Submitted" value="42" icon="🧾" />
        <WidgetCard title="Approved Budget" value="₹3L" icon="✅" />
        <WidgetCard title="Pending Approvals" value="5" icon="⏳" />
        <WidgetCard title="Campaigns" value="11" icon="📣" />
      </div>
    </div>
  );
}
