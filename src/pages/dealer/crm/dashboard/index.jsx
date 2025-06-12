// src/pages/dealer/crm/dashboard/index.jsx
import { WidgetCard } from '@/components/WidgetCard';

export default function CRMDashboard() {
  return (
    <div className="grid gap-4">
      <h2 className="text-xl font-semibold">CRM Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <WidgetCard title="Total Customers" value="960" icon="👥" />
        <WidgetCard title="New Leads" value="128" icon="📥" />
        <WidgetCard title="Follow-Ups Today" value="34" icon="📞" />
        <WidgetCard title="Customer LTV" value="₹2.1L" icon="📈" />
      </div>
    </div>
  );
}
